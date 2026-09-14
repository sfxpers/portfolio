export type ContactKind = "email" | "github" | "threads" | "x";

export type ContactLink = {
  kind: ContactKind;
  label: string;
  href: string;
};

export type Identity = {
  name: string;
  role: string;
  bio: string;
  contact: ContactLink[];
};

export type Experience = {
  title: string;
  organization: string;
  location: string;
  dates: string;
  bullets: string[];
};

export type ResumeProject = {
  title: string;
  summary: string;
  slug: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Language = {
  name: string;
  level: string;
};

export type Education = {
  degree: string;
  institution: string;
  dates: string;
  location: string;
};

export type Resume = {
  location: string;
  experience: Experience[];
  projects: ResumeProject[];
  skills: SkillGroup[];
  languages: Language[];
  education: Education[];
};

export type ShowcaseBlock = {
  label: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseBodyBlock =
  | {
      type: "text";
      depth: "product" | "technical";
      heading: string;
      body: string;
    }
  | { type: "showcase"; showcase: ShowcaseBlock };

export type Capsule = {
  problem: string;
  role: string;
  outcome: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  indexSummary: string;
  year: string;
  capsule: Capsule;
  body: CaseBodyBlock[];
};

export const identity: Identity = {
  name: "Shayan",
  role: "Product Engineer",
  bio: "I build custom web products end to end, and I mean the whole thing: the design decisions, the web and mobile clients, the data model, the infrastructure underneath. Some of it is client work that starts as an empty repository or as a codebase with history. Some is my own, shipped and running with real users. What I gravitate to is the complicated middle: who may do what, who owes whom money, and what happens when something goes wrong.",
  contact: [
    { kind: "email", label: "Email", href: "mailto:sfx.pers@gmail.com" },
    { kind: "github", label: "GitHub", href: "https://github.com/sfxdeve" },
    {
      kind: "threads",
      label: "Threads",
      href: "https://threads.com/@shayanameen1108",
    },
    { kind: "x", label: "X (Twitter)", href: "https://x.com/shayanameen1108" },
  ],
};

/** Shared heading for the Profile section on Home and Resume. */
export const profileHeading = "Profile";

/**
 * Canonical public origin for absolute links in the Resume PDF download.
 * Override with `VITE_SITE_ORIGIN` in Workers Builds when the hostname changes.
 */
export const siteOrigin = (import.meta.env?.VITE_SITE_ORIGIN ?? "https://shayanameen.work").replace(
  /\/$/,
  "",
);

/**
 * Third-person positioning claim for meta descriptions. Single source so page
 * meta cannot drift into several different phrasings of the same sentence.
 *
 * Describes the kind of work, not a domain. The Case Studies are a selected
 * few, so nothing here should imply they bound the work on offer.
 */
export const positioning =
  "Product Engineer building custom web products end to end: design, web and mobile, data, and the infrastructure underneath. Client teams and independent products alike.";

const resumeLocation = "Karachi, Pakistan";

const experience: Experience[] = [
  {
    title: "Product Engineer",
    organization: "Ars Futura",
    location: "Remote, Zagreb, Croatia",
    dates: "Dec 2025 to Present",
    bullets: [
      "I build and ship features on long-running client products, across the interface, the API behind it, and the release.",
      "I work inside client teams alongside their design and product people, on new builds and on codebases that arrive with history.",
      "I review other engineers’ work and help set the conventions a new joiner picks up on the way in.",
    ],
  },
  {
    title: "Freelance Software Engineer",
    organization: "Upwork",
    location: "Remote",
    dates: "Apr 2025 to Present",
    bullets: [
      "I took client products from the first scoping call through release, deciding what to build as often as building it.",
      "I delivered each one whole: the interface, the API behind it, and the admin tooling that staff needed to run the thing once it was live.",
      "I was the only engineer on most of them, so the design calls, the data model, and the deployment were mine too.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "Jumppace Pvt Ltd",
    location: "On-site, Karachi, Pakistan",
    dates: "Oct 2023 to Nov 2024",
    bullets: [
      "I shipped production web applications on React, Node.js, and MongoDB, working on both sides of the API.",
      "I wrote the shared components and API contracts the rest of the team built features on after release.",
      "I picked up whichever part of the product needed work, rather than staying on one layer of it.",
    ],
  },
  {
    title: "React.js Developer",
    organization: "AZ Code Arena",
    location: "Hybrid, Karachi, Pakistan",
    dates: "Apr 2022 to Sep 2023",
    bullets: [
      "I turned Figma designs into responsive React interfaces built from reusable components.",
      "I wired those interfaces up to REST APIs and sign-in flows, and learned where a design stops answering questions and the engineer has to.",
    ],
  },
];

/**
 * Grouped so breadth stays skimmable without becoming a laundry list.
 *
 * Names capabilities, not the domains of the published Case Studies (ADR-0003).
 * "marketplace" and "escrow" belong in a Case Study, where the specifics are
 * shown; here they would read as the only kind of product on offer.
 */
const skills: SkillGroup[] = [
  {
    label: "Web and mobile",
    items: ["TypeScript", "React", "TanStack Start", "Tailwind CSS", "React Native", "Expo"],
  },
  {
    label: "Backend and data",
    items: ["Node.js", "PostgreSQL", "REST APIs", "schema and query design"],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "Cloudflare", "AWS", "CI/CD", "automated testing"],
  },
  {
    label: "AI",
    items: ["LLM integrations", "RAG pipelines", "evals and prompt engineering"],
  },
];

const languages: Language[] = [
  { name: "Urdu", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Turkish", level: "Fluent" },
];

const education: Education[] = [
  {
    degree: "BS Computer Science",
    institution: "NED University of Engineering & Technology",
    dates: "2022 to 2026",
    location: "Karachi, Pakistan",
  },
];

const caseStudies: CaseStudy[] = [
  {
    slug: "ecobuiltconnect",
    title: "EcoBuiltConnect",
    indexSummary:
      "A marketplace for reclaimed building materials, where every listing is one of a kind",
    year: "2026",
    capsule: {
      problem:
        "Reclaimed building materials are one-offs sold by the meter, and when a batch is gone it is gone. Buyers had to trust a stranger about condition, and sellers had to get paid for the part they actually handed over.",
      role: "Product Engineer. Listing review, checkout, handoffs, disputes, payouts.",
      outcome:
        "A buyer pays once for a cart spanning several salvage yards; sellers are paid per handed-over batch after a 48-hour dispute window, with an 8% platform fee; a dispute freezes only the units in dispute.",
    },
    body: [
      {
        type: "text",
        depth: "product",
        heading: "Every listing is a one-off",
        body: "A salvage yard does not have ten of anything. It has 48 linear meters of one particular reclaimed beam, in one condition, in one part of Cape Town. So I gave sellers structured fields instead of a description box: condition, how the material was sourced, price per unit, how much is left, minimum order, and who arranges collection. Buyers get something they can check, and the marketplace never repeats a claim it cannot attribute to the seller who made it.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Marketplace browsing",
          caption:
            "Six results, six different quantities: 48 linear meters of beams here, 200 railway sleepers there. Buyers filter on condition, how the material was sourced, location, and price.",
          src: "/evidence/ecobuiltconnect/01-marketplace-browsing.webp",
          alt: "EcoBuiltConnect marketplace browsing screen listing reclaimed timber with per-unit prices and available quantities.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "The same fields on every screen",
        body: "The listing page reuses the fields from search rather than introducing its own. Comparing two batches of timber is reading the same rows twice instead of interpreting two sales pitches. Anything a seller writes in their own words sits in a box labelled as theirs, and supporting documents such as a demolition inventory attach as evidence a buyer can open.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Listing detail",
          caption:
            "R550 per linear meter, 48 available, two-meter minimum, with a demolition inventory attached as evidence. The price locks at checkout; the exact address waits for seller confirmation.",
          src: "/evidence/ecobuiltconnect/02-listing-detail.webp",
          alt: "EcoBuiltConnect listing detail screen showing price per linear meter, available quantity, condition, and attached evidence.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Operators approve, they do not rewrite",
        body: "Listings go to an operator before buyers see them, checked against a fixed list: seller verification, media, claims and evidence, privacy, and unsupported materials. The operator can approve, request a correction, or keep the listing hidden. What they cannot do is edit the seller’s words, and the review screen says so on the page. If an operator rewrites a claim, buyers can no longer tell which words came from the seller.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Seller listing management",
          caption:
            "What the seller sees while review is pending: automatic checks passed, operator decision outstanding, their own copy still editable.",
          src: "/evidence/ecobuiltconnect/03-seller-listing-management.webp",
          alt: "EcoBuiltConnect seller listing management screen showing a listing pending operator review with its submission status.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Writing a listing and publishing it are separate rights",
        body: "The seller writes the content; the operator decides whether it reaches the marketplace. Pulling a listing therefore never erases who said what. Operator notes stay internal, so when a dispute arrives months later it can be traced back to the original claim and the person who made it.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Operator review",
          caption:
            "Approve for publication, request correction, or keep hidden. Every field the seller supplied is labelled as theirs, including the photos.",
          src: "/evidence/ecobuiltconnect/06-operator-review.webp",
          alt: "EcoBuiltConnect operator review screen showing a listing review checklist and publication decisions.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "Splitting the cart at checkout",
        body: "A buyer filling one cart from four salvage yards is really placing four orders. I split the cart at checkout, before confirmation, so each seller got an order carrying its own inventory, handoffs, and payout, while the buyer still paid once. That bought a reconciliation step between one payment and several orders, and I took it because a dispute with one yard cannot reach the other three. Each order then runs its own clock: unconfirmed orders cancel themselves, and the collection address stays hidden until the seller confirms.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Seller-scoped order",
          caption:
            "One seller’s slice of a paid cart, waiting on their confirmation. R6,600 of materials, 15% VAT added for the buyer, 8% platform fee deducted from the seller.",
          src: "/evidence/ecobuiltconnect/04-seller-order.webp",
          alt: "EcoBuiltConnect seller order screen showing order status, money summary, and a confirmation deadline.",
          width: 1200,
          height: 768,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "Paying for what actually moved",
        body: "Materials leave in batches, not all at once. Keying payout to the order total would have meant either paying for goods still sitting in the yard or holding the whole amount hostage to the last meter, so I tied payout eligibility to handed-off quantity instead. A seller records 8 of 12 linear meters as handed over, that batch opens a 48-hour dispute window, and if nobody objects, the money for those 8 meters comes free while the remaining 4 stay open on their own. The cost is that payout tracks partial quantities and several overlapping windows rather than one paid flag.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Quantity-based payout",
          caption:
            "8 of 12 meters handed over, R4,400 gross against that batch, eligible in 48 hours if undisputed. The remaining 4 meters wait on their own handoff.",
          src: "/evidence/ecobuiltconnect/05-partial-fulfillment-payout.webp",
          alt: "EcoBuiltConnect fulfillment screen showing partial handoff progress, dispute window, and payout eligibility for the handed-off quantity.",
          width: 1200,
          height: 768,
        },
      },
    ],
  },
  {
    slug: "artisanconnect",
    title: "ArtisanConnect",
    indexSummary: "Hiring a plumber, with the money held until the work is done",
    year: "2025",
    capsule: {
      problem:
        "Booking a tradesperson means guessing. Clients could not tell who was qualified or what a job should cost, and artisans could not price a vague request or count on being paid once the work was done.",
      role: "Product Engineer, end to end: posting a job through to releasing the money.",
      outcome:
        "Clients compare quotes split into labour and materials (R4,050 to R5,600 in the sample), money sits secured with a 2.5% protection fee until the client approves within 72 hours, and only disputed funds are held.",
    },
    body: [
      {
        type: "text",
        depth: "product",
        heading: "Checkable credentials, not a phone number",
        body: "Before a client posts anything, they want to know who they are dealing with. A profile shows identity and mobile verified, references checked, a trade credential with its expiry date, business insurance, a rating and a count of finished jobs in that trade. It deliberately does not show a phone number or a link out, and it says in small print that verification is not a guarantee of workmanship, because those are different promises and only one of them is ours to make.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Public artisan profile",
          caption:
            "4.8 across 86 reviews, 132 finished plumbing jobs, insurance valid until November. Full reviews need a sign-in; the phone number is nowhere on the page.",
          src: "/evidence/artisanconnect/01-public-artisan-profile.webp",
          alt: "ArtisanConnect public artisan profile showing rating, completed job count, verified credentials, and recent work photos.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Nobody can price “my sink leaks”",
        body: "A plumber quoting from a one-line description is guessing, and a guessed price gets renegotiated in someone’s kitchen. The job form asks for the things that actually change a quote: symptoms, measurements, photos and video, how to get in, and a preferred date. It stops well short of a contracting workflow. The client’s address and number stay masked until they pay.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Client job creation",
          caption:
            "Symptoms as tick-boxes, pipe diameter and accessible length, three photos and a video, plus where to park. Address and phone masked until payment.",
          src: "/evidence/artisanconnect/02-client-job-creation.webp",
          alt: "ArtisanConnect job creation screen showing symptoms, measurements, access notes, and attached photos with masked contact details.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "No “best match” badge",
        body: "Quotes arrive split into labour and materials, alongside a start date, a duration, the artisan’s rating and their verification count. I kept all of it side by side and refused to rank it, because the cheapest quote and the right quote are often not the same row and the platform is not the one living with the result. Accepting a quote locks its scope and price.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Quote comparison",
          caption:
            "Three quotes from R4,050 to R5,600, each showing labour against materials. The 2.5% protection fee is added where the client can see it before accepting.",
          src: "/evidence/artisanconnect/03-quote-comparison.webp",
          alt: "ArtisanConnect quote comparison screen showing three quotes broken into labour and materials with ratings and verification.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "Money first, then work",
        body: "Accepting a quote does not start a job; funding it does. I made the engagement come into existence only once the money is secured, so no artisan travels to a site on the strength of a promise and no client argues about scope after the fact. Release rules vary with job size, which means the payment state machine carries several paths rather than one. In exchange, every later event hangs off a single funded engagement with one ID: the completion evidence, a dispute, the payout, both reviews.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Funded engagement",
          caption:
            "R4,050 secured before the start date, with a code the client reads out when the artisan arrives. Address and number are now visible; the conversation stays in the app.",
          src: "/evidence/artisanconnect/04-funded-engagement.webp",
          alt: "ArtisanConnect funded engagement screen showing secured funds, scheduled start, start code, and in-app conversation.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Evidence decides the release",
        body: "An artisan closes a job by filing what they did: notes, timestamped photos taken after the work, a report, and the agreed scope ticked off item by item. The client then has a fixed window to approve and release the money or open a dispute, and only the disputed amount is held. Both sides rate each other, and neither rating publishes until both are in or the window expires, so nobody writes a review in reply to the other side’s.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Completion and review",
          caption:
            "Five scope items ticked, four photos stamped within seven minutes of each other, 72 hours left to approve. Ratings cover workmanship, communication, punctuality, and scope accuracy.",
          src: "/evidence/artisanconnect/05-completion-review.webp",
          alt: "ArtisanConnect completion review screen showing completion notes, after-work photos, scope checklist, and release or dispute actions.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "One record holds the money and the proof",
        body: "Funding, completion evidence, payouts, disputes and both reviews all attach to the same engagement rather than living in separate tables joined after the fact. Answering “was this paid, was it done, and who said so” is then one lookup instead of a reconciliation. The trade is rigidity: loose flows that would let evidence exist without a funded job are simply not representable, and I had to rethink a few features to fit that shape.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Artisan dashboard",
          caption:
            "R4,050 sitting in pending, released once the client approves. The credential expiring in 42 days appears as an action, since an expired one stops new matches.",
          src: "/evidence/artisanconnect/06-artisan-dashboard.webp",
          alt: "ArtisanConnect artisan dashboard showing pending payouts, next actions, job matches, and a credential expiry warning.",
          width: 1200,
          height: 800,
        },
      },
    ],
  },
  {
    slug: "rushuploads",
    title: "RushUploads",
    indexSummary: "Big files sent by link, paid for by the ads on the download page",
    year: "2025",
    capsule: {
      problem:
        "Sending 2.7 GB to eight people should not make either side sign up for anything. But bandwidth costs money, and a free file host with no account is also where abuse goes.",
      role: "Product Engineer. Transfers, the public download page, earnings, payouts, admin console.",
      outcome:
        "RushUploads now has 12,480 users, 3,216 active transfers, and 8.4 TB stored. Senders earn from ad views on the download page and cash out at a $10 threshold.",
    },
    body: [
      {
        type: "text",
        depth: "technical",
        heading: "Picking files is not sending them",
        body: "Nothing uploads when a sender drops files in. The transfer stays a draft until they press send, because a 2.7 GB upload is expensive to start and worse to restart, and people change the title, the message, or the expiry after they have already chosen the files. That left the client managing three states rather than one, and it is the reason an abandoned draft never becomes a live public link with somebody’s files behind it.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Transfer creation",
          caption:
            "Four files, 2.72 GB, nothing uploaded yet. Expiry and a 3,000-visit download cap are still editable, and the upload goes up in 10 MB chunks, three at a time.",
          src: "/evidence/rushuploads/01-transfer-creation.webp",
          alt: "RushUploads transfer creation screen showing selected files, transfer settings, and a send button before upload begins.",
          width: 1200,
          height: 751,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "The link appears last",
        body: "A sender only gets a shareable URL once every file has finished uploading, so a half-uploaded transfer cannot be handed to anyone. From there they can copy the link themselves or have the product email a list of recipients, and the transfer starts counting visits against its cap.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Upload completion",
          caption:
            "All four files confirmed, and now there is a link. Emailing eight recipients is optional; the link works on its own.",
          src: "/evidence/rushuploads/02-upload-completion-sharing.webp",
          alt: "RushUploads transfer-ready screen showing the share link, recipient notification field, and completed file uploads.",
          width: 1200,
          height: 751,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Recipients never sign up",
        body: "Whoever receives the link can see the title, who sent it, the message, every filename and size, and when it expires, without an account and without an ad. Asking a stranger to register before they can tell whether the link is legitimate is how these products lose people.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Public recipient transfer",
          caption:
            "No account, no countdown, no ad: just what is in the transfer and how long it lasts. 500 of 3,000 permitted visits remain.",
          src: "/evidence/rushuploads/03-public-recipient-transfer.webp",
          alt: "RushUploads public transfer page showing sender, expiry, remaining visits, and a download button for each file.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "technical",
        heading: "Looking is free, downloading pays",
        body: "The ad and its countdown live on a separate route from the transfer page, one file at a time. Recipients can therefore inspect a transfer as often as they like without generating revenue, and I keyed earnings to a finished countdown rather than a page view, since a page view is trivially inflated and advertisers are paying for attention. It costs the recipient one extra navigation on the way to each file, which is the honest price of the thing being free.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Download interstitial",
          caption:
            "Three seconds against one 24 MB file, with the download button disabled until the counter clears. The sender earns from this page, not the one before it.",
          src: "/evidence/rushuploads/04-download-interstitial.webp",
          alt: "RushUploads download interstitial showing a three-second countdown, a disabled download button, and an advertisement.",
          width: 1200,
          height: 800,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Senders can see what they earned",
        body: "The dashboard answers two questions at once: what is happening to my transfers, and what am I owed. Per transfer it shows visits against the cap, download and recipient counts, and expiry. Above that sits the balance, lifetime earnings, the rate being paid per visit, and the payout button once the threshold is met.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Sender dashboard",
          caption:
            "$0.004 per recipient visit at a $4 CPM, $10 minimum before cashing out. 2,500 of 3,000 visits used on the one active transfer.",
          src: "/evidence/rushuploads/05-sender-dashboard-earnings.webp",
          alt: "RushUploads sender dashboard showing earnings summary, CPM rate, payout threshold, and active transfer activity.",
          width: 1200,
          height: 751,
        },
      },
      {
        type: "text",
        depth: "product",
        heading: "Anonymous uploads need a kill switch",
        body: "Letting people publish files without an account means somebody has to be able to take them down. Admins can force-expire a transfer — deleting the stored objects rather than just hiding the page — disable users, and approve or reject payout requests with a written reason. They also set the CPM the whole earnings model runs on. What the console will not show them is recipient email addresses or credentials.",
      },
      {
        type: "showcase",
        showcase: {
          label: "Admin operations",
          caption:
            "12,480 users, 3,216 live transfers, 8.4 TB stored. A pending $10 payout waits on approval, and the $4 CPM is editable in place.",
          src: "/evidence/rushuploads/06-admin-operations.webp",
          alt: "RushUploads admin console showing platform totals, transfer moderation, a pending payout request, and ad management.",
          width: 1200,
          height: 751,
        },
      },
    ],
  },
];

export function listCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getResume(): Resume {
  return {
    location: resumeLocation,
    experience,
    projects: caseStudies.map((study) => ({
      title: study.title,
      summary: study.indexSummary,
      slug: study.slug,
    })),
    skills,
    languages,
    education,
  };
}
