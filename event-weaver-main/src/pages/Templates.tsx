import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TemplateGallery } from '@/components/templates/TemplateGallery';
import { TemplateEditor } from '@/components/templates/TemplateEditor';
import { EmailTemplate, defaultTemplateConfig } from '@/types/template';
import { useTemplates } from '@/hooks/useTemplates';

type View = 'gallery' | 'editor';

export default function Templates() {
  const [view, setView] = useState<View>('gallery');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const { createTemplate, updateTemplate } = useTemplates();

  const handleSelectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setView('editor');
  };

  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setView('editor');
  };

  const handleBack = () => {
    setSelectedTemplate(null);
    setView('gallery');
  };

  const handleSave = async (template: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>) => {
    if (selectedTemplate && !selectedTemplate.id.startsWith('system-')) {
      await updateTemplate(selectedTemplate.id, template);
    } else {
      await createTemplate(template);
    }
    handleBack();
  };

  return (
    <DashboardLayout>
      <div className="h-full">
        {view === 'gallery' ? (
          <div className="p-6">
            <TemplateGallery 
              onSelectTemplate={handleSelectTemplate}
              onCreateNew={handleCreateNew}
            />
          </div>
        ) : (
          <TemplateEditor
            template={selectedTemplate}
            onSave={handleSave}
            onBack={handleBack}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
