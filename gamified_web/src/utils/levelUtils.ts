import type { TFunction } from 'i18next';

export function getLocalizedLevel<T extends {
  id: string;
  missionTitle: string;
  story: string;
  primaryConcept: string;
  learningObjective: string;
  missionObjective?: string;
  hint: string;
  feedbackIncorrect: string;
  gameData: any;
}>(level: T, t: TFunction): T {
  if (!level) return level;

  // Localize basic level fields
  const localizedTitle = t(`levels.${level.id}.missionTitle`, { defaultValue: level.missionTitle });
  const localizedStory = t(`levels.${level.id}.story`, { defaultValue: level.story });
  const localizedConcept = t(`levels.${level.id}.primaryConcept`, { defaultValue: level.primaryConcept });
  const localizedObjective = t(`levels.${level.id}.learningObjective`, { defaultValue: level.learningObjective });
  const localizedMissionObjective = level.missionObjective
    ? t(`levels.${level.id}.missionObjective`, { defaultValue: level.missionObjective })
    : level.missionObjective;
  const localizedHint = t(`levels.${level.id}.hint`, { defaultValue: level.hint });
  const localizedFeedback = t(`levels.${level.id}.feedbackIncorrect`, { defaultValue: level.feedbackIncorrect });

  // Deep clone gameData to customize translated fields
  const newGameData = { ...level.gameData };

  if (newGameData.logicPremise) {
    newGameData.logicPremise = t(`levels.${level.id}.logicPremise`, { defaultValue: newGameData.logicPremise });
  }

  if (Array.isArray(newGameData.logicOptions)) {
    newGameData.logicOptions = newGameData.logicOptions.map((opt: string, idx: number) => {
      return t(`levels.${level.id}.logicOptions.${idx}`, { defaultValue: t(`commonOptions.${opt}`, { defaultValue: opt }) });
    });
  }

  if (newGameData.logicAnswer) {
    newGameData.logicAnswer = t(`levels.${level.id}.logicAnswer`, {
      defaultValue: t(`commonOptions.${newGameData.logicAnswer}`, { defaultValue: newGameData.logicAnswer }),
    });
  }

  if (Array.isArray(newGameData.options)) {
    newGameData.options = newGameData.options.map((opt: string, idx: number) => {
      return t(`levels.${level.id}.options.${idx}`, { defaultValue: t(`commonOptions.${opt}`, { defaultValue: opt }) });
    });
  }

  if (newGameData.correctOption) {
    newGameData.correctOption = t(`levels.${level.id}.correctOption`, {
      defaultValue: t(`commonOptions.${newGameData.correctOption}`, { defaultValue: newGameData.correctOption }),
    });
  }

  if (Array.isArray(newGameData.phases)) {
    newGameData.phases = newGameData.phases.map((phase: any, pIdx: number) => ({
      ...phase,
      title: t(`levels.${level.id}.phases.${pIdx}.title`, { defaultValue: phase.title }),
      description: t(`levels.${level.id}.phases.${pIdx}.description`, { defaultValue: phase.description }),
      instruction: t(`levels.${level.id}.phases.${pIdx}.instruction`, { defaultValue: phase.instruction }),
    }));
  }

  return {
    ...level,
    missionTitle: localizedTitle,
    story: localizedStory,
    primaryConcept: localizedConcept,
    learningObjective: localizedObjective,
    missionObjective: localizedMissionObjective,
    hint: localizedHint,
    feedbackIncorrect: localizedFeedback,
    gameData: newGameData,
  };
}
