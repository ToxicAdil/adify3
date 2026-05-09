import React from 'react';
import { motion } from 'motion/react';
import { InsightCategory } from '../../services/insightService';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: InsightCategory[];
  activeCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-8">
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => onSelectCategory(null)}
        className={cn(
          "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
          activeCategory === null
            ? "bg-[#3A0F63] text-white shadow-md scale-105"
            : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        )}
      >
        All Insights
      </motion.button>

      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: (index + 1) * 0.05 }}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
            activeCategory === category.id
              ? "bg-[#3A0F63] text-white shadow-md scale-105"
              : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          )}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
}
