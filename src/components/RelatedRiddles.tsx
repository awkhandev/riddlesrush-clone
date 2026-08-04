import Link from "next/link";

interface RelatedRiddle {
  question: string;
  slug: string;
}

interface RelatedRiddlesProps {
  riddles: RelatedRiddle[];
}

export function RelatedRiddles({ riddles }: RelatedRiddlesProps) {
  if (riddles.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Riddles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {riddles.map((riddle) => (
          <Link
            key={riddle.slug}
            href={`/riddles/${riddle.slug}`}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
          >
            <p className="text-gray-700 text-sm font-medium leading-relaxed line-clamp-2">
              {riddle.question}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
