import React, { createContext, useContext, useState } from 'react';

interface LiveResumeContextType {
  isOpen: boolean;
  openLiveResume: (sectionId?: string) => void;
  closeLiveResume: () => void;
  targetSection: string | null;
}

const LiveResumeContext = createContext<LiveResumeContextType | undefined>(undefined);

export const LiveResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  const openLiveResume = (sectionId?: string) => {
    if (sectionId) setTargetSection(sectionId);
    setIsOpen(true);
  };

  const closeLiveResume = () => {
    setIsOpen(false);
    setTargetSection(null);
  };

  return (
    <LiveResumeContext.Provider value={{ isOpen, openLiveResume, closeLiveResume, targetSection }}>
      {children}
    </LiveResumeContext.Provider>
  );
};

export const useLiveResume = () => {
  const context = useContext(LiveResumeContext);
  if (!context) {
    throw new Error('useLiveResume must be used within a LiveResumeProvider');
  }
  return context;
};
