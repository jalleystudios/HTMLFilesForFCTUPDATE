-- Add layout_type column to email_templates table
ALTER TABLE public.email_templates 
ADD COLUMN IF NOT EXISTS layout_type TEXT DEFAULT 'individual';

-- Add a check constraint for valid layout types
ALTER TABLE public.email_templates 
ADD CONSTRAINT email_templates_layout_type_check 
CHECK (layout_type IN ('group', 'individual', 'add-on'));

-- Update existing templates based on their category/add_on_type
UPDATE public.email_templates 
SET layout_type = 'add-on' 
WHERE add_on_type IS NOT NULL 
   OR category IN ('parking', 'wristbands', 'upgrades', 'hospitality');

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_email_templates_layout_type ON public.email_templates(layout_type);