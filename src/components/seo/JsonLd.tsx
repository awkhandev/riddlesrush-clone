interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://riddles-rush.vercel.app/#organization",
        name: "Riddles Rush",
        url: "https://riddles-rush.vercel.app",
        logo: {
          "@type": "ImageObject",
          url: "https://riddles-rush.vercel.app/images/riddlesrush-icon.png",
          width: 512,
          height: 512,
        },
        description:
          "Riddles Rush offers free riddles, brain teasers, and puzzles for kids and adults, organized by theme, difficulty, and occasion.",
        founder: {
          "@type": "Person",
          name: "Patrick Stevens",
        },
        sameAs: [],
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://riddles-rush.vercel.app/#website",
        url: "https://riddles-rush.vercel.app",
        name: "Riddles Rush",
        description:
          "Free riddles, brain teasers, and puzzles for kids and adults.",
        publisher: {
          "@id": "https://riddles-rush.vercel.app/#organization",
        },
        inLanguage: "en-US",
      }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  image = "/images/og-default.png",
  datePublished,
  dateModified,
  author = "Patrick Stevens",
}: ArticleSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url,
        image: image.startsWith("http")
          ? image
          : `https://riddles-rush.vercel.app${image}`,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          "@type": "Person",
          name: author,
        },
        publisher: {
          "@id": "https://riddles-rush.vercel.app/#organization",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        inLanguage: "en-US",
      }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  faqs: FAQItem[];
}

export function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url.startsWith("http")
            ? item.url
            : `https://riddles-rush.vercel.app${item.url}`,
        })),
      }}
    />
  );
}

interface CollectionPageSchemaProps {
  title: string;
  description: string;
  url: string;
  itemCount: number;
}

export function CollectionPageSchema({
  title,
  description,
  url,
  itemCount,
}: CollectionPageSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: url.startsWith("http")
          ? url
          : `https://riddles-rush.vercel.app${url}`,
        isPartOf: {
          "@id": "https://riddles-rush.vercel.app/#website",
        },
        about: {
          "@type": "Thing",
          name: "Riddles and Brain Teasers",
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: itemCount,
          itemListElement: [],
        },
        inLanguage: "en-US",
      }}
    />
  );
}
