import Link from "next/link";
import {
  InstagramIcon,
  FacebookIcon,
  TwitterXIcon,
  PinterestIcon,
  TikTokIcon,
  YoutubeIcon,
  MailIcon,
} from "./icons";

const footerLinks = [
  {
    title: "Popular Riddle Topics",
    links: [
      { label: "Tricky riddles", href: "/riddles/tricky-riddles" },
      { label: "Short riddles", href: "/riddles/short-riddles" },
      { label: "Logic riddles", href: "/riddles/logic-riddles" },
      { label: "Riddles with answers", href: "/riddles/riddles-with-answers" },
      { label: "Riddle categories", href: "/blog/category" },
    ],
  },
  {
    title: "Collections & Contribute",
    links: [
      { label: "Submit Riddle", href: "/submit-riddle" },
      { label: "Collections", href: "/blog" },
    ],
  },
  {
    title: "Legal & About",
    links: [
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "About", href: "/about" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/riddlesrush1",
    icon: <InstagramIcon className="h-4 w-4" />,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/RiddlesRus27l",
    icon: <TwitterXIcon className="h-4 w-4" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Riddles-rush/61593173212651/",
    icon: <FacebookIcon className="h-4 w-4" />,
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/riddlesrush0515/",
    icon: <PinterestIcon className="h-4 w-4" />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@riddlesrush",
    icon: <TikTokIcon className="h-4 w-4" />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@RiddlesRush-j5s",
    icon: <YoutubeIcon className="h-4 w-4" />,
  },
  {
    label: "Contact",
    href: "mailto:riddlesrush1@gmail.com",
    icon: <MailIcon className="h-4 w-4" />,
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center min-h-[48px] text-sm text-gray-700 underline-offset-2 decoration-gray-400 hover:text-gray-900 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect section */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Connect
            </h3>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex items-center min-h-[48px] text-sm text-gray-700 underline-offset-2 decoration-gray-400 hover:text-gray-900 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social row */}
        <div className="mt-10 text-center text-sm text-gray-700">
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group inline-flex items-center min-h-[48px] gap-2.5 font-medium hover:text-gray-900 hover:underline"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-700 text-white group-hover:bg-gray-600">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-sm text-gray-600">
          <p>
            © 2026{" "}
            <Link
              href="/"
              className="inline-flex items-center min-h-[48px] text-gray-700 underline-offset-2 hover:text-gray-900 hover:underline"
            >
              Riddles Rush
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
