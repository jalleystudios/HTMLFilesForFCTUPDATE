// Layout type determines how templates display events (group vs individual)
export type LayoutType = 'group' | 'individual' | 'add-on';

export interface TemplateConfig {
  // Typography
  fontHeading: string;
  fontBody: string;
  fontSizeTitle: number;
  fontSizeBody: number;
  fontSizeSubtitle: number;
  letterSpacing: number;
  lineHeight: number;
  
  // Typography Extended
  titleColorMode?: 'auto' | 'dark' | 'light' | 'gray' | 'custom';
  bodyColorMode?: 'auto' | 'dark' | 'light' | 'gray' | 'custom';
  titleSize?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  titleFillRow?: boolean;
  fontPairing?: string;
  
  // Colors
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  ctaBackgroundColor: string;
  ctaTextColor: string;
  borderColor: string;
  glowColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  
  // Background & Frame
  bgPreset?: 'light' | 'dark' | 'transparent' | 'custom';
  backgroundTransparent?: boolean;
  innerBorderEnabled?: boolean;
  innerBorderColor?: string;
  innerBorderWidth?: number;
  innerBorderInset?: number;
  blockShadow?: 'none' | 'soft' | 'medium' | 'deep';
  blockShadowColor?: string;
  
  // Sports Double-Border Frame
  enableSportsFrame?: boolean;
  sportsAutoPalette?: boolean;
  sportsOuterColor?: string;
  sportsOuterAltColor?: string;
  sportsInnerColor?: string;
  sportsCornerRadius?: number;
  sportsGapThickness?: number;
  sportsUseGradient?: boolean;
  
  // Layout
  padding: number;
  margin: number;
  borderWidth: number;
  borderRadius: number;
  shadowIntensity: number;
  columnLayout: 'single' | 'two' | 'three' | 'grid';
  cardStyle?: 'flat' | 'elevated' | 'neon' | 'glass' | 'brutalist' | 'ticket';
  
  // Visibility
  showImages: boolean;
  showTimes: boolean;
  showVenue: boolean;
  showCta: boolean;
  showConciergeLink: boolean;
  showPrices: boolean;
  
  // Visibility Extended
  showMatchup?: boolean;
  showHeaderDetail?: boolean;
  heroImageMode?: 'auto' | 'landscape' | 'portrait' | 'none';
  showSecondaryImages?: boolean;
  showTimeInHeader?: boolean;
  showTimePerRow?: boolean;
  collapseIdenticalTimes?: boolean;
  showSlateLabel?: boolean;
  
  // Comedy-specific visibility
  showComedianPhoto?: boolean;
  showOpener?: boolean;
  showAgeRestriction?: boolean;
  showContentWarning?: boolean;
  showTourName?: boolean;
  showRecordingBadge?: boolean;
  
  // Add-on specific visibility
  showParentEvent?: boolean;
  showLotMap?: boolean;
  showAccessAreas?: boolean;
  showValidDays?: boolean;
  showUpgradeIncludes?: boolean;
  showShuttleSchedule?: boolean;
  
  // CTA
  ctaText: string;
  ctaLink: string;
  
  // CTA Extended
  ctaEnabled?: boolean;
  eventCtaEnabled?: boolean;
  eventUnderline?: boolean;
  eventIcon?: boolean;
  conciergeLabel?: string;
  conciergeNoUrlLabel?: string;
  conciergeColor?: string;
  conciergeUnderline?: boolean;
  conciergeIcon?: boolean;
  
  // Dual CTA Controls (for GROUP templates)
  showTicketsCta?: boolean;           // Toggle tickets link visibility
  ticketsCtaText?: string;            // "View Tickets", "Buy/Search", "Get Tix"
  ticketsCtaStyle?: 'button' | 'link' | 'pill' | 'underline';
  ticketsCtaIcon?: boolean;           // Show arrow → icon
  
  showEmailCta?: boolean;             // Toggle email link visibility  
  emailCtaText?: string;              // "Email", "VIP Email", "Email Concierge"
  emailCtaStyle?: 'button' | 'link' | 'pill' | 'underline';
  emailCtaIcon?: boolean;             // Show ✉ icon
  
  // Group Template Config
  combineGroups?: boolean;
  combinedTitleOverride?: string;
  slateOverride?: string;
  customBlurb?: string;
  autoFillHeaderDate?: boolean;
}

export interface OutputFormats {
  email: boolean;
  website_card: boolean;
  quick_share: boolean;
  social?: boolean;
}

// Layout style determines the visual structure within a layout type
export type GroupLayoutStyle = 
  | 'list-minimal'      // Clean vertical list, date left, CTA right
  | 'list-detailed'     // List with venue, time, and dual CTAs
  | 'two-column-table'  // DATE | VENUE table columns
  | 'magazine-hero'     // Big title, hero image, date range, search button
  | 'sports-outline'    // Bold bordered rows with team colors
  | 'combined-block'    // Merged events under one headline
  | 'timeline'          // Vertical timeline with date anchors
  | 'card-grid'         // 2x2 or 3x3 card layout
  | 'bio-split'         // Left: info, Right: image
  | 'calendar-strip';   // Calendar badge with date strip

export interface EmailTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  layout_type?: LayoutType;
  layout_style?: GroupLayoutStyle;
  description?: string;
  html_template: string;
  thumbnail_url?: string;
  is_system: boolean;
  is_favorite: boolean;
  config: TemplateConfig;
  user_id?: string;
  created_at: string;
  updated_at: string;
  
  // Extended fields
  style_tags?: string[];
  theme_mode?: 'light' | 'dark' | 'auto';
  output_formats?: OutputFormats;
  quick_share_template?: string;
  last_used_at?: string;
  add_on_type?: AddOnType;
  parent_event_id?: string;
}

export interface TemplatePreset {
  id: string;
  name: string;
  description?: string;
  config: Partial<TemplateConfig>;
  is_favorite: boolean;
  is_default: boolean;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface BigEventContent {
  id: string;
  event_uuid?: string;
  event_id?: string;
  headline?: string;
  subheadline?: string;
  ai_description?: string;
  custom_description?: string;
  fun_facts: string[];
  promotional_hooks: string[];
  is_edited: boolean;
  last_ai_updated?: string;
  created_at: string;
  updated_at: string;
}

// Comedy-specific data
export interface ComedyEventData {
  comedianName?: string;
  opener?: string;
  showType?: 'standup' | 'improv' | 'podcast' | 'roast' | 'special' | 'festival';
  tourName?: string;
  ageRestriction?: '18+' | '21+' | 'all-ages';
  isRecordingDate?: boolean;
  contentWarning?: string;
}

// Add-on specific data
export type AddOnType = 
  | 'parking' 
  | 'vip-parking' 
  | 'wristband-ga' 
  | 'wristband-vip' 
  | 'wristband-platinum'
  | 'wristband-weekend'
  | 'shuttle' 
  | 'camping' 
  | 'glamping'
  | 'meet-greet' 
  | 'early-entry'
  | 'backstage'
  | 'lounge-access'
  | 'club-suite'
  | 'all-inclusive'
  | 'merch-bundle'
  | 'upgrade';

export interface AddOnData {
  addOnType: AddOnType;
  parentEventId?: string;
  parentEventName?: string;
  lotName?: string;
  lotLocation?: string;
  wristbandTier?: string;
  accessAreas?: string[];
  validDays?: string[];
  upgradeIncludes?: string[];
  shuttleSchedule?: string;
  requiresMainTicket?: boolean;
}

export type TemplateCategory = 
  | 'sports' 
  | 'concerts' 
  | 'festivals' 
  | 'big-events' 
  | 'minimal' 
  | 'modern' 
  | 'general'
  | 'comedy'
  | 'theater'
  | 'tennis'
  | 'golf'
  | 'racing'
  | 'fighting'
  | 'awards'
  | 'parking'
  | 'wristbands'
  | 'upgrades'
  | 'hospitality'
  | 'neon'
  | 'luxury';

export type ViewportSize = 'mobile' | 'tablet' | 'desktop';

export type StyleTag = 
  | 'neon'
  | 'gradient'
  | 'minimal'
  | 'bold'
  | 'elegant'
  | 'retro'
  | 'futuristic'
  | 'brutalist'
  | 'glass'
  | 'team-branded'
  | 'dark'
  | 'light'
  | 'colorful'
  | 'monochrome';

export const defaultTemplateConfig: TemplateConfig = {
  fontHeading: 'Sora',
  fontBody: 'DM Sans',
  fontSizeTitle: 28,
  fontSizeBody: 14,
  fontSizeSubtitle: 18,
  letterSpacing: 0,
  lineHeight: 1.5,
  backgroundColor: '#1a1a1a',
  textColor: '#ffffff',
  accentColor: '#f5a623',
  ctaBackgroundColor: '#f5a623',
  ctaTextColor: '#1a1a1a',
  borderColor: '#333333',
  padding: 24,
  margin: 16,
  borderWidth: 0,
  borderRadius: 8,
  shadowIntensity: 0,
  columnLayout: 'single',
  showImages: true,
  showTimes: true,
  showVenue: true,
  showCta: true,
  showConciergeLink: true,
  showPrices: true,
  ctaText: 'Get Tickets',
  ctaLink: 'mailto:concierge@firstclasstixx.com',
  // Dual CTA defaults
  showTicketsCta: true,
  ticketsCtaText: 'View Tickets',
  ticketsCtaStyle: 'link',
  ticketsCtaIcon: true,
  showEmailCta: true,
  emailCtaText: 'Email',
  emailCtaStyle: 'link',
  emailCtaIcon: true,
};

export const GOOGLE_FONTS = [
  'Sora',
  'DM Sans',
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Raleway',
  'Poppins',
  'Playfair Display',
  'Merriweather',
  'Source Sans Pro',
  'Ubuntu',
  'Nunito',
  'Work Sans',
  'Rubik',
  'Fira Sans',
  'Quicksand',
  'Barlow',
  'Josefin Sans',
  'Archivo',
  'Space Grotesk',
  'Outfit',
  'Plus Jakarta Sans',
  'Manrope',
  'Lexend',
  'Figtree',
  'Instrument Sans',
  'Geist',
  'Bebas Neue',
  'Anton',
  'Permanent Marker',
  'Bangers',
];

export const TEMPLATE_CATEGORIES: { value: TemplateCategory; label: string; icon: string }[] = [
  { value: 'sports', label: 'Sports', icon: '🏈' },
  { value: 'concerts', label: 'Concerts', icon: '🎵' },
  { value: 'festivals', label: 'Festivals', icon: '🎪' },
  { value: 'big-events', label: 'Big Events', icon: '🏆' },
  { value: 'comedy', label: 'Comedy', icon: '🎤' },
  { value: 'theater', label: 'Theater', icon: '🎭' },
  { value: 'tennis', label: 'Tennis', icon: '🎾' },
  { value: 'golf', label: 'Golf', icon: '⛳' },
  { value: 'racing', label: 'Racing', icon: '🏎️' },
  { value: 'fighting', label: 'Fighting', icon: '🥊' },
  { value: 'awards', label: 'Awards', icon: '🏅' },
  { value: 'parking', label: 'Parking', icon: '🅿️' },
  { value: 'wristbands', label: 'Wristbands', icon: '🎟️' },
  { value: 'upgrades', label: 'Upgrades', icon: '⬆️' },
  { value: 'hospitality', label: 'Hospitality', icon: '🍾' },
  { value: 'minimal', label: 'Minimal', icon: '✨' },
  { value: 'modern', label: 'Modern', icon: '🔥' },
  { value: 'neon', label: 'Neon', icon: '💜' },
  { value: 'luxury', label: 'Luxury', icon: '💎' },
  { value: 'general', label: 'General', icon: '📧' },
];

export const STYLE_TAGS: { value: StyleTag; label: string }[] = [
  { value: 'neon', label: 'Neon' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'bold', label: 'Bold' },
  { value: 'elegant', label: 'Elegant' },
  { value: 'retro', label: 'Retro' },
  { value: 'futuristic', label: 'Futuristic' },
  { value: 'brutalist', label: 'Brutalist' },
  { value: 'glass', label: 'Glass' },
  { value: 'team-branded', label: 'Team Branded' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'colorful', label: 'Colorful' },
  { value: 'monochrome', label: 'Monochrome' },
];

// Template Import Schema
export interface TemplateImport {
  name: string;
  category: TemplateCategory;
  description?: string;
  config: TemplateConfig;
  html_template: string;
  style_tags?: string[];
  theme_mode?: 'light' | 'dark' | 'auto';
  output_formats?: OutputFormats;
  quick_share_template?: string;
  add_on_type?: AddOnType;
}

export interface TemplateImportBatch {
  templates: TemplateImport[];
}
