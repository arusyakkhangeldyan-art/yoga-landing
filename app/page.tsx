import Image from "next/image";
import { ContactForm } from "@/app/components/contact-form";
import { Logo } from "@/app/components/logo";
import { SectionTitle } from "@/app/components/section-title";
import { IconHatha, IconVinyasa, IconYin } from "@/app/components/service-icon";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { VideoLibrary } from "@/app/components/video-library";
import { PricingSection } from "@/app/components/pricing-section";
import { ScheduleSection } from "@/app/components/schedule-section";
import { TestimonialsSlider } from "@/app/components/testimonials-slider";
import { faqs as defaultFaqs, pricingPlans, services, testimonials as defaultTestimonials } from "@/app/data/content";
import { onlineVideos } from "@/app/data/videos";
import { mapSanityTestimonials } from "@/sanity/lib/map-testimonials";
import { getHeroImageUrl, getHeroImagePosition } from "@/sanity/lib/map-hero-image";
import { client } from "@/sanity/lib/sanity";
import type { LandingPage } from "@/sanity/lib/types";

const serviceIcons = [IconHatha, IconVinyasa, IconYin];

async function getSchedule() {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const data = await client.fetch(
      `
      *[_type == "schedule" && defined(date) && date >= $today] | order(date asc) {
        _id,
        date,
        time,
        title,
        level,
        notes,
        duration,
        instructor,
        capacity,
        locationType,
        description
      }
    `,
      { today },
    );

    console.log("SANITY DATA:", data);

    return data;
  } catch (error) {
    console.error("SANITY ERROR:", error);

    return [];
  }
}

async function getLandingPage(): Promise<LandingPage | null> {
  try {
    return await client.fetch(`
      *[_type == "landingPage"][0]{
        heroTitle,
        heroDescription,
        heroImage,
        aboutTitle,
        aboutDescription,
        contactTitle,
        contactDescription,
        scheduleEyebrow,
        scheduleTitle,
        scheduleDescription,
        pricingEyebrow,
        pricingTitle,
        pricingDescription,
        faqEyebrow,
        faqTitle,
        faqDescription,
        faqs[]{
          _key,
          question,
          answer
        },
        testimonialsEyebrow,
        testimonialsTitle,
        testimonialsDescription,
        testimonials[]{
          _key,
          quote,
          name,
          role,
          avatar
        }
      }
    `);
  } catch (error) {
    console.error("SANITY LANDING PAGE ERROR:", error);
    return null;
  }
}

export default async function Home() {
  const schedule = await getSchedule();
  const landing = await getLandingPage();
  const faqItems: LandingPage["faqs"] =
    landing?.faqs && landing.faqs.length > 0 ? landing.faqs : defaultFaqs;
  const testimonialItems =
    mapSanityTestimonials(landing) ?? defaultTestimonials;
  const heroImageUrl = getHeroImageUrl(landing);
  const heroImagePosition = getHeroImagePosition(landing);
  
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden bg-transparent text-ink">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_85%_65%_at_50%_-5%,rgba(244,184,122,0.35),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 top-32 h-80 w-80 rounded-full bg-[rgba(212,98,106,0.18)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-12 bottom-32 h-72 w-72 rounded-full bg-[rgba(142,74,122,0.12)] blur-3xl"
          aria-hidden
        />
       
        <section className="relative flex min-h-[85vh] items-center overflow-hidden md:min-h-[90vh]">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt="Yoga with Arika studio"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: heroImagePosition }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sage-soft via-cream to-white" />
          )}

          <div
            className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15"
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
            <div className="max-w-xl">
            <Logo className="w-16 h-auto sm:w-20" />
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80">
                Yoga with Arika
              </p>
              <h1 className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.06] tracking-tight text-white md:text-6xl lg:text-[4.25rem]">
                {landing?.heroTitle}
              </h1>
              <p className="mt-8 max-w-lg text-base leading-8 text-white/85 md:text-lg md:leading-9">
                {landing?.heroDescription}
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <a
                  href="#schedule"
                  className="inline-flex items-center justify-center rounded-full bg-sage-dark px-7 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-sage-hover"
                >
                  Book a Class
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/20"
                >
                  View Subscriptions
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <SectionTitle
              eyebrow="About"
              title="A quieter approach to strength and balance"
              description="We designed Yoga with Arika as an antidote to noise—small groups, intelligent sequencing, and teachers who see you."
            />
            <div className="relative">
              <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-sage/25 via-transparent to-sage-soft/60 opacity-70" />
              <div className="relative rounded-[1.75rem] border border-white/90 bg-white p-9 shadow-soft md:p-10">
                <p className="leading-relaxed text-muted">
                  Founded by long-time practitioners, our studio honors sustainable
                  progress over intensity for its own sake. Whether you are stepping onto
                  the mat for the first time or returning after a pause, we meet you
                  with clarity and care.
                </p>
                <p className="mt-5 leading-relaxed text-muted">
                  Expect breath-led sequences, hands-on adjustments when welcomed, and a
                  space where details—from acoustics to scent—are tuned for deep focus.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="relative px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow="Services"
              title="Three signature class styles"
              description="Each practice is crafted to support a different nervous system state—steady, fluid, or deeply restorative."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {services.map((service, index) => {
                const Icon = serviceIcons[index] ?? IconHatha;
                return (
                  <article
                    key={service.name}
                    className="group flex h-full flex-col rounded-3xl border border-sage/20 bg-white/90 p-8 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-sage/40 hover:shadow-glow"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-sage-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-sage-dark">
                        {service.tag}
                      </span>
                      <Icon className="h-9 w-9 text-sage-dark/90 transition group-hover:text-sage-dark" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                      {service.name}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <ScheduleSection
          items={schedule}
          eyebrow={landing?.scheduleEyebrow ?? "Class schedule"}
          title={landing?.scheduleTitle ?? "Today at the studio"}
          description={
            landing?.scheduleDescription ??
            "Browse upcoming classes and find a session that fits your practice."
          }
        />

        <section id="videos" className="relative px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow="On demand"
              title="Practice online, on your time"
              description="Curated sessions you can stream at home—same thoughtful sequencing, paced for real life."
            />
            <VideoLibrary videos={onlineVideos} />
          </div>
        </section>

        <PricingSection
          plans={pricingPlans}
          eyebrow={landing?.pricingEyebrow ?? "Pricing"}
          title={landing?.pricingTitle ?? "Memberships with quiet confidence"}
          description={
            landing?.pricingDescription ??
            "Transparent plans for occasional visits, weekly rhythm, or full immersion—pause or change anytime."
          }
        />

        <TestimonialsSlider
          key={testimonialItems.map((t) => t._key ?? t.name).join("-")}
          items={testimonialItems}
          eyebrow={landing?.testimonialsEyebrow ?? "Testimonials"}
          title={landing?.testimonialsTitle ?? "Voices from our community"}
          description={
            landing?.testimonialsDescription ??
            "Thoughtful feedback from members who value craft, calm, and consistency."
          }
        />

        <section id="faq" className="relative px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              eyebrow={landing?.faqEyebrow ?? "FAQ"}
              title={landing?.faqTitle ?? "Questions, answered simply"}
              description={landing?.faqDescription}
              centered
            />
            <div className="mt-12 space-y-3">
              {faqItems.map((item, index) => (
                <details
                  key={item._key ?? `${item.question}-${index}`}
                  className="group rounded-2xl border border-sage/20 bg-white/95 shadow-soft open:border-sage/40 open:shadow-glow"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-ink md:text-lg">
                    <span>{item.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sage/25 text-sage-dark transition group-open:rotate-45">
                      <span className="text-lg leading-none">+</span>
                    </span>
                  </summary>
                  <div className="border-t border-sage/15 px-6 pb-5 pt-4">
                    <p className="leading-relaxed text-muted">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative px-6 pb-24 pt-12 md:pb-28 md:pt-16">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-sage/25 bg-white/95 p-8 shadow-glow md:p-12">
            <SectionTitle
              eyebrow="Contact"
              title="Questions?"
              description="We'd love to hear from you."
            />
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
