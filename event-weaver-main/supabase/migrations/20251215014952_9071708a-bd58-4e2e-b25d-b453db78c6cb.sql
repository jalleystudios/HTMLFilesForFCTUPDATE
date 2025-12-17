-- Drop the existing INSERT policy and create a more permissive one for anonymous imports
DROP POLICY IF EXISTS "Users can create their own templates" ON public.email_templates;

-- Allow authenticated users to insert with their user_id, OR allow anyone to insert with null user_id
CREATE POLICY "Users can create their own templates" 
ON public.email_templates 
FOR INSERT 
WITH CHECK (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) 
  OR (user_id IS NULL)
);