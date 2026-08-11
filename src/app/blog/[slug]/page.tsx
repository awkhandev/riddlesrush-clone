import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogRiddleCard } from "@/components/BlogRiddleCard";
import { ArtHero } from "@/components/art";
import { getBlogPost, getAllBlogSlugs, getBlogPostsByCategory } from "@/lib/content";
import { ArticleSchema, FAQPageSchema, BreadcrumbListSchema } from "@/components/seo/JsonLd";
import { generateBlogPostMetadata } from "@/lib/seo-metadata";
import { getBlogTheme } from "@/lib/visual";

interface Riddle {
  question: string;
  answer: string;
}

function parseRiddlesFromContent(content: string): Riddle[] {
  const riddles: Riddle[] = [];
  const sections = content.split(/(?=^##\s+\d+[.)]\s)/m);

  for (const section of sections) {
    if (!section.trim()) continue;

    const questionMatch = section.match(/(?:^##\s+\d+[.)]\s+)(.+?)(?:\n)/m);
    const answerMatch = section.match(/\*\*Answer:\*\*\s*(.+)/i);

    if (questionMatch) {
      riddles.push({
        question: questionMatch[1].trim(),
        answer: answerMatch ? answerMatch[1].trim() : "",
      });
    }
  }

  return riddles;
}

interface FAQItem {
  question: string;
  answer: string;
}

function parseFAQsFromContent(content: string): FAQItem[] {
  const faqs: FAQItem[] = [];
  // Look for ### headings under "## Frequently Asked Questions"
  const faqSection = content.split(/##\s+Frequently Asked Questions/i)[1];
  if (!faqSection) return faqs;

  // Split by ### headings
  const qaBlocks = faqSection.split(/(?=^###\s)/m);
  for (const block of qaBlocks) {
    if (!block.trim() || !block.startsWith("###")) continue;
    const qMatch = block.match(/^###\s+(.+)/m);
    // Answer is everything after the heading until next heading or end
    const aMatch = block.match(/^###\s+.+\n+([\s\S]*?)(?=\n###|\n##\s|\n\*\*|$)/m);
    if (qMatch && aMatch) {
      faqs.push({
        question: qMatch[1].trim(),
        answer: aMatch[1].trim(),
      });
    }
  }
  return faqs;
}

const features = [
  "Hundreds of riddles with answers",
  "Fun for all ages and skill levels",
  "Perfect for parties and classrooms",
  "New riddles added regularly",
];

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found | Riddles Rush" };
  }

  return generateBlogPostMetadata(post);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="container max-w-5xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-[#7736FE] text-white font-semibold rounded-lg hover:bg-[#6a2ee6] transition-colors"
            >
              Browse All Posts
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { frontmatter, content } = post;
  const riddles = parseRiddlesFromContent(content);

  // Split riddles: first 7 are "main", rest are "more"
  const mainRiddles = riddles.slice(0, 7);
  const moreRiddles = riddles.slice(7);

  // Extract FAQs from markdown content (fall back to empty array)
  const extractedFAQs = parseFAQsFromContent(content);

  // Extract "more riddles" intro from markdown
  let moreRiddlesIntro = "Here are some extras for when one set of riddles just isn't enough.";
  const moreSectionMatch = content.match(/##\s+More\s+.+?Riddles\s*\n+([\s\S]*?)(?=\n##\s|\n###\s|\n\d+[.)]\s)/i);
  if (moreSectionMatch && moreSectionMatch[1].trim()) {
    moreRiddlesIntro = moreSectionMatch[1].trim();
  }

  // Get related posts from the same category
  const relatedPosts = getBlogPostsByCategory(frontmatter.categorySlug)
    .filter((p) => p.slug !== slug)
    .slice(0, 6);

  // Try to extract an intro from the markdown (the first non-heading paragraph)
  const contentLines = content.split("\n").filter((line) => line.trim());
  let introText = frontmatter.description;
  for (const line of contentLines) {
    if (
      line.trim() &&
      !line.startsWith("#") &&
      !line.startsWith("**") &&
      !line.startsWith("## ")
    ) {
      introText = line.trim();
      break;
    }
  }

  const faqs = extractedFAQs.length > 0 ? extractedFAQs : [
    {
      question: `What are ${frontmatter.title.toLowerCase().replace(" with answers", "")}?`,
      answer: `${frontmatter.title.replace(" with Answers", "")} are fun, themed brain teasers perfect for parties, classrooms, and family gatherings. They challenge your thinking while keeping everyone entertained.`,
    },
    {
      question: "Are these riddles suitable for kids?",
      answer: "Yes! These riddles are family-friendly and perfect for kids of all ages. They are great for classroom activities, holiday parties, and family game nights.",
    },
    {
      question: "Can I use these riddles for a trivia game?",
      answer: "Absolutely! These riddles work perfectly as trivia questions. You can use them for parties, family gatherings, or any celebration.",
    },
  ];

  return (
    <>
      <ArticleSchema
        title={frontmatter.title}
        description={frontmatter.description}
        url={`https://riddles-rush.vercel.app/blog/${frontmatter.slug}`}
        datePublished={frontmatter.publishedAt}
        dateModified={frontmatter.updatedAt}
        lastReviewed={frontmatter.lastReviewed}
        author={frontmatter.author}
      />
      <FAQPageSchema faqs={faqs} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Categories", url: "/blog" },
          { name: frontmatter.category, url: `/blog/category/${frontmatter.categorySlug}` },
          { name: frontmatter.title, url: `/blog/${frontmatter.slug}` },
        ]}
      />
      <Header />
      <main className="flex-1">
        {/* Article Header */}
        <ArtHero
          theme={getBlogTheme(frontmatter.categorySlug)}
          emoji={frontmatter.emoji}
          title={frontmatter.title}
          description={frontmatter.description}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/blog" },
            {
              label: frontmatter.category,
              href: `/blog/category/${frontmatter.categorySlug}`,
            },
            { label: frontmatter.title },
          ]}
          seed={frontmatter.slug}
        />

        {/* Riddle Content Area */}
        <section className="container max-w-4xl mx-auto px-4">
          <div className="blog-post-content prose prose-lg max-w-none">
            {/* Main Riddles Section */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">
              {frontmatter.emoji} {frontmatter.title.replace(" with Answers", "")} (With Answers)
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {introText}
            </p>

            {mainRiddles.map((riddle, index) => (
              <BlogRiddleCard
                key={index}
                question={riddle.question}
                answer={riddle.answer}
                index={index + 1}
              />
            ))}

            {/* More Riddles Section */}
            {moreRiddles.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
                  🧩 More {frontmatter.category.replace(" Riddles", "")} Riddles
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {moreRiddlesIntro}
                </p>

                {moreRiddles.map((riddle, index) => (
                  <BlogRiddleCard
                    key={`more-${index}`}
                    question={riddle.question}
                    answer={riddle.answer}
                    index={mainRiddles.length + index + 1}
                  />
                ))}
              </>
            )}
          </div>
        </section>

        {/* FAQ Section — from markdown content */}
        {faqs.length > 0 && (
          <section className="container max-w-4xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 border-y border-gray-100">
          <div className="container max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Ready to Test Your Brain?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Put your riddle-solving skills to the ultimate test with our
              interactive quiz!
            </p>
            <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-left sm:text-center">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 text-sm sm:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-[#7736FE] text-white font-semibold rounded-lg hover:bg-[#6a2ee6] transition-colors text-lg"
            >
              Start Playing Riddles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="container max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              More from {frontmatter.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {related.frontmatter.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#7736FE] transition-colors">
                    {related.frontmatter.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {related.frontmatter.description}
                  </p>
                  <div className="mt-4 flex items-center text-[#7736FE] font-medium text-sm">
                    Browse collection
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
