// where-to-stay data. official copy/photos from each hotel's site; prices = what we paid (at cost).
// thb prices convert at STAY.fx; usd prices were paid in usd. agoda = public price for the same dates, for comparison.
window.STAY = {
  fx: 33, // THB per USD — the rate we paid at, locked
  fee: 0.03, // folded into every shown price to cover card processing; not itemized
  agodaCheckedAt: "Oct 11, 2026",
  intro: "We've reserved rooms at five hotels around Tubkaek Beach, all at our group rate. Banyan Tree and Tubkaak are the venues, a short walk apart; Tup Kaek Sunset is a stroll from both; Varana and Elements are a 5–10 minute drive, with shuttles to every event.",
  howItWorks: [
    "Choose a first and second pick when you RSVP.",
    "We'll confirm your room and send a secure payment link.",
    "Not sure, or looking for something more budget-friendly? Just tell us — we're happy to help.",
  ],
  hotels: [
  {
    "slug": "banyan-tree",
    "name": "Banyan Tree Krabi",
    "tag": "Venue · Western wedding",
    "location": "Western ceremony, reception and after-party are here. A short walk to Tubkaak.",
    "blurb": "An all-villa resort on quiet Tubkaek Beach, every villa with its own pool. Michelin Guide Two Keys, a Banyan Tree spa, and the wedding night happens right outside your door.",
    "bestFor": "Making a full holiday of it — and never needing a shuttle.",
    "worthKnowing": "Our most indulgent option — ten villas, eight right on the beach.",
    "image": "photos/hotels/banyan-tree/hero.jpg",
    "url": "https://www.banyantree.com/thailand/krabi",
    "bookingUrl": "https://be.synxis.com/?hotel=30835&chain=17604&theme=BTSBE&config=BTSBE&locale=en-US",
    "address": "279 Moo 3, Tambon Nongtalay, Amphoe Muang, Krabi 81180, Thailand",
    "rooms": [
      {
        "name": "Beachfront Pool Villa",
        "image": "photos/hotels/banyan-tree/beachfront-pool-villa.jpg",
        "size": 204,
        "bed": "King",
        "guests": 2,
        "features": [
          "Directly on Tubkaek Beach, with sea view",
          "Pool wrapping three sides, plus a private jet pool",
          "Large living and dining room",
          "Private terrace and garden with daybed"
        ],
        "url": "https://www.banyantree.com/thailand/krabi/accommodation/beachfront-pool-villa",
        "count": 8,
        "checkIn": "2027-02-24",
        "checkOut": "2027-02-27",
        "thb": 46000,
        "agoda": {
          "nonRefundable": 1614,
          "when": "week before & after"
        }
      },
      {
        "name": "Deluxe Garden Pool Villa",
        "image": "photos/hotels/banyan-tree/deluxe-garden-pool-villa.jpg",
        "size": 204,
        "bed": "King",
        "guests": 2,
        "features": [
          "Private wrap-around swimming pool",
          "Private jet pool",
          "Timber terrace with outdoor daybed",
          "Outdoor cabana in private landscaped garden"
        ],
        "url": "https://www.banyantree.com/thailand/krabi/accommodation/deluxe-garden-pool-villa",
        "count": 2,
        "checkIn": "2027-02-24",
        "checkOut": "2027-02-27",
        "thb": 46000,
        "agoda": {
          "nonRefundable": 1529,
          "when": "week before & after"
        }
      }
    ]
  },
  {
    "slug": "tubkaak",
    "name": "The Tubkaak Krabi Boutique Resort",
    "tag": "Venue · Thai wedding",
    "location": "Thai ceremony and dinner are here. A short walk to Banyan Tree.",
    "blurb": "A boutique resort facing a 13-island view, designed in Southern Thai style with outdoor sunken tubs in every room. Calm, swimmable water all year.",
    "bestFor": "Being at the heart of everything, with rooms from easygoing to villa.",
    "worthKnowing": "Our block here starts a night earlier, Feb 23–27.",
    "image": "photos/hotels/tubkaak/hero.jpg",
    "url": "https://www.tubkaakresort.com/",
    "bookingUrl": "https://reservation.travelanium.net/propertyibe2/?propertyId=820&onlineId=4",
    "address": "123 Moo 3, Tumbol Nongtalay, Amphur Muang, Krabi 81180, Thailand",
    "rooms": [
      {
        "name": "Superior Room",
        "image": "photos/hotels/tubkaak/superior.jpg",
        "size": 40,
        "features": [
          "Ground floor beside the free-form resort pool",
          "Pool-view terrace",
          "Outdoor sunken bathtub plus indoor rain shower",
          "Nespresso machine"
        ],
        "url": "https://www.tubkaakresort.com/rooms/superior/",
        "count": 3,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "thb": 13500,
        "agoda": {
          "nonRefundable": 569,
          "refundable": 755,
          "when": "week before & after"
        }
      },
      {
        "name": "Deluxe Room",
        "image": "photos/hotels/tubkaak/deluxe.jpg",
        "features": [
          "Upper-floor position",
          "Balcony daybed overlooking the pool",
          "Outdoor sunken bathtub and outdoor shower",
          "Nespresso machine"
        ],
        "url": "https://www.tubkaakresort.com/rooms/deluxe/",
        "count": 3,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "thb": 15900,
        "agoda": {
          "nonRefundable": 652,
          "refundable": 865,
          "when": "week before & after"
        }
      },
      {
        "name": "Premier Pool Villa",
        "image": "photos/hotels/tubkaak/premier-pool-villa.jpg",
        "size": "110-130",
        "features": [
          "Private walled villa",
          "Private outdoor pool",
          "Private Jacuzzi",
          "Outdoor bathtub and separate shower"
        ],
        "url": "https://www.tubkaakresort.com/rooms/premier-pool-villa/",
        "count": 2,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "thb": 23600,
        "agoda": {
          "nonRefundable": 1046,
          "refundable": 1387,
          "when": "week before & after"
        }
      },
      {
        "name": "Ocean View Pool Villa",
        "image": "photos/hotels/tubkaak/ocean-view-pool-villa.jpg",
        "size": "130-145",
        "features": [
          "A few metres from the beach",
          "Private outdoor pool and sun deck",
          "Andaman Sea views",
          "Outdoor bathtub and separate shower"
        ],
        "url": "https://www.tubkaakresort.com/rooms/ocean-view-pool-villa/",
        "count": 2,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "thb": 25600
      },
      {
        "name": "Seaview Suite",
        "image": "photos/hotels/tubkaak/seaview-suite.jpg",
        "size": 120,
        "features": [
          "Separate bedroom and living room",
          "Large sea-view terrace steps from the beach",
          "Sunken bathtub",
          "Nespresso machine"
        ],
        "url": "https://www.tubkaakresort.com/rooms/seaview-suite/",
        "count": 1,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "thb": 28700
      }
    ]
  },
  {
    "slug": "tup-kaek-sunset",
    "name": "Tup Kaek Sunset Beach Resort",
    "tag": "Walking distance to both venues",
    "location": "On the same beach, a stroll from Tubkaak and Banyan Tree.",
    "blurb": "A relaxed beachfront resort of cottages and bungalows set in tropical gardens along the 1 km sweep of Tup Kaek Beach.",
    "bestFor": "Toes-in-the-sand simplicity, at a gentler price.",
    "worthKnowing": "Laid-back rather than luxe — charming, not fancy.",
    "image": "photos/hotels/tup-kaek-sunset/hero.jpg",
    "url": "https://www.tupkaeksunset.com/",
    "bookingUrl": "https://ibe.hoteliers.guru/ibe/En/Tup-Kaek-Sunset-Beach-Resort-Muang-Krabi-TH",
    "address": "109 Moo 3, Nong Talay, Muang, Krabi 81180, Thailand",
    "rooms": [
      {
        "name": "Deluxe Pool View",
        "image": "photos/hotels/tup-kaek-sunset/deluxe-pool-view.jpg",
        "size": 35,
        "bed": "King size (king or twin option)",
        "features": [
          "Private balcony overlooking the pool and mountains",
          "Flat-screen satellite TV",
          "Mini bar",
          "Safe"
        ],
        "url": "https://www.tupkaeksunset.com/accommodation/deluxe-pool-view",
        "count": 3,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "thb": 6679.2,
        "agoda": {
          "nonRefundable": 416,
          "refundable": 457,
          "when": "same dates"
        }
      },
      {
        "name": "Deluxe Garden Cottage",
        "image": "photos/hotels/tup-kaek-sunset/deluxe-garden-cottage.jpg",
        "size": 35,
        "bed": "King size (Double bed)",
        "features": [
          "Stand-alone cottage/bungalow",
          "Garden view",
          "Private furnished terrace",
          "Bathtub and rain shower"
        ],
        "url": "https://www.tupkaeksunset.com/accommodation/deluxe-garden-cottage",
        "count": 1,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "thb": 7318.07
      },
      {
        "name": "Bungalow Deluxe",
        "count": 1,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "usd": 220.64
      },
      {
        "name": "Deluxe Beach Front Cottage",
        "image": "photos/hotels/tup-kaek-sunset/deluxe-beach-front-cottage.jpg",
        "size": 45,
        "bed": "King size (Double bed)",
        "features": [
          "Individual beachfront villa",
          "Direct beach access from the terrace",
          "Ocean view and sunset",
          "Outdoor rain shower and bathtub"
        ],
        "url": "https://www.tupkaeksunset.com/accommodation/deluxe-beach-font",
        "count": 1,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-26",
        "usd": 277.65
      },
      {
        "name": "Deluxe Pool Access",
        "image": "photos/hotels/tup-kaek-sunset/deluxe-pool-access.jpg",
        "size": 35,
        "bed": "King size (king or twin option)",
        "features": [
          "Private terrace with direct pool access and sun deck",
          "Pool and mountain view",
          "Flat-screen satellite TV",
          "Mini bar"
        ],
        "url": "https://www.tupkaeksunset.com/accommodation/deluxe-pool-access",
        "count": 1,
        "checkIn": "2027-02-24",
        "checkOut": "2027-02-27",
        "usd": 226.36
      }
    ]
  },
  {
    "slug": "varana",
    "name": "Varana Hotel Krabi",
    "tag": "5–10 min drive · shuttles provided",
    "location": "A short ride from both venues; we run shuttles to every event.",
    "blurb": "A wellness-minded hotel at the foot of Khao Ngon Nak, with an Olympic-length pool, a beach club, spa, and dining led by chef David Thompson.",
    "bestFor": "Great food, a big pool, and a little extra space from the party.",
    "worthKnowing": "You’ll ride the shuttle to each event. Breakfast included.",
    "image": "photos/hotels/varana/hero.jpg",
    "url": "https://www.varanahotel.com/",
    "bookingUrl": "https://reservation.varanahotel.com/propertyibe2/?propertyId=1006&onlineId=4",
    "address": "258 Moo 3, Tumbon Nongtalay, Muang District, Krabi 81180, Thailand",
    "rooms": [
      {
        "name": "Luxe Pool View King",
        "image": "photos/hotels/varana/luxe-pool-view-king.jpg",
        "size": 38,
        "bed": "King (King or Twin available)",
        "guests": 2,
        "features": [
          "Pool view",
          "Bathtub and shower",
          "Teak writing desk",
          "55\" Smart TV"
        ],
        "url": "https://www.varanahotel.com/accommodation/luxe-pool",
        "count": 4,
        "checkIn": "2027-02-24",
        "checkOut": "2027-02-27",
        "thb": 8500,
        "agoda": {
          "nonRefundable": 467,
          "refundable": 671,
          "when": "same dates"
        }
      },
      {
        "name": "Luxe Mountain View King",
        "image": "photos/hotels/varana/luxe-mountain-view-king.jpg",
        "size": 38,
        "bed": "King (King or Twin available)",
        "guests": 2,
        "features": [
          "Mountain view (Dragon Crest Mountain)",
          "Floor-to-ceiling windows",
          "Bathtub and shower",
          "Harman Kardon speaker"
        ],
        "url": "https://www.varanahotel.com/accommodation/luxe-mountain",
        "count": 4,
        "checkIn": "2027-02-24",
        "checkOut": "2027-02-27",
        "thb": 9000,
        "agoda": {
          "nonRefundable": 496,
          "refundable": 713,
          "when": "same dates"
        }
      }
    ]
  },
  {
    "slug": "elements",
    "name": "The Elements Krabi Resort",
    "tag": "5–10 min drive · shuttles provided",
    "location": "A short ride from both venues; we run shuttles to every event.",
    "blurb": "A comfortable, value-minded resort nearby. More details soon.",
    "bestFor": "Keeping the trip easy on the budget.",
    "worthKnowing": "You’ll ride the shuttle to each event.",
    "rooms": [
      {
        "name": "Superior",
        "count": 4,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "usd": 112.0,
        "agoda": {
          "nonRefundable": 148,
          "refundable": null,
          "when": "same dates"
        }
      },
      {
        "name": "Deluxe",
        "count": 1,
        "checkIn": "2027-02-23",
        "checkOut": "2027-02-27",
        "usd": 128.99,
        "agoda": {
          "nonRefundable": 153,
          "refundable": null,
          "when": "same dates"
        }
      }
    ]
  }
],
};
