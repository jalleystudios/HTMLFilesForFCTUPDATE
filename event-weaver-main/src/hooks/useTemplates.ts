import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EmailTemplate, TemplateConfig, defaultTemplateConfig, TemplateCategory, OutputFormats, AddOnType, LayoutType } from '@/types/template';
import { useToast } from '@/hooks/use-toast';

// Helper to determine layout_type from category/add_on_type
function inferLayoutType(category: string, addOnType?: string): LayoutType {
  if (addOnType || ['parking', 'wristbands', 'upgrades', 'hospitality'].includes(category)) {
    return 'add-on';
  }
  return 'individual'; // Default to individual
}

// Convert database row to EmailTemplate type
function rowToTemplate(row: any): EmailTemplate {
  return {
    id: row.id,
    name: row.name,
    category: row.category as TemplateCategory,
    layout_type: (row.layout_type as LayoutType) || inferLayoutType(row.category, row.add_on_type),
    description: row.description,
    html_template: row.html_template,
    thumbnail_url: row.thumbnail_url,
    is_system: row.is_system,
    is_favorite: row.is_favorite,
    config: (row.config as TemplateConfig) || defaultTemplateConfig,
    user_id: row.user_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    // Extended fields
    style_tags: row.style_tags || [],
    theme_mode: row.theme_mode || 'dark',
    output_formats: row.output_formats as OutputFormats,
    quick_share_template: row.quick_share_template,
    last_used_at: row.last_used_at,
    add_on_type: row.add_on_type as AddOnType,
    parent_event_id: row.parent_event_id,
  };
}

export function useTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTemplates = useCallback(async (category?: TemplateCategory) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      setTemplates((data || []).map(rowToTemplate));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch templates';
      setError(message);
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createTemplate = useCallback(async (template: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const { data, error: insertError } = await supabase
        .from('email_templates')
        .insert({
          name: template.name,
          category: template.category,
          layout_type: template.layout_type || 'individual',
          description: template.description,
          html_template: template.html_template,
          thumbnail_url: template.thumbnail_url,
          is_system: template.is_system,
          is_favorite: template.is_favorite,
          config: template.config as any,
          user_id: template.user_id,
          // Extended fields
          style_tags: template.style_tags || [],
          theme_mode: template.theme_mode || 'dark',
          output_formats: template.output_formats as any,
          quick_share_template: template.quick_share_template,
          add_on_type: template.add_on_type,
          parent_event_id: template.parent_event_id,
        })
        .select()
        .single();
      
      if (insertError) throw insertError;
      
      const newTemplate = rowToTemplate(data);
      setTemplates(prev => [newTemplate, ...prev]);
      toast({ title: 'Success', description: 'Template created successfully' });
      return newTemplate;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create template';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateTemplate = useCallback(async (id: string, updates: Partial<EmailTemplate>) => {
    setLoading(true);
    try {
      const { data, error: updateError } = await supabase
        .from('email_templates')
        .update({
          name: updates.name,
          category: updates.category,
          description: updates.description,
          html_template: updates.html_template,
          thumbnail_url: updates.thumbnail_url,
          is_favorite: updates.is_favorite,
          config: updates.config as any,
          // Extended fields
          style_tags: updates.style_tags,
          theme_mode: updates.theme_mode,
          output_formats: updates.output_formats as any,
          quick_share_template: updates.quick_share_template,
          add_on_type: updates.add_on_type,
          parent_event_id: updates.parent_event_id,
        })
        .eq('id', id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      
      const updatedTemplate = rowToTemplate(data);
      setTemplates(prev => prev.map(t => t.id === id ? updatedTemplate : t));
      toast({ title: 'Success', description: 'Template updated successfully' });
      return updatedTemplate;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update template';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const deleteTemplate = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw deleteError;
      
      setTemplates(prev => prev.filter(t => t.id !== id));
      toast({ title: 'Success', description: 'Template deleted successfully' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete template';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const toggleFavorite = useCallback(async (id: string) => {
    const template = templates.find(t => t.id === id);
    if (!template) return;
    
    await updateTemplate(id, { is_favorite: !template.is_favorite });
  }, [templates, updateTemplate]);

  const duplicateTemplate = useCallback(async (id: string) => {
    const template = templates.find(t => t.id === id);
    if (!template) return;
    
    return createTemplate({
      ...template,
      name: `${template.name} (Copy)`,
      is_system: false,
      is_favorite: false,
      user_id: undefined,
    });
  }, [templates, createTemplate]);

  const trackTemplateUsage = useCallback(async (templateId: string, outputFormat: string = 'email', eventId?: string) => {
    try {
      // Update last_used_at on the template
      await supabase
        .from('email_templates')
        .update({ last_used_at: new Date().toISOString() })
        .eq('id', templateId);

      // Record usage in template_usage table
      await supabase
        .from('template_usage')
        .insert({
          template_id: templateId,
          output_format: outputFormat,
          event_id: eventId,
        });
    } catch (err) {
      console.error('Failed to track template usage:', err);
    }
  }, []);

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    toggleFavorite,
    duplicateTemplate,
    trackTemplateUsage,
  };
}
