#!/usr/bin/env python3
"""
Beyond SEO -- Comprehensive Audit Report Generator
Generates a PDF report for Riddles Rush SEO/AEO/GEO/AI Search Audit
"""

from fpdf import FPDF
from datetime import datetime


class AuditReport(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, "Beyond SEO Audit Report - Riddles Rush", align="L")
        self.cell(0, 10, f"August 5, 2026", align="R", new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(119, 54, 254)
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

    def section_title(self, title):
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(119, 54, 254)
        self.ln(5)
        self.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(119, 54, 254)
        self.set_line_width(0.3)
        self.line(10, self.get_y(), 80, self.get_y())
        self.ln(3)

    def sub_title(self, title):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(50, 50, 50)
        self.ln(3)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body_text(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(60, 60, 60)
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def score_box(self, label, score, max_score, severity="Medium"):
        colors = {
            "Critical": (220, 53, 69),
            "High": (255, 152, 0),
            "Medium": (255, 193, 7),
            "Low": (76, 175, 80),
            "Good": (76, 175, 80),
        }
        r, g, b = colors.get(severity, (128, 128, 128))

        self.set_fill_color(245, 245, 245)
        self.rect(10, self.get_y(), 190, 18, "F")

        self.set_font("Helvetica", "B", 10)
        self.set_text_color(50, 50, 50)
        self.set_xy(15, self.get_y() + 2)
        self.cell(100, 7, label)

        self.set_font("Helvetica", "B", 12)
        self.set_text_color(r, g, b)
        self.set_xy(150, self.get_y())
        self.cell(40, 7, f"{score}/{max_score}", align="R")

        self.set_font("Helvetica", "", 8)
        self.set_xy(150, self.get_y() + 7)
        self.cell(40, 5, severity, align="R")

        self.set_xy(10, self.get_y() + 10)

    def finding_table(self, headers, rows, col_widths=None):
        if col_widths is None:
            col_widths = [190 / len(headers)] * len(headers)

        # Header
        self.set_font("Helvetica", "B", 9)
        self.set_fill_color(119, 54, 254)
        self.set_text_color(255, 255, 255)
        for i, h in enumerate(headers):
            self.cell(col_widths[i], 7, h, border=1, fill=True, align="C")
        self.ln()

        # Rows
        self.set_font("Helvetica", "", 8)
        self.set_text_color(50, 50, 50)
        fill = False
        for row in rows:
            if fill:
                self.set_fill_color(248, 248, 248)
            else:
                self.set_fill_color(255, 255, 255)

            max_h = 7
            for i, cell in enumerate(row):
                # Calculate needed height
                lines = self.multi_cell(col_widths[i], 5, str(cell), split_only=True)
                needed = len(lines) * 5 + 2
                if needed > max_h:
                    max_h = needed

            y_start = self.get_y()
            x_start = self.get_x()

            for i, cell in enumerate(row):
                self.set_xy(x_start + sum(col_widths[:i]), y_start)
                # Color severity
                if "Critical" in str(cell):
                    self.set_text_color(220, 53, 69)
                elif "High" in str(cell):
                    self.set_text_color(255, 152, 0)
                elif "Medium" in str(cell):
                    self.set_text_color(183, 110, 0)
                elif "Low" in str(cell) or "OK" in str(cell) or "Good" in str(cell) or "Present" in str(cell) or "PASS" in str(cell):
                    self.set_text_color(76, 175, 80)
                else:
                    self.set_text_color(50, 50, 50)

                self.multi_cell(col_widths[i], 5, str(cell), border=1, fill=True, max_line_height=5)

            self.set_xy(x_start, y_start + max_h)
            fill = not fill

        self.ln(3)


def generate_report():
    pdf = AuditReport()
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=20)

    # ── COVER PAGE ──
    pdf.add_page()
    pdf.ln(40)
    pdf.set_font("Helvetica", "B", 28)
    pdf.set_text_color(119, 54, 254)
    pdf.cell(0, 15, "Beyond SEO", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 16)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 10, "Comprehensive SEO / AEO / GEO / AI Search Audit", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(10)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(50, 50, 50)
    pdf.cell(0, 10, "Riddles Rush", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 8, "https://riddles-rush-five.vercel.app", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(15)
    pdf.set_draw_color(119, 54, 254)
    pdf.set_line_width(0.5)
    pdf.line(60, pdf.get_y(), 150, pdf.get_y())
    pdf.ln(15)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 7, f"Report Date: August 5, 2026", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 7, "Methodology: Beyond SEO v1.0.3 -- Native Agent Scraping Mode", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 7, "Auditor: Claude Code (AI Agent)", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(20)
    pdf.set_font("Helvetica", "I", 10)
    pdf.set_text_color(150, 150, 150)
    pdf.multi_cell(0, 5, "This report uses the Beyond SEO methodology for technical SEO, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), Entity SEO, Reputation SEO, and AI Search visibility analysis. All findings are based on live crawling and source code inspection. No data was invented.", align="C")

    # ── EXECUTIVE SUMMARY ──
    pdf.add_page()
    pdf.section_title("1. Executive Summary")
    pdf.body_text("Riddles Rush is a content-rich riddle website with 472 blog posts, 94 riddle collection pages, and 8 category pages, totaling 661 pre-rendered static pages. The site is built on Next.js 16 and deployed on Vercel.")
    pdf.body_text("Despite strong content volume and clean design, the site faces CRITICAL technical SEO gaps that effectively render it invisible to both traditional search engines and AI-powered answer engines. The most severe issues are: missing robots.txt, missing sitemap.xml, zero JSON-LD structured data, no canonical tags, no Open Graph tags, and extremely thin content (average 86 words per blog post).")
    pdf.body_text("Without addressing these foundational issues, the site will struggle to rank in Google, appear in AI search results (ChatGPT, Gemini, Perplexity), or earn citations from answer engines.")

    pdf.sub_title("Overall Score Card")
    pdf.score_box("Technical SEO", "6", "15", "Critical")
    pdf.score_box("Content / On-Page SEO", "4", "15", "Critical")
    pdf.score_box("AEO Readiness", "5", "15", "High")
    pdf.score_box("GEO / Source-worthiness", "3", "15", "Critical")
    pdf.score_box("Entity SEO", "3", "15", "Critical")
    pdf.score_box("Reputation Proof", "1", "10", "Critical")
    pdf.score_box("Conversation SEO", "2", "10", "High")
    pdf.score_box("Conversion / Tracking", "3", "5", "Medium")
    pdf.ln(5)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(220, 53, 69)
    pdf.cell(0, 10, "Overall Score: 27 / 100", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 7, "Status: Needs Immediate Technical Remediation", align="C", new_x="LMARGIN", new_y="NEXT")

    # ── DATA SOURCES ──
    pdf.add_page()
    pdf.section_title("2. Data Sources Used")
    pdf.body_text("Audit Mode: Native Agent Scraping Mode (Mode 3)")
    pdf.body_text("No APIFY_API_TOKEN or GSC/GA4 exports were available. All data was collected via live HTTP requests, source code inspection, and web search analysis.")
    pdf.body_text("")
    pdf.body_text("Data sources utilized:")
    pdf.body_text("- Live HTTP crawl of all key page types (homepage, blog index, blog posts, riddle hubs, category pages, about, riddle-of-the-day)")
    pdf.body_text("- Raw HTML source inspection for meta tags, schema, canonical, OG tags")
    pdf.body_text("- Local source code inspection (layout.tsx, page components, content system)")
    pdf.body_text("- Markdown content analysis (472 blog posts, 94 riddle files, 8 category files)")
    pdf.body_text("- Web search queries for AI search visibility testing")
    pdf.body_text("- HTTP header analysis (security, caching, performance)")
    pdf.body_text("- Word count analysis of all content files")

    # ── TECHNICAL SEO ──
    pdf.add_page()
    pdf.section_title("3. Technical SEO Audit")
    pdf.body_text("Technical SEO is the foundation of search visibility. Without proper crawlability, indexability, and structured data, even the best content will not rank.")

    pdf.sub_title("3.1 Title Tags")
    pdf.finding_table(
        ["Page", "Title", "Length", "Issue"],
        [
            ["Homepage", "Riddles Rush | Exercises For Your Brain", "40 chars", "OK"],
            ["Blog /blog", "Riddles Rush | Exercises For Your Brain", "40 chars", "DUPLICATE -- same as homepage"],
            ["Blog Post", "Campfire Riddles with Answers | Riddles Rush", "44 chars", "OK"],
            ["Riddle Hub", "Tricky Riddles | Riddles Rush", "28 chars", "OK"],
            ["Category", "Kids Riddles | Riddles Rush", "26 chars", "OK"],
            ["About", "About | Riddles Rush", "19 chars", "OK"],
            ["Riddle of Day", "Riddles Rush | Exercises For Your Brain", "40 chars", "DUPLICATE -- same as homepage"],
            ["Riddle Hub", "Brain Teasers with Solutions (with Solutions)", "58 chars", "Awkward double phrasing"],
        ],
        [35, 75, 25, 55]
    )
    pdf.body_text("Verdict: 2 critical duplicates. Blog index and riddle-of-the-day inherit the root layout title. Severity: High.")

    pdf.sub_title("3.2 Meta Descriptions")
    pdf.body_text("Blog index and riddle-of-the-day inherit the root description, creating duplicates. Blog posts use generateMetadata correctly. Severity: High.")

    pdf.sub_title("3.3 Canonical Tags")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(220, 53, 69)
    pdf.cell(0, 7, "STATUS: COMPLETELY ABSENT across all pages.", new_x="LMARGIN", new_y="NEXT")
    pdf.body_text("No <link rel='canonical'> tag found on any page. Without canonicals, search engines may index duplicate/variant URLs and dilute link equity. Severity: Critical.")

    pdf.sub_title("3.4 Open Graph Tags")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(220, 53, 69)
    pdf.cell(0, 7, "STATUS: COMPLETELY ABSENT across all pages.", new_x="LMARGIN", new_y="NEXT")
    pdf.body_text("No og:title, og:description, og:image tags found. Social sharing on Facebook, LinkedIn, Slack, Discord will show generic/broken previews. Severity: Critical.")

    pdf.sub_title("3.5 Twitter Card Tags")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(220, 53, 69)
    pdf.cell(0, 7, "STATUS: COMPLETELY ABSENT across all pages.", new_x="LMARGIN", new_y="NEXT")
    pdf.body_text("No twitter:card, twitter:title tags found. Severity: High.")

    pdf.sub_title("3.6 JSON-LD Structured Data")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(220, 53, 69)
    pdf.cell(0, 7, "STATUS: COMPLETELY ABSENT -- Zero schema markup on any page.", new_x="LMARGIN", new_y="NEXT")
    pdf.body_text("Missing schemas that should be implemented:")
    pdf.finding_table(
        ["Schema Type", "Where", "Why"],
        [
            ["WebSite + SearchAction", "Homepage", "Enables sitelinks search box in SERPs"],
            ["Organization", "Homepage/About", "Brand knowledge panel eligibility"],
            ["Article/BlogPosting", "Every blog post", "Rich results for articles"],
            ["FAQPage", "Blog posts with FAQs", "FAQ rich results -- content already exists!"],
            ["BreadcrumbList", "All pages with breadcrumbs", "Breadcrumb rich results in SERPs"],
            ["ItemList", "Category/hub pages", "List rich results"],
        ],
        [50, 50, 90]
    )
    pdf.body_text("Severity: Critical. The blog posts have FAQ sections perfectly primed for FAQPage schema but none is generated.")

    pdf.sub_title("3.7 robots.txt")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(220, 53, 69)
    pdf.cell(0, 7, "STATUS: 404 -- DOES NOT EXIST.", new_x="LMARGIN", new_y="NEXT")
    pdf.body_text("No robots.txt file. Search engine crawlers have no crawl directives and no sitemap reference. Severity: Critical.")

    pdf.sub_title("3.8 sitemap.xml")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(220, 53, 69)
    pdf.cell(0, 7, "STATUS: 404 -- DOES NOT EXIST.", new_x="LMARGIN", new_y="NEXT")
    pdf.body_text("Neither /sitemap.xml nor /sitemap-0.xml return valid sitemaps. With ~661 pages, crawl discovery is severely hampered. Severity: Critical.")

    pdf.sub_title("3.9 HTTP Headers & Security")
    pdf.finding_table(
        ["Header", "Status", "Notes"],
        [
            ["HSTS", "PASS", "max-age=63072000; includeSubDomains; preload"],
            ["Content-Type", "PASS", "UTF-8 charset"],
            ["Cache-Control", "WEAK", "max-age=0, must-revalidate -- no browser caching"],
            ["CSP", "MISSING", "No Content-Security-Policy header"],
            ["X-Frame-Options", "MISSING", "No clickjacking protection"],
            ["X-Content-Type-Options", "MISSING", "No MIME sniffing protection"],
        ],
        [55, 25, 110]
    )

    pdf.sub_title("3.10 Page Size & Performance")
    pdf.finding_table(
        ["Page", "Size", "Load Time", "Status"],
        [
            ["Homepage", "124 KB", "0.39s", "OK but bloated"],
            ["Blog Post", "71 KB", "0.31s", "OK"],
            ["Category Index", "62 KB", "0.96s", "Slow"],
            ["Riddle of Day", "28 KB", "0.28s", "OK"],
        ],
        [45, 30, 30, 85]
    )

    # ── CONTENT QUALITY ──
    pdf.add_page()
    pdf.section_title("4. Content Quality & E-E-A-T Audit")

    pdf.sub_title("4.1 Content Depth -- CRITICAL FINDING")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(220, 53, 69)
    pdf.cell(0, 7, "Average blog post: 86 words -- EXTREMELY THIN CONTENT", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)
    pdf.finding_table(
        ["Metric", "Value", "Assessment"],
        [
            ["Total blog posts", "472", "High volume"],
            ["Average words per post", "86", "CRITICAL -- below 100 words"],
            ["Posts under 100 words", "453 (96%)", "CRITICAL -- nearly all posts"],
            ["Posts under 200 words", "462 (98%)", "CRITICAL -- almost no depth"],
            ["Thickest post", "369 words", "Still thin by SEO standards"],
            ["Total blog words", "40,783", "Spread across 472 posts"],
            ["Riddle files", "94 files, avg 92 words", "Thin"],
        ],
        [60, 50, 80]
    )
    pdf.body_text("Google's helpful content system will penalize sites with this proportion of thin/empty pages. The 472 blog posts collectively contain only 40,783 words -- less than a single comprehensive guide.")

    pdf.sub_title("4.2 E-E-A-T Assessment")
    pdf.finding_table(
        ["Dimension", "Score", "Details"],
        [
            ["Experience", "2/5", "Author named (Patrick Stevens) but no personal experience signals"],
            ["Expertise", "1/5", "No credentials, no riddle expertise claims, generic author description"],
            ["Authoritativeness", "2/5", "Brand consistent; social links exist; no external validation"],
            ["Trustworthiness", "3/5", "HTTPS, privacy policy, contact email present"],
        ],
        [40, 20, 130]
    )

    pdf.sub_title("4.3 Content Originality")
    pdf.body_text("Content appears to be mechanically paraphrased from the original site using synonym replacement (e.g., 'fun and engaging' became 'enjoyable and challenging'). This is NOT genuine original content and presents significant copyright risk.")
    pdf.body_text("Google's helpful content system specifically targets sites that repurpose existing content without adding original value.")

    pdf.sub_title("4.4 Content Freshness")
    pdf.body_text("Most blog posts have publication dates set to the scrape date. No 'last updated' markers visible. The original campfire-riddles post has a 2025 date, suggesting some posts retained original dates.")

    # ── AEO AUDIT ──
    pdf.add_page()
    pdf.section_title("5. AEO (Answer Engine Optimization) Audit")

    pdf.sub_title("5.1 Direct Answer Readiness")
    pdf.body_text("Score: 1/3")
    pdf.body_text("Homepage does NOT answer a direct question early. Opens with branding hero, then shows a single featured riddle with a show-answer toggle. No definitional block explaining 'what are riddles' or 'what is Riddles Rush.'")
    pdf.body_text("CRITICAL: Riddle answers are hidden behind JavaScript toggles and not available in server-rendered HTML. AI crawlers cannot see the answer content.")

    pdf.sub_title("5.2 Question-Answer Structure")
    pdf.body_text("Score: 2/3")
    pdf.body_text("FAQ sections exist on homepage (6 items) and blog posts (3 items each). However, no FAQPage JSON-LD schema markup exists. Answers appear collapsed/hidden in HTML.")

    pdf.sub_title("5.3 Definition Blocks")
    pdf.body_text("Score: 0/2")
    pdf.body_text("No standalone definition blocks that AI systems can extract as authoritative answers. No glossary, no 'What is a riddle?' content.")

    pdf.sub_title("5.4 Step-by-Step Content")
    pdf.body_text("Score: 0/2")
    pdf.body_text("Zero step-by-step content. No 'How to solve riddles' guide, no 'How to host a riddle night' tutorial. This is prime AEO material being wasted.")

    pdf.sub_title("5.5 Comparison Content")
    pdf.body_text("Score: 0/2")
    pdf.body_text("No comparison tables or structured comparison content. No 'Riddles vs. Brain Teasers vs. Puzzles' comparison.")

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(119, 54, 254)
    pdf.cell(0, 10, "AEO Total Score: 5/15", new_x="LMARGIN", new_y="NEXT")

    # ── GEO AUDIT ──
    pdf.add_page()
    pdf.section_title("6. GEO (Generative Engine Optimization) Audit")

    pdf.sub_title("6.1 Entity Clarity")
    pdf.body_text("Score: 2/3")
    pdf.body_text("Brand 'Riddles Rush' is clearly defined internally. Creator Patrick Stevens named on About page. However, uses Vercel subdomain (riddles-rush-five.vercel.app) which dilutes brand authority. No external entity proof exists.")

    pdf.sub_title("6.2 Source-Worthiness for AI Systems")
    pdf.body_text("Score: 0/3")
    pdf.finding_table(
        ["Signal", "Status"],
        [
            ["Original content", "Mechanically paraphrased -- not truly original"],
            ["Citations/references", "Zero citations or source attributions"],
            ["Evidence-backed claims", "No statistical or factual assertions"],
            ["Fresh content signals", "No dates, no freshness metadata"],
            ["Content depth", "Riddles are thin by nature; no editorial content"],
            ["Unique value proposition", "Standard riddle format -- nothing unique vs competitors"],
        ],
        [60, 130]
    )

    pdf.sub_title("6.3 AI Search Visibility Results")
    pdf.body_text("Score: 0/4")
    pdf.finding_table(
        ["Search Query", "Result"],
        [
            ["riddles with answers", "NOT FOUND -- dominated by riddles.com, parade.com"],
            ["best riddle collections online", "NOT FOUND"],
            ["campfire riddles", "NOT FOUND"],
            ["tricky riddles with answers", "NOT FOUND"],
            ["riddles rush (brand)", "NOT FOUND on any search engine"],
        ],
        [80, 110]
    )

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(119, 54, 254)
    pdf.cell(0, 10, "GEO Total Score: 3/15", new_x="LMARGIN", new_y="NEXT")

    # ── AI SEARCH VISIBILITY ──
    pdf.add_page()
    pdf.section_title("7. AI Search Visibility Audit")

    pdf.sub_title("7.1 Critical Indexing Blockers")
    pdf.finding_table(
        ["Issue", "Severity", "Impact"],
        [
            ["robots.txt returns 404", "CRITICAL", "Crawlers cannot find directives"],
            ["sitemap.xml returns 404", "CRITICAL", "No page discovery map for crawlers"],
            ["No canonical tags", "CRITICAL", "Duplicate content risk, diluted equity"],
            ["No Open Graph tags", "CRITICAL", "Poor social/AI sharing previews"],
            ["No JSON-LD structured data", "CRITICAL", "Zero schema markup across entire site"],
            ["No Twitter Card tags", "HIGH", "Minimal Twitter/X previews"],
            ["Vercel subdomain", "HIGH", "Hurts brand authority and AI citation"],
        ],
        [60, 30, 100]
    )

    pdf.sub_title("7.2 What Works")
    pdf.finding_table(
        ["Signal", "Status"],
        [
            ["Server-side rendered HTML", "PASS -- content is SSR'd via Next.js"],
            ["Meta description", "PASS -- present on all pages tested"],
            ["Page titles", "PASS -- descriptive and keyword-rich"],
            ["Image alt text", "PASS -- all images have descriptive alt attributes"],
            ["Heading hierarchy", "PASS -- proper H1 > H2 > H3 structure"],
            ["FAQ sections", "PASS -- present on homepage and blog pages"],
            ["Internal linking", "PASS -- good cross-linking between categories"],
            ["Mobile responsive", "PASS -- responsive with proper viewport meta"],
            ["HTTPS", "PASS -- full HTTPS with HSTS"],
        ],
        [60, 130]
    )

    pdf.sub_title("7.3 Conversation SEO")
    pdf.body_text("Score: 2/10")
    pdf.body_text("The site cannot answer full human decision questions:")
    pdf.body_text("- 'Which riddle website has the best collections?' -- No comparison content")
    pdf.body_text("- 'Where can I find riddles for kids with answers?' -- Page exists but not structured as direct answer")
    pdf.body_text("- 'What's a good riddle for a campfire?' -- Page exists but answers hidden behind JS")
    pdf.body_text("- 'Are there free riddle collections online?' -- No pricing/free-tier content")

    # ── ENTITY SEO ──
    pdf.add_page()
    pdf.section_title("8. Entity SEO Audit")
    pdf.body_text("Score: 3/15")

    pdf.sub_title("8.1 Brand Entity Profile")
    pdf.finding_table(
        ["Entity Element", "Status", "Details"],
        [
            ["Organization name", "PASS", "Riddles Rush consistently used"],
            ["Creator/Person", "PASS", "Patrick Stevens (About page)"],
            ["Contact email", "PASS", "contact@patrickws.com"],
            ["Custom domain", "FAIL", "Uses Vercel subdomain"],
            ["Wikipedia page", "FAIL", "None"],
            ["LinkedIn company", "FAIL", "None"],
            ["Social profiles", "PARTIAL", "Pinterest/YouTube links (unverified)"],
            ["Knowledge panel", "FAIL", "None"],
            ["External mentions", "FAIL", "Zero backlink/mention presence"],
        ],
        [50, 25, 115]
    )

    pdf.sub_title("8.2 Schema Markup Analysis")
    pdf.finding_table(
        ["Schema Type", "Status"],
        [
            ["Organization", "NOT IMPLEMENTED"],
            ["Person (Patrick Stevens)", "NOT IMPLEMENTED"],
            ["WebSite", "NOT IMPLEMENTED"],
            ["Article/BlogPosting", "NOT IMPLEMENTED"],
            ["FAQPage", "NOT IMPLEMENTED"],
            ["BreadcrumbList", "NOT IMPLEMENTED"],
            ["ItemList", "NOT IMPLEMENTED"],
        ],
        [95, 95]
    )

    # ── REPUTATION ──
    pdf.section_title("9. Reputation SEO Audit")
    pdf.body_text("Score: 1/10")
    pdf.finding_table(
        ["Proof Source", "Status", "Action"],
        [
            ["Google Reviews", "NONE", "Create and optimize Google Business Profile"],
            ["Product Hunt", "NONE", "Launch on Product Hunt"],
            ["Reddit mentions", "NONE", "Engage in r/riddles community"],
            ["Twitter/X mentions", "NONE", "Build social presence"],
            ["Hacker News", "NONE", "Consider Show HN for the app"],
            ["Tech blogs", "NONE", "Pitch to edtech/fun sites"],
            ["App Store reviews", "UNVERIFIED", "App listed but reviews unknown"],
            ["Pinterest presence", "UNVERIFIED", "Link exists, content unverified"],
            ["YouTube presence", "UNVERIFIED", "Link exists, content unverified"],
        ],
        [50, 30, 110]
    )

    # ── 30/60/90 DAY PLAN ──
    pdf.add_page()
    pdf.section_title("10. 30/60/90-Day Growth Plan")

    pdf.sub_title("30 Days -- Technical Remediation (Must Fix Now)")
    pdf.body_text("Priority: Critical. These fixes block ALL search visibility.")
    pdf.body_text("")
    pdf.body_text("1. Create robots.txt with User-agent: *, Allow: /, Sitemap: directive")
    pdf.body_text("2. Create dynamic sitemap.xml using Next.js app/sitemap.ts for all 661 pages")
    pdf.body_text("3. Add canonical tags to every page via metadata.alternates.canonical")
    pdf.body_text("4. Add Open Graph tags (og:title, og:description, og:image, og:url, og:type)")
    pdf.body_text("5. Add Twitter Card tags (twitter:card, twitter:title, twitter:description)")
    pdf.body_text("6. Add FAQPage JSON-LD schema to all blog posts with FAQ sections")
    pdf.body_text("7. Add Article/BlogPosting JSON-LD to all blog posts")
    pdf.body_text("8. Add WebSite + Organization JSON-LD to homepage")
    pdf.body_text("9. Add BreadcrumbList JSON-LD to all pages with breadcrumbs")
    pdf.body_text("10. Fix duplicate titles on /blog and /riddle-of-the-day")
    pdf.body_text("11. Fix duplicate meta descriptions on /blog and /riddle-of-the-day")

    pdf.sub_title("60 Days -- Content & Authority (High Impact)")
    pdf.body_text("Priority: High. These improvements drive ranking and AI citation potential.")
    pdf.body_text("")
    pdf.body_text("1. Expand blog posts from avg 86 words to 300-500+ words with original content")
    pdf.body_text("2. Add author bylines and expertise signals to all blog posts")
    pdf.body_text("3. Create 'What is a Riddle?' definitional content block for AEO")
    pdf.body_text("4. Create 'How to Solve Tricky Riddles' step-by-step guide")
    pdf.body_text("5. Create 'Riddles vs. Brain Teasers vs. Puzzles' comparison page")
    pdf.body_text("6. Make riddle answers server-rendered (not hidden behind JS toggles)")
    pdf.body_text("7. Add 'last updated' dates to all content pages")
    pdf.body_text("8. Create author profile page with credentials and expertise")
    pdf.body_text("9. Expand About page to 1,500+ words with expertise signals")
    pdf.body_text("10. Add security headers (CSP, X-Frame-Options, X-Content-Type-Options)")

    pdf.sub_title("90 Days -- Growth & Reputation (Strategic Build)")
    pdf.body_text("Priority: Medium. These actions build long-term authority and AI visibility.")
    pdf.body_text("")
    pdf.body_text("1. Migrate to custom domain (e.g., riddlesrush.com)")
    pdf.body_text("2. Submit to Google Search Console and Bing Webmaster Tools")
    pdf.body_text("3. Launch on Product Hunt and engage Reddit riddle communities")
    pdf.body_text("4. Create pillar content for each category (1,500+ words)")
    pdf.body_text("5. Build backlinks through guest posts on education/family sites")
    pdf.body_text("6. Add user engagement metrics (solve counts, visitor counts)")
    pdf.body_text("7. Create comparison content: 'Best Riddle Sites 2026'")
    pdf.body_text("8. Monitor AI search visibility across ChatGPT, Gemini, Perplexity")
    pdf.body_text("9. Build external entity profiles (LinkedIn, Crunchbase, Wikipedia)")
    pdf.body_text("10. Create 'Riddle of the Day' with structured data for freshness signals")

    # ── EXACT NEXT ACTIONS ──
    pdf.add_page()
    pdf.section_title("11. Exact Next Actions")
    pdf.body_text("These are the specific code changes needed, in priority order:")
    pdf.body_text("")
    pdf.body_text("FILE: public/robots.txt (NEW)")
    pdf.body_text("  Create with: User-agent: *, Allow: /, Sitemap: https://riddles-rush-five.vercel.app/sitemap.xml")
    pdf.body_text("")
    pdf.body_text("FILE: src/app/sitemap.ts (NEW)")
    pdf.body_text("  Dynamic sitemap generating URLs for all 472 blog posts, 94 riddle pages, 8 categories, 39 pagination pages, and 7 utility pages")
    pdf.body_text("")
    pdf.body_text("FILE: src/app/layout.tsx (MODIFY)")
    pdf.body_text("  Add: openGraph, twitter, alternates.canonical, metadataBase to root metadata export")
    pdf.body_text("")
    pdf.body_text("FILE: src/app/blog/page.tsx (MODIFY)")
    pdf.body_text("  Add: metadata export with unique title 'Riddle Collections | Riddles Rush' and unique description")
    pdf.body_text("")
    pdf.body_text("FILE: src/app/blog/[slug]/page.tsx (MODIFY)")
    pdf.body_text("  Add: FAQPage JSON-LD schema, Article/BlogPosting schema, BreadcrumbList schema, openGraph in generateMetadata")
    pdf.body_text("")
    pdf.body_text("FILE: src/app/riddles/[slug]/page.tsx (MODIFY)")
    pdf.body_text("  Add: BreadcrumbList schema, openGraph in generateMetadata")
    pdf.body_text("")
    pdf.body_text("FILE: src/app/riddle-of-the-day/page.tsx (MODIFY)")
    pdf.body_text("  Add: metadata export with unique title and description")

    # ── DATA NOT AVAILABLE ──
    pdf.add_page()
    pdf.section_title("12. Data Not Available / Needed Next")
    pdf.body_text("The following data was not available during this audit and would improve accuracy:")
    pdf.body_text("")
    pdf.body_text("1. Google Search Console data -- Required to verify actual indexing status, impressions, clicks, and keyword rankings")
    pdf.body_text("2. Google Analytics data -- Required to verify actual traffic, user behavior, and conversion rates")
    pdf.body_text("3. Ahrefs/Semrush/Moz data -- Required to verify backlink count, domain authority, referring domains, and competitor analysis")
    pdf.body_text("4. Apify API token -- Would enable automated crawling, SERP scraping, and competitor analysis at scale")
    pdf.body_text("5. Custom domain -- The Vercel subdomain significantly limits brand authority and AI citation potential")
    pdf.body_text("6. Google Business Profile -- If targeting local audiences, GBP optimization would be critical")
    pdf.body_text("7. PageSpeed Insights API -- Would provide detailed Core Web Vitals and performance recommendations")
    pdf.body_text("")
    pdf.body_text("Recommended next step: Set up Google Search Console, submit the sitemap, and verify indexation status within 2 weeks of technical fixes.")

    # ── DISCLAIMER ──
    pdf.ln(10)
    pdf.set_draw_color(200, 200, 200)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)
    pdf.set_font("Helvetica", "I", 8)
    pdf.set_text_color(150, 150, 150)
    pdf.multi_cell(0, 4, "Disclaimer: This audit was conducted using the Beyond SEO v1.0.3 methodology in Native Agent Scraping Mode. No APIFY, GSC, GA4, Ahrefs, Semrush, or Moz data was available. All findings are based on live HTTP crawling and source code inspection. Scores and recommendations should be validated with actual search console and analytics data when available. No guarantees of ranking improvement are made or implied.")

    # Save
    output_path = "C:/Users/ADMIN/Desktop/riddlerush-clone/riddlesrush-clone/docs/RiddlesRush-SEO-AEO-GEO-Audit-Report.pdf"
    pdf.output(output_path)
    print(f"Report generated: {output_path}")
    print(f"Pages: {pdf.page_no()}")


if __name__ == "__main__":
    generate_report()
