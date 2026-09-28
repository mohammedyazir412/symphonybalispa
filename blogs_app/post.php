<?php
/**
 * post.php — Single Blog Post Page
 * Server-Side Rendered (SSR) for Complete Article Content Crawling.
 */

define('SITE_URL',  'https://symphonybalispa.com');
define('SITE_NAME', 'Symphony Bali Spa');
define('WP_API',    'https://public-api.wordpress.com/wp/v2/sites/symphonybalispa-ervhc.wordpress.com');

function strip_tags_clean($html) {
    return trim(strip_tags(html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8')));
}

function esc_attr($str) {
    return htmlspecialchars($str, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

function fetch_wp($url) {
    $ctx = stream_context_create([
        'http' => [
            'timeout'        => 8,
            'ignore_errors'  => true,
            'user_agent'     => 'SymphonyBaliSpa/1.0',
        ]
    ]);
    $raw = @file_get_contents($url, false, $ctx);
    if (!$raw) return null;
    return json_decode($raw, true);
}

$path_parts   = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));
$last_segment = end($path_parts);
$raw_slug = ($last_segment && $last_segment !== 'post.php' && $last_segment !== 'blogs') ? $last_segment : ($_GET['slug'] ?? '');
$slug = preg_replace('/[^a-z0-9\-]/', '', strtolower($raw_slug));

// Defaults
$meta_title       = 'Blog Post | ' . SITE_NAME;
$meta_description = 'Read our latest wellness and spa tips.';
$meta_image       = SITE_URL . '/images/logo.webp';
$canonical        = SITE_URL . '/blogs/' . $slug;
$post_date_iso    = '';
$post_modified    = '';
$post_found       = false;
$post             = null;
$read_time        = "1 min read";

if ($slug) {
    $data = fetch_wp(WP_API . '/posts?slug=' . urlencode($slug) . '&_embed=1');

    if ($data && is_array($data) && count($data) > 0) {
        $post       = $data[0];
        $post_found = true;

        $raw_title        = strip_tags_clean($post['title']['rendered'] ?? '');
        $meta_title       = $raw_title . ' | ' . SITE_NAME;
        $meta_description = mb_substr(strip_tags_clean($post['excerpt']['rendered'] ?? ''), 0, 155) . '...';
        $post_date_iso    = $post['date'] ?? '';
        $post_modified    = $post['modified'] ?? '';

        $word_count = count(explode(' ', strip_tags_clean($post['content']['rendered'] ?? '')));
        $read_time = max(1, round($word_count / 200)) . " min read";

        $fm = $post['_embedded']['wp:featuredmedia'][0] ?? null;
        if ($fm && !isset($fm['code']) && !empty($fm['source_url'])) {
            $meta_image = $fm['source_url'];
        }
    }
}

if (!$post_found) {
    header("HTTP/1.1 404 Not Found");
}

$schema_blog = json_encode([
    '@context'          => 'https://schema.org',
    '@type'             => 'BlogPosting',
    'headline'          => $post_found ? strip_tags_clean($post['title']['rendered']) : '',
    'description'      => $meta_description,
    'url'               => $canonical,
    'datePublished'    => $post_date_iso,
    'dateModified'     => $post_modified,
    'image'            => $meta_image,
    'author'           => ['@type' => 'Organization', 'name' => SITE_NAME],
    'publisher'        => [
        '@type' => 'Organization',
        'name'  => SITE_NAME,
        'logo'  => ['@type' => 'ImageObject', 'url' => SITE_URL . '/images/logo.webp']
    ],
    'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => $canonical],
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

$schema_breadcrumb = json_encode([
    '@context'        => 'https://schema.org',
    '@type'           => 'BreadcrumbList',
    'itemListElement' => [
        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => SITE_URL],
        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Blog', 'item' => SITE_URL . '/blogs/'],
        ['@type' => 'ListItem', 'position' => 3, 'name'  => $post_found ? strip_tags_clean($post['title']['rendered']) : 'Post', 'item'  => $canonical],
    ],
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title><?= esc_attr($meta_title) ?></title>
<meta name="description" content="<?= esc_attr($meta_description) ?>">
<meta name="robots" content="index, follow">
<link rel="canonical" href="<?= esc_attr($canonical) ?>">

<meta property="og:type"        content="article">
<meta property="og:site_name"   content="<?= esc_attr(SITE_NAME) ?>">
<meta property="og:title"       content="<?= esc_attr($meta_title) ?>">
<meta property="og:description" content="<?= esc_attr($meta_description) ?>">
<meta property="og:url"          content="<?= esc_attr($canonical) ?>">
<meta property="og:image"       content="<?= esc_attr($meta_image) ?>">
<meta property="og:locale"      content="en_IN">
<?php if ($post_date_iso): ?>
<meta property="article:published_time" content="<?= esc_attr($post_date_iso) ?>">
<meta property="article:modified_time"  content="<?= esc_attr($post_modified) ?>">
<?php endif; ?>

<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="<?= esc_attr($meta_title) ?>">
<meta name="twitter:description" content="<?= esc_attr($meta_description) ?>">
<meta name="twitter:image"       content="<?= esc_attr($meta_image) ?>">

<script type="application/ld+json"><?= $schema_blog ?></script>
<script type="application/ld+json"><?= $schema_breadcrumb ?></script>

<link rel="preconnect" href="https://public-api.wordpress.com">
<link rel="dns-prefetch" href="https://public-api.wordpress.com">

<link rel="stylesheet" href="/style.css">
<link rel="stylesheet" href="/blogs/css/style.css">

<meta name="google-site-verification" content="XAn6fqTgFENBa1mWXGrxx225wGJCmHIsyAm8LaheUew" />
<script async src="https://www.googletagmanager.com/gtag/js?id=G-MPPR4KVC9E"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MPPR4KVC9E');
</script>
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
      <a href="/blogs/">Blogs</a>
      <a href="/contact-us/">Contact Us</a>
      <a class="book-btn" href="tel:+919600702871">Call &amp; Book</a>
    </nav>
  </div>
</header>

<section class="post-section">
  <nav class="post-breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a> <span>›</span>
    <a href="/blogs/">Blogs</a> <span>›</span>
    <span id="bc-title"><?= $post_found ? esc_attr(strip_tags_clean($post['title']['rendered'])) : 'Article Not Found' ?></span>
  </nav>

  <a href="/blogs/" class="back-btn">← Back to Blog</a>

  <article id="post-container">
    <?php if ($post_found): ?>
        <h1 class="post-heading"><?= $post['title']['rendered'] ?></h1>
        
        <div class="post-meta-top">
            <time datetime="<?= $post['date'] ?>" class="post-date"><?= date("d F Y", strtotime($post['date'])) ?></time>
            <span class="post-read-time"><?= $read_time ?></span>
        </div>

        <!--<?php if ($meta_image && $meta_image !== SITE_URL . '/images/logo.webp'): ?>-->
        <!--    <img src="<?= esc_attr($meta_image) ?>" alt="<?= esc_attr(strip_tags_clean($post['title']['rendered'])) ?>" class="post-hero-image" fetchpriority="high">-->
        <!--<?php endif; ?>-->

        <div class="post-content">
            <?= $post['content']['rendered'] ?>
        </div>
    <?php else: ?>
        <h1 class="post-heading">Article Not Found</h1>
        <p class="post-content">Sorry, the article you are looking for does not exist or has been removed.</p>
    <?php endif; ?>
  </article>
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
          <svg viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M16.04 2.003c-7.732 0-14.037 6.305-14.037 14.037 0 2.473.65 4.882 1.882 7.005L2 30l7.144-1.864a14.012 14.012 0 006.896 1.868h.004c7.73 0 14.036-6.305 14.036-14.037 0-3.75-1.46-7.274-4.108-9.921a13.93 13.93 0 00-9.932-4.043zm0 25.93a11.9 11.9 0 01-6.06-1.66l-.434-.258-4.238 1.106 1.132-4.13-.283-.45a11.8841 11.884 0 01-1.82-6.348c0-6.575 5.35-11.926 11.925-11.926a11.86 11.86 0 018.436 3.49(11.85 11.85 0 013.487 8.436c0 6.576-5.35 11.926-11.925 11.926zm6.54-8.93c-.358-.18-2.12-1.046-2.45-1.165-.33-.12-.57-.18-.808.18-.24.358-.93 1.165-1.14 1.404-.21.238-.42.268-.778.09-.36-.18-1.51-.556-2.88-1.774-1.065-.95-1.785-2.125-1.995-2.483-.21-.358-.022-.553.158-.73.162-.16.36-.42.54-.63.18-.21.24-.358.36-.597.12-.238.06-.447-.03-.627-.09-.18-.808-1.95-1.106-2.67-.29-.695-.586-.6-.808-.61l-.687-.012c-.238 0-.627.09-.957.448-.33.358-1.256 1.226-1.256 2.99 0 1.763 1.286 3.465 1.466 3.704.18.238 2.53 3.865 6.13 5.42.857.37 1.526.59 2.047.755.86.273 1.643.234 2.262.142.69-.103 2.12-.867 2.418-1.705.3-.84.3-1.555.21-1.705-.09-.15-.33-.238-.687-.417z"/></svg>
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
<script src="/blogs/js/post.js></script>
<script src="/script.js"></script>
</body>
</html>