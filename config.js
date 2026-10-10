// ─────────────────────────────────────────────────────────────
//  edit everything about the site here. no html required.
//  photos: drop files in /photos and reference them by path.
// ─────────────────────────────────────────────────────────────
window.WEDDING = {
  couple: {
    first: "Alex",
    second: "Jordan",
    monogram: "A&J",
  },

  // ISO datetime w/ offset so the countdown is right everywhere
  date: "2027-06-12T16:30:00-07:00",
  timezone: "America/Los_Angeles",
  location: "Sonoma, California",

  // optional — leave "" to use the soft gradient hero
  heroImage: "",
  tagline: "We're getting married",

  story: {
    heading: "Our Story",
    paragraphs: [
      "We met on a rainy Tuesday in a bookshop that was supposed to be closed. One of us was looking for a cookbook; the other was very much not looking for anything.",
      "Six years, two apartments, and one extremely opinionated cat later, we're making it official — and we'd love for you to be there.",
    ],
    // up to 3 look best. e.g. "photos/story-1.jpg"
    photos: [],
  },

  events: [
    {
      name: "Welcome Drinks",
      date: "2027-06-11T18:00:00-07:00",
      end: "2027-06-11T21:00:00-07:00",
      venue: "The Girl & The Fig",
      address: "110 W Spain St, Sonoma, CA 95476",
      attire: "Casual",
      note: "Come as you are. First round's on us.",
    },
    {
      name: "Ceremony",
      date: "2027-06-12T16:30:00-07:00",
      end: "2027-06-12T17:15:00-07:00",
      venue: "Beltane Ranch",
      address: "11775 Sonoma Hwy, Glen Ellen, CA 95442",
      attire: "Garden formal",
      note: "Outdoors on grass — block heels recommended.",
    },
    {
      name: "Reception",
      date: "2027-06-12T17:30:00-07:00",
      end: "2027-06-12T23:00:00-07:00",
      venue: "Beltane Ranch",
      address: "11775 Sonoma Hwy, Glen Ellen, CA 95442",
      attire: "Garden formal",
      note: "Dinner, dancing, and a late-night snack you'll thank us for.",
    },
  ],

  travel: {
    intro: "Sonoma is about an hour north of San Francisco. Here's everything you need to get there and get comfy.",
    items: [
      { title: "Fly into", body: "SFO or OAK are easiest. STS (Santa Rosa) is closest if you can get a direct flight." },
      { title: "Getting around", body: "Rent a car or plan on rideshare. We'll run shuttles between the hotel block and the venue on the wedding day." },
      { title: "Hotel block", body: "MacArthur Place — mention our names for the group rate. Book by May 1, 2027.", link: "https://example.com", linkLabel: "Book the block" },
    ],
  },

  registry: {
    intro: "Your presence is the real gift. If you'd like to give something more, we've registered at a few places.",
    links: [
      { label: "Honeymoon Fund", url: "https://example.com" },
      { label: "Crate & Barrel", url: "https://example.com" },
      { label: "Food52", url: "https://example.com" },
    ],
  },

  faqs: [
    { q: "When should I RSVP by?", a: "Please let us know by April 15, 2027." },
    { q: "Can I bring a plus one?", a: "If your invitation includes a guest, their name will appear when you RSVP." },
    { q: "Are kids welcome?", a: "We love your little ones, but this will be an adults-only celebration." },
    { q: "What's the weather like?", a: "Warm afternoons (~80°F), cool evenings (~55°F). Bring a layer for after sunset." },
    { q: "Is there parking?", a: "Yes, free parking on site. Shuttles also run from the hotel block." },
  ],

  rsvp: {
    deadline: "April 15, 2027",
    // easiest backend: create a free form at formspree.io and paste its endpoint here.
    // if blank, the form falls back to opening an email to `email`.
    formEndpoint: "",
    email: "hello@example.com",
    mealOptions: ["Short rib", "Halibut", "Wild mushroom risotto (v)"],
  },

  // photo gallery strip, e.g. ["photos/1.jpg", "photos/2.jpg"]
  gallery: [],
};
