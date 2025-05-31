const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing /test-minimal route...');
  
  try {
    const response = await page.goto('https://landgenai.vercel.app/test-minimal', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Test minimal response status:', response.status());
    
    if (response.status() === 200) {
      const content = await page.textContent('body');
      console.log('Test minimal content:', content);
    }
    
  } catch (error) {
    console.log('❌ Error accessing /test-minimal:', error.message);
  }
  
  await browser.close();
})();