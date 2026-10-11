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
  date: "2027-02-25T10:00:00+07:00",
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

  // `date` as "YYYY-MM-DD" = day only (no time shown, no calendar buttons).
  // full ISO w/ +07:00 = timed; `end` optional (calendar assumes 2h without it)
  events: [
    { name: "Welcome Dinner",  date: "2027-02-24T18:00:00+07:00", venue: "Venue to come", note: "Drinks as the sun goes down over the Andaman." },
    { name: "Thai Wedding",    date: "2027-02-25T10:00:00+07:00", venue: "The Tubkaak Krabi Boutique Resort", mapQuery: "The Tubkaak Krabi Boutique Resort", note: "Khan Mak procession and ceremony in the morning, dinner that evening." },
    { name: "Western Ceremony", date: "2027-02-26T17:00:00+07:00", end: "2027-02-26T18:00:00+07:00", venue: "Banyan Tree Krabi", address: "Beach Lawn 4", mapQuery: "Banyan Tree Krabi" },
    { name: "Reception",       date: "2027-02-26T18:00:00+07:00", end: "2027-02-26T22:00:00+07:00", venue: "Banyan Tree Krabi", address: "Beach Lawn 3", mapQuery: "Banyan Tree Krabi", note: "Dinner and dancing." },
    { name: "After-Party",     date: "2027-02-26T22:00:00+07:00", end: "2027-02-27T01:00:00+07:00", venue: "Banyan Tree Krabi", address: "Naga Kitchen", mapQuery: "Banyan Tree Krabi" },
    { name: "Farewell Brunch", date: "2027-02-27T11:30:00+07:00", venue: "Venue to come" },
  ],

  // one image per day of the schedule (keyed by local date)
  dayImages: {
    "2027-02-24": "photos/beach.jpg",
    "2027-02-25": "photos/tubkaak.jpg",
    "2027-02-26": "photos/venue.jpg",
    "2027-02-27": "photos/stamp.jpg",
  },

  travel: {
    intro: "Wednesday, February 24 through Saturday, February 27, 2027.",
    items: [
      { title: "Venues", image: "photos/venue.jpg", body: "Thai wedding at The Tubkaak Krabi Boutique Resort; Western wedding at Banyan Tree Krabi." },
      { title: "Airport", image: "photos/airport.jpg", body: "Krabi International Airport (KBV)." },
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
