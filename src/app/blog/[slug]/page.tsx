import Link from "next/link";
import { Home, ChevronRight, Rocket, BookOpen, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogRiddleCard } from "@/components/BlogRiddleCard";
import { getBlogPost, getAllBlogSlugs, getBlogPostsByCategory } from "@/lib/content";
import { ArticleSchema, FAQPageSchema } from "@/components/seo/JsonLd";
import { generateBlogPostMetadata } from "@/lib/seo-metadata";

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
  const faqSection = content.split(/##\s+Frequently Asked Questions|##\s+FAQ/i)[1];
  if (!faqSection) return faqs;

  const qaBlocks = faqSection.split(/(?=^###\s)/m);
  for (const block of qaBlocks) {
    if (!block.trim() || !block.startsWith("###")) continue;
    const qMatch = block.match(/^###\s+(.+)/m);
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
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
  const mainRiddles = riddles.slice(0, 10);
  const moreRiddles = riddles.slice(10);
  const faqs = parseFAQsFromContent(content);

  const relatedPosts = getBlogPostsByCategory(frontmatter.categorySlug)
    .filter((p) => p.slug !== slug)
    .slice(0, 6);

  return (
    <>
      <ArticleSchema
        title={frontmatter.title}
        description={frontmatter.description}
        url={`https://riddlesrush.com/blog/${frontmatter.slug}`}
        datePublished={frontmatter.publishedAt}
        dateModified={frontmatter.updatedAt}
        lastReviewed={frontmatter.lastReviewed}
        author={frontmatter.author}
      />
      {faqs.length > 0 && <FAQPageSchema faqs={faqs} />}
      <Header />
      <main className="flex-1">
        <div className="relative py-3 sm:py-4 lg:py-6">
          {/* Breadcrumb */}
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 sm:mb-3 lg:mb-4">
            <nav className="text-sm text-gray-600 flex flex-wrap items-center gap-1" aria-label="Breadcrumb">
              <Link className="inline-flex items-center hover:text-[#7736FE] transition-colors" href="/">
                <Home className="w-4 h-4 mr-1 shrink-0" aria-hidden="true" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
              <Link className="hover:text-[#7736FE] transition-colors" href="/blog">
                Riddles
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
              <span className="text-gray-900 font-medium line-clamp-2 sm:line-clamp-1" title={frontmatter.title}>
                {frontmatter.title}
              </span>
            </nav>
          </div>

          <div className="relative">
            <div className="container max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <article lang="en">
                <div className="text-center mb-4 sm:mb-5 lg:mb-6">
                  <div className="mb-2 sm:mb-2.5 lg:mb-3">
                    <span className="text-5xl filter drop-shadow-lg sm:text-6xl lg:text-7xl">
                      {frontmatter.emoji}
                    </span>
                  </div>
                  <h1 className="mb-2 text-3xl font-bold leading-snug text-gray-900 sm:mb-3 sm:text-4xl sm:leading-tight lg:mb-3 lg:text-4xl">
                    {frontmatter.title}
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                    {frontmatter.description}
                  </p>
                </div>

                <div className="blog-post-content prose prose-lg max-w-none">
                  {mainRiddles.map((riddle, index) => (
                    <BlogRiddleCard
                      key={index}
                      question={riddle.question}
                      answer={riddle.answer}
                      index={index + 1}
                    />
                  ))}

                  {moreRiddles.length > 0 && (
                    <>
                      <hr className="my-8 border-gray-300 border-t-2" />
                      <h2 className="text-3xl font-semibold text-gray-800 my-4">
                        More {frontmatter.title.replace(" with Answers", "")}
                      </h2>
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

                  {faqs.length > 0 && (
                    <>
                      <hr className="my-8 border-gray-300 border-t-2" />
                      <h3 className="text-2xl font-semibold text-gray-800 my-4">FAQ</h3>
                      {faqs.map((faq, index) => (
                        <div key={index} className="my-4">
                          <p className="text-lg leading-relaxed text-gray-700">
                            <strong className="font-bold text-gray-900">{faq.question}</strong>
                            <br />
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* "Ready to Test Your Brain?" CTA Card */}
                <div className="mt-8 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 p-5 shadow-lg sm:mt-12 sm:p-6 lg:mt-16 lg:p-8">
                  <div className="text-center">
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4">
                      Ready to Test Your Brain?
                    </h2>
                    <p className="mx-auto mb-4 max-w-2xl text-base text-gray-700 sm:mb-6">
                      Challenge yourself with our collection of brain-teasing riddles perfect for all ages!
                    </p>
                    <ul className="mx-auto mb-6 max-w-md space-y-1.5 text-left sm:mb-8 sm:space-y-2">
                      <li className="flex items-center text-gray-700">
                        <span className="text-green-500 mr-3">✓</span>
                        Play fun and tricky riddles
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="text-green-500 mr-3">✓</span>
                        Challenge yourself daily with fresh brain teasers
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="text-green-500 mr-3">✓</span>
                        Perfect for all ages: kids, teens, and adults
                      </li>
                    </ul>
                    <Link className="inline-block" href="/">
                      <button className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#6658fe] text-white font-semibold focus:outline-none hover:bg-[#6658fed4] h-11 rounded-md text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                        <Rocket className="w-6 h-6 mr-3" />
                        Start Playing Riddles
                      </button>
                    </Link>
                  </div>
                </div>
              </article>

              {/* Related Posts Section */}
              {relatedPosts.length > 0 && (
                <div className="mt-10 sm:mt-12 lg:mt-16">
                  <aside className="w-full">
                    <div>
                      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl border border-blue-200">
                        <div className="flex items-center mb-3">
                          <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                          <h3 className="text-2xl font-bold text-gray-900">
                            More {frontmatter.category}
                          </h3>
                        </div>
                        <p className="text-lg text-gray-600">Discover more brain teasers in this category</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedPosts.map((related) => (
                          <article
                            key={related.slug}
                            className="group bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200 h-full"
                          >
                            <Link className="block h-full" href={`/blog/${related.slug}`}>
                              <div className="text-center mb-4">
                                <span className="text-4xl block mb-3">{related.frontmatter.emoji}</span>
                                <h4 className="font-bold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                  {related.frontmatter.title}
                                </h4>
                              </div>
                              <div className="mt-auto pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-center text-sm text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                                  <span>Read Article</span>
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </Link>
                          </article>
                        ))}
                      </div>

                      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
                        <Link
                          className="inline-flex items-center text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                          href="/blog"
                        >
                          <BookOpen className="w-5 h-5 mr-3" />
                          View All Posts
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </aside>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
