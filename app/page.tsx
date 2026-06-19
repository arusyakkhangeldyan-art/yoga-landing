import Image from "next/image";
import { ContactForm } from "@/app/components/contact-form";
import { Logo } from "@/app/components/logo";
import { SectionTitle } from "@/app/components/section-title";
import { IconHatha, IconVinyasa, IconYin } from "@/app/components/service-icon";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { VideoLibrary } from "@/app/components/video-library";
import { TestimonialsSlider } from "@/app/components/testimonials-slider";
import { faqs as defaultFaqs, pricingPlans, services, testimonials as defaultTestimonials } from "@/app/data/content";
import { onlineVideos } from "@/app/data/videos";
import { mapSanityTestimonials } from "@/sanity/lib/map-testimonials";
import { getHeroImageUrl } from "@/sanity/lib/map-hero-image";
import { client } from "@/sanity/lib/sanity";
import type { LandingPage, ScheduleItem } from "@/sanity/lib/types";

const serviceIcons = [IconHatha, IconVinyasa, IconYin];

async function getSchedule() {
  try {
    const data = await client.fetch(`
      *[_type == "schedule"] | order(date asc)
    `);

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
       
        <section className="relative px-6 pb-20 pt-12 md:pb-24 md:pt-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 rounded-[2.25rem] border border-white/80 bg-white/85 p-8 shadow-glow backdrop-blur-md md:grid-cols-[1.05fr_0.95fr] md:items-stretch md:p-12 lg:p-14">
              <div className="flex flex-col justify-center">
                <Logo className="mb-6 h-16 w-12 sm:h-20 sm:w-14" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sage-dark">
                  Yoga with Arika
                </p>
                <h1 className="mt-5 font-display text-[2.65rem] font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl lg:text-[4.25rem]">
                  {landing?.heroTitle}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  {landing?.heroDescription}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-sage-dark px-9 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-sage-hover"
                  >
                    Book a class
                  </a>
                  <a
                    href="#pricing"
                    className="text-sm font-semibold text-sage-dark underline-offset-4 transition hover:text-ink hover:underline"
                  >
                    View memberships
                  </a>
                </div>
                <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-sage/20 pt-8 text-sm">
                  <div>
                    <dt className="text-muted">Class cap</dt>
                    <dd className="mt-1 font-semibold text-ink">12 guests</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Styles</dt>
                    <dd className="mt-1 font-semibold text-ink">Hatha · Flow · Yin</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Location</dt>
                    <dd className="mt-1 font-semibold text-ink">Downtown</dd>
                  </div>
                </dl>
              </div>
              <aside className="relative min-h-[20rem] overflow-hidden rounded-3xl border border-sage/20 md:min-h-full">
                {heroImageUrl ? (
                  <Image
                    src={heroImageUrl}
                    alt="Yoga with Arika studio"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[20rem] flex-col items-center justify-center bg-gradient-to-br from-sage-soft/80 to-white p-8 text-center">
                    <p className="text-sm font-medium text-sage-dark">
                      Studio image
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      Add a hero image in Sanity Studio
                    </p>
                  </div>
                )}
              </aside>
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

        <section id="schedule" className="relative px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-8 rounded-3xl border border-sage/20 bg-gradient-to-br from-sage-soft/80 to-white p-8 md:p-9">
              <div>
                <p className="text-sm font-semibold text-sage-dark">
                  Today at the studio
                </p>
                <ul className="mt-5 space-y-4 text-sm text-muted">
                  {schedule.map((item: ScheduleItem) => (
                    <li
                      key={item._id}
                      className="border-b border-sage/15 pb-3"
                    >
                      <div>
                        <strong>Date:</strong> {item.date}
                      </div>
                      <div>
                        <strong>Time:</strong> {item.time}
                      </div>
                      <div>
                        <strong>Title:</strong> {item.title}
                      </div>
                      <div>
                        <strong>Level:</strong> {item.level}
                      </div>
                      <div>
                        <strong>Notes:</strong> {item.notes}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                Arrive ten minutes early. Herbal tea, filtered water, and soft
                lighting are always waiting.
              </p>
            </div>
          </div>
        </section>

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

        <section id="pricing" className="relative px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow="Pricing"
              title="Memberships with quiet confidence"
              description="Transparent plans for occasional visits, weekly rhythm, or full immersion—pause or change anytime."
              centered
            />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative flex h-full flex-col rounded-3xl border p-9 shadow-soft transition duration-300 hover:-translate-y-0.5 ${
                    plan.featured
                      ? "border-sage-rich/90 bg-sage-rich text-white lg:scale-[1.02] lg:shadow-glow"
                      : "border-sage/20 bg-white/95 hover:border-sage/35"
                  }`}
                >
                  {plan.featured ? (
                    <span className="absolute right-6 top-6 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
                      Popular
                    </span>
                  ) : null}
                  <h3
                    className={`font-display text-2xl font-semibold ${plan.featured ? "text-white" : "text-ink"}`}
                  >
                    {plan.name}
                  </h3>
                  <p className="mt-6 flex items-baseline gap-1">
                    <span
                      className={`font-display text-4xl font-semibold tracking-tight ${plan.featured ? "text-white" : "text-ink"}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm font-medium ${plan.featured ? "text-white/80" : "text-muted"}`}
                    >
                      {plan.cadence}
                    </span>
                  </p>
                  <p
                    className={`mt-2 text-sm font-medium ${plan.featured ? "text-white/85" : "text-sage-dark"}`}
                  >
                    {plan.details}
                  </p>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${plan.featured ? "text-white/88" : "text-muted"}`}
                  >
                    {plan.description}
                  </p>
                  <ul
                    className={`mt-8 space-y-3 text-sm ${plan.featured ? "text-white/92" : "text-muted"}`}
                  >
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex gap-3">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${plan.featured ? "bg-white/70" : "bg-sage"}`}
                          aria-hidden
                        />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-10 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition ${
                      plan.featured
                        ? "bg-white text-sage-dark hover:bg-sage-soft"
                        : "bg-sage-dark text-white hover:bg-sage-hover"
                    }`}
                  >
                    Choose {plan.name}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

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
              title="Book your first class"
              description="Tell us your preferred style and schedule. We will confirm availability within one business day."
            />
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
