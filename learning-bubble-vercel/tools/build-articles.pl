#!/usr/bin/env perl
# ============================================================
#  Learning Bubble — article page generator
# ------------------------------------------------------------
#  Builds blog-<slug>.html from tools/articles/<slug>.html
#  (the prose only) plus the metadata in blog-data.js.
#
#  Run from the repo root:      perl tools/build-articles.pl
#
#  Add a new article by:
#    1. appending an entry to blog-data.js
#    2. writing tools/articles/<slug>.html with the prose
#    3. re-running this script
# ============================================================
use strict;
use warnings;

my $SITE = 'https://learningbubble.org/';

# ---- read article metadata straight out of blog-data.js ----
open my $bd, '<:encoding(UTF-8)', 'blog-data.js' or die "blog-data.js: $!";
local $/; my $js = <$bd>; close $bd;

my @articles;
while ($js =~ /\{\s*slug:\s*'([^']+)',(.*?)\n    \}/gs) {
    my ($slug, $body) = ($1, $2);
    my %a = (slug => $slug);
    $a{title}    = $1 if $body =~ /title:\s*'((?:[^'\\]|\\.)*)'/;
    $a{excerpt}  = $1 if $body =~ /excerpt:\s*'((?:[^'\\]|\\.)*)'/;
    $a{date}     = $1 if $body =~ /date:\s*'([^']+)'/;
    $a{readMins} = $1 if $body =~ /readMins:\s*(\d+)/;
    $a{branch}   = $1 if $body =~ /branch:\s*'([^']+)'/;
    $a{category} = $1 if $body =~ /category:\s*'([^']+)'/;
    $a{icon}     = $1 if $body =~ /icon:\s*'([^']+)'/;
    $a{keywords} = $1 if $body =~ /keywords:\s*'([^']+)'/;
    $a{related}  = $1 if $body =~ /related:\s*\[([^\]]*)\]/;
    for (values %a) { s/\\'/'/g if defined }
    push @articles, \%a;
}
die "no articles parsed from blog-data.js\n" unless @articles;

# ---- page template ----
my $TPL = <<'TEMPLATE';
<!DOCTYPE html>
<html lang="en" data-branch="{{BRANCH}}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{TITLE}} | Learning Bubble</title>
    <meta name="description" content="{{EXCERPT}}">
    <meta name="keywords" content="{{KEYWORDS}}">
    <meta property="og:title" content="{{TITLE}}">
    <meta property="og:description" content="{{EXCERPT}}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="{{SITE}}blog-{{SLUG}}.html">
    <meta property="article:published_time" content="{{DATE}}">
    <link rel="canonical" href="{{SITE}}blog-{{SLUG}}.html">
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
    <meta name="author" content="Learning Bubble">
    <meta name="theme-color" content="#1c2f72">
    <meta property="og:site_name" content="Learning Bubble">
    <meta property="og:locale" content="en">
    <meta property="og:image" content="{{SITE}}assets/images/heroSectionImage1.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{TITLE}}">
    <meta name="twitter:description" content="{{EXCERPT}}">
    <meta name="twitter:image" content="{{SITE}}assets/images/heroSectionImage1.jpg">

    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/images/logo.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="styles.css">

    <script>
        (function () {
            var d = document.documentElement;
            d.setAttribute('data-branch', '{{BRANCH}}');
            try { if (localStorage.getItem('lb-theme') === 'dark') d.classList.add('dark-theme'); } catch (e) { }
        })();
    </script>

    <script defer src="courses-data.js"></script>
    <script defer src="script.js"></script>
    <script defer src="article.js"></script>

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "{{TITLE}}",
      "description": "{{EXCERPT}}",
      "datePublished": "{{DATE}}",
      "dateModified": "{{DATE}}",
      "inLanguage": "en",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "{{SITE}}blog-{{SLUG}}.html" },
      "image": "{{SITE}}assets/images/heroSectionImage1.jpg",
      "author": { "@type": "Organization", "name": "Learning Bubble", "url": "{{SITE}}" },
      "publisher": {
        "@type": "Organization",
        "name": "Learning Bubble",
        "url": "{{SITE}}",
        "logo": { "@type": "ImageObject", "url": "{{SITE}}assets/images/logo.png" }
      }
    }
    </script>
</head>

<body data-branch="{{BRANCH}}">

    <header class="site-header" id="siteHeader">
        <div class="container nav-inner">
            <a class="brand" href="index.html">
                <img class="brand-logo" src="assets/images/logo.png" alt="Learning Bubble" width="40" height="40">
                <span class="brand-text"><strong>Learning Bubble</strong><em class="brand-sub">Guides</em></span>
            </a>
            <nav class="nav-links" id="navLinks" aria-label="Main">
                <a class="nav-link" href="index.html">Home</a>
                <a class="nav-link" href="kids.html">For Kids</a>
                <a class="nav-link" href="academics.html">Academics</a>
                <a class="nav-link" href="blog.html">Guides</a>
                <a class="nav-link" href="about.html">About</a>
                <a class="nav-link" href="contact.html">Contact</a>
            </nav>
            <div class="nav-actions">
                <button class="icon-btn" data-search-open aria-label="Search courses" title="Search (Ctrl+K)">
                    <i class="fas fa-magnifying-glass" aria-hidden="true"></i>
                </button>
                <button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode"></button>
                <a class="btn btn-primary btn-sm" href="demo.html"><i class="fas fa-video"></i> Book a demo</a>
                <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false"
                    aria-controls="navLinks"><span></span><span></span><span></span></button>
            </div>
        </div>
    </header>

    <main>
        <section class="page-head">
            <div class="container">
                <nav class="crumbs" aria-label="Breadcrumb">
                    <a href="index.html">Home</a><i class="fas fa-chevron-right"></i>
                    <a href="blog.html">Guides</a><i class="fas fa-chevron-right"></i>
                    <span>{{TITLE}}</span>
                </nav>
                <span class="eyebrow"><i class="fas {{ICON}}"></i> {{CATEGORY}} · {{READ}} min read</span>
                <h1>{{TITLE}}</h1>
                <p>{{EXCERPT}}</p>
            </div>
        </section>

        <section class="section section--tight">
            <div class="container">
                <article class="prose article-body">
{{BODY}}
                    <hr class="article-rule">
                    <p class="article-foot">Written by the Learning Bubble teaching team. If something here does not
                        match your situation, <a href="contact.html">ask us</a> — we would rather give you a straight
                        answer than have you guess.</p>
                </article>
            </div>
        </section>

        <section class="section section--soft" id="articleRelated" data-related="{{RELATED}}"></section>

        <section class="section">
            <div class="container">
                <div class="cta-band reveal">
                    <h2>See it for yourself</h2>
                    <p>A free 30-minute demo class tells you more than any guide. Meet the teacher, watch a real
                        session, then decide.</p>
                    <div class="cta-actions">
                        <a class="btn btn-light btn-lg" href="demo.html"><i class="fas fa-video"></i> Book a free
                            demo</a>
                        <a class="btn btn-onDark btn-lg" data-demo-wa="{{BRANCH}}" href="#" target="_blank"
                            rel="noopener"><i class="fab fa-whatsapp"></i> Ask on WhatsApp</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer" id="siteFooter"></footer>
</body>

</html>
TEMPLATE

my $built = 0;
for my $a (@articles) {
    my $frag = "tools/articles/$a->{slug}.html";
    unless (-e $frag) { warn "!! missing prose: $frag\n"; next; }

    open my $fh, '<:encoding(UTF-8)', $frag or die "$frag: $!";
    local $/; my $body = <$fh>; close $fh;
    $body =~ s/\s+\z//;

    my $out = $TPL;
    my %map = (
        SITE => $SITE,           SLUG  => $a->{slug},
        TITLE => $a->{title},    EXCERPT => $a->{excerpt},
        KEYWORDS => $a->{keywords} // '', DATE => $a->{date},
        READ => $a->{readMins},  BRANCH => $a->{branch},
        CATEGORY => $a->{category}, ICON => $a->{icon},
        RELATED => ($a->{related} // '') =~ s/\s+//gr,
        BODY => $body,
    );
    $out =~ s/\{\{(\w+)\}\}/defined $map{$1} ? $map{$1} : ''/ge;

    my $file = "blog-$a->{slug}.html";
    open my $o, '>:encoding(UTF-8)', $file or die "$file: $!";
    print $o $out; close $o;
    print "built  $file\n";
    $built++;
}
print "\n$built article page(s) built.\n";
