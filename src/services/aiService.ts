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

  // 5. PROJECTS
  if (q.includes('project') || q.includes('build') || q.includes('apps') || q.includes('voting')) {
    return "My key projects include this 3D-Enhanced Interactive Developer Portfolio (React, Three.js), Fresh-Bites (food recipe & e-commerce platform), and a biometric Secure E-Voting system utilizing iris recognition authentication.";
  }

  // 6. TECH STACK
  if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('react') || q.includes('tech')) {
    return 'My core stack includes React.js, TypeScript, Next.js, JavaScript (ES6+), HTML5, CSS3, Three.js/R3F, and Tailwind CSS v4. On the backend side, I work with Java, Spring Boot, REST APIs, MySQL, and PostgreSQL.';
  }

  // 7. EDUCATION
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('university') || q.includes('vtu')) {
    return 'I hold a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Visvesvaraya Technological University (VTU Belagavi). I also completed Full-Stack Training at J Spiders.';
  }

  // 8. CONTACT
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('location')) {
    return 'I’m based in Pune, India, and available immediately for Frontend or Full-Stack roles. You can reach me at guruvishnukajagar@gmail.com.';
  }

  // Default fallback
  return "I'm happy to tell you more about Guruvishnu's experience at CandorWorks, React & TypeScript skills, projects, or education. What would you like to know?";
}
