/**
 * Microsoft Clarity Analytics Tracker
 * Privacy-focused analytics for understanding user behavior
 *
 * Setup Instructions:
 * 1. Sign up at https://clarity.microsoft.com/
 * 2. Create a new project
 * 3. Get your project ID
 * 4. Replace 'YOUR_CLARITY_PROJECT_ID' below with your actual ID
 *
 * Privacy Note: Clarity is GDPR compliant and doesn't sell data.
 */

(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "YOUR_CLARITY_PROJECT_ID");

// Optional: Set up custom tags for better insights
if (typeof clarity === 'function') {
    // Tag the page type
    const pageType = document.title.includes('10 Second') ? 'drawing-10s' :
                     document.title.includes('30 Second') ? 'drawing-30s' :
                     document.title.includes('60 Second') ? 'drawing-60s' :
                     document.title.includes('How to Play') ? 'instructions' :
                     document.title.includes('Complete') ? 'end-screen' : 'home';

    clarity("set", "page_type", pageType);

    // Tag if mobile or desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    clarity("set", "device_type", isMobile ? "mobile" : "desktop");
}
