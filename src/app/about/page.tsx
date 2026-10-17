import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";

const TITLE = "About FitWardrobe and its founder";
const DESCRIPTION =
  "Why FitWardrobe exists, the principles behind it, and the founder building it from Meerut, India. A digital wardrobe app coming soon to Android and the web.";

export const metadata: Metadata = pageMetadata("/about/", TITLE, DESCRIPTION);

const PRINCIPLES = [
  {
    title: "Start with what you own",
    text: "Every outfit is built only from clothes you have added. The point is to get more from your wardrobe, not to fill it.",
  },
  {
    title: "Explain every suggestion",
    text: "Each outfit comes with a short reason, so you learn what works for you instead of just being told.",
  },
  {
    title: "Be honest about the AI",
    text: "Tagging and suggestions run on cloud AI services. It can get things wrong, and we say so. You can correct it.",
  },
  {
    title: "Keep your wardrobe yours",
    text: "Your photos, items and outfits are stored on your own device, and you can delete them at any time.",
  },
];

export default function AboutPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "About", item: "/about/" },
  ]);
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: TITLE,
    url: `${SITE_CONFIG.landingUrl}/about/`,
    about: { "@type": "Organization", name: "FitWardrobe", url: `${SITE_CONFIG.landingUrl}/` },
    mainEntity: {
      "@type": "Person",
      name: "Aryan Panwar",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "FitWardrobe" },
      homeLocation: { "@type": "Place", name: "Meerut, India" },
      url: "https://aryanpanwar.in",
    },
  };

  return (
    <div className="fw fw-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <section className="fw-page__hero">
        <div className="fw-container fw-page__narrow">
          <p className="fw-kicker">About</p>
          <h1 className="fw-display fw-page__title">Why FitWardrobe exists</h1>
          <p className="fw-lead">
            Most of us own enough clothes to dress well. What we lack is a quick way to see the
            combinations. FitWardrobe is a digital wardrobe app that suggests outfits from the
            clothes you already own, with a short reason for each one.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="problem-title">
        <div className="fw-container fw-page__narrow fw-page__prose">
          <h2 id="problem-title" className="fw-h2">The problem we&apos;re working on</h2>
          <p>
            Wardrobes are full of clothes that rarely get worn. In 2022, UK adults had not worn
            about a quarter of their clothes in the past year, according to{" "}
            <a
              className="fw-link"
              href="https://wrap.ngo/media-centre/press-releases/nations-wardrobes-hold-16-billion-items-unworn-clothes-people-open-new"
              rel="noopener"
            >
              research by WRAP
            </a>
            . Standing in front of a full wardrobe with &quot;nothing to wear&quot; is rarely
            about missing clothes. It is about not seeing what goes together.
          </p>
          <p>
            FitWardrobe keeps every piece in one place, learns how you like to dress and, when you
            say where you&apos;re going, puts an outfit together from what&apos;s already on your
            hangers.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="principles-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="principles-title" className="fw-h2">What we believe</h2>
          <ol className="fw-page__steps">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title}>
                <span className="fw-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="fw-sans">{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="founder-title">
        <div className="fw-container fw-page__narrow">
          <div className="fw-about2 fw-about2--text">
            <div>
              <p className="fw-kicker">The founder</p>
              <h2 id="founder-title" className="fw-about2__quote">
                I&apos;m building FitWardrobe on my own, from Meerut, India.
              </h2>
              <p>
                I&apos;m Aryan Panwar. The app is being rebuilt from the ground up, and the first
                version goes to the people on the early-access list. They can tell me directly
                what to change, by email or on our Telegram channel, and I read every message.
              </p>
              <p className="fw-about__sign">Aryan Panwar</p>
              <p className="fw-about__role">Founder, FitWardrobe</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="status-title">
        <div className="fw-container fw-page__narrow fw-page__prose">
          <h2 id="status-title" className="fw-h2">Where we are now</h2>
          <p>
            FitWardrobe is not available yet. It launches on Android and the web first; on an
            iPhone you&apos;ll be able to use the web version in your browser. There is no launch
            date to promise yet, so instead we&apos;ll email everyone on the list the day early
            access opens. It is free during early access.
          </p>
          <p>
            Want to know exactly what happens to your photos? Read{" "}
            <Link href="/ai-transparency/" className="fw-link">how the AI works</Link>.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="contact-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="contact-title" className="fw-h2">Get in touch</h2>
          <div className="fw-page__contact">
            <div>
              <h3 className="fw-sans">Email</h3>
              <p>Questions, ideas and feedback.</p>
              <a href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</a>
            </div>
            <div>
              <h3 className="fw-sans">Telegram</h3>
              <p>Updates and a direct line to the founder.</p>
              <a href={SITE_CONFIG.telegramUrl} rel="noopener">
                Join the channel
              </a>
            </div>
            <div>
              <h3 className="fw-sans">Discord</h3>
              <p>Ideas, feedback and early previews.</p>
              <a href={SITE_CONFIG.discordUrl} rel="noopener">
                Join the server
              </a>
            </div>
            <div>
              <h3 className="fw-sans">Privacy</h3>
              <p>Data requests and privacy questions.</p>
              <a href="mailto:privacy@fitwardrobe.me">privacy@fitwardrobe.me</a>
            </div>
          </div>
          <div className="fw-page__cta">
            <h2>Be the first to try FitWardrobe</h2>
            <p>Join the early-access list and we&apos;ll email you the day it opens.</p>
            <Link href="/#join" className="fw-btn fw-btn--primary">
              Join early access
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
