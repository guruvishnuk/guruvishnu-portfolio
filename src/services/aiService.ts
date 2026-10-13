import { RESUME_DATA } from '../data/resumeKnowledge';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  commandExecuted?: string;
  suggestedActions?: { label: string; action: () => void }[];
}

/**
 * Natural Conversational AI Assistant Engine for Guruvishnu's Portfolio
 */
export async function generateResumeResponse(query: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `You are an AI assistant for Guruvishnu B Kajagar's portfolio website. 
      Answer the user's question based on the following resume data. Be concise, professional, and conversational.
      Resume Data: ${JSON.stringify(RESUME_DATA)}
      
      User's query: ${query}`;
      
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.error("Gemini API error, falling back to static rules.", err);
      return getStaticResponse(query);
    }
  }

  // Fallback to static matching if no API key is provided
  return getStaticResponse(query);
}

function getStaticResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. RESUME / CV
  if (q.includes('resume') || q.includes('cv') || q.includes('live resume') || q.includes('download resume') || q.includes('pdf')) {
    return "You can view Guruvishnu's Live Resume right here in the application! Click the 'Live Resume' button in the top navigation or check out the interactive Live Resume section to inspect, copy, or print his official resume.";
  }

  // 2. ABOUT
  if (q.includes('introduce') || q.includes('summary') || q.includes('who is guruvishnu') || q.includes('about you') || q === 'about') {
    return "I'm Guruvishnu B Kajagar, a Frontend Developer with 1+ year of production experience at CandorWorks building responsive web applications using React, TypeScript, and Java. I specialize in crafting clean user interfaces and optimizing web performance.";
  }

  // 3. GREETINGS
  if (['hi', 'hello', 'hey', 'greetings', 'namaste'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ')) {
    return 'Hi! Nice to meet you. How can I help?';
  }

  // 4. EXPERIENCE
  if (q.includes('experience') || q.includes('work') || q.includes('candorworks') || q.includes('job') || q.includes('role')) {
    return "I'm a frontend developer with production experience at CandorWorks. I worked on Alacrity (an import/export logistics platform) where I cut redundant API calls by ~60% and reduced initial bundle size by ~35%. I also built a modular library of 12+ reusable UI components.";
  }

  // 5. PROJECTS & CODELAB
  if (q.includes('codelab') || q.includes('learning platform') || q.includes('collaboration')) {
    return "CodeLab is Guruvishnu's collaborative developer learning platform built with React, TypeScript, and Tailwind CSS. It features architectural deep-dives, interactive code exercises, and platform philosophy.";
  }

  if (q.includes('project') || q.includes('build') || q.includes('apps') || q.includes('voting') || q.includes('fresh bites')) {
    return "Guruvishnu's featured projects include:\n• 🌟 **Interactive Portfolio:** 3D WebGL scenes, interactive CLI terminal, and AI assistant.\n• 💻 **CodeLab:** Developer learning platform and architectural showcase.\n• 🥗 **Fresh Bites:** Fast e-commerce food ordering app with optimized state.\n• 🗳️ **Secure E-Voting:** Biometric iris-verified and encrypted voting platform.";
  }

  // 6. TECH STACK
  if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('react') || q.includes('tech') || q.includes('frontend')) {
    return 'My core stack includes React.js, TypeScript, Next.js, JavaScript (ES6+), HTML5, CSS3, Three.js/R3F, and Tailwind CSS v4. On the backend side, I work with Java, Spring Boot, REST APIs, MySQL, and PostgreSQL.';
  }

  // 7. GITHUB & SOCIALS
  if (q.includes('github') || q.includes('repo') || q.includes('source') || q.includes('code')) {
    return "Explore Guruvishnu's open-source projects, activity, and commit history on GitHub: https://github.com/guruvishnuk. Check out the GitHub Dev Dashboard section right here on this page!";
  }

  if (q.includes('linkedin') || q.includes('profile') || q.includes('connect')) {
    return "Connect with Guruvishnu on LinkedIn at: https://www.linkedin.com/in/guruvishnu-kajagar-/";
  }

  if (q.includes('blog') || q.includes('article') || q.includes('writing') || q.includes('dev.to')) {
    return "Guruvishnu publishes frontend engineering articles and optimization guides on Dev.to. Check the 'Latest Articles' section on this page to browse recent posts!";
  }

  // 8. EDUCATION
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('university') || q.includes('vtu')) {
    return 'I hold a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Visvesvaraya Technological University (VTU Belagavi). I also completed Full-Stack Training at J Spiders.';
  }

  // 9. CONTACT & HIRING
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('location') || q.includes('available')) {
    return 'I’m based in Pune, India, and available immediately for Frontend or Full-Stack roles (Pune, Bangalore, or Remote). You can reach me at guruvishnu1927@gmail.com or via the Contact Control Panel below.';
  }

  // Default fallback
  return "I'm happy to tell you more about Guruvishnu's experience at CandorWorks, React & TypeScript skills, projects (CodeLab, Fresh Bites, E-Voting), or education. What would you like to know?";
}
