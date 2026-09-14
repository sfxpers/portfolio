import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { RESUME_PDF_RELATIVE_PATH } from "@/catalog/resume-download";

import { buildResumePdf } from "./resume-pdf";

const targetPath = resolve(RESUME_PDF_RELATIVE_PATH);
const bytes = await buildResumePdf();
mkdirSync(dirname(targetPath), { recursive: true });
writeFileSync(targetPath, bytes);
console.log(`Wrote ${targetPath} (${bytes.length} bytes)`);
