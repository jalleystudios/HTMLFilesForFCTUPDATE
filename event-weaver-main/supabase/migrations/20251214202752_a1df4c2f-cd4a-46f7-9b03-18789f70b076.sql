-- Add new columns to email_templates for expanded functionality
ALTER TABLE public.email_templates 
ADD COLUMN IF NOT EXISTS style_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS theme_mode text DEFAULT 'dark',
ADD COLUMN IF NOT EXISTS output_formats jsonb DEFAULT '{"email": true, "website_card": false, "quick_share": false}'::jsonb,
ADD COLUMN IF NOT EXISTS quick_share_template text,
ADD COLUMN IF NOT EXISTS last_used_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS add_on_type text,
ADD COLUMN IF NOT EXISTS parent_event_id text;

-- Create index for style_tags for faster filtering
CREATE INDEX IF NOT EXISTS idx_email_templates_style_tags ON public.email_templates USING GIN (style_tags);

-- Create index for last_used_at for recently used sorting
CREATE INDEX IF NOT EXISTS idx_email_templates_last_used ON public.email_templates (last_used_at DESC NULLS LAST);

-- Create template_usage table to track usage stats
CREATE TABLE IF NOT EXISTS public.template_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES public.email_templates(id) ON DELETE CASCADE,
  user_id uuid,
  used_at timestamp with time zone DEFAULT now(),
  output_format text DEFAULT 'email',
  event_id text
);

-- Enable RLS on template_usage
ALTER TABLE public.template_usage ENABLE ROW LEVEL SECURITY;

-- RLS policies for template_usage
CREATE POLICY "Users can view their own usage" ON public.template_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage" ON public.template_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete their own usage" ON public.template_usage
  FOR DELETE USING (auth.uid() = user_id);