import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily
let ai: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Helping AI Assistant API Endpoint
app.post("/api/assistant", async (req, res) => {
  try {
    const { messages, context } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Chat messages are required and must be an array." });
    }

    const client = getGemini();

    const systemInstruction = `You are "LinguoLens Helper AI", a highly specialized, friendly and smart research assistant for computational linguistics and code-mixing (specifically Bangla-English / Banglish).
Your goal is to assist researchers, students, and language lovers in understanding code-mixing patterns, the Matrix Language Frame (MLF) model, calculating CMI, or drafting corpus entries.

Guidelines:
1. Provide short, concise, engaging responses that directly answer the query. Avoid walls of text. Use bullet points and bold formatting for clarity.
2. If requested, generate code-mixed or code-switched phrases based on custom scenarios or sliders.
3. Be professional yet warm. Keep explanations accessible but academically sound.
4. Reference specific code-mixing indicators like CMI (Code-Mixing Index) and borrowability when appropriate.

Current workspace context:
- Input Text: "${context?.inputText || ''}"
- Slider - CMI Target: ${context?.mixerCmi || 50}%
- Slider - Bias: ${context?.mixerBalance || 50}%
- Slider - Noise/Density: ${context?.mixerNoise || 40}%
- Active Theme: "${context?.theme || 'slate'}"`;

    const chatContents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents,
      config: {
        systemInstruction,
      }
    });

    const reply = response.text || "I apologize, I could not generate a response. Please try again!";
    res.json({ text: reply });
  } catch (error: any) {
    console.error("Assistant API Error:", error);
    res.status(500).json({ error: error?.message || "An error occurred in the Helping AI Assistant service." });
  }
});

// Code-Mixing Analysis API Endpoint
app.post("/api/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text to analyze is required and must be a string." });
    }

    const client = getGemini();

    const systemInstruction = `You are an expert computational linguist specializing in South Asian languages, specifically Bangla-English (Banglish) code-mixing, code-switching, borrowing, and transliterated linguistics.
Your task is to analyze mixed Bangla-English inputs and return highly accurate, structural, and semantic linguistic features in JSON format.

Linguistic Rules:
1. "Language" classification for each token:
   - "Bangla": Bangla script or Romanized/transliterated Bangla (e.g. "bhalo", "khabar", "amader").
   - "English": Standard English words (e.g. "nice", "food", "coding").
   - "Mixed": Hybrid words combining both, such as an English root with a Bangla suffix or prefix (e.g. "phone-ta" [the phone], "coding-e" [in coding], "standard-gulo" [the standards]).
   - "Punctuation/Other": Symbols, punctuation, or numbers.
2. Transliteration rule:
   - For a token in Bangla script, provide its Romanized transliteration (e.g. "ভালো" -> "bhalo").
   - For a token in transliterated/Romanized Bangla (e.g. "bhalo"), provide its Bangla script equivalent (e.g. "ভালো").
   - For an English token, provide its transliterated phonetic/Bangla form (e.g. "hello" -> "হ্যালো").
3. Part of Speech (POS) tagging: Use standard Universal POS tags (NOUN, VERB, ADJ, PRON, ADV, DET, ADP, CCONJ, SCONJ, AUX, PART, INTJ, PUNCT, PROPN).
4. Named Entity Recognition (NER) tags: O, B-PER, I-PER, B-LOC, I-LOC, B-ORG, I-ORG, B-MISC, I-MISC.
5. Morphological analysis: Identify root/lemma, affixes, and whether the word is a borrowed/loan word (e.g. "biler" has English root "bill" + Bangla genitive suffix "er", or English "table" in Bangla is borrowed).
6. Code-Mixing Index (CMI): Calculate a standard Code-Mixing Index for the text between 0 and 100. Let CMI = 0 for monolingual texts, and higher for mixed texts, based on ratio of non-matrix language tokens.
7. Switching classification:
   - switchingType: "Insertional" (English content words inserted into Bangla grammatical structure), "Alternational" (alternating clauses/phrases in different languages), "Intra-sentential" (switching inside a sentence), "Intersentential" (switching between sentences), or "None".
   - matrixLanguage: The base grammatical frame language ("Bangla" or "English" or "Unknown").
8. Emojis function: Describe the pragmatic function of each emoji (e.g. "sentiment amplifier", "playful sarcasm marker").
9. Emojis and Slang must be extracted.

Ensure the output is 100% valid JSON matching the exact schema specified. Do not wrap in markdown quotes unless requested, but here you must respond with raw JSON in the JSON response MIME mode.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Perform a full computational linguistics and code-mixing analysis on the following text:
"${text}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["summary", "languageStats", "classification", "tokens", "borrowedVocabulary", "sentenceStructure", "slangAndInformal", "sentiment", "emojis"],
          properties: {
            summary: {
              type: Type.STRING,
              description: "A professional academic abstract summarizing the linguistic properties of the code-mixed input."
            },
            languageStats: {
              type: Type.OBJECT,
              required: ["banglaWordCount", "englishWordCount", "mixedWordCount", "punctuationCount", "codeMixingIndex", "dominantLanguage"],
              properties: {
                banglaWordCount: { type: Type.INTEGER },
                englishWordCount: { type: Type.INTEGER },
                mixedWordCount: { type: Type.INTEGER },
                punctuationCount: { type: Type.INTEGER },
                codeMixingIndex: { 
                  type: Type.NUMBER,
                  description: "Linguistic index (0 to 100) indicating the frequency/ratio of code-mixing."
                },
                dominantLanguage: { 
                  type: Type.STRING,
                  description: "The primary language of the text ('Bangla', 'English', or 'Balanced')."
                }
              }
            },
            classification: {
              type: Type.OBJECT,
              required: ["switchingType", "matrixLanguage", "switchingPointsCount"],
              properties: {
                switchingType: { 
                  type: Type.STRING,
                  description: "Insertional, Alternational, Intra-sentential, Intersentential, or None."
                },
                matrixLanguage: { 
                  type: Type.STRING,
                  description: "The grammatical frame/matrix language ('Bangla', 'English', or 'Mixed')."
                },
                switchingPointsCount: { type: Type.INTEGER }
              }
            },
            tokens: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["text", "language", "transliterated", "posTag", "nerTag", "morphology", "englishGloss"],
                properties: {
                  text: { type: Type.STRING, description: "The original token word" },
                  language: { type: Type.STRING, description: "Bangla, English, Mixed, or Punctuation/Other" },
                  transliterated: { type: Type.STRING, description: "Transliteration/Phonetic conversion (e.g. script to Latin or Latin to script, or English to Bangla sound)" },
                  posTag: { type: Type.STRING, description: "Standard Universal POS Tag" },
                  nerTag: { type: Type.STRING, description: "Named Entity tag (e.g. O, B-LOC, B-PER)" },
                  morphology: {
                    type: Type.OBJECT,
                    required: ["root", "affixes", "isBorrowed"],
                    properties: {
                      root: { type: Type.STRING, description: "The root lemma" },
                      affixes: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING },
                        description: "List of identified affixes (prefixes or suffixes)" 
                      },
                      isBorrowed: { type: Type.BOOLEAN, description: "Whether it represents a lexical borrowing" }
                    }
                  },
                  englishGloss: { type: Type.STRING, description: "Semantic gloss or direct translation of the token" }
                }
              }
            },
            borrowedVocabulary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["word", "sourceLanguage", "targetSyntax", "frequency"],
                properties: {
                  word: { type: Type.STRING },
                  sourceLanguage: { type: Type.STRING },
                  targetSyntax: { type: Type.STRING, description: "Grammatical context of use, e.g., 'English noun with Bangla genitive affix'" },
                  frequency: { type: Type.INTEGER }
                }
              }
            },
            sentenceStructure: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["sentence", "type", "languagePattern", "cmi"],
                properties: {
                  sentence: { type: Type.STRING },
                  type: { type: Type.STRING, description: "Simple, Compound, Complex, or Mixed" },
                  languagePattern: { type: Type.STRING, description: "A sequence pattern like 'B-E-B' or 'E-B-E'" },
                  cmi: { type: Type.NUMBER, description: "Code-mixing index of this sentence" }
                }
              }
            },
            slangAndInformal: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["term", "meaning", "category"],
                properties: {
                  term: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  category: { type: Type.STRING, description: "Gen-Z slang, Banglish colloquialism, standard slang, etc." }
                }
              }
            },
            sentiment: {
              type: Type.OBJECT,
              required: ["label", "score"],
              properties: {
                label: { type: Type.STRING, description: "Positive, Negative, or Neutral" },
                score: { type: Type.NUMBER, description: "Confidence score from 0.0 to 1.0" }
              }
            },
            emojis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["emoji", "linguisticFunction"],
                properties: {
                  emoji: { type: Type.STRING },
                  linguisticFunction: { type: Type.STRING, description: "Pragmatic purpose, e.g. sentiment emphasis, punctuation, irony" }
                }
              }
            }
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Linguistics analyzer failed to generate content.");
    }

    const parsedData = JSON.parse(resultText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: error?.message || "An error occurred during computational linguistics analysis." });
  }
});

// Vite Middleware & Static Asset Serving Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LinguoLens server running on http://0.0.0.0:${PORT} [ENV: ${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();
