"use client";

import { useState } from "react";
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
      { label: "Kids Riddles", href: "/blog/category/kids-riddles" },
      { label: "Adult Riddles", href: "/blog/category/adult-riddles" },
      { label: "Holiday Riddles", href: "/blog/category/holiday-riddles" },
      { label: "Family Riddles", href: "/blog/category/family-riddles" },
    ],
  },
  {
    label: "Browse Riddles",
    href: "/riddles/riddles-with-answers",
    hasDropdown: true,
    items: [
      { label: "Tricky Riddles", href: "/riddles/tricky-riddles" },
      { label: "Short Riddles", href: "/riddles/short-riddles" },
      { label: "Logic Riddles", href: "/riddles/logic-riddles" },
      { label: "Kids Riddles", href: "/riddles/kids" },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="z-40 bg-background border-b">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <Image
            src="/images/riddlesrush-icon.png"
            alt="Riddles Rush"
            width={36}
            height={36}
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
              onMouseEnter={() =>
                link.hasDropdown && setOpenDropdown(link.label)
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer text-gray-700 hover:text-[#7736FE] hover:bg-gray-50"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform" />
                )}
              </Link>
              {link.hasDropdown && openDropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  {link.items?.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#7736FE]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0">
          <Link
            href="https://apps.apple.com/be/app/riddles-train-your-brain/id6447545144"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#7736FE] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#6a2ee6] transition-colors"
          >
            <DownloadIcon className="h-4 w-4" />
            App
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center mx-2 px-1 md:hidden min-h-[44px] min-w-[44px]"
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
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-3 py-2 text-base font-semibold text-gray-700 hover:text-[#7736FE] hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4">
                    {link.items?.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-[#7736FE] hover:bg-gray-50 rounded-lg"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="https://apps.apple.com/be/app/riddles-train-your-brain/id6447545144"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-[#7736FE] hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              <DownloadIcon className="h-4 w-4" />
              Download App
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
