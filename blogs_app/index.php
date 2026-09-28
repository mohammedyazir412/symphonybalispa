<?php
/**
 * index.php — Blog Listing Page
 * Server-Side Rendered (SSR) for 100% SEO Visibility.
 */

define('SITE_URL',  'https://symphonybalispa.com');
define('SITE_NAME', 'Symphony Bali Spa');
define('WP_API',    'https://public-api.wordpress.com/wp/v2/sites/symphonybalispa-ervhc.wordpress.com');
define('PER_PAGE',  9);

// ── Helpers ───────────────────────────────────────────────────
function strip_tags_clean($html) {
    return trim(strip_tags(html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8')));
}

function fetch_wp($url, &$headers = null) {
    $ctx = stream_context_create([
        'http' => [
            'timeout'      => 8,
            'ignore_errors'=> true,
            'user_agent'   => 'SymphonyBaliSpa/1.0',
        ]
    ]);
    $raw = @file_get_contents($url, false, $ctx);
    if (!$raw) return null;

    if (isset($http_response_header)) {
        $headers = $http_response_header;
    }
    return json_decode($raw, true);
}

// ── Pagination Processing ─────────────────────────────────────
$current_page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
$api_url = WP_API . '/posts?_embed=1&per_page=' . PER_PAGE . '&page=' . $current_page . '&_fields=id,slug,date,title,excerpt,content,_links,_embedded';

$response_headers = [];
$posts = fetch_wp($api_url, $response_headers);

$total_pages = 1;
if ($response_headers) {
    foreach ($response_headers as $header) {
        if (stripos($header, 'X-WP-TotalPages:') === 0) {
            $total_pages = intval(trim(substr($header, 16)));
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Wellness Blog | Symphony Bali Spa – Tips, Treatments &amp; Relaxation</title>
<meta name="description" content="Explore the Symphony Bali Spa blog for expert wellness tips, Bali spa treatment guides, relaxation techniques, and self-care advice for Madurai and Theni.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="<?= SITE_URL ?>/blogs/<?= $current_page > 1 ? '?paged=' . $current_page : '' ?>">

<meta property="og:type"        content="website">
<meta property="og:site_name"   content="<?= SITE_NAME ?>">
<meta property="og:title"       content="Wellness Blog | Symphony Bali Spa">
<meta property="og:description" content="Expert wellness tips, spa treatment guides, and relaxation advice from Symphony Bali Spa — Madurai &amp; Theni.">
<meta property="og:url"          content="<?= SITE_URL ?>/blogs/">
<meta property="og:image"       content="<?= SITE_URL ?>/images/logo.webp">
<meta property="og:locale"      content="en_IN">

<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="Wellness Blog | Symphony Bali Spa">
<meta name="twitter:description" content="Expert wellness tips, spa treatment guides, and relaxation advice.">
<meta name="twitter:image"       content="<?= SITE_URL ?>/images/logo.webp">

<meta name="google-site-verification" content="XAn6fqTgFENBa1mWXGrxx225wGJCmHIsyAm8LaheUew" />
<script async src="https://www.googletagmanager.com/gtag/js?id=G-MPPR4KVC9E"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MPPR4KVC9E');
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Symphony Bali Spa – Wellness Blog",
  "url": "<?= SITE_URL ?>/blogs/",
  "description": "Expert wellness tips, Bali spa treatment guides, and relaxation advice.",
  "publisher": {
    "@type": "LocalBusiness",
    "name": "Symphony Bali Spa",
    "url": "<?= SITE_URL ?>",
    "logo": "<?= SITE_URL ?>/images/logo.webp"
  }
}
</script>

<link rel="preconnect" href="https://public-api.wordpress.com">
<link rel="dns-prefetch" href="https://public-api.wordpress.com">

<link rel="stylesheet" href="/style.css">
<link rel="stylesheet" href="/blogs/css/style.css">

<style>
.blog-pagination { width: 100%; }
.pagination {
  display: flex; justify-content: center; align-items: center; gap: 8px; flex-wrap: wrap; margin: 40px 0;
}
.page-btn {
  padding: 8px 14px; min-width: 40px; text-align: center; border-radius: 8px;
  border: 1px solid rgba(212,175,55,0.3); color: #d4af37; text-decoration: none; font-size: 14px; transition: background .2s, color .2s;
}
.page-btn:hover { background: rgba(212,175,55,0.12); }
.page-btn.current {
  background: #d4af37; color: #16120f; font-weight: 600; border-color: #d4af37;
}
.page-btn.disabled { opacity: .35; pointer-events: none; }
.page-dots { color: #d4af37; padding: 0 4px; }
</style>
</head>
<body>
<div class="body">

<header id="main-header">
  <div class="container">
    <div class="logo">
      <a href="/"><img src="/images/logo.webp" width="50" height="50" alt="Symphony Bali Spa Logo"></a>
    </div>
    <div class="menu-toggle" id="menu-toggle"><span></span><span></span><span></span></div>
    <nav class="navbar" id="navbar">
      <div class="close-btn" id="close-btn">×</div>
      <a href="/">Home</a>
      <a href="/#branches">Our Branches</a>
      <a href="/#services">Services</a>
      <a href="/blogs/" aria-current="page">Blogs</a>
      <a href="/contact-us/">Contact Us</a>
      <a class="book-btn" href="tel:+919600702871">Call &amp; Book</a>
    </nav>
  </div>
</header>

<section class="blog-section" aria-labelledby="blog-heading">
  <h1 class="blog-title" id="blog-heading">Our Blog</h1>
  
  <div id="blog-container" class="blog-container" role="list">
    <?php if ($posts && is_array($posts)): ?>
        <?php foreach ($posts as $index => $post): 
            $title = strip_tags_clean($post['title']['rendered']);
            $post_url = "/blogs/" . $post['slug'];
            
            $excerpt = strip_tags_clean($post['excerpt']['rendered']);
            $excerpt = str_replace(['[…]', '[&hellip;]'], '…', $excerpt);
            $excerpt_words = explode(' ', $excerpt);
            $excerpt_text = implode(' ', array_slice($excerpt_words, 0, 18)) . '...';
            
            $content_clean = strip_tags_clean($post['content']['rendered']);
            $word_count = count(explode(' ', $content_clean));
            $read_time = max(1, round($word_count / 200)) . " min read";
            
            $date_formatted = date("d F Y", strtotime($post['date']));

            $img_url = '';
            $media = $post['_embedded']['wp:featuredmedia'][0] ?? null;
            if ($media && empty($media['code']) && !empty($media['source_url'])) {
                $img_url = $media['source_url'];
            }
            $is_above_fold = ($index < 3);
        ?>
            <a href="<?= $post_url ?>" class="blog-card" aria-label="<?= htmlspecialchars($title) ?>">
                <?php if ($img_url): ?>
                    <img 
                        src="<?= htmlspecialchars($img_url) ?>" 
                        alt="<?= htmlspecialchars($title) ?>" 
                        class="blog-image" 
                        loading="<?= $is_above_fold ? 'eager' : 'lazy' ?>"
                        <?= $is_above_fold ? 'fetchpriority="high"' : '' ?>
                        width="600" 
                        height="220"
                    >
                <?php else: ?>
                    <div class="blog-image-placeholder"></div>
                <?php endif; ?>
                <div class="blog-content">
                    <div class="blog-meta-top">
                        <time datetime="<?= $post['date'] ?>" class="blog-date"><?= $date_formatted ?></time>
                        <span class="blog-read-time"><?= $read_time ?></span>
                    </div>
                    <h2 class="blog-heading"><?= $post['title']['rendered'] ?></h2>
                    <p class="blog-excerpt"><?= $excerpt_text ?></p>
                    <span class="blog-btn">Read More</span>
                </div>
            </a>
        <?php endforeach; ?>
    <?php else: ?>
        <p style="text-align:center;color:#c9b78a;padding:40px 20px; width:100%;">
            Could not load posts right now. Please try again later.
        </p>
    <?php endif; ?>
  </div>

  <div id="blog-pagination" class="blog-pagination">
      <?php if ($total_pages > 1): ?>
          <nav class="pagination" aria-label="Blog pagination">
              <?php if ($current_page > 1): ?>
                  <a href="?paged=<?= $current_page - 1 ?>" class="page-btn">‹ Prev</a>
              <?php else: ?>
                  <span class="page-btn disabled">‹ Prev</span>
              <?php endif; ?>

              <?php 
              for ($i = 1; $i <= $total_pages; $i++): 
                  if ($i == 1 || $i == $total_pages || ($i >= $current_page - 1 && $i <= $current_page + 1)):
              ?>
                      <a href="?paged=<?= $i ?>" class="page-btn <?= $i === $current_page ? 'current' : '' ?>" <?= $i === $current_page ? 'aria-current="page"' : '' ?>><?= $i ?></a>
              <?php 
                  elseif ($i == 2 || $i == $total_pages - 1): 
                      echo '<span class="page-dots">…</span>';
                  endif; 
              endfor; 
              ?>

              <?php if ($current_page < $total_pages): ?>
                  <a href="?paged=<?= $current_page + 1 ?>" class="page-btn">Next ›</a>
              <?php else: ?>
                  <span class="page-btn disabled">Next ›</span>
              <?php endif; ?>
          </nav>
      <?php endif; ?>
  </div>
</section>

</div>

<footer class="premium-footer">
  <div class="footer-container">
    <div class="footer-brand">
      <a href="/"><img src="/images/logo.webp" alt="Symphony Bali Spa Logo" class="footer-logo"></a>
      <p class="footer-tagline">Discover Peace. Discover Yourself.<br>Discover Symphony.</p>
    </div>
    <div class="footer-nav">
      <h4>Quick Links</h4>
      <a href="/">Home</a>
      <a href="/#branches">Our Branches</a>
      <a href="/#services">Services</a>
      <a href="/blogs/">Blog</a>
      <a href="/contact-us/">Contact Us</a>
    </div>
    <div class="footer-location">
      <h4>Our Locations</h4>
      <p><strong>Madurai</strong><br>Plot No: 738, 4th Street,<br>Karpaga Nagar, Madurai – 625007</p>
      <p><strong>Theni</strong><br>Hotel Sivasakthi Towers,<br>Opp New Bus Stand, Theni – 625531</p>
    </div>
    <div class="footer-social">
      <h4>Connect With Us</h4>
      <div class="social-icons">
        <a href="https://wa.me/919600702871" class="wa-foot" aria-label="WhatsApp">
          <svg viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M16.04 2.003c-7.732 0-14.037 6.305-14.037 14.037 0 2.473.65 4.882 1.882 7.005L2 30l7.144-1.864a14.012 14.012 0 006.896 1.868h.004c7.73 0 14.036-6.305 14.036-14.037 0-3.75-1.46-7.274-4.108-9.921a13.93 13.93 0 00-9.932-4.043zm0 25.93a11.9 11.9 0 01-6.06-1.66l-.434-.258-4.238 1.106 1.132-4.13-.283-.45a11.8841 11.884 0 01-1.82-6.348c0-6.575 5.35-11.926 11.925-11.926a11.86 11.86 0 018.436 3.49 11.85 11.85 0 013.487 8.436c0 6.576-5.35 11.926-11.925 11.926zm6.54-8.93c-.358-.18-2.12-1.046-2.45-1.165-.33-.12-.57-.18-.808.18-.24.358-.93 1.165-1.14 1.404-.21.238-.42.268-.778.09-.36-.18-1.51-.556-2.88-1.774-1.065-.95-1.785-2.125-1.995-2.483-.21-.358-.022-.553.158-.73.162-.16.36-.42.54-.63.18-.21.24-.358.36-.597.12-.238.06-.447-.03-.627-.09-.18-.808-1.95-1.106-2.67-.29-.695-.586-.6-.808-.61l-.687-.012c-.238 0-.627.09-.957.448-.33.358-1.256 1.226-1.256 2.99 0 1.763 1.286 3.465 1.466 3.704.18.238 2.53 3.865 6.13 5.42.857.37 1.526.59 2.047.755.86.273 1.643.234 2.262.142.69-.103 2.12-.867 2.418-1.705.3-.84.3-1.555.21-1.705-.09-.15-.33-.238-.687-.417z"/></svg>
        </a>
        <a href="#" aria-label="Justdial" class="jd-icon">
          <svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 18 v58 c0 18 -10 28 -28 28" fill="none" stroke="#1673BE" stroke-width="14" stroke-linecap="round"/>
            <path d="M70 20 v80 h16 c22 0 36 -16 36 -40 s-14 -40 -36 -40 z" fill="none" stroke="#FF7A00" stroke-width="14" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/symphonybalispa/?igsh=aXBjOGQ3cnVkc253&utm_source=qr" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="26" height="26" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5C5.29 3.5 3.5 5.29 3.5 7.75v8.5c0 2.46 1.79 4.25 4.25 4.25h8.5c2.46 0 4.25-1.79 4.25-4.25v-8.5c0-2.46-1.79-4.25-4.25-4.25h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a1.13 1.13 0 110 2.26 1.13 1.13 0 010-2.26z"/></svg>
        </a>
        <a href="https://www.facebook.com/share/171bsfjzhy/?mibextid=wwXIfr" aria-label="Facebook">
          <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .1 2 .1v2.3h-1.1c-1.1 0-1.4.7-1.4 1.4V12H16l-.4 3h-2.5v7A10 10 0 0 0 22 12z"/></svg>
        </a>
        <a href="mailto:info@symphonybalispa.com" aria-label="Email" class="email">
          <svg viewBox="0 0 24 24"><path d="M2 4h20v16H2V4zm10 7 8-5H4l8 5zm0 2-8-5v10h16V8l-8 5z"/></svg>
        </a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">© 2026 Symphony Bali Spa. All Rights Reserved.</div>
</footer>

<div class="lux-popup" id="mailPopup">
  <div class="lux-popup-box">
    <button class="lux-close" data-close="mailPopup">×</button>
    <h3>Contact via Email</h3><p>Select your branch to email us</p>
    <a href="mailto:symphonybalispa@gmail.com" class="lux-branch"><span>Madurai</span><small>symphonybalispa@gmail.com</small></a>
    <a href="mailto:symphonybalispatheni@gmail.com" class="lux-branch"><span>Theni</span><small>symphonybalispatheni@gmail.com</small></a>
  </div>
</div>
<div class="lux-popup" id="jdPopup">
  <div class="lux-popup-box">
    <button class="lux-close" data-close="jdPopup">×</button>
    <h3>Contact via Justdial</h3><p>Select your branch to continue</p>
    <a href="https://jsdl.in/RSL-AJS1767755945" target="_blank" class="lux-branch"><span>Madurai</span><small>View on Justdial</small></a>
    <a href="https://jsdl.in/RSL-ZAO1767755980" target="_blank" class="lux-branch"><span>Theni</span><small>View on Justdial</small></a>
  </div>
</div>
<div id="branchPopup" class="popup-overlay">
  <div class="popup-content">
    <span class="popup-close">&times;</span>
    <h2>Select Your Branch</h2><p>Choose a location to book your appointment</p>
    <div class="branch-options">
      <a href="tel:+919600702871" class="branch-option madurai">Madurai Branch</a>
      <a href="tel:+918438754561" class="branch-option theni">Theni Branch</a>
    </div>
  </div>
</div>
<div class="wa-popup" id="waPopup">
  <div class="wa-popup-box">
    <button class="wa-close" id="waClose">×</button>
    <h3>Choose Your Branch</h3><p>Select your preferred spa location to continue</p>
    <div class="wa-branch-list">
      <a href="#" class="wa-branch" data-number="919600702871" data-branch="Madurai"><span class="city">Madurai</span><span class="phone">+91 96007 02871</span></a>
      <a href="#" class="wa-branch" data-number="918438754561" data-branch="Theni"><span class="city">Theni</span><span class="phone">+91 84387 54561</span></a>
    </div>
  </div>
</div>

<div class="left-social" id="leftSocial">
  <a href="https://wa.me/919600702871" class="ls-btn whatsapp" id="lsWhatsapp" aria-label="WhatsApp"><img src="/images/whatsapp.webp" alt="WhatsApp"></a>
  <a href="tel:+919600702871" class="ls-btn phone" id="lsPhone" aria-label="Phone"><img src="/images/phone.webp" alt="Call"></a>
  <a href="https://www.instagram.com/symphonybalispa/" class="ls-btn instagram" aria-label="Instagram" target="_blank"><img src="/images/instagram.webp" alt="Instagram"></a>
  <button class="ls-btn close" id="lsClose" aria-label="Close">✕</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/intlTelInput.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"></script>
<script src="/blogs/js/blog.js"></script>
<script src="/script.js"></script>
</body>
</html>