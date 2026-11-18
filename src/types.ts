export interface Morphology {
  root: string;
  affixes: string[];
  isBorrowed: boolean;
}

export interface LinguisticToken {
  text: string;
  language: "Bangla" | "English" | "Mixed" | "Punctuation/Other";
  transliterated: string;
  posTag: string;
  nerTag: string;
  morphology: Morphology;
  englishGloss: string;
}

export interface LanguageStats {
  banglaWordCount: number;
  englishWordCount: number;
  mixedWordCount: number;
  punctuationCount: number;
  codeMixingIndex: number; // 0 to 100
  dominantLanguage: string;
}

export interface Classification {
  switchingType: string;
  matrixLanguage: string;
  switchingPointsCount: number;
}

export interface BorrowedWord {
  word: string;
  sourceLanguage: string;
  targetSyntax: string;
  frequency: number;
}

export interface SentenceStructure {
  sentence: string;
  type: string;
  languagePattern: string;
  cmi: number;
}

export interface SlangItem {
  term: string;
  meaning: string;
  category: string;
}

export interface Sentiment {
  label: "Positive" | "Negative" | "Neutral" | string;
  score: number;
}

export interface EmojiItem {
  emoji: string;
  linguisticFunction: string;
}

export interface LinguisticsAnalysis {
  summary: string;
  languageStats: LanguageStats;
  classification: Classification;
  tokens: LinguisticToken[];
  borrowedVocabulary: BorrowedWord[];
  sentenceStructure: SentenceStructure[];
  slangAndInformal: SlangItem[];
  sentiment: Sentiment;
  emojis: EmojiItem[];
}

export interface CorpusItem {
  id: string;
  text: string;
  timestamp: string;
  analysis: LinguisticsAnalysis;
  tags?: string;
  researcherNotes?: string;
}
