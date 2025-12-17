import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileJson, Check, X, AlertCircle, Download, Code, FileText, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTemplates } from '@/hooks/useTemplates';
import { TemplateImport as TemplateImportType, TemplateImportBatch, TEMPLATE_CATEGORIES, defaultTemplateConfig, TemplateCategory, LayoutType } from '@/types/template';
import { parseHtmlTemplate, detectImportFormat, ParsedTemplate } from '@/lib/generatePreviewHtml';
import { GroupLayoutPreview } from '@/components/templates/previews/GroupLayoutPreview';
import { IndividualLayoutPreview } from '@/components/templates/previews/IndividualLayoutPreview';
import { AddOnLayoutPreview } from '@/components/templates/previews/AddOnLayoutPreview';

interface TemplateImportProps {
  onImportComplete?: () => void;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  template?: TemplateImportType;
}

// Parsed template for display with editable fields
interface ImportableTemplate extends ParsedTemplate {
  id: string;
  isSelected: boolean;
  validationErrors: string[];
  validationWarnings: string[];
}

function validateTemplate(template: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!template.name || typeof template.name !== 'string') {
    errors.push('Missing or invalid "name" field');
  }
  
  if (!template.category) {
    errors.push('Missing "category" field');
  } else if (!TEMPLATE_CATEGORIES.find(c => c.value === template.category)) {
    errors.push(`Invalid category "${template.category}". Valid categories: ${TEMPLATE_CATEGORIES.map(c => c.value).join(', ')}`);
  }
  
  if (!template.html_template || typeof template.html_template !== 'string') {
    errors.push('Missing or invalid "html_template" field');
  }
  
  if (!template.config || typeof template.config !== 'object') {
    errors.push('Missing or invalid "config" object');
  } else {
    // Validate config fields
    if (!template.config.backgroundColor) warnings.push('Missing backgroundColor in config');
    if (!template.config.textColor) warnings.push('Missing textColor in config');
    if (!template.config.fontHeading) warnings.push('Missing fontHeading in config');
    if (!template.config.fontBody) warnings.push('Missing fontBody in config');
  }

  // Optional field validations
  if (template.style_tags && !Array.isArray(template.style_tags)) {
    warnings.push('style_tags should be an array');
  }
  
  if (template.theme_mode && !['light', 'dark', 'auto'].includes(template.theme_mode)) {
    warnings.push('theme_mode should be "light", "dark", or "auto"');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    template: errors.length === 0 ? template : undefined,
  };
}

function parseJsonImportData(data: string): { templates: any[]; error?: string } {
  try {
    const parsed = JSON.parse(data);
    
    // Check if it's a batch import
    if (parsed.templates && Array.isArray(parsed.templates)) {
      return { templates: parsed.templates };
    }
    
    // Check if it's an array of templates
    if (Array.isArray(parsed)) {
      return { templates: parsed };
    }
    
    // Single template
    return { templates: [parsed] };
  } catch (e) {
    return { templates: [], error: 'Invalid JSON format' };
  }
}

// Convert JSON template to ImportableTemplate
function jsonToImportable(template: any, index: number): ImportableTemplate {
  const validation = validateTemplate(template);
  return {
    id: `json-${index}-${Date.now()}`,
    name: template.name || `Template ${index + 1}`,
    category: template.category || 'general',
    layout_type: template.layout_type || 'individual',
    config: { ...defaultTemplateConfig, ...template.config },
    html_template: template.html_template || '',
    description: template.description,
    isSelected: validation.valid,
    validationErrors: validation.errors,
    validationWarnings: validation.warnings,
  };
}

// Convert ParsedTemplate to ImportableTemplate
function parsedToImportable(parsed: ParsedTemplate, index: number): ImportableTemplate {
  return {
    ...parsed,
    id: `html-${index}-${Date.now()}`,
    isSelected: true,
    validationErrors: [],
    validationWarnings: [],
  };
}

export function TemplateImportDialog({ onImportComplete }: TemplateImportProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [detectedFormat, setDetectedFormat] = useState<'html' | 'json' | 'unknown' | null>(null);
  const [importableTemplates, setImportableTemplates] = useState<ImportableTemplate[]>([]);
  const [importing, setImporting] = useState(false);
  const { createTemplate } = useTemplates();
  const { toast } = useToast();

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputValue(content);
      processInput(content);
    };
    reader.readAsText(file);
  }, []);

  const processInput = useCallback((input: string) => {
    if (!input.trim()) {
      setDetectedFormat(null);
      setImportableTemplates([]);
      return;
    }

    const format = detectImportFormat(input);
    setDetectedFormat(format);

    if (format === 'json') {
      const { templates, error } = parseJsonImportData(input);
      if (error) {
        setImportableTemplates([{
          id: 'error',
          name: 'Parse Error',
          category: 'general',
          layout_type: 'individual',
          config: defaultTemplateConfig,
          html_template: '',
          isSelected: false,
          validationErrors: [error],
          validationWarnings: [],
        }]);
        return;
      }
      setImportableTemplates(templates.map((t, i) => jsonToImportable(t, i)));
    } else if (format === 'html') {
      const parsed = parseHtmlTemplate(input);
      setImportableTemplates(parsed.map((p, i) => parsedToImportable(p, i)));
    } else {
      setImportableTemplates([{
        id: 'error',
        name: 'Unknown Format',
        category: 'general',
        layout_type: 'individual',
        config: defaultTemplateConfig,
        html_template: '',
        isSelected: false,
        validationErrors: ['Could not detect format. Please paste valid HTML or JSON.'],
        validationWarnings: [],
      }]);
    }
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setImportableTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, isSelected: !t.isSelected } : t
    ));
  }, []);

  const toggleSelectAll = useCallback((selected: boolean) => {
    setImportableTemplates(prev => prev.map(t => ({
      ...t,
      isSelected: t.validationErrors.length === 0 ? selected : false
    })));
  }, []);

  const updateTemplateName = useCallback((id: string, name: string) => {
    setImportableTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, name } : t
    ));
  }, []);

  const updateTemplateCategory = useCallback((id: string, category: TemplateCategory) => {
    setImportableTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, category } : t
    ));
  }, []);

  const handleImport = useCallback(async () => {
    const selectedTemplates = importableTemplates.filter(t => t.isSelected && t.validationErrors.length === 0);

    if (selectedTemplates.length === 0) {
      toast({
        title: 'No templates selected',
        description: 'Please select at least one template to import',
        variant: 'destructive',
      });
      return;
    }

    setImporting(true);
    let successCount = 0;
    let errorCount = 0;

    for (const template of selectedTemplates) {
      try {
        await createTemplate({
          name: template.name,
          category: template.category,
          description: template.description,
          html_template: template.html_template,
          is_system: false,
          is_favorite: false,
          config: template.config,
          layout_type: template.layout_type,
        });
        successCount++;
      } catch (error) {
        errorCount++;
        console.error('Failed to import template:', template.name, error);
      }
    }

    setImporting(false);
    
    if (successCount > 0) {
      toast({
        title: 'Import complete',
        description: `Successfully imported ${successCount} template${successCount > 1 ? 's' : ''}${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
      });
      setOpen(false);
      setInputValue('');
      setImportableTemplates([]);
      setDetectedFormat(null);
      onImportComplete?.();
    } else {
      toast({
        title: 'Import failed',
        description: 'No templates were imported',
        variant: 'destructive',
      });
    }
  }, [importableTemplates, createTemplate, toast, onImportComplete]);

  const downloadSchema = useCallback(() => {
    // Import the comprehensive schema dynamically to avoid circular deps
    import('@/lib/templateImportSchema').then(({ TEMPLATE_IMPORT_SCHEMA }) => {
      const blob = new Blob([JSON.stringify(TEMPLATE_IMPORT_SCHEMA, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "template-import-schema.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  }, []);

  const selectedCount = importableTemplates.filter(t => t.isSelected).length;
  const validCount = importableTemplates.filter(t => t.validationErrors.length === 0).length;
  const totalCount = importableTemplates.length;

  const renderPreview = (template: ImportableTemplate) => {
    if (template.layout_type === 'group') {
      return (
        <GroupLayoutPreview 
          config={template.config} 
          className="w-full h-full"
          name={template.name}
          description={template.description}
          htmlTemplate={template.html_template}
        />
      );
    } else if (template.layout_type === 'add-on') {
      return (
        <AddOnLayoutPreview 
          config={template.config} 
          className="w-full h-full" 
          name={template.name}
          description={template.description}
          htmlTemplate={template.html_template}
        />
      );
    }
    return (
      <IndividualLayoutPreview 
        config={template.config} 
        className="w-full h-full"
        name={template.name}
        description={template.description}
        htmlTemplate={template.html_template}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Import Templates
            {detectedFormat && (
              <Badge variant="outline" className="ml-2 gap-1">
                {detectedFormat === 'html' ? <Code className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                Detected: {detectedFormat.toUpperCase()}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>Upload file (JSON or HTML)</Label>
            <Input
              type="file"
              accept=".json,.html,.htm,.txt"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>

          {/* Or paste content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Or paste HTML/JSON</Label>
              <Button variant="ghost" size="sm" onClick={downloadSchema} className="gap-1 text-xs">
                <Download className="h-3 w-3" />
                Download Schema
              </Button>
            </div>
            <Textarea
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                processInput(e.target.value);
              }}
              placeholder='Paste HTML template code or JSON {"templates": [...]}'
              className="font-mono text-xs min-h-[100px]"
            />
          </div>

          {/* Template Results with Previews */}
          {importableTemplates.length > 0 && (
            <div className="space-y-3">
              {/* Header with counts and select all */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {totalCount} template{totalCount !== 1 ? 's' : ''} found
                  </span>
                  {validCount > 0 && (
                    <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-500">
                      <Check className="h-3 w-3" />
                      {validCount} valid
                    </Badge>
                  )}
                  {totalCount - validCount > 0 && (
                    <Badge variant="secondary" className="gap-1 bg-destructive/10 text-destructive">
                      <X className="h-3 w-3" />
                      {totalCount - validCount} invalid
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="select-all"
                    checked={selectedCount === validCount && validCount > 0}
                    onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                  />
                  <Label htmlFor="select-all" className="text-sm cursor-pointer">Select All</Label>
                </div>
              </div>

              {/* Template Cards with Previews */}
              <ScrollArea className="h-[350px] border rounded-lg">
                <div className="p-3 space-y-3">
                  {importableTemplates.map((template) => (
                    <div 
                      key={template.id} 
                      className={`flex gap-4 p-3 border rounded-lg transition-colors ${
                        template.isSelected ? 'border-primary bg-primary/5' : 'border-border'
                      } ${template.validationErrors.length > 0 ? 'opacity-60' : ''}`}
                    >
                      {/* Checkbox */}
                      <div className="pt-1">
                        <Checkbox 
                          checked={template.isSelected}
                          disabled={template.validationErrors.length > 0}
                          onCheckedChange={() => toggleSelect(template.id)}
                        />
                      </div>

                      {/* Preview */}
                      <div className="w-40 h-28 rounded overflow-hidden border bg-muted/30 flex-shrink-0">
                        <div className="w-full h-full transform scale-[0.25] origin-top-left" style={{ width: '400%', height: '400%' }}>
                          {renderPreview(template)}
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 space-y-2">
                            {/* Name Input */}
                            <Input
                              value={template.name}
                              onChange={(e) => updateTemplateName(template.id, e.target.value)}
                              placeholder="Template name"
                              className="h-8 text-sm font-medium"
                            />
                            
                            {/* Category and Layout Type */}
                            <div className="flex items-center gap-2">
                              <Select 
                                value={template.category} 
                                onValueChange={(v) => updateTemplateCategory(template.id, v as TemplateCategory)}
                              >
                                <SelectTrigger className="h-7 w-32 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {TEMPLATE_CATEGORIES.map(cat => (
                                    <SelectItem key={cat.value} value={cat.value}>
                                      {cat.icon} {cat.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <Badge variant="outline" className="text-xs">
                                {template.layout_type.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Validation Errors */}
                        {template.validationErrors.length > 0 && (
                          <div className="text-xs text-destructive space-y-1">
                            {template.validationErrors.map((err, i) => (
                              <div key={i} className="flex items-start gap-1">
                                <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
                                {err}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Validation Warnings */}
                        {template.validationWarnings.length > 0 && (
                          <div className="text-xs text-yellow-500 space-y-1">
                            {template.validationWarnings.map((warn, i) => (
                              <div key={i} className="flex items-start gap-1">
                                <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
                                {warn}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Config Preview */}
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            <div 
                              className="w-2 h-2 rounded-full mr-1" 
                              style={{ backgroundColor: template.config.backgroundColor }}
                            />
                            BG
                          </Badge>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            <div 
                              className="w-2 h-2 rounded-full mr-1" 
                              style={{ backgroundColor: template.config.accentColor }}
                            />
                            Accent
                          </Badge>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {template.config.fontHeading}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedCount > 0 ? `${selectedCount} template${selectedCount !== 1 ? 's' : ''} selected` : 'No templates selected'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={selectedCount === 0 || importing}
              className="gap-2"
            >
              {importing ? (
                <>Importing...</>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Import {selectedCount} Template{selectedCount !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}