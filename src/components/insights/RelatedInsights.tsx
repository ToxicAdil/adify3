import React from 'react';
import { Insight } from '../../services/insightService';
import { InsightCard } from './InsightCard';

interface RelatedInsightsProps {
  insights: Insight[];
}

export function RelatedInsights({ insights }: RelatedInsightsProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <section className="py-16 border-t border-slate-200 mt-16">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
