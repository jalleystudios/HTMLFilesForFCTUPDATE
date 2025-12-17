import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Star, Copy, Trash2, Edit, Plus, Heart, Search, Grid3X3, Clock, List, Package, Ticket, Tag, SlidersHorizontal, Monitor, Smartphone, Tablet, Code } from 'lucide-react';
import { EmailTemplate, TemplateCategory, TEMPLATE_CATEGORIES, STYLE_TAGS, StyleTag, LayoutType } from '@/types/template';
import { useTemplates } from '@/hooks/useTemplates';
import { systemTemplates } from '@/lib/defaultTemplates';
import { TemplateImportDialog } from './TemplateImport';
import { GroupLayoutPreview } from './previews/GroupLayoutPreview';
import { IndividualLayoutPreview } from './previews/IndividualLayoutPreview';
import { AddOnLayoutPreview } from './previews/AddOnLayoutPreview';
import { cn } from '@/lib/utils';
import { copyPreviewHtml } from '@/lib/generatePreviewHtml';
import { toast } from 'sonner';

interface TemplateGalleryProps {
  onSelectTemplate: (template: EmailTemplate) => void;
  onCreateNew: () => void;
}

// Helper to infer layout type from template properties
function getLayoutType(template: EmailTemplate): LayoutType {
  if (template.layout_type) return template.layout_type;
  if (template.add_on_type || ['parking', 'wristbands', 'upgrades', 'hospitality'].includes(template.category)) {
    return 'add-on';
  }
  return 'individual';
}

export function TemplateGallery({ onSelectTemplate, onCreateNew }: TemplateGalleryProps) {
  const { templates, loading, fetchTemplates, toggleFavorite, duplicateTemplate, deleteTemplate } = useTemplates();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read layout from URL params
  const urlLayout = searchParams.get('layout') as LayoutType | null;
  const [activeLayoutTab, setActiveLayoutTab] = useState<LayoutType | 'all' | 'favorites' | 'recent'>(
    urlLayout || 'all'
  );
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyleTags, setSelectedStyleTags] = useState<StyleTag[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [viewportSize, setViewportSize] = useState<'desktop' | 'responsive' | 'mobile'>('responsive');
  
  // Sync URL params with tab state
  useEffect(() => {
    const layout = searchParams.get('layout') as LayoutType | null;
    if (layout && ['group', 'individual', 'add-on'].includes(layout)) {
      setActiveLayoutTab(layout);
    }
  }, [searchParams]);
  
  // Update URL when tab changes
  const handleLayoutTabChange = (value: string) => {
    const newTab = value as typeof activeLayoutTab;
    setActiveLayoutTab(newTab);
    
    // Update URL for layout types, clear for special tabs
    if (['group', 'individual', 'add-on'].includes(newTab)) {
      setSearchParams({ layout: newTab });
    } else {
      setSearchParams({});
    }
  };
  
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Combine system templates with user templates for display
  const allTemplates: EmailTemplate[] = useMemo(() => [
    ...systemTemplates.map((t, i) => ({
      ...t,
      id: `system-${i}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
    ...templates,
  ], [templates]);

  // Count templates by layout type
  const layoutCounts = useMemo(() => {
    const counts = { group: 0, individual: 0, 'add-on': 0 };
    allTemplates.forEach(t => {
      const lt = getLayoutType(t);
      counts[lt]++;
    });
    return counts;
  }, [allTemplates]);

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((t) => {
      // Layout type filter
      if (activeLayoutTab === 'favorites' && !t.is_favorite) return false;
      if (activeLayoutTab === 'recent' && !t.last_used_at) return false;
      if (activeLayoutTab !== 'all' && activeLayoutTab !== 'favorites' && activeLayoutTab !== 'recent') {
        if (getLayoutType(t) !== activeLayoutTab) return false;
      }

      // Category filter
      if (activeCategory !== 'all' && t.category !== activeCategory) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(query);
        const matchesDescription = t.description?.toLowerCase().includes(query);
        const matchesCategory = t.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDescription && !matchesCategory) return false;
      }

      // Style tags filter
      if (selectedStyleTags.length > 0) {
        const templateTags = t.style_tags || [];
        const hasMatchingTag = selectedStyleTags.some(tag => templateTags.includes(tag));
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [allTemplates, activeLayoutTab, activeCategory, searchQuery, selectedStyleTags]);

  // Sort by last_used_at for recent tab
  const sortedTemplates = useMemo(() => {
    if (activeLayoutTab === 'recent') {
      return [...filteredTemplates].sort((a, b) => {
        if (!a.last_used_at) return 1;
        if (!b.last_used_at) return -1;
        return new Date(b.last_used_at).getTime() - new Date(a.last_used_at).getTime();
      });
    }
    return filteredTemplates;
  }, [filteredTemplates, activeLayoutTab]);

  const handleDuplicate = async (template: EmailTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    if (template.id.startsWith('system-')) {
      onSelectTemplate({
        ...template,
        id: '',
        name: `${template.name} (Copy)`,
        is_system: false,
      });
    } else {
      await duplicateTemplate(template.id);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this template?')) {
      await deleteTemplate(id);
    }
  };

  const handleToggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id.startsWith('system-')) {
      await toggleFavorite(id);
    }
  };

  const handleCopyHtml = async (template: EmailTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    const layoutType = getLayoutType(template);
    const success = await copyPreviewHtml(template.config, layoutType, template.layout_style);
    if (success) {
      toast.success('HTML copied to clipboard! Paste it in CodePen.');
    } else {
      toast.error('Failed to copy HTML');
    }
  };

  const toggleStyleTag = (tag: StyleTag) => {
    setSelectedStyleTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Get categories for current layout type
  const relevantCategories = useMemo(() => {
    if (activeLayoutTab === 'add-on') {
      return TEMPLATE_CATEGORIES.filter(c => 
        ['parking', 'wristbands', 'upgrades', 'hospitality'].includes(c.value)
      );
    }
    return TEMPLATE_CATEGORIES.filter(c => 
      !['parking', 'wristbands', 'upgrades', 'hospitality'].includes(c.value)
    );
  }, [activeLayoutTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Email Templates</h2>
          <p className="text-muted-foreground mt-1">Choose by layout type: grouped events, single events, or add-ons</p>
        </div>
        <div className="flex items-center gap-2">
          <TemplateImportDialog onImportComplete={() => fetchTemplates()} />
          <Button onClick={onCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Search and View Controls - Single Line */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        
        {/* Viewport Toggle */}
        <ToggleGroup 
          type="single" 
          value={viewportSize} 
          onValueChange={(v) => v && setViewportSize(v as typeof viewportSize)}
          className="border rounded-md p-0.5"
        >
          <ToggleGroupItem value="desktop" size="sm" className="h-7 px-2 gap-1 text-xs">
            <Monitor className="h-3.5 w-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="responsive" size="sm" className="h-7 px-2 gap-1 text-xs">
            <Monitor className="h-3 w-3" />
            <Tablet className="h-2.5 w-2.5" />
            <Smartphone className="h-2.5 w-2.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="mobile" size="sm" className="h-7 px-2 text-xs">
            <Smartphone className="h-3.5 w-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* List/Grid Toggle */}
        <div className="flex items-center gap-0.5 border rounded-md p-0.5">
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setViewMode('list')}
            title="List view"
          >
            <List className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setViewMode('grid')}
            title="Grid view"
          >
            <Grid3X3 className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Filters Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {selectedStyleTags.length > 0 && (
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {selectedStyleTags.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3" align="end">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Style Tags</span>
                {selectedStyleTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStyleTags([])}
                    className="text-xs h-6 px-2"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {STYLE_TAGS.map((tag) => (
                  <label
                    key={tag.value}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <Checkbox
                      checked={selectedStyleTags.includes(tag.value)}
                      onCheckedChange={() => toggleStyleTag(tag.value)}
                    />
                    {tag.label}
                  </label>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Layout Type Tabs - PRIMARY DIMENSION */}
      <Tabs value={activeLayoutTab} onValueChange={handleLayoutTabChange}>
        {/* Primary Layout Type Tabs - Large and Prominent */}
        <div className="flex items-center gap-6 border-b border-border pb-4 mb-4">
          <button
            onClick={() => handleLayoutTabChange('group')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all",
              activeLayoutTab === 'group'
                ? "bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/25"
                : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/30"
            )}
          >
            <Package className="h-5 w-5" />
            <span>GROUP</span>
            <Badge variant="secondary" className={cn(
              "ml-1",
              activeLayoutTab === 'group' ? "bg-amber-950/20" : "bg-amber-500/20"
            )}>
              {layoutCounts.group}
            </Badge>
          </button>
          
          <button
            onClick={() => handleLayoutTabChange('individual')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all",
              activeLayoutTab === 'individual'
                ? "bg-blue-500 text-blue-950 shadow-lg shadow-blue-500/25"
                : "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border border-blue-500/30"
            )}
          >
            <Ticket className="h-5 w-5" />
            <span>INDIVIDUAL</span>
            <Badge variant="secondary" className={cn(
              "ml-1",
              activeLayoutTab === 'individual' ? "bg-blue-950/20" : "bg-blue-500/20"
            )}>
              {layoutCounts.individual}
            </Badge>
          </button>
          
          <button
            onClick={() => handleLayoutTabChange('add-on')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all",
              activeLayoutTab === 'add-on'
                ? "bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/25"
                : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/30"
            )}
          >
            <Tag className="h-5 w-5" />
            <span>ADD-ONS</span>
            <Badge variant="secondary" className={cn(
              "ml-1",
              activeLayoutTab === 'add-on' ? "bg-emerald-950/20" : "bg-emerald-500/20"
            )}>
              {layoutCounts['add-on']}
            </Badge>
          </button>
          
          <div className="flex-1" />
          
          {/* Secondary Filters */}
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => handleLayoutTabChange('all')}
              className={cn(
                "px-3 py-1.5 rounded-md transition-colors",
                activeLayoutTab === 'all' 
                  ? "bg-muted text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            <button
              onClick={() => handleLayoutTabChange('favorites')}
              className={cn(
                "px-3 py-1.5 rounded-md transition-colors flex items-center gap-1",
                activeLayoutTab === 'favorites' 
                  ? "bg-muted text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Heart className="h-3.5 w-3.5" />
              Favorites
            </button>
            <button
              onClick={() => handleLayoutTabChange('recent')}
              className={cn(
                "px-3 py-1.5 rounded-md transition-colors flex items-center gap-1",
                activeLayoutTab === 'recent' 
                  ? "bg-muted text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Clock className="h-3.5 w-3.5" />
              Recent
            </button>
          </div>
        </div>
        
        <TabsList className="hidden" />
        {/* Category Pills - Horizontal Scroll */}
        <div className="overflow-x-auto scrollbar-hide mt-3 pb-2 -mx-1 px-1">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Badge
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer transition-colors shrink-0"
              onClick={() => setActiveCategory('all')}
            >
              All
            </Badge>
            {relevantCategories.map((cat) => (
              <Badge
                key={cat.value}
                variant={activeCategory === cat.value ? 'default' : 'outline'}
                className="cursor-pointer transition-colors shrink-0"
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.icon} {cat.label}
              </Badge>
            ))}
          </div>
        </div>

        <TabsContent value={activeLayoutTab} className="mt-6">
          {loading ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sortedTemplates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No templates found</p>
              <Button variant="outline" className="mt-4" onClick={onCreateNew}>
                Create your first template
              </Button>
            </div>
          ) : viewMode === 'list' ? (
            /* Layout-Specific Preview List */
            <div className="space-y-8">
              {sortedTemplates.map((template) => {
                const layoutType = getLayoutType(template);
                
                return (
                  <div
                    key={template.id}
                    className={cn(
                      "cursor-pointer transition-all group rounded-xl border border-border/50 p-4",
                      "hover:border-primary/50 hover:shadow-lg",
                      hoveredId === template.id && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    )}
                    onMouseEnter={() => setHoveredId(template.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => onSelectTemplate(template)}
                  >
                    {/* External Metadata Label */}
                    <div className="flex items-center justify-between mb-4 px-1">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-[10px] uppercase font-mono",
                            layoutType === 'group' && "border-amber-500/50 text-amber-500",
                            layoutType === 'individual' && "border-blue-500/50 text-blue-500",
                            layoutType === 'add-on' && "border-emerald-500/50 text-emerald-500"
                          )}
                        >
                          {layoutType}
                        </Badge>
                        <span className="text-base font-medium text-foreground truncate max-w-[300px]">
                          {template.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {layoutType === 'group' ? '4 Events' : layoutType === 'individual' ? '1 Event' : 'Add-on'}
                      </span>
                    </div>
                    
                    {/* Desktop Previews - Dark & Light Stacked */}
                    {(viewportSize === 'desktop' || viewportSize === 'responsive') && (
                      <div className="space-y-4 mb-4">
                        {/* Desktop Dark */}
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                            <Monitor className="h-3 w-3" /> Desktop · Dark
                          </div>
                          <div className="w-full">
                            {layoutType === 'group' && (
                              <GroupLayoutPreview 
                                config={template.config} 
                                layoutStyle={template.layout_style}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="dark"
                              />
                            )}
                            {layoutType === 'individual' && (
                              <IndividualLayoutPreview 
                                config={template.config}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="dark"
                              />
                            )}
                            {layoutType === 'add-on' && (
                              <AddOnLayoutPreview
                                config={template.config}
                                addOnType={template.add_on_type}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="dark"
                              />
                            )}
                          </div>
                        </div>
                        
                        {/* Desktop Light */}
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                            <Monitor className="h-3 w-3" /> Desktop · Light
                          </div>
                          <div className="w-full">
                            {layoutType === 'group' && (
                              <GroupLayoutPreview 
                                config={template.config} 
                                layoutStyle={template.layout_style}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="light"
                              />
                            )}
                            {layoutType === 'individual' && (
                              <IndividualLayoutPreview 
                                config={template.config}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="light"
                              />
                            )}
                            {layoutType === 'add-on' && (
                              <AddOnLayoutPreview
                                config={template.config}
                                addOnType={template.add_on_type}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="light"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Tablet + Mobile Row - Tablets side by side, Mobiles stacked */}
                    {viewportSize === 'responsive' && (
                      <div className="flex gap-4 items-start">
                        {/* Tablet Dark */}
                        <div className="flex-1 min-w-[280px] max-w-[380px]">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                            <Tablet className="h-3 w-3" /> Tablet · Dark
                          </div>
                          {layoutType === 'group' && (
                            <GroupLayoutPreview 
                              config={template.config} 
                              layoutStyle={template.layout_style}
                              isTablet={true}
                              name={template.name}
                              description={template.description}
                              htmlTemplate={template.html_template}
                              themeMode="dark"
                            />
                          )}
                          {layoutType === 'individual' && (
                            <IndividualLayoutPreview 
                              config={template.config}
                              isTablet={true}
                              name={template.name}
                              description={template.description}
                              htmlTemplate={template.html_template}
                              themeMode="dark"
                            />
                          )}
                          {layoutType === 'add-on' && (
                            <AddOnLayoutPreview
                              config={template.config}
                              addOnType={template.add_on_type}
                              isTablet={true}
                              name={template.name}
                              description={template.description}
                              htmlTemplate={template.html_template}
                              themeMode="dark"
                            />
                          )}
                        </div>
                        
                        {/* Tablet Light */}
                        <div className="flex-1 min-w-[280px] max-w-[380px]">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                            <Tablet className="h-3 w-3" /> Tablet · Light
                          </div>
                          {layoutType === 'group' && (
                            <GroupLayoutPreview 
                              config={template.config} 
                              layoutStyle={template.layout_style}
                              isTablet={true}
                              name={template.name}
                              description={template.description}
                              htmlTemplate={template.html_template}
                              themeMode="light"
                            />
                          )}
                          {layoutType === 'individual' && (
                            <IndividualLayoutPreview 
                              config={template.config}
                              isTablet={true}
                              name={template.name}
                              description={template.description}
                              htmlTemplate={template.html_template}
                              themeMode="light"
                            />
                          )}
                          {layoutType === 'add-on' && (
                            <AddOnLayoutPreview
                              config={template.config}
                              addOnType={template.add_on_type}
                              isTablet={true}
                              name={template.name}
                              description={template.description}
                              htmlTemplate={template.html_template}
                              themeMode="light"
                            />
                          )}
                        </div>
                        
                        {/* Mobile Column - Dark on top, Light on bottom */}
                        <div className="w-[180px] shrink-0 flex flex-col gap-4">
                          {/* Mobile Dark */}
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                              <Smartphone className="h-3 w-3" /> Mobile · Dark
                            </div>
                            {layoutType === 'group' && (
                              <GroupLayoutPreview 
                                config={template.config} 
                                layoutStyle={template.layout_style}
                                isMobile={true}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="dark"
                              />
                            )}
                            {layoutType === 'individual' && (
                              <IndividualLayoutPreview 
                                config={template.config}
                                isMobile={true}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="dark"
                              />
                            )}
                            {layoutType === 'add-on' && (
                              <AddOnLayoutPreview
                                config={template.config}
                                addOnType={template.add_on_type}
                                isMobile={true}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="dark"
                              />
                            )}
                          </div>
                          
                          {/* Mobile Light */}
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                              <Smartphone className="h-3 w-3" /> Mobile · Light
                            </div>
                            {layoutType === 'group' && (
                              <GroupLayoutPreview 
                                config={template.config} 
                                layoutStyle={template.layout_style}
                                isMobile={true}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="light"
                              />
                            )}
                            {layoutType === 'individual' && (
                              <IndividualLayoutPreview 
                                config={template.config}
                                isMobile={true}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="light"
                              />
                            )}
                            {layoutType === 'add-on' && (
                              <AddOnLayoutPreview
                                config={template.config}
                                addOnType={template.add_on_type}
                                isMobile={true}
                                name={template.name}
                                description={template.description}
                                htmlTemplate={template.html_template}
                                themeMode="light"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Mobile Only View */}
                    {viewportSize === 'mobile' && (
                      <div className="w-full max-w-[280px] mx-auto">
                        {layoutType === 'group' && (
                          <GroupLayoutPreview 
                            config={template.config} 
                            layoutStyle={template.layout_style}
                            isMobile={true}
                            name={template.name}
                            description={template.description}
                            htmlTemplate={template.html_template}
                            themeMode="dark"
                          />
                        )}
                        {layoutType === 'individual' && (
                          <IndividualLayoutPreview 
                            config={template.config}
                            isMobile={true}
                            name={template.name}
                            description={template.description}
                            htmlTemplate={template.html_template}
                            themeMode="dark"
                          />
                        )}
                        {layoutType === 'add-on' && (
                          <AddOnLayoutPreview
                            config={template.config}
                            addOnType={template.add_on_type}
                            isMobile={true}
                            name={template.name}
                            description={template.description}
                            htmlTemplate={template.html_template}
                            themeMode="dark"
                          />
                        )}
                      </div>
                    )}
                    
                    {/* Actions Row */}
                    <div className={cn(
                      "mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pt-3 border-t border-border/30"
                    )}>
                      <div className="flex gap-1">
                        <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); onSelectTemplate(template); }}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={(e) => handleDuplicate(template, e)} title="Duplicate">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={(e) => handleCopyHtml(template, e)} title="Copy HTML for CodePen">
                          <Code className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8"
                          onClick={(e) => handleToggleFavorite(template.id, e)}
                        >
                          <Star className={cn("h-4 w-4", template.is_favorite && "fill-yellow-500 text-yellow-500")} />
                        </Button>
                        {!template.is_system && (
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => handleDelete(template.id, e)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Grid View */
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedTemplates.map((template) => {
                const layoutType = getLayoutType(template);
                
                return (
                  <Card
                    key={template.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 overflow-hidden group",
                      "hover:shadow-lg hover:border-primary/50",
                      hoveredId === template.id && "ring-2 ring-primary"
                    )}
                    onMouseEnter={() => setHoveredId(template.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => onSelectTemplate(template)}
                  >
                    {/* Template Preview */}
                    <div 
                      className="h-48 relative overflow-hidden"
                      style={{ backgroundColor: template.config.backgroundColor }}
                    >
                      <div 
                        className="absolute inset-4 flex flex-col justify-center items-center text-center"
                        style={{ color: template.config.textColor }}
                      >
                        <div 
                          className="text-lg font-bold mb-2"
                          style={{ fontFamily: template.config.fontHeading }}
                        >
                          {layoutType === 'group' ? 'Grouped Events' : 'Event Title'}
                        </div>
                        <div 
                          className="text-sm opacity-80"
                          style={{ color: template.config.accentColor }}
                        >
                          {layoutType === 'group' ? '4 events' : 'Date • Time'}
                        </div>
                        <div 
                          className="mt-4 px-4 py-2 rounded text-sm font-medium"
                          style={{ 
                            backgroundColor: template.config.ctaBackgroundColor,
                            color: template.config.ctaTextColor,
                            borderRadius: `${template.config.borderRadius}px`,
                          }}
                        >
                          {template.config.ctaText}
                        </div>
                      </div>

                      {/* Layout Type Badge */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        <Badge 
                          className={cn(
                            "text-xs",
                            layoutType === 'group' && "bg-amber-500/90 text-amber-950",
                            layoutType === 'individual' && "bg-blue-500/90 text-blue-950",
                            layoutType === 'add-on' && "bg-emerald-500/90 text-emerald-950",
                          )}
                        >
                          {layoutType === 'group' && <Package className="h-3 w-3 mr-1" />}
                          {layoutType === 'individual' && <Ticket className="h-3 w-3 mr-1" />}
                          {layoutType === 'add-on' && <Tag className="h-3 w-3 mr-1" />}
                          {layoutType}
                        </Badge>
                      </div>

                      {/* Favorite Button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                          "absolute top-2 right-2 h-8 w-8",
                          template.is_favorite ? "text-yellow-500" : "text-muted-foreground"
                        )}
                        onClick={(e) => handleToggleFavorite(template.id, e)}
                      >
                        <Star className={cn("h-4 w-4", template.is_favorite && "fill-current")} />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{template.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {template.description || `${template.category} template`}
                          </p>
                        </div>
                        {!template.is_system && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                            onClick={(e) => handleDelete(template.id, e)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {TEMPLATE_CATEGORIES.find(c => c.value === template.category)?.icon} {template.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
