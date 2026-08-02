import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, Folder, FileCode, Layers } from 'lucide-react';

interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

const initialTree: TreeNode = {
  name: '<AppShell />',
  type: 'folder',
  children: [
    {
      name: '<PageHeader />',
      type: 'folder',
      children: [
        { name: '<NavbarPill />', type: 'file' },
        { name: '<LogoMorph />', type: 'file' },
      ],
    },
    {
      name: '<HeroSection />',
      type: 'folder',
      children: [
        { name: '<RotatingRoles />', type: 'file' },
        { name: '<Hero3DCanvas />', type: 'file' },
      ],
    },
    {
      name: '<PerformanceDashboard />',
      type: 'folder',
      children: [{ name: '<AnimatedCounter />', type: 'file' }],
    },
  ],
};

const TreeItem: React.FC<{ node: TreeNode; accentColor: string }> = ({ node, accentColor }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder' && node.children && node.children.length > 0;

  return (
    <div className="pl-4 border-l border-white/10 font-mono text-xs my-1 select-none">
      <div
        onClick={() => isFolder && setIsOpen(!isOpen)}
        className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-white/5 cursor-pointer ${
          isFolder ? 'text-[#F5F5F7]' : 'text-[#8A8A8E]'
        }`}
        data-cursor="hover"
      >
        {isFolder ? (
          isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-[#8A8A8E]" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-[#8A8A8E]" />
          )
        ) : (
          <FileCode className="w-3.5 h-3.5" style={{ color: accentColor }} />
        )}
        {isFolder && <Folder className="w-3.5 h-3.5 text-amber-400" />}
        <span style={{ color: !isFolder ? '#8A8A8E' : undefined }}>{node.name}</span>
      </div>

      <AnimatePresence>
        {isFolder && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {node.children?.map((child, idx) => (
              <TreeItem key={idx} node={child} accentColor={accentColor} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ComponentTreeViz: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  return (
    <div className="p-4 rounded-xl bg-black/50 border border-white/10 overflow-hidden space-y-2">
      <div className="flex items-center gap-2 text-xs font-mono text-[#8A8A8E] pb-2 border-b border-white/10">
        <Layers className="w-4 h-4 text-[#4F8CFF]" />
        <span>Component Tree Visualizer</span>
      </div>
      <TreeItem node={initialTree} accentColor={accentColor} />
    </div>
  );
};
