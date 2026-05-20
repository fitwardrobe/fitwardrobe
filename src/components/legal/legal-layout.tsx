"use client";

import React from "react";
import { LegalPageData } from "@/types/legal";

interface LegalLayoutProps {
  data: LegalPageData;
}

export function LegalLayout({ data }: LegalLayoutProps) {
  return (
    <div className="bg-cream">
      <main className="legal-page pt-32 container container--narrow">
        <h1 className="reveal mb-8">{data.title}</h1>

        <div className="policy-header reveal reveal--delay-1">
          <div className="policy-meta-item">
            <span className="policy-meta-label">Organization</span>
            <span className="policy-meta-value">{data.organization}</span>
          </div>
          <div className="policy-meta-item">
            <span className="policy-meta-label">Effective Date</span>
            <span className="policy-meta-value">{data.effectiveDate}</span>
          </div>
          <div className="policy-meta-item">
            <span className="policy-meta-label">Last Updated</span>
            <span className="policy-meta-value">{data.lastUpdated}</span>
          </div>
          <div className="policy-meta-item">
            <span className="policy-meta-label">Version</span>
            <span className="policy-meta-value">{data.version}</span>
          </div>
        </div>

        <div className="toc toc--legal reveal reveal--delay-2">
          <h3>Table of Contents</h3>
          <ul>
            {data.toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="legal-sections">
          {data.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className={`reveal reveal--delay-${Math.min(index + 3, 5)}`}
            >
              <h2>{section.title}</h2>
              <div className="section-content">{section.content}</div>

              {section.subsections?.map((sub, sIndex) => (
                <div key={sIndex} className="subsection mt-8">
                  <h3>{sub.title}</h3>
                  <div className="subsection-content">{sub.content}</div>
                </div>
              ))}
            </section>
          ))}
        </div>

        <hr className="my-12 border-none border-t border-mist" />
      </main>
    </div>
  );
}
