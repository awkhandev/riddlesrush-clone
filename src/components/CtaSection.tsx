import Link from "next/link";
import { Check } from "lucide-react";

interface CtaSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  features?: string[];
}

export function CtaSection({
  title,
  description,
  buttonText,
  buttonHref,
  features,
}: CtaSectionProps) {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>

        {features && features.length > 0 && (
          <ul className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-3 text-left sm:text-center mx-auto max-w-3xl">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-gray-700"
              >
                <Check className="h-5 w-5 shrink-0 text-[#7736FE]" />
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          href={buttonHref}
          className="mt-10 inline-block bg-[#7736FE] text-white rounded-lg px-8 py-3 text-base font-semibold hover:bg-purple-700 transition-colors shadow-sm"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
