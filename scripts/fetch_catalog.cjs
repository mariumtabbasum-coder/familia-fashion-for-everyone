const fs = require('fs');
const path = require('path');

async function searchImage(query) {
  try {
    const q = encodeURIComponent(query);
    const r1 = await fetch('https://duckduckgo.com/?q=' + q, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const t1 = await r1.text();
    const vqdMatch = t1.match(/vqd=[\"\']?([0-9\-]+)/);
    if (!vqdMatch) return null;
    const r2 = await fetch('https://duckduckgo.com/i.js?l=us-en&o=json&q=' + q + '&vqd=' + vqdMatch[1], {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const data = await r2.json();
    if (!data.results || data.results.length === 0) return null;
    
    // Pick the first one that successfully downloads
    for (let i = 0; i < Math.min(10, data.results.length); i++) {
      const imgUrl = data.results[i].image;
      if (!imgUrl || !imgUrl.startsWith('http')) continue;
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(imgUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        clearTimeout(timeout);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          if (buf.byteLength > 15000) {
            return { buffer: Buffer.from(buf), url: imgUrl };
          }
        }
      } catch (err) {}
    }
  } catch (e) {
    console.error('Search error for:', query, e.message);
  }
  return null;
}

module.exports = { searchImage };
