import { CorpusItem } from "./types";

export const initialCorpus: CorpusItem[] = [
  {
    id: "sample-1",
    text: "Ami coding-e bhalo na kintu amader project-ta osadharon hobe! Let's do this.",
    timestamp: "2026-07-13T10:00:00.000Z",
    tags: "Social Media, Hybrid Verbs",
    researcherNotes: "Demonstrates high intra-sentential switching, English nouns attached to Bangla clitics/suffixes ('project-ta'), and mixed verb constructs.",
    analysis: {
      summary: "This sample showcases intra-sentential code-switching with a Bangla matrix language frame. It features structural hybridization where the English lexical root 'project' is embedded with the Bangla definite clitic '-ta' ('project-ta'), illustrating insertional code-mixing. A clean language switch to English occurs at the sentence boundary ('Let's do this').",
      languageStats: {
        banglaWordCount: 8,
        englishWordCount: 3,
        mixedWordCount: 2,
        punctuationCount: 3,
        codeMixingIndex: 38.5,
        dominantLanguage: "Bangla"
      },
      classification: {
        switchingType: "Intra-sentential & Insertional",
        matrixLanguage: "Bangla",
        switchingPointsCount: 3
      },
      tokens: [
        {
          text: "Ami",
          language: "Bangla",
          transliterated: "আমি",
          posTag: "PRON",
          nerTag: "O",
          morphology: { root: "ami", affixes: [], isBorrowed: false },
          englishGloss: "I"
        },
        {
          text: "coding-e",
          language: "Mixed",
          transliterated: "কোডিং-এ",
          posTag: "NOUN",
          nerTag: "O",
          morphology: { root: "coding", affixes: ["-e (locative)"], isBorrowed: true },
          englishGloss: "in coding"
        },
        {
          text: "bhalo",
          language: "Bangla",
          transliterated: "ভালো",
          posTag: "ADJ",
          nerTag: "O",
          morphology: { root: "bhalo", affixes: [], isBorrowed: false },
          englishGloss: "good"
        },
        {
          text: "na",
          language: "Bangla",
          transliterated: "না",
          posTag: "PART",
          nerTag: "O",
          morphology: { root: "na", affixes: [], isBorrowed: false },
          englishGloss: "not"
        },
        {
          text: "kintu",
          language: "Bangla",
          transliterated: "কিন্তু",
          posTag: "CCONJ",
          nerTag: "O",
          morphology: { root: "kintu", affixes: [], isBorrowed: false },
          englishGloss: "but"
        },
        {
          text: "amader",
          language: "Bangla",
          transliterated: "আমাদের",
          posTag: "PRON",
          nerTag: "O",
          morphology: { root: "ami", affixes: ["-er (genitive)"], isBorrowed: false },
          englishGloss: "our"
        },
        {
          text: "project-ta",
          language: "Mixed",
          transliterated: "প্রজেক্ট-টা",
          posTag: "NOUN",
          nerTag: "O",
          morphology: { root: "project", affixes: ["-ta (definite clitic)"], isBorrowed: true },
          englishGloss: "the project"
        },
        {
          text: "osadharon",
          language: "Bangla",
          transliterated: "অসাধারণ",
          posTag: "ADJ",
          nerTag: "O",
          morphology: { root: "osadharon", affixes: [], isBorrowed: false },
          englishGloss: "extraordinary"
        },
        {
          text: "hobe!",
          language: "Bangla",
          transliterated: "হবে!",
          posTag: "VERB",
          nerTag: "O",
          morphology: { root: "howa", affixes: ["-be (future)"], isBorrowed: false },
          englishGloss: "will be"
        },
        {
          text: "Let's",
          language: "English",
          transliterated: "লেটস",
          posTag: "PRON",
          nerTag: "O",
          morphology: { root: "let", affixes: ["'s"], isBorrowed: false },
          englishGloss: "Let us"
        },
        {
          text: "do",
          language: "English",
          transliterated: "ডু",
          posTag: "VERB",
          nerTag: "O",
          morphology: { root: "do", affixes: [], isBorrowed: false },
          englishGloss: "do"
        },
        {
          text: "this.",
          language: "English",
          transliterated: "দিস",
          posTag: "PRON",
          nerTag: "O",
          morphology: { root: "this", affixes: [], isBorrowed: false },
          englishGloss: "this"
        }
      ],
      borrowedVocabulary: [
        {
          word: "coding-e",
          sourceLanguage: "English",
          targetSyntax: "English root 'coding' with Bangla locative case suffix '-e'",
          frequency: 1
        },
        {
          word: "project-ta",
          sourceLanguage: "English",
          targetSyntax: "English root 'project' with Bangla definite marker '-ta'",
          frequency: 1
        }
      ],
      sentenceStructure: [
        {
          sentence: "Ami coding-e bhalo na kintu amader project-ta osadharon hobe!",
          type: "Compound",
          languagePattern: "B-M-B-B-B-B-M-B-B",
          cmi: 22.2
        },
        {
          sentence: "Let's do this.",
          type: "Simple",
          languagePattern: "E-E-E",
          cmi: 0
        }
      ],
      slangAndInformal: [
        {
          term: "osadharon",
          meaning: "Extraordinary / Awesome (used colloquially in hyperbolic expressions)",
          category: "Bangla colloquialism"
        }
      ],
      sentiment: {
        label: "Positive",
        score: 0.95
      },
      emojis: []
    }
  },
  {
    id: "sample-2",
    text: "Ami CS e interested",
    timestamp: "2026-07-12T14:30:00.000Z",
    tags: "Academic, Career Choice",
    researcherNotes: "Illustrates insertion of English subject domain abbreviations ('CS') and participial adjectives ('interested') into simple Bangla frames.",
    analysis: {
      summary: "This sample demonstrates insertional code-mixing where the speaker inserts the English acronym 'CS' (Computer Science) and the English adjective 'interested' into a Bangla matrix structure powered by the pronoun 'Ami' and locative suffix 'e'.",
      languageStats: {
        banglaWordCount: 2,
        englishWordCount: 2,
        mixedWordCount: 0,
        punctuationCount: 0,
        codeMixingIndex: 50.0,
        dominantLanguage: "Mixed"
      },
      classification: {
        switchingType: "Insertional",
        matrixLanguage: "Bangla",
        switchingPointsCount: 2
      },
      tokens: [
        {
          text: "Ami",
          language: "Bangla",
          transliterated: "আমি",
          posTag: "PRON",
          nerTag: "O",
          morphology: { root: "ami", affixes: [], isBorrowed: false },
          englishGloss: "I"
        },
        {
          text: "CS",
          language: "English",
          transliterated: "সিএস",
          posTag: "PROPN",
          nerTag: "O",
          morphology: { root: "CS", affixes: [], isBorrowed: true },
          englishGloss: "Computer Science"
        },
        {
          text: "e",
          language: "Bangla",
          transliterated: "এ",
          posTag: "ADP",
          nerTag: "O",
          morphology: { root: "e", affixes: [], isBorrowed: false },
          englishGloss: "in / at"
        },
        {
          text: "interested",
          language: "English",
          transliterated: "ইন্টারেস্টেড",
          posTag: "ADJ",
          nerTag: "O",
          morphology: { root: "interested", affixes: [], isBorrowed: true },
          englishGloss: "interested"
        }
      ],
      borrowedVocabulary: [
        {
          word: "CS",
          sourceLanguage: "English",
          targetSyntax: "Acronym representing academic discipline",
          frequency: 1
        },
        {
          word: "interested",
          sourceLanguage: "English",
          targetSyntax: "Predicate adjective following the locative noun phrase",
          frequency: 1
        }
      ],
      sentenceStructure: [
        {
          sentence: "Ami CS e interested",
          type: "Simple",
          languagePattern: "B-E-B-E",
          cmi: 50.0
        }
      ],
      slangAndInformal: [
        {
          term: "CS",
          meaning: "Computer Science (academic shorthand)",
          category: "English abbreviation"
        }
      ],
      sentiment: {
        label: "Positive",
        score: 0.90
      },
      emojis: []
    }
  }
];
