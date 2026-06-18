import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from './src/components/Button';
import { Card } from './src/components/Card';
import { FormField } from './src/components/FormField';
import { GamificationPanel } from './src/components/GamificationPanel';
import { LikertItem } from './src/components/LikertItem';
import { ProgressBar } from './src/components/ProgressBar';
import { QuestionCard } from './src/components/QuestionCard';
import { lessonModules } from './src/data/modules';
import { posttestQuestions, pretestQuestions } from './src/data/questions';
import { gamificationQuestionnaire} from './src/data/questionnaire';
import {
  AppStep,
  BackgroundProfile,
  GamificationState,
  ModuleProgress,
  QuestionnaireResult,
  ResearchGroup,
  RespondentProfile
} from './src/types';
import {
  awardModuleCompletion,
  buildLikertRecord,
  calculateTestScore,
  createInitialGamificationState,
  isAllQuestionsAnswered
} from './src/utils/scoring';
import { nowIso, secondsSince } from './src/utils/time';
import {
  saveBackgroundProfile,
  saveModuleProgress,
  saveQuestionnaire,
  saveRespondentProfile,
  saveTestResult
} from './src/services/researchRepository';

const emptyProfile: RespondentProfile = {
  respondentId: '',
  group: 'gamification_off',
  age: '',
  gender: '',
  occupation: '',
  education: '',
  workingOrStudyingHours: '',
  reasonLearningCoding: '',
  dailyLearningTime: '',
  priorCodingExperience: '',
  createdAtIso: ''
};

const initialBackground: BackgroundProfile = {
  priorExperience: 2,
  basicConceptUnderstanding: 2,
  confidenceLearningCoding: 3,
  codingFeelsDifficult: 4,
  careerInterest: 4,
  tooBusyToLearn: 4
};

function mapGroupCode(code: string): ResearchGroup | null {
  const normalized = code.trim().toLowerCase();
  if (['on', 'gamification_on', 'gammi_on', 'gami_on', 'b'].includes(normalized)) {
    return 'gamification_on';
  }
  if (['off', 'gamification_off', 'gammi_off', 'gami_off', 'a'].includes(normalized)) {
    return 'gamification_off';
  }
  return null;
}

export default function App() {
  const [step, setStep] = useState<AppStep>('welcome');
  const [profile, setProfile] = useState<RespondentProfile>(emptyProfile);
  const [groupCode, setGroupCode] = useState('');
  const [background, setBackground] = useState<BackgroundProfile>(initialBackground);
  const [pretestAnswers, setPretestAnswers] = useState<Record<string, string>>({});
  const [posttestAnswers, setPosttestAnswers] = useState<Record<string, string>>({});
  const [moduleProgress, setModuleProgress] = useState<Record<string, ModuleProgress>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [lessonStartMs, setLessonStartMs] = useState(Date.now());
  const [gamificationState, setGamificationState] = useState<GamificationState>(
    createInitialGamificationState()
  );
  const [gamViews, setGamViews] = useState(() => buildLikertRecord(gamificationQuestionnaire.section1.items));
  const [gamMotivation, setGamMotivation] = useState(1);
  const [gamBasicNeeds, setGamBasicNeeds] = useState(() => buildLikertRecord(gamificationQuestionnaire.section3.items));
  const [gamBenefits, setGamBenefits] = useState(() => buildLikertRecord(gamificationQuestionnaire.section4.items));
  const [gamFutureUse, setGamFutureUse] = useState(() => buildLikertRecord(gamificationQuestionnaire.section5.items));
  const [openEndedMostUseful, setOpenEndedMostUseful] = useState('');
  const [openEndedLeastUseful, setOpenEndedLeastUseful] = useState('');
  const [openEndedImprovement, setOpenEndedImprovement] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const completedCount = Object.keys(moduleProgress).length;
  const totalModules = lessonModules.length;
  const learningProgress = completedCount / totalModules;
  const pretestScore = useMemo(
    () => calculateTestScore(pretestQuestions, pretestAnswers),
    [pretestAnswers]
  );
  const posttestScore = useMemo(
    () => calculateTestScore(posttestQuestions, posttestAnswers),
    [posttestAnswers]
  );
  const isGamified = profile.group === 'gamification_on';

  function updateProfile(field: keyof RespondentProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function handleWelcomeNext() {
    const group = mapGroupCode(groupCode);
    if (!profile.respondentId.trim()) {
      Alert.alert('Missing respondent ID', 'Please enter a respondent ID first.');
      return;
    }
    if (!group) {
      Alert.alert('Invalid group code', 'Use ON/OFF or A/B based on the testing protocol.');
      return;
    }
    setProfile((current) => ({ ...current, group, respondentId: current.respondentId.trim() }));
    setStep('demographics');
  }

  async function handleSaveDemographics() {
    if (!profile.age || !profile.occupation || !profile.education) {
      Alert.alert('Incomplete data', 'Please complete age, occupation, and education fields.');
      return;
    }

    const completeProfile = { ...profile, createdAtIso: nowIso() };
    setIsSaving(true);
    try {
      await saveRespondentProfile(completeProfile);
      setProfile(completeProfile);
      setStep('background');
    } catch (error) {
      Alert.alert('Save failed', 'Profile was not saved to Firebase. Check configuration or connection.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveBackground() {
    setIsSaving(true);
    try {
      await saveBackgroundProfile(profile.respondentId, background);
      setStep('pretest');
    } catch (error) {
      Alert.alert('Save failed', 'Background profile was not saved.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSubmitTest(testType: 'pretest' | 'posttest') {
    const questions = testType === 'pretest' ? pretestQuestions : posttestQuestions;
    const answers = testType === 'pretest' ? pretestAnswers : posttestAnswers;

    if (!isAllQuestionsAnswered(questions, answers)) {
      Alert.alert('Incomplete test', 'Please answer all questions before submitting.');
      return;
    }

    const score = calculateTestScore(questions, answers);
    setIsSaving(true);
    try {
      await saveTestResult({
        respondentId: profile.respondentId,
        group: profile.group,
        testType,
        answers,
        score,
        totalQuestions: questions.length,
        submittedAtIso: nowIso()
      });
      setStep(testType === 'pretest' ? 'home' : 'questionnaire');
    } catch (error) {
      Alert.alert('Save failed', 'Test result was not saved.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  function openLesson(index: number) {
    setCurrentModuleIndex(index);
    setLessonStartMs(Date.now());
    setStep('lesson');
  }

  async function handleCompleteLesson() {
    const module = lessonModules[currentModuleIndex];
    const selectedOption = quizAnswers[module.quiz.id];
    if (!selectedOption) {
      Alert.alert('Quiz not answered', 'Please answer the lesson quiz before completing this module.');
      return;
    }

    const progress: ModuleProgress = {
      moduleId: module.id,
      quizAnswer: selectedOption,
      quizCorrect: selectedOption === module.quiz.correctOptionId,
      timeSpentSeconds: secondsSince(lessonStartMs)
    };

    setIsSaving(true);
    try {
      await saveModuleProgress(profile.respondentId, profile.group, progress);
      setModuleProgress((current) => ({ ...current, [module.id]: progress }));
      if (isGamified) {
        setGamificationState((current) => awardModuleCompletion(current, module.id, progress.quizCorrect));
      }
      setStep('home');
    } catch (error) {
      Alert.alert('Save failed', 'Module progress was not saved.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSubmitQuestionnaire() {
    const result: QuestionnaireResult = {
      respondentId: profile.respondentId,
      group: profile.group,
      ...(isGamified
        ? {
            gamViews,
            gamMotivation,
            gamBasicNeeds,
            gamBenefits,
            gamFutureUse,
            openEnded: {
              mostUseful: openEndedMostUseful,
              leastUseful: openEndedLeastUseful,
              improvement: openEndedImprovement
            }
          }
        : {}),
      submittedAtIso: nowIso()
    };

    setIsSaving(true);
    try {
      await saveQuestionnaire(result);
      setStep('complete');
    } catch (error) {
      Alert.alert('Save failed', 'Questionnaire could not be saved locally.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  function renderWelcome() {
    return (
      <Screen title="Coding Learning Study" subtitle="Microlearning coding app with gamification ON/OFF mode.">
        <Card>
          <Text style={styles.paragraph}>
            This prototype is designed for busy beginner learners with little to no coding experience.
            The researcher will assign each respondent to a testing group.
          </Text>
          <FormField
            label="Your Name"
            placeholder="Example: Dennis"
            value={profile.respondentId}
            autoCapitalize="characters"
            onChangeText={(value) => updateProfile('respondentId', value)}
          />
          <FormField
            label="Gammification"
            placeholder="ON/OFF"
            value={groupCode}
            autoCapitalize="characters"
            onChangeText={setGroupCode}
          />
          <AppButton title="Continue" onPress={handleWelcomeNext} />
        </Card>
      </Screen>
    );
  }

  function renderDemographics() {
    return (
      <Screen title="Demographic Data" subtitle="Collected before the learning session.">
        <Card>
          <FormField label="Age"
          placeholder="Example: 25"
          keyboardType="numeric" 
          value={profile.age} 
          onChangeText={(v) => updateProfile('age', v)} />
          <FormField label="Gender" value={profile.gender} onChangeText={(v) => updateProfile('gender', v)} />
          <FormField label="Occupation" 
            placeholder="e.g., Teacher, Engineer, Student" 
            value={profile.occupation} 
            onChangeText={(v) => updateProfile('occupation', v)} />
          <FormField label="Education level" 
            placeholder="e.g., SMP, SMA, S1, etc." 
            value={profile.education} 
            onChangeText={(v) => updateProfile('education', v)} />
          <FormField
            label="Working/studying hours per day"
            placeholder="Example: 8"
            value={profile.workingOrStudyingHours}
            onChangeText={(v) => updateProfile('workingOrStudyingHours', v)}
          />
          <FormField
            label="Prior coding experience"
            placeholder="None / less than 1 month / basic course"
            value={profile.priorCodingExperience}
            onChangeText={(v) => updateProfile('priorCodingExperience', v)}
          />
          <FormField
            label="Reason for learning coding"
            multiline
            value={profile.reasonLearningCoding}
            onChangeText={(v) => updateProfile('reasonLearningCoding', v)}
          />
          <FormField
            label="Realistic daily learning time"
            placeholder="Example: 10 minutes/day"
            value={profile.dailyLearningTime}
            onChangeText={(v) => updateProfile('dailyLearningTime', v)}
          />
          <AppButton title={isSaving ? 'Saving...' : 'Save and Continue'} disabled={isSaving} onPress={handleSaveDemographics} />
        </Card>
      </Screen>
    );
  }

  function renderBackground() {
    return (
      <Screen title="Basic Coding Background" subtitle="1 = strongly disagree, 5 = strongly agree.">
        <Card>
          <LikertItem
            label="I have prior experience learning programming."
            value={background.priorExperience}
            onChange={(value) => setBackground((current) => ({ ...current, priorExperience: value }))}
          />
          <LikertItem
            label="I understand basic programming concepts."
            value={background.basicConceptUnderstanding}
            onChange={(value) => setBackground((current) => ({ ...current, basicConceptUnderstanding: value }))}
          />
          <LikertItem
            label="I feel confident learning coding."
            value={background.confidenceLearningCoding}
            onChange={(value) => setBackground((current) => ({ ...current, confidenceLearningCoding: value }))}
          />
          <LikertItem
            label="I believe coding is difficult to learn."
            value={background.codingFeelsDifficult}
            onChange={(value) => setBackground((current) => ({ ...current, codingFeelsDifficult: value }))}
          />
          <LikertItem
            label="I am interested in learning coding for work or career purposes."
            value={background.careerInterest}
            onChange={(value) => setBackground((current) => ({ ...current, careerInterest: value }))}
          />
          <LikertItem
            label="I often feel too busy to learn a new technical skill."
            value={background.tooBusyToLearn}
            onChange={(value) => setBackground((current) => ({ ...current, tooBusyToLearn: value }))}
          />
          <AppButton title={isSaving ? 'Saving...' : 'Continue to Pretest'} disabled={isSaving} onPress={handleSaveBackground} />
        </Card>
      </Screen>
    );
  }

  function renderTest(testType: 'pretest' | 'posttest') {
    const questions = testType === 'pretest' ? pretestQuestions : posttestQuestions;
    const answers = testType === 'pretest' ? pretestAnswers : posttestAnswers;
    const setAnswers = testType === 'pretest' ? setPretestAnswers : setPosttestAnswers;
    const title = testType === 'pretest' ? 'Pretest' : 'Posttest';
    const subtitle =
      testType === 'pretest'
        ? 'Answer before using the learning modules.'
        : 'Answer after completing all learning modules.';

    return (
      <Screen title={title} subtitle={subtitle}>
        {questions.map((question, index) => (
          <View key={question.id}>
            <Text style={styles.questionNumber}>Question {index + 1}</Text>
            <QuestionCard
              question={question}
              selectedOptionId={answers[question.id]}
              onSelect={(optionId) => setAnswers((current) => ({ ...current, [question.id]: optionId }))}
            />
          </View>
        ))}
        <AppButton
          title={isSaving ? 'Submitting...' : `Submit ${title}`}
          disabled={isSaving}
          onPress={() => handleSubmitTest(testType)}
        />
      </Screen>
    );
  }

  function renderHome() {
    return (
      <Screen
        title="Learning Modules"
        subtitle={`Group: ${isGamified ? 'Gamification ON' : 'Gamification OFF'}`}
      >
        {isGamified ? (
          <GamificationPanel state={gamificationState} />
        ) : (
          <Card>
            <Text style={styles.cardTitle}>Learning Progress</Text>
            <ProgressBar progress={learningProgress} />
            <Text style={styles.caption}>{completedCount} of {totalModules} modules completed</Text>
          </Card>
        )}

        {lessonModules.map((module, index) => {
          const completed = Boolean(moduleProgress[module.id]);
          return (
            <Card key={module.id}>
              <Text style={styles.cardTitle}>{module.title}</Text>
              <Text style={styles.caption}>{module.estimatedMinutes} minutes</Text>
              <Text style={styles.paragraph}>{module.learningGoal}</Text>
              <AppButton
                title={completed ? 'Review Module' : 'Start Module'}
                variant={completed ? 'secondary' : 'primary'}
                onPress={() => openLesson(index)}
              />
            </Card>
          );
        })}

        {completedCount === totalModules ? (
          <AppButton title="Continue to Posttest" onPress={() => setStep('posttest')} />
        ) : (
          <Text style={styles.helperText}>Complete all modules to unlock the posttest.</Text>
        )}
      </Screen>
    );
  }

  function renderLesson() {
    const module = lessonModules[currentModuleIndex];
    const progress = moduleProgress[module.id];
    const selectedOptionId = quizAnswers[module.quiz.id];
    const correct = selectedOptionId === module.quiz.correctOptionId;

    return (
      <Screen title={module.title} subtitle={module.learningGoal}>
        <Card>
          <Text style={styles.cardTitle}>Short Lesson</Text>
          <Text style={styles.paragraph}>{module.explanation}</Text>
          {module.exampleCode ? <Text style={styles.code}>{module.exampleCode}</Text> : null}
        </Card>

        <QuestionCard
          question={module.quiz}
          selectedOptionId={selectedOptionId}
          onSelect={(optionId) => setQuizAnswers((current) => ({ ...current, [module.quiz.id]: optionId }))}
          showTopic={false}
        />

        {selectedOptionId ? (
          <Card>
            <Text style={correct ? styles.correctText : styles.incorrectText}>
              {correct ? 'Correct. Good job.' : 'Not correct yet. Review the explanation and try to understand the logic.'}
            </Text>
          </Card>
        ) : null}

        {progress ? (
          <Text style={styles.helperText}>This module was already completed. Submitting again will not duplicate progress.</Text>
        ) : null}

        <AppButton title={isSaving ? 'Saving...' : 'Complete Module'} disabled={isSaving} onPress={handleCompleteLesson} />
        <AppButton title="Back to Modules" variant="secondary" onPress={() => setStep('home')} />
      </Screen>
    );
  }

  function renderQuestionnaire() {
    return (
      <Screen title="Post-Use Questionnaire" subtitle="1 = strongly disagree, 5 = strongly agree.">
        {/* Gamification-attitude questions — ON group only */}
        {isGamified ? (
          <>
            <LikertSection
              title={gamificationQuestionnaire.section1.title}
              stem={gamificationQuestionnaire.section1.stem}
              items={gamificationQuestionnaire.section1.items}
              values={gamViews}
              onChange={setGamViews}
            />
            <Card>
              <Text style={styles.cardTitle}>{gamificationQuestionnaire.section2.title}</Text>
              <Text style={styles.paragraph}>{gamificationQuestionnaire.section2.question}</Text>
              {gamificationQuestionnaire.section2.options.map((option, index) => (
                <Pressable
                  key={option}
                  onPress={() => setGamMotivation(index + 1)}
                  style={[radioStyle.option, gamMotivation === index + 1 && radioStyle.optionSelected]}
                >
                  <Text style={[radioStyle.optionText, gamMotivation === index + 1 && radioStyle.optionTextSelected]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </Card>
            <LikertSection
              title={gamificationQuestionnaire.section3.title}
              stem={gamificationQuestionnaire.section3.stem}
              items={gamificationQuestionnaire.section3.items}
              values={gamBasicNeeds}
              onChange={setGamBasicNeeds}
            />
            <LikertSection
              title={gamificationQuestionnaire.section4.title}
              stem={gamificationQuestionnaire.section4.stem}
              items={gamificationQuestionnaire.section4.items}
              values={gamBenefits}
              onChange={setGamBenefits}
            />
            <LikertSection
              title={gamificationQuestionnaire.section5.title}
              stem={gamificationQuestionnaire.section5.stem}
              items={gamificationQuestionnaire.section5.items}
              values={gamFutureUse}
              onChange={setGamFutureUse}
            />
            <Card>
              <Text style={styles.cardTitle}>Open-ended Feedback</Text>
              <FormField
                label="Which gamification element motivated you the most? Why?"
                multiline
                value={openEndedMostUseful}
                onChangeText={setOpenEndedMostUseful}
              />
              <FormField
                label="Which gamification element was least useful? Why?"
                multiline
                value={openEndedLeastUseful}
                onChangeText={setOpenEndedLeastUseful}
              />
              <FormField
                label="What should be improved?"
                multiline
                value={openEndedImprovement}
                onChangeText={setOpenEndedImprovement}
              />
            </Card>
          </>
        ) : null}
        <AppButton
          title={isSaving ? 'Submitting...' : 'Submit Questionnaire'}
          disabled={isSaving}
          onPress={handleSubmitQuestionnaire}
        />
      </Screen>
    );
  }

  function renderComplete() {
    const gain = posttestScore - pretestScore;
    const gainColor = gain > 0 ? '#0F7A3B' : gain < 0 ? '#B42318' : '#64748B';
    const gainBg = gain > 0 ? '#DCFCE7' : gain < 0 ? '#FEE2E2' : '#F1F5F9';
    const gainSign = gain > 0 ? '+' : '';
    return (
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={completeStyles.hero}>
          <View style={completeStyles.iconCircle}>
            <Text style={completeStyles.iconEmoji}>🎉</Text>
          </View>
          <Text style={completeStyles.heroTitle}>Study Completed!</Text>
          <Text style={completeStyles.heroSubtitle}>Thank you for participating.</Text>
        </View>

        <View style={completeStyles.badgeRow}>
          <View style={completeStyles.badge}>
            <Text style={completeStyles.badgeText}>ID: {profile.respondentId}</Text>
          </View>
          <View style={[completeStyles.badge, isGamified && completeStyles.groupBadgeOn]}>
            <Text style={[completeStyles.badgeText, isGamified && completeStyles.groupBadgeOnText]}>
              {isGamified ? '✦ Gamification ON' : 'Gamification OFF'}
            </Text>
          </View>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Test Scores</Text>
          <View style={completeStyles.scoreRow}>
            <View style={completeStyles.scoreBox}>
              <Text style={completeStyles.scoreLabel}>Pretest</Text>
              <Text style={completeStyles.scoreValue}>{pretestScore}</Text>
            </View>
            <View style={completeStyles.scoreDivider} />
            <View style={completeStyles.scoreBox}>
              <Text style={completeStyles.scoreLabel}>Posttest</Text>
              <Text style={completeStyles.scoreValue}>{posttestScore}</Text>
            </View>
          </View>
          <View style={completeStyles.gainRow}>
            <Text style={completeStyles.gainLabel}>Learning Gain</Text>
            <View style={[completeStyles.gainBadge, { backgroundColor: gainBg }]}>
              <Text style={[completeStyles.gainValue, { color: gainColor }]}>
                {gainSign}{gain} pts
              </Text>
            </View>
          </View>
        </Card>

      </ScrollView>
    );
  }

  function renderStep() {
    switch (step) {
      case 'welcome':
        return renderWelcome();
      case 'demographics':
        return renderDemographics();
      case 'background':
        return renderBackground();
      case 'pretest':
        return renderTest('pretest');
      case 'home':
        return renderHome();
      case 'lesson':
        return renderLesson();
      case 'posttest':
        return renderTest('posttest');
      case 'questionnaire':
        return renderQuestionnaire();
      case 'complete':
        return renderComplete();
      default:
        return renderWelcome();
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {renderStep()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

interface ScreenProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function Screen({ title, subtitle, children }: ScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </ScrollView>
  );
}

interface LikertSectionProps {
  title: string;
  stem?: string;
  items: readonly string[];
  values: Record<string, number>;
  onChange: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

function LikertSection({ title, stem, items, values, onChange }: LikertSectionProps) {
  return (
    <Card>
      <Text style={styles.cardTitle}>{title}</Text>
      {stem ? <Text style={styles.paragraph}>{stem}</Text> : null}
      {items.map((item, index) => {
        const key = `item_${index + 1}`;
        return (
          <LikertItem
            key={key}
            label={item}
            value={values[key] ?? 3}
            onChange={(value) => onChange((current) => ({ ...current, [key]: value }))}
          />
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF3F8'
  },
  container: {
    flex: 1
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 42
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
    marginTop: 12,
    marginBottom: 6,
    lineHeight: 34
  },
  subtitle: {
    color: '#64748B',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14
  },
  paragraph: {
    color: '#334155',
    lineHeight: 22,
    fontSize: 15,
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 10
  },
  caption: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 8
  },
  helperText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20
  },
  questionNumber: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 2
  },
  code: {
    backgroundColor: '#111827',
    color: '#F9FAFB',
    fontFamily: 'monospace',
    padding: 12,
    borderRadius: 12,
    lineHeight: 20,
    marginTop: 4
  },
  correctText: {
    color: '#0F7A3B',
    fontSize: 15,
    fontWeight: '700'
  },
  incorrectText: {
    color: '#B42318',
    fontSize: 15,
    fontWeight: '700'
  },
  summaryText: {
    color: '#1F2937',
    fontSize: 15,
    lineHeight: 24
  }
});

const completeStyles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#2F6FED',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  iconEmoji: {
    fontSize: 38,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 6,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  groupBadgeOn: {
    backgroundColor: '#EEF3FF',
    borderColor: '#BFD0FF',
    borderWidth: 1,
  },
  groupBadgeOnText: {
    color: '#2F6FED',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  scoreBox: {
    flex: 1,
    alignItems: 'center',
  },
  scoreDivider: {
    width: 1,
    height: 48,
    backgroundColor: '#E2E8F0',
  },
  scoreLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#111827',
  },
  gainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  gainLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  gainBadge: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  gainValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  metricLabel: {
    fontSize: 13,
    color: '#475569',
    width: 90,
    fontWeight: '500',
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  barFill: {
    height: 8,
    backgroundColor: '#2F6FED',
    borderRadius: 4,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    width: 36,
    textAlign: 'right',
  },
  scaleNote: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'right',
    marginTop: 8,
  },
});

const radioStyle = StyleSheet.create({
  option: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 4,
  },
  optionSelected: {
    backgroundColor: '#EEF3FF',
    borderColor: '#2F6FED',
  },
  optionText: {
    fontSize: 14,
    color: '#475569',
  },
  optionTextSelected: {
    color: '#2F6FED',
    fontWeight: '700',
  },
});
