import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, Save, Copy, Download, Monitor, Tablet, Smartphone, 
  Type, Palette, Layout, Eye, AlertTriangle, Check
} from 'lucide-react';
import { EmailTemplate, TemplateConfig, defaultTemplateConfig, GOOGLE_FONTS, TEMPLATE_CATEGORIES, ViewportSize } from '@/types/template';
import { isReadable, getContrastColor } from '@/lib/colorUtils';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TemplateEditorProps {
  template: EmailTemplate | null;
  onSave: (template: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onBack: () => void;
}

export function TemplateEditor({ template, onSave, onBack }: TemplateEditorProps) {
  const [name, setName] = useState(template?.name || 'New Template');
  const [category, setCategory] = useState(template?.category || 'general');
  const [description, setDescription] = useState(template?.description || '');
  const [config, setConfig] = useState<TemplateConfig>(template?.config || defaultTemplateConfig);
  const [htmlTemplate, setHtmlTemplate] = useState(template?.html_template || '');
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const updateConfig = useCallback((updates: Partial<TemplateConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const contrastWarning = !isReadable(config.textColor, config.backgroundColor);
  const ctaContrastWarning = !isReadable(config.ctaTextColor, config.ctaBackgroundColor);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        name,
        category,
        description,
        html_template: htmlTemplate || template?.html_template || '',
        config,
        is_system: false,
        is_favorite: template?.is_favorite || false,
      });
      toast({ title: 'Template saved successfully' });
    } catch (error) {
      toast({ title: 'Failed to save template', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const copyHtml = () => {
    // Generate final HTML with config values
    let html = htmlTemplate || template?.html_template || '';
    Object.entries(config).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    });
    navigator.clipboard.writeText(html);
    toast({ title: 'HTML copied to clipboard' });
  };

  const viewportWidths: Record<ViewportSize, number> = {
    mobile: 375,
    tablet: 768,
    desktop: 600,
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none h-auto p-0 focus-visible:ring-0"
              placeholder="Template name"
            />
            <div className="flex items-center gap-2 mt-1">
              <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                <SelectTrigger className="h-7 text-xs w-auto border-none bg-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyHtml}>
            <Copy className="h-4 w-4 mr-2" />
            Copy HTML
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Controls Panel */}
        <div className="w-80 border-r border-border bg-card overflow-hidden flex flex-col">
          <Tabs defaultValue="typography" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-4 m-2 h-10">
              <TabsTrigger value="typography" className="text-xs">
                <Type className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="colors" className="text-xs">
                <Palette className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="layout" className="text-xs">
                <Layout className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="visibility" className="text-xs">
                <Eye className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {/* Typography Tab */}
                <TabsContent value="typography" className="mt-0 space-y-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Heading Font</Label>
                    <Select value={config.fontHeading} onValueChange={(v) => updateConfig({ fontHeading: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {GOOGLE_FONTS.map((font) => (
                          <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Body Font</Label>
                    <Select value={config.fontBody} onValueChange={(v) => updateConfig({ fontBody: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {GOOGLE_FONTS.map((font) => (
                          <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Title Size: {config.fontSizeTitle}px</Label>
                    <Slider
                      value={[config.fontSizeTitle]}
                      onValueChange={([v]) => updateConfig({ fontSizeTitle: v })}
                      min={16}
                      max={72}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Subtitle Size: {config.fontSizeSubtitle}px</Label>
                    <Slider
                      value={[config.fontSizeSubtitle]}
                      onValueChange={([v]) => updateConfig({ fontSizeSubtitle: v })}
                      min={12}
                      max={48}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Body Size: {config.fontSizeBody}px</Label>
                    <Slider
                      value={[config.fontSizeBody]}
                      onValueChange={([v]) => updateConfig({ fontSizeBody: v })}
                      min={10}
                      max={24}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Letter Spacing: {config.letterSpacing}px</Label>
                    <Slider
                      value={[config.letterSpacing]}
                      onValueChange={([v]) => updateConfig({ letterSpacing: v })}
                      min={-2}
                      max={10}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Line Height: {config.lineHeight}</Label>
                    <Slider
                      value={[config.lineHeight]}
                      onValueChange={([v]) => updateConfig({ lineHeight: v })}
                      min={1}
                      max={2.5}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                </TabsContent>

                {/* Colors Tab */}
                <TabsContent value="colors" className="mt-0 space-y-4">
                  {contrastWarning && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <div className="text-xs">
                        <p className="font-medium text-destructive">Low contrast</p>
                        <p className="text-muted-foreground">Text may be hard to read</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="ml-auto text-xs h-7"
                        onClick={() => updateConfig({ textColor: getContrastColor(config.backgroundColor) })}
                      >
                        Fix
                      </Button>
                    </div>
                  )}

                  <div>
                    <Label className="text-xs text-muted-foreground">Background Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                        className="flex-1 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Text Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={config.textColor}
                        onChange={(e) => updateConfig({ textColor: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.textColor}
                        onChange={(e) => updateConfig({ textColor: e.target.value })}
                        className="flex-1 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Accent Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={config.accentColor}
                        onChange={(e) => updateConfig({ accentColor: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.accentColor}
                        onChange={(e) => updateConfig({ accentColor: e.target.value })}
                        className="flex-1 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <Label className="text-xs text-muted-foreground font-medium">CTA Button</Label>
                    {ctaContrastWarning && (
                      <Badge variant="destructive" className="ml-2 text-xs">Low contrast</Badge>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">CTA Background</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={config.ctaBackgroundColor}
                        onChange={(e) => updateConfig({ ctaBackgroundColor: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.ctaBackgroundColor}
                        onChange={(e) => updateConfig({ ctaBackgroundColor: e.target.value })}
                        className="flex-1 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">CTA Text</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={config.ctaTextColor}
                        onChange={(e) => updateConfig({ ctaTextColor: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.ctaTextColor}
                        onChange={(e) => updateConfig({ ctaTextColor: e.target.value })}
                        className="flex-1 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Border Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={config.borderColor}
                        onChange={(e) => updateConfig({ borderColor: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.borderColor}
                        onChange={(e) => updateConfig({ borderColor: e.target.value })}
                        className="flex-1 font-mono text-sm"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Layout Tab */}
                <TabsContent value="layout" className="mt-0 space-y-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Padding: {config.padding}px</Label>
                    <Slider
                      value={[config.padding]}
                      onValueChange={([v]) => updateConfig({ padding: v })}
                      min={0}
                      max={80}
                      step={4}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Margin: {config.margin}px</Label>
                    <Slider
                      value={[config.margin]}
                      onValueChange={([v]) => updateConfig({ margin: v })}
                      min={0}
                      max={48}
                      step={4}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Border Width: {config.borderWidth}px</Label>
                    <Slider
                      value={[config.borderWidth]}
                      onValueChange={([v]) => updateConfig({ borderWidth: v })}
                      min={0}
                      max={8}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Border Radius: {config.borderRadius}px</Label>
                    <Slider
                      value={[config.borderRadius]}
                      onValueChange={([v]) => updateConfig({ borderRadius: v })}
                      min={0}
                      max={32}
                      step={2}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Shadow Intensity: {config.shadowIntensity}</Label>
                    <Slider
                      value={[config.shadowIntensity]}
                      onValueChange={([v]) => updateConfig({ shadowIntensity: v })}
                      min={0}
                      max={40}
                      step={2}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Column Layout</Label>
                    <Select value={config.columnLayout} onValueChange={(v: any) => updateConfig({ columnLayout: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Column</SelectItem>
                        <SelectItem value="two">Two Columns</SelectItem>
                        <SelectItem value="three">Three Columns</SelectItem>
                        <SelectItem value="grid">Grid Layout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                {/* Visibility Tab */}
                <TabsContent value="visibility" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show Images</Label>
                    <Switch
                      checked={config.showImages}
                      onCheckedChange={(v) => updateConfig({ showImages: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show Times</Label>
                    <Switch
                      checked={config.showTimes}
                      onCheckedChange={(v) => updateConfig({ showTimes: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show Venue</Label>
                    <Switch
                      checked={config.showVenue}
                      onCheckedChange={(v) => updateConfig({ showVenue: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show Prices</Label>
                    <Switch
                      checked={config.showPrices}
                      onCheckedChange={(v) => updateConfig({ showPrices: v })}
                    />
                  </div>

                  {/* Dual CTA Section */}
                  <div className="border-t border-border pt-4 space-y-4">
                    <div className="text-sm font-medium text-foreground">Tickets CTA</div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Show Tickets Link</Label>
                      <Switch
                        checked={config.showTicketsCta !== false}
                        onCheckedChange={(v) => updateConfig({ showTicketsCta: v })}
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Tickets Text</Label>
                      <Input
                        value={config.ticketsCtaText || 'View Tickets'}
                        onChange={(e) => updateConfig({ ticketsCtaText: e.target.value })}
                        className="mt-1"
                        placeholder="View Tickets"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Tickets Style</Label>
                      <Select 
                        value={config.ticketsCtaStyle || 'link'} 
                        onValueChange={(v: any) => updateConfig({ ticketsCtaStyle: v })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="link">Text Link</SelectItem>
                          <SelectItem value="button">Button</SelectItem>
                          <SelectItem value="pill">Pill Badge</SelectItem>
                          <SelectItem value="underline">Underlined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Show Arrow Icon →</Label>
                      <Switch
                        checked={config.ticketsCtaIcon !== false}
                        onCheckedChange={(v) => updateConfig({ ticketsCtaIcon: v })}
                      />
                    </div>
                  </div>

                  {/* Email CTA Section */}
                  <div className="border-t border-border pt-4 space-y-4">
                    <div className="text-sm font-medium text-foreground">Email CTA</div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Show Email Link</Label>
                      <Switch
                        checked={config.showEmailCta !== false}
                        onCheckedChange={(v) => updateConfig({ showEmailCta: v })}
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Email Text</Label>
                      <Input
                        value={config.emailCtaText || 'Email'}
                        onChange={(e) => updateConfig({ emailCtaText: e.target.value })}
                        className="mt-1"
                        placeholder="Email"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Email Style</Label>
                      <Select 
                        value={config.emailCtaStyle || 'link'} 
                        onValueChange={(v: any) => updateConfig({ emailCtaStyle: v })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="link">Text Link</SelectItem>
                          <SelectItem value="button">Button</SelectItem>
                          <SelectItem value="pill">Pill Badge</SelectItem>
                          <SelectItem value="underline">Underlined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Show ✉ Icon</Label>
                      <Switch
                        checked={config.emailCtaIcon !== false}
                        onCheckedChange={(v) => updateConfig({ emailCtaIcon: v })}
                      />
                    </div>
                  </div>

                  {/* Legacy CTA Section */}
                  <div className="border-t border-border pt-4 space-y-4">
                    <div className="text-sm font-medium text-foreground">Main CTA Button</div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Show CTA Button</Label>
                      <Switch
                        checked={config.showCta}
                        onCheckedChange={(v) => updateConfig({ showCta: v })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Show Concierge Link</Label>
                      <Switch
                        checked={config.showConciergeLink}
                        onCheckedChange={(v) => updateConfig({ showConciergeLink: v })}
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">CTA Button Text</Label>
                      <Input
                        value={config.ctaText}
                        onChange={(e) => updateConfig({ ctaText: e.target.value })}
                        className="mt-1"
                        placeholder="Get Tickets"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">CTA Link</Label>
                      <Input
                        value={config.ctaLink}
                        onChange={(e) => updateConfig({ ctaLink: e.target.value })}
                        className="mt-1"
                        placeholder="mailto:concierge@firstclasstixx.com"
                      />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 flex flex-col bg-muted/30 overflow-hidden">
          {/* Viewport Controls */}
          <div className="flex items-center justify-center gap-2 p-3 border-b border-border bg-card">
            <Button
              size="sm"
              variant={viewportSize === 'mobile' ? 'default' : 'ghost'}
              onClick={() => setViewportSize('mobile')}
            >
              <Smartphone className="h-4 w-4 mr-1" />
              Mobile
            </Button>
            <Button
              size="sm"
              variant={viewportSize === 'tablet' ? 'default' : 'ghost'}
              onClick={() => setViewportSize('tablet')}
            >
              <Tablet className="h-4 w-4 mr-1" />
              Tablet
            </Button>
            <Button
              size="sm"
              variant={viewportSize === 'desktop' ? 'default' : 'ghost'}
              onClick={() => setViewportSize('desktop')}
            >
              <Monitor className="h-4 w-4 mr-1" />
              Desktop
            </Button>
          </div>

          {/* Preview */}
          <div className="flex-1 overflow-auto p-6 flex justify-center">
            <div
              className="bg-card shadow-2xl transition-all duration-300"
              style={{
                width: viewportWidths[viewportSize],
                minHeight: 400,
              }}
            >
              {/* Live Preview */}
              <div
                style={{
                  backgroundColor: config.backgroundColor,
                  padding: config.padding,
                  fontFamily: config.fontBody,
                  borderWidth: config.borderWidth,
                  borderColor: config.borderColor,
                  borderStyle: 'solid',
                  borderRadius: config.borderRadius,
                  boxShadow: config.shadowIntensity > 0 
                    ? `0 ${config.shadowIntensity}px ${config.shadowIntensity * 2}px rgba(0,0,0,0.15)`
                    : 'none',
                }}
              >
                {config.showImages && (
                  <div 
                    className="mb-4 bg-muted/20 flex items-center justify-center"
                    style={{ 
                      height: 180,
                      borderRadius: config.borderRadius / 2,
                    }}
                  >
                    <span style={{ color: config.textColor, opacity: 0.5 }}>Event Image</span>
                  </div>
                )}
                
                <h1
                  style={{
                    fontFamily: config.fontHeading,
                    fontSize: config.fontSizeTitle,
                    color: config.textColor,
                    letterSpacing: config.letterSpacing,
                    lineHeight: config.lineHeight,
                    margin: `0 0 ${config.margin / 2}px`,
                  }}
                >
                  Event Name Here
                </h1>

                {config.showTimes && (
                  <p
                    style={{
                      fontSize: config.fontSizeSubtitle,
                      color: config.accentColor,
                      margin: `0 0 ${config.margin / 2}px`,
                    }}
                  >
                    December 25, 2025 • 7:30 PM
                  </p>
                )}

                {config.showVenue && (
                  <p
                    style={{
                      fontSize: config.fontSizeBody,
                      color: config.textColor,
                      opacity: 0.8,
                      margin: `0 0 ${config.margin}px`,
                    }}
                  >
                    Crypto.com Arena, Los Angeles
                  </p>
                )}

                {config.showPrices && (
                  <p
                    style={{
                      fontSize: config.fontSizeBody,
                      color: config.accentColor,
                      fontWeight: 600,
                      margin: `0 0 ${config.margin}px`,
                    }}
                  >
                    Starting at $299
                  </p>
                )}

                {config.showCta && (
                  <a
                    href="#"
                    style={{
                      display: 'inline-block',
                      backgroundColor: config.ctaBackgroundColor,
                      color: config.ctaTextColor,
                      padding: '14px 28px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      borderRadius: config.borderRadius,
                      fontSize: config.fontSizeBody,
                    }}
                  >
                    {config.ctaText}
                  </a>
                )}

                {config.showConciergeLink && (
                  <p
                    style={{
                      fontSize: config.fontSizeBody - 2,
                      color: config.textColor,
                      opacity: 0.6,
                      marginTop: config.margin,
                    }}
                  >
                    Questions? <a href="#" style={{ color: config.accentColor }}>Contact our concierge</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
