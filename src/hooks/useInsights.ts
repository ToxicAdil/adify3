import { useState, useEffect } from 'react';
import { insightService, Insight, InsightCategory } from '../services/insightService';

export function useInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [categories, setCategories] = useState<InsightCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await insightService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const data = await insightService.getPublishedInsights(
          activeCategory || undefined,
          searchQuery || undefined
        );
        setInsights(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch insights:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small debounce for search
    const timer = setTimeout(() => {
      fetchInsights();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  return {
    insights,
    categories,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  };
}

export function useInsightDetail(slug: string) {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [related, setRelated] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await insightService.getInsightBySlug(slug);
        setInsight(data);
        
        if (data.category_id) {
          const relatedData = await insightService.getRelatedInsights(data.category_id, slug);
          setRelated(relatedData);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch insight details:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  return { insight, related, loading, error };
}
