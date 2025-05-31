const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing Vercel deployment...');
  
  try {
    // Navigate to the Vercel URL
    const response = await page.goto('https://landgenai.vercel.app/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Response status:', response.status());
    console.log('Response URL:', response.url());
    
    if (response.status() === 404) {
      console.log('❌ 404 Error - Page not found');
      
      // Try to get more details
      const content = await page.content();
      console.log('Page content length:', content.length);
      
      if (content.includes('404')) {
        console.log('✅ Confirmed 404 error page');
      }
      
      // Take screenshot
      await page.screenshot({ path: 'vercel-404-error.png' });
      console.log('Screenshot saved as vercel-404-error.png');
      
    } else if (response.status() === 200) {
      console.log('✅ Page loaded successfully');
      
      // Check if it's the actual app or a fallback
      const title = await page.title();
      console.log('Page title:', title);
      
      const heroText = await page.textContent('h1').catch(() => null);
      console.log('Hero text:', heroText);
      
      await page.screenshot({ path: 'vercel-success.png' });
      console.log('Screenshot saved as vercel-success.png');
      
    } else {
      console.log('❓ Unexpected status:', response.status());
    }
    
  } catch (error) {
    console.log('❌ Error accessing deployment:', error.message);
  }
  
  await browser.close();
})();