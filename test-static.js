const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing static file serving...');
  
  try {
    const response = await page.goto('https://landgenai.vercel.app/index.html', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Static file response status:', response.status());
    
    if (response.status() === 200) {
      const content = await page.textContent('body');
      console.log('Static file content:', content);
    }
    
  } catch (error) {
    console.log('❌ Error accessing static file:', error.message);
  }
  
  await browser.close();
})();