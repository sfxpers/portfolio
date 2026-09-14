import { identity } from "@/catalog/portfolio";

/** Committed public path for the Resume PDF download. */
export const RESUME_PDF_RELATIVE_PATH = "public/resume/download.pdf";

/** Saved filename advertised by the Download PDF control — from Identity. */
export function resumePdfDownloadName(): string {
  return `${identity.name} - ${identity.role}.pdf`;
}

/** Public href for the Download PDF control. */
export const RESUME_PDF_HREF = "/resume/download.pdf";
