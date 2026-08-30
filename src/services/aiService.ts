import { RESUME_DATA } from '../data/resumeKnowledge';

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
 * Understanding queries contextually, communicating naturally like a professional AI assistant.
 */
export function generateResumeResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // ----------------------------------------------------
  // 1. RESUME / CV / LIVE RESUME
  // ----------------------------------------------------
  if (
    q.includes('resume') ||
    q.includes('cv') ||
    q.includes('live resume') ||
    q.includes('download resume') ||
    q.includes('pdf')
  ) {
    return "You can view Guruvishnu's Live Resume right here in the application! Click the 'Live Resume' button in the top navigation or check out the interactive Live Resume section to inspect, copy, or print his official resume.";
  }

  // ----------------------------------------------------
  // 2. INTRODUCE / ABOUT / WHO IS GURUVISHNU
  // ----------------------------------------------------
  if (
    q.includes('introduce') ||
    q.includes('intro') ||
    q.includes('summary') ||
    q.includes('who is guruvishnu') ||
    q.includes('tell me about yourself') ||
    q.includes('tell me about guruvishnu') ||
    q.includes('about you') ||
    q.includes('about guruvishnu') ||
    q.includes('who are you') ||
    q.includes('background') ||
    q.includes('bio') ||
    q.includes('profile') ||
    q === 'about' ||
    q === 'whoami'
  ) {
    return "I'm Guruvishnu B Kajagar, a Frontend Developer with 1+ year of production experience at CandorWorks building responsive web applications using React, TypeScript, and Java. I specialize in crafting clean user interfaces and optimizing web performance.";
  }

  // ----------------------------------------------------
  // 3. GREETINGS & CASUAL INTROS
  // ----------------------------------------------------
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q === 'yo' ||
    q === 'hii' ||
    q === 'heyy' ||
    q === 'greetings' ||
    q === 'namaste' ||
    q === 'hola' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ')
  ) {
    return 'Hi! Nice to meet you. How can I help?';
  }

  // ----------------------------------------------------
  // 4. EXPERIENCE / WORK AT CANDORWORKS
  // ----------------------------------------------------
  if (
    q.includes('experience') ||
    q.includes('work') ||
    q.includes('candorworks') ||
    q.includes('candor') ||
    q.includes('alacrity') ||
    q.includes('job') ||
    q.includes('role') ||
    q.includes('history')
  ) {
    return "I'm a frontend developer with production experience at CandorWorks. I worked on Alacrity (an import/export logistics platform) where I cut redundant API calls by ~60% and reduced initial bundle size by ~35%. I also built a modular library of 12+ reusable UI components for a talent evaluation platform.";
  }

  // ----------------------------------------------------
  // 5. PROJECTS / WORK SAMPLES
  // ----------------------------------------------------
  if (
    q.includes('project') ||
    q.includes('projects') ||
    q.includes('build') ||
    q.includes('built') ||
    q.includes('apps') ||
    q.includes('fresh-bites') ||
    q.includes('freshbites') ||
    q.includes('voting') ||
    q.includes('iris') ||
    q.includes('demo')
  ) {
    return "My key projects include this 3D-Enhanced Interactive Developer Portfolio (built with React, TypeScript, Three.js, Vite, and Recharts), Fresh-Bites (a food recipe & e-commerce platform), and a biometric Secure E-Voting system utilizing iris recognition authentication.";
  }

  // ----------------------------------------------------
  // 6. PREFERRED TECHNOLOGIES / TECH STACK
  // ----------------------------------------------------
  if (
    q.includes('prefer') ||
    q.includes('preference') ||
    q.includes('favorite') ||
    q.includes('favourite')
  ) {
    return 'I mainly enjoy working with React.js and TypeScript for frontend development, especially when building interactive, fast, and accessible user interfaces.';
  }

  if (
    q.includes('technology') ||
    q.includes('technologies') ||
    q.includes('skill') ||
    q.includes('skills') ||
    q.includes('stack') ||
    q.includes('language') ||
    q.includes('languages') ||
    q.includes('tool') ||
    q.includes('tools') ||
    q.includes('frontend') ||
    q.includes('backend') ||
    q.includes('react') ||
    q.includes('typescript') ||
    q.includes('java') ||
    q.includes('next') ||
    q.includes('tailwind')
  ) {
    return 'My core stack includes React.js, TypeScript, Next.js, JavaScript (ES6+), HTML5, CSS3, Three.js/R3F, and Tailwind CSS v4. On the backend side, I work with Java, Spring Boot, REST APIs, MySQL, and PostgreSQL.';
  }

  // ----------------------------------------------------
  // 7. EDUCATION / ACADEMICS
  // ----------------------------------------------------
  if (
    q.includes('education') ||
    q.includes('college') ||
    q.includes('degree') ||
    q.includes('university') ||
    q.includes('vtu') ||
    q.includes('belagavi') ||
    q.includes('cgpa') ||
    q.includes('j spider') ||
    q.includes('jspider') ||
    q.includes('study')
  ) {
    return 'I hold a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Visvesvaraya Technological University (VTU Belagavi). I also completed Full-Stack Training at J Spiders where I was awarded Best Coder of the Week (Java).';
  }

  // ----------------------------------------------------
  // 8. CONTACT / LOCATION / AVAILABILITY / HIRE
  // ----------------------------------------------------
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('reach') ||
    q.includes('hire') ||
    q.includes('location') ||
    q.includes('available') ||
    q.includes('availability') ||
    q.includes('pune') ||
    q.includes('bangalore') ||
    q.includes('remote')
  ) {
    return 'I’m based in Pune, India, and available immediately for Frontend or Full-Stack roles in Pune, Bangalore, or Remote. You can reach me at guruvishnu1927@gmail.com or +91-9686715615.';
  }

  // ----------------------------------------------------
  // 9. WHY HIRE / STRENGTHS
  // ----------------------------------------------------
  if (
    q.includes('why hire') ||
    q.includes('why should') ||
    q.includes('strength') ||
    q.includes('strengths') ||
    q.includes('advantage')
  ) {
    return 'I bring production experience at CandorWorks optimizing React applications (cutting API calls by 60%), strong full-stack foundations with Java/Spring Boot, clean component design skills, and immediate availability.';
  }

  // ----------------------------------------------------
  // 10. SMALL TALK & FAREWELLS
  // ----------------------------------------------------
  if (
    q.includes('how are you') ||
    q.includes('how are u') ||
    q.includes("how's it going") ||
    q.includes("what's up")
  ) {
    return "I'm doing great, thank you!";
  }

  if (
    q.includes('thank') ||
    q === 'thanks' ||
    q === 'thx' ||
    q === 'awesome' ||
    q === 'cool'
  ) {
    return "You're very welcome!";
  }

  if (q === 'bye' || q === 'goodbye' || q.includes('take care')) {
    return 'Goodbye! Have a great day!';
  }

  // Helpful conversational fallback
  return "I'm happy to tell you more about Guruvishnu's experience at CandorWorks, React & TypeScript skills, projects, or education. What would you like to know?";
}
