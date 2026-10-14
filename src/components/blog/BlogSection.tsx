import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { BookOpen, ExternalLink, Heart, Clock, Loader2 } from 'lucide-react';
import { useDevto } from '../../hooks/useDevto';
import { fadeInUp, staggerContainer } from '../../lib/motion-variants';

export const BlogSection: React.FC = () => {
  const { posts, loading } = useDevto();

  return (
    <section id="blog" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="space-y-4 max-w-2xl mb-16">
        <Badge variant="pulse">Writing & Insights</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#F5F5F7]">
          Latest Articles
        </h2>
        <p className="text-slate-600 dark:text-[#8A8A8E] text-base md:text-lg">
          My thoughts on frontend engineering, UI performance, and modern web development, synced directly from Dev.to.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-[#4F8CFF] animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-2xl glass-card border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 max-w-md mx-auto space-y-3 shadow-sm dark:shadow-none">
          <BookOpen className="w-8 h-8 text-blue-600 dark:text-[#4F8CFF] mx-auto opacity-70" />
          <p className="text-sm text-slate-600 dark:text-[#8A8A8E]">New engineering articles are currently in draft.</p>
          <a
            href="https://dev.to/guruvishnuk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-[#4F8CFF] hover:underline font-medium"
          >
            <span>Follow on Dev.to</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
                <GlassCard className="h-full flex flex-col overflow-hidden p-0 hover:border-blue-500/50 dark:hover:border-[#4F8CFF]/50 transition-colors shadow-sm dark:shadow-none">
                  {post.cover_image ? (
                    <div className="h-48 w-full overflow-hidden">
                      <img 
                        src={post.cover_image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-[#4F8CFF]/20 dark:to-[#A855F7]/20 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-slate-400 dark:text-white/20" />
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex gap-2 flex-wrap mb-3">
                      {post.tag_list.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#8A8A8E]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 dark:text-[#F5F5F7] mb-2 group-hover:text-blue-600 dark:group-hover:text-[#4F8CFF] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 dark:text-[#8A8A8E] line-clamp-3 mb-4 flex-1">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#8A8A8E] pt-4 border-t border-slate-200 dark:border-white/10 mt-auto">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {post.public_reactions_count}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.reading_time_minutes} min read</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-[#4F8CFF]" />
                    </div>
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};
