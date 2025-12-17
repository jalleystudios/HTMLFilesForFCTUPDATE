import { TemplateConfig, AddOnType } from '@/types/template';
import { cn } from '@/lib/utils';

interface AddOnLayoutPreviewProps {
  config: TemplateConfig;
  addOnType?: AddOnType;
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

const addOnLabels: Record<AddOnType, { icon: string; label: string }> = {
  'parking': { icon: '🅿️', label: 'Parking Pass' },
  'vip-parking': { icon: '🚗', label: 'VIP Parking' },
  'wristband-ga': { icon: '🎟️', label: 'GA Wristband' },
  'wristband-vip': { icon: '⭐', label: 'VIP Wristband' },
  'wristband-platinum': { icon: '💎', label: 'Platinum Access' },
  'wristband-weekend': { icon: '🎪', label: 'Weekend Pass' },
  'shuttle': { icon: '🚌', label: 'Shuttle Service' },
  'camping': { icon: '⛺', label: 'Camping' },
  'glamping': { icon: '🏕️', label: 'Glamping' },
  'meet-greet': { icon: '🤝', label: 'Meet & Greet' },
  'early-entry': { icon: '🚀', label: 'Early Entry' },
  'backstage': { icon: '🎭', label: 'Backstage' },
  'lounge-access': { icon: '🍾', label: 'Lounge Access' },
  'club-suite': { icon: '🏆', label: 'Club Suite' },
  'all-inclusive': { icon: '✨', label: 'All Inclusive' },
  'merch-bundle': { icon: '👕', label: 'Merch Bundle' },
  'upgrade': { icon: '⬆️', label: 'Upgrade' },
};

function extractTitleFromHtml(html: string): string | null {
  const titleMatch = html.match(/<div[^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (titleMatch) return titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const hMatch = html.match(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/i);
  if (hMatch) return hMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return null;
}

function extractKickerFromHtml(html: string): string | null {
  const kickerMatch = html.match(/<div[^>]*class="[^"]*kicker[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (kickerMatch) return kickerMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const subMatch = html.match(/<div[^>]*class="[^"]*sub[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (subMatch) return subMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return null;
}

// Responsive sizing helper
function getResponsiveSizes(isMobile: boolean, isTablet: boolean) {
  if (isMobile) {
    return {
      container: 'p-2',
      badgePadding: 'p-2',
      badgeMargin: 'mb-1.5',
      cornerSize: 'w-4 h-4',
      iconText: 'text-base',
      titleText: 'text-[8px]',
      subtitleText: 'text-[6px]',
      detailText: 'text-[5px]',
      detailGap: 'space-y-px',
      detailMargin: 'mb-1.5',
      ctaPadding: 'py-0.5 px-1.5',
      ctaText: 'text-[5px]',
    };
  }
  if (isTablet) {
    return {
      container: 'p-3',
      badgePadding: 'p-3',
      badgeMargin: 'mb-2',
      cornerSize: 'w-6 h-6',
      iconText: 'text-xl',
      titleText: 'text-xs',
      subtitleText: 'text-[9px]',
      detailText: 'text-[8px]',
      detailGap: 'space-y-0.5',
      detailMargin: 'mb-2',
      ctaPadding: 'py-1 px-2',
      ctaText: 'text-[8px]',
    };
  }
  // Desktop
  return {
    container: 'p-5',
    badgePadding: 'p-5',
    badgeMargin: 'mb-4',
    cornerSize: 'w-10 h-10',
    iconText: 'text-3xl',
    titleText: 'text-base',
    subtitleText: 'text-sm',
    detailText: 'text-xs',
    detailGap: 'space-y-1.5',
    detailMargin: 'mb-4',
    ctaPadding: 'py-2 px-4',
    ctaText: 'text-sm',
  };
}

export function AddOnLayoutPreview({ config, addOnType = 'parking', className, name, description, htmlTemplate, isMobile = false, isTablet = false, themeMode }: AddOnLayoutPreviewProps) {
  // Apply theme override
  const themedConfig = getThemedConfig(config, themeMode);
  
  const isDark = themeMode === 'light' ? false : (
    themedConfig.backgroundColor?.includes('#0') || 
    themedConfig.backgroundColor?.includes('#1') || 
    themedConfig.backgroundColor?.includes('rgb(0') || 
    themedConfig.backgroundColor?.includes('rgb(15')
  );

  const displayTitle = name || 
    (htmlTemplate && extractTitleFromHtml(htmlTemplate)) || 
    addOnLabels[addOnType]?.label || 
    'Add-On Pass';

  const displaySubtitle = description ||
    (htmlTemplate && extractKickerFromHtml(htmlTemplate)) ||
    'Valid for: Event';

  const addOnInfo = addOnLabels[addOnType] || addOnLabels.parking;
  const sizes = getResponsiveSizes(isMobile, isTablet);

  return (
    <div 
      className={cn("rounded-xl overflow-hidden", className)}
      style={{ 
        backgroundColor: themedConfig.backgroundColor,
        border: `2px solid ${themedConfig.accentColor}`,
        fontFamily: themedConfig.fontBody,
      }}
    >
      {/* Add-on Pass/Badge Style */}
      <div className={sizes.container}>
        {/* Badge/Pass Visual */}
        <div 
          className={cn("rounded-lg text-center relative overflow-hidden", sizes.badgePadding, sizes.badgeMargin)}
          style={{ 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            border: `2px dashed ${themedConfig.accentColor}`,
          }}
        >
          {/* Decorative Corner */}
          <div 
            className={cn("absolute top-0 right-0", sizes.cornerSize)}
            style={{ 
              backgroundColor: themedConfig.accentColor,
              clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            }}
          />
          
          <div className={cn("mb-1", sizes.iconText)}>{addOnInfo.icon}</div>
          <div 
            className={cn("font-bold uppercase tracking-wider", sizes.titleText)}
            style={{ color: themedConfig.accentColor, fontFamily: themedConfig.fontHeading }}
          >
            {displayTitle}
          </div>
          <div 
            className={cn("mt-1", sizes.subtitleText)}
            style={{ color: themedConfig.textColor, opacity: 0.7 }}
          >
            {displaySubtitle}
          </div>
        </div>

        {/* Pass Details */}
        <div className={cn(sizes.detailGap, sizes.detailMargin)}>
          <div 
            className={cn("flex justify-between", sizes.detailText)}
            style={{ color: themedConfig.textColor }}
          >
            <span style={{ opacity: 0.6 }}>Location:</span>
            <span>Lot A - Premium</span>
          </div>
          <div 
            className={cn("flex justify-between", sizes.detailText)}
            style={{ color: themedConfig.textColor }}
          >
            <span style={{ opacity: 0.6 }}>Valid:</span>
            <span>Feb 11, 2024</span>
          </div>
        </div>

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
            Add to Order
          </div>
        )}
      </div>
    </div>
  );
}
