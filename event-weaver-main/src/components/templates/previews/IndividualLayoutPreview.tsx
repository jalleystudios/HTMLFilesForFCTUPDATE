import { TemplateConfig } from '@/types/template';
import { cn } from '@/lib/utils';

interface IndividualLayoutPreviewProps {
  config: TemplateConfig;
  className?: string;
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

// Extract title from HTML template
function extractTitleFromHtml(html: string): string | null {
  const titleMatch = html.match(/<[^>]+class="[^"]*title[^"]*"[^>]*>([^<]+)</i);
  if (titleMatch) return titleMatch[1].trim();
  const headingMatch = html.match(/<h[123][^>]*>([^<]+)</i);
  if (headingMatch) return headingMatch[1].trim();
  return null;
}

// Extract kicker/subtitle from HTML template
function extractKickerFromHtml(html: string): string | null {
  const kickerMatch = html.match(/<[^>]+class="[^"]*(kicker|sub|category)[^"]*"[^>]*>([^<]+)</i);
  if (kickerMatch) return kickerMatch[2].trim();
  return null;
}

// Responsive sizing helper
function getResponsiveSizes(isMobile: boolean, isTablet: boolean) {
  if (isMobile) {
    return {
      container: 'p-2',
      heroHeight: 'h-12',
      heroMargin: 'mb-1.5',
      kickerText: 'text-[5px]',
      kickerTracking: 'tracking-[0.08em]',
      titleText: 'text-[10px]',
      titleMargin: 'mb-1',
      labelText: 'text-[4px]',
      valueText: 'text-[8px]',
      gap: 'gap-1.5',
      padding: 'p-1',
      venueText: 'text-[5px]',
      venueMargin: 'mb-1.5',
      ctaPadding: 'py-0.5 px-1.5',
      ctaText: 'text-[5px]',
    };
  }
  if (isTablet) {
    return {
      container: 'p-3',
      heroHeight: 'h-16',
      heroMargin: 'mb-2',
      kickerText: 'text-[7px]',
      kickerTracking: 'tracking-[0.10em]',
      titleText: 'text-sm',
      titleMargin: 'mb-1.5',
      labelText: 'text-[6px]',
      valueText: 'text-xs',
      gap: 'gap-2',
      padding: 'p-1.5',
      venueText: 'text-[7px]',
      venueMargin: 'mb-2',
      ctaPadding: 'py-1 px-2',
      ctaText: 'text-[7px]',
    };
  }
  // Desktop
  return {
    container: 'p-5',
    heroHeight: 'h-28',
    heroMargin: 'mb-4',
    kickerText: 'text-xs',
    kickerTracking: 'tracking-[0.15em]',
    titleText: 'text-2xl',
    titleMargin: 'mb-3',
    labelText: 'text-xs',
    valueText: 'text-lg',
    gap: 'gap-4',
    padding: 'p-3',
    venueText: 'text-sm',
    venueMargin: 'mb-4',
    ctaPadding: 'py-2.5 px-4',
    ctaText: 'text-sm',
  };
}

export function IndividualLayoutPreview({ config, className, name, description, htmlTemplate, isMobile = false, isTablet = false, themeMode }: IndividualLayoutPreviewProps) {
  // Apply theme override
  const themedConfig = getThemedConfig(config, themeMode);
  
  const isDark = themeMode === 'light' ? false : (
    themedConfig.backgroundColor?.includes('#0') || 
    themedConfig.backgroundColor?.includes('#1') || 
    themedConfig.backgroundColor?.includes('rgb(0') || 
    themedConfig.backgroundColor?.includes('rgb(15')
  );

  const displayTitle = name || (htmlTemplate ? extractTitleFromHtml(htmlTemplate) : null) || 'KROQ ACOUSTIC CHRISTMAS';
  const displayKicker = description || (htmlTemplate ? extractKickerFromHtml(htmlTemplate) : null) || 'Special Event';

  const sizes = getResponsiveSizes(isMobile, isTablet);

  return (
    <div 
      className={cn("rounded-xl overflow-hidden", className)}
      style={{ 
        backgroundColor: themedConfig.backgroundColor,
        border: `2px solid ${themedConfig.accentColor}`,
      }}
    >
      {/* Single Event Hero Layout */}
      <div className={sizes.container}>
        {/* Hero Image Full Width */}
        {themedConfig.showImages && (
          <div 
            className={cn("w-full rounded-lg flex items-center justify-center", sizes.heroHeight, sizes.heroMargin, sizes.labelText)}
            style={{ 
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              border: `1px dashed ${themedConfig.accentColor}`,
              color: themedConfig.textColor,
            }}
          >
            HERO IMAGE
          </div>
        )}

        {/* Event Kicker */}
        <div 
          className={cn("uppercase mb-1", sizes.kickerText, sizes.kickerTracking)}
          style={{ color: themedConfig.accentColor }}
        >
          {displayKicker}
        </div>
        {/* Event Title */}
        <div 
          className={cn("font-black leading-tight", sizes.titleText, sizes.titleMargin)}
          style={{ 
            fontFamily: themedConfig.fontHeading,
            color: themedConfig.textColor,
          }}
        >
          {displayTitle}
        </div>

        {/* Date & Time - Large Display */}
        {themedConfig.showTimes && (
          <div className={cn("flex mb-3", sizes.gap)}>
            <div 
              className={cn("flex-1 rounded text-center", sizes.padding)}
              style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              }}
            >
              <div 
                className={cn("uppercase", sizes.labelText)}
                style={{ color: themedConfig.accentColor }}
              >
                Date
              </div>
              <div 
                className={cn("font-bold", sizes.valueText)}
                style={{ color: themedConfig.textColor }}
              >
                DEC 14
              </div>
            </div>
            <div 
              className={cn("flex-1 rounded text-center", sizes.padding)}
              style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              }}
            >
              <div 
                className={cn("uppercase", sizes.labelText)}
                style={{ color: themedConfig.accentColor }}
              >
                Time
              </div>
              <div 
                className={cn("font-bold", sizes.valueText)}
                style={{ color: themedConfig.textColor }}
              >
                7:00 PM
              </div>
            </div>
          </div>
        )}

        {/* Venue */}
        {themedConfig.showVenue && (
          <div 
            className={cn("text-center", sizes.venueText, sizes.venueMargin)}
            style={{ color: themedConfig.textColor, opacity: 0.6 }}
          >
            The Forum, Los Angeles
          </div>
        )}

        {/* CTA */}
        {themedConfig.showCta && (
          <div 
            className={cn("text-center font-bold uppercase tracking-wider", sizes.ctaPadding, sizes.ctaText)}
            style={{ 
              backgroundColor: themedConfig.ctaBackgroundColor,
              color: themedConfig.ctaTextColor,
              borderRadius: `${themedConfig.borderRadius}px`,
            }}
          >
            {themedConfig.ctaText}
          </div>
        )}
      </div>
    </div>
  );
}
