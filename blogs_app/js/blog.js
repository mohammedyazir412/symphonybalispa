/**
 * blog.js – Handles client side interactions on listing pages.
 * Server-side rendering (SSR) now handles post listings natively for optimal SEO.
 */
document.addEventListener("DOMContentLoaded", function () {
    console.log("[blog.js] Listing page loaded cleanly using SSR.");
    
    // De-duplication check & accessibility handling for current page links
    const activePaginationBtn = document.querySelector(".page-btn.current");
    if (activePaginationBtn) {
        activePaginationBtn.setAttribute("focusable", "false");
    }
});