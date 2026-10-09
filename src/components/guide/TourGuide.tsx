import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';

export const TourGuide: React.FC = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('guruvishnu-portfolio-tour');
    if (!hasSeenTour) {
      // Delay so initial animations can finish
      const timer = setTimeout(() => setRun(true), 1500);
      return () => clearTimeout(timer);
    }
    
    const handleOpen = () => setRun(true);
    window.addEventListener('open-tour-guide', handleOpen);
    return () => window.removeEventListener('open-tour-guide', handleOpen);
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem('guruvishnu-portfolio-tour', 'true');
    }
  };

  const steps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      title: 'Welcome to my Portfolio! 👋',
      content: 'Let me give you a quick 5-step tour of the existing features on this page so you know exactly where to look.',
      disableBeacon: true,
    },
    {
      target: '#hero',
      title: 'The Command Center',
      content: 'Here you can view my Live Resume or download the PDF. The Live Resume loads my data dynamically right into the UI.',
      disableBeacon: true,
    },
    {
      target: '#terminal-boot',
      title: 'Interactive Terminal',
      content: 'Watch my virtual environment boot up. This highlights the core technologies I use every day to build scalable applications.',
    },
    {
      target: '#roadmap',
      title: 'Career Roadmap',
      content: 'Trace my professional journey. Click the nodes to see the impact metrics and tech stacks for each role I have held.',
    },
    {
      target: '#projects',
      title: 'Production Ships',
      content: 'Deep dives into my featured projects, showcasing architecture, challenges solved, and tangible business impact.',
    },
    {
      target: '#ai-chat-widget',
      title: 'AI Assistant',
      content: 'Have questions? Talk to my AI assistant anytime. It is trained on my experience and can answer questions about my skills and availability!',
      placement: 'top-end',
    }
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#4F8CFF',
          backgroundColor: '#1C1C1E',
          textColor: '#F5F5F7',
          arrowColor: '#1C1C1E',
          overlayColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1000,
        },
        buttonClose: {
          display: 'none',
        },
        tooltip: {
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontFamily: 'inherit',
          padding: '24px',
        },
        tooltipTitle: {
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '8px',
          color: '#F5F5F7',
        },
        tooltipContent: {
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#8A8A8E',
        },
        buttonNext: {
          backgroundColor: '#F5F5F7',
          color: '#000',
          borderRadius: '8px',
          padding: '10px 16px',
          fontWeight: 600,
          fontSize: '14px',
        },
        buttonBack: {
          color: '#8A8A8E',
          marginRight: '10px',
          fontWeight: 500,
        },
        buttonSkip: {
          color: '#8A8A8E',
          fontWeight: 500,
        }
      }}
    />
  );
};
