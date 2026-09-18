/* ============================================================
   LILAC GENOMICS — SITE CONFIG
   ------------------------------------------------------------
   This is the ONLY file you need to edit to add templates,
   change links, or update prices. Everything else reads from here.
   Look for  <<< EDIT  markers.
   ============================================================ */

const SITE = {
  brand: "Lilac Genomics",
  tagline: "Soft, calm Notion templates you'll actually keep using",
  // <<< EDIT — your live site URL (used for share links + SEO)
  url: "https://lilacgenomics.github.io",
  email: "hello@lilacgenomics.com",                   // <<< EDIT
  instagram: "https://instagram.com/lilacgenomics",   // <<< EDIT
  pinterest: "https://pinterest.com/lilacgenomics",   // <<< EDIT
  gumroadStore: "https://lilacgenomics.gumroad.com",  // <<< EDIT
  // <<< EDIT — paste your form endpoint (Formspree, Getform, ConvertKit...)
  // Leave "" and the email box shows a friendly fallback instead of failing.
  newsletterEndpoint: ""
};

/* ------------------------------------------------------------
   TEMPLATES
   Add a new one by copying a { ... } block and editing it.
   - id        : lowercase, no spaces (used by the buy buttons)
   - gumroad   : your full Gumroad product link
   - page      : the product page file (duplicate the template page)
   - cover     : main preview image (16:10 works best)
   - pages     : the screens shown in the carousel
   ------------------------------------------------------------ */

const PRODUCTS = [
  {
    id: "lila-life-os",
    name: "Lila Life OS",
    subtitle: "Planner, habits and notes in one workspace",
    price: "$19",
    compareAt: "$34",          // set to "" to hide the strike-through
    badge: "New",
    // <<< EDIT — your Gumroad product link
    gumroad: "https://lilacgenomics.gumroad.com/l/lila-life-os",
    page: "products/lila-life-os.html",
    cover: "assets/img/cover-dashboard.jpg",
    blurb:
      "Six linked pages that keep your week, your habits and your notes in one calm place — without the setup weekend.",
    highlights: [
      "Six connected pages, pre-filled with example data",
      "Works on Notion's free plan",
      "Duplicates into your workspace in one click",
      "Free updates for life"
    ],
    pages: [
      { src: "assets/img/cover-dashboard.jpg", title: "Dashboard",        note: "today at a glance" },
      { src: "assets/img/page-planner.jpg",    title: "Weekly Planner",   note: "drag tasks by day" },
      { src: "assets/img/page-habits.jpg",     title: "Habit Tracker",    note: "streaks without guilt" },
      { src: "assets/img/page-calendar.jpg",   title: "Content Calendar", note: "plan posts ahead" },
      { src: "assets/img/page-notes.jpg",      title: "Notes Hub",        note: "everything findable" },
      { src: "assets/img/page-goals.jpg",      title: "Goals",            note: "progress you can see" }
    ]
  }

  /* ---- COPY FROM HERE TO ADD TEMPLATE #2 ----
  ,{
    id: "template-two",
    name: "Template Two",
    subtitle: "short descriptor",
    price: "$12",
    compareAt: "",
    badge: "",
    gumroad: "https://lilacgenomics.gumroad.com/l/template-two",
    page: "products/template-two.html",
    cover: "assets/img/your-image.jpg",
    blurb: "One or two sentences about it.",
    highlights: ["Point one", "Point two", "Point three"],
    pages: [
      { src: "assets/img/your-image.jpg", title: "Screen name", note: "caption" }
    ]
  }
  -------------------------------------------- */
];

/* Frequently asked questions shown on the home page */
const FAQ = [
  {
    q: "Do I need a paid Notion plan?",
    a: "No. Everything here runs on Notion's free personal plan, on desktop, web and mobile."
  },
  {
    q: "How do I get the template after paying?",
    a: "Gumroad emails you a Notion link straight away. Open it, press Duplicate in the top right, and the whole workspace copies into your own Notion account."
  },
  {
    q: "Can I change things?",
    a: "It's your copy once it's duplicated. Rename pages, delete what you don't use, change the colours — nothing is locked."
  },
  {
    q: "Is it beginner friendly?",
    a: "Yes. Every page comes filled with example entries so you can see how it's meant to work, and there's a short setup page explaining what to delete first."
  },
  {
    q: "Do I get updates?",
    a: "When a template gets improved, Gumroad emails everyone who bought it the new link. You keep the old copy and can pull in what you like."
  },
  {
    q: "What if it isn't for me?",
    a: "Email " + SITE.email + " within 14 days and you'll get a refund, no explanation needed."
  }
];

window.SITE = SITE;
window.PRODUCTS = PRODUCTS;
window.FAQ = FAQ;
