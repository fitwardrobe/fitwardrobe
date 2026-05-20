export interface LegalSection {
  id: string;
  title: string;
  content: string | React.ReactNode;
  subsections?: Array<{
    title: string;
    content: string | React.ReactNode;
  }>;
}

export interface LegalPageData {
  title: string;
  organization: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  sections: LegalSection[];
  toc: Array<{ id: string; title: string }>;
}
