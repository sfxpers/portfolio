import { createFileRoute } from "@tanstack/react-router";

import { identity } from "@/catalog/portfolio";
import { resumeMetaDescription } from "@/catalog/resume-view";
import { ResumePage } from "@/components/resume-page";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: `${identity.name} - Resume` },
      {
        name: "description",
        content: resumeMetaDescription(),
      },
    ],
  }),
  component: ResumePage,
});
