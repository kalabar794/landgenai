const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Test the /simple page specifically since it should work without any dependencies
  console.log('Testing /simple route on Vercel...');
  
  try {
    const response = await page.goto('https://landgenai.vercel.app/simple', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Simple page response status:', response.status());
    console.log('Simple page response URL:', response.url());
    
    if (response.status() === 200) {
      const content = await page.textContent('body');
      console.log('Simple page content:', content);
    }
    
    await page.screenshot({ path: 'vercel-simple-test.png' });
    
  } catch (error) {
    console.log('❌ Error accessing /simple:', error.message);
  }
  
  // Test the health API route
  console.log('\nTesting /api/health...');
  
  try {
    const response = await page.goto('https://landgenai.vercel.app/api/health', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Health API response status:', response.status());
    
    if (response.status() === 200) {
      const content = await page.textContent('body');
      console.log('Health API response:', content);
    }
    
  } catch (error) {
    console.log('❌ Error accessing /api/health:', error.message);
  }
  
  await browser.close();
})();