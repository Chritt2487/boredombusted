export function formatAmazonUrl(baseUrl: string, affiliateId: string) {
  if (!baseUrl) return '';
  
  try {
    const url = new URL(baseUrl);
    // Ensure it's an Amazon URL
    if (!url.hostname.includes('amazon')) {
      return baseUrl;
    }
    
    // Add or update affiliate tag
    url.searchParams.set('tag', affiliateId);
    
    return url.toString();
  } catch (e) {
    console.error('Error formatting Amazon URL:', e);
    return baseUrl;
  }
}