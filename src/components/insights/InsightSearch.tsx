import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

interface InsightSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function InsightSearch({ searchQuery, setSearchQuery }: InsightSearchProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md mx-auto mb-10"
    >
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#3A0F63] transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3A0F63]/20 focus:border-[#3A0F63]/50 transition-all shadow-sm"
          placeholder="Search insights, strategies, and guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </motion.div>
  );
}
