import { TemplateConfig, GroupLayoutStyle } from '@/types/template';
import { cn } from '@/lib/utils';

interface GroupLayoutPreviewProps {
  config: TemplateConfig;
  className?: string;
  layoutStyle?: GroupLayoutStyle;
  name?: string;
  description?: string;
  htmlTemplate?: string;
  isMobile?: boolean;
  isTablet?: boolean;
  themeMode?: 'light' | 'dark';
}

// Theme override helper
function getThemedConfig(config: TemplateConfig, themeMode?: 'light' | 'dark'): TemplateConfig {
  if (themeMode === 'light') {
    return {
      ...config,
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      borderColor: 'rgba(0,0,0,0.12)',
      ctaBackgroundColor: config.accentColor || '#2563eb',
      ctaTextColor: '#ffffff',
    };
  }
  return config;
}

// Responsive sizing helper - now with tablet support
function getResponsiveSizes(isMobile: boolean, isTablet: boolean = false) {
  if (isMobile) {
    return {
      container: 'p-2',
      titleText: 'text-[10px]',
      titleTextXl: 'text-xs',
      subtitleText: 'text-[5px]',
      kickerText: 'text-[6px]',
      bodyText: 'text-[5px]',
      smallText: 'text-[4px]',
      tinyText: 'text-[4px]',
      ctaText: 'text-[4px]',
      dateText: 'text-[6px]',
      gap: 'gap-0.5',
      gapSm: 'gap-px',
      spacing: 'space-y-0.5',
      spacingSm: 'space-y-px',
      margin: 'mb-0.5',
      marginSm: 'mb-px',
      padding: 'p-1',
      paddingSm: 'p-0.5',
      heroHeight: 'h-8',
      imageSize: 'w-8 h-10',
    };
  }
  if (isTablet) {
    return {
      container: 'p-3',
      titleText: 'text-sm',
      titleTextXl: 'text-base',
      subtitleText: 'text-[7px]',
      kickerText: 'text-[8px]',
      bodyText: 'text-[7px]',
      smallText: 'text-[6px]',
      tinyText: 'text-[5px]',
      ctaText: 'text-[6px]',
      dateText: 'text-[8px]',
      gap: 'gap-1.5',
      gapSm: 'gap-0.5',
      spacing: 'space-y-1.5',
      spacingSm: 'space-y-1',
      margin: 'mb-1.5',
      marginSm: 'mb-0.5',
      padding: 'p-2',
      paddingSm: 'p-1.5',
      heroHeight: 'h-12',
      imageSize: 'w-12 h-14',
    };
  }
  // Desktop - largest
  return {
    container: 'p-5',
    titleText: 'text-xl',
    titleTextXl: 'text-2xl',
    subtitleText: 'text-[10px]',
    kickerText: 'text-xs',
    bodyText: 'text-[10px]',
    smallText: 'text-[9px]',
    tinyText: 'text-[8px]',
    ctaText: 'text-[9px]',
    dateText: 'text-xs',
    gap: 'gap-3',
    gapSm: 'gap-1.5',
    spacing: 'space-y-3',
    spacingSm: 'space-y-2',
    margin: 'mb-3',
    marginSm: 'mb-1.5',
    padding: 'p-4',
    paddingSm: 'p-3',
    heroHeight: 'h-20',
    imageSize: 'w-20 h-24',
  };
}

// Sample grouped event data (fallback)
const sampleEvents = [
  { date: 'JAN 21', dayOfWeek: 'Wed', time: '7:30 PM', opponent: 'vs Warriors', venue: 'Crypto.com Arena' },
  { date: 'JAN 23', dayOfWeek: 'Thu', time: '7:30 PM', opponent: 'vs Celtics', venue: 'Crypto.com Arena' },
  { date: 'JAN 26', dayOfWeek: 'Sat', time: '6:00 PM', opponent: 'vs Heat', venue: 'Crypto.com Arena' },
  { date: 'JAN 28', dayOfWeek: 'Sun', time: '7:30 PM', opponent: 'vs Nuggets', venue: 'Crypto.com Arena' },
];

// Extract title from HTML template
function extractTitleFromHtml(html: string): string | null {
  const titleMatch = html.match(/<[^>]+class="[^"]*title[^"]*"[^>]*>([^<]+)</i);
  if (titleMatch) return titleMatch[1].trim();
  const headingMatch = html.match(/<h[123][^>]*>([^<]+)</i);
  if (headingMatch) return headingMatch[1].trim();
  return null;
}

// Helper component for rendering dual CTAs
function DualCTA({ 
  config, 
  variant = 'default',
  isMobile = false,
  isTablet = false,
}: { 
  config: TemplateConfig; 
  variant?: 'default' | 'compact' | 'stacked' | 'buttons' | 'pills';
  isMobile?: boolean;
  isTablet?: boolean;
}) {
  const baseTextSize = isMobile ? 'text-[5px]' : 'text-[7px]';
  const defaultTextSize = isMobile ? 'text-[6px]' : 'text-[8px]';
  const gapSize = isMobile ? 'gap-0.5' : 'gap-1.5';
  const showTickets = config.showTicketsCta !== false;
  const showEmail = config.showEmailCta !== false;
  const ticketsText = config.ticketsCtaText || 'View Tickets';
  const emailText = config.emailCtaText || 'Email';
  const ticketsIcon = config.ticketsCtaIcon !== false ? ' →' : '';
  const emailIcon = config.emailCtaIcon !== false ? '✉ ' : '';
  
  const ticketsStyle = config.ticketsCtaStyle || 'link';
  const emailStyle = config.emailCtaStyle || 'link';

  // Style variations for Tickets CTA
  const getTicketsStyles = () => {
    switch (ticketsStyle) {
      case 'button':
        return {
          backgroundColor: config.ctaBackgroundColor,
          color: config.ctaTextColor,
          padding: '2px 6px',
          borderRadius: '3px',
          fontWeight: 'bold',
        };
      case 'pill':
        return {
          backgroundColor: config.ctaBackgroundColor,
          color: config.ctaTextColor,
          padding: '1px 8px',
          borderRadius: '10px',
          fontWeight: 'bold',
        };
      case 'underline':
        return {
          color: config.accentColor,
          textDecoration: 'underline',
          fontWeight: 'bold',
        };
      default: // 'link'
        return {
          color: config.accentColor,
          fontWeight: 'bold',
        };
    }
  };

  // Style variations for Email CTA
  const getEmailStyles = () => {
    switch (emailStyle) {
      case 'button':
        return {
          backgroundColor: config.accentColor,
          color: config.ctaTextColor,
          padding: '2px 6px',
          borderRadius: '3px',
        };
      case 'pill':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${config.accentColor}`,
          color: config.accentColor,
          padding: '0px 6px',
          borderRadius: '10px',
        };
      case 'underline':
        return {
          color: config.accentColor,
          textDecoration: 'underline',
        };
      default: // 'link'
        return {
          color: config.accentColor,
        };
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center uppercase", baseTextSize, gapSize)}>
        {showTickets && (
          <span style={getTicketsStyles()}>{ticketsText}{ticketsIcon}</span>
        )}
        {showEmail && (
          <span style={getEmailStyles()}>{emailIcon}{emailText}</span>
        )}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={cn("flex flex-col uppercase items-end", baseTextSize, isMobile ? 'gap-px' : 'gap-0.5')}>
        {showTickets && (
          <span style={getTicketsStyles()}>{ticketsText}{ticketsIcon}</span>
        )}
        {showEmail && (
          <span style={getEmailStyles()}>{emailIcon}{emailText}</span>
        )}
      </div>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className={cn("flex items-center uppercase", baseTextSize, gapSize)}>
        {showTickets && (
          <span 
            style={{
              backgroundColor: config.ctaBackgroundColor,
              color: config.ctaTextColor,
              padding: isMobile ? '1px 4px' : '2px 8px',
              borderRadius: '3px',
              fontWeight: 'bold',
            }}
          >
            {ticketsText}
          </span>
        )}
        {showEmail && (
          <span style={{ color: config.accentColor }}>{emailIcon}{emailText}</span>
        )}
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className={cn("flex items-center uppercase", baseTextSize, gapSize)}>
        {showTickets && (
          <span 
            style={{
              backgroundColor: config.ctaBackgroundColor,
              color: config.ctaTextColor,
              padding: isMobile ? '1px 6px' : '2px 10px',
              borderRadius: '12px',
              fontWeight: 'bold',
            }}
          >
            {ticketsText}
          </span>
        )}
        {showEmail && (
          <span 
            style={{
              border: `1px solid ${config.accentColor}`,
              color: config.accentColor,
              padding: isMobile ? '0px 4px' : '1px 8px',
              borderRadius: '12px',
            }}
          >
            {emailIcon}{emailText}
          </span>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex items-center uppercase", defaultTextSize, isMobile ? 'gap-1' : 'gap-2')}>
      {showTickets && (
        <span style={getTicketsStyles()}>{ticketsText}{ticketsIcon}</span>
      )}
      {showEmail && (
        <span style={getEmailStyles()}>{emailIcon}{emailText}</span>
      )}
    </div>
  );
}

export function GroupLayoutPreview({ config, className, layoutStyle = 'list-minimal', name, description, htmlTemplate, isMobile = false, isTablet = false, themeMode }: GroupLayoutPreviewProps) {
  // Apply theme override
  const themedConfig = getThemedConfig(config, themeMode);
  
  const isDark = themeMode === 'light' ? false : (
    themedConfig.backgroundColor?.includes('#0') || 
    themedConfig.backgroundColor?.includes('#1') || 
    themedConfig.backgroundColor?.includes('rgb(0') || 
    themedConfig.backgroundColor?.includes('rgb(15')
  );

  // Derive display title from props or fallback
  const displayTitle = name || (htmlTemplate ? extractTitleFromHtml(htmlTemplate) : null);
  const sizes = getResponsiveSizes(isMobile, isTablet);

  // Render different layouts based on layoutStyle
  switch (layoutStyle) {
    case 'list-minimal':
      return <ListMinimalPreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    case 'list-detailed':
      return <ListDetailedPreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    case 'two-column-table':
      return <TwoColumnTablePreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    case 'magazine-hero':
      return <MagazineHeroPreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    case 'sports-outline':
      return <SportsOutlinePreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    case 'combined-block':
      return <CombinedBlockPreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    case 'timeline':
      return <TimelinePreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    case 'card-grid':
      return <CardGridPreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    case 'bio-split':
      return <BioSplitPreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    case 'calendar-strip':
      return <CalendarStripPreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
    default:
      return <ListMinimalPreview config={themedConfig} isDark={isDark} className={className} title={displayTitle} isMobile={isMobile} sizes={sizes} />;
  }
}

// Type for sizes object
type SizesType = ReturnType<typeof getResponsiveSizes>;

// ===================== LIST MINIMAL =====================
function ListMinimalPreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div 
      className={cn("rounded-xl overflow-hidden", className)}
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div className={sizes.container}>
        <div 
          className={cn("uppercase tracking-[0.12em]", sizes.kickerText, sizes.marginSm)}
          style={{ color: config.accentColor }}
        >
          {title || 'Combined Events'}
        </div>
        
        <div className={cn("mt-2", sizes.spacing)}>
          {sampleEvents.slice(0, 3).map((event, i) => (
            <div key={i} className={cn("flex items-center justify-between", sizes.gap)}>
              <div className={cn("flex items-center min-w-0", sizes.gap)}>
                <div 
                  className={cn("font-bold whitespace-nowrap", sizes.dateText)}
                  style={{ color: config.textColor }}
                >
                  {event.dayOfWeek} · {event.date}
                </div>
                <div 
                  className={cn("truncate", sizes.bodyText)}
                  style={{ color: config.textColor, opacity: 0.7 }}
                >
                  Lakers {event.opponent}
                </div>
              </div>
              <DualCTA config={config} variant="compact" isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== LIST DETAILED =====================
function ListDetailedPreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div 
      className={cn("rounded-xl overflow-hidden", className)}
      style={{ 
        backgroundColor: config.backgroundColor,
        border: `2px solid ${config.accentColor}`,
      }}
    >
      <div className={sizes.container}>
        <div 
          className={cn("font-black uppercase tracking-tight", sizes.titleText, sizes.marginSm)}
          style={{ 
            fontFamily: config.fontHeading,
            color: config.textColor,
          }}
        >
          {title || 'Season Schedule'}
        </div>
        <div 
          className={cn("uppercase tracking-wider", sizes.subtitleText, sizes.margin)}
          style={{ color: config.accentColor }}
        >
          Jan 21 – Feb 12, 2026
        </div>
        
        <div className={sizes.spacingSm}>
          {sampleEvents.slice(0, 3).map((event, i) => (
            <div 
              key={i} 
              className={cn("flex items-center justify-between border-b", isMobile ? 'py-1' : 'py-1.5')}
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}
            >
              <div className={cn("flex items-center", sizes.gap)}>
                <div 
                  className={cn("font-bold", sizes.dateText)}
                  style={{ color: config.textColor }}
                >
                  {event.dayOfWeek} · {event.date}
                </div>
                <div 
                  className={sizes.bodyText}
                  style={{ color: config.textColor, opacity: 0.6 }}
                >
                  {event.opponent}
                </div>
              </div>
              <DualCTA config={config} variant="buttons" isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== TWO COLUMN TABLE =====================
function TwoColumnTablePreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div 
      className={cn("rounded-xl overflow-hidden", className)}
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div className={sizes.container}>
        <div 
          className={cn("font-black", sizes.titleTextXl, sizes.marginSm)}
          style={{ 
            fontFamily: config.fontHeading,
            color: config.accentColor,
          }}
        >
          {title || 'Tour Dates'}
        </div>
        <div 
          className={cn("uppercase tracking-wider", sizes.subtitleText, sizes.margin)}
          style={{ color: config.textColor, opacity: 0.7 }}
        >
          Jan 21 – Feb 12, 2026
        </div>
        
        {/* Table Header */}
        <div 
          className={cn("grid grid-cols-[1fr_1fr_auto] pb-1 mb-1 border-b uppercase tracking-wide", sizes.gap, sizes.smallText)}
          style={{ 
            borderColor: config.accentColor,
            color: config.accentColor,
          }}
        >
          <div>Date</div>
          <div>Venue</div>
          <div>Actions</div>
        </div>
        
        {/* Table Rows */}
        <div className={sizes.spacingSm}>
          {sampleEvents.slice(0, 3).map((event, i) => (
            <div 
              key={i} 
              className={cn("grid grid-cols-[1fr_1fr_auto] items-center", sizes.gap, sizes.bodyText)}
            >
              <div style={{ color: config.accentColor }}>
                {event.dayOfWeek} · {event.date}
              </div>
              <div style={{ color: config.textColor }}>
                {event.venue}
              </div>
              <DualCTA config={config} variant="compact" isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== MAGAZINE HERO =====================
function MagazineHeroPreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div 
      className={cn("rounded-xl overflow-hidden", className)}
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div className={sizes.container}>
        <div className={cn("flex", sizes.gap)}>
          <div className="flex-1">
            <div 
              className={cn("font-black leading-tight", sizes.titleTextXl, sizes.marginSm)}
              style={{ 
                fontFamily: config.fontHeading,
                color: config.textColor,
              }}
            >
              {title || 'Lady Gaga'}
            </div>
            <div 
              className={cn(sizes.bodyText, sizes.margin)}
              style={{ color: config.textColor, opacity: 0.7 }}
            >
              Feb 18 – Apr 13, 2026 — The Kia Forum
            </div>
            
            <div 
              className={cn("inline-block font-bold uppercase rounded", sizes.smallText, isMobile ? 'px-1.5 py-0.5' : 'px-2.5 py-1', sizes.margin)}
              style={{ 
                backgroundColor: config.ctaBackgroundColor,
                color: config.ctaTextColor,
              }}
            >
              Search for Dates
            </div>
            
            <div 
              className={cn("uppercase tracking-wider font-bold", sizes.smallText, sizes.marginSm)}
              style={{ color: config.textColor, opacity: 0.6 }}
            >
              Tour Dates
            </div>
          </div>
          
          {/* Hero Image */}
          {config.showImages && (
            <div 
              className={cn("rounded flex items-center justify-center shrink-0", sizes.imageSize, sizes.tinyText)}
              style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                color: config.textColor,
                opacity: 0.5,
              }}
            >
              ARTIST
            </div>
          )}
        </div>
        
        <div className={cn("mt-1", sizes.spacingSm)}>
          {sampleEvents.slice(0, 2).map((event, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className={cn("flex items-center", sizes.gapSm)}>
                <span 
                  className={cn("font-bold", sizes.bodyText)}
                  style={{ color: config.textColor }}
                >
                  {event.dayOfWeek} · {event.date}
                </span>
                <span 
                  className={sizes.smallText}
                  style={{ color: config.textColor, opacity: 0.6 }}
                >
                  · {event.venue}
                </span>
              </div>
              <DualCTA config={config} variant="compact" isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== SPORTS OUTLINE =====================
function SportsOutlinePreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div 
      className={cn("rounded-lg overflow-hidden", className)}
      style={{ 
        backgroundColor: config.backgroundColor,
        border: `${isMobile ? '2px' : '3px'} solid ${config.accentColor}`,
      }}
    >
      {/* Inner border effect */}
      <div 
        className={isMobile ? 'm-0.5 p-2' : 'm-1 p-3'}
        style={{ 
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
        }}
      >
        <div 
          className={cn("font-black uppercase tracking-tight", isMobile ? 'text-base' : 'text-2xl', sizes.marginSm)}
          style={{ 
            fontFamily: config.fontHeading,
            color: config.textColor,
          }}
        >
          {title || 'Home Games'}
        </div>
        <div 
          className={cn("uppercase tracking-wider", sizes.smallText, sizes.margin)}
          style={{ color: config.textColor, opacity: 0.6 }}
        >
          Dec 14 – Feb 12
        </div>
        
        <div className={sizes.spacingSm}>
          {sampleEvents.slice(0, 3).map((event, i) => (
            <div 
              key={i} 
              className={cn("flex items-center justify-between", isMobile ? 'py-0.5' : 'py-1')}
              style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}
            >
              <div className={cn("flex items-center", sizes.gapSm)}>
                <span 
                  className={cn("font-bold", sizes.bodyText)}
                  style={{ color: config.textColor }}
                >
                  {event.dayOfWeek} · {event.date}
                </span>
                <span 
                  className={sizes.smallText}
                  style={{ color: config.textColor, opacity: 0.5 }}
                >
                  · {event.opponent}
                </span>
              </div>
              <DualCTA config={config} variant="default" isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== COMBINED BLOCK =====================
function CombinedBlockPreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)} style={{ backgroundColor: config.backgroundColor }}>
      <div className={sizes.container}>
        <div className={cn("uppercase tracking-widest font-medium", sizes.subtitleText, sizes.margin)} style={{ color: config.accentColor }}>
          {title || 'Combined: NBA All Star Weekend'}
        </div>
        <div className={cn("font-black uppercase leading-tight", isMobile ? 'text-xs' : 'text-sm', sizes.marginSm)} style={{ fontFamily: config.fontHeading, color: config.textColor }}>
          NBA All Star Celebrity Game · All Star Saturday Night · +2 More
        </div>
        <div className={cn(sizes.bodyText, sizes.margin)} style={{ color: config.textColor, opacity: 0.5 }}>Feb 13-16, 2026</div>
        <div className={cn("inline-block font-bold uppercase rounded-sm", sizes.smallText, isMobile ? 'px-2 py-0.5' : 'px-3 py-1', sizes.margin)} style={{ backgroundColor: config.ctaBackgroundColor, color: config.ctaTextColor }}>Search for Dates</div>
        <div className={sizes.spacingSm}>
          {[{ day: 'Fri · Feb 13', event: 'Celebrity Game — Kia Forum' }, { day: 'Sat · Feb 14', event: 'Saturday Night — Intuit Dome' }, { day: 'Sun · Feb 15', event: 'All Star Game — Intuit Dome' }].map((item, i) => (
            <div key={i} className={cn("flex items-center justify-between", sizes.smallText)}>
              <div className={cn("flex items-center", sizes.gapSm)}>
                <span className="font-bold" style={{ color: config.textColor }}>{item.day}</span>
                <span style={{ color: config.textColor, opacity: 0.6 }}>· {item.event}</span>
              </div>
              <DualCTA config={config} variant="compact" isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== TIMELINE =====================
function TimelinePreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)} style={{ backgroundColor: config.backgroundColor }}>
      <div className={sizes.container}>
        <div className={cn("font-black uppercase", sizes.titleText, sizes.margin)} style={{ fontFamily: config.fontHeading, color: config.textColor }}>{title || 'Season Timeline'}</div>
        <div className={cn("relative", isMobile ? 'pl-2' : 'pl-3')}>
          <div className="absolute left-0 top-1 bottom-1 w-0.5" style={{ backgroundColor: config.accentColor }} />
          {sampleEvents.slice(0, 3).map((event, i) => (
            <div key={i} className={cn("relative last:pb-0", isMobile ? 'pb-2' : 'pb-3')}>
              <div className={cn("absolute top-1 rounded-full border-2", isMobile ? '-left-[4px] w-2 h-2' : '-left-[5px] w-2.5 h-2.5')} style={{ backgroundColor: config.backgroundColor, borderColor: config.accentColor }} />
              <div className={isMobile ? 'pl-2' : 'pl-3'}>
                <div className={cn("font-bold", sizes.dateText)} style={{ color: config.accentColor }}>{event.date}</div>
                <div className={sizes.bodyText} style={{ color: config.textColor }}>{event.opponent} · {event.time}</div>
                <div className="mt-0.5"><DualCTA config={config} variant="compact" isMobile={isMobile} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== CARD GRID =====================
function CardGridPreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)} style={{ backgroundColor: config.backgroundColor, border: `2px solid ${config.accentColor}` }}>
      <div className={sizes.container}>
        <div className={cn("flex mb-2", sizes.gap)}>
          <div className="flex-1">
            <div className={cn("uppercase tracking-[0.12em]", sizes.kickerText, sizes.marginSm)} style={{ color: config.accentColor }}>First Class Tickets Access</div>
            <div className={cn("font-black leading-tight", sizes.titleTextXl)} style={{ fontFamily: config.fontHeading, color: config.textColor }}>{title || 'Event Grid'}</div>
          </div>
          {config.showImages && <div className={cn("rounded flex items-center justify-center shrink-0", isMobile ? 'w-10 h-10' : 'w-16 h-16', sizes.tinyText)} style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: config.textColor }}>LOGO</div>}
        </div>
        <div className={cn("grid grid-cols-2 mb-2", isMobile ? 'gap-1' : 'gap-1.5')}>
          {sampleEvents.map((event, i) => (
            <div key={i} className={cn("rounded text-center", sizes.paddingSm)} style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>
              <div className={cn("font-bold", sizes.dateText)} style={{ color: config.accentColor }}>{event.date}</div>
              <div className={sizes.bodyText} style={{ color: config.textColor, opacity: 0.7 }}>{event.time}</div>
              <div className={cn("mt-0.5 mb-0.5", sizes.smallText)} style={{ color: config.textColor, opacity: 0.5 }}>{event.opponent}</div>
              <div className="flex justify-center"><DualCTA config={config} variant="compact" isMobile={isMobile} /></div>
            </div>
          ))}
        </div>
        {config.showCta && <div className={cn("text-center font-bold uppercase tracking-wider", sizes.bodyText, isMobile ? 'py-1 px-2' : 'py-1.5 px-3')} style={{ backgroundColor: config.ctaBackgroundColor, color: config.ctaTextColor, borderRadius: `${config.borderRadius}px` }}>{config.ctaText}</div>}
      </div>
    </div>
  );
}

// ===================== BIO SPLIT =====================
function BioSplitPreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)} style={{ backgroundColor: config.backgroundColor }}>
      <div className="flex">
        <div className={cn("flex-1", sizes.container)}>
          <div className={cn("uppercase tracking-widest", sizes.subtitleText, sizes.marginSm)} style={{ color: config.accentColor }}>Concert Tour</div>
          <div className={cn("font-black", sizes.titleTextXl, sizes.marginSm)} style={{ fontFamily: config.fontHeading, color: config.textColor }}>{title || 'Artist Name'}</div>
          <div className={cn(sizes.bodyText, sizes.margin)} style={{ color: config.textColor, opacity: 0.6 }}>Renaissance World Tour · SoFi Stadium</div>
          <div className={sizes.spacingSm}>
            {sampleEvents.slice(0, 2).map((event, i) => (
              <div key={i} className={cn("flex items-center", sizes.gap)}>
                <div className={cn("rounded flex flex-col items-center justify-center", isMobile ? 'w-6 h-6' : 'w-8 h-8')} style={{ backgroundColor: config.accentColor, color: config.ctaTextColor }}>
                  <div className={cn("font-bold uppercase", sizes.tinyText)}>JAN</div>
                  <div className={cn("font-black leading-none", sizes.dateText)}>{21 + i}</div>
                </div>
                <div className="flex-1">
                  <div className={cn("font-medium", sizes.bodyText)} style={{ color: config.textColor }}>{event.dayOfWeek} at {event.time}</div>
                  <DualCTA config={config} variant="compact" isMobile={isMobile} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {config.showImages && <div className={cn("flex items-center justify-center", isMobile ? 'w-16' : 'w-24', sizes.smallText)} style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', color: config.textColor, opacity: 0.4 }}>ARTIST<br/>PHOTO</div>}
      </div>
    </div>
  );
}

// ===================== CALENDAR STRIP =====================
function CalendarStripPreview({ config, isDark, className, title, isMobile, sizes }: { config: TemplateConfig; isDark: boolean; className?: string; title?: string | null; isMobile: boolean; sizes: SizesType }) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)} style={{ backgroundColor: config.backgroundColor }}>
      <div className={sizes.container}>
        <div className={cn("font-black uppercase", sizes.titleText, sizes.margin)} style={{ fontFamily: config.fontHeading, color: config.textColor }}>{title || 'January Calendar'}</div>
        <div className={cn("flex overflow-hidden", sizes.margin, isMobile ? 'gap-0.5' : 'gap-1')}>
          {['21', '23', '26', '28'].map((day, i) => (
            <div key={i} className={cn("flex-1 rounded text-center", isMobile ? 'py-1' : 'py-2')} style={{ backgroundColor: i === 0 ? config.accentColor : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'), color: i === 0 ? config.ctaTextColor : config.textColor }}>
              <div className={cn("uppercase opacity-70", sizes.tinyText)}>Jan</div>
              <div className={cn("font-black", isMobile ? 'text-xs' : 'text-sm')}>{day}</div>
            </div>
          ))}
        </div>
        <div className={cn("rounded", sizes.bodyText, sizes.paddingSm, sizes.margin)} style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: config.textColor }}>
          <div className="flex justify-between items-center">
            <span><span className="font-bold">Jan 21</span> · vs Warriors · 7:30 PM</span>
            <DualCTA config={config} variant="compact" isMobile={isMobile} />
          </div>
        </div>
        <div className={cn("text-center uppercase tracking-wide", sizes.smallText)} style={{ color: config.textColor, opacity: 0.5 }}>4 home games this month</div>
      </div>
    </div>
  );
}

export default GroupLayoutPreview;
