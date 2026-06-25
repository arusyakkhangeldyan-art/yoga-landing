import Link from "next/link";
import { Logo } from "@/app/components/logo";

const nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#videos", label: "Videos" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-sage/15 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 transition hover:opacity-90 sm:gap-3"
        >
          <Logo className="h-20 w-20 shrink-0" />
          <span className="truncate font-display text-base tracking-tight text-ink sm:text-lg">
            Yoga with Arika
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-sage-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <details className="relative md:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-center rounded-full border border-sage/30 bg-white/90 px-3 py-2 text-sm font-semibold text-ink shadow-soft [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Open menu</span>
              <span aria-hidden className="flex flex-col gap-1">
                <span className="block h-0.5 w-5 rounded-full bg-ink" />
                <span className="block h-0.5 w-5 rounded-full bg-ink" />
              </span>
            </summary>
            <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-sage/20 bg-white py-2 shadow-glow">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-sage-soft hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </details>
          <a
            href="#schedule"
            className="rounded-full bg-sage-dark px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-sage-hover sm:px-5"
          >
            Book a class
          </a>
        </div>
      </div>
    </header>
  );
}
