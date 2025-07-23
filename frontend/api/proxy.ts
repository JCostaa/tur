import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { method, url, body, query } = req;
  
  // Set CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Extract the path from the URL (remove /api/proxy)
  const targetPath = url?.replace('/api/proxy', '') || '';
  
  // Build query string if there are query parameters
  const queryString = Object.keys(query).length > 0 
    ? '?' + new URLSearchParams(
        Object.fromEntries(
          Object.entries(query).filter(([_, value]) => value !== undefined)
        ) as Record<string, string>
      ).toString()
    : '';
    
  const targetUrl = `https://www.skoobtur.com/api/public${targetPath}${queryString}`;
  
  console.log(`[PROXY] ${method} ${targetPath} -> ${targetUrl}`);
  
  try {
    const response = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; TurismoApp/1.0)',
        'Accept': 'application/json',
        // Add any required headers for SkoobTur API
        ...(process.env.VITE_SKOOBTUR_API_KEY && {
          'Authorization': `Bearer ${process.env.VITE_SKOOBTUR_API_KEY}`,
        }),
      },
      body: method !== 'GET' && method !== 'HEAD' ? JSON.stringify(body) : undefined,
    });
    
    console.log(`[PROXY] Response status: ${response.status}`);
    
    if (!response.ok) {
      console.error(`[PROXY] API Error: ${response.status} ${response.statusText}`);
      res.status(response.status).json({ 
        error: 'API Error', 
        status: response.status,
        message: response.statusText 
      });
      return;
    }
    
    const data = await response.json();
    console.log(`[PROXY] Success: ${targetPath}`);
    res.status(response.status).json(data);
  } catch (error) {
    console.error('[PROXY] Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

 