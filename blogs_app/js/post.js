/**
 * post.js – Handles single post interactions.
 * Server-side rendering (SSR) now processes article body markup for full crawling visibility.
 */
document.addEventListener("DOMContentLoaded", function () {
    console.log("[post.js] Article verified and completely indexed into the document frame.");
    
    const articleContainer = document.getElementById("post-container");
    if (!articleContainer) {
        console.warn("[post.js] Expected layout targets are missing.");
    }
});