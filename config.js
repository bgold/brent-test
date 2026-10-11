// ─────────────────────────────────────────────────────────────
//  edit everything about the site here. no html required.
//  photos: drop files in /photos and reference them by path.
//  empty sections (no story, no registry links, no faqs) hide themselves.
// ─────────────────────────────────────────────────────────────
window.WEDDING = {
  couple: {
    first: "Tamisa",
    second: "Brent",
    monogram: "T&B",
  },

  // countdown target. ISO w/ offset — Krabi is UTC+7 year-round
  date: "2027-02-25T00:00:00+07:00",
  timezone: "Asia/Bangkok",
  dateDisplay: "February 25 & 26, 2027",
  location: "Krabi, Thailand",

  // optional — leave "" to use the celadon pattern hero
  heroImage: "",
  tagline: "Save the Date",

  intro: {
    eyebrow: "Sawatdee kap / kaa",
    heading: "We're getting married in Thailand",
    paragraphs: [
      "We'd love to celebrate with you in Krabi.",
      "A formal invitation with complete event details, accommodation suggestions, and RSVP details will follow. For now, please save the dates and let us know whether you think you'll be able to join us.",
    ],
    photos: [], // up to 3 look best, e.g. "photos/us-1.jpg"
  },

  // `date` alone = day only; add `time`/`end` (ISO) once known to unlock calendar buttons
  events: [
    { name: "Welcome Dinner",  date: "2027-02-24", venue: "Krabi", note: "Details to come." },
    { name: "Thai Wedding",    date: "2027-02-25", venue: "Banyan Tree Krabi", mapQuery: "Banyan Tree Krabi", note: "Details to come." },
    { name: "Western Wedding", date: "2027-02-26", venue: "Banyan Tree Krabi", mapQuery: "Banyan Tree Krabi", note: "Details to come." },
    { name: "Farewell Brunch", date: "2027-02-27", venue: "Krabi", note: "Details to come." },
  ],

  travel: {
    intro: "Wednesday, February 24 through Saturday, February 27, 2027.",
    items: [
      { title: "Venue", image: "photos/venue.jpg", body: "Banyan Tree Krabi.", link: "https://maps.google.com/?q=Banyan+Tree+Krabi", linkLabel: "Map" },
      { title: "Airport", image: "photos/airport.jpg", body: "Krabi International Airport (KBV)." },
      { title: "Accommodations", image: "photos/hotels.jpg", body: "We've reserved room blocks with three hotels at various price points, all within minutes of the event venues. More information will be shared in the formal invite." },
      { title: "Transportation", body: "Krabi Airport is approximately 45–60 minutes from the hotels. We'll provide airport transfers to the hotels, and shuttles between the hotels and events." },
    ],
  },

  registry: { intro: "", links: [] },

  faqs: [
    { q: "When will the formal invitation arrive?", a: "A formal invitation with complete event details, accommodations, and RSVP information will follow. For now, just save the dates!" },
    { q: "Do I need to arrange transport from the airport?", a: "No — we'll provide airport transfers from Krabi International Airport (KBV) to the hotels, plus shuttles between the hotels and events." },
  ],

  rsvp: {
    // false = show the "formal invite to follow" note instead of the form
    open: false,
    closedNote: "Formal RSVP will open with the invitation. In the meantime, please reply to the save the date in your Paperless Post email to tell us how likely you are to join us in Krabi.",
    deadline: "",
    formEndpoint: "",
    email: "",
    mealOptions: [],
  },

  gallery: [],
};
