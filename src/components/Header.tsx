"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon, DownloadIcon, MenuIcon, XIcon } from "./icons";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Categories",
    href: "/blog",
    hasDropdown: true,
    items: [
      { label: "Kids Riddles", href: "/blog/category/kids-riddles", emoji: "🧸", description: "Fun riddles for children" },
      { label: "Adult Riddles", href: "/blog/category/adult-riddles", emoji: "🧠", description: "Challenging brain teasers" },
      { label: "Holiday Riddles", href: "/blog/category/holiday-riddles", emoji: "🎉", description: "Seasonal celebrations" },
      { label: "Family Riddles", href: "/blog/category/family-riddles", emoji: "👨‍👩‍👧‍👦", description: "For family game nights" },
      { label: "What Am I Riddles", href: "/blog/category/what-am-i-riddles", emoji: "🧩", description: "Classic guess riddles" },
      { label: "Nature Riddles", href: "/blog/category/nature-riddles", emoji: "🌲", description: "Outdoor themed puzzles" },
      { label: "Food Riddles", href: "/blog/category/food-riddles", emoji: "🍕", description: "Culinary brain teasers" },
      { label: "Sports Riddles", href: "/blog/category/sports-riddles", emoji: "⚽", description: "Athletic challenges" },
    ],
  },
  {
    label: "Browse Riddles",
    href: "/riddles/riddles-with-answers",
    hasDropdown: true,
    items: [
      { label: "Tricky Riddles", href: "/riddles/tricky-riddles", emoji: "🃏", description: "Mind-bending puzzles" },
      { label: "Short Riddles", href: "/riddles/short-riddles", emoji: "⚡", description: "Quick brain teasers" },
      { label: "Logic Riddles", href: "/riddles/logic-riddles", emoji: "🔗", description: "Logical reasoning" },
      { label: "Hard Riddles", href: "/riddles/hard-riddles", emoji: "🔥", description: "Extra challenging" },
      { label: "Kids Riddles", href: "/riddles/kids", emoji: "🧸", description: "Fun for children" },
      { label: "Nature Riddles", href: "/riddles/nature", emoji: "🌿", description: "Outdoor themed" },
      { label: "Food Riddles", href: "/riddles/food", emoji: "🍕", description: "Culinary puzzles" },
      { label: "Family Riddles", href: "/riddles/family", emoji: "👨‍👩‍👧‍👦", description: "For everyone" },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="z-40 bg-background border-b">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <Image
            src="/images/riddlesrush-icon.png"
            alt="Riddles Rush"
            width={44}
            height={44}
            className="rounded-xl"
          />
          <span className="hidden font-bold sm:inline-block text-lg">
            Riddles Rush
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() =>
                link.hasDropdown && handleMouseEnter(link.label)
              }
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={link.href}
                className="flex items-center text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer text-gray-700 hover:text-[#7736FE] hover:bg-gray-50"
                onClick={(e) => {
                  if (link.hasDropdown) {
                    e.preventDefault();
                    setOpenDropdown(openDropdown === link.label ? null : link.label);
                  }
                }}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDownIcon
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      openDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>
              {link.hasDropdown && openDropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {link.items?.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7736FE] transition-colors group"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {"emoji" in item ? (item as { emoji: string }).emoji : "📌"}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{item.label}</span>
                        {"description" in item && (
                          <span className="text-xs text-gray-500 truncate">
                            {(item as { description: string }).description}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#7736FE] hover:bg-purple-50 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      View all
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#7736FE] px-3 py-2 text-sm font-medium text-white shadow-sm cursor-default opacity-80">
            <DownloadIcon className="h-4 w-4" />
            App — Coming Soon
          </span>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center mx-2 px-1 md:hidden min-h-[48px] min-w-[48px]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center min-h-[48px] px-3 text-base font-semibold text-gray-700 hover:text-[#7736FE] hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 space-y-0.5">
                    {link.items?.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 min-h-[48px] text-sm text-gray-600 hover:text-[#7736FE] hover:bg-gray-50 rounded-lg"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="text-lg flex-shrink-0">
                          {"emoji" in item ? (item as { emoji: string }).emoji : "📌"}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <span
              className="flex items-center gap-2 px-3 py-2.5 text-base font-semibold text-[#7736FE] rounded-lg opacity-80 cursor-default"
            >
              <DownloadIcon className="h-4 w-4" />
              App — Coming Soon
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
