// ============================================================
// S.H.I.E.L.D. Platform — Server-Side Web Search Service
// Modular Web Search Abstraction Layer
// Safely queries web search APIs (Tavily/Serper/DuckDuckGo/Edu API)
// ============================================================

import dotenv from 'dotenv';
dotenv.config();

export interface SearchResultItem {
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

export interface WebSearchOptions {
  query: string;
  domainId?: string;
  concept?: string;
  language?: string;
  maxResults?: number;
}

/**
 * Perform a server-side web search safely using environment variables.
 * Never exposes API keys or secrets to the frontend.
 */
export async function performWebSearch(options: WebSearchOptions): Promise<SearchResultItem[]> {
  const { query, domainId, concept, language = 'en', maxResults = 4 } = options;
  
  // Construct a subject-enriched search query for accuracy
  let enrichedQuery = query.trim();
  if (concept && !query.toLowerCase().includes(concept.toLowerCase())) {
    enrichedQuery = `${concept} ${enrichedQuery}`;
  }
  if (domainId && !query.toLowerCase().includes(domainId.toLowerCase())) {
    enrichedQuery = `${domainId} STEM ${enrichedQuery}`;
  }

  const apiKey = process.env.WEB_SEARCH_API_KEY || process.env.SERPER_API_KEY || process.env.TAVILY_API_KEY;

  try {
    // Priority 1: Tavily Search API if key provided
    if (process.env.TAVILY_API_KEY) {
      return await searchTavily(enrichedQuery, process.env.TAVILY_API_KEY, maxResults);
    }

    // Priority 2: Serper Google Search API if key provided
    if (process.env.SERPER_API_KEY) {
      return await searchSerper(enrichedQuery, process.env.SERPER_API_KEY, maxResults);
    }

    // Priority 3: Custom Search API if key provided
    if (apiKey) {
      return await searchGenericApi(enrichedQuery, apiKey, maxResults);
    }

    // Fallback: Secure Server-Side Public Search Endpoint (DuckDuckGo / Wikipedia Edu API)
    return await searchPublicEducationalWeb(enrichedQuery, maxResults);
  } catch (error) {
    console.error('[SHIELD WebSearchService] Search error:', error);
    // Graceful fallback to Wikipedia/Edu public endpoint
    try {
      return await searchPublicEducationalWeb(enrichedQuery, maxResults);
    } catch {
      return [];
    }
  }
}

/**
 * Tavily Educational Search Provider
 */
async function searchTavily(query: string, apiKey: string, maxResults: number): Promise<SearchResultItem[]> {
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      search_depth: 'basic',
      max_results: maxResults,
      include_answer: false,
    }),
  });

  if (!response.ok) throw new Error(`Tavily search failed: ${response.statusText}`);

  const data: any = await response.json();
  return (data.results || []).map((r: any) => ({
    title: r.title || 'Educational Reference',
    url: r.url,
    snippet: r.content || r.snippet || '',
    domain: extractDomain(r.url),
  }));
}

/**
 * Serper Google Search Provider
 */
async function searchSerper(query: string, apiKey: string, maxResults: number): Promise<SearchResultItem[]> {
  const response = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: query, num: maxResults }),
  });

  if (!response.ok) throw new Error(`Serper search failed: ${response.statusText}`);

  const data: any = await response.json();
  return (data.organic || []).slice(0, maxResults).map((r: any) => ({
    title: r.title || 'Reference',
    url: r.link,
    snippet: r.snippet || '',
    domain: extractDomain(r.link),
  }));
}

/**
 * Generic API Search Provider
 */
async function searchGenericApi(query: string, apiKey: string, maxResults: number): Promise<SearchResultItem[]> {
  // Configured provider endpoint
  const endpoint = process.env.WEB_SEARCH_ENDPOINT || 'https://api.tavily.com/search';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query, limit: maxResults }),
  });

  if (!response.ok) throw new Error('Generic Search API failed');
  const data: any = await response.json();
  return (data.results || []).slice(0, maxResults).map((r: any) => ({
    title: r.title || 'Web Result',
    url: r.url || r.link,
    snippet: r.snippet || r.body || '',
    domain: extractDomain(r.url || r.link),
  }));
}

/**
 * Public Server-Side Educational Web Search (DuckDuckGo + Wikipedia API)
 * Ensures real web search capability without requiring external paid keys.
 */
async function searchPublicEducationalWeb(query: string, maxResults: number): Promise<SearchResultItem[]> {
  const results: SearchResultItem[] = [];

  try {
    // 1. Query Wikipedia API for structured encyclopedic definition
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    const wikiRes = await fetch(wikiUrl, { signal: AbortSignal.timeout(3000) });
    if (wikiRes.ok) {
      const wikiData: any = await wikiRes.json();
      const items = wikiData.query?.search || [];
      for (const item of items.slice(0, 2)) {
        const pageTitle = item.title;
        const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`;
        const snippet = item.snippet.replace(/<[^>]+>/g, '');
        results.push({
          title: `${pageTitle} - Wikipedia`,
          url: pageUrl,
          snippet,
          domain: 'wikipedia.org',
        });
      }
    }
  } catch (err) {
    console.warn('[SHIELD WebSearchService] Wiki search fallback error:', err);
  }

  try {
    // 2. Query DuckDuckGo Instant Answer API for web references
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&no_redirect=1`;
    const ddgRes = await fetch(ddgUrl, { signal: AbortSignal.timeout(3000) });
    if (ddgRes.ok) {
      const ddgData: any = await ddgRes.json();
      if (ddgData.AbstractText && ddgData.AbstractURL) {
        results.push({
          title: ddgData.Heading ? `${ddgData.Heading} - Reference` : 'DuckDuckGo Knowledge Reference',
          url: ddgData.AbstractURL,
          snippet: ddgData.AbstractText,
          domain: extractDomain(ddgData.AbstractURL),
        });
      }

      const related = ddgData.RelatedTopics || [];
      for (const rel of related.slice(0, 2)) {
        if (rel.Text && rel.FirstURL) {
          results.push({
            title: rel.Text.split(' - ')[0] || 'Educational Reference',
            url: rel.FirstURL,
            snippet: rel.Text,
            domain: extractDomain(rel.FirstURL),
          });
        }
      }
    }
  } catch (err) {
    console.warn('[SHIELD WebSearchService] DDG search fallback error:', err);
  }

  // Deduplicate by URL and filter out empty
  const uniqueResults = results.filter((item, index, self) =>
    item.url && self.findIndex(t => t.url === item.url) === index
  );

  return uniqueResults.slice(0, maxResults);
}

/**
 * Extract clean domain name from URL
 */
function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return 'web-source';
  }
}
