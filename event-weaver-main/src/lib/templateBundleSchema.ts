/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TEMPLATE BUNDLE IMPORT SCHEMA
 * For External AI/Codex Template Generation
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * A Template Bundle is a complete package containing all viewport and theme
 * variants needed to display a template across different devices and color schemes.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * BUNDLE STRUCTURE (6 Variants)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Each bundle renders as 6 variants combining viewport × theme:
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  DESKTOP DARK                                                    (600px)   │
 * │  Full-width email layout with dark background, light text                  │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  DESKTOP LIGHT                                                   (600px)   │
 * │  Full-width email layout with light background, dark text                  │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * ┌───────────────────┬───────────────────┬─────────────────────────────────────┐
 * │  TABLET DARK      │  TABLET LIGHT     │  MOBILE DARK     │  MOBILE LIGHT   │
 * │  (380px)          │  (380px)          │  (200px)         │  (200px)        │
 * │                   │                   │                  │                 │
 * │  Medium layout    │  Medium layout    │  Compact         │  Compact        │
 * │  2-col grids      │  2-col grids      │  Single-col      │  Single-col     │
 * │  Tighter spacing  │  Tighter spacing  │  Stacked rows    │  Stacked rows   │
 * └───────────────────┴───────────────────┴──────────────────┴─────────────────┘
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * VIEWPORT DIMENSIONS & TYPOGRAPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const RESPONSIVE_BREAKPOINTS = {
  desktop: {
    width: "100%",           // Full container width
    maxWidth: "600px",       // Email standard max
    description: "Full email layout - magazine-style arrangements, multi-column grids, hero images",
    typography: {
      titleSize: "24-32px",
      subtitleSize: "16-20px",
      bodySize: "14-16px",
      captionSize: "11-13px",
      letterSpacing: "normal to wide",
      lineHeight: "1.4-1.6"
    },
    layout: {
      padding: "24-40px",
      gap: "16-24px",
      columns: "1-4 columns",
      cardStyle: "full featured with all elements"
    }
  },
  tablet: {
    width: "380px",
    description: "Medium layout - 2-column grids, condensed headers, tighter spacing",
    typography: {
      titleSize: "18-24px",
      subtitleSize: "14-16px",
      bodySize: "12-14px",
      captionSize: "10-11px",
      letterSpacing: "normal to tight",
      lineHeight: "1.3-1.5"
    },
    layout: {
      padding: "16-24px",
      gap: "12-16px",
      columns: "1-2 columns",
      cardStyle: "condensed with essential elements"
    }
  },
  mobile: {
    width: "200px",
    description: "Compact layout - single column, stacked elements, minimal spacing",
    typography: {
      titleSize: "14-18px",
      subtitleSize: "11-14px",
      bodySize: "10-12px",
      captionSize: "8-10px",
      letterSpacing: "tight",
      lineHeight: "1.2-1.4"
    },
    layout: {
      padding: "12-16px",
      gap: "8-12px",
      columns: "1 column only",
      cardStyle: "minimal with key info only"
    }
  }
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * THEME MODE RULES
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * DARK MODE (default):
 * - Use template's original colors as defined in config
 * - Typically: dark backgrounds (#0a0a0a to #1a1a1a), light text (#ffffff)
 * - Accents: gold/amber (#d4af37), team colors, or brand colors
 * 
 * LIGHT MODE (inverted):
 * - Background: #ffffff or very light (#f5f5f5)
 * - Text: #1a1a1a or dark gray (#333333)
 * - Borders: rgba(0,0,0,0.1) or light gray
 * - Accents: maintain saturation but adjust for contrast on white
 * 
 * The system auto-generates light mode by inverting dark mode colors,
 * but you can provide explicit overrides in variant_overrides.
 */

export const THEME_OVERRIDE_RULES = {
  dark: {
    description: "Original template colors - typically dark background with light text",
    defaults: {
      backgroundColor: "#0a0a0a",
      textColor: "#ffffff",
      mutedTextColor: "#a0a0a0",
      borderColor: "rgba(255,255,255,0.1)",
      cardBackground: "#1a1a1a"
    }
  },
  light: {
    description: "Inverted colors - white/light background with dark text",
    defaults: {
      backgroundColor: "#ffffff",
      textColor: "#1a1a1a",
      mutedTextColor: "#666666",
      borderColor: "rgba(0,0,0,0.1)",
      cardBackground: "#f5f5f5"
    }
  }
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FLEXIBLE ELEMENTS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Everything within each variant is customizable. These are the main categories:
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CREATIVE FREEDOM NOTICE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * EVERYTHING IS CUSTOMIZABLE. The examples below are just that - examples.
 * You have COMPLETE CREATIVE FREEDOM to:
 * 
 * - Use ANY Google Font (there are 1500+ available)
 * - Use ANY font size (8px to 200px, whatever works)
 * - Use ANY color (hex, hsl, rgb, named colors)
 * - Create ANY layout structure (flexbox, grid, absolute positioning)
 * - Design ANY visual style (brutalist, elegant, playful, corporate, etc.)
 * - Mix and match ANY combination of elements
 * 
 * The schema defines WHAT can be configured, not HOW it should look.
 * Be bold. Be creative. Make something unique.
 */

export const FLEXIBLE_ELEMENTS = {
  typography: {
    creative_freedom: "USE ANY GOOGLE FONT. Any size. Any weight. Any style.",
    properties: {
      fontHeading: {
        type: "string",
        description: "ANY Google Font name for headings",
        examples: ["Oswald", "Bebas Neue", "Playfair Display", "Abril Fatface", "Righteous", "Bangers", "Permanent Marker", "Cinzel", "Staatliches", "Anton", "Alfa Slab One", "Fugaz One"],
        note: "Browse all 1500+ fonts at fonts.google.com"
      },
      fontBody: {
        type: "string",
        description: "ANY Google Font name for body text",
        examples: ["Inter", "DM Sans", "Roboto", "Lato", "Source Sans Pro", "Nunito", "Work Sans", "Karla", "Rubik", "Manrope", "Plus Jakarta Sans"],
        note: "Mix display fonts with readable body fonts"
      },
      fontSizeTitle: {
        type: "number | string",
        description: "ANY size - pixels, rem, em, vw, whatever",
        examples: ["14px", "32px", "72px", "4rem", "5vw"],
        note: "Go small for dense info, huge for impact"
      },
      fontSizeBody: {
        type: "number | string",
        description: "ANY size for body text",
        examples: ["10px", "14px", "16px", "18px", "1rem"]
      },
      fontSizeSubtitle: {
        type: "number | string",
        description: "ANY size for subtitles/secondary headings"
      },
      fontWeight: {
        type: "number | string",
        description: "ANY weight from 100 to 900, or keywords",
        examples: [100, 300, 400, 500, 600, 700, 800, 900, "normal", "bold", "black"]
      },
      letterSpacing: {
        type: "string",
        description: "ANY letter spacing",
        examples: ["-0.05em", "0", "0.05em", "0.1em", "0.2em", "0.5em"]
      },
      lineHeight: {
        type: "number | string",
        description: "ANY line height",
        examples: [1, 1.2, 1.4, 1.6, 2, "tight", "normal", "loose"]
      },
      textTransform: {
        type: "string",
        description: "ANY text transform",
        examples: ["none", "uppercase", "lowercase", "capitalize"]
      },
      fontStyle: {
        type: "string",
        examples: ["normal", "italic", "oblique"]
      }
    }
  },
  
  colors: {
    creative_freedom: "USE ANY COLORS. Any format. Any combination.",
    properties: {
      backgroundColor: {
        type: "string",
        description: "ANY background color or gradient",
        examples: ["#0a0a0a", "#ffffff", "rgb(255,0,100)", "hsl(220, 50%, 10%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "radial-gradient(circle, #1a1a2e, #0a0a0a)"]
      },
      textColor: {
        type: "string",
        description: "ANY text color",
        examples: ["#ffffff", "#1a1a1a", "#d4af37", "rgba(255,255,255,0.9)"]
      },
      accentColor: {
        type: "string",
        description: "ANY accent/highlight color",
        examples: ["#d4af37", "#ff6b6b", "#4ecdc4", "#45b7d1", "#f39c12", "#e74c3c", "#9b59b6", "#1abc9c"]
      },
      secondaryColor: { type: "string", description: "ANY secondary color" },
      mutedColor: { type: "string", description: "ANY muted/subtle color" },
      borderColor: { type: "string", description: "ANY border color" },
      shadowColor: { type: "string", description: "ANY shadow color" },
      gradientStart: { type: "string" },
      gradientEnd: { type: "string" },
      gradientAngle: { type: "number", examples: [0, 45, 90, 135, 180] }
    }
  },
  
  buttons: {
    creative_freedom: "DESIGN ANY BUTTON STYLE. Pills, blocks, links, icons, gradients, borders.",
    properties: {
      ctaEnabled: { type: "boolean" },
      ctaText: {
        type: "string",
        examples: ["Get Tickets", "Buy Now", "View Details", "RSVP", "Book Now", "Shop", "Explore", "Join", "Subscribe"]
      },
      ctaStyle: {
        type: "string",
        examples: ["button", "pill", "link", "underline", "ghost", "outline", "gradient", "glow", "block"]
      },
      ctaColor: { type: "string" },
      ctaTextColor: { type: "string" },
      ctaBorderRadius: { type: "string", examples: ["0", "4px", "8px", "20px", "9999px"] },
      ctaPadding: { type: "string", examples: ["8px 16px", "12px 24px", "16px 32px"] },
      ctaIcon: { type: "boolean", description: "Show icon (arrow, ticket, etc.)" },
      ctaIconPosition: { type: "string", examples: ["left", "right"] },
      // Dual CTAs
      showTicketsCta: { type: "boolean" },
      showEmailCta: { type: "boolean" },
      ticketsCtaText: { type: "string" },
      emailCtaText: { type: "string" }
    }
  },
  
  layout: {
    creative_freedom: "CREATE ANY LAYOUT. Grid, flex, absolute, overlap, asymmetric, whatever.",
    properties: {
      layout_style: {
        type: "string",
        description: "For GROUP templates - but feel free to invent new styles",
        examples: ["list-minimal", "list-detailed", "two-column-table", "magazine-hero", "sports-outline", "card-grid", "timeline", "calendar-strip", "bio-split", "combined-block", "mosaic", "masonry", "carousel", "accordion"]
      },
      padding: {
        type: "string",
        examples: ["0", "8px", "16px", "24px", "32px", "48px", "64px"]
      },
      margin: { type: "string" },
      gap: {
        type: "string",
        examples: ["0", "4px", "8px", "12px", "16px", "24px", "32px"]
      },
      borderRadius: {
        type: "string",
        examples: ["0", "2px", "4px", "8px", "12px", "16px", "24px", "9999px"]
      },
      border: {
        type: "string",
        examples: ["none", "1px solid #333", "2px solid gold", "3px double #fff"]
      },
      columns: {
        type: "number | string",
        examples: [1, 2, 3, 4, "auto-fit", "auto-fill"]
      },
      display: {
        type: "string",
        examples: ["block", "flex", "grid", "inline-flex", "inline-grid"]
      },
      flexDirection: { type: "string", examples: ["row", "column", "row-reverse"] },
      justifyContent: { type: "string", examples: ["start", "center", "end", "space-between", "space-around"] },
      alignItems: { type: "string", examples: ["start", "center", "end", "stretch"] },
      position: { type: "string", examples: ["relative", "absolute", "fixed", "sticky"] },
      overflow: { type: "string", examples: ["visible", "hidden", "scroll", "auto"] }
    }
  },
  
  frames: {
    creative_freedom: "ADD ANY DECORATIVE EFFECTS. Borders, shadows, glows, overlays.",
    properties: {
      innerBorderEnabled: { type: "boolean" },
      innerBorderColor: { type: "string" },
      innerBorderWidth: { type: "string", examples: ["1px", "2px", "3px", "4px"] },
      innerBorderInset: { type: "string", examples: ["8px", "12px", "16px", "24px"] },
      enableSportsFrame: { type: "boolean", description: "Double-border sports-style frame" },
      sportsAutoPalette: { type: "boolean", description: "Auto-apply team colors from event data" },
      sportsOuterColor: { type: "string" },
      sportsInnerColor: { type: "string" },
      sportsGapThickness: { type: "number", examples: [2, 3, 4, 6, 8] },
      boxShadow: {
        type: "string",
        examples: ["none", "0 4px 6px rgba(0,0,0,0.1)", "0 10px 40px rgba(0,0,0,0.5)", "0 0 30px rgba(212,175,55,0.3)", "inset 0 2px 4px rgba(0,0,0,0.1)"]
      },
      backdropFilter: { type: "string", examples: ["none", "blur(10px)", "blur(20px) saturate(180%)"] },
      opacity: { type: "number", examples: [0.5, 0.7, 0.9, 1] },
      transform: { type: "string", examples: ["none", "rotate(2deg)", "scale(1.02)", "skewX(-2deg)"] }
    }
  },
  
  visibility: {
    creative_freedom: "SHOW OR HIDE ANY ELEMENT. Mix and match what appears.",
    properties: {
      showImages: { type: "boolean" },
      showPrices: { type: "boolean" },
      showVenue: { type: "boolean" },
      showMatchup: { type: "boolean" },
      showHeaderDetail: { type: "boolean" },
      showTimePerRow: { type: "boolean" },
      showDate: { type: "boolean" },
      showTime: { type: "boolean" },
      showDescription: { type: "boolean" },
      showPerformerBio: { type: "boolean" },
      showSeatmap: { type: "boolean" },
      heroImageMode: {
        type: "string",
        examples: ["hidden", "header", "background", "side", "overlay", "fullbleed"]
      }
    }
  },
  
  eventData: {
    description: "Available placeholders for dynamic event content (Handlebars syntax)",
    core: [
      "{{eventName}} - Event title/name",
      "{{eventId}} - Unique event identifier",
      "{{eventCode}} - Short event code"
    ],
    dateTime: [
      "{{eventDate}} - Full formatted date",
      "{{eventDay}} - Day of week (e.g., 'Saturday')",
      "{{eventDayShort}} - Short day (e.g., 'Sat')",
      "{{eventMonthYear}} - Month and year",
      "{{eventTime}} - Event time",
      "{{timezone}} - Timezone abbreviation"
    ],
    location: [
      "{{venue}} - Venue name",
      "{{venueAddress}} - Full venue address",
      "{{city}} - City name",
      "{{state}} - State/region",
      "{{venueMapUrl}} - Google Maps link"
    ],
    media: [
      "{{imageUrl}} - Primary event image",
      "{{imageHero}} - Hero/banner image",
      "{{seatmapUrl}} - Seating chart image",
      "{{logoUrl}} - Event/team logo",
      "{{performerPhoto}} - Artist/performer photo"
    ],
    pricing: [
      "{{priceMin}} - Minimum ticket price",
      "{{priceMax}} - Maximum ticket price",
      "{{priceDisplay}} - Formatted price range"
    ],
    links: [
      "{{ticketLink}} - Buy tickets URL",
      "{{websiteUrl}} - Event website",
      "{{conciergeEmail}} - Email concierge mailto link"
    ],
    sports: [
      "{{homeTeam}} - Home team name",
      "{{awayTeam}} - Away team name",
      "{{opponent}} - Opponent name",
      "{{homeTeamLogo}} - Home team logo URL",
      "{{awayTeamLogo}} - Away team logo URL",
      "{{teamHomePrimaryColor}} - Home team primary color",
      "{{teamAwayPrimaryColor}} - Away team primary color",
      "{{isPlayoff}} - Boolean for playoff game",
      "{{league}} - League name (NBA, NFL, etc.)"
    ],
    performer: [
      "{{performerName}} - Artist/performer name",
      "{{performerBio}} - Artist biography",
      "{{genre}} - Music genre or category"
    ],
    group: [
      "{{groupTitle}} - Group/series title",
      "{{eventCount}} - Number of events in group",
      "{{#each events}}...{{/each}} - Loop through events"
    ]
  }
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * IMAGE SOURCES
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Images are fetched from multiple sources and available via placeholders.
 * External AI can reference these or provide custom URLs.
 */

export const IMAGE_SOURCES = {
  ticketmaster_api: {
    description: "Hero images fetched via Ticketmaster Discovery API",
    how_it_works: "System searches by event name, team, or venue and caches best match",
    placeholder: "{{imageUrl}}",
    sizes: ["640x360 (16:9)", "1024x576 (16:9)", "305x225 (retina)"],
    fallback: "Generic event category image if no match found"
  },
  
  wikipedia_api: {
    description: "Performer photos and bios from Wikipedia",
    how_it_works: "Auto-fetch artist/performer Wikipedia page image and intro paragraph",
    placeholders: {
      photo: "{{performerPhoto}}",
      bio: "{{performerBio}}"
    },
    use_case: "Concerts, comedy shows, theater - adds context about the performer"
  },
  
  custom_url: {
    description: "Any external image URL can be used",
    how_it_works: "Paste Cloudinary, Imgur, CDN, or any https:// image URL",
    placeholder: "{{customImageUrl}}",
    supported_formats: ["jpg", "png", "webp", "gif"],
    note: "Custom URLs override API-fetched images"
  },
  
  team_logos: {
    description: "Sports team logos from cached database",
    placeholders: {
      home: "{{homeTeamLogo}}",
      away: "{{awayTeamLogo}}",
      primary: "{{logoUrl}}"
    },
    source: "Cached from official league sources, sized 200x200"
  },
  
  seatmap: {
    description: "Venue seating charts from Ticketmaster",
    placeholder: "{{seatmapUrl}}",
    how_it_works: "Fetched per-event from TM API when available"
  },
  
  hero_image_modes: {
    description: "Control how hero images display in templates",
    options: [
      "hidden - No hero image",
      "header - Full-width header banner",
      "background - Behind content with overlay",
      "side - Left or right sidebar image",
      "overlay - Layered with transparency",
      "fullbleed - Edge-to-edge bleed"
    ],
    config_property: "heroImageMode"
  }
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LINK PATTERNS - First Class Tixx URLs
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * All customer-facing links direct to First Class Tixx, never Ticketmaster.
 */

export const LINK_PATTERNS = {
  search_url: {
    description: "Search results page for an event/performer/team",
    pattern: "https://www.firstclasstixx.com/search?q={{urlEncode query}}",
    examples: [
      "https://www.firstclasstixx.com/search?q=Lakers",
      "https://www.firstclasstixx.com/search?q=Taylor+Swift",
      "https://www.firstclasstixx.com/search?q=Super+Bowl"
    ],
    placeholder: "{{searchUrl}}",
    use_in_html: '<a href="https://www.firstclasstixx.com/search?q={{urlEncode eventName}}">Search Tickets</a>'
  },
  
  event_ticket_url: {
    description: "Direct link to specific event ticket page",
    pattern: "https://www.firstclasstixx.com/events/{{eventId}}",
    placeholder: "{{ticketLink}}",
    note: "System auto-generates from event data - use placeholder in templates"
  },
  
  website_url: {
    description: "First Class Tixx homepage or category pages",
    examples: [
      "https://www.firstclasstixx.com",
      "https://www.firstclasstixx.com/sports",
      "https://www.firstclasstixx.com/concerts"
    ],
    placeholder: "{{websiteUrl}}"
  },
  
  venue_map_url: {
    description: "Google Maps link to venue",
    pattern: "https://maps.google.com/?q={{urlEncode venueAddress}}",
    placeholder: "{{venueMapUrl}}",
    use_in_html: '<a href="{{venueMapUrl}}">📍 Get Directions</a>'
  }
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * EMAIL CONCIERGE PRE-FILL PATTERN
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Pre-filled mailto: links for concierge contact with event details.
 */

export const EMAIL_CONCIERGE_PATTERN = {
  mailto_structure: {
    description: "Pre-filled email to concierge with event context",
    pattern: "mailto:concierge@firstclasstixx.com?subject={{subject}}&body={{body}}",
    
    subject_format: "{{eventName}} | {{eventDate}}",
    subject_examples: [
      "Lakers vs Celtics | Sat, Jan 18",
      "Taylor Swift - Eras Tour | Friday, August 9",
      "Super Bowl LVIII | February 11, 2024"
    ],
    
    body_format: `Hi First Class Tixx,

I'm interested in tickets for:

Event: {{eventName}}
Date: {{eventDate}}
Venue: {{venue}}

Please let me know available options and pricing.

Thanks!`,
    
    placeholder: "{{conciergeEmail}}",
    
    html_examples: [
      // Simple link
      '<a href="{{conciergeEmail}}">✉ Email Concierge</a>',
      
      // Button style
      '<a href="{{conciergeEmail}}" style="background: #d4af37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px;">📧 Contact Concierge</a>',
      
      // Inline with icon
      '<a href="{{conciergeEmail}}" style="color: #d4af37; text-decoration: underline;">✉ Email Us About This Event</a>'
    ]
  },
  
  manual_mailto_construction: {
    description: "If building mailto manually instead of using {{conciergeEmail}} placeholder",
    template: `mailto:concierge@firstclasstixx.com?subject={{urlEncode eventName}}%20%7C%20{{urlEncode eventDate}}&body=Hi%20First%20Class%20Tixx%2C%0A%0AI'm%20interested%20in%20tickets%20for%3A%0A%0AEvent%3A%20{{urlEncode eventName}}%0ADate%3A%20{{urlEncode eventDate}}%0AVenue%3A%20{{urlEncode venue}}%0A%0APlease%20let%20me%20know%20available%20options.%0A%0AThanks!`,
    note: "Use {{conciergeEmail}} placeholder when possible - it handles encoding automatically"
  },
  
  config_options: {
    conciergeLabel: "Custom label text (default: 'Email Concierge')",
    conciergeColor: "Link/button color",
    conciergeUnderline: "boolean - underline style",
    conciergeIcon: "boolean - show ✉ icon"
  }
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SAMPLE EVENT DATA (What's Available at Runtime)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This shows actual data that populates placeholders when templates render.
 */

export const SAMPLE_EVENT_DATA = {
  sports_game: {
    eventName: "Los Angeles Lakers vs Boston Celtics",
    eventId: "vvG1HZ9p8Bk4Gq",
    eventCode: "LAL-BOS-0118",
    eventDate: "Saturday, January 18, 2025",
    eventDay: "Saturday",
    eventDayShort: "Sat",
    eventMonthYear: "January 2025",
    eventTime: "7:30 PM",
    timezone: "PST",
    venue: "Crypto.com Arena",
    venueAddress: "1111 S Figueroa St, Los Angeles, CA 90015",
    city: "Los Angeles",
    state: "CA",
    homeTeam: "Los Angeles Lakers",
    awayTeam: "Boston Celtics",
    opponent: "Boston Celtics",
    league: "NBA",
    isPlayoff: false,
    teamHomePrimaryColor: "#552583",
    teamAwayPrimaryColor: "#007A33",
    homeTeamLogo: "https://cdn.firstclasstixx.com/logos/nba/lakers.png",
    awayTeamLogo: "https://cdn.firstclasstixx.com/logos/nba/celtics.png",
    imageUrl: "https://s1.ticketm.net/dam/a/1a5/event-image-1a5.jpg",
    seatmapUrl: "https://s1.ticketm.net/dam/a/seatmap-arena.png",
    priceMin: 125,
    priceMax: 2500,
    priceDisplay: "$125 - $2,500",
    ticketLink: "https://www.firstclasstixx.com/events/vvG1HZ9p8Bk4Gq",
    searchUrl: "https://www.firstclasstixx.com/search?q=Lakers+vs+Celtics",
    venueMapUrl: "https://maps.google.com/?q=1111+S+Figueroa+St+Los+Angeles+CA",
    conciergeEmail: "mailto:concierge@firstclasstixx.com?subject=Lakers%20vs%20Celtics%20%7C%20Sat%2C%20Jan%2018&body=Hi%20First%20Class%20Tixx%2C%0A%0AI'm%20interested%20in%20tickets%20for%20Lakers%20vs%20Celtics%20at%20Crypto.com%20Arena%20on%20Saturday%2C%20January%2018.%0A%0APlease%20let%20me%20know%20available%20options.%0A%0AThanks!",
    websiteUrl: "https://www.firstclasstixx.com"
  },
  
  concert: {
    eventName: "Taylor Swift - The Eras Tour",
    eventId: "vvG1YZ4QKt8sXY",
    eventDate: "Friday, August 9, 2025",
    eventTime: "7:00 PM",
    venue: "SoFi Stadium",
    venueAddress: "1001 Stadium Dr, Inglewood, CA 90301",
    performerName: "Taylor Swift",
    performerPhoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/taylor_swift.jpg",
    performerBio: "Taylor Alison Swift is an American singer-songwriter. Recognized for her genre-spanning discography, songwriting, and artistic reinventions, Swift is a prominent cultural figure.",
    genre: "Pop",
    imageUrl: "https://s1.ticketm.net/dam/a/taylor-eras-tour.jpg",
    priceDisplay: "$250 - $5,000+",
    ticketLink: "https://www.firstclasstixx.com/events/vvG1YZ4QKt8sXY",
    searchUrl: "https://www.firstclasstixx.com/search?q=Taylor+Swift",
    conciergeEmail: "mailto:concierge@firstclasstixx.com?subject=Taylor%20Swift%20Eras%20Tour%20%7C%20Aug%209&body=..."
  },
  
  group_events: {
    groupTitle: "Lakers Home Games - January 2025",
    eventCount: 8,
    events: [
      { eventName: "Lakers vs Celtics", eventDate: "Sat, Jan 18", eventTime: "7:30 PM" },
      { eventName: "Lakers vs Warriors", eventDate: "Mon, Jan 20", eventTime: "7:00 PM" },
      { eventName: "Lakers vs Nuggets", eventDate: "Wed, Jan 22", eventTime: "7:30 PM" }
      // ... additional events
    ]
  }
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * JSON SCHEMA FOR IMPORT
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const TEMPLATE_BUNDLE_SCHEMA = {
  "$schema": "Template Bundle Schema v1.0",
  "$description": "Complete template bundle with all viewport/theme variants for FCT email system",
  
  bundle_structure: {
    description: "A Template Bundle contains 6 responsive/theme variants",
    variants: [
      { id: "desktop_dark", viewport: "desktop", width: "600px", theme: "dark", row: 1 },
      { id: "desktop_light", viewport: "desktop", width: "600px", theme: "light", row: 2 },
      { id: "tablet_dark", viewport: "tablet", width: "380px", theme: "dark", row: 3, column: 1 },
      { id: "tablet_light", viewport: "tablet", width: "380px", theme: "light", row: 3, column: 2 },
      { id: "mobile_dark", viewport: "mobile", width: "200px", theme: "dark", row: 3, column: 3, stack: "top" },
      { id: "mobile_light", viewport: "mobile", width: "200px", theme: "light", row: 3, column: 3, stack: "bottom" }
    ]
  },

  display_layout: {
    description: "Visual arrangement of variants in the gallery preview",
    rows: [
      { row: 1, content: "Desktop Dark - full container width" },
      { row: 2, content: "Desktop Light - full container width" },
      { row: 3, content: "[Tablet Dark] [Tablet Light] [Mobile Dark (top) + Mobile Light (bottom)]" }
    ]
  },

  layout_types: {
    group: {
      description: "Multiple related events displayed together (e.g., all Lakers games)",
      layout_styles: [
        "list-minimal - Compact text links with minimal styling",
        "list-detailed - Thick borders, bold condensed fonts, prominent rows",
        "two-column-table - Actual table structure with headers",
        "magazine-hero - Split layout with large hero image",
        "sports-outline - Double-border frame with ALL CAPS, team colors",
        "card-grid - 2x2 or 3-column card grid",
        "timeline - Vertical timeline with dots and connectors",
        "calendar-strip - Calendar page style with date badges",
        "bio-split - 40/60 split with performer bio",
        "combined-block - Large unified CTA button block"
      ]
    },
    individual: {
      description: "Single featured event with full details",
      styles: ["hero", "card", "poster", "minimal", "premium"]
    },
    "add-on": {
      description: "Parking, wristbands, upgrades linked to parent events",
      types: ["parking", "wristband", "upgrade", "hospitality", "shuttle", "camping", "merch"]
    }
  },

  categories: [
    "sports", "concerts", "festivals", "comedy", "theater", 
    "awards", "family", "special", "general"
  ],

  import_format: {
    description: "Structure for importing a template bundle",
    schema: {
      bundle_name: "string - Unique name for the template bundle",
      layout_type: "'group' | 'individual' | 'add-on'",
      layout_style: "string - For group templates, one of the layout_styles above",
      category: "string - One of the categories above",
      description: "string - Brief description of the template style",
      style_tags: "string[] - Visual style tags like 'bold', 'minimal', 'elegant'",
      
      base_config: {
        description: "Core TemplateConfig object applied to all variants",
        example: {
          fontHeading: "Oswald",
          fontBody: "Inter",
          backgroundColor: "#0a0a0a",
          textColor: "#ffffff",
          accentColor: "#d4af37",
          borderRadius: "md",
          ctaEnabled: true,
          ctaText: "Get Tickets",
          ctaStyle: "button",
          showImages: true,
          showPrices: true,
          showVenue: true
        }
      },

      html_template: {
        description: "Handlebars HTML template string",
        example: "<article class=\"template\">{{#each events}}<div class=\"event\">{{eventName}}</div>{{/each}}</article>"
      },

      quick_share_template: {
        description: "Plain text template for SMS/quick share with emoji",
        example: "🎫 {{eventName}} | {{eventDate}} @ {{venue}} | {{ticketLink}}"
      },

      variant_overrides: {
        description: "Optional per-variant config overrides",
        example: {
          desktop_light: {
            backgroundColor: "#ffffff",
            textColor: "#1a1a1a"
          },
          mobile_dark: {
            titleSize: "sm",
            showImages: false
          }
        }
      }
    }
  }
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * EXAMPLE TEMPLATE BUNDLE
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const EXAMPLE_TEMPLATE_BUNDLE = {
  bundle_name: "Sports Scoreboard Premium",
  layout_type: "group",
  layout_style: "sports-outline",
  category: "sports",
  description: "Bold double-border sports frame with team color auto-palette, ALL CAPS typography",
  style_tags: ["bold", "sports", "premium"],

  base_config: {
    // Typography
    fontHeading: "Bebas Neue",
    fontBody: "Inter",
    titleColorMode: "solid",
    titleSize: "xl",
    
    // Colors
    backgroundColor: "#0a0a0a",
    textColor: "#ffffff",
    accentColor: "#d4af37",
    
    // Sports Frame
    enableSportsFrame: true,
    sportsAutoPalette: true,
    sportsGapThickness: 4,
    sportsCornerRadius: 0,
    
    // Layout
    borderRadius: "none",
    padding: "lg",
    
    // CTAs
    ctaEnabled: true,
    ctaText: "GET TICKETS",
    ctaStyle: "button",
    showTicketsCta: true,
    showEmailCta: true,
    emailCtaText: "Email Concierge",
    
    // Visibility
    showImages: true,
    showPrices: true,
    showVenue: true,
    showMatchup: true
  },

  html_template: `
<article class="sports-outline-template" style="background: var(--bg, #0a0a0a); color: var(--text, #fff); font-family: var(--bodyFont, Inter);">
  <div class="sports-frame" style="border: 3px solid var(--teamPrimary, #d4af37); padding: 4px;">
    <div class="inner-frame" style="border: 2px solid var(--teamSecondary, #fff); padding: 24px;">
      <header style="text-align: center; margin-bottom: 24px;">
        <h1 style="font-family: var(--headingFont, 'Bebas Neue'); font-size: 32px; letter-spacing: 0.1em; text-transform: uppercase;">
          {{groupTitle}}
        </h1>
        <p style="color: var(--accent, #d4af37); font-size: 14px;">{{eventCount}} UPCOMING GAMES</p>
      </header>
      
      {{#each events}}
      <div class="event-row" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div class="matchup" style="font-weight: 600; flex: 1;">
          {{homeTeam}} vs {{awayTeam}}
        </div>
        <div class="details" style="text-align: center; color: var(--muted, #888); flex: 1;">
          <div>{{eventDate}}</div>
          <div style="font-size: 12px;">{{venue}}</div>
        </div>
        <div class="actions" style="display: flex; gap: 8px; flex: 1; justify-content: flex-end;">
          <a href="https://www.firstclasstixx.com/search?q={{urlEncode homeTeam}}+vs+{{urlEncode awayTeam}}" 
             style="background: var(--accent, #d4af37); color: #000; padding: 8px 16px; text-decoration: none; font-weight: 600; font-size: 12px;">
            TICKETS
          </a>
          <a href="mailto:concierge@firstclasstixx.com?subject={{urlEncode homeTeam}}%20vs%20{{urlEncode awayTeam}}%20%7C%20{{urlEncode eventDate}}&body=Hi%20First%20Class%20Tixx%2C%0A%0AI'm%20interested%20in%20tickets%20for%20{{urlEncode homeTeam}}%20vs%20{{urlEncode awayTeam}}%20at%20{{urlEncode venue}}%20on%20{{urlEncode eventDate}}.%0A%0APlease%20let%20me%20know%20available%20options.%0A%0AThanks!" 
             style="color: var(--accent, #d4af37); padding: 8px 12px; text-decoration: underline; font-size: 12px;">
            ✉ Email
          </a>
        </div>
      </div>
      {{/each}}
      
      <footer style="margin-top: 24px; text-align: center; display: flex; justify-content: center; gap: 24px;">
        <a href="https://www.firstclasstixx.com/search?q={{urlEncode groupTitle}}" 
           style="background: var(--accent, #d4af37); color: #000; padding: 12px 32px; text-decoration: none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
          VIEW ALL {{eventCount}} GAMES
        </a>
        <a href="mailto:concierge@firstclasstixx.com?subject={{urlEncode groupTitle}}&body=Hi%20First%20Class%20Tixx%2C%0A%0AI'm%20interested%20in%20tickets%20for%20the%20{{urlEncode groupTitle}}%20series.%0A%0APlease%20let%20me%20know%20available%20options%20and%20any%20package%20deals.%0A%0AThanks!" 
           style="color: var(--accent, #d4af37); text-decoration: underline; padding: 12px 0;">
          ✉ Email Concierge
        </a>
      </footer>
    </div>
  </div>
</article>
  `.trim(),

  quick_share_template: `🏀 {{groupTitle}} | {{eventCount}} games

{{#each events}}• {{eventDate}} - {{homeTeam}} vs {{awayTeam}}
{{/each}}
🎫 Search: https://www.firstclasstixx.com/search?q={{urlEncode groupTitle}}
📧 Email: concierge@firstclasstixx.com`,

  variant_overrides: {
    desktop_light: {
      backgroundColor: "#ffffff",
      textColor: "#1a1a1a"
    },
    tablet_dark: {
      titleSize: "lg",
      padding: "md"
    },
    tablet_light: {
      backgroundColor: "#ffffff",
      textColor: "#1a1a1a",
      titleSize: "lg",
      padding: "md"
    },
    mobile_dark: {
      titleSize: "md",
      padding: "sm",
      showImages: false
    },
    mobile_light: {
      backgroundColor: "#ffffff",
      textColor: "#1a1a1a",
      titleSize: "md",
      padding: "sm",
      showImages: false
    }
  }
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TYPESCRIPT INTERFACES
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { TemplateConfig, LayoutType, GroupLayoutStyle, TemplateCategory, StyleTag } from '@/types/template';

export type ViewportType = 'desktop' | 'tablet' | 'mobile';
export type ThemeMode = 'dark' | 'light';
export type BundleVariantId = 'desktop_dark' | 'desktop_light' | 'tablet_dark' | 'tablet_light' | 'mobile_dark' | 'mobile_light';

export interface BundleVariant {
  id: BundleVariantId;
  viewport: ViewportType;
  width: string;
  theme: ThemeMode;
}

export interface TemplateBundleImport {
  bundle_name: string;
  layout_type: LayoutType;
  layout_style?: GroupLayoutStyle;
  category: TemplateCategory;
  description?: string;
  style_tags?: StyleTag[];
  base_config: Partial<TemplateConfig>;
  html_template: string;
  quick_share_template?: string;
  variant_overrides?: {
    desktop_dark?: Partial<TemplateConfig>;
    desktop_light?: Partial<TemplateConfig>;
    tablet_dark?: Partial<TemplateConfig>;
    tablet_light?: Partial<TemplateConfig>;
    mobile_dark?: Partial<TemplateConfig>;
    mobile_light?: Partial<TemplateConfig>;
  };
}

export type TemplateBundleSchemaType = typeof TEMPLATE_BUNDLE_SCHEMA;
