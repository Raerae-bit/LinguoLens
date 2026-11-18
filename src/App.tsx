import { useState, useEffect, useRef, useMemo, DragEvent, ChangeEvent } from "react";
import { 
  FileText, 
  Database, 
  TrendingUp, 
  Plus, 
  Search, 
  Download, 
  Trash2, 
  ChevronRight, 
  Info, 
  Sparkles, 
  Upload, 
  BookOpen, 
  Layers, 
  Languages, 
  Check, 
  Calendar, 
  AlertCircle, 
  Filter, 
  ArrowRight, 
  Edit3, 
  Globe, 
  CornerDownRight, 
  HelpCircle,
  FileSpreadsheet,
  Palette,
  Sliders,
  Volume2,
  Zap,
  Copy,
  ArrowUp,
  X,
  Send
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie, 
  Legend 
} from "recharts";
import { 
  LinguisticsAnalysis, 
  CorpusItem, 
  LinguisticToken, 
  BorrowedWord 
} from "./types";
import { initialCorpus } from "./initialCorpus";

export default function App() {
  // Website Design / Theme States
  const [theme, setTheme] = useState<"slate" | "midnight" | "royal" | "teal">(() => {
    const savedTheme = localStorage.getItem("linguolens_theme_v1");
    return (savedTheme as "slate" | "midnight" | "royal" | "teal") || "slate";
  });

  const handleThemeChange = (newTheme: "slate" | "midnight" | "royal" | "teal") => {
    setTheme(newTheme);
    localStorage.setItem("linguolens_theme_v1", newTheme);
  };

  const designs = {
    slate: {
      wrapper: "bg-[#f8f9fa] text-[#1e293b] font-sans",
      sidebar: "bg-[#0f172a] text-[#f8fafc] border-[#1e293b]",
      sidebarBrandBg: "bg-[#1d4ed8] text-white",
      sidebarActiveTab: "bg-[#1e293b] text-white border-[#1d4ed8]",
      sidebarHoverTab: "hover:bg-[#1e293b]/50 hover:text-white",
      sidebarInactiveTab: "text-slate-400",
      header: "bg-white border-[#e2e8f0] text-slate-800",
      headerTitle: "text-slate-800",
      headerSubtitle: "text-slate-500",
      card: "bg-white border-[#e2e8f0]",
      cardTitle: "text-slate-700",
      primaryText: "text-[#1d4ed8]",
      accentText: "text-[#1d4ed8]",
      primaryBtn: "bg-[#1d4ed8] hover:bg-[#1e40af] text-white",
      accentBg: "bg-[#eff6ff] border-[#bfdbfe] text-[#1d4ed8]",
      tagInput: "bg-slate-50 border-[#e2e8f0] text-slate-700",
      abstractBox: "bg-slate-50 border-slate-200 text-slate-700",
      neutralBtn: "bg-slate-800 hover:bg-slate-900 text-white",
      badgeBangla: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      badgeEnglish: "bg-blue-50 text-blue-700 border border-blue-100",
      badgeMixed: "bg-violet-50 text-violet-700 border border-violet-100",
      badgeOther: "bg-slate-50 text-slate-500 border border-slate-100",
    },
    midnight: {
      wrapper: "bg-[#05070f] text-[#cbd5e1] font-mono",
      sidebar: "bg-[#02040a] text-[#34d399] border-[#1e293b]",
      sidebarBrandBg: "bg-[#059669] text-black",
      sidebarActiveTab: "bg-[#0f172a] text-[#10b981] border-[#10b981]",
      sidebarHoverTab: "hover:bg-[#0f172a] hover:text-[#34d399]",
      sidebarInactiveTab: "text-[#34d399]/50",
      header: "bg-[#090d16] border-[#1e293b] text-emerald-400",
      headerTitle: "text-emerald-400 font-mono tracking-tight",
      headerSubtitle: "text-emerald-500/70",
      card: "bg-[#0a0f1d] border-[#1e293b] border-dashed",
      cardTitle: "text-emerald-400",
      primaryText: "text-[#10b981]",
      accentText: "text-[#10b981]",
      primaryBtn: "bg-[#10b981] hover:bg-[#059669] text-black font-extrabold",
      accentBg: "bg-[#064e3b]/30 border-[#047857]/40 text-[#10b981]",
      tagInput: "bg-[#060814] border-[#1e293b] text-[#cbd5e1]",
      abstractBox: "bg-[#090d16] border-[#1e293b] text-[#94a3b8] italic",
      neutralBtn: "bg-[#10b981] hover:bg-[#059669] text-black font-bold",
      badgeBangla: "bg-[#064e3b]/40 text-[#34d399] border border-[#047857]/30",
      badgeEnglish: "bg-[#1e3a8a]/40 text-[#60a5fa] border border-[#1d4ed8]/30",
      badgeMixed: "bg-[#581c87]/40 text-[#c084fc] border border-[#6b21a8]/30",
      badgeOther: "bg-slate-900/60 text-slate-400 border border-slate-800",
    },
    royal: {
      wrapper: "bg-[#fcfaf7] text-[#2c1810] font-serif",
      sidebar: "bg-[#251216] text-[#f5e3e6] border-[#4a282f]",
      sidebarBrandBg: "bg-[#800020] text-[#fcfaf7]",
      sidebarActiveTab: "bg-[#3d1d23] text-[#fbeeee] border-[#800020]",
      sidebarHoverTab: "hover:bg-[#3d1d23]/60 hover:text-white",
      sidebarInactiveTab: "text-rose-200/50",
      header: "bg-[#f5ebd6] border-[#d8c59f] text-[#800020]",
      headerTitle: "text-[#800020] font-serif font-bold italic",
      headerSubtitle: "text-[#800020]/75",
      card: "bg-[#fffdfa] border-[#e7decb] border-2 shadow-xs",
      cardTitle: "text-[#5c2d37] font-serif",
      primaryText: "text-[#800020]",
      accentText: "text-[#800020]",
      primaryBtn: "bg-[#800020] hover:bg-[#5a0016] text-[#faf7f2] font-semibold tracking-wide",
      accentBg: "bg-[#faf0eb] border-[#f3d9cc] text-[#800020]",
      tagInput: "bg-[#fffdfa] border-[#e7decb] text-[#2c1810]",
      abstractBox: "bg-[#fbf7ee] border-[#e2d5ba] text-[#5c3e35] italic",
      neutralBtn: "bg-[#5c2d37] hover:bg-[#3f1e24] text-[#fffdfa]",
      badgeBangla: "bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]",
      badgeEnglish: "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]",
      badgeMixed: "bg-[#faf5ff] text-[#6b21a8] border border-[#e9d5ff]",
      badgeOther: "bg-[#f8fafc] text-slate-500 border border-slate-200",
    },
    teal: {
      wrapper: "bg-[#f0fbfb] text-[#0f172a] font-sans",
      sidebar: "bg-[#115e59] text-[#f0fdfa] border-[#134e4a]",
      sidebarBrandBg: "bg-[#0d9488] text-white",
      sidebarActiveTab: "bg-[#134e4a] text-white border-[#2dd4bf]",
      sidebarHoverTab: "hover:bg-[#134e4a]/60 hover:text-white",
      sidebarInactiveTab: "text-teal-200/60",
      header: "bg-white border-[#ccfbf1] text-[#0f766e]",
      headerTitle: "text-[#0f766e] font-bold",
      headerSubtitle: "text-[#0d9488]/80",
      card: "bg-white border-[#ccfbf1] shadow-xs",
      cardTitle: "text-[#115e59]",
      primaryText: "text-[#0d9488]",
      accentText: "text-[#0d9488]",
      primaryBtn: "bg-[#0d9488] hover:bg-[#0f766e] text-white font-medium",
      accentBg: "bg-[#f0fdfa] border-[#99f6e4] text-[#0d9488]",
      tagInput: "bg-[#f9fefd] border-[#ccfbf1] text-[#0f172a]",
      abstractBox: "bg-[#f0fdfa] border-[#b2f5ea] text-[#115e59] italic",
      neutralBtn: "bg-[#115e59] hover:bg-[#134e4a] text-white",
      badgeBangla: "bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]",
      badgeEnglish: "bg-[#f0f9ff] text-[#075985] border border-[#bae6fd]",
      badgeMixed: "bg-[#fdf4ff] text-[#6b21a8] border border-[#f3e8ff]",
      badgeOther: "bg-slate-50 text-slate-500 border border-slate-200",
    }
  };

  const d = designs[theme];

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<"parser" | "corpus" | "reports">("parser");
  const [parserSubTab, setParserSubTab] = useState<"dashboard" | "tokens" | "morphology" | "syntax">("dashboard");
  
  // Input and Analysis States
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [currentAnalysis, setCurrentAnalysis] = useState<LinguisticsAnalysis | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  // Custom Notes & Tags for Current Analysis
  const [customTags, setCustomTags] = useState("Academic, General");
  const [customNotes, setCustomNotes] = useState("");
  const [isSavedInSession, setIsSavedInSession] = useState(false);

  // Corpus State (Loaded from localStorage or initialized with static samples)
  const [corpus, setCorpus] = useState<CorpusItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSwitchingType, setFilterSwitchingType] = useState("All");
  const [filterMatrixLanguage, setFilterMatrixLanguage] = useState("All");
  const [filterMinCmi, setFilterMinCmi] = useState<number>(0);
  const [selectedCorpusItem, setSelectedCorpusItem] = useState<CorpusItem | null>(null);

  // Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);

  // Academic Report Customizations
  const [reportTitle, setReportTitle] = useState("Code-Mixing Dynamics in Digital Bangla-English Communication");
  const [leadResearcher, setLeadResearcher] = useState("Dr. L. Rahman");
  const [affiliation, setAffiliation] = useState("Computational Linguistics Lab, South Asian Language Institute");
  const [reportIntro, setReportIntro] = useState("This study utilizes computational linguistics pipelines to quantitatively model code-mixing and lexical borrowings. By calculating the Code-Mixing Index (CMI) and parsing syntactic dependencies, we map how speakers adapt institutional English roots into the Bangla morphological framework.");

  // Hovered Token for Detail Box
  const [hoveredToken, setHoveredToken] = useState<LinguisticToken | null>(null);
  
  // Filter Token List
  const [tokenFilter, setTokenFilter] = useState<"All" | "Bangla" | "English" | "Mixed" | "Borrowed">("All");

  // Linguistic Studio Mixer states
  const [mixerCmi, setMixerCmi] = useState<number>(50); // Target CMI (Low, Med, High)
  const [mixerBalance, setMixerBalance] = useState<number>(50); // Bias (0% Bangla, 100% English)
  const [mixerScript, setMixerScript] = useState<"romanized" | "native">("romanized");
  const [mixerNoise, setMixerNoise] = useState<number>(40); // Density / Borrowing Ratio

  // Real-time mixing fader and interactive states
  const [autoMixEnabled, setAutoMixEnabled] = useState<boolean>(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [assistantInput, setAssistantInput] = useState<string>("");
  const [assistantMessages, setAssistantMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "assistant", text: "Hello! I am your bilingual AI assistant. I can help you understand code-mixing theories, translate or blend phrases, or analyze computational linguistics. Ask me anything, or try the suggested prompts!" }
  ]);
  const [isAssistantLoading, setIsAssistantLoading] = useState<boolean>(false);

  // Dynamic real-time code-mixing algorithm
  const mixTextRealtime = (text: string, cmi: number, bias: number, density: number, script: "romanized" | "native"): string => {
    if (!text.trim()) return "";
    
    // We split the text by whitespace and punctuation but preserve them
    const segments = text.split(/(\s+|[.,\/#!$%\^&\*;:{}=\-_`~()?])+/);
    
    // Mapping of common English words to Bangla & Banglish
    const englishToBanglish: { [key: string]: string } = {
      "i": "ami", "we": "amra", "our": "amader", "my": "amar", "you": "tumi",
      "country": "desh", "beautiful": "sundor", "very": "onek", "amazing": "osadharon",
      "today": "ajke", "work": "kaaj", "complete": "complete", "but": "kintu",
      "and": "ebong", "not": "na", "all": "shob", "doing": "korchi", "done": "korechi",
      "is": "hocche", "database": "database", "system": "system", "report": "report",
      "help": "help", "please": "plz", "client": "client", "feedback": "feedback",
      "dashboard": "dashboard", "layout": "layout", "redesign": "redesign",
      "will": "hobe", "setup": "setup", "now": "now", "final": "final",
      "testing": "testing", "happy": "khushi", "easy": "easy", "presentation": "presentation"
    };

    const englishToNative: { [key: string]: string } = {
      "i": "আমি", "we": "আমরা", "our": "আমাদের", "my": "আমার", "you": "তুমি",
      "country": "দেশ", "beautiful": "সুন্দর", "very": "অনেক", "amazing": "অসাধারণ",
      "today": "আজকে", "work": "কাজ", "complete": "কমপ্লিট", "but": "কিন্তু",
      "and": "এবং", "not": "না", "all": "সব", "doing": "করছি", "done": "করেছি",
      "is": "হচ্ছে", "database": "ডাটাবেস", "system": "সিস্টেম", "report": "রিপোর্ট",
      "help": "হেল্প", "please": "প্লিজ", "client": "ক্লায়েন্ট", "feedback": "ফিডব্যাক",
      "dashboard": "ড্যাশবোর্ড", "layout": "লেআউট", "redesign": "রিডিজাইন",
      "will": "হবে", "setup": "সেটআপ", "now": "নাউ", "final": "ফাইনাল",
      "testing": "টেস্টিং", "happy": "খুশি", "easy": "ইজি", "presentation": "প্রেজেন্টেশন"
    };

    const banglishToNativeMap: { [key: string]: string } = {
      "amader": "আমাদের", "amar": "আমার", "ami": "আমি", "amra": "আমরা", "tumi": "তুমি",
      "ajke": "আজকে", "code": "কোড", "compile": "কম্পাইল", "kintu": "কিন্তু",
      "bhalo": "ভালো", "na": "না", "shob": "সব", "complete": "কমপ্লিট",
      "korchi": "করছি", "korechi": "করেছি", "hocche": "হচ্ছে", "database": "ডাটাবেস",
      "system": "সিস্টেম", "visualization": "ভিজুয়ালাইজেশন", "report": "রিপোর্ট",
      "help": "হেল্প", "issue": "ইস্যু", "please": "প্লিজ", "plz": "প্লিজ",
      "presentation": "প্রেজেন্টেশন", "client": "ক্লায়েন্ট", "feedback": "ফিডব্যাক",
      "dashboard": "ড্যাশবোর্ড", "layout": "লেআউট", "redesign": "রিডিজাইন",
      "hobe": "হবে", "setup": "সেটআপ", "now": "নাউ", "preparing": "প্রিপেয়ারিং",
      "final": "ফাইনাল", "testing": "টেস্টিং", "standard": "স্ট্যান্ডার্ড",
      "buddy": "বাডি", "hey": "হে", "busy": "বিজি", "actually": "অ্যাকচুয়ালি",
      "easy": "ইজি", "implementation": "ইম্প্লিমেন্টেশন", "desh": "দেশ", "sundor": "সুন্দর"
    };

    const nativeToBanglishMap = Object.fromEntries(
      Object.entries(banglishToNativeMap).map(([k, v]) => [v, k])
    );

    return segments.map((seg, idx) => {
      if (/^\s+$/.test(seg) || /^[.,\/#!$%\^&\*;:{}=\-_`~()?]+$/.test(seg)) {
        return seg;
      }

      const clean = seg.toLowerCase().trim();
      if (!clean) return seg;

      const mixChance = cmi / 100;
      const isEnglishBias = bias > 50;
      const densityChance = density / 100;

      let hash = 0;
      for (let i = 0; i < clean.length; i++) {
        hash += clean.charCodeAt(i) * (i + 1);
      }
      hash += idx;
      const rand = (hash % 100) / 100;

      if (rand < mixChance * densityChance) {
        if (englishToBanglish[clean]) {
          if (!isEnglishBias) {
            return script === "native" ? (englishToNative[clean] || seg) : englishToBanglish[clean];
          }
        }
        if (banglishToNativeMap[clean]) {
          if (isEnglishBias) {
            const engKey = Object.keys(englishToBanglish).find(key => englishToBanglish[key] === clean);
            if (engKey) return engKey;
          } else {
            if (script === "native") {
              return banglishToNativeMap[clean];
            }
          }
        }
        if (nativeToBanglishMap[clean]) {
          if (isEnglishBias) {
            const engKey = Object.keys(englishToNative).find(key => englishToNative[key] === clean);
            if (engKey) return engKey;
          } else {
            if (script === "romanized") {
              return nativeToBanglishMap[clean];
            }
          }
        }
      } else {
        if (script === "native" && banglishToNativeMap[clean]) {
          return banglishToNativeMap[clean];
        }
        if (script === "romanized" && nativeToBanglishMap[clean]) {
          return nativeToBanglishMap[clean];
        }
      }

      return seg;
    }).join("");
  };

  const realtimeMixedText = useMemo(() => {
    return mixTextRealtime(inputText, mixerCmi, mixerBalance, mixerNoise, mixerScript);
  }, [inputText, mixerCmi, mixerBalance, mixerNoise, mixerScript]);

  // Handle user query submission to Helping AI Assistant API
  const handleSendAssistantMessage = async () => {
    if (!assistantInput.trim() || isAssistantLoading) return;

    const userMsg = assistantInput;
    setAssistantInput("");
    
    const updatedMessages = [...assistantMessages, { role: "user" as const, text: userMsg }];
    setAssistantMessages(updatedMessages);
    setIsAssistantLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          context: {
            inputText,
            mixerCmi,
            mixerBalance,
            mixerNoise,
            theme
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from bilingual assistant core node.");
      }

      const data = await response.json();
      setAssistantMessages(prev => [...prev, { role: "assistant", text: data.text }]);
    } catch (error: any) {
      console.error(error);
      setAssistantMessages(prev => [...prev, { role: "assistant", text: `I encountered an issue connecting to the AI assistant node. Error: ${error?.message || "Internal server error"}` }]);
    } finally {
      setIsAssistantLoading(false);
      // Auto-scroll chat container to bottom
      setTimeout(() => {
        const container = document.getElementById("assistant-chat-container");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 50);
    }
  };

  const handlePresetQuery = async (promptText: string) => {
    if (isAssistantLoading) return;
    setIsAssistantOpen(true);
    
    const updatedMessages = [...assistantMessages, { role: "user" as const, text: promptText }];
    setAssistantMessages(updatedMessages);
    setIsAssistantLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          context: {
            inputText,
            mixerCmi,
            mixerBalance,
            mixerNoise,
            theme
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from bilingual assistant core node.");
      }

      const data = await response.json();
      setAssistantMessages(prev => [...prev, { role: "assistant", text: data.text }]);
    } catch (error: any) {
      console.error(error);
      setAssistantMessages(prev => [...prev, { role: "assistant", text: `I encountered an issue connecting to the AI assistant node. Error: ${error?.message || "Internal server error"}` }]);
    } finally {
      setIsAssistantLoading(false);
      // Auto-scroll chat container to bottom
      setTimeout(() => {
        const container = document.getElementById("assistant-chat-container");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 50);
    }
  };

  // Real-time character frequencies for LED mixer display
  const getLiveCharMeters = () => {
    let enCount = 0;
    let bnCount = 0;
    let otherCount = 0;
    
    for (const char of inputText) {
      if (/[a-zA-Z]/.test(char)) {
        enCount++;
      } else if (/[\u0980-\u09FF]/.test(char)) {
        bnCount++;
      } else if (char.trim()) {
        otherCount++;
      }
    }
    
    const total = enCount + bnCount + otherCount || 1;
    return {
      enPercent: Math.min(100, Math.round((enCount / total) * 100)),
      bnPercent: Math.min(100, Math.round((bnCount / total) * 100)),
      otherPercent: Math.min(100, Math.round((otherCount / total) * 100)),
      enCount,
      bnCount,
      otherCount
    };
  };

  const liveMeters = getLiveCharMeters();

  // Preset mix database to synthesize custom codes
  const mixDatabase = [
    {
      cmiMin: 0, cmiMax: 30, balanceMin: 0, balanceMax: 30, script: "native",
      text: "আমাদের দেশের প্রাকৃতিক সৌন্দর্য সত্যিই অসাধারণ এবং মনোমুগ্ধকর।"
    },
    {
      cmiMin: 0, cmiMax: 30, balanceMin: 0, balanceMax: 30, script: "romanized",
      text: "Amader desher prakritik soundorjo sotti osadharon ebong monomugdho kor."
    },
    {
      cmiMin: 31, cmiMax: 60, balanceMin: 0, balanceMax: 60, script: "native",
      text: "আমরা আমাদের server setup কমপ্লিট করেছি kintu client visualization এখনো প্রোগ্রেসে আছে।"
    },
    {
      cmiMin: 31, cmiMax: 60, balanceMin: 0, balanceMax: 60, script: "romanized",
      text: "Amra amader server setup complete korechi kintu client visualization ekhono progress-e ache."
    },
    {
      cmiMin: 61, cmiMax: 100, balanceMin: 0, balanceMax: 60, script: "native",
      text: "আজকে presentation-এর সময় client অনেক feedback দিয়েছে, তাই আমাদের dashboard-এর full UI layout রিডিজাইন করতে হবে।"
    },
    {
      cmiMin: 61, cmiMax: 100, balanceMin: 0, balanceMax: 60, script: "romanized",
      text: "Ajke presentation-er somoy client onek feedback diyeche, tai amader dashboard-er full UI layout redesign korte hobe."
    },
    {
      cmiMin: 0, cmiMax: 35, balanceMin: 61, balanceMax: 100, script: "native",
      text: "This research project focuses on natural language code-mixing kintu findings are still tentative."
    },
    {
      cmiMin: 0, cmiMax: 35, balanceMin: 61, balanceMax: 100, script: "romanized",
      text: "This research project focuses on natural language code-mixing kintu findings are still tentative."
    },
    {
      cmiMin: 36, cmiMax: 70, balanceMin: 61, balanceMax: 100, script: "romanized",
      text: "The database configuration and query executed successfully, tarpor we saved the records directly to local state."
    },
    {
      cmiMin: 71, cmiMax: 100, balanceMin: 61, balanceMax: 100, script: "romanized",
      text: "Honestly speaking, amader clients extremely happy with the performance kintu presentation slides-gulo dynamic kora dorkar."
    },
    {
      cmiMin: 60, cmiMax: 100, balanceMin: 30, balanceMax: 70, script: "native",
      text: "এই project-এর database schema ডিজাইনটা কড়া কড়া হ্যায়, kintu implementation অনেক সহজ।"
    },
    {
      cmiMin: 60, cmiMax: 100, balanceMin: 30, balanceMax: 70, script: "romanized",
      text: "Ei project-er database schema design-ta kora kora hai, kintu implementation onek easy."
    }
  ];

  const handleSynthesizeMix = () => {
    const match = mixDatabase.find(item => 
      mixerCmi >= item.cmiMin && mixerCmi <= item.cmiMax &&
      mixerBalance >= item.balanceMin && mixerBalance <= item.balanceMax &&
      item.script === mixerScript
    );

    if (match) {
      setInputText(match.text);
    } else {
      const genericFallback = mixerScript === "native" 
        ? "আমাদের developer টীম backend system ডেভেলপ করছে।"
        : "Amader developer team backend system develop korche.";
      setInputText(genericFallback);
    }
  };

  const swapInputScriptMode = () => {
    if (!inputText.trim()) return;
    
    const banglishToNativeMap: { [key: string]: string } = {
      "amader": "আমাদের",
      "ajke": "আজকে",
      "code": "কোড",
      "compile": "কম্পাইল",
      "kintu": "কিন্তু",
      "bhalo": "ভালো",
      "na": "না",
      "shob": "সব",
      "complete": "কমপ্লিট",
      "korchi": "করছি",
      "korechi": "করেছি",
      "hocche": "হচ্ছে",
      "database": "ডাটাবেস",
      "system": "সিস্টেম",
      "visualization": "ভিজুয়ালাইজেশন",
      "report": "রিপোর্ট",
      "help": "হেল্প",
      "issue": "ইস্যু",
      "please": "প্লিজ",
      "plz": "প্লিজ",
      "presentation": "প্রেজেন্টেশন",
      "client": "ক্লায়েন্ট",
      "feedback": "ফিডব্যাক",
      "dashboard": "ড্যাশবোর্ড",
      "layout": "লেআউট",
      "redesign": "রিডিজাইন",
      "hobe": "হবে",
      "setup": "সেটআপ",
      "now": "নাউ",
      "preparing": "প্রিপেয়ারিং",
      "final": "ফাইনাল",
      "testing": "টেস্টিং",
      "standard": "স্ট্যান্ডার্ড",
      "buddy": "বাডি",
      "hey": "হে",
      "busy": "বিজি",
      "actually": "অ্যাকচুয়ালি",
      "easy": "ইজি",
      "implementation": "ইম্প্লিমেন্টেশন"
    };

    const nativeToBanglishMap = Object.fromEntries(
      Object.entries(banglishToNativeMap).map(([k, v]) => [v, k])
    );

    const hasMoreBengali = liveMeters.bnCount > liveMeters.enCount;
    
    const words = inputText.split(/(\s+)/);
    const converted = words.map(word => {
      const cleanWord = word.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      if (!cleanWord) return word;
      
      if (hasMoreBengali) {
        if (nativeToBanglishMap[cleanWord]) {
          return word.toLowerCase().replace(cleanWord, nativeToBanglishMap[cleanWord]);
        }
      } else {
        if (banglishToNativeMap[cleanWord]) {
          return word.toLowerCase().replace(cleanWord, banglishToNativeMap[cleanWord]);
        }
      }
      return word;
    });

    setInputText(converted.join(""));
    setMixerScript(mixerScript === "romanized" ? "native" : "romanized");
  };

  // Load Corpus from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("linguolens_corpus_v1");
    if (saved) {
      try {
        setCorpus(JSON.parse(saved));
      } catch (e) {
        setCorpus(initialCorpus);
      }
    } else {
      setCorpus(initialCorpus);
      localStorage.setItem("linguolens_corpus_v1", JSON.stringify(initialCorpus));
    }
    
    // Set first sample as active analysis for demonstration
    setCurrentAnalysis(initialCorpus[0].analysis);
    setCustomNotes(initialCorpus[0].researcherNotes || "");
    setCustomTags(initialCorpus[0].tags || "");
  }, []);

  // Save corpus to LocalStorage helper
  const saveCorpusToDisk = (updatedCorpus: CorpusItem[]) => {
    setCorpus(updatedCorpus);
    localStorage.setItem("linguolens_corpus_v1", JSON.stringify(updatedCorpus));
  };

  // Drag-and-drop Handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      readFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      readFile(e.target.files[0]);
    }
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        setInputText(event.target.result);
      }
    };
    reader.readAsText(file);
  };

  // Run Linguistics Compiler Simulation then fetch API
  const runLinguisticAnalysis = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisError(null);
    setIsSavedInSession(false);
    setAnalysisProgress(10);
    setProgressMessage("Tokenizing input corpus...");

    // Stage simulation for user feel
    const timer1 = setTimeout(() => {
      setAnalysisProgress(30);
      setProgressMessage("Running POS tagging & Morphological segmentation...");
    }, 800);

    const timer2 = setTimeout(() => {
      setAnalysisProgress(60);
      setProgressMessage("Calculating Code-Mixing Indexes (CMI) & Syntax mappings...");
    }, 1600);

    const timer3 = setTimeout(() => {
      setAnalysisProgress(85);
      setProgressMessage("Invoking Gemini server-side semantic interpreter...");
    }, 2400);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText })
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to analyze language structures.");
      }

      const data: LinguisticsAnalysis = await response.json();
      setAnalysisProgress(100);
      setProgressMessage("Analysis complete!");
      
      setTimeout(() => {
        setCurrentAnalysis(data);
        setCustomNotes("");
        setCustomTags("Custom, Web Input");
        setIsAnalyzing(false);
        setParserSubTab("dashboard");
      }, 500);

    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      console.error(err);
      setAnalysisError(err.message || "An error occurred during parsing.");
      setIsAnalyzing(false);
    }
  };

  // Load a Pre-Analyzed Corpus Item to active workspace
  const loadCorpusItemToWorkspace = (item: CorpusItem) => {
    setCurrentAnalysis(item.analysis);
    setInputText(item.text);
    setCustomTags(item.tags || "");
    setCustomNotes(item.researcherNotes || "");
    setIsSavedInSession(true);
    setActiveTab("parser");
    setParserSubTab("dashboard");
  };

  // Add Current Analysis to Corpus
  const saveCurrentToCorpus = () => {
    if (!currentAnalysis) return;
    const newItem: CorpusItem = {
      id: "corpus-" + Date.now(),
      text: inputText || "Pre-analyzed sample text",
      timestamp: new Date().toISOString(),
      tags: customTags,
      researcherNotes: customNotes,
      analysis: currentAnalysis
    };
    
    const updated = [newItem, ...corpus];
    saveCorpusToDisk(updated);
    setIsSavedInSession(true);
  };

  // Delete a Corpus Item
  const deleteCorpusItem = (id: string, e: any) => {
    e.stopPropagation();
    const updated = corpus.filter(c => c.id !== id);
    saveCorpusToDisk(updated);
    if (selectedCorpusItem?.id === id) {
      setSelectedCorpusItem(null);
    }
  };

  // Export Token-Level CSV
  const triggerTokenCsvExport = (analysis: LinguisticsAnalysis, filename: string) => {
    const headers = [
      "Token Index", 
      "Token Text", 
      "Language Classification", 
      "Transliteration Mapping", 
      "Part of Speech (POS)", 
      "Named Entity Tag (NER)", 
      "Root Lemma", 
      "Affixes Attached", 
      "Lexical Borrowing Status", 
      "English Semantic Gloss"
    ];
    
    const rows = analysis.tokens.map((t, idx) => [
      idx + 1,
      `"${t.text.replace(/"/g, '""')}"`,
      t.language,
      `"${(t.transliterated || "").replace(/"/g, '""')}"`,
      t.posTag,
      t.nerTag,
      `"${(t.morphology?.root || "").replace(/"/g, '""')}"`,
      `"${(t.morphology?.affixes || []).join(", ").replace(/"/g, '""')}"`,
      t.morphology?.isBorrowed ? "TRUE" : "FALSE",
      `"${(t.englishGloss || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    downloadBlob(csvContent, filename, "text/csv");
  };

  // Export Corpus-Level Database CSV
  const triggerCorpusCsvExport = () => {
    const headers = [
      "Corpus ID", 
      "Original Text", 
      "Dominant Language", 
      "Code Mixing Index (CMI)", 
      "Primary Switching Type", 
      "Matrix Language Frame", 
      "Switching Points Count",
      "Metadata Tags", 
      "Recorded Timestamp",
      "Notes"
    ];

    const rows = corpus.map(item => [
      item.id,
      `"${item.text.replace(/"/g, '""')}"`,
      item.analysis.languageStats.dominantLanguage,
      item.analysis.languageStats.codeMixingIndex,
      item.analysis.classification.switchingType,
      item.analysis.classification.matrixLanguage,
      item.analysis.classification.switchingPointsCount,
      `"${(item.tags || "").replace(/"/g, '""')}"`,
      item.timestamp,
      `"${(item.researcherNotes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    downloadBlob(csvContent, "linguolens_corpus_master_dataset.csv", "text/csv");
  };

  // Export Corpus-Level Anonymized JSON
  const triggerCorpusJsonExport = () => {
    const anonymized = corpus.map(({ id, text, tags, analysis, timestamp }) => ({
      corpus_id: id,
      text_anonymized: text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL]").replace(/\+?[0-9]{10,13}/g, "[PHONE]"),
      tags,
      timestamp,
      analysis_metrics: {
        dominantLanguage: analysis.languageStats.dominantLanguage,
        codeMixingIndex: analysis.languageStats.codeMixingIndex,
        switchingType: analysis.classification.switchingType,
        matrixLanguage: analysis.classification.matrixLanguage,
        tokens_count: analysis.tokens.length,
        tokens: analysis.tokens.map(t => ({
          language: t.language,
          pos: t.posTag,
          ner: t.nerTag,
          is_borrowed: t.morphology?.isBorrowed
        }))
      }
    }));
    
    downloadBlob(JSON.stringify(anonymized, null, 2), "linguolens_anonymized_dataset.json", "application/json");
  };

  const downloadBlob = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: `${contentType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper calculations for Corpus-wide analytical visualizations
  const getCorpusOverviewMetrics = () => {
    if (corpus.length === 0) return { avgCmi: 0, totalTokens: 0, totalSamples: 0, posDistribution: [], languageDistribution: [] };
    
    let sumCmi = 0;
    let totalTokens = 0;
    const posCounts: { [key: string]: number } = {};
    let banglaTotal = 0;
    let englishTotal = 0;
    let mixedTotal = 0;
    let otherTotal = 0;

    corpus.forEach(item => {
      sumCmi += item.analysis.languageStats.codeMixingIndex;
      totalTokens += item.analysis.tokens.length;
      
      banglaTotal += item.analysis.languageStats.banglaWordCount;
      englishTotal += item.analysis.languageStats.englishWordCount;
      mixedTotal += item.analysis.languageStats.mixedWordCount;
      otherTotal += item.analysis.languageStats.punctuationCount;

      item.analysis.tokens.forEach(tok => {
        if (tok.posTag) {
          posCounts[tok.posTag] = (posCounts[tok.posTag] || 0) + 1;
        }
      });
    });

    const posDistribution = Object.keys(posCounts).map(tag => ({
      name: tag,
      value: posCounts[tag]
    })).sort((a, b) => b.value - a.value).slice(0, 8);

    const languageDistribution = [
      { name: "Bangla Words", value: banglaTotal, color: "#10b981" },
      { name: "English Words", value: englishTotal, color: "#3b82f6" },
      { name: "Mixed (Hybrid)", value: mixedTotal, color: "#8b5cf6" },
      { name: "Other / Punct", value: otherTotal, color: "#64748b" }
    ];

    return {
      avgCmi: Math.round((sumCmi / corpus.length) * 10) / 10,
      totalTokens,
      totalSamples: corpus.length,
      posDistribution,
      languageDistribution
    };
  };

  const corpusMetrics = getCorpusOverviewMetrics();

  // Filtering Corpus database list
  const filteredCorpus = corpus.filter(item => {
    const matchesSearch = 
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.tags && item.tags.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.researcherNotes && item.researcherNotes.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSwitching = filterSwitchingType === "All" || 
      item.analysis.classification.switchingType.toLowerCase().includes(filterSwitchingType.toLowerCase());
    
    const matchesMatrix = filterMatrixLanguage === "All" || 
      item.analysis.classification.matrixLanguage === filterMatrixLanguage;
    
    const matchesCmi = item.analysis.languageStats.codeMixingIndex >= filterMinCmi;

    return matchesSearch && matchesSwitching && matchesMatrix && matchesCmi;
  });

  // Calculate POS frequencies for current active analysis
  const getCurrentAnalysisPosFreq = () => {
    if (!currentAnalysis) return [];
    const counts: { [key: string]: number } = {};
    currentAnalysis.tokens.forEach(t => {
      counts[t.posTag] = (counts[t.posTag] || 0) + 1;
    });
    return Object.keys(counts).map(tag => ({
      pos: tag,
      count: counts[tag]
    })).sort((a, b) => b.count - a.count);
  };

  const currentAnalysisPosFreq = getCurrentAnalysisPosFreq();

  // Filter token list based on dynamic filter selection
  const getFilteredTokens = () => {
    if (!currentAnalysis) return [];
    return currentAnalysis.tokens.filter(t => {
      if (tokenFilter === "All") return true;
      if (tokenFilter === "Borrowed") return t.morphology?.isBorrowed;
      return t.language === tokenFilter;
    });
  };

  const filteredTokens = getFilteredTokens();

  // Generate Report HTML window print
  const printReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const reportHtml = `
      <html>
        <head>
          <title>${reportTitle}</title>
          <style>
            body { font-family: 'Georgia', serif; padding: 40px; color: #1e293b; line-height: 1.6; max-width: 800px; margin: 0 auto; }
            h1 { font-family: 'Helvetica', sans-serif; font-size: 28px; font-weight: bold; margin-bottom: 5px; color: #0f172a; }
            .meta { font-size: 14px; color: #475569; border-bottom: 2px solid #cbd5e1; padding-bottom: 15px; margin-bottom: 25px; }
            .affiliation { font-style: italic; margin-bottom: 5px; }
            h2 { font-family: 'Helvetica', sans-serif; font-size: 20px; color: #1e3a8a; border-left: 4px solid #1e3a8a; padding-left: 10px; margin-top: 30px; }
            p { text-align: justify; }
            .abstract { background: #f1f5f9; padding: 15px; border-radius: 5px; font-style: italic; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-family: sans-serif; font-size: 13px; }
            th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
            th { background-color: #f8fafc; font-weight: bold; }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; text-align: center; font-family: sans-serif; }
            .stat-card { background: #f8fafc; padding: 10px; border: 1px solid #e2e8f0; border-radius: 5px; }
            .stat-num { font-size: 20px; font-weight: bold; color: #1d4ed8; }
            .footer { margin-top: 50px; font-size: 11px; text-align: center; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          </style>
        </head>
        <body>
          <h1>${reportTitle}</h1>
          <div class="meta">
            <div><strong>Lead Investigator:</strong> ${leadResearcher}</div>
            <div class="affiliation"><strong>Institution:</strong> ${affiliation}</div>
            <div><strong>Date Generated:</strong> ${new Date().toLocaleDateString()}</div>
          </div>
          
          <h2>I. Abstract Overview</h2>
          <div class="abstract">${currentAnalysis?.summary || "No active abstract generated."}</div>
          
          <h2>II. Computational Methodology</h2>
          <p>${reportIntro}</p>
          <p>Text samples were segmented dynamically into word units (tokenization). Each token was queried against specialized lexical matrices to tag its source syntax and morphological base, calculating the mathematical Code-Mixing Index (CMI) defined as the proportion of code-switching transitions relative to sentence units.</p>

          <h2>III. Empirical Statistical Corpus Metrics</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-num">${corpusMetrics.totalSamples}</div>
              <div style="font-size:12px; color:#64748b;">Corpus Sample Size</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">${corpusMetrics.avgCmi}%</div>
              <div style="font-size:12px; color:#64748b;">Average Corpus CMI</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">${corpusMetrics.totalTokens}</div>
              <div style="font-size:12px; color:#64748b;">Total Parsed Tokens</div>
            </div>
          </div>

          <h2>IV. Lexical Borrowings and Morphological Hybridization</h2>
          <p>The table below showcases documented instances of English roots hybridized with Bangla inflectional suffixes (clitics), highlighting morphosyntactic borrowing frames:</p>
          <table>
            <thead>
              <tr>
                <th>Linguistic Word</th>
                <th>Source Origin</th>
                <th>Syntactic Attachment Context</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              ${(currentAnalysis?.borrowedVocabulary || []).map(b => `
                <tr>
                  <td><strong>${b.word}</strong></td>
                  <td>${b.sourceLanguage}</td>
                  <td>${b.targetSyntax}</td>
                  <td>${b.frequency} instances</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <h2>V. Conclusion and Analytical Synthesis</h2>
          <p>The analyzed communication demonstrates robust structural integration. The presence of insertional code-mixing indicates that institutional concepts (academic, professional) are actively absorbed using Bangla grammatical markers, indicating active bilingual morphological synthesis rather than language decay.</p>
          
          <div class="footer">
            Generated automatically via LinguoLens: Bangla-English Code-Mixing Research Platform
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();
  };

  return (
    <div id="linguolens-workspace" className={`flex h-screen antialiased overflow-hidden transition-all duration-300 ${d.wrapper}`}>
      
      {/* SIDEBAR STATION */}
      <aside className={`w-64 flex flex-col border-r select-none shrink-0 z-10 transition-all duration-300 ${d.sidebar}`}>
        <div className="p-6 border-b border-[#1e293b] flex items-center space-x-3">
          <div className={`h-11 w-11 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center font-bold relative shrink-0 overflow-hidden ${d.sidebarBrandBg}`}>
            <div className="absolute inset-0 bg-black/15 flex items-center justify-center select-none">
              <span className="font-sans text-[13px] absolute top-1.5 left-2 opacity-90 font-black leading-none text-white">A</span>
              <span className="font-serif text-[17px] absolute bottom-1.5 right-2 font-extrabold leading-none text-white">ক</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h1 className="text-lg font-bold tracking-tight text-white font-sans">LinguoLens</h1>
            </div>
            <p className="text-[10px] text-slate-400 font-sans tracking-wide uppercase">Bilingual Platform • Nashita</p>
          </div>
        </div>

        {/* WORKSPACE TAB SELECTORS */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            id="tab-parser"
            onClick={() => setActiveTab("parser")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
              activeTab === "parser" 
                ? `${d.sidebarActiveTab} shadow-sm` 
                : `${d.sidebarInactiveTab} ${d.sidebarHoverTab}`
            }`}
          >
            <Layers size={18} />
            <span>Linguistic Parser</span>
          </button>

          <button
            id="tab-corpus"
            onClick={() => setActiveTab("corpus")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
              activeTab === "corpus" 
                ? `${d.sidebarActiveTab} shadow-sm` 
                : `${d.sidebarInactiveTab} ${d.sidebarHoverTab}`
            }`}
          >
            <Database size={18} />
            <span>Corpus Database</span>
            <span className="ml-auto bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
              {corpus.length}
            </span>
          </button>

          <button
            id="tab-reports"
            onClick={() => setActiveTab("reports")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
              activeTab === "reports" 
                ? `${d.sidebarActiveTab} shadow-sm` 
                : `${d.sidebarInactiveTab} ${d.sidebarHoverTab}`
            }`}
          >
            <BookOpen size={18} />
            <span>Academic Reports</span>
          </button>
        </nav>

        {/* SIDEBAR FOOTER (Clean & Literal, No Tech Larping) */}
        <div className="p-4 border-t border-[#1e293b] bg-[#02040a]/40 text-[10px] text-slate-400 space-y-1.5">
          <div className="font-semibold text-slate-300 font-sans">LinguoLens Platform</div>
          <p className="leading-normal opacity-75 font-sans">A computational research suite mapping grammatical switches, loanwords, and hybrid morphosyntax. Created by Nashita.</p>
        </div>
      </aside>

      {/* MAIN SCREEN CANVAS */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        {/* HEADER RAIL */}
        <header className={`h-16 border-b px-8 flex items-center justify-between shrink-0 transition-all duration-300 ${d.header}`}>
          <div className="flex items-center space-x-3">
            <h2 className={`text-base font-bold transition-colors duration-300 ${d.headerTitle}`}>
              {activeTab === "parser" && "Bilingual Code-Switching Syntactic Parser"}
              {activeTab === "corpus" && "Linguistics Corpus Explorer & Aggregator"}
              {activeTab === "reports" && "Academic Research Publisher Hub"}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Website Design Theme Selector */}
            <div className="flex items-center space-x-1.5 bg-slate-100/80 dark:bg-slate-800/40 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/40">
              <span className="text-[11px] font-bold px-2 text-slate-500 flex items-center space-x-1 font-sans">
                <Palette id="palette-icon" size={12} />
                <span>Design:</span>
              </span>
              {(["slate", "midnight", "royal", "teal"] as const).map((t) => (
                <button
                  key={t}
                  id={`theme-btn-${t}`}
                  onClick={() => handleThemeChange(t)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all capitalize cursor-pointer font-sans ${
                    theme === t
                      ? t === "slate"
                        ? "bg-[#1d4ed8] text-white shadow-xs"
                        : t === "midnight"
                          ? "bg-[#10b981] text-black shadow-xs"
                          : t === "royal"
                            ? "bg-[#800020] text-white shadow-xs"
                            : "bg-[#0d9488] text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Helping AI Assistant Button */}
            <button
              onClick={() => setIsAssistantOpen(prev => !prev)}
              className={`text-[11px] font-bold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer border font-sans ${
                isAssistantOpen 
                  ? "bg-purple-600 border-purple-500 hover:bg-purple-700 text-white" 
                  : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border-slate-200/60 dark:border-slate-700/40"
              }`}
            >
              <Sparkles size={13} className={isAssistantOpen ? "animate-bounce" : "text-purple-500"} />
              <span>AI Assistant</span>
            </button>

          </div>
        </header>

        {/* WORKSPACE AREA */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* TAB 1: LINGUISTIC PARSER */}
          {activeTab === "parser" && (
            <div className="space-y-6">
              
              {/* INPUT BOX & COMPILER TRIGGER */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Inputs Pane - Re-designed as a Bilingual Linguistic Mixer Console */}
                <div className={`lg:col-span-2 rounded-2xl p-6 shadow-sm space-y-5 transition-all duration-300 ${d.card}`}>
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <Sliders size={18} className={d.primaryText} />
                      <div>
                        <label className={`text-sm font-extrabold tracking-tight flex items-center space-x-1.5 ${d.cardTitle}`}>
                          <span>Linguistic Studio Mixer Console</span>
                        </label>
                        <p className="text-[10px] text-slate-400 font-mono">Bilingual Synthesizer & Live Signal Equalizer</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Interactive Presets:</span>
                      <button 
                        onClick={() => {
                          setInputText("Hey buddy, ajke code compile hocche na kintu standard testing complete. Help me with this issue plz!");
                        }}
                        className={`hover:underline font-semibold ${d.headerSubtitle}`}
                      >
                        Social
                      </button>
                      <span className="text-slate-300">|</span>
                      <button 
                        onClick={() => {
                          setInputText("Amader core database system complete, now we are preparing the final client-side visualization report! 🚀");
                        }}
                        className={`hover:underline font-semibold ${d.headerSubtitle}`}
                      >
                        Hybrid
                      </button>
                    </div>
                  </div>

                  {/* Main Grid: Split workspace */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    
                    {/* Left Column: Raw Inputs & Conversions (7/12 cols) */}
                    <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                      
                      {/* Drag and Drop File Upload Area */}
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative rounded-xl border-2 border-dashed p-1 transition flex-1 flex flex-col ${
                          isDragging 
                            ? "border-[#1d4ed8] bg-[#eff6ff]/50" 
                            : "border-[#e2e8f0] dark:border-slate-800 bg-[#f8fafc]/40 dark:bg-[#0f172a]/20"
                        }`}
                      >
                        <textarea
                          id="analysis-textarea"
                          placeholder="Type, paste code-mixed chats, or drop a text file here (e.g. 'Ami coding-e bhalo na kintu custom visualization report-ta clear hobe...')"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          disabled={isAnalyzing}
                          className={`w-full h-44 p-4 bg-transparent outline-none border-none text-sm placeholder-slate-400 resize-none flex-1 font-sans ${
                            theme === "midnight" 
                              ? "text-emerald-300 font-mono" 
                              : theme === "royal" 
                                ? "text-[#2c1810]" 
                                : theme === "teal" 
                                  ? "text-[#0f172a]" 
                                  : "text-slate-800"
                          }`}
                        />
                        
                        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                          {inputText.trim() && (
                            <button
                              onClick={swapInputScriptMode}
                              className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-xs"
                              title="Instantly swap between romanized Banglish and native Bengali scripts for matched words!"
                            >
                              <Languages size={12} />
                              <span>Swap Script (ক ⇆ Ka)</span>
                            </button>
                          )}
                        </div>

                        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                          <label className="bg-white dark:bg-slate-800 border border-[#cbd5e1] dark:border-slate-700 hover:bg-[#f1f5f9] dark:hover:bg-slate-700/50 text-[11px] text-slate-600 dark:text-slate-300 font-semibold px-3 py-1.5 rounded-lg cursor-pointer flex items-center space-x-1 shadow-xs">
                            <Upload size={12} />
                            <span>Upload File</span>
                            <input 
                               type="file" 
                              accept=".txt,.json,.csv" 
                              onChange={handleFileChange}
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>

                      {/* Live Real-time Mixed Output Preview */}
                      <div className={`p-4 rounded-xl border transition-all duration-300 ${d.card} flex flex-col space-y-3 shadow-xs`}>
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-2">
                          <div className="flex items-center space-x-2">
                            <Zap size={14} className="text-amber-500 animate-pulse animate-duration-1000" />
                            <span className="text-xs font-bold uppercase tracking-wider font-mono">Live Real-time Mixed Output</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="flex items-center space-x-1.5 text-[11px] font-medium cursor-pointer select-none">
                              <input 
                                type="checkbox" 
                                checked={autoMixEnabled}
                                onChange={(e) => setAutoMixEnabled(e.target.checked)}
                                className="rounded text-[#1d4ed8] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                              />
                              <span className="text-slate-400">Auto-mix</span>
                            </label>
                          </div>
                        </div>

                        {autoMixEnabled ? (
                          <div className="space-y-2">
                            {realtimeMixedText ? (
                              <div className="relative bg-slate-50/50 dark:bg-[#0f172a]/30 rounded-lg p-3 border border-slate-100 dark:border-slate-800/60 min-h-[5rem] flex flex-col justify-between">
                                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                                  theme === "midnight" 
                                    ? "text-emerald-300 font-mono" 
                                    : theme === "royal" 
                                      ? "text-[#2c1810] font-serif" 
                                      : theme === "teal" 
                                        ? "text-[#0f172a]" 
                                        : "text-slate-700"
                                }`}>
                                  {realtimeMixedText}
                                </p>
                                
                                <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/40">
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(realtimeMixedText);
                                    }}
                                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-600 dark:text-slate-300 font-bold rounded-md flex items-center space-x-1 shadow-xs cursor-pointer"
                                  >
                                    <Copy size={11} />
                                    <span>Copy</span>
                                  </button>
                                  <button
                                    onClick={() => setInputText(realtimeMixedText)}
                                    className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-extrabold rounded-md flex items-center space-x-1 shadow-xs cursor-pointer transition-all active:scale-95"
                                    title="Set this mixed text as the primary input for full computational linguistics analysis"
                                  >
                                    <ArrowUp size={11} />
                                    <span>Apply to Input</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-400 italic">Type some bilingual or English words above to see the real-time synthesizer mix them!</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">Real-time mixing is paused. Check the "Auto-mix" checkbox to enable continuous live translation blending.</p>
                        )}
                      </div>

                    </div>

                    {/* Right Column: Audio Equalizer Style Signal Console (5/12 cols) */}
                    <div className="md:col-span-5 bg-slate-900 text-slate-100 p-5 rounded-2xl flex flex-col justify-between space-y-5 shadow-2xl border border-slate-800 transition-all duration-300">
                      
                      {/* Section Title */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center space-x-1.5 font-mono">
                          <Volume2 size={13} className="text-emerald-400 animate-pulse" />
                          <span>Linguistic Equalizer Deck</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                          <span className="text-[9px] text-emerald-400 font-mono font-black uppercase tracking-wider">Active Signal</span>
                        </span>
                      </div>

                      {/* Live Waveform Oscilloscope */}
                      <div className="bg-black/80 border border-slate-800/80 rounded-xl p-3 h-16 relative overflow-hidden flex flex-col justify-between shadow-inner">
                        <div className="flex justify-between items-center z-10 text-[8px] text-slate-500 font-mono uppercase tracking-widest select-none">
                          <span>Synthesizer Waveform</span>
                          <span className="text-slate-400 font-bold">{mixerCmi > 50 ? "Overdrive" : "Nominal"}</span>
                        </div>
                        <svg className="absolute inset-x-0 bottom-0 w-full h-11 pointer-events-none opacity-90" viewBox="0 0 300 44">
                          <path 
                            d={`M 0 22 ${Array.from({ length: 31 }).map((_, i) => {
                              const x = i * 10;
                              const amplitude = (mixerCmi / 100) * 16;
                              const frequency = (mixerBalance / 100) * 0.4 + 0.15;
                              const y = 22 + Math.sin(i * frequency + (mixerNoise / 20)) * amplitude;
                              return `L ${x} ${y}`;
                            }).join(" ")} L 300 22`}
                            fill="none"
                            stroke={mixerCmi > 60 ? "#10b981" : "#0ea5e9"}
                            strokeWidth="2"
                            className="transition-all duration-500"
                          />
                          <path 
                            d={`M 0 22 ${Array.from({ length: 31 }).map((_, i) => {
                              const x = i * 10;
                              const amplitude = (mixerNoise / 100) * 10;
                              const frequency = 0.35;
                              const y = 22 + Math.cos(i * frequency + (mixerCmi / 30)) * amplitude;
                              return `L ${x} ${y}`;
                            }).join(" ")} L 300 22`}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="1"
                            strokeDasharray="2,2"
                            className="opacity-40 transition-all duration-500"
                          />
                        </svg>
                      </div>

                      {/* 3 Vertical Equalizer Faders (Analog Channels) */}
                      <div className="grid grid-cols-3 gap-2 bg-black/40 rounded-xl p-3 border border-slate-800/50">
                        
                        {/* Channel 1: CMI (Fader) */}
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-[8px] font-mono font-bold text-slate-400">CH1: CMI</span>
                          <div className="relative w-8 h-28 flex justify-center bg-black/60 rounded-lg py-2 border border-slate-800">
                            {/* Scale indicators */}
                            <div className="absolute left-1.5 inset-y-1 flex flex-col justify-between text-[5px] text-slate-600 font-mono select-none pointer-events-none">
                              <span>MAX</span>
                              <span>MID</span>
                              <span>MIN</span>
                            </div>
                            <input 
                              type="range"
                              min="10"
                              max="90"
                              value={mixerCmi}
                              onChange={(e) => setMixerCmi(Number(e.target.value))}
                              style={{ WebkitAppearance: 'slider-vertical', writingMode: 'bt-lr' } as any}
                              className="h-full w-1 cursor-pointer accent-emerald-400"
                            />
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">{mixerCmi}%</span>
                        </div>

                        {/* Channel 2: BIAS (Fader) */}
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-[8px] font-mono font-bold text-slate-400">CH2: BIAS</span>
                          <div className="relative w-8 h-28 flex justify-center bg-black/60 rounded-lg py-2 border border-slate-800">
                            <div className="absolute left-1.5 inset-y-1 flex flex-col justify-between text-[5px] text-slate-600 font-mono select-none pointer-events-none">
                              <span>ENG</span>
                              <span>MID</span>
                              <span>BNG</span>
                            </div>
                            <input 
                              type="range"
                              min="0"
                              max="100"
                              value={mixerBalance}
                              onChange={(e) => setMixerBalance(Number(e.target.value))}
                              style={{ WebkitAppearance: 'slider-vertical', writingMode: 'bt-lr' } as any}
                              className="h-full w-1 cursor-pointer accent-sky-400"
                            />
                          </div>
                          <span className="text-[10px] font-mono text-sky-400 font-bold">{mixerBalance}%</span>
                        </div>

                        {/* Channel 3: NOISE / DENSITY (Fader) */}
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-[8px] font-mono font-bold text-slate-400">CH3: DENSITY</span>
                          <div className="relative w-8 h-28 flex justify-center bg-black/60 rounded-lg py-2 border border-slate-800">
                            <div className="absolute left-1.5 inset-y-1 flex flex-col justify-between text-[5px] text-slate-600 font-mono select-none pointer-events-none">
                              <span>HIGH</span>
                              <span>MED</span>
                              <span>LOW</span>
                            </div>
                            <input 
                              type="range"
                              min="10"
                              max="90"
                              value={mixerNoise}
                              onChange={(e) => setMixerNoise(Number(e.target.value))}
                              style={{ WebkitAppearance: 'slider-vertical', writingMode: 'bt-lr' } as any}
                              className="h-full w-1 cursor-pointer accent-amber-400"
                            />
                          </div>
                          <span className="text-[10px] font-mono text-amber-400 font-bold">{mixerNoise}%</span>
                        </div>

                      </div>

                      {/* Launch Trigger Pads (Add Mixed Vocabularies) */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider font-mono block">Linguistic Sample Trigger Pads</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setInputText(prev => prev ? prev + " code debug complete kora hobe kintu logic optimization baki ache." : "Code debug complete kora hobe kintu logic optimization baki ache.")}
                            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 p-2 rounded-lg text-left transition shadow-xs flex flex-col justify-between h-14"
                          >
                            <span className="text-[8px] text-emerald-400 font-mono font-bold">PAD 1: TECH MIX</span>
                            <span className="text-[9px] text-slate-300 font-medium line-clamp-1">Inject tech-heavy lexemes</span>
                          </button>
                          
                          <button
                            onClick={() => setInputText(prev => prev ? prev + " ashole server setup ready thakle dynamic presentation bhalo output debe." : "Ashole server setup ready thakle dynamic presentation bhalo output debe.")}
                            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 p-2 rounded-lg text-left transition shadow-xs flex flex-col justify-between h-14"
                          >
                            <span className="text-[8px] text-sky-400 font-mono font-bold">PAD 2: SOCIAL MIX</span>
                            <span className="text-[9px] text-slate-300 font-medium line-clamp-1">Inject conversational markers</span>
                          </button>
                          
                          <button
                            onClick={() => setInputText(prev => prev ? prev + " amader client validation complete." : "Amader client validation complete.")}
                            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 p-2 rounded-lg text-left transition shadow-xs flex flex-col justify-between h-14"
                          >
                            <span className="text-[8px] text-amber-400 font-mono font-bold">PAD 3: SHORT HYBRID</span>
                            <span className="text-[9px] text-slate-300 font-medium line-clamp-1">Inject quick mixed statement</span>
                          </button>

                          <button
                            onClick={swapInputScriptMode}
                            disabled={!inputText.trim()}
                            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 disabled:opacity-40 p-2 rounded-lg text-left transition shadow-xs flex flex-col justify-between h-14"
                          >
                            <span className="text-[8px] text-fuchsia-400 font-mono font-bold">PAD 4: SCRIPT SWAP</span>
                            <span className="text-[9px] text-slate-300 font-medium line-clamp-1">Swap ক ⇆ A script type</span>
                          </button>
                        </div>
                      </div>

                      {/* Script Type & Mode Settings Selector */}
                      <div className="flex items-center justify-between pt-1 bg-black/20 p-2 rounded-lg border border-slate-800/60">
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">Active Script Mode</span>
                        <div className="flex space-x-1 bg-slate-800 p-0.5 rounded-md border border-slate-700">
                          <button
                            onClick={() => setMixerScript("romanized")}
                            className={`text-[9px] font-bold px-2.5 py-1 rounded transition-all ${
                              mixerScript === "romanized" 
                                ? "bg-emerald-500 text-black shadow-xs font-black" 
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            Romanized
                          </button>
                          <button
                            onClick={() => setMixerScript("native")}
                            className={`text-[9px] font-bold px-2.5 py-1 rounded transition-all ${
                              mixerScript === "native" 
                                ? "bg-emerald-500 text-black shadow-xs font-black" 
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            Native ক
                          </button>
                        </div>
                      </div>

                      {/* Level Meters (Real-time LED Bars) */}
                      <div className="bg-slate-900 text-white rounded-lg p-3 font-mono text-[10px] space-y-2 border border-slate-800">
                        <div className="flex justify-between border-b border-slate-800 pb-1 text-[8px] text-slate-400 uppercase tracking-widest">
                          <span>Live Channel Frequencies</span>
                          <span className="text-emerald-400 font-bold">Hz</span>
                        </div>
                        
                        {/* EN LED Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-300">Channel [EN] (Romanized / English Nouns)</span>
                            <span className="text-[#3b82f6] font-bold">{liveMeters.enPercent}%</span>
                          </div>
                          <div className="w-full bg-black h-2 rounded flex overflow-hidden border border-slate-800">
                            <div 
                              className="bg-blue-500 h-full transition-all duration-300" 
                              style={{ width: `${liveMeters.enPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* BN LED Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-300 font-serif">Channel [BN / ক] (Bangla Lexeme Channel)</span>
                            <span className="text-emerald-400 font-bold">{liveMeters.bnPercent}%</span>
                          </div>
                          <div className="w-full bg-black h-2 rounded flex overflow-hidden border border-slate-800">
                            <div 
                              className="bg-emerald-500 h-full transition-all duration-300" 
                              style={{ width: `${liveMeters.bnPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* MISC LED Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-300">Channel [MISC] (Punctuation & Spaces)</span>
                            <span className="text-violet-400 font-bold">{liveMeters.otherPercent}%</span>
                          </div>
                          <div className="w-full bg-black h-2 rounded flex overflow-hidden border border-slate-800">
                            <div 
                              className="bg-violet-500 h-full transition-all duration-300" 
                              style={{ width: `${liveMeters.otherPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Synthesis Trigger Button */}
                      <button
                        onClick={handleSynthesizeMix}
                        className="w-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white py-2 rounded-lg font-bold text-[11px] tracking-wide font-mono transition-all uppercase flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                      >
                        <Sliders size={12} />
                        <span>Synthesize Code-Mixing (Generate)</span>
                      </button>

                    </div>

                  </div>

                  {/* Analysis Run Button & Progress Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center space-x-1">
                      <Info size={13} />
                      <span>Supports transliterated Banglish & native Bangla-English script mixing</span>
                    </div>

                    <button
                      id="analyze-btn"
                      onClick={runLinguisticAnalysis}
                      disabled={isAnalyzing || !inputText.trim()}
                      className={`font-semibold text-xs px-6 py-3 rounded-xl transition flex items-center space-x-2 shadow-xs cursor-pointer ${
                        isAnalyzing || !inputText.trim()
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                          : d.primaryBtn
                      }`}
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                          <span>Compiling Mappings...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>Analyze Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Loading Progress Segment */}
                  {isAnalyzing && (
                    <div className="border border-[#e2e8f0] bg-slate-50 rounded-xl p-4 space-y-2 animate-pulse">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-[#1d4ed8] rounded-full animate-ping"></span>
                          <span>{progressMessage}</span>
                        </span>
                        <span className="font-mono">{analysisProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#1d4ed8] h-full transition-all duration-300 rounded-full" 
                          style={{ width: `${analysisProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Analysis Error State Box */}
                  {analysisError && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start space-x-3 text-rose-800 text-xs">
                      <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">Analysis Failed</p>
                        <p className="text-rose-600 leading-relaxed">{analysisError}</p>
                        <p className="text-[10px] text-slate-500 mt-2">
                          💡 Ensure your server is active and the <strong className="font-bold">GEMINI_API_KEY</strong> is set in the secrets menu.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Annotation & Saving Workspace */}
                <div className={`rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 transition-all duration-300 ${d.card}`}>
                  <div className="space-y-3">
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${d.cardTitle}`}>Corpus Cataloging</h3>
                    <p className="text-xs text-slate-400">Attach metadata and save this sample directly into the Local Corpus Database.</p>
                    
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Dataset Tags</label>
                        <input 
                          type="text" 
                          placeholder="e.g., WhatsApp chat, transliterated"
                          value={customTags}
                          onChange={(e) => setCustomTags(e.target.value)}
                          className={`w-full outline-none rounded-lg p-2 text-xs border ${d.tagInput}`}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Researcher Notes</label>
                        <textarea 
                          placeholder="Identify specific features like insertional grammar, matrices, code borrowing indexes..."
                          value={customNotes}
                          onChange={(e) => setCustomNotes(e.target.value)}
                          className={`w-full outline-none rounded-lg p-2 text-xs border h-20 resize-none ${d.tagInput}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {isSavedInSession ? (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-emerald-200 flex items-center space-x-1.5 w-full justify-center">
                        <Check size={14} />
                        <span>Saved in Corpus</span>
                      </span>
                    ) : (
                      <button
                        id="save-corpus-btn"
                        onClick={saveCurrentToCorpus}
                        disabled={!currentAnalysis}
                        className={`w-full font-semibold text-xs py-2.5 rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer ${
                          currentAnalysis 
                            ? d.neutralBtn
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <Plus size={14} />
                        <span>Catalog to Corpus</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* LINGUISTICS ANALYZER SCREEN REPORT */}
              {currentAnalysis && (
                <div className="space-y-6">
                                {/* METRIC SUBTABS */}
                  <div className="flex border-b border-[#e2e8f0] dark:border-slate-800 space-x-6 text-sm">
                    <button
                      id="subtab-overview"
                      onClick={() => setParserSubTab("dashboard")}
                      className={`pb-3 font-semibold transition cursor-pointer ${
                        parserSubTab === "dashboard" 
                          ? `${d.primaryText} border-b-2 border-current` 
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      }`}
                    >
                      Linguistics Dashboard
                    </button>
                    
                    <button
                      id="subtab-tokens"
                      onClick={() => setParserSubTab("tokens")}
                      className={`pb-3 font-semibold transition cursor-pointer ${
                        parserSubTab === "tokens" 
                          ? `${d.primaryText} border-b-2 border-current` 
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      }`}
                    >
                      Token Explorer
                    </button>

                    <button
                      id="subtab-morphology"
                      onClick={() => setParserSubTab("morphology")}
                      className={`pb-3 font-semibold transition cursor-pointer ${
                        parserSubTab === "morphology" 
                          ? `${d.primaryText} border-b-2 border-current` 
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      }`}
                    >
                      Morphology & Borrowings
                    </button>

                    <button
                      id="subtab-syntax"
                      onClick={() => setParserSubTab("syntax")}
                      className={`pb-3 font-semibold transition cursor-pointer ${
                        parserSubTab === "syntax" 
                          ? `${d.primaryText} border-b-2 border-current` 
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      }`}
                    >
                      Syntactic Transitions
                    </button>
                  </div>

                  {/* REPORT VIEW: DASHBOARD PANEL */}
                  {parserSubTab === "dashboard" && (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      
                      {/* Metric Widgets (Column 1 and 2) */}
                      <div className="xl:col-span-2 space-y-6">
                        
                        {/* Summary Block */}
                        <div className={`rounded-2xl p-6 shadow-sm space-y-3 transition-all duration-300 ${d.card}`}>
                          <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${d.cardTitle}`}>
                            <BookOpen size={14} className={d.primaryText} />
                            <span>Linguistic Abstract</span>
                          </h4>
                          <p className={`text-sm leading-relaxed border-l-4 p-4 rounded-r-lg transition-all duration-300 ${d.abstractBox}`}>
                            "{currentAnalysis.summary}"
                          </p>
                        </div>

                        {/* Numeric Analysis Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Code-Mixing Index Speedometer */}
                          <div className={`rounded-2xl p-6 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden transition-all duration-300 ${d.card}`}>
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Code-Mixing Index (CMI)</h5>
                            
                            <div className="relative w-32 h-20 flex items-end justify-center mt-4">
                              {/* Semi-circular dial */}
                              <svg className="w-full h-full" viewBox="0 0 100 50">
                                <path 
                                  d="M 10 50 A 40 40 0 0 1 90 50" 
                                  fill="none" 
                                  stroke="#cbd5e1" 
                                  strokeWidth="10" 
                                />
                                <path 
                                  d="M 10 50 A 40 40 0 0 1 90 50" 
                                  fill="none" 
                                  stroke={theme === "midnight" ? "#10b981" : theme === "royal" ? "#800020" : theme === "teal" ? "#0d9488" : "#1d4ed8"} 
                                  strokeWidth="10" 
                                  strokeDasharray={`${(currentAnalysis.languageStats.codeMixingIndex / 100) * 125} 125`}
                                />
                              </svg>
                              
                              <div className="absolute inset-0 flex flex-col items-center justify-end">
                                <span className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100">{currentAnalysis.languageStats.codeMixingIndex}%</span>
                                <span className="text-[9px] text-slate-400 font-medium font-mono uppercase">Linguistic Index</span>
                              </div>
                            </div>
                            
                            <p className="text-[10px] text-slate-400 mt-3 font-mono">
                              {currentAnalysis.languageStats.codeMixingIndex > 40 
                                ? "High hybridization frequency" 
                                : currentAnalysis.languageStats.codeMixingIndex > 15 
                                  ? "Moderate code-mixing" 
                                  : "Predominantly monolingual"}
                            </p>
                          </div>

                          {/* Matrix Language Frame Card */}
                          <div className={`rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 transition-all duration-300 ${d.card}`}>
                            <div>
                              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Matrix Structure</h5>
                              <div className="flex items-baseline space-x-2">
                                <span className={`text-3xl font-extrabold transition-colors duration-300 ${d.primaryText}`}>{currentAnalysis.classification.matrixLanguage}</span>
                                <span className="text-xs text-slate-400">Frame</span>
                              </div>
                            </div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1">
                                <span>Switching Type:</span>
                                <span className="font-semibold text-slate-700 dark:text-slate-300">{currentAnalysis.classification.switchingType}</span>
                              </div>
                              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                <span>Switch Points:</span>
                                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{currentAnalysis.classification.switchingPointsCount} points</span>
                              </div>
                            </div>
                          </div>

                          {/* Sentiment Gauge Card */}
                          <div className={`rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 ${d.card}`}>
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Affective Sentiment</h5>
                            
                            <div className="flex items-center space-x-3 my-2">
                              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                                currentAnalysis.sentiment.label === "Positive" 
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                  : currentAnalysis.sentiment.label === "Negative" 
                                    ? "bg-rose-50 text-rose-700 border border-rose-200" 
                                    : "bg-slate-50 text-slate-700 border border-slate-200"
                              }`}>
                                {currentAnalysis.sentiment.label}
                              </span>
                              <span className="text-xs text-slate-400 font-mono font-semibold">
                                Conf: {Math.round(currentAnalysis.sentiment.score * 100)}%
                              </span>
                            </div>

                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  currentAnalysis.sentiment.label === "Positive" 
                                    ? "bg-emerald-500" 
                                    : currentAnalysis.sentiment.label === "Negative" 
                                      ? "bg-rose-500" 
                                      : "bg-slate-400"
                                }`} 
                                style={{ width: `${currentAnalysis.sentiment.score * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Language distribution visual charts */}
                        <div className={`rounded-2xl p-6 shadow-sm transition-all duration-300 ${d.card}`}>
                          <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-6 flex items-center space-x-1">
                            <TrendingUp size={14} className={d.primaryText} />
                            <span>Lexical Word Class Composition</span>
                          </h5>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            {/* Recharts Pie Chart */}
                            <div className="h-48 flex justify-center">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: "Bangla", value: currentAnalysis.languageStats.banglaWordCount },
                                      { name: "English", value: currentAnalysis.languageStats.englishWordCount },
                                      { name: "Mixed (Hybrid)", value: currentAnalysis.languageStats.mixedWordCount },
                                      { name: "Punctuation/Other", value: currentAnalysis.languageStats.punctuationCount }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={75}
                                    paddingAngle={3}
                                    dataKey="value"
                                  >
                                    <Cell fill="#10b981" />
                                    <Cell fill="#3b82f6" />
                                    <Cell fill="#8b5cf6" />
                                    <Cell fill="#94a3b8" />
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>

                            {/* Legend Panel & Numeric Details */}
                            <div className="space-y-3 text-xs text-slate-600">
                              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                                <span className="flex items-center space-x-2">
                                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                                  <strong>Bangla Vocabulary:</strong>
                                </span>
                                <span className="font-mono font-bold text-slate-800">{currentAnalysis.languageStats.banglaWordCount} words</span>
                              </div>
                              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                                <span className="flex items-center space-x-2">
                                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                                  <strong>English Vocabulary:</strong>
                                </span>
                                <span className="font-mono font-bold text-slate-800">{currentAnalysis.languageStats.englishWordCount} words</span>
                              </div>
                              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                                <span className="flex items-center space-x-2">
                                  <span className="w-2.5 h-2.5 bg-violet-500 rounded-full" />
                                  <strong>Mixed Morphology:</strong>
                                </span>
                                <span className="font-mono font-bold text-slate-800">{currentAnalysis.languageStats.mixedWordCount} words</span>
                              </div>
                              <div className="flex justify-between items-center pb-1.5">
                                <span className="flex items-center space-x-2">
                                  <span className="w-2.5 h-2.5 bg-slate-400 rounded-full" />
                                  <strong>Punctuation & Symbols:</strong>
                                </span>
                                <span className="font-mono font-bold text-slate-800">{currentAnalysis.languageStats.punctuationCount} units</span>
                              </div>
                              
                              <div className="pt-2 flex justify-between items-center text-slate-400 text-[10px]">
                                <span>Dominant Matrix:</span>
                                <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full font-mono uppercase">{currentAnalysis.languageStats.dominantLanguage}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Side Panel: POS distribution list and downloads */}
                      <div className="space-y-6">
                        
                        {/* Token Download & Export */}
                        <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 p-6 shadow-sm space-y-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                            <FileSpreadsheet size={15} className="text-[#3b82f6]" />
                            <span>Export Research CSV Dataset</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Download the current tokenization table complete with linguistic annotations, lemma structures, and POS tagging to integrate with external computational frameworks.
                          </p>
                          <button
                            id="export-tokens-csv"
                            onClick={() => triggerTokenCsvExport(currentAnalysis, "linguolens_token_analysis.csv")}
                            className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                          >
                            <Download size={14} />
                            <span>Download Token CSV</span>
                          </button>
                        </div>

                        {/* Top Parts of Speech chart list */}
                        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">POS Tag Frequency</h4>
                          
                          <div className="space-y-3">
                            {currentAnalysisPosFreq.slice(0, 5).map((pos, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded-md font-semibold text-slate-700">
                                    {pos.pos}
                                  </span>
                                  <span className="text-slate-400">{pos.count} occurrences</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-slate-800 h-full rounded-full" 
                                    style={{ width: `${(pos.count / currentAnalysis.tokens.length) * 100}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                            {currentAnalysisPosFreq.length === 0 && (
                              <p className="text-xs text-slate-400 text-center py-6">No POS tags mapped.</p>
                            )}
                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* REPORT VIEW: TOKEN EXPLORER PANEL */}
                  {parserSubTab === "tokens" && (
                    <div className="space-y-6">
                      
                      {/* Filter Bar & Controls */}
                      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm flex flex-wrap gap-2 items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-500 uppercase flex items-center space-x-1">
                            <Filter size={13} />
                            <span>Token Filter:</span>
                          </span>
                          
                          {(["All", "Bangla", "English", "Mixed", "Borrowed"] as const).map(f => (
                            <button
                              key={f}
                              onClick={() => setTokenFilter(f)}
                              className={`text-xs px-3 py-1.5 rounded-lg font-semibold border transition ${
                                tokenFilter === f 
                                  ? "bg-slate-900 text-white border-slate-950" 
                                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {f === "Mixed" ? "Mixed (Hybrid)" : f}
                            </button>
                          ))}
                        </div>

                        <div className="text-xs font-semibold text-slate-400 font-mono">
                          Displaying {filteredTokens.length} of {currentAnalysis.tokens.length} tokens
                        </div>
                      </div>

                      {/* Main Tokens Splitting View */}
                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                        
                        {/* Token list table (2 cols wide) */}
                        <div className="xl:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-xs font-bold text-slate-500 uppercase">
                                  <th className="p-4 w-12 font-mono">Index</th>
                                  <th className="p-4">Word / Token</th>
                                  <th className="p-4">Language Class</th>
                                  <th className="p-4">POS Tag</th>
                                  <th className="p-4">Root Word</th>
                                  <th className="p-4">Linguistic Gloss</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-sm">
                                {filteredTokens.map((t, idx) => (
                                  <tr 
                                    key={idx} 
                                    onMouseEnter={() => setHoveredToken(t)}
                                    className="hover:bg-[#f1f5f9]/50 transition duration-150 cursor-pointer"
                                  >
                                    <td className="p-4 font-mono text-xs text-slate-400">{idx + 1}</td>
                                    <td className="p-4 font-semibold text-slate-800">
                                      {t.text}
                                    </td>
                                    <td className="p-4">
                                      <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${
                                        t.language === "Bangla" 
                                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                          : t.language === "English" 
                                            ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                            : t.language === "Mixed" 
                                              ? "bg-violet-50 text-violet-700 border border-violet-100" 
                                              : "bg-slate-50 text-slate-500 border border-slate-100"
                                      }`}>
                                        {t.language}
                                      </span>
                                    </td>
                                    <td className="p-4">
                                      <span className="font-mono text-xs font-bold bg-slate-100 px-1.5 py-0.5 rounded-sm text-slate-600">
                                        {t.posTag}
                                      </span>
                                    </td>
                                    <td className="p-4 font-mono text-xs text-slate-500">
                                      {t.morphology?.root || "-"}
                                    </td>
                                    <td className="p-4 text-xs text-slate-500 italic truncate max-w-[120px]">
                                      {t.englishGloss}
                                    </td>
                                  </tr>
                                ))}
                                {filteredTokens.length === 0 && (
                                  <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-400 text-xs italic">
                                      No tokens match the active linguistic filter.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Hovered Token Metadata Panel (1 col wide) */}
                        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4 sticky top-6">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                            <Info size={14} className="text-[#1d4ed8]" />
                            <span>Morphosyntactic Annotator</span>
                          </h4>
                          
                          {hoveredToken ? (
                            <div className="space-y-4">
                              <div className="border-b border-slate-100 pb-3">
                                <span className="text-2xl font-extrabold text-slate-800 font-mono tracking-tight">{hoveredToken.text}</span>
                                <div className="mt-1 flex items-center space-x-2">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    hoveredToken.language === "Bangla" 
                                      ? "bg-emerald-100 text-emerald-800" 
                                      : hoveredToken.language === "English" 
                                        ? "bg-blue-100 text-blue-800" 
                                        : "bg-violet-100 text-violet-800"
                                  }`}>
                                    {hoveredToken.language}
                                  </span>
                                  {hoveredToken.morphology?.isBorrowed && (
                                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Loaned</span>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-2.5 text-xs">
                                <div className="flex justify-between pb-1 border-b border-slate-50">
                                  <span className="text-slate-400 font-medium">Transliterated Frame:</span>
                                  <span className="font-semibold text-slate-800 font-mono">{hoveredToken.transliterated || hoveredToken.text}</span>
                                </div>
                                
                                <div className="flex justify-between pb-1 border-b border-slate-50">
                                  <span className="text-slate-400 font-medium">Universal POS Tag:</span>
                                  <span className="font-semibold text-slate-800 font-mono bg-slate-100 px-1 py-0.5 rounded-md">{hoveredToken.posTag}</span>
                                </div>

                                <div className="flex justify-between pb-1 border-b border-slate-50">
                                  <span className="text-slate-400 font-medium">NER Classification:</span>
                                  <span className="font-semibold text-slate-800 font-mono text-slate-500">{hoveredToken.nerTag}</span>
                                </div>

                                <div className="flex justify-between pb-1 border-b border-slate-50">
                                  <span className="text-slate-400 font-medium">Base Root Lemma:</span>
                                  <span className="font-semibold text-[#1d4ed8] font-mono">{hoveredToken.morphology?.root || hoveredToken.text}</span>
                                </div>

                                <div className="flex justify-between pb-1 border-b border-slate-50">
                                  <span className="text-slate-400 font-medium">Affixes Segmented:</span>
                                  <span className="font-semibold text-slate-800">
                                    {hoveredToken.morphology?.affixes?.length > 0 
                                      ? hoveredToken.morphology.affixes.join(", ") 
                                      : "None (Morphemically simple)"}
                                  </span>
                                </div>

                                <div className="space-y-1 pt-2">
                                  <span className="text-slate-400 font-medium">English Translation / Semantic Gloss:</span>
                                  <p className="p-2.5 bg-slate-50 rounded-lg text-slate-700 italic border-l-2 border-slate-300">
                                    "{hoveredToken.englishGloss}"
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-12 text-slate-400 text-xs italic space-y-2">
                              <Globe size={22} className="mx-auto text-slate-300 animate-spin" style={{ animationDuration: '8s' }} />
                              <p>Hover over a word in the database table to deconstruct its morphological segmentation.</p>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  )}

                  {/* REPORT VIEW: MORPHOLOGY & BORROWINGS PANEL */}
                  {parserSubTab === "morphology" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Borrowed Vocabulary list (2 cols) */}
                      <div className="lg:col-span-2 space-y-6">
                        
                        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                              <Layers size={14} className="text-[#1d4ed8]" />
                              <span>Lexical Borrowing Inventory</span>
                            </h4>
                            <p className="text-xs text-slate-400 mt-1">
                              Tracks instances where nouns or adjectives from English are directly embedded into Bangla morphosyntactic structures.
                            </p>
                          </div>

                          <div className="divide-y divide-slate-100">
                            {currentAnalysis.borrowedVocabulary?.map((b, idx) => (
                              <div key={idx} className="py-3 flex justify-between items-center text-sm">
                                <div className="space-y-1">
                                  <span className="font-bold text-[#1d4ed8] font-mono">{b.word}</span>
                                  <div className="text-xs text-slate-500">
                                    <span className="font-semibold text-slate-400">Syntax Frame:</span> {b.targetSyntax}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="bg-slate-100 text-slate-600 font-mono font-bold text-xs px-2.5 py-1 rounded-full">
                                    Freq: {b.frequency}
                                  </span>
                                </div>
                              </div>
                            ))}
                            {(!currentAnalysis.borrowedVocabulary || currentAnalysis.borrowedVocabulary.length === 0) && (
                              <p className="text-xs text-slate-400 py-6 text-center">No explicit lexical borrowings identified.</p>
                            )}
                          </div>
                        </div>

                        {/* Slang and informal terminology */}
                        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Colloquial & Informal Markers</h4>
                            <p className="text-xs text-slate-400 mt-1">Extracted colloquial slang expressions, Banglish colloquial compound phrases, and their semantic translations.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentAnalysis.slangAndInformal?.map((s, idx) => (
                              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1.5">
                                <div className="flex justify-between text-xs border-b border-slate-200 pb-1.5">
                                  <strong className="font-bold text-slate-800 font-mono">{s.term}</strong>
                                  <span className="text-[10px] font-mono bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md uppercase">{s.category}</span>
                                </div>
                                <p className="text-xs text-slate-600 italic leading-relaxed">
                                  "{s.meaning}"
                                </p>
                              </div>
                            ))}
                            {(!currentAnalysis.slangAndInformal || currentAnalysis.slangAndInformal.length === 0) && (
                              <p className="col-span-2 text-xs text-slate-400 py-6 text-center">No colloquialisms or slang identified.</p>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Side Panel: Emoji Pragmatics */}
                      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
                        <div>
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pragmatic Emoji Interpreter</h4>
                          <p className="text-xs text-slate-400 mt-1">Analyzes the computational and pragmatic utility of emojis in conversational code-switching.</p>
                        </div>

                        <div className="space-y-3">
                          {currentAnalysis.emojis?.map((em, idx) => (
                            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3 text-xs">
                              <span className="text-2xl select-none leading-none">{em.emoji}</span>
                              <div className="space-y-1">
                                <strong className="font-semibold text-slate-700">Linguistic Utility:</strong>
                                <p className="text-slate-500 leading-relaxed italic">"{em.linguisticFunction}"</p>
                              </div>
                            </div>
                          ))}
                          {(!currentAnalysis.emojis || currentAnalysis.emojis.length === 0) && (
                            <div className="text-center py-12 text-slate-400 italic space-y-1.5">
                              <HelpCircle className="mx-auto text-slate-300" size={24} />
                              <p>No emojis detected in text input.</p>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* REPORT VIEW: SYNTAX TRANSITIONS PANEL */}
                  {parserSubTab === "syntax" && (
                    <div className="space-y-6">
                      
                      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
                        <div>
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Syntactic Mapping of Sentences</h4>
                          <p className="text-xs text-slate-400 mt-1">Each sentence analyzed sequentially to extract code-mixing patterns, sentence categories, and localized CMI.</p>
                        </div>

                        <div className="space-y-4 divide-y divide-slate-100">
                          {currentAnalysis.sentenceStructure?.map((s, idx) => (
                            <div key={idx} className={`pt-4 ${idx === 0 ? "pt-0" : ""} space-y-3`}>
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="bg-slate-100 text-slate-600 font-mono text-[10px] px-2 py-0.5 rounded-md uppercase font-bold">
                                  Sentence {idx + 1} • {s.type} Structure
                                </span>
                                
                                <div className="flex items-center space-x-3 text-xs">
                                  <span className="font-mono font-medium text-slate-500">
                                    Mixing: <strong className="font-bold text-slate-800">{s.cmi}% CMI</strong>
                                  </span>
                                </div>
                              </div>

                              <p className="text-sm font-semibold text-slate-800 leading-relaxed font-mono">
                                "{s.sentence}"
                              </p>

                              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Language Transition Pattern:</span>
                                <div className="flex flex-wrap items-center gap-1">
                                  {s.languagePattern.split("-").map((pt, pIdx) => (
                                    <div key={pIdx} className="flex items-center space-x-1">
                                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-sm ${
                                        pt === "B" 
                                          ? "bg-emerald-100 text-emerald-800" 
                                          : pt === "E" 
                                            ? "bg-blue-100 text-blue-800" 
                                            : "bg-violet-100 text-violet-800"
                                      }`}>
                                        {pt === "B" ? "Bangla" : pt === "E" ? "English" : "Mixed"}
                                      </span>
                                      {pIdx < s.languagePattern.split("-").length - 1 && (
                                        <ArrowRight size={11} className="text-slate-300" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                          {(!currentAnalysis.sentenceStructure || currentAnalysis.sentenceStructure.length === 0) && (
                            <p className="text-xs text-slate-400 text-center py-6">No structural sentence mappings provided.</p>
                          )}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* TAB 2: CORPUS LINGUISTICS DATABASE EXPLORER */}
          {activeTab === "corpus" && (
            <div className="space-y-6">
              
              {/* Corpus Metrics Aggregator Panels */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-[#1d4ed8] rounded-xl">
                    <Database size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Catalog Size</span>
                    <strong className="text-2xl font-bold text-slate-800 font-mono">{corpusMetrics.totalSamples}</strong>
                    <span className="text-xs text-slate-400 block mt-0.5">Anonymized Samples</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mean Corpus CMI</span>
                    <strong className="text-2xl font-bold text-slate-800 font-mono">{corpusMetrics.avgCmi}%</strong>
                    <span className="text-xs text-slate-400 block mt-0.5">Mixing Density</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-violet-50 text-violet-700 rounded-xl">
                    <Layers size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Parsed Words</span>
                    <strong className="text-2xl font-bold text-slate-800 font-mono">{corpusMetrics.totalTokens}</strong>
                    <span className="text-xs text-slate-400 block mt-0.5">Annotated Tokens</span>
                  </div>
                </div>

                {/* Database Exporters Widget */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Export Database Dataset</h4>
                    <p className="text-[10px] text-slate-300 leading-relaxed mt-0.5">Download corpus variables anonymized for research engines.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      id="export-corpus-csv"
                      onClick={triggerCorpusCsvExport}
                      className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-1.5 px-2.5 rounded-lg flex items-center justify-center space-x-1 cursor-pointer transition text-[11px]"
                    >
                      <Download size={11} />
                      <span>CSV Data</span>
                    </button>
                    <button
                      id="export-corpus-json"
                      onClick={triggerCorpusJsonExport}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-1.5 px-2.5 rounded-lg flex items-center justify-center space-x-1 cursor-pointer transition text-[11px]"
                    >
                      <Globe size={11} />
                      <span>Anonymized JSON</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* CORPUS COMPOSITION GRAPHS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Pos tag frequency aggregator */}
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center space-x-2">
                    <Layers size={14} className="text-[#1d4ed8]" />
                    <span>Corpus Parts-of-Speech Universal Ratios (D3/Recharts Visualization)</span>
                  </h5>
                  
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={corpusMetrics.posDistribution}>
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                          {corpusMetrics.posDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? "#1d4ed8" : index === 1 ? "#3b82f6" : "#60a5fa"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Language proportion ratios across all database */}
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center space-x-2">
                    <Languages size={14} className="text-emerald-600" />
                    <span>Corpus Cumulative Language Distribution</span>
                  </h5>

                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={corpusMetrics.languageDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {corpusMetrics.languageDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconSize={8} iconType="circle" style={{ fontSize: 11 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* SEARCH FILTERS AND CATALOG DATABASE TABLE */}
              <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
                
                {/* Filters Row */}
                <div className="p-6 bg-[#f8fafc] border-b border-[#e2e8f0] flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-72 shrink-0">
                    <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input
                      id="corpus-search"
                      type="text"
                      placeholder="Search text, annotations, tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-[#cbd5e1] outline-none rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 items-center justify-end w-full">
                    
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-slate-500 font-semibold">Switching Type:</span>
                      <select
                        id="filter-switching"
                        value={filterSwitchingType}
                        onChange={(e) => setFilterSwitchingType(e.target.value)}
                        className="bg-white border border-[#cbd5e1] rounded-lg p-1.5 outline-none font-semibold text-slate-700"
                      >
                        <option value="All">All Types</option>
                        <option value="Insertional">Insertional</option>
                        <option value="Alternational">Alternational</option>
                        <option value="Intra-sentential">Intra-sentential</option>
                        <option value="Intersentential">Intersentential</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-slate-500 font-semibold">Matrix:</span>
                      <select
                        id="filter-matrix"
                        value={filterMatrixLanguage}
                        onChange={(e) => setFilterMatrixLanguage(e.target.value)}
                        className="bg-white border border-[#cbd5e1] rounded-lg p-1.5 outline-none font-semibold text-slate-700"
                      >
                        <option value="All">All Frames</option>
                        <option value="Bangla">Bangla Frame</option>
                        <option value="English">English Frame</option>
                        <option value="Mixed">Mixed Frame</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-slate-500 font-semibold">Min CMI:</span>
                      <input 
                        id="filter-min-cmi"
                        type="number"
                        min="0"
                        max="100"
                        value={filterMinCmi}
                        onChange={(e) => setFilterMinCmi(Number(e.target.value))}
                        className="w-14 bg-white border border-[#cbd5e1] rounded-lg p-1 outline-none font-mono text-slate-700 text-center"
                      />
                      <span className="text-slate-400">%</span>
                    </div>

                  </div>
                </div>

                {/* Database Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-xs font-bold text-slate-500 uppercase">
                        <th className="p-4">Recorded Date</th>
                        <th className="p-4 w-96">Text Sample</th>
                        <th className="p-4">Tags / Labels</th>
                        <th className="p-4 text-center">CMI Index</th>
                        <th className="p-4">Switching Class</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredCorpus.map((item, idx) => (
                        <tr 
                          key={item.id}
                          onClick={() => loadCorpusItemToWorkspace(item)}
                          className="hover:bg-[#f1f5f9]/50 transition duration-150 cursor-pointer"
                        >
                          <td className="p-4 text-xs text-slate-400 font-mono">
                            <span className="flex items-center space-x-1.5">
                              <Calendar size={13} />
                              <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                            </span>
                          </td>
                          <td className="p-4 font-semibold text-slate-800">
                            <p className="truncate max-w-[320px]">{item.text}</p>
                            {item.researcherNotes && (
                              <span className="text-[10px] text-slate-400 block font-normal italic truncate max-w-[320px] mt-0.5">
                                Notes: {item.researcherNotes}
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {item.tags?.split(",").map((t, tIdx) => (
                                <span key={tIdx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                                  {t.trim()}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-center font-mono font-bold text-slate-800">
                            <span className={`px-2 py-0.5 rounded ${
                              item.analysis.languageStats.codeMixingIndex > 35 
                                ? "bg-red-50 text-red-700" 
                                : item.analysis.languageStats.codeMixingIndex > 15 
                                  ? "bg-amber-50 text-amber-700" 
                                  : "bg-emerald-50 text-emerald-700"
                            }`}>
                              {item.analysis.languageStats.codeMixingIndex}%
                            </span>
                          </td>
                          <td className="p-4 text-xs">
                            <div className="space-y-0.5">
                              <span className="font-semibold text-slate-700">{item.analysis.classification.switchingType}</span>
                              <span className="text-slate-400 block">Matrix: {item.analysis.classification.matrixLanguage}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end space-x-2">
                              <button 
                                onClick={() => loadCorpusItemToWorkspace(item)}
                                className="p-1.5 text-slate-400 hover:text-[#1d4ed8] hover:bg-[#1d4ed8]/10 rounded-lg transition"
                                title="Load to active parser workspace"
                              >
                                <ChevronRight size={16} />
                              </button>
                              <button 
                                onClick={(e) => deleteCorpusItem(item.id, e)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                title="Delete from corpus dataset"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredCorpus.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-slate-400 text-xs italic">
                            No corpus records found matching active query filters. Add custom text inputs dynamically or clear active search terms.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: ACADEMIC RESEARCH REPORTS */}
          {activeTab === "reports" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              
              {/* Left Column: Report Controls / Inputs (1 col) */}
              <div className={`rounded-2xl p-6 shadow-sm space-y-4 border transition-all duration-300 ${d.card}`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${d.cardTitle}`}>
                  <Edit3 size={15} className="text-[#1d4ed8]" />
                  <span>Configure Scientific Report</span>
                </h3>
                <p className="text-xs text-slate-400">Customize the publication parameters. The platform dynamically binds corpus statistics, POS frequencies, and linguistic summaries into the draft format.</p>
                
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Research Paper Title</label>
                    <input 
                      type="text" 
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      className={`w-full outline-none rounded-lg p-2.5 text-xs font-semibold border ${d.tagInput}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lead Investigator</label>
                    <input 
                      type="text" 
                      value={leadResearcher}
                      onChange={(e) => setLeadResearcher(e.target.value)}
                      className={`w-full outline-none rounded-lg p-2.5 text-xs border ${d.tagInput}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Institutional Affiliation</label>
                    <input 
                      type="text" 
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                      className={`w-full outline-none rounded-lg p-2.5 text-xs border ${d.tagInput}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Methodology Narrative</label>
                    <textarea 
                      value={reportIntro}
                      onChange={(e) => setReportIntro(e.target.value)}
                      className={`w-full outline-none rounded-lg p-2.5 text-xs h-28 resize-none leading-relaxed border ${d.tagInput}`}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={printReport}
                    className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <Download size={14} />
                    <span>Print Scientific Report</span>
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">Generates print-styled HTML, fully compiled and formatted for standard printers/PDF drivers.</p>
                </div>
              </div>

              {/* Right Column: Interactive Paper Draft Preview (2 cols) */}
              <div className="xl:col-span-2 bg-white rounded-2xl border border-[#cbd5e1] shadow-md overflow-hidden flex flex-col h-[650px]">
                {/* PDF Draft Toprail */}
                <div className="h-11 bg-slate-100 border-b border-[#cbd5e1] px-6 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <span>Live Interactive Manuscript Draft (.docx/print preview)</span>
                  </div>
                  <span className="font-mono text-[10px]">A4 Format • Style: APA-7 Academic</span>
                </div>

                {/* Draft Content Page */}
                <div className="flex-1 p-12 overflow-y-auto bg-white text-slate-800 font-serif space-y-6 select-text">
                  <div className="text-center space-y-1">
                    <h1 className="text-xl font-bold font-sans tracking-tight text-slate-900">{reportTitle}</h1>
                    <p className="text-xs font-sans text-slate-500"><strong>Principal Investigator:</strong> {leadResearcher}</p>
                    <p className="text-[11px] font-sans text-slate-400 italic">{affiliation}</p>
                    <div className="w-12 h-0.5 bg-slate-300 mx-auto my-4" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-sans text-[#1d4ed8] uppercase tracking-wider">I. Abstract</h3>
                    <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-4 border-l-2 border-slate-300 rounded-r-lg">
                      "{currentAnalysis?.summary || "No active abstract compiled. Navigate to the parser, load or type mixed text, and run the linguistics compiler first."}"
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                    <h3 className="text-xs font-bold font-sans text-[#1d4ed8] uppercase tracking-wider">II. Methodological Framing</h3>
                    <p>{reportIntro}</p>
                    <p>Quantitative features are tracked globally through localized lexical transition models. CMI represents the normalized bilingual complexity ratio based on parts-of-speech segmentations.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold font-sans text-[#1d4ed8] uppercase tracking-wider">III. Primary Corpus Aggregates</h3>
                    <div className="grid grid-cols-3 gap-4 text-center font-sans">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-lg font-bold font-mono text-slate-800">{corpusMetrics.totalSamples}</span>
                        <span className="text-[10px] text-slate-400 block">Corpus Size</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-lg font-bold font-mono text-slate-800">{corpusMetrics.avgCmi}%</span>
                        <span className="text-[10px] text-slate-400 block">Avg. Corpus CMI</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-lg font-bold font-mono text-slate-800">{corpusMetrics.totalTokens}</span>
                        <span className="text-[10px] text-slate-400 block">Parsed Words</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-sans text-[#1d4ed8] uppercase tracking-wider">IV. Morphosyntactic Lexical Borrowings</h3>
                    <p className="text-xs text-slate-700 leading-relaxed">The table below details identified hybrid integrations where English nouns or adjectives attach directly with Bangla case inflectional suffixes:</p>
                    
                    <div className="border border-slate-200 rounded-lg overflow-hidden font-sans">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase text-[10px]">
                            <th className="p-3">Linguistic Term</th>
                            <th className="p-3">Source Origin</th>
                            <th className="p-3">Syntactic Context Mapping</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                          {currentAnalysis?.borrowedVocabulary?.slice(0, 4).map((b, idx) => (
                            <tr key={idx}>
                              <td className="p-3 font-bold font-mono text-[#1d4ed8]">{b.word}</td>
                              <td className="p-3">{b.sourceLanguage}</td>
                              <td className="p-3 font-mono text-[11px]">{b.targetSyntax}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* HELPING AI ASSISTANT PANEL */}
      {isAssistantOpen && (
        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0f1d] flex flex-col shrink-0 z-20 shadow-xl font-sans">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/40">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-purple-500 animate-pulse" size={16} />
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-mono">Bilingual AI Helper</h3>
                <p className="text-[9px] text-slate-400">Powered by Gemini-3.5-Flash</p>
              </div>
            </div>
            <button 
              onClick={() => setIsAssistantOpen(false)}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 rounded-md transition cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Prompt Templates */}
          <div className="p-3 bg-purple-50/50 dark:bg-purple-950/10 border-b border-slate-100 dark:border-slate-800/40 space-y-1.5">
            <span className="text-[9px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-mono block">Suggested Inquiries</span>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handlePresetQuery("Explain Matrix Language Frame (MLF) model simply.")}
                className="text-[10px] bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900 hover:border-purple-300 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-lg shadow-xs transition-all text-left truncate max-w-full cursor-pointer"
              >
                Explain MLF Model
              </button>
              <button
                onClick={() => handlePresetQuery("Help me calculate CMI (Code-Mixing Index) step-by-step.")}
                className="text-[10px] bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900 hover:border-purple-300 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-lg shadow-xs transition-all text-left truncate max-w-full cursor-pointer"
              >
                How to calculate CMI?
              </button>
              <button
                onClick={() => handlePresetQuery("Convert the active input into a creative Romanized story.")}
                className="text-[10px] bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900 hover:border-purple-300 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-lg shadow-xs transition-all text-left truncate max-w-full cursor-pointer"
              >
                Convert active input to story
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-slate-50/30 dark:bg-[#080d17]/10" id="assistant-chat-container">
            {assistantMessages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed shadow-xs ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white rounded-tr-none"
                    : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[8px] text-slate-400 mt-0.5 px-1">{msg.role === "user" ? "You" : "Helper AI"}</span>
              </div>
            ))}
            {isAssistantLoading && (
              <div className="flex items-center space-x-2 text-slate-400 py-1">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[10px] italic font-mono">Assistant compiling ideas...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask anything about code-mixing..."
              value={assistantInput}
              onChange={(e) => setAssistantInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendAssistantMessage();
              }}
              disabled={isAssistantLoading}
              className={`flex-1 text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg outline-none focus:border-purple-400 text-slate-800 dark:text-slate-100`}
            />
            <button
              onClick={handleSendAssistantMessage}
              disabled={isAssistantLoading || !assistantInput.trim()}
              className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-lg transition cursor-pointer shadow-xs flex items-center justify-center"
            >
              <Send size={13} />
            </button>
          </div>
        </aside>
      )}

    </div>
  );
}
