import { createFileRoute } from "@tanstack/react-router";

import { identity, positioning } from "@/catalog/portfolio";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${identity.name} - ${identity.role}` },
      {
        name: "description",
        content: `${positioning} Selected case studies of shipped work.`,
      },
    ],
  }),
  component: HomePage,
});
