import { LegalPageData } from "@/types/legal";
import { PageHero } from "@/components/site/page-hero";

/** Legal pages (privacy, terms, cookies, security, accessibility) in the site style. */
export function LegalLayout({ data, eyebrow = "Legal" }: { data: LegalPageData; eyebrow?: string }) {
  return (
    <div className="fw h13 p13">
      <PageHero
        compact
        eyebrow={eyebrow}
        title={data.title}
        crumbs={[{ label: "Home", href: "/" }, { label: data.title }]}
        meta={
          <>
            <span className="p13-chip">Last updated {data.lastUpdated}</span>
            <span className="p13-chip">Effective {data.effectiveDate}</span>
            <span className="p13-chip">Version {data.version}</span>
          </>
        }
      />

      <div className="fw-container l13-layout">
        <details className="a13-toc l13-toc" open>
          <summary>On this page</summary>
          <ol>
            {data.toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.title.replace(/^\d+\.\s*/, "")}</a>
              </li>
            ))}
          </ol>
        </details>

        <div className="l13-main prose13">
          {data.sections.map((section) => (
            <section key={section.id} id={section.id} className="l13-section">
              <h2>{section.title}</h2>
              <div className="prose13">{section.content}</div>
              {section.subsections?.map((sub) => (
                <div key={sub.title} className="l13-sub prose13">
                  <h3>{sub.title}</h3>
                  {sub.content}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
