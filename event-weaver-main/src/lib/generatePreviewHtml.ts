import { TemplateConfig, GroupLayoutStyle, LayoutType, defaultTemplateConfig, TemplateCategory } from '@/types/template';

// Parsed template from HTML import
export interface ParsedTemplate {
  name: string;
  category: TemplateCategory;
  layout_type: LayoutType;
  config: TemplateConfig;
  html_template: string;
  description?: string;
  isSelected?: boolean;
}

// Extract inline style value
function extractStyleValue(styleStr: string, property: string): string | undefined {
  const regex = new RegExp(`${property}\\s*:\\s*([^;]+)`, 'i');
  const match = styleStr.match(regex);
  return match ? match[1].trim() : undefined;
}

// Extract article elements using balanced tag counting (handles nested structures)
function extractArticleElements(html: string): string[] {
  const articles: string[] = [];
  const lowerHtml = html.toLowerCase();
  let searchStart = 0;
  
  while (true) {
    const articleStart = lowerHtml.indexOf('<article', searchStart);
    if (articleStart === -1) break;
    
    // Find the end of opening tag
    let tagEnd = lowerHtml.indexOf('>', articleStart);
    if (tagEnd === -1) break;
    tagEnd += 1;
    
    // Now count balanced article tags to find the matching </article>
    let depth = 1;
    let pos = tagEnd;
    
    while (depth > 0 && pos < lowerHtml.length) {
      const nextOpen = lowerHtml.indexOf('<article', pos);
      const nextClose = lowerHtml.indexOf('</article>', pos);
      
      if (nextClose === -1) break;
      
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + 8; // Move past '<article'
      } else {
        depth--;
        if (depth === 0) {
          // Found the matching closing tag
          const endPos = nextClose + 10; // Include '</article>'
          articles.push(html.substring(articleStart, endPos));
        }
        pos = nextClose + 10;
      }
    }
    
    searchStart = articleStart + 1;
  }
  
  return articles;
}

// Detect layout type from section wrapper
function detectLayoutFromSection(sectionHtml: string): LayoutType | null {
  const lower = sectionHtml.toLowerCase();
  if (lower.includes('group-layout') || lower.includes('group_layout')) {
    return 'group';
  }
  if (lower.includes('individual-layout') || lower.includes('individual_layout')) {
    return 'individual';
  }
  return null;
}

// Extract div.card elements using balanced tag counting
function extractCardElements(html: string): { html: string; classes: string }[] {
  const cards: { html: string; classes: string }[] = [];
  const lowerHtml = html.toLowerCase();
  let searchStart = 0;
  
  while (true) {
    // Find <div that contains class="card
    const divStart = lowerHtml.indexOf('<div', searchStart);
    if (divStart === -1) break;
    
    // Find the end of the opening tag
    const tagEnd = lowerHtml.indexOf('>', divStart);
    if (tagEnd === -1) break;
    
    const openingTag = html.substring(divStart, tagEnd + 1);
    
    // Check if this div has class="card
    if (!openingTag.toLowerCase().includes('class="card')) {
      searchStart = divStart + 1;
      continue;
    }
    
    // Extract class attribute
    const classMatch = openingTag.match(/class="([^"]+)"/i);
    const classes = classMatch ? classMatch[1] : '';
    
    // Now count balanced div tags to find the matching </div>
    let depth = 1;
    let pos = tagEnd + 1;
    
    while (depth > 0 && pos < lowerHtml.length) {
      const nextOpen = lowerHtml.indexOf('<div', pos);
      const nextClose = lowerHtml.indexOf('</div>', pos);
      
      if (nextClose === -1) break;
      
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) {
          const endPos = nextClose + 6;
          cards.push({
            html: html.substring(divStart, endPos),
            classes
          });
        }
        pos = nextClose + 6;
      }
    }
    
    searchStart = divStart + 1;
  }
  
  return cards;
}

// Extract CSS variable from style string
function extractCssVar(styleStr: string, varName: string): string | undefined {
  // Handle complex values like gradients - capture until semicolon or end
  const regex = new RegExp(`${varName}:\\s*([^;]+?)(?:;|$)`, 'i');
  const match = styleStr.match(regex);
  return match ? match[1].trim() : undefined;
}

// Extract simple color from CSS variable value (handles gradients)
function extractColorFromValue(value: string): string | undefined {
  // If it's a simple hex color
  const hexMatch = value.match(/#[0-9a-fA-F]{3,8}/);
  if (hexMatch) return hexMatch[0];
  
  // If it's an rgba
  const rgbaMatch = value.match(/rgba?\([^)]+\)/);
  if (rgbaMatch) return rgbaMatch[0];
  
  return undefined;
}

// Parse font from --titleFont or --bodyFont
function parseFontValue(value: string): string {
  // Extract first font family name
  const fontMatch = value.match(/^([^,]+)/);
  if (fontMatch) {
    return fontMatch[1].trim().replace(/["']/g, '');
  }
  return 'Inter';
}

// Detect layout style from card classes
function detectLayoutStyle(classes: string): string | undefined {
  const layoutMatch = classes.match(/layout-(\w+)/);
  return layoutMatch ? layoutMatch[1] : undefined;
}

// Parse HTML to extract TemplateConfig
export function parseHtmlTemplate(html: string): ParsedTemplate[] {
  const templates: ParsedTemplate[] = [];
  
  // Store original styles before stripping
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  const globalStyles = styleMatch ? styleMatch.join('\n') : '';
  
  // Remove DOCTYPE, html, head, body wrappers if present
  let cleanHtml = html
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>|<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>|<\/body>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<link[^>]*>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    .trim();

  // Strategy 1: Look for div.card elements (new FCT format)
  const cardElements = extractCardElements(cleanHtml);
  
  if (cardElements.length > 0) {
    cardElements.forEach((card, index) => {
      const config: TemplateConfig = { ...defaultTemplateConfig };
      const classes = card.classes;
      const containerHtml = card.html;
      
      // Extract CSS variables from inline style
      const styleAttrMatch = containerHtml.match(/style="([^"]+)"/i);
      const styleAttr = styleAttrMatch ? styleAttrMatch[1] : '';
      
      // Extract --accent
      const accentValue = extractCssVar(styleAttr, '--accent');
      if (accentValue) {
        const color = extractColorFromValue(accentValue);
        if (color) {
          config.accentColor = color;
          config.ctaBackgroundColor = color;
        }
      }
      
      // Extract --bg (handles gradients)
      const bgValue = extractCssVar(styleAttr, '--bg');
      if (bgValue) {
        const color = extractColorFromValue(bgValue);
        if (color) {
          config.backgroundColor = color;
        }
      }
      
      // Extract --border
      const borderValue = extractCssVar(styleAttr, '--border');
      if (borderValue) {
        const color = extractColorFromValue(borderValue);
        if (color) {
          config.borderColor = color;
        }
      }
      
      // Extract --text
      const textValue = extractCssVar(styleAttr, '--text');
      if (textValue) {
        const color = extractColorFromValue(textValue);
        if (color) {
          config.textColor = color;
        }
      }
      
      // Extract --accentText
      const accentTextValue = extractCssVar(styleAttr, '--accentText');
      if (accentTextValue) {
        const color = extractColorFromValue(accentTextValue);
        if (color) {
          config.ctaTextColor = color;
        }
      }
      
      // Extract --titleFont
      const titleFontValue = extractCssVar(styleAttr, '--titleFont');
      if (titleFontValue) {
        config.fontHeading = parseFontValue(titleFontValue);
      }
      
      // Extract --bodyFont
      const bodyFontValue = extractCssVar(styleAttr, '--bodyFont');
      if (bodyFontValue) {
        config.fontBody = parseFontValue(bodyFontValue);
      }
      
      // Detect layout type from classes
      let layoutType: LayoutType = 'individual';
      if (classes.includes('group')) {
        layoutType = 'group';
      } else if (classes.includes('single')) {
        layoutType = 'individual';
      }
      
      // Detect layout style
      const layoutStyle = detectLayoutStyle(classes);
      // Note: layout_style is on EmailTemplate, not TemplateConfig
      // We'll store it in the returned ParsedTemplate instead
      
      // Extract title from .title class
      let extractedTitle = '';
      const titleMatch = containerHtml.match(/<div[^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
      if (titleMatch) {
        extractedTitle = titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      }
      
      // Also try .kicker for category hint
      let kicker = '';
      const kickerMatch = containerHtml.match(/<div[^>]*class="[^"]*kicker[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
      if (kickerMatch) {
        kicker = kickerMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      }
      
      // Detect category
      let category: TemplateCategory = 'general';
      const lowerKicker = kicker.toLowerCase();
      const lowerTitle = extractedTitle.toLowerCase();
      const combinedText = `${lowerKicker} ${lowerTitle}`;
      
      if (combinedText.includes('nba') || combinedText.includes('nhl') || combinedText.includes('nfl') || 
          combinedText.includes('mlb') || combinedText.includes('lakers') || combinedText.includes('warriors') ||
          combinedText.includes('clippers') || combinedText.includes('kings') || combinedText.includes('dodgers')) {
        category = 'sports';
      } else if (combinedText.includes('concert') || combinedText.includes('tour')) {
        category = 'concerts';
      } else if (combinedText.includes('festival') || combinedText.includes('coachella')) {
        category = 'festivals';
      } else if (combinedText.includes('comedy') || combinedText.includes('comedian')) {
        category = 'comedy';
      }
      
      // Generate name
      const layoutLabel = layoutType === 'group' ? 'Group' : 'Individual';
      const layoutSuffix = layoutStyle ? ` (${layoutStyle})` : '';
      const name = extractedTitle 
        ? `${extractedTitle}${layoutSuffix}`
        : `Imported ${layoutLabel} Template ${index + 1}${layoutSuffix}`;
      
      templates.push({
        name,
        category,
        layout_type: layoutType,
        config,
        html_template: containerHtml,
        description: kicker ? `${kicker} - ${layoutType} layout` : `${layoutType} layout`,
        isSelected: true,
      });
    });
    
    return templates;
  }

  // Strategy 2: Look for article elements (original format)
  // Build a map of article elements to their layout context from sections
  const articleContexts = new Map<string, LayoutType>();
  
  // First, try to find sections with layout classes and extract articles from them
  const sectionRegex = /<section[^>]*class="[^"]*(?:group-layout|individual-layout|event-shell)[^"]*"[^>]*>[\s\S]*?<\/section>/gi;
  let sectionMatch;
  const tempHtml = cleanHtml;
  const sectionArticles: string[] = [];
  
  while ((sectionMatch = sectionRegex.exec(tempHtml)) !== null) {
    const sectionHtml = sectionMatch[0];
    const layoutType = detectLayoutFromSection(sectionHtml);
    
    // Extract articles from this section
    const articlesInSection = extractArticleElements(sectionHtml);
    articlesInSection.forEach(article => {
      sectionArticles.push(article);
      if (layoutType) {
        // Use first 100 chars as key to identify article
        articleContexts.set(article.substring(0, 200), layoutType);
      }
    });
  }

  // Use section-extracted articles if found, otherwise extract from whole document
  let matches: string[] = sectionArticles.length > 0 
    ? sectionArticles 
    : extractArticleElements(cleanHtml);
  
  // If no articles found, try other strategies
  if (matches.length === 0) {
    // Strategy 3: Look for divs with max-width: 600px (email template standard)
    const containerRegex = /<div[^>]*style="[^"]*max-width:\s*600px[^"]*"[^>]*>[\s\S]*?<\/div>\s*(?=<div[^>]*style="[^"]*max-width:\s*600px|$)/gi;
    const divMatches = cleanHtml.match(containerRegex);
    if (divMatches && divMatches.length > 0) {
      matches = divMatches;
    }
  }
  
  // Strategy 4: If no containers found, treat the whole thing as one template
  if (matches.length === 0) {
    matches = [cleanHtml];
  }

  matches.forEach((containerHtml, index) => {
    const config: TemplateConfig = { ...defaultTemplateConfig };
    
    // Extract CSS variables from inline style attribute
    // Handle complex values like radial-gradient(..., #hex)
    const styleAttrMatch = containerHtml.match(/style="([^"]+)"/i);
    const styleAttr = styleAttrMatch ? styleAttrMatch[1] : '';
    
    // Extract --accent
    const cssVarAccent = styleAttr.match(/--accent:\s*(#[0-9a-fA-F]{3,8})/i);
    if (cssVarAccent) {
      config.accentColor = cssVarAccent[1];
      config.ctaBackgroundColor = cssVarAccent[1];
    }
    
    // Extract --card-bg (handles gradients)
    const cssVarCardBgGradient = styleAttr.match(/--card-bg:\s*(?:radial-gradient|linear-gradient)\([^)]*?(#[0-9a-fA-F]{3,8})/i);
    const cssVarCardBgSimple = styleAttr.match(/--card-bg:\s*(#[0-9a-fA-F]{3,8})/i);
    if (cssVarCardBgGradient) {
      config.backgroundColor = cssVarCardBgGradient[1];
    } else if (cssVarCardBgSimple) {
      config.backgroundColor = cssVarCardBgSimple[1];
    }
    
    // Extract --card-border with rgba
    const cssVarCardBorder = styleAttr.match(/--card-border:\s*rgba?\(([^)]+)\)/i);
    if (cssVarCardBorder) {
      config.borderColor = `rgba(${cssVarCardBorder[1]})`;
    }
    
    // Extract --title-font
    const cssVarTitleFont = styleAttr.match(/--title-font:\s*var\(--font-([^)]+)\)/i);
    if (cssVarTitleFont) {
      const fontMap: Record<string, string> = {
        'display-1': 'Space Grotesk',
        'display-2': 'Bebas Neue',
        'serif-1': 'Playfair Display',
        'serif-2': 'Lora',
        'sans-1': 'Inter',
        'sans-2': 'DM Sans',
        'mono': 'DM Mono',
        'sport': 'Rajdhani',
        'retro': 'Press Start 2P',
        'alt-sans': 'Montserrat',
      };
      config.fontHeading = fontMap[cssVarTitleFont[1]] || 'Space Grotesk';
    }
    
    const cssVarBodyFont = styleAttr.match(/--body-font:\s*var\(--font-([^)]+)\)/i);
    if (cssVarBodyFont) {
      const fontMap: Record<string, string> = {
        'serif-1': 'Playfair Display',
        'serif-2': 'Lora',
        'sans-1': 'Inter',
        'sans-2': 'DM Sans',
      };
      config.fontBody = fontMap[cssVarBodyFont[1]] || 'DM Sans';
    }
    
    // Extract background color from container (fallback)
    if (!config.backgroundColor) {
      const bgMatch = containerHtml.match(/background(?:-color)?:\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|[a-z]+)/i);
      if (bgMatch) {
        config.backgroundColor = bgMatch[1];
      }
    }
    
    // Extract border-radius
    const borderRadiusMatch = containerHtml.match(/border-radius:\s*(\d+)px/i);
    if (borderRadiusMatch) {
      config.borderRadius = parseInt(borderRadiusMatch[1]);
    }
    
    // Extract border
    const borderMatch = containerHtml.match(/border:\s*(\d+)px\s+solid\s+(#[0-9a-fA-F]{3,8})/i);
    if (borderMatch) {
      config.borderWidth = parseInt(borderMatch[1]);
      config.borderColor = borderMatch[2];
    }
    
    // Extract padding
    const paddingMatch = containerHtml.match(/padding:\s*(\d+)px/i);
    if (paddingMatch) {
      config.padding = parseInt(paddingMatch[1]);
    }
    
    // Extract text color from h1 or main text elements
    const textColorMatch = containerHtml.match(/color:\s*(#[0-9a-fA-F]{3,8})/i);
    if (textColorMatch) {
      config.textColor = textColorMatch[1];
    }
    
    // Extract accent color (usually from links or highlighted elements)
    const accentMatch = containerHtml.match(/color:\s*(#[0-9a-fA-F]{3,8})(?:[^>]*>(?:View|Email|Get|Buy))/i);
    if (accentMatch) {
      config.accentColor = accentMatch[1];
    }
    
    // Extract fonts from font-family
    const fontMatch = containerHtml.match(/font-family:\s*'([^']+)'/i);
    if (fontMatch) {
      config.fontHeading = fontMatch[1];
    }
    
    // Extract CTA button colors
    const ctaBgMatch = containerHtml.match(/background(?:-color)?:\s*(#[0-9a-fA-F]{3,8})[^>]*>[^<]*(?:Ticket|Get|Buy|Search)/i);
    if (ctaBgMatch) {
      config.ctaBackgroundColor = ctaBgMatch[1];
    }
    
    // Extract font sizes
    const titleSizeMatch = containerHtml.match(/font-size:\s*(\d+)px[^>]*font-weight:\s*(?:bold|900|800|700)/i);
    if (titleSizeMatch) {
      config.fontSizeTitle = parseInt(titleSizeMatch[1]);
    }
    
    // Detect layout type - first check section context
    const contextKey = containerHtml.substring(0, 200);
    let layoutType: LayoutType = articleContexts.get(contextKey) || 'individual';
    
    // If no section context, detect from content
    if (!articleContexts.has(contextKey)) {
      // GROUP indicators: class names, event-list, multiple event rows
      if (
        containerHtml.includes('event-card--group') ||
        containerHtml.includes('event-list') ||
        containerHtml.includes('Combined Events') ||
        containerHtml.match(/<tr[^>]*>[\s\S]*?<tr[^>]*>/i) ||
        containerHtml.includes('Sample Event Group') ||
        containerHtml.includes('event-row') ||
        containerHtml.match(/(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d+[\s\S]*?(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d+/i) ||
        (containerHtml.match(/event-row/gi) || []).length >= 2
      ) {
        layoutType = 'group';
      }
      
      // Individual indicators (override group if more specific)
      if (containerHtml.includes('event-card--single')) {
        layoutType = 'individual';
      }
      
      // ADD-ON indicators
      if (
        containerHtml.toLowerCase().includes('parking') ||
        containerHtml.toLowerCase().includes('wristband') ||
        containerHtml.toLowerCase().includes('vip pass') ||
        containerHtml.toLowerCase().includes('upgrade')
      ) {
        layoutType = 'add-on';
      }
    }
    
    // Detect category based on content
    let category: TemplateCategory = 'general';
    const lowerHtml = containerHtml.toLowerCase();
    
    if (lowerHtml.includes('lakers') || lowerHtml.includes('warriors') || lowerHtml.includes('nba') || lowerHtml.includes('nfl') || lowerHtml.includes('mlb') || lowerHtml.includes('dodgers')) {
      category = 'sports';
    } else if (lowerHtml.includes('concert') || lowerHtml.includes('tour') || lowerHtml.includes('music')) {
      category = 'concerts';
    } else if (lowerHtml.includes('festival') || lowerHtml.includes('coachella')) {
      category = 'festivals';
    } else if (lowerHtml.includes('comedy') || lowerHtml.includes('comedian')) {
      category = 'comedy';
    } else if (lowerHtml.includes('tennis') || lowerHtml.includes('us open') || lowerHtml.includes('grand slam')) {
      category = 'sports';
    } else if (lowerHtml.includes('parking')) {
      category = 'parking';
    } else if (lowerHtml.includes('wristband')) {
      category = 'wristbands';
    }
    
    // Determine if dark or light based on background
    const isDark = config.backgroundColor?.match(/#[0-3][0-9a-fA-F]{5}/);
    
    // Extract title from HTML content
    let extractedTitle = '';
    const titleMatch = containerHtml.match(/<h[123][^>]*class="[^"]*event-title[^"]*"[^>]*>([\s\S]*?)<\/h[123]>/i);
    if (titleMatch) {
      extractedTitle = titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    } else {
      const h1Match = containerHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (h1Match) {
        extractedTitle = h1Match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      } else {
        // Try h3 with event-title class
        const h3Match = containerHtml.match(/<h3[^>]*class="[^"]*event-title[^"]*"[^>]*>([\s\S]*?)<\/h3>/i);
        if (h3Match) {
          extractedTitle = h3Match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        }
      }
    }
    
    // Generate a name based on detected properties
    const themeSuffix = isDark ? 'Dark' : 'Light';
    const layoutLabel = layoutType === 'group' ? 'Group' : layoutType === 'add-on' ? 'Add-On' : 'Individual';
    const name = extractedTitle 
      ? `${extractedTitle} (${layoutLabel})`
      : `Imported ${layoutLabel} Template ${index + 1} (${themeSuffix})`;
    
    templates.push({
      name,
      category,
      layout_type: layoutType,
      config,
      html_template: containerHtml,
      description: extractedTitle ? `${extractedTitle} - ${layoutType} layout` : `Imported from HTML - ${layoutType} layout`,
      isSelected: true,
    });
  });
  
  return templates;
}

// Detect if input is HTML or JSON
export function detectImportFormat(input: string): 'html' | 'json' | 'unknown' {
  const trimmed = input.trim();
  const lowerTrimmed = trimmed.toLowerCase();
  
  // JSON starts with { or [
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch {
      // Not valid JSON, could be HTML with curly braces
    }
  }
  
  // HTML indicators (case-insensitive)
  if (
    lowerTrimmed.startsWith('<!doctype') ||
    lowerTrimmed.startsWith('<html') ||
    lowerTrimmed.startsWith('<div') ||
    lowerTrimmed.startsWith('<table') ||
    lowerTrimmed.startsWith('<section') ||
    lowerTrimmed.startsWith('<article') ||
    lowerTrimmed.includes('<style') ||
    trimmed.includes('style="')
  ) {
    return 'html';
  }
  
  return 'unknown';
}

// Sample events for preview
const sampleEvents = [
  { date: 'JAN 21', dayOfWeek: 'Wed', time: '7:30 PM', opponent: 'vs Warriors', venue: 'Crypto.com Arena' },
  { date: 'JAN 23', dayOfWeek: 'Thu', time: '7:30 PM', opponent: 'vs Celtics', venue: 'Crypto.com Arena' },
  { date: 'JAN 26', dayOfWeek: 'Sat', time: '6:00 PM', opponent: 'vs Heat', venue: 'Crypto.com Arena' },
  { date: 'JAN 28', dayOfWeek: 'Sun', time: '7:30 PM', opponent: 'vs Nuggets', venue: 'Crypto.com Arena' },
];

// Generate CTA HTML
function generateCtaHtml(config: TemplateConfig): string {
  const showTickets = config.showTicketsCta !== false;
  const showEmail = config.showEmailCta !== false;
  const ticketsText = config.ticketsCtaText || 'View Tickets';
  const emailText = config.emailCtaText || 'Email';
  const ticketsIcon = config.ticketsCtaIcon !== false ? ' →' : '';
  const emailIcon = config.emailCtaIcon !== false ? '✉ ' : '';

  const ticketsStyle = config.ticketsCtaStyle || 'link';
  const emailStyle = config.emailCtaStyle || 'link';

  let ticketsStyleStr = '';
  let emailStyleStr = '';

  // Tickets CTA styles
  switch (ticketsStyle) {
    case 'button':
      ticketsStyleStr = `background-color: ${config.ctaBackgroundColor}; color: ${config.ctaTextColor}; padding: 3px 10px; border-radius: 4px; font-weight: bold; text-decoration: none;`;
      break;
    case 'pill':
      ticketsStyleStr = `background-color: ${config.ctaBackgroundColor}; color: ${config.ctaTextColor}; padding: 2px 12px; border-radius: 20px; font-weight: bold; text-decoration: none;`;
      break;
    case 'underline':
      ticketsStyleStr = `color: ${config.accentColor}; text-decoration: underline; font-weight: bold;`;
      break;
    default:
      ticketsStyleStr = `color: ${config.accentColor}; font-weight: bold; text-decoration: none;`;
  }

  // Email CTA styles
  switch (emailStyle) {
    case 'button':
      emailStyleStr = `background-color: ${config.accentColor}; color: ${config.ctaTextColor}; padding: 3px 10px; border-radius: 4px; text-decoration: none;`;
      break;
    case 'pill':
      emailStyleStr = `border: 1px solid ${config.accentColor}; color: ${config.accentColor}; padding: 1px 10px; border-radius: 20px; text-decoration: none;`;
      break;
    case 'underline':
      emailStyleStr = `color: ${config.accentColor}; text-decoration: underline;`;
      break;
    default:
      emailStyleStr = `color: ${config.accentColor}; text-decoration: none;`;
  }

  let html = '';
  if (showTickets) {
    html += `<a href="#" style="${ticketsStyleStr}">${ticketsText}${ticketsIcon}</a>`;
  }
  if (showEmail) {
    html += `<a href="mailto:concierge@firstclasstixx.com" style="${emailStyleStr}; margin-left: 10px;">${emailIcon}${emailText}</a>`;
  }

  return html;
}

// Generate event row HTML
function generateEventRowHtml(config: TemplateConfig, event: typeof sampleEvents[0], index: number): string {
  const isDark = config.backgroundColor?.includes('#0') || config.backgroundColor?.includes('#1');
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

  return `
    <tr style="border-bottom: 1px solid ${borderColor};">
      <td style="padding: 12px 0; color: ${config.textColor}; font-weight: bold; font-size: 14px;">
        ${event.dayOfWeek} · ${event.date}
      </td>
      <td style="padding: 12px 0; color: ${config.textColor}; opacity: 0.7; font-size: 14px;">
        ${event.opponent} — ${event.venue}
      </td>
      <td style="padding: 12px 0; text-align: right; font-size: 12px; text-transform: uppercase;">
        ${generateCtaHtml(config)}
      </td>
    </tr>
  `;
}

// Generate GROUP layout HTML
export function generateGroupLayoutHtml(config: TemplateConfig, layoutStyle?: GroupLayoutStyle): string {
  const isDark = config.backgroundColor?.includes('#0') || config.backgroundColor?.includes('#1');
  const borderStyle = config.borderWidth > 0 ? `${config.borderWidth}px solid ${config.borderColor}` : 'none';
  
  // Google Font link
  const fontLink = `
    <link href="https://fonts.googleapis.com/css2?family=${config.fontHeading.replace(' ', '+')}:wght@400;700;900&family=${config.fontBody.replace(' ', '+')}:wght@400;500;700&display=swap" rel="stylesheet">
  `;

  const eventRows = sampleEvents.map((e, i) => generateEventRowHtml(config, e, i)).join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${fontLink}
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: '${config.fontBody}', sans-serif; }
  </style>
</head>
<body style="background: #f5f5f5; padding: 20px;">
  <div style="
    max-width: 600px;
    margin: 0 auto;
    background-color: ${config.backgroundColor};
    border-radius: ${config.borderRadius}px;
    border: ${borderStyle};
    overflow: hidden;
    ${config.shadowIntensity > 0 ? `box-shadow: 0 ${config.shadowIntensity}px ${config.shadowIntensity * 2}px rgba(0,0,0,0.15);` : ''}
  ">
    <div style="padding: ${config.padding}px;">
      <!-- Header -->
      <div style="
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: ${config.accentColor};
        margin-bottom: 8px;
      ">
        Combined Events
      </div>
      
      <h1 style="
        font-family: '${config.fontHeading}', sans-serif;
        font-size: ${config.fontSizeTitle}px;
        font-weight: 900;
        color: ${config.textColor};
        margin-bottom: 4px;
        text-transform: uppercase;
      ">
        Sample Event Group
      </h1>
      
      <div style="
        font-size: 14px;
        color: ${config.textColor};
        opacity: 0.7;
        margin-bottom: 24px;
      ">
        Jan 21 – Feb 12, 2026 — Crypto.com Arena
      </div>
      
      <!-- Main CTA Button -->
      ${config.showCta ? `
      <a href="#" style="
        display: inline-block;
        background-color: ${config.ctaBackgroundColor};
        color: ${config.ctaTextColor};
        padding: 14px 28px;
        text-decoration: none;
        font-weight: bold;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-radius: ${config.borderRadius / 2}px;
        margin-bottom: 24px;
      ">
        ${config.ctaText}
      </a>
      ` : ''}
      
      <!-- Events Table -->
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          ${eventRows}
        </tbody>
      </table>
      
      <!-- Concierge Link -->
      ${config.showConciergeLink ? `
      <div style="
        margin-top: 24px;
        text-align: center;
        font-size: 13px;
        color: ${config.textColor};
        opacity: 0.6;
      ">
        Questions? <a href="mailto:concierge@firstclasstixx.com" style="color: ${config.accentColor};">Email our VIP Concierge</a>
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>`;
}

// Generate INDIVIDUAL layout HTML
export function generateIndividualLayoutHtml(config: TemplateConfig): string {
  const borderStyle = config.borderWidth > 0 ? `${config.borderWidth}px solid ${config.borderColor}` : 'none';
  
  const fontLink = `
    <link href="https://fonts.googleapis.com/css2?family=${config.fontHeading.replace(' ', '+')}:wght@400;700;900&family=${config.fontBody.replace(' ', '+')}:wght@400;500;700&display=swap" rel="stylesheet">
  `;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${fontLink}
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: '${config.fontBody}', sans-serif; }
  </style>
</head>
<body style="background: #f5f5f5; padding: 20px;">
  <div style="
    max-width: 600px;
    margin: 0 auto;
    background-color: ${config.backgroundColor};
    border-radius: ${config.borderRadius}px;
    border: ${borderStyle};
    overflow: hidden;
    ${config.shadowIntensity > 0 ? `box-shadow: 0 ${config.shadowIntensity}px ${config.shadowIntensity * 2}px rgba(0,0,0,0.15);` : ''}
  ">
    ${config.showImages ? `
    <div style="
      height: 200px;
      background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 2px;
    ">
      Event Image
    </div>
    ` : ''}
    
    <div style="padding: ${config.padding}px; text-align: center;">
      <h1 style="
        font-family: '${config.fontHeading}', sans-serif;
        font-size: ${config.fontSizeTitle}px;
        font-weight: 900;
        color: ${config.textColor};
        margin-bottom: 8px;
      ">
        Sample Event
      </h1>
      
      <p style="
        font-size: ${config.fontSizeSubtitle}px;
        color: ${config.accentColor};
        margin-bottom: 16px;
      ">
        Featuring Special Guest
      </p>
      
      ${config.showTimes ? `
      <p style="
        font-size: ${config.fontSizeBody}px;
        color: ${config.textColor};
        margin-bottom: 8px;
      ">
        Saturday, January 25, 2026 at 8:00 PM
      </p>
      ` : ''}
      
      ${config.showVenue ? `
      <p style="
        font-size: ${config.fontSizeBody}px;
        color: ${config.textColor};
        opacity: 0.7;
        margin-bottom: 24px;
      ">
        Crypto.com Arena, Los Angeles
      </p>
      ` : ''}
      
      ${config.showCta ? `
      <a href="#" style="
        display: inline-block;
        background-color: ${config.ctaBackgroundColor};
        color: ${config.ctaTextColor};
        padding: 16px 40px;
        text-decoration: none;
        font-weight: bold;
        font-size: 16px;
        border-radius: ${config.borderRadius}px;
      ">
        ${config.ctaText}
      </a>
      ` : ''}
    </div>
  </div>
</body>
</html>`;
}

// Copy HTML to clipboard
export async function copyPreviewHtml(
  config: TemplateConfig, 
  layoutType: 'group' | 'individual' | 'add-on',
  layoutStyle?: GroupLayoutStyle
): Promise<boolean> {
  try {
    let html: string;
    if (layoutType === 'group') {
      html = generateGroupLayoutHtml(config, layoutStyle);
    } else {
      html = generateIndividualLayoutHtml(config);
    }
    
    await navigator.clipboard.writeText(html);
    return true;
  } catch (err) {
    console.error('Failed to copy HTML:', err);
    return false;
  }
}
