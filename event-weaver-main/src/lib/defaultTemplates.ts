import { EmailTemplate, defaultTemplateConfig, LayoutType, GroupLayoutStyle } from '@/types/template';

// Default system templates with layout_type classification
export const systemTemplates: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>[] = [
  // ==================== GROUP TEMPLATES ====================
  
  // 1. List Minimal - Clean vertical list
  {
    name: 'Combined Events Minimal',
    category: 'sports',
    layout_type: 'group',
    layout_style: 'list-minimal',
    description: 'Clean minimal list with date/event/CTA per row',
    is_system: true,
    is_favorite: false,
    style_tags: ['minimal', 'clean'],
    theme_mode: 'light',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      accentColor: '#e65c00',
      fontHeading: 'Inter',
      fontBody: 'Inter',
      fontSizeTitle: 14,
      borderRadius: 12,
      // Dual CTA config
      showTicketsCta: true,
      ticketsCtaText: 'View',
      ticketsCtaStyle: 'link',
      ticketsCtaIcon: true,
      showEmailCta: true,
      emailCtaText: 'Email',
      emailCtaStyle: 'link',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; padding: 24px; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `📅 Combined Events\n\n{{#each events}}{{date}} · {{eventName}}\n{{/each}}\n\n🎟️ {{ctaLink}}`,
  },

  // 2. List Detailed - Sports style with VIEW buttons
  {
    name: 'Sports Outline Heavy',
    category: 'sports',
    layout_type: 'group',
    layout_style: 'list-detailed',
    description: 'Bold bordered list with VIEW + VIP buttons per row',
    is_system: true,
    is_favorite: true,
    style_tags: ['bold', 'sports', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0d1117',
      textColor: '#ffffff',
      accentColor: '#f5a623',
      ctaBackgroundColor: '#f5a623',
      ctaTextColor: '#000000',
      fontHeading: 'Oswald',
      fontBody: 'DM Sans',
      fontSizeTitle: 28,
      borderRadius: 0,
      borderWidth: 3,
      enableSportsFrame: true,
      sportsAutoPalette: true,
      // Dual CTA config - buttons style
      showTicketsCta: true,
      ticketsCtaText: 'VIEW',
      ticketsCtaStyle: 'button',
      ticketsCtaIcon: false,
      showEmailCta: true,
      emailCtaText: 'VIP',
      emailCtaStyle: 'link',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; border: 3px solid {{accentColor}}; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `🏀 {{teamName}}\n📅 {{dateRange}}\n\n{{#each events}}{{dayOfWeek}} · {{date}} · {{opponent}}\n{{/each}}\n\n🎟️ {{ctaLink}}`,
  },

  // 3. Two Column Table - DATE | VENUE columns
  {
    name: 'Tour Dates Table',
    category: 'concerts',
    layout_type: 'group',
    layout_style: 'two-column-table',
    description: 'Elegant table layout with DATE/VENUE columns',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'table', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#daa520',
      fontHeading: 'DM Serif Display',
      fontBody: 'Lato',
      fontSizeTitle: 36,
      borderRadius: 0,
      // Dual CTA config - underline style
      showTicketsCta: true,
      ticketsCtaText: 'Buy/Search',
      ticketsCtaStyle: 'underline',
      ticketsCtaIcon: false,
      showEmailCta: true,
      emailCtaText: 'Concierge',
      emailCtaStyle: 'link',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; padding: 32px; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `🎵 {{artistName}}\n📍 Tour Dates\n\n{{#each events}}{{dayOfWeek}} · {{date}} · {{venue}}\n{{/each}}\n\n🎟️ {{ctaLink}}`,
  },

  // 4. Magazine Hero - Big title with artist image
  {
    name: 'Magazine Compact',
    category: 'concerts',
    layout_type: 'group',
    layout_style: 'magazine-hero',
    description: 'Magazine-style with hero image and date list',
    is_system: true,
    is_favorite: true,
    style_tags: ['magazine', 'image', 'light'],
    theme_mode: 'light',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#fafafa',
      textColor: '#1a1a1a',
      accentColor: '#e65c00',
      ctaBackgroundColor: '#e65c00',
      ctaTextColor: '#ffffff',
      fontHeading: 'Playfair Display',
      fontBody: 'Source Sans Pro',
      fontSizeTitle: 32,
      borderRadius: 8,
      showImages: true,
      heroImageMode: 'portrait',
      // Dual CTA config - compact links
      showTicketsCta: true,
      ticketsCtaText: 'View',
      ticketsCtaStyle: 'link',
      ticketsCtaIcon: true,
      showEmailCta: true,
      emailCtaText: 'Email',
      emailCtaStyle: 'link',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; padding: 24px; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `🎤 {{artistName}}\n📅 {{dateRange}} — {{venue}}\n\n✨ Search for dates: {{ctaLink}}`,
  },

  // 5. Sports Outline - Double border frame
  {
    name: 'Sports Double Border',
    category: 'sports',
    layout_type: 'group',
    layout_style: 'sports-outline',
    description: 'Team colors with double-border frame effect',
    is_system: true,
    is_favorite: true,
    style_tags: ['sports', 'frame', 'bold'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#552583',
      ctaBackgroundColor: '#fdb927',
      ctaTextColor: '#000000',
      fontHeading: 'Bebas Neue',
      fontBody: 'DM Sans',
      fontSizeTitle: 42,
      borderRadius: 4,
      enableSportsFrame: true,
      sportsAutoPalette: true,
      sportsOuterColor: '#552583',
      sportsInnerColor: '#fdb927',
      sportsGapThickness: 4,
      // Dual CTA config - bold text links
      showTicketsCta: true,
      ticketsCtaText: 'View Tickets',
      ticketsCtaStyle: 'link',
      ticketsCtaIcon: true,
      showEmailCta: true,
      emailCtaText: 'VIP Email',
      emailCtaStyle: 'link',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; border: 4px solid {{sportsOuterColor}}; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `🏀 {{teamName}}\n📅 Home Games · {{dateRange}}\n\n{{#each events}}{{dayOfWeek}} · {{date}} · {{opponent}}\n{{/each}}\n\n🎟️ {{ctaLink}}`,
  },

  // 6. Combined Block - Merged events headline
  {
    name: 'All Star Weekend Block',
    category: 'big-events',
    layout_type: 'group',
    layout_style: 'combined-block',
    description: 'Combined events under single headline with tight rows',
    is_system: true,
    is_favorite: true,
    style_tags: ['combined', 'dark', 'premium'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0f1419',
      textColor: '#ffffff',
      accentColor: '#1d9bf0',
      ctaBackgroundColor: '#ffffff',
      ctaTextColor: '#0f1419',
      fontHeading: 'Inter',
      fontBody: 'Inter',
      fontSizeTitle: 18,
      combineGroups: true,
      // Dual CTA config - compact style
      showTicketsCta: true,
      ticketsCtaText: 'View',
      ticketsCtaStyle: 'link',
      ticketsCtaIcon: false,
      showEmailCta: true,
      emailCtaText: 'Email',
      emailCtaStyle: 'link',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; padding: 32px; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `🌟 {{combinedTitle}}\n📅 {{dateRange}}\n\n{{#each events}}{{dayOfWeek}} · {{date}} · {{eventName}}\n{{/each}}\n\n🎟️ {{ctaLink}}`,
  },

  // 7. Timeline - Vertical timeline layout
  {
    name: 'Season Timeline',
    category: 'sports',
    layout_type: 'group',
    layout_style: 'timeline',
    description: 'Vertical timeline with date anchor points',
    is_system: true,
    is_favorite: false,
    style_tags: ['timeline', 'vertical', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#1a1a2e',
      textColor: '#eaeaea',
      accentColor: '#00d4ff',
      fontHeading: 'Rajdhani',
      fontBody: 'DM Sans',
      fontSizeTitle: 28,
      borderRadius: 0,
      // Dual CTA config - pill style
      showTicketsCta: true,
      ticketsCtaText: 'Get Tix',
      ticketsCtaStyle: 'pill',
      ticketsCtaIcon: false,
      showEmailCta: true,
      emailCtaText: 'VIP',
      emailCtaStyle: 'pill',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; padding: 32px; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `📅 {{teamName}} Season\n\n{{#each events}}⏺ {{date}} · {{opponent}}\n{{/each}}\n\n🎟️ {{ctaLink}}`,
  },

  // 8. Card Grid - 2x2 layout
  {
    name: 'Bio Grid Classic',
    category: 'sports',
    layout_type: 'group',
    layout_style: 'card-grid',
    description: '2x2 card grid with logo and grouped dates',
    is_system: true,
    is_favorite: false,
    style_tags: ['grid', 'cards', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#fdb927',
      ctaBackgroundColor: '#fdb927',
      ctaTextColor: '#000000',
      fontHeading: 'Oswald',
      fontBody: 'DM Sans',
      fontSizeTitle: 24,
      borderRadius: 8,
      columnLayout: 'grid',
      // Dual CTA config - compact for grid cards
      showTicketsCta: true,
      ticketsCtaText: 'Buy',
      ticketsCtaStyle: 'link',
      ticketsCtaIcon: false,
      showEmailCta: true,
      emailCtaText: 'VIP',
      emailCtaStyle: 'link',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; padding: 24px; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `🏀 {{teamName}}\n📍 All home games at {{venue}}\n\n{{#each events}}{{date}} · {{time}} · {{opponent}}\n{{/each}}\n\n🎟️ {{ctaLink}}`,
  },

  // 9. Bio Split - Left info, right image
  {
    name: 'Concert Bio Split',
    category: 'concerts',
    layout_type: 'group',
    layout_style: 'bio-split',
    description: 'Split layout with info left, artist photo right',
    is_system: true,
    is_favorite: false,
    style_tags: ['split', 'image', 'elegant'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#121212',
      textColor: '#ffffff',
      accentColor: '#1db954',
      ctaBackgroundColor: '#1db954',
      ctaTextColor: '#000000',
      fontHeading: 'Poppins',
      fontBody: 'Inter',
      fontSizeTitle: 28,
      showImages: true,
      // Dual CTA config - arrow links
      showTicketsCta: true,
      ticketsCtaText: 'Get Tickets',
      ticketsCtaStyle: 'link',
      ticketsCtaIcon: true,
      showEmailCta: true,
      emailCtaText: 'Concierge',
      emailCtaStyle: 'link',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `🎵 {{artistName}}\n🎸 {{tourName}} · {{venue}}\n\n{{#each events}}📅 {{date}} at {{time}}\n{{/each}}\n\n🎟️ {{ctaLink}}`,
  },

  // 10. Calendar Strip - Date strip header
  {
    name: 'Calendar Badges',
    category: 'sports',
    layout_type: 'group',
    layout_style: 'calendar-strip',
    description: 'Calendar date badges with month strip',
    is_system: true,
    is_favorite: false,
    style_tags: ['calendar', 'badges', 'modern'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#1e1e1e',
      textColor: '#ffffff',
      accentColor: '#ff4444',
      ctaBackgroundColor: '#ff4444',
      ctaTextColor: '#ffffff',
      fontHeading: 'Montserrat',
      fontBody: 'Open Sans',
      fontSizeTitle: 26,
      borderRadius: 6,
      // Dual CTA config - compact style
      showTicketsCta: true,
      ticketsCtaText: 'Tickets',
      ticketsCtaStyle: 'link',
      ticketsCtaIcon: false,
      showEmailCta: true,
      emailCtaText: 'Email',
      emailCtaStyle: 'link',
      emailCtaIcon: true,
    },
    html_template: `<div style="background-color: {{backgroundColor}}; padding: 24px; font-family: {{fontBody}}, sans-serif;">...</div>`,
    quick_share_template: `📆 {{teamName}} {{month}}\n\n{{#each events}}{{date}} · {{opponent}} · {{time}}\n{{/each}}\n\n🎟️ {{ctaLink}}`,
  },
  
  // ==================== CONCERTS (INDIVIDUAL) ====================
  {
    name: 'Concert Spotlight',
    category: 'concerts',
    layout_type: 'individual',
    description: 'Artist-focused with vibrant colors',
    is_system: true,
    is_favorite: false,
    style_tags: ['gradient', 'colorful'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#1a0a2e',
      textColor: '#ffffff',
      accentColor: '#ff6b9d',
      fontHeading: 'Playfair Display',
      fontBody: 'Nunito',
      fontSizeTitle: 32,
      borderRadius: 16,
    },
    html_template: `
<div style="background: linear-gradient(135deg, {{backgroundColor}} 0%, #2d1b4e 100%); padding: {{padding}}px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; text-align: center;">
    {{#if showImages}}
    <div style="width: 200px; height: 200px; margin: 0 auto 24px; border-radius: 50%; overflow: hidden; border: 4px solid {{accentColor}};">
      <img src="{{imageUrl}}" alt="{{performer}}" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>
    {{/if}}
    <h1 style="font-family: {{fontHeading}}, serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 8px; font-style: italic;">
      {{performer}}
    </h1>
    <p style="font-size: {{fontSizeSubtitle}}px; color: {{accentColor}}; margin: 0 0 24px;">
      {{eventName}}
    </p>
    {{#if showTimes}}
    <p style="font-size: {{fontSizeBody}}px; color: {{textColor}}; opacity: 0.9;">
      {{date}} at {{time}}
    </p>
    {{/if}}
    {{#if showVenue}}
    <p style="font-size: {{fontSizeBody}}px; color: {{textColor}}; opacity: 0.7; margin-bottom: 24px;">
      {{venue}}
    </p>
    {{/if}}
    {{#if showCta}}
    <a href="{{ctaLink}}" style="display: inline-block; background: {{accentColor}}; color: {{ctaTextColor}}; padding: 14px 40px; text-decoration: none; font-weight: 600; border-radius: 30px;">
      {{ctaText}}
    </a>
    {{/if}}
  </div>
</div>`,
    quick_share_template: `🎵 {{performer}}\n{{eventName}}\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n✨ Tickets: {{ctaLink}}`,
  },
  {
    name: 'Vegas Neon',
    category: 'concerts',
    layout_type: 'individual',
    description: 'Glowing neon pink with blur effects',
    is_system: true,
    is_favorite: false,
    style_tags: ['neon', 'dark', 'colorful'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0f0014',
      textColor: '#ffffff',
      accentColor: '#ff00ff',
      glowColor: '#ff00ff',
      ctaBackgroundColor: '#ff00ff',
      ctaTextColor: '#ffffff',
      fontHeading: 'Oswald',
      fontBody: 'DM Sans',
      fontSizeTitle: 40,
      borderRadius: 0,
      cardStyle: 'neon',
    },
    html_template: `
<div style="background: #0f0014; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; text-align: center; border: 2px solid #ff00ff; box-shadow: 0 0 40px #ff00ff40, inset 0 0 40px #ff00ff10; padding: 40px;">
    <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: #ff00ff; text-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 4px;">
      {{eventName}}
    </h1>
    <p style="font-size: 20px; color: #ffffff; margin: 0 0 8px;">{{performer}}</p>
    <div style="width: 100px; height: 2px; background: linear-gradient(90deg, transparent, #ff00ff, transparent); margin: 24px auto;"></div>
    {{#if showTimes}}
    <p style="font-size: 16px; color: #ff00ff; margin: 0 0 8px;">{{date}} // {{time}}</p>
    {{/if}}
    {{#if showVenue}}
    <p style="font-size: 14px; color: #888; margin: 0 0 32px;">{{venue}}</p>
    {{/if}}
    {{#if showCta}}
    <a href="{{ctaLink}}" style="display: inline-block; background: #ff00ff; color: #fff; padding: 16px 48px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 0 20px #ff00ff80;">
      {{ctaText}}
    </a>
    {{/if}}
  </div>
</div>`,
    quick_share_template: `💜 {{eventName}}\n🎤 {{performer}}\n📅 {{date}} at {{time}}\n📍 {{venue}}\n\n🎟️ {{ctaLink}}`,
  },

  // ==================== BIG EVENTS ====================
  {
    name: 'Big Event Premium',
    category: 'big-events',
    layout_type: 'individual',
    description: 'For Super Bowl, Grammy Awards, and major events',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'dark', 'gradient'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0d0d0d',
      textColor: '#ffffff',
      accentColor: '#c9a227',
      fontHeading: 'Sora',
      fontBody: 'DM Sans',
      fontSizeTitle: 42,
      padding: 40,
      borderRadius: 0,
    },
    html_template: `
<div style="background-color: {{backgroundColor}}; font-family: {{fontBody}}, sans-serif;">
  {{#if showImages}}
  <div style="position: relative;">
    <img src="{{imageUrl}}" alt="{{eventName}}" style="width: 100%; height: 300px; object-fit: cover;" />
    <div style="position: absolute; inset: 0; background: linear-gradient(to top, {{backgroundColor}} 0%, transparent 100%);"></div>
  </div>
  {{/if}}
  <div style="max-width: 600px; margin: 0 auto; padding: {{padding}}px;">
    <div style="text-align: center;">
      <span style="display: inline-block; background: {{accentColor}}; color: {{backgroundColor}}; padding: 6px 16px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">
        Premium Event
      </span>
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 16px; line-height: 1.1;">
        {{eventName}}
      </h1>
      {{#if bigEventDescription}}
      <p style="font-size: {{fontSizeBody}}px; color: {{textColor}}; opacity: 0.85; line-height: 1.6; margin-bottom: 24px;">
        {{bigEventDescription}}
      </p>
      {{/if}}
      {{#if funFacts}}
      <div style="background: rgba(255,255,255,0.05); padding: 20px; border-left: 3px solid {{accentColor}}; text-align: left; margin-bottom: 24px;">
        <p style="font-size: 12px; color: {{accentColor}}; text-transform: uppercase; margin: 0 0 8px;">Did You Know?</p>
        <p style="font-size: {{fontSizeBody}}px; color: {{textColor}}; margin: 0;">{{funFacts}}</p>
      </div>
      {{/if}}
      <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 24px;">
        {{#if showTimes}}
        <div>
          <p style="font-size: 12px; color: {{accentColor}}; margin: 0;">DATE</p>
          <p style="font-size: {{fontSizeSubtitle}}px; color: {{textColor}}; margin: 4px 0 0; font-weight: 600;">{{date}}</p>
        </div>
        <div>
          <p style="font-size: 12px; color: {{accentColor}}; margin: 0;">TIME</p>
          <p style="font-size: {{fontSizeSubtitle}}px; color: {{textColor}}; margin: 4px 0 0; font-weight: 600;">{{time}}</p>
        </div>
        {{/if}}
      </div>
      {{#if showVenue}}
      <p style="font-size: {{fontSizeBody}}px; color: {{textColor}}; opacity: 0.7; margin-bottom: 32px;">
        {{venue}}
      </p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: linear-gradient(135deg, {{accentColor}} 0%, #e8c547 100%); color: {{backgroundColor}}; padding: 18px 48px; text-decoration: none; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
        {{ctaText}}
      </a>
      {{/if}}
      {{#if showConciergeLink}}
      <p style="font-size: 13px; color: {{textColor}}; opacity: 0.6; margin-top: 24px;">
        Questions? <a href="mailto:concierge@firstclasstixx.com" style="color: {{accentColor}};">Contact our concierge</a>
      </p>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🏆 {{eventName}}\n\n📅 {{date}}\n⏰ {{time}}\n📍 {{venue}}\n\n💎 Premium tickets: {{ctaLink}}`,
  },

  // ==================== COMEDY ====================
  {
    name: 'Comedy Club Dark',
    category: 'comedy',
    description: 'Classic comedy club vibe with brick wall aesthetic',
    is_system: true,
    is_favorite: false,
    style_tags: ['dark', 'retro'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#1a1209',
      textColor: '#ffffff',
      accentColor: '#ff4444',
      ctaBackgroundColor: '#ff4444',
      ctaTextColor: '#ffffff',
      fontHeading: 'Bebas Neue',
      fontBody: 'DM Sans',
      fontSizeTitle: 48,
      borderRadius: 0,
    },
    html_template: `
<div style="background: linear-gradient(180deg, #1a1209 0%, #0d0906 100%); padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; text-align: center; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23261a0d" width="100" height="100"/><rect fill="%23331f0f" x="0" y="0" width="48" height="23"/><rect fill="%23331f0f" x="52" y="0" width="48" height="23"/><rect fill="%23331f0f" x="25" y="27" width="48" height="23"/><rect fill="%23331f0f" x="0" y="54" width="48" height="23"/><rect fill="%23331f0f" x="52" y="54" width="48" height="23"/><rect fill="%23331f0f" x="25" y="77" width="48" height="23"/></svg>'); padding: 48px 32px; border: 2px solid #333;">
    <div style="background: #000000cc; padding: 32px; margin: -16px;">
      <p style="font-size: 14px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 8px;">Live Comedy</p>
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 16px; text-transform: uppercase;">
        {{comedianName}}
      </h1>
      {{#if showOpener}}
      <p style="font-size: 14px; color: #888; margin: 0 0 24px;">with special guest {{opener}}</p>
      {{/if}}
      {{#if showAgeRestriction}}
      <span style="display: inline-block; background: {{accentColor}}; color: #fff; padding: 4px 12px; font-size: 12px; font-weight: bold; margin-bottom: 24px;">
        {{ageRestriction}}
      </span>
      {{/if}}
      {{#if showTimes}}
      <p style="font-size: 18px; color: {{textColor}}; margin: 0 0 8px;">{{date}} • {{time}}</p>
      {{/if}}
      {{#if showVenue}}
      <p style="font-size: 14px; color: #888; margin: 0 0 32px;">{{venue}}</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 16px 40px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🎤 {{comedianName}} LIVE!\n{{#if opener}}with {{opener}}{{/if}}\n\n📅 {{date}} • {{time}}\n📍 {{venue}}\n{{#if ageRestriction}}⚠️ {{ageRestriction}}{{/if}}\n\n🎟️ {{ctaLink}}`,
  },
  {
    name: 'Neon Marquee',
    category: 'comedy',
    description: 'Vegas marquee style with neon lights',
    is_system: true,
    is_favorite: false,
    style_tags: ['neon', 'retro', 'colorful'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#ffff00',
      glowColor: '#ffff00',
      ctaBackgroundColor: '#ffff00',
      ctaTextColor: '#000000',
      fontHeading: 'Anton',
      fontBody: 'DM Sans',
      fontSizeTitle: 56,
      borderRadius: 0,
    },
    html_template: `
<div style="background: #0a0a0a; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; text-align: center; border: 4px solid #ffff00; box-shadow: 0 0 30px #ffff0060, inset 0 0 30px #ffff0010; padding: 40px;">
    <div style="border: 2px dashed #ffff0060; padding: 32px;">
      <p style="font-size: 16px; color: #ffff00; text-transform: uppercase; letter-spacing: 8px; margin: 0 0 16px; text-shadow: 0 0 10px #ffff00;">★ Now Playing ★</p>
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: #ffffff; text-shadow: 0 0 20px #ffff00, 0 0 40px #ffff00; margin: 0 0 24px; text-transform: uppercase;">
        {{comedianName}}
      </h1>
      {{#if showRecordingBadge}}
      <span style="display: inline-block; background: #ff0000; color: #fff; padding: 6px 16px; font-size: 12px; font-weight: bold; margin-bottom: 16px; animation: blink 1s infinite;">
        📹 RECORDING IN PROGRESS
      </span>
      {{/if}}
      {{#if showTimes}}
      <p style="font-size: 20px; color: #ffff00; margin: 0 0 8px;">{{date}}</p>
      <p style="font-size: 24px; color: #ffffff; font-weight: bold; margin: 0 0 24px;">{{time}}</p>
      {{/if}}
      {{#if showVenue}}
      <p style="font-size: 14px; color: #888; margin: 0 0 32px;">{{venue}}</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: #ffff00; color: #000; padding: 18px 48px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-size: 16px; box-shadow: 0 0 20px #ffff0080;">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `⭐ {{comedianName}} ⭐\n🎤 Live Comedy Show!\n\n📅 {{date}}\n⏰ {{time}}\n📍 {{venue}}\n\n🎟️ Grab your tickets: {{ctaLink}}`,
  },
  {
    name: 'Podcast Live',
    category: 'comedy',
    description: 'Modern podcast recording event style',
    is_system: true,
    is_favorite: false,
    style_tags: ['modern', 'minimal'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#18181b',
      textColor: '#ffffff',
      accentColor: '#8b5cf6',
      ctaBackgroundColor: '#8b5cf6',
      ctaTextColor: '#ffffff',
      fontHeading: 'Space Grotesk',
      fontBody: 'DM Sans',
      fontSizeTitle: 32,
      borderRadius: 16,
    },
    html_template: `
<div style="background: {{backgroundColor}}; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #8b5cf620 0%, #06b6d420 100%); border-radius: 24px; padding: 40px; border: 1px solid #8b5cf640;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <div style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%; box-shadow: 0 0 10px #ef4444;"></div>
        <span style="font-size: 14px; color: #ef4444; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Live Recording</span>
      </div>
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 12px;">
        {{eventName}}
      </h1>
      <p style="font-size: 18px; color: {{accentColor}}; margin: 0 0 24px;">with {{comedianName}}</p>
      {{#if showTimes}}
      <div style="display: flex; gap: 24px; margin-bottom: 24px;">
        <div style="background: #27272a; padding: 16px 24px; border-radius: 12px;">
          <p style="font-size: 12px; color: #888; margin: 0 0 4px;">DATE</p>
          <p style="font-size: 16px; color: #fff; margin: 0; font-weight: 600;">{{date}}</p>
        </div>
        <div style="background: #27272a; padding: 16px 24px; border-radius: 12px;">
          <p style="font-size: 12px; color: #888; margin: 0 0 4px;">TIME</p>
          <p style="font-size: 16px; color: #fff; margin: 0; font-weight: 600;">{{time}}</p>
        </div>
      </div>
      {{/if}}
      {{#if showVenue}}
      <p style="font-size: 14px; color: #888; margin: 0 0 32px;">📍 {{venue}}</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%); color: #fff; padding: 16px 40px; text-decoration: none; font-weight: 600; border-radius: 12px;">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🎙️ {{eventName}}\nwith {{comedianName}}\n\n🔴 LIVE RECORDING\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n🎟️ {{ctaLink}}`,
  },
  {
    name: 'Comedy Tour',
    category: 'comedy',
    description: 'Tour-style promotional template',
    is_system: true,
    is_favorite: false,
    style_tags: ['bold', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#000000',
      textColor: '#ffffff',
      accentColor: '#f97316',
      ctaBackgroundColor: '#f97316',
      ctaTextColor: '#000000',
      fontHeading: 'Oswald',
      fontBody: 'DM Sans',
      fontSizeTitle: 44,
      borderRadius: 0,
    },
    html_template: `
<div style="background: #000; padding: 0; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto;">
    {{#if showImages}}
    <img src="{{imageUrl}}" alt="{{comedianName}}" style="width: 100%; height: 350px; object-fit: cover; filter: grayscale(20%);" />
    {{/if}}
    <div style="padding: 40px; text-align: center;">
      {{#if showTourName}}
      <p style="font-size: 14px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 6px; margin: 0 0 16px;">{{tourName}} Tour</p>
      {{/if}}
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 32px; text-transform: uppercase; line-height: 1;">
        {{comedianName}}
      </h1>
      <div style="display: inline-block; background: #111; padding: 24px 48px; margin-bottom: 32px;">
        {{#if showTimes}}
        <p style="font-size: 24px; color: #fff; margin: 0 0 4px; font-weight: bold;">{{date}}</p>
        <p style="font-size: 16px; color: {{accentColor}}; margin: 0 0 8px;">{{time}}</p>
        {{/if}}
        {{#if showVenue}}
        <p style="font-size: 14px; color: #666; margin: 0;">{{venue}}</p>
        {{/if}}
      </div>
      {{#if showCta}}
      <div>
        <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 18px 56px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-size: 16px;">
          {{ctaText}}
        </a>
      </div>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🎤 {{comedianName}}\n{{#if tourName}}🎯 {{tourName}} Tour{{/if}}\n\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n🎟️ {{ctaLink}}`,
  },

  // ==================== PARKING ====================
  {
    name: 'Parking Pass',
    category: 'parking',
    description: 'Simple parking pass confirmation',
    is_system: true,
    is_favorite: false,
    style_tags: ['minimal', 'dark'],
    theme_mode: 'dark',
    add_on_type: 'parking',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#1a1a2e',
      textColor: '#ffffff',
      accentColor: '#00d9ff',
      ctaBackgroundColor: '#00d9ff',
      ctaTextColor: '#1a1a2e',
      fontHeading: 'Space Grotesk',
      fontBody: 'DM Sans',
      fontSizeTitle: 28,
      borderRadius: 12,
    },
    html_template: `
<div style="background: {{backgroundColor}}; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 400px; margin: 0 auto; background: #252547; border-radius: 16px; overflow: hidden; border: 1px solid #3d3d6b;">
    <div style="background: {{accentColor}}; padding: 16px; text-align: center;">
      <span style="font-size: 32px;">🅿️</span>
      <h2 style="font-family: {{fontHeading}}, sans-serif; font-size: 20px; color: #1a1a2e; margin: 8px 0 0; text-transform: uppercase; letter-spacing: 2px;">Parking Pass</h2>
    </div>
    <div style="padding: 32px; text-align: center;">
      {{#if showParentEvent}}
      <p style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Event</p>
      <h3 style="font-size: 18px; color: #fff; margin: 0 0 24px;">{{parentEventName}}</h3>
      {{/if}}
      {{#if showLotMap}}
      <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <p style="font-size: 12px; color: {{accentColor}}; margin: 0 0 8px;">LOT</p>
        <p style="font-size: 32px; color: #fff; margin: 0; font-weight: bold;">{{lotName}}</p>
        {{#if lotLocation}}
        <p style="font-size: 13px; color: #888; margin: 8px 0 0;">{{lotLocation}}</p>
        {{/if}}
      </div>
      {{/if}}
      {{#if showTimes}}
      <p style="font-size: 14px; color: #fff; margin: 0 0 4px;">{{date}}</p>
      <p style="font-size: 13px; color: #888; margin: 0 0 24px;">Gates open: {{time}}</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 14px 32px; text-decoration: none; font-weight: 600; border-radius: 8px;">
        View Pass
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🅿️ PARKING PASS\n{{parentEventName}}\n\n📍 Lot: {{lotName}}\n📅 {{date}}\n⏰ Gates: {{time}}\n\n🎟️ {{ctaLink}}`,
  },
  {
    name: 'VIP Parking',
    category: 'parking',
    description: 'Premium VIP parking with gold accents',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'dark'],
    theme_mode: 'dark',
    add_on_type: 'vip-parking',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0d0d0d',
      textColor: '#ffffff',
      accentColor: '#d4af37',
      ctaBackgroundColor: '#d4af37',
      ctaTextColor: '#0d0d0d',
      fontHeading: 'Playfair Display',
      fontBody: 'DM Sans',
      fontSizeTitle: 24,
      borderRadius: 0,
    },
    html_template: `
<div style="background: {{backgroundColor}}; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 400px; margin: 0 auto; border: 2px solid {{accentColor}}; background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);">
    <div style="border-bottom: 1px solid {{accentColor}}; padding: 24px; text-align: center;">
      <p style="font-size: 12px; color: {{accentColor}}; letter-spacing: 4px; margin: 0 0 8px;">★ VIP ★</p>
      <h2 style="font-family: {{fontHeading}}, serif; font-size: 24px; color: {{accentColor}}; margin: 0;">Premium Parking</h2>
    </div>
    <div style="padding: 32px; text-align: center;">
      {{#if showParentEvent}}
      <h3 style="font-size: 16px; color: #fff; margin: 0 0 24px;">{{parentEventName}}</h3>
      {{/if}}
      <div style="display: inline-block; background: {{accentColor}}; color: #000; padding: 16px 32px; margin-bottom: 24px;">
        <p style="font-size: 12px; margin: 0 0 4px; opacity: 0.7;">LOT</p>
        <p style="font-size: 28px; margin: 0; font-weight: bold;">{{lotName}}</p>
      </div>
      <p style="font-size: 13px; color: #888; margin: 0 0 8px;">Closest to venue entrance</p>
      {{#if showTimes}}
      <p style="font-size: 14px; color: #fff; margin: 24px 0 4px;">{{date}}</p>
      <p style="font-size: 13px; color: {{accentColor}}; margin: 0 0 24px;">VIP Entry: {{time}}</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 14px 32px; text-decoration: none; font-weight: 600;">
        Access Pass
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `⭐ VIP PARKING ⭐\n{{parentEventName}}\n\n🅿️ Premium Lot: {{lotName}}\n📅 {{date}}\n⏰ VIP Entry: {{time}}\n\n💎 {{ctaLink}}`,
  },

  // ==================== WRISTBANDS ====================
  {
    name: 'GA Wristband',
    category: 'wristbands',
    description: 'General admission wristband pass',
    is_system: true,
    is_favorite: false,
    style_tags: ['colorful', 'bold'],
    theme_mode: 'dark',
    add_on_type: 'wristband-ga',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      accentColor: '#22c55e',
      ctaBackgroundColor: '#22c55e',
      ctaTextColor: '#ffffff',
      fontHeading: 'Oswald',
      fontBody: 'DM Sans',
      fontSizeTitle: 28,
      borderRadius: 0,
    },
    html_template: `
<div style="background: {{backgroundColor}}; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 450px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, {{accentColor}} 0%, #16a34a 100%); padding: 24px; text-align: center;">
      <h2 style="font-family: {{fontHeading}}, sans-serif; font-size: 28px; color: #fff; margin: 0; text-transform: uppercase; letter-spacing: 4px;">General Admission</h2>
    </div>
    <div style="background: #252525; padding: 32px; text-align: center;">
      <div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-bottom: 24px;">
        <span style="font-size: 24px;">🎟️</span>
        <span style="font-size: 18px; color: {{accentColor}}; font-weight: bold;">WRISTBAND</span>
      </div>
      {{#if showParentEvent}}
      <h3 style="font-size: 20px; color: #fff; margin: 0 0 16px;">{{parentEventName}}</h3>
      {{/if}}
      {{#if showValidDays}}
      <div style="background: #1a1a1a; padding: 16px; margin-bottom: 24px;">
        <p style="font-size: 12px; color: #888; margin: 0 0 8px;">VALID FOR</p>
        <p style="font-size: 16px; color: {{accentColor}}; margin: 0;">{{validDays}}</p>
      </div>
      {{/if}}
      {{#if showAccessAreas}}
      <p style="font-size: 13px; color: #888; margin: 0 0 24px;">Access: {{accessAreas}}</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 14px 32px; text-decoration: none; font-weight: 600;">
        Activate Wristband
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🎟️ GA WRISTBAND\n{{parentEventName}}\n\n✅ Access: {{accessAreas}}\n📅 Valid: {{validDays}}\n\n🎟️ {{ctaLink}}`,
  },
  {
    name: 'VIP Wristband',
    category: 'wristbands',
    description: 'VIP access wristband with premium styling',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'neon'],
    theme_mode: 'dark',
    add_on_type: 'wristband-vip',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#a855f7',
      glowColor: '#a855f7',
      ctaBackgroundColor: '#a855f7',
      ctaTextColor: '#ffffff',
      fontHeading: 'Oswald',
      fontBody: 'DM Sans',
      fontSizeTitle: 28,
      borderRadius: 0,
    },
    html_template: `
<div style="background: {{backgroundColor}}; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 450px; margin: 0 auto; border: 2px solid {{accentColor}}; box-shadow: 0 0 40px {{accentColor}}40;">
    <div style="background: linear-gradient(135deg, {{accentColor}} 0%, #7c3aed 100%); padding: 24px; text-align: center;">
      <p style="font-size: 12px; color: #fff; opacity: 0.8; margin: 0 0 4px;">★ ★ ★</p>
      <h2 style="font-family: {{fontHeading}}, sans-serif; font-size: 32px; color: #fff; margin: 0; text-transform: uppercase; letter-spacing: 6px;">VIP Access</h2>
    </div>
    <div style="background: #111; padding: 32px; text-align: center;">
      <div style="width: 80px; height: 80px; margin: 0 auto 24px; border: 3px solid {{accentColor}}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 36px;">👑</span>
      </div>
      {{#if showParentEvent}}
      <h3 style="font-size: 18px; color: #fff; margin: 0 0 24px;">{{parentEventName}}</h3>
      {{/if}}
      {{#if showAccessAreas}}
      <div style="background: #1a1a1a; padding: 20px; margin-bottom: 24px;">
        <p style="font-size: 12px; color: {{accentColor}}; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 2px;">VIP Perks</p>
        <p style="font-size: 14px; color: #fff; margin: 0; line-height: 1.8;">{{accessAreas}}</p>
      </div>
      {{/if}}
      {{#if showValidDays}}
      <p style="font-size: 14px; color: {{accentColor}}; margin: 0 0 24px;">Valid: {{validDays}}</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 16px 40px; text-decoration: none; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 0 20px {{accentColor}}60;">
        Access Pass
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `👑 VIP WRISTBAND 👑\n{{parentEventName}}\n\n✨ VIP Perks:\n{{accessAreas}}\n\n📅 Valid: {{validDays}}\n\n💎 {{ctaLink}}`,
  },
  {
    name: 'Weekend Pass',
    category: 'wristbands',
    description: 'Multi-day festival weekend pass',
    is_system: true,
    is_favorite: false,
    style_tags: ['gradient', 'colorful'],
    theme_mode: 'dark',
    add_on_type: 'wristband-weekend',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      accentColor: '#f97316',
      gradientStart: '#f97316',
      gradientEnd: '#ec4899',
      ctaBackgroundColor: '#f97316',
      ctaTextColor: '#ffffff',
      fontHeading: 'Space Grotesk',
      fontBody: 'DM Sans',
      fontSizeTitle: 32,
      borderRadius: 16,
    },
    html_template: `
<div style="background: {{backgroundColor}}; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 450px; margin: 0 auto; background: linear-gradient(135deg, #f9731620 0%, #ec489920 100%); border-radius: 24px; overflow: hidden; border: 1px solid #f9731640;">
    <div style="background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); padding: 32px; text-align: center;">
      <p style="font-size: 14px; color: #fff; opacity: 0.9; margin: 0 0 8px;">🎪 FESTIVAL PASS</p>
      <h2 style="font-family: {{fontHeading}}, sans-serif; font-size: 36px; color: #fff; margin: 0; text-transform: uppercase;">Weekend</h2>
    </div>
    <div style="padding: 32px; text-align: center;">
      {{#if showParentEvent}}
      <h3 style="font-size: 20px; color: #fff; margin: 0 0 24px;">{{parentEventName}}</h3>
      {{/if}}
      {{#if showValidDays}}
      <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 24px;">
        <span style="background: #1e293b; color: #fff; padding: 12px 20px; border-radius: 8px; font-size: 14px;">FRI</span>
        <span style="background: #1e293b; color: #fff; padding: 12px 20px; border-radius: 8px; font-size: 14px;">SAT</span>
        <span style="background: #1e293b; color: #fff; padding: 12px 20px; border-radius: 8px; font-size: 14px;">SUN</span>
      </div>
      {{/if}}
      {{#if showAccessAreas}}
      <p style="font-size: 14px; color: #94a3b8; margin: 0 0 24px;">All stages • All days</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); color: #fff; padding: 16px 40px; text-decoration: none; font-weight: 600; border-radius: 12px;">
        Get Your Pass
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🎪 WEEKEND PASS\n{{parentEventName}}\n\n📅 FRI • SAT • SUN\n✨ All stages, all days!\n\n🎟️ {{ctaLink}}`,
  },

  // ==================== UPGRADES ====================
  {
    name: 'Meet & Greet',
    category: 'upgrades',
    description: 'Exclusive meet and greet upgrade',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'dark'],
    theme_mode: 'dark',
    add_on_type: 'meet-greet',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#eab308',
      ctaBackgroundColor: '#eab308',
      ctaTextColor: '#0a0a0a',
      fontHeading: 'Playfair Display',
      fontBody: 'DM Sans',
      fontSizeTitle: 28,
      borderRadius: 0,
    },
    html_template: `
<div style="background: {{backgroundColor}}; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 450px; margin: 0 auto; text-align: center;">
    <div style="border: 1px solid {{accentColor}}; padding: 40px;">
      <div style="width: 100px; height: 100px; margin: 0 auto 24px; border: 2px solid {{accentColor}}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 48px;">🤝</span>
      </div>
      <p style="font-size: 12px; color: {{accentColor}}; letter-spacing: 4px; margin: 0 0 8px;">EXCLUSIVE</p>
      <h2 style="font-family: {{fontHeading}}, serif; font-size: 32px; color: #fff; margin: 0 0 24px;">Meet & Greet</h2>
      {{#if showParentEvent}}
      <p style="font-size: 16px; color: #888; margin: 0 0 24px;">{{parentEventName}}</p>
      {{/if}}
      {{#if showUpgradeIncludes}}
      <div style="background: #111; padding: 20px; margin-bottom: 24px; text-align: left;">
        <p style="font-size: 12px; color: {{accentColor}}; margin: 0 0 12px;">INCLUDES:</p>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #fff; font-size: 14px; line-height: 2;">
          <li>Personal meet with artist</li>
          <li>Photo opportunity</li>
          <li>Signed merchandise</li>
          <li>Early venue entry</li>
        </ul>
      </div>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 16px 40px; text-decoration: none; font-weight: 600;">
        Upgrade Now
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🤝 MEET & GREET\n{{parentEventName}}\n\n✨ Includes:\n• Personal meet with artist\n• Photo opportunity\n• Signed merchandise\n• Early venue entry\n\n💎 {{ctaLink}}`,
  },
  {
    name: 'Early Entry',
    category: 'upgrades',
    description: 'Early entry pass upgrade',
    is_system: true,
    is_favorite: false,
    style_tags: ['minimal', 'dark'],
    theme_mode: 'dark',
    add_on_type: 'early-entry',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#111827',
      textColor: '#ffffff',
      accentColor: '#10b981',
      ctaBackgroundColor: '#10b981',
      ctaTextColor: '#ffffff',
      fontHeading: 'Space Grotesk',
      fontBody: 'DM Sans',
      fontSizeTitle: 24,
      borderRadius: 12,
    },
    html_template: `
<div style="background: {{backgroundColor}}; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 400px; margin: 0 auto; background: #1f2937; border-radius: 16px; overflow: hidden;">
    <div style="background: {{accentColor}}; padding: 20px; text-align: center;">
      <span style="font-size: 28px;">⚡</span>
      <h2 style="font-family: {{fontHeading}}, sans-serif; font-size: 20px; color: #fff; margin: 8px 0 0; text-transform: uppercase;">Early Entry</h2>
    </div>
    <div style="padding: 32px; text-align: center;">
      {{#if showParentEvent}}
      <h3 style="font-size: 18px; color: #fff; margin: 0 0 16px;">{{parentEventName}}</h3>
      {{/if}}
      <div style="background: #111827; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px;">ENTRY TIME</p>
        <p style="font-size: 28px; color: {{accentColor}}; margin: 0; font-weight: bold;">{{time}}</p>
        <p style="font-size: 13px; color: #9ca3af; margin: 8px 0 0;">1 hour before general admission</p>
      </div>
      <p style="font-size: 14px; color: #9ca3af; margin: 0 0 24px;">Best spots, shorter lines, exclusive merch first</p>
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 14px 32px; text-decoration: none; font-weight: 600; border-radius: 8px;">
        Get Early Entry
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `⚡ EARLY ENTRY\n{{parentEventName}}\n\n⏰ Enter at {{time}}\n✨ 1 hour before GA!\n• Best spots\n• Shorter lines\n• First access to merch\n\n🎟️ {{ctaLink}}`,
  },

  // ==================== HOSPITALITY ====================
  {
    name: 'Lounge Access',
    category: 'hospitality',
    description: 'Premium lounge and hospitality access',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'dark'],
    theme_mode: 'dark',
    add_on_type: 'lounge-access',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0d0d0d',
      textColor: '#ffffff',
      accentColor: '#c084fc',
      ctaBackgroundColor: '#c084fc',
      ctaTextColor: '#0d0d0d',
      fontHeading: 'Playfair Display',
      fontBody: 'DM Sans',
      fontSizeTitle: 28,
      borderRadius: 0,
    },
    html_template: `
<div style="background: {{backgroundColor}}; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 450px; margin: 0 auto; background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%); border: 1px solid {{accentColor}}40;">
    <div style="padding: 40px; text-align: center; border-bottom: 1px solid {{accentColor}}20;">
      <span style="font-size: 40px;">🍾</span>
      <p style="font-size: 12px; color: {{accentColor}}; letter-spacing: 4px; margin: 16px 0 8px;">EXCLUSIVE</p>
      <h2 style="font-family: {{fontHeading}}, serif; font-size: 28px; color: #fff; margin: 0;">Lounge Access</h2>
    </div>
    <div style="padding: 32px;">
      {{#if showParentEvent}}
      <p style="font-size: 16px; color: #888; margin: 0 0 24px; text-align: center;">{{parentEventName}}</p>
      {{/if}}
      <div style="background: #1f1f1f; padding: 24px; margin-bottom: 24px;">
        <p style="font-size: 12px; color: {{accentColor}}; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 2px;">Lounge Perks</p>
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 16px;">🥂</span>
            <span style="font-size: 14px; color: #fff;">Premium open bar</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 16px;">🍽️</span>
            <span style="font-size: 14px; color: #fff;">Gourmet catering</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 16px;">🛋️</span>
            <span style="font-size: 14px; color: #fff;">Private seating area</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 16px;">🎤</span>
            <span style="font-size: 14px; color: #fff;">Premium stage views</span>
          </div>
        </div>
      </div>
      {{#if showCta}}
      <div style="text-align: center;">
        <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 16px 40px; text-decoration: none; font-weight: 600;">
          Reserve Lounge
        </a>
      </div>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🍾 LOUNGE ACCESS\n{{parentEventName}}\n\n✨ Includes:\n• Premium open bar\n• Gourmet catering\n• Private seating\n• Premium stage views\n\n💎 {{ctaLink}}`,
  },

  // ==================== MINIMAL ====================
  {
    name: 'Minimal Clean',
    category: 'minimal',
    description: 'Typography-focused, clean design',
    is_system: true,
    is_favorite: false,
    style_tags: ['minimal', 'light'],
    theme_mode: 'light',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      accentColor: '#000000',
      ctaBackgroundColor: '#000000',
      ctaTextColor: '#ffffff',
      fontHeading: 'Inter',
      fontBody: 'Inter',
      fontSizeTitle: 24,
      padding: 48,
      borderRadius: 4,
    },
    html_template: `
<div style="background-color: {{backgroundColor}}; padding: {{padding}}px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto;">
    <p style="font-size: 12px; color: {{textColor}}; opacity: 0.5; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 24px;">
      Upcoming Event
    </p>
    <h1 style="font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 16px; font-weight: 600; line-height: 1.3;">
      {{eventName}}
    </h1>
    <div style="width: 40px; height: 2px; background: {{accentColor}}; margin-bottom: 24px;"></div>
    {{#if showTimes}}
    <p style="font-size: {{fontSizeBody}}px; color: {{textColor}}; margin: 0 0 8px;">
      <strong>{{date}}</strong> at {{time}}
    </p>
    {{/if}}
    {{#if showVenue}}
    <p style="font-size: {{fontSizeBody}}px; color: {{textColor}}; opacity: 0.7; margin: 0 0 32px;">
      {{venue}}
    </p>
    {{/if}}
    {{#if showCta}}
    <a href="{{ctaLink}}" style="display: inline-block; background-color: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 12px 24px; text-decoration: none; font-size: 14px; font-weight: 500;">
      {{ctaText}} →
    </a>
    {{/if}}
  </div>
</div>`,
    quick_share_template: `{{eventName}}\n{{date}} at {{time}}\n{{venue}}\n\nTickets: {{ctaLink}}`,
  },

  // ==================== FESTIVALS ====================
  {
    name: 'Festival Grid',
    category: 'festivals',
    description: 'Multi-event grid layout for festivals',
    is_system: true,
    is_favorite: false,
    style_tags: ['colorful', 'modern'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#1e1e2e',
      textColor: '#ffffff',
      accentColor: '#89dceb',
      fontHeading: 'Space Grotesk',
      fontBody: 'DM Sans',
      columnLayout: 'grid',
      borderRadius: 12,
    },
    html_template: `
<div style="background-color: {{backgroundColor}}; padding: {{padding}}px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto;">
    <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 8px; text-align: center;">
      {{festivalName}}
    </h1>
    <p style="font-size: {{fontSizeBody}}px; color: {{accentColor}}; text-align: center; margin: 0 0 32px;">
      {{dates}} • {{location}}
    </p>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
      {{#each events}}
      <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: {{../borderRadius}}px;">
        {{#if ../showImages}}
        <img src="{{imageUrl}}" alt="{{name}}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;" />
        {{/if}}
        <h3 style="font-size: 16px; color: {{../textColor}}; margin: 0 0 4px;">{{name}}</h3>
        <p style="font-size: 13px; color: {{../accentColor}}; margin: 0;">{{stage}} • {{time}}</p>
      </div>
      {{/each}}
    </div>
    {{#if showCta}}
    <div style="text-align: center; margin-top: 32px;">
      <a href="{{ctaLink}}" style="display: inline-block; background: {{accentColor}}; color: {{backgroundColor}}; padding: 14px 32px; text-decoration: none; font-weight: 600; border-radius: 8px;">
        {{ctaText}}
      </a>
    </div>
    {{/if}}
  </div>
</div>`,
    quick_share_template: `🎪 {{festivalName}}\n📅 {{dates}}\n📍 {{location}}\n\n🎟️ {{ctaLink}}`,
  },

  // ==================== MODERN ====================
  {
    name: 'Modern Card',
    category: 'modern',
    description: 'Card-style with shadow and rounded corners',
    is_system: true,
    is_favorite: false,
    style_tags: ['modern', 'light'],
    theme_mode: 'light',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#f5f5f5',
      textColor: '#1a1a1a',
      accentColor: '#6366f1',
      ctaBackgroundColor: '#6366f1',
      ctaTextColor: '#ffffff',
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans',
      borderRadius: 20,
      shadowIntensity: 20,
      padding: 0,
    },
    html_template: `
<div style="background-color: {{backgroundColor}}; padding: 40px 24px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 400px; margin: 0 auto; background: #ffffff; border-radius: {{borderRadius}}px; overflow: hidden; box-shadow: 0 {{shadowIntensity}}px 60px rgba(0,0,0,0.1);">
    {{#if showImages}}
    <img src="{{imageUrl}}" alt="{{eventName}}" style="width: 100%; height: 200px; object-fit: cover;" />
    {{/if}}
    <div style="padding: 24px;">
      <span style="display: inline-block; background: {{accentColor}}20; color: {{accentColor}}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 12px;">
        {{category}}
      </span>
      <h2 style="font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 12px; font-weight: 700;">
        {{eventName}}
      </h2>
      {{#if showTimes}}
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 14px;">📅</span>
        <span style="font-size: {{fontSizeBody}}px; color: {{textColor}};">{{date}} • {{time}}</span>
      </div>
      {{/if}}
      {{#if showVenue}}
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
        <span style="font-size: 14px;">📍</span>
        <span style="font-size: {{fontSizeBody}}px; color: {{textColor}}; opacity: 0.7;">{{venue}}</span>
      </div>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 14px; text-decoration: none; font-weight: 600; border-radius: 12px; text-align: center;">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `{{eventName}}\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n🎟️ {{ctaLink}}`,
  },

  // ==================== GENERAL ====================
  {
    name: 'Two Column Split',
    category: 'general',
    description: 'Image left, content right layout',
    is_system: true,
    is_favorite: false,
    style_tags: ['modern', 'light'],
    theme_mode: 'light',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      accentColor: '#f5a623',
      columnLayout: 'two',
      borderRadius: 8,
    },
    html_template: `
<div style="background-color: {{backgroundColor}}; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; display: flex;">
    {{#if showImages}}
    <div style="flex: 1; min-width: 250px;">
      <img src="{{imageUrl}}" alt="{{eventName}}" style="width: 100%; height: 100%; min-height: 300px; object-fit: cover;" />
    </div>
    {{/if}}
    <div style="flex: 1; padding: {{padding}}px; display: flex; flex-direction: column; justify-content: center;">
      <h2 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 16px;">
        {{eventName}}
      </h2>
      {{#if showTimes}}
      <p style="font-size: {{fontSizeBody}}px; color: {{accentColor}}; margin: 0 0 8px; font-weight: 600;">
        {{date}} • {{time}}
      </p>
      {{/if}}
      {{#if showVenue}}
      <p style="font-size: {{fontSizeBody}}px; color: {{textColor}}; opacity: 0.7; margin: 0 0 24px;">
        {{venue}}
      </p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 12px 24px; text-decoration: none; font-weight: 600; border-radius: {{borderRadius}}px;">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `{{eventName}}\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n🎟️ {{ctaLink}}`,
  },
  {
    name: 'Event List Compact',
    category: 'general',
    description: 'Multiple events in a compact list',
    is_system: true,
    is_favorite: false,
    style_tags: ['minimal', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      accentColor: '#f5a623',
      fontHeading: 'Sora',
      fontBody: 'DM Sans',
      padding: 24,
      borderRadius: 8,
      showImages: false,
    },
    html_template: `
<div style="background-color: {{backgroundColor}}; padding: {{padding}}px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto;">
    <h2 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 24px; text-align: center;">
      Upcoming Events
    </h2>
    {{#each events}}
    <div style="display: flex; align-items: center; padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <div style="flex: 1;">
        <h3 style="font-size: 16px; color: {{../textColor}}; margin: 0 0 4px; font-weight: 600;">{{name}}</h3>
        <p style="font-size: 14px; color: {{../textColor}}; opacity: 0.7; margin: 0;">{{venue}}</p>
      </div>
      <div style="text-align: right; margin-right: 16px;">
        <p style="font-size: 14px; color: {{../accentColor}}; margin: 0; font-weight: 600;">{{date}}</p>
        <p style="font-size: 13px; color: {{../textColor}}; opacity: 0.7; margin: 0;">{{time}}</p>
      </div>
      {{#if ../showCta}}
      <a href="{{ticketUrl}}" style="background: {{../ctaBackgroundColor}}; color: {{../ctaTextColor}}; padding: 8px 16px; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 6px;">
        Tickets
      </a>
      {{/if}}
    </div>
    {{/each}}
  </div>
</div>`,
    quick_share_template: `🎟️ Upcoming Events\n\n{{#each events}}• {{name}} - {{date}}\n{{/each}}\n\nGet tickets: {{ctaLink}}`,
  },

  // ==================== LUXURY ====================
  {
    name: 'Black Tie',
    category: 'luxury',
    description: 'Ultra premium black and gold aesthetic',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#000000',
      textColor: '#ffffff',
      accentColor: '#d4af37',
      ctaBackgroundColor: '#d4af37',
      ctaTextColor: '#000000',
      fontHeading: 'Playfair Display',
      fontBody: 'DM Sans',
      fontSizeTitle: 36,
      borderRadius: 0,
    },
    html_template: `
<div style="background: #000; padding: 48px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 550px; margin: 0 auto; text-align: center;">
    <div style="border: 1px solid {{accentColor}}; padding: 48px;">
      <div style="width: 60px; height: 1px; background: {{accentColor}}; margin: 0 auto 24px;"></div>
      <p style="font-size: 12px; color: {{accentColor}}; letter-spacing: 6px; margin: 0 0 16px;">EXCLUSIVE INVITATION</p>
      <h1 style="font-family: {{fontHeading}}, serif; font-size: {{fontSizeTitle}}px; color: #fff; margin: 0 0 24px; font-weight: 400; font-style: italic;">
        {{eventName}}
      </h1>
      <div style="width: 60px; height: 1px; background: {{accentColor}}; margin: 0 auto 32px;"></div>
      {{#if showTimes}}
      <p style="font-size: 18px; color: #fff; margin: 0 0 8px; letter-spacing: 2px;">{{date}}</p>
      <p style="font-size: 14px; color: #888; margin: 0 0 24px;">{{time}}</p>
      {{/if}}
      {{#if showVenue}}
      <p style="font-size: 14px; color: #888; margin: 0 0 40px;">{{venue}}</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 18px 48px; text-decoration: none; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; font-size: 13px;">
        RSVP
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `✨ {{eventName}}\n\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n💎 Exclusive access: {{ctaLink}}`,
  },

  // ==================== NEON ====================
  {
    name: 'Cyberpunk',
    category: 'neon',
    description: 'Futuristic cyberpunk neon style',
    is_system: true,
    is_favorite: false,
    style_tags: ['neon', 'futuristic', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a12',
      textColor: '#ffffff',
      accentColor: '#00ffff',
      glowColor: '#00ffff',
      ctaBackgroundColor: '#00ffff',
      ctaTextColor: '#0a0a12',
      fontHeading: 'Oswald',
      fontBody: 'DM Sans',
      fontSizeTitle: 44,
      borderRadius: 0,
    },
    html_template: `
<div style="background: linear-gradient(180deg, #0a0a12 0%, #0f0f1a 100%); padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; text-align: center; position: relative;">
    <div style="position: absolute; inset: 0; background: linear-gradient(45deg, #ff00ff20 0%, #00ffff20 100%); filter: blur(60px);"></div>
    <div style="position: relative; border: 1px solid #00ffff40; padding: 48px; background: #0a0a1280; backdrop-filter: blur(10px);">
      <div style="display: inline-block; border: 1px solid #ff00ff; padding: 8px 24px; margin-bottom: 24px;">
        <span style="font-size: 12px; color: #ff00ff; letter-spacing: 4px;">LIVE EVENT</span>
      </div>
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: #fff; text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff40; margin: 0 0 24px; text-transform: uppercase; letter-spacing: 4px;">
        {{eventName}}
      </h1>
      {{#if showTimes}}
      <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 24px;">
        <div>
          <p style="font-size: 12px; color: #ff00ff; margin: 0 0 4px;">DATE</p>
          <p style="font-size: 18px; color: #fff; margin: 0;">{{date}}</p>
        </div>
        <div style="width: 1px; background: linear-gradient(180deg, transparent, #00ffff, transparent);"></div>
        <div>
          <p style="font-size: 12px; color: #ff00ff; margin: 0 0 4px;">TIME</p>
          <p style="font-size: 18px; color: #fff; margin: 0;">{{time}}</p>
        </div>
      </div>
      {{/if}}
      {{#if showVenue}}
      <p style="font-size: 14px; color: #666; margin: 0 0 32px;">{{venue}}</p>
      {{/if}}
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: linear-gradient(90deg, #00ffff 0%, #ff00ff 100%); color: #000; padding: 16px 48px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 0 30px #00ffff60;">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `⚡ {{eventName}}\n\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n🎟️ {{ctaLink}}`,
  },

  // ==================== GROUP LAYOUTS - SPORTS ====================
  {
    name: 'Sports Season Timeline',
    category: 'sports',
    layout_type: 'group',
    description: 'Vertical timeline with auto team colors and double-border frame',
    is_system: true,
    is_favorite: false,
    style_tags: ['bold', 'dark', 'elegant'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#552583',
      fontHeading: 'Oswald',
      fontBody: 'DM Sans',
      fontSizeTitle: 36,
      enableSportsFrame: true,
      sportsAutoPalette: true,
      sportsOuterColor: '#552583',
      sportsInnerColor: '#FDB927',
      sportsGapThickness: 4,
      sportsCornerRadius: 12,
      sportsUseGradient: true,
      blockShadow: 'deep',
      showMatchup: true,
      columnLayout: 'single',
    },
    html_template: `
<div style="background: #0a0a0a; padding: 24px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; border: {{sportsGapThickness}}px solid {{sportsOuterColor}}; border-radius: {{sportsCornerRadius}}px; padding: 4px; background: linear-gradient(135deg, {{sportsOuterColor}}, {{sportsInnerColor}});">
    <div style="background: #0a0a0a; border-radius: 8px; padding: 32px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <span style="display: inline-block; background: {{sportsOuterColor}}; color: #fff; padding: 6px 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; border-radius: 4px;">Season Schedule</span>
        <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 16px 0 0; text-transform: uppercase; letter-spacing: 2px;">
          {{teamName}}
        </h1>
      </div>
      
      <div style="position: relative; padding-left: 32px; border-left: 3px solid {{sportsInnerColor}};">
        {{#each events}}
        <div style="position: relative; margin-bottom: 24px; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px;">
          <div style="position: absolute; left: -40px; width: 14px; height: 14px; background: {{../sportsInnerColor}}; border-radius: 50%; border: 3px solid #0a0a0a;"></div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="font-size: 12px; color: {{../sportsInnerColor}}; font-weight: 700; margin: 0;">{{date}}</p>
              <p style="font-size: 18px; color: #fff; font-weight: 600; margin: 4px 0 0;">vs {{opponent}}</p>
            </div>
            <p style="font-size: 14px; color: #888;">{{time}}</p>
          </div>
        </div>
        {{/each}}
      </div>
      
      {{#if showCta}}
      <div style="text-align: center; margin-top: 24px;">
        <a href="{{ctaLink}}" style="display: inline-block; background: linear-gradient(135deg, {{sportsOuterColor}}, {{sportsInnerColor}}); color: #fff; padding: 16px 48px; text-decoration: none; font-weight: 700; border-radius: 8px; text-transform: uppercase; letter-spacing: 2px;">
          {{ctaText}}
        </a>
      </div>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🏀 {{teamName}} Season Schedule\n\n{{#each events}}📅 {{date}} vs {{opponent}}\n{{/each}}\n🎟️ {{ctaLink}}`,
  },

  {
    name: 'Basketball Court Matchups',
    category: 'sports',
    layout_type: 'group',
    description: '2x3 grid of matchups with team logos and double-border',
    is_system: true,
    is_favorite: false,
    style_tags: ['bold', 'dark', 'modern'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0d0d0d',
      textColor: '#ffffff',
      accentColor: '#FDB927',
      fontHeading: 'Bebas Neue',
      fontBody: 'DM Sans',
      fontSizeTitle: 42,
      enableSportsFrame: true,
      sportsAutoPalette: true,
      sportsOuterColor: '#552583',
      sportsInnerColor: '#FDB927',
      sportsGapThickness: 6,
      sportsCornerRadius: 0,
      showMatchup: true,
      columnLayout: 'grid',
    },
    html_template: `
<div style="background: #0d0d0d; padding: 24px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 640px; margin: 0 auto;">
    <div style="border: 6px solid {{sportsOuterColor}}; padding: 6px; background: {{sportsInnerColor}};">
      <div style="background: #0d0d0d; padding: 32px;">
        <div style="text-align: center; margin-bottom: 32px; border-bottom: 2px solid {{sportsInnerColor}}; padding-bottom: 24px;">
          <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0; text-transform: uppercase; letter-spacing: 4px;">
            {{teamName}} <span style="color: {{sportsInnerColor}};">Home Stand</span>
          </h1>
          <p style="font-size: 14px; color: #888; margin: 12px 0 0;">{{venue}}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
          {{#each events}}
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); padding: 20px; text-align: center;">
            <p style="font-size: 11px; color: {{../sportsInnerColor}}; text-transform: uppercase; letter-spacing: 2px; margin: 0;">{{date}}</p>
            <div style="margin: 16px 0; display: flex; justify-content: center; align-items: center; gap: 16px;">
              <span style="font-size: 24px; color: #fff; font-weight: 700;">VS</span>
            </div>
            <p style="font-size: 16px; color: #fff; font-weight: 600; margin: 0;">{{opponent}}</p>
            <p style="font-size: 13px; color: #666; margin: 8px 0 0;">{{time}}</p>
          </div>
          {{/each}}
        </div>
        
        {{#if showCta}}
        <div style="text-align: center; margin-top: 32px;">
          <a href="{{ctaLink}}" style="display: inline-block; background: {{sportsInnerColor}}; color: #0d0d0d; padding: 18px 56px; text-decoration: none; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 16px;">
            {{ctaText}}
          </a>
        </div>
        {{/if}}
      </div>
    </div>
  </div>
</div>`,
    quick_share_template: `🏀 {{teamName}} Home Stand!\n📍 {{venue}}\n\n{{#each events}}🆚 {{opponent}} - {{date}} {{time}}\n{{/each}}\n🎟️ {{ctaLink}}`,
  },

  {
    name: 'Magazine Bio Grid',
    category: 'concerts',
    layout_type: 'group',
    description: 'Split layout with artist bio and event grid - editorial style',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'editorial', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0f0f0f',
      textColor: '#ffffff',
      accentColor: '#e8b923',
      fontHeading: 'Playfair Display',
      fontBody: 'Source Serif Pro',
      fontSizeTitle: 40,
      borderRadius: 0,
      innerBorderEnabled: true,
      innerBorderColor: '#e8b923',
      innerBorderWidth: 1,
      heroImageMode: 'portrait',
      columnLayout: 'two',
    },
    html_template: `
<div style="background: #0f0f0f; padding: 32px; font-family: {{fontBody}}, serif;">
  <div style="max-width: 700px; margin: 0 auto; border: 1px solid {{accentColor}};">
    <div style="display: flex; flex-wrap: wrap;">
      <!-- Left: Artist Bio -->
      <div style="flex: 0 0 45%; padding: 40px; border-right: 1px solid {{accentColor}}20;">
        {{#if showImages}}
        <div style="aspect-ratio: 3/4; background: #1a1a1a; margin-bottom: 24px; overflow: hidden;">
          <img src="{{performerPhoto}}" alt="{{performer}}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        {{/if}}
        <h1 style="font-family: {{fontHeading}}, serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 16px; line-height: 1.1; font-style: italic;">
          {{performer}}
        </h1>
        <p style="font-size: 14px; color: #888; line-height: 1.7; margin: 0;">
          {{performerBio}}
        </p>
      </div>
      
      <!-- Right: Event Grid -->
      <div style="flex: 0 0 55%; padding: 40px; background: rgba(255,255,255,0.02);">
        <p style="font-size: 11px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 24px; border-bottom: 1px solid {{accentColor}}20; padding-bottom: 16px;">Upcoming Performances</p>
        
        {{#each events}}
        <div style="padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <p style="font-size: 20px; color: {{../accentColor}}; font-weight: 600; margin: 0;">{{date}}</p>
              <p style="font-size: 14px; color: #fff; margin: 6px 0 0;">{{venue}}</p>
              <p style="font-size: 12px; color: #666; margin: 4px 0 0;">{{city}}</p>
            </div>
            <p style="font-size: 13px; color: #888;">{{time}}</p>
          </div>
        </div>
        {{/each}}
        
        {{#if showCta}}
        <a href="{{ctaLink}}" style="display: block; text-align: center; background: transparent; border: 1px solid {{accentColor}}; color: {{accentColor}}; padding: 16px; text-decoration: none; font-weight: 500; margin-top: 32px; letter-spacing: 2px; text-transform: uppercase; font-size: 12px;">
          {{ctaText}}
        </a>
        {{/if}}
      </div>
    </div>
  </div>
</div>`,
    quick_share_template: `✨ {{performer}} Tour\n\n{{#each events}}📅 {{date}} - {{venue}}, {{city}}\n{{/each}}\n🎟️ {{ctaLink}}`,
  },

  {
    name: 'Calendar Badge Layout',
    category: 'concerts',
    layout_type: 'group',
    description: 'Each event as a calendar page with bold dates',
    is_system: true,
    is_favorite: false,
    style_tags: ['modern', 'minimal', 'bold'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#121212',
      textColor: '#ffffff',
      accentColor: '#ff4757',
      fontHeading: 'Space Grotesk',
      fontBody: 'DM Sans',
      fontSizeTitle: 32,
      borderRadius: 12,
      blockShadow: 'medium',
      columnLayout: 'grid',
    },
    html_template: `
<div style="background: #121212; padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 640px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0;">
        {{eventName}}
      </h1>
      <p style="font-size: 16px; color: {{accentColor}}; margin: 12px 0 0;">{{groupCount}} Shows</p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
      {{#each events}}
      <div style="background: #1a1a1a; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.4);">
        <div style="background: {{../accentColor}}; padding: 16px; text-align: center;">
          <p style="font-size: 12px; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 2px; margin: 0;">{{month}}</p>
          <p style="font-size: 48px; color: #fff; font-weight: 800; margin: 4px 0 0; line-height: 1;">{{day}}</p>
        </div>
        <div style="padding: 20px; text-align: center;">
          <p style="font-size: 15px; color: #fff; font-weight: 600; margin: 0;">{{venue}}</p>
          <p style="font-size: 13px; color: #888; margin: 8px 0 0;">{{city}} • {{time}}</p>
        </div>
      </div>
      {{/each}}
    </div>
    
    {{#if showCta}}
    <div style="text-align: center; margin-top: 40px;">
      <a href="{{ctaLink}}" style="display: inline-block; background: {{accentColor}}; color: #fff; padding: 18px 56px; text-decoration: none; font-weight: 700; border-radius: 50px; font-size: 16px;">
        {{ctaText}}
      </a>
    </div>
    {{/if}}
  </div>
</div>`,
    quick_share_template: `🎵 {{eventName}}\n{{groupCount}} Shows!\n\n{{#each events}}📅 {{month}} {{day}} - {{venue}}\n{{/each}}\n🎟️ {{ctaLink}}`,
  },

  // ==================== PREMIUM SPORTS TEMPLATES ====================
  {
    name: 'Tennis Grand Slam',
    category: 'sports',
    layout_type: 'individual',
    description: 'Wimbledon/US Open inspired with court diagram aesthetic',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'premium', 'bold'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#003300',
      textColor: '#ffffff',
      accentColor: '#c4a747',
      fontHeading: 'Cormorant Garamond',
      fontBody: 'Lato',
      fontSizeTitle: 38,
      borderRadius: 0,
      enableSportsFrame: true,
      sportsOuterColor: '#c4a747',
      sportsInnerColor: '#003300',
      innerBorderEnabled: true,
      innerBorderColor: '#ffffff',
      innerBorderWidth: 2,
    },
    html_template: `
<div style="background: linear-gradient(180deg, #002200 0%, #003300 50%, #002200 100%); padding: 32px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; border: 4px solid {{accentColor}}; padding: 4px;">
    <div style="border: 2px solid #fff; padding: 40px;">
      <div style="text-align: center;">
        <div style="display: inline-block; border: 1px solid {{accentColor}}; padding: 8px 32px; margin-bottom: 24px;">
          <span style="font-size: 11px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 4px;">Centre Court</span>
        </div>
        
        <h1 style="font-family: {{fontHeading}}, serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 16px; font-weight: 600;">
          {{eventName}}
        </h1>
        
        <!-- Court Line Divider -->
        <div style="position: relative; height: 40px; margin: 24px 0;">
          <div style="position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: #fff;"></div>
          <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 60px; height: 100%; border: 2px solid #fff; background: #003300;"></div>
        </div>
        
        {{#if showTimes}}
        <div style="display: flex; justify-content: center; gap: 48px; margin-bottom: 24px;">
          <div>
            <p style="font-size: 11px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Date</p>
            <p style="font-size: 20px; color: #fff; margin: 8px 0 0; font-weight: 500;">{{date}}</p>
          </div>
          <div>
            <p style="font-size: 11px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Time</p>
            <p style="font-size: 20px; color: #fff; margin: 8px 0 0; font-weight: 500;">{{time}}</p>
          </div>
        </div>
        {{/if}}
        
        {{#if showVenue}}
        <p style="font-size: 14px; color: rgba(255,255,255,0.7); margin: 0 0 32px;">{{venue}}</p>
        {{/if}}
        
        {{#if showCta}}
        <a href="{{ctaLink}}" style="display: inline-block; background: {{accentColor}}; color: #003300; padding: 16px 48px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 14px;">
          {{ctaText}}
        </a>
        {{/if}}
      </div>
    </div>
  </div>
</div>`,
    quick_share_template: `🎾 {{eventName}}\n\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n🏆 Premium tickets: {{ctaLink}}`,
  },

  {
    name: 'Golf Tournament Masters',
    category: 'sports',
    layout_type: 'individual',
    description: 'Masters-inspired green with prestigious leaderboard aesthetic',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'premium', 'classic'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0d4d0d',
      textColor: '#ffffff',
      accentColor: '#ffd700',
      fontHeading: 'EB Garamond',
      fontBody: 'Lato',
      fontSizeTitle: 36,
      borderRadius: 0,
      blockShadow: 'deep',
    },
    html_template: `
<div style="background: linear-gradient(180deg, #0d4d0d 0%, #063d06 100%); padding: 40px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="background: #041f04; border: 3px solid {{accentColor}}; padding: 48px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
      <div style="text-align: center;">
        <!-- Trophy Icon -->
        <div style="font-size: 48px; margin-bottom: 16px;">🏆</div>
        
        <p style="font-size: 12px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 6px; margin: 0 0 16px;">A Tradition Unlike Any Other</p>
        
        <h1 style="font-family: {{fontHeading}}, serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 8px; font-style: italic;">
          {{eventName}}
        </h1>
        
        <div style="width: 120px; height: 2px; background: {{accentColor}}; margin: 24px auto;"></div>
        
        {{#if showTimes}}
        <div style="background: rgba(255,215,0,0.1); padding: 24px; margin: 24px 0;">
          <p style="font-size: 24px; color: {{accentColor}}; font-weight: 600; margin: 0;">{{date}}</p>
          <p style="font-size: 16px; color: #fff; margin: 8px 0 0;">Tournament Round • {{time}}</p>
        </div>
        {{/if}}
        
        {{#if showVenue}}
        <p style="font-size: 16px; color: rgba(255,255,255,0.8); margin: 0 0 32px; font-style: italic;">
          {{venue}}
        </p>
        {{/if}}
        
        {{#if showCta}}
        <a href="{{ctaLink}}" style="display: inline-block; background: {{accentColor}}; color: #0d4d0d; padding: 18px 56px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 14px;">
          {{ctaText}}
        </a>
        {{/if}}
      </div>
    </div>
  </div>
</div>`,
    quick_share_template: `⛳ {{eventName}}\n\n🏆 A Tradition Unlike Any Other\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n🎟️ {{ctaLink}}`,
  },

  {
    name: 'Racing Circuit F1',
    category: 'sports',
    layout_type: 'individual',
    description: 'F1/NASCAR inspired with speed lines and dramatic shadows',
    is_system: true,
    is_favorite: false,
    style_tags: ['bold', 'modern', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#ff0000',
      fontHeading: 'Russo One',
      fontBody: 'DM Sans',
      fontSizeTitle: 44,
      borderRadius: 0,
      enableSportsFrame: true,
      sportsOuterColor: '#ff0000',
      sportsInnerColor: '#1a1a1a',
      blockShadow: 'deep',
    },
    html_template: `
<div style="background: #0a0a0a; padding: 0; font-family: {{fontBody}}, sans-serif; overflow: hidden;">
  <div style="max-width: 600px; margin: 0 auto; position: relative;">
    <!-- Speed Lines Background -->
    <div style="position: absolute; inset: 0; background: repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,0,0,0.03) 48px, rgba(255,0,0,0.03) 50px);"></div>
    
    <div style="position: relative; border-left: 6px solid {{accentColor}}; padding: 48px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
        <div style="display: flex; gap: 4px;">
          <div style="width: 4px; height: 24px; background: #fff;"></div>
          <div style="width: 4px; height: 24px; background: #fff;"></div>
          <div style="width: 4px; height: 24px; background: {{accentColor}};"></div>
        </div>
        <span style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 4px;">Grand Prix</span>
      </div>
      
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 24px; text-transform: uppercase; line-height: 1.1;">
        {{eventName}}
      </h1>
      
      <div style="display: flex; gap: 32px; margin-bottom: 32px;">
        {{#if showTimes}}
        <div style="flex: 1; background: #1a1a1a; padding: 20px; border-left: 3px solid {{accentColor}};">
          <p style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Race Day</p>
          <p style="font-size: 20px; color: #fff; font-weight: 700; margin: 8px 0 0;">{{date}}</p>
        </div>
        <div style="flex: 1; background: #1a1a1a; padding: 20px; border-left: 3px solid {{accentColor}};">
          <p style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Lights Out</p>
          <p style="font-size: 20px; color: #fff; font-weight: 700; margin: 8px 0 0;">{{time}}</p>
        </div>
        {{/if}}
      </div>
      
      {{#if showVenue}}
      <p style="font-size: 15px; color: #666; margin: 0 0 32px;">📍 {{venue}}</p>
      {{/if}}
      
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: {{accentColor}}; color: #fff; padding: 18px 48px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🏎️ {{eventName}}\n\n🏁 Race Day: {{date}}\n⏰ Lights Out: {{time}}\n📍 {{venue}}\n\n🎟️ {{ctaLink}}`,
  },

  // ==================== PREMIUM EVENT TEMPLATES ====================
  {
    name: 'Award Show Red Carpet',
    category: 'big-events',
    layout_type: 'individual',
    description: 'Ultra-glamorous black and gold with spotlight effects',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'premium', 'gradient'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#d4af37',
      fontHeading: 'Cinzel',
      fontBody: 'Cormorant Garamond',
      fontSizeTitle: 40,
      borderRadius: 0,
      blockShadow: 'deep',
      innerBorderEnabled: true,
      innerBorderColor: '#d4af37',
    },
    html_template: `
<div style="background: radial-gradient(ellipse at top, #1a1a1a 0%, #0a0a0a 100%); padding: 48px; font-family: {{fontBody}}, serif;">
  <div style="max-width: 600px; margin: 0 auto; position: relative;">
    <!-- Spotlight Effect -->
    <div style="position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%); pointer-events: none;"></div>
    
    <div style="position: relative; border: 2px solid {{accentColor}}; padding: 48px; text-align: center; background: linear-gradient(180deg, rgba(212,175,55,0.05) 0%, transparent 100%);">
      <!-- Star Icon -->
      <div style="font-size: 40px; margin-bottom: 16px;">⭐</div>
      
      <p style="font-size: 12px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 6px; margin: 0 0 20px;">Live From Hollywood</p>
      
      <h1 style="font-family: {{fontHeading}}, serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 16px; letter-spacing: 3px;">
        {{eventName}}
      </h1>
      
      <div style="width: 80px; height: 1px; background: linear-gradient(90deg, transparent, {{accentColor}}, transparent); margin: 24px auto;"></div>
      
      {{#if bigEventDescription}}
      <p style="font-size: 16px; color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 32px; font-style: italic;">
        {{bigEventDescription}}
      </p>
      {{/if}}
      
      {{#if showTimes}}
      <div style="background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); padding: 24px; margin-bottom: 32px;">
        <p style="font-size: 11px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 8px;">Red Carpet Begins</p>
        <p style="font-size: 24px; color: #fff; font-weight: 500; margin: 0;">{{date}} at {{time}}</p>
      </div>
      {{/if}}
      
      {{#if showVenue}}
      <p style="font-size: 14px; color: #666; margin: 0 0 32px;">{{venue}}</p>
      {{/if}}
      
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: linear-gradient(135deg, {{accentColor}} 0%, #b8860b 100%); color: #0a0a0a; padding: 18px 56px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; font-size: 14px;">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `⭐ {{eventName}}\n\n🎬 Live From Hollywood\n📅 {{date}} • {{time}}\n📍 {{venue}}\n\n💎 VIP Access: {{ctaLink}}`,
  },

  {
    name: 'Late Night TV',
    category: 'comedy',
    layout_type: 'individual',
    description: 'TV monitor frame aesthetic with recording studio vibe',
    is_system: true,
    is_favorite: false,
    style_tags: ['retro', 'modern', 'bold'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0f0f0f',
      textColor: '#ffffff',
      accentColor: '#00d9ff',
      ctaBackgroundColor: '#00d9ff',
      ctaTextColor: '#0f0f0f',
      fontHeading: 'Space Grotesk',
      fontBody: 'DM Sans',
      fontSizeTitle: 36,
      borderRadius: 8,
      showRecordingBadge: true,
    },
    html_template: `
<div style="background: #0a0a0a; padding: 32px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto;">
    <!-- TV Frame -->
    <div style="background: #1a1a1a; border-radius: 16px; padding: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
      <!-- Screen -->
      <div style="background: #0f0f0f; border-radius: 8px; padding: 40px; position: relative; border: 1px solid #333;">
        <!-- Recording Light -->
        {{#if showRecordingBadge}}
        <div style="position: absolute; top: 16px; right: 16px; display: flex; align-items: center; gap: 8px;">
          <div style="width: 8px; height: 8px; background: #ff0000; border-radius: 50%; box-shadow: 0 0 8px #ff0000;"></div>
          <span style="font-size: 10px; color: #ff0000; text-transform: uppercase; letter-spacing: 2px;">Live Taping</span>
        </div>
        {{/if}}
        
        <div style="text-align: center;">
          <p style="font-size: 12px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 16px;">Tonight's Guest</p>
          
          <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 24px;">
            {{comedianName}}
          </h1>
          
          <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 32px;">
            {{#if showTimes}}
            <div>
              <p style="font-size: 11px; color: #666; margin: 0;">TAPING DATE</p>
              <p style="font-size: 16px; color: #fff; margin: 4px 0 0;">{{date}}</p>
            </div>
            <div style="width: 1px; background: #333;"></div>
            <div>
              <p style="font-size: 11px; color: #666; margin: 0;">DOORS OPEN</p>
              <p style="font-size: 16px; color: #fff; margin: 4px 0 0;">{{time}}</p>
            </div>
            {{/if}}
          </div>
          
          {{#if showVenue}}
          <p style="font-size: 14px; color: #666; margin: 0 0 24px;">📍 {{venue}}</p>
          {{/if}}
          
          {{#if showCta}}
          <a href="{{ctaLink}}" style="display: inline-block; background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; padding: 16px 40px; text-decoration: none; font-weight: 700; border-radius: 6px; text-transform: uppercase; letter-spacing: 1px;">
            {{ctaText}}
          </a>
          {{/if}}
        </div>
      </div>
      
      <!-- TV Stand -->
      <div style="display: flex; justify-content: center; gap: 8px; margin-top: 16px;">
        <div style="width: 60px; height: 6px; background: #333; border-radius: 3px;"></div>
        <div style="width: 60px; height: 6px; background: #333; border-radius: 3px;"></div>
      </div>
    </div>
  </div>
</div>`,
    quick_share_template: `📺 {{comedianName}} - Live Taping!\n\n📅 {{date}}\n⏰ Doors: {{time}}\n📍 {{venue}}\n\n🎟️ Free tickets: {{ctaLink}}`,
  },

  {
    name: 'Festival Poster Vintage',
    category: 'festivals',
    layout_type: 'individual',
    description: 'Vintage concert poster with psychedelic color palette',
    is_system: true,
    is_favorite: false,
    style_tags: ['retro', 'colorful', 'bold'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#1a0a2e',
      textColor: '#ffffff',
      accentColor: '#ff6b35',
      fontHeading: 'Righteous',
      fontBody: 'Work Sans',
      fontSizeTitle: 48,
      borderRadius: 0,
    },
    html_template: `
<div style="background: linear-gradient(180deg, #1a0a2e 0%, #0d051a 100%); padding: 32px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; border: 4px solid #ff6b35; position: relative;">
    <!-- Decorative corners -->
    <div style="position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; border: 2px solid #ffe66d; pointer-events: none;"></div>
    
    <div style="padding: 48px; text-align: center; position: relative;">
      <p style="font-size: 14px; color: #ffe66d; text-transform: uppercase; letter-spacing: 6px; margin: 0 0 16px;">★ Presents ★</p>
      
      <h1 style="font-family: {{fontHeading}}, cursive; font-size: {{fontSizeTitle}}px; color: #ff6b35; margin: 0 0 24px; text-transform: uppercase; line-height: 1; text-shadow: 3px 3px 0 #ffe66d;">
        {{eventName}}
      </h1>
      
      <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 24px;">
        <div style="flex: 1; height: 2px; background: linear-gradient(90deg, transparent, #ff6b35);"></div>
        <span style="font-size: 20px;">🌸</span>
        <div style="flex: 1; height: 2px; background: linear-gradient(90deg, #ff6b35, transparent);"></div>
      </div>
      
      <div style="background: rgba(255,107,53,0.1); border: 1px solid rgba(255,107,53,0.3); padding: 24px; margin-bottom: 24px;">
        <p style="font-size: 11px; color: #ffe66d; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 8px;">Multiple Stages • All Day Event</p>
        {{#if showTimes}}
        <p style="font-size: 28px; color: #fff; font-weight: 700; margin: 0;">{{date}}</p>
        <p style="font-size: 16px; color: #888; margin: 8px 0 0;">Gates Open {{time}}</p>
        {{/if}}
      </div>
      
      {{#if showVenue}}
      <p style="font-size: 16px; color: #ffe66d; margin: 0 0 32px;">📍 {{venue}}</p>
      {{/if}}
      
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: linear-gradient(135deg, #ff6b35 0%, #ffe66d 100%); color: #1a0a2e; padding: 18px 56px; text-decoration: none; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 16px;">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🌸 {{eventName}}\n\n📅 {{date}}\n⏰ Gates: {{time}}\n📍 {{venue}}\n\n🎟️ {{ctaLink}}`,
  },

  {
    name: 'Brutalist Modern',
    category: 'concerts',
    layout_type: 'individual',
    description: 'Ultra bold Swiss design with massive typography',
    is_system: true,
    is_favorite: false,
    style_tags: ['modern', 'minimal', 'bold'],
    theme_mode: 'light',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#ffffff',
      textColor: '#000000',
      accentColor: '#ff0000',
      fontHeading: 'Anton',
      fontBody: 'IBM Plex Mono',
      fontSizeTitle: 64,
      borderRadius: 0,
      cardStyle: 'brutalist',
    },
    html_template: `
<div style="background: #fff; padding: 0; font-family: {{fontBody}}, monospace;">
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="padding: 48px; border-bottom: 8px solid #000;">
      <p style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 24px;">001 / Live Event</p>
      
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: #000; margin: 0; text-transform: uppercase; line-height: 0.9; letter-spacing: -2px;">
        {{eventName}}
      </h1>
    </div>
    
    <div style="display: flex; border-bottom: 4px solid #000;">
      <div style="flex: 1; padding: 24px; border-right: 4px solid #000;">
        <p style="font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Date</p>
        <p style="font-size: 18px; color: #000; font-weight: 700; margin: 0;">{{date}}</p>
      </div>
      <div style="flex: 1; padding: 24px;">
        <p style="font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Time</p>
        <p style="font-size: 18px; color: #000; font-weight: 700; margin: 0;">{{time}}</p>
      </div>
    </div>
    
    {{#if showVenue}}
    <div style="padding: 24px; border-bottom: 4px solid #000;">
      <p style="font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Location</p>
      <p style="font-size: 16px; color: #000; margin: 0;">{{venue}}</p>
    </div>
    {{/if}}
    
    {{#if showCta}}
    <div style="padding: 24px;">
      <a href="{{ctaLink}}" style="display: block; background: #000; color: #fff; padding: 24px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; text-align: center; font-size: 16px;">
        {{ctaText}} →
      </a>
    </div>
    {{/if}}
  </div>
</div>`,
    quick_share_template: `{{eventName}}\n\n{{date}} // {{time}}\n{{venue}}\n\n{{ctaLink}}`,
  },

  // ==================== ENHANCED ADD-ONS ====================
  {
    name: 'Platinum All-Access',
    category: 'wristbands',
    add_on_type: 'wristband-platinum',
    layout_type: 'add-on',
    description: 'Holographic gradient premium wristband with all-access messaging',
    is_system: true,
    is_favorite: false,
    style_tags: ['premium', 'gradient', 'elegant'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#e0e0e0',
      fontHeading: 'Montserrat',
      fontBody: 'DM Sans',
      fontSizeTitle: 28,
      borderRadius: 16,
      blockShadow: 'deep',
    },
    html_template: `
<div style="background: #0a0a0a; padding: 32px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto;">
    <!-- Holographic Card -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%); padding: 3px; border-radius: 20px; box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);">
      <div style="background: #0a0a0a; border-radius: 18px; padding: 40px; text-align: center;">
        <div style="display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); padding: 8px 24px; border-radius: 20px; margin-bottom: 24px;">
          <span style="font-size: 11px; color: #fff; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">✦ Platinum Access ✦</span>
        </div>
        
        <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 8px; font-weight: 800;">
          ALL-ACCESS WRISTBAND
        </h1>
        
        <p style="font-size: 16px; color: #888; margin: 0 0 32px;">{{parentEventName}}</p>
        
        <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <p style="font-size: 11px; color: #667eea; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px;">Includes Access To</p>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;">
            <span style="background: rgba(102,126,234,0.2); color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px;">VIP Lounge</span>
            <span style="background: rgba(102,126,234,0.2); color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px;">Backstage</span>
            <span style="background: rgba(102,126,234,0.2); color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px;">Early Entry</span>
            <span style="background: rgba(102,126,234,0.2); color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px;">Meet & Greet</span>
          </div>
        </div>
        
        {{#if showValidDays}}
        <p style="font-size: 13px; color: #666; margin: 0 0 24px;">Valid: {{validDays}}</p>
        {{/if}}
        
        {{#if showCta}}
        <a href="{{ctaLink}}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 16px 48px; text-decoration: none; font-weight: 700; border-radius: 30px; text-transform: uppercase; letter-spacing: 2px; font-size: 14px;">
          {{ctaText}}
        </a>
        {{/if}}
      </div>
    </div>
  </div>
</div>`,
    quick_share_template: `✦ PLATINUM ALL-ACCESS ✦\n{{parentEventName}}\n\n🎫 VIP Lounge • Backstage • Early Entry • Meet & Greet\n📅 Valid: {{validDays}}\n\n💎 {{ctaLink}}`,
  },

  {
    name: 'Suite & Box Access',
    category: 'hospitality',
    add_on_type: 'club-suite',
    layout_type: 'add-on',
    description: 'Corporate hospitality with executive suite aesthetic',
    is_system: true,
    is_favorite: false,
    style_tags: ['elegant', 'premium', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#0d1117',
      textColor: '#ffffff',
      accentColor: '#c9a227',
      fontHeading: 'Cinzel',
      fontBody: 'Source Sans Pro',
      fontSizeTitle: 26,
      borderRadius: 8,
      innerBorderEnabled: true,
      innerBorderColor: '#c9a227',
    },
    html_template: `
<div style="background: #0d1117; padding: 32px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 520px; margin: 0 auto; border: 1px solid #c9a227; position: relative;">
    <!-- Corner accents -->
    <div style="position: absolute; top: -1px; left: -1px; width: 24px; height: 24px; border-top: 3px solid #c9a227; border-left: 3px solid #c9a227;"></div>
    <div style="position: absolute; top: -1px; right: -1px; width: 24px; height: 24px; border-top: 3px solid #c9a227; border-right: 3px solid #c9a227;"></div>
    <div style="position: absolute; bottom: -1px; left: -1px; width: 24px; height: 24px; border-bottom: 3px solid #c9a227; border-left: 3px solid #c9a227;"></div>
    <div style="position: absolute; bottom: -1px; right: -1px; width: 24px; height: 24px; border-bottom: 3px solid #c9a227; border-right: 3px solid #c9a227;"></div>
    
    <div style="padding: 48px; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 16px;">🏛️</div>
      
      <p style="font-size: 11px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 16px;">Executive Experience</p>
      
      <h1 style="font-family: {{fontHeading}}, serif; font-size: {{fontSizeTitle}}px; color: {{textColor}}; margin: 0 0 8px; letter-spacing: 2px;">
        PRIVATE SUITE ACCESS
      </h1>
      
      <p style="font-size: 15px; color: #888; margin: 0 0 32px;">{{parentEventName}}</p>
      
      <div style="background: rgba(201,162,39,0.08); border: 1px solid rgba(201,162,39,0.2); padding: 24px; margin-bottom: 32px;">
        <p style="font-size: 11px; color: {{accentColor}}; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px;">Suite Amenities</p>
        <div style="text-align: left; font-size: 14px; color: #ccc; line-height: 2;">
          ✓ Private viewing suite for up to 12 guests<br/>
          ✓ Premium catering & open bar<br/>
          ✓ Dedicated suite attendant<br/>
          ✓ VIP parking access<br/>
          ✓ Exclusive entrance
        </div>
      </div>
      
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: inline-block; background: linear-gradient(135deg, #c9a227 0%, #9a7b1a 100%); color: #0d1117; padding: 18px 48px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 14px;">
        {{ctaText}}
      </a>
      {{/if}}
      
      <p style="font-size: 12px; color: #666; margin: 24px 0 0;">Contact concierge for availability</p>
    </div>
  </div>
</div>`,
    quick_share_template: `🏛️ PRIVATE SUITE ACCESS\n{{parentEventName}}\n\n✓ Suite for 12 guests\n✓ Premium catering & bar\n✓ VIP parking\n\n💎 {{ctaLink}}`,
  },

  {
    name: 'Premium Parking Pass',
    category: 'parking',
    add_on_type: 'parking',
    layout_type: 'add-on',
    description: 'Premium lot parking with map preview and guaranteed spot',
    is_system: true,
    is_favorite: false,
    style_tags: ['modern', 'minimal', 'dark'],
    theme_mode: 'dark',
    config: {
      ...defaultTemplateConfig,
      backgroundColor: '#111827',
      textColor: '#ffffff',
      accentColor: '#10b981',
      fontHeading: 'Space Grotesk',
      fontBody: 'DM Sans',
      fontSizeTitle: 24,
      borderRadius: 12,
      showLotMap: true,
    },
    html_template: `
<div style="background: #111827; padding: 32px; font-family: {{fontBody}}, sans-serif;">
  <div style="max-width: 480px; margin: 0 auto; background: #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.4);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 24px; text-align: center;">
      <span style="font-size: 32px;">🅿️</span>
      <h1 style="font-family: {{fontHeading}}, sans-serif; font-size: {{fontSizeTitle}}px; color: #fff; margin: 12px 0 0; font-weight: 700;">
        PREMIUM PARKING
      </h1>
    </div>
    
    <div style="padding: 32px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #9ca3af; margin: 0 0 4px;">Valid For</p>
        <p style="font-size: 18px; color: #fff; font-weight: 600; margin: 0;">{{parentEventName}}</p>
      </div>
      
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <div style="flex: 1; background: #111827; padding: 16px; border-radius: 8px; text-align: center;">
          <p style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px;">Lot</p>
          <p style="font-size: 20px; color: {{accentColor}}; font-weight: 700; margin: 0;">{{lotName}}</p>
        </div>
        <div style="flex: 1; background: #111827; padding: 16px; border-radius: 8px; text-align: center;">
          <p style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px;">Type</p>
          <p style="font-size: 20px; color: #fff; font-weight: 700; margin: 0;">Guaranteed</p>
        </div>
      </div>
      
      <div style="background: #111827; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 20px;">📍</span>
          <div>
            <p style="font-size: 13px; color: #9ca3af; margin: 0 0 2px;">Walking Distance</p>
            <p style="font-size: 15px; color: #fff; margin: 0;">~5 min to venue entrance</p>
          </div>
        </div>
      </div>
      
      {{#if showCta}}
      <a href="{{ctaLink}}" style="display: block; background: {{accentColor}}; color: #fff; padding: 16px; text-decoration: none; font-weight: 700; border-radius: 8px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
        {{ctaText}}
      </a>
      {{/if}}
    </div>
  </div>
</div>`,
    quick_share_template: `🅿️ PREMIUM PARKING\n{{parentEventName}}\n\n📍 {{lotName}} - Guaranteed Spot\n🚶 ~5 min walk to venue\n\n🎟️ {{ctaLink}}`,
  },
];
