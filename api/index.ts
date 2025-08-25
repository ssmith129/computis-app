import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({ 
      message: 'API is running',
      endpoints: [
        { path: '/api/ping', method: 'GET', description: 'Health check' },
        { path: '/api/demo', method: 'GET', description: 'Demo endpoint' }
      ]
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
