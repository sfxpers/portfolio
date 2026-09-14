import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { RESUME_PDF_RELATIVE_PATH } from "@/catalog/resume-download";
import { buildResumePdf, stabilizePdf } from "../scripts/resume-pdf";

const committedPath = resolve(RESUME_PDF_RELATIVE_PATH);

function pdfPageCount(bytes: Uint8Array): number {
  const text = Buffer.from(bytes).toString("latin1");
  const matches = text.match(/\/Type\s*\/Page\b/g);
  return matches?.length ?? 0;
}

describe("Resume PDF", () => {
  it("keeps the committed public PDF aligned with buildResumePdf", async () => {
    const generated = await buildResumePdf();
    const committed = stabilizePdf(readFileSync(committedPath));
    expect(Buffer.compare(committed, generated)).toBe(0);
  }, 60_000);

  it("is a single-page PDF document at the public path", () => {
    const committed = readFileSync(committedPath);
    expect(committed.subarray(0, 5).toString("utf8")).toBe("%PDF-");
    expect(pdfPageCount(committed)).toBe(1);
  });
});
