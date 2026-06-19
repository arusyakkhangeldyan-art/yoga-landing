import { Logo } from "@/app/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-sage/15 bg-white/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <Logo className="h-9 w-7 shrink-0" />
          <p className="font-display text-base text-ink">Yoga with Arika</p>
        </div>
        <p>© {new Date().getFullYear()} Yoga with Arika. All rights reserved.</p>
      </div>
    </footer>
  );
}
