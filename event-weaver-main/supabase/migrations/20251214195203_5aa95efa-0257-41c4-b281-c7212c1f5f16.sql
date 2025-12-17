-- Create email_templates table for storing template configurations
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  html_template TEXT NOT NULL,
  thumbnail_url TEXT,
  is_system BOOLEAN NOT NULL DEFAULT false,
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create template_presets table for saved style configurations
CREATE TABLE public.template_presets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  is_default BOOLEAN NOT NULL DEFAULT false,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create big_event_content table for AI-enriched content
CREATE TABLE public.big_event_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_uuid UUID REFERENCES public.events(event_uuid),
  event_id TEXT,
  headline TEXT,
  subheadline TEXT,
  ai_description TEXT,
  custom_description TEXT,
  fun_facts JSONB DEFAULT '[]'::jsonb,
  promotional_hooks JSONB DEFAULT '[]'::jsonb,
  is_edited BOOLEAN NOT NULL DEFAULT false,
  last_ai_updated TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.big_event_content ENABLE ROW LEVEL SECURITY;

-- RLS policies for email_templates (public read for system templates, user-specific for custom)
CREATE POLICY "Anyone can view system templates"
ON public.email_templates
FOR SELECT
USING (is_system = true);

CREATE POLICY "Users can view their own templates"
ON public.email_templates
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own templates"
ON public.email_templates
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own templates"
ON public.email_templates
FOR UPDATE
USING (auth.uid() = user_id OR is_system = false);

CREATE POLICY "Users can delete their own templates"
ON public.email_templates
FOR DELETE
USING (auth.uid() = user_id AND is_system = false);

-- RLS policies for template_presets
CREATE POLICY "Anyone can view default presets"
ON public.template_presets
FOR SELECT
USING (is_default = true);

CREATE POLICY "Users can view their own presets"
ON public.template_presets
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own presets"
ON public.template_presets
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own presets"
ON public.template_presets
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own presets"
ON public.template_presets
FOR DELETE
USING (auth.uid() = user_id AND is_default = false);

-- RLS policies for big_event_content (public read)
CREATE POLICY "Anyone can view big event content"
ON public.big_event_content
FOR SELECT
USING (true);

CREATE POLICY "Anyone can create big event content"
ON public.big_event_content
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update big event content"
ON public.big_event_content
FOR UPDATE
USING (true);

-- Create updated_at triggers
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_events_updated_at();

CREATE TRIGGER update_template_presets_updated_at
BEFORE UPDATE ON public.template_presets
FOR EACH ROW
EXECUTE FUNCTION public.update_events_updated_at();

CREATE TRIGGER update_big_event_content_updated_at
BEFORE UPDATE ON public.big_event_content
FOR EACH ROW
EXECUTE FUNCTION public.update_events_updated_at();

-- Create indexes for performance
CREATE INDEX idx_email_templates_category ON public.email_templates(category);
CREATE INDEX idx_email_templates_is_favorite ON public.email_templates(is_favorite);
CREATE INDEX idx_email_templates_is_system ON public.email_templates(is_system);
CREATE INDEX idx_big_event_content_event_uuid ON public.big_event_content(event_uuid);