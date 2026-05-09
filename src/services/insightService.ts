import { supabase } from './supabase';

export interface InsightCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Insight {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category_id: string;
  tags: string[];
  author_name: string;
  read_time: number;
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  category?: InsightCategory;
  is_featured?: boolean;
}

export const insightService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('insight_categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data as InsightCategory[];
  },

  async getPublishedInsights(categoryId?: string, searchQuery?: string) {
    let query = supabase
      .from('insights')
      .select(`
        *,
        category:insight_categories(*)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    
    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Insight[];
  },

  async getInsightBySlug(slug: string) {
    const { data, error } = await supabase
      .from('insights')
      .select(`
        *,
        category:insight_categories(*)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data as Insight;
  },
  
  async getRelatedInsights(categoryId: string, excludeSlug: string, limit = 3) {
    const { data, error } = await supabase
      .from('insights')
      .select(`
        *,
        category:insight_categories(*)
      `)
      .eq('category_id', categoryId)
      .eq('published', true)
      .neq('slug', excludeSlug)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Insight[];
  },

  async subscribeNewsletter(email: string) {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);
    
    if (error) {
      if (error.code === '23505') {
        throw new Error('You are already subscribed!');
      }
      throw error;
    }
  }
};
