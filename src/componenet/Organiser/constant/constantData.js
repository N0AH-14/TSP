// constants.js
import colllegefest from "../../../assets/photos/collegeFest.jpg";
import culturalfest from "../../../assets/photos/cluturalFest.jpeg";
import talkshow from "../../../assets/photos/talkShow.jpg";
import standup from "../../../assets/photos/standup.jpg";
import techfest from "../../../assets/photos/techfest.jpg";
import musicfest from "../../../assets/photos/musicFest.jpg";

import Ticket from "../../../assets/photos/dynamic-pricing.jpg"
import sales from "../../../assets/photos/marketing.jpeg";
import entryexit from "../../../assets/photos/entryexit.png";
import dahsboard from "../../../assets/photos/dashboard.jpg";
import helpsupport from "../../../assets/photos/help and support.png";
import sponsort from "../../../assets/photos/sponsors.jpg";

// Event and service data
export const events = [
  {
    title: "College Fest",
    imageUrl: colllegefest,
    description:
      "Host an exciting college festival filled with fun and activities.",
    info: ["Live performances", "Workshops", "Cultural exhibitions"],
  },
  {
    title: "Cultural Fest",
    imageUrl: culturalfest,
    description:
      "Celebrate diversity with various cultural performances and exhibitions.",
    info: ["Traditional dances", "Art displays", "Food stalls"],
  },
  {
    title: "Talk Show",
    imageUrl: talkshow,
    description:
      "Engage in thought-provoking discussions with experts and celebrities.",
    info: ["Expert speakers", "Audience Q&A", "Networking opportunities"],
  },
  {
    title: "Stand-Up Comedy",
    imageUrl: standup,
    description: "Enjoy a night of laughter with talented stand-up comedians.",
    info: ["Top comedians", "Open mic", "Fun atmosphere"],
  },
  {
    title: "Tech Fest",
    imageUrl: techfest,
    description: "Explore the latest in technology with workshops and talks.",
    info: ["Tech talks", "Hands-on workshops", "Latest gadgets"],
  },
  {
    title: "Music Festival",
    imageUrl: musicfest,
    description: "Join us for a celebration of music with live performances.",
    info: ["Multiple stages", "Diverse genres", "Food and drinks"],
  },
];

export const services = [
  {
    title: "Dynamic Ticket Pricing",
    imageUrl: Ticket,
    description: "Optimize your ticket prices dynamically based on demand.",
    info: [
      "Increased revenue",
      "Market-driven pricing",
      "Real-time adjustments",
    ],
  },
  {
    title: "Online Sales Marketing",
    imageUrl: sales,
    description:
      "Market your events effectively through various online channels.",
    info: ["Social media marketing", "Email campaigns", "Targeted ads"],
  },
  {
    title: "Advanced App for Entry and Exit",
    imageUrl: entryexit,
    description: "Streamline entry and exit processes with our advanced app.",
    info: ["Fast check-ins", "Real-time updates", "User-friendly interface"],
  },
  {
    title: "Event Organizing Dashboard",
    imageUrl:dahsboard,
    description:
      "Manage your events seamlessly with our user-friendly dashboard.",
    info: ["Task management", "Budget tracking", "Analytics"],
  },
  {
    title: "Help and Support",
    imageUrl: helpsupport,
    description:
      "Get assistance from our dedicated support team for all your queries.",
    info: ["24/7 support", "FAQ section", "Live chat"],
  },
  {
    title: "Connect to Sponsors",
    imageUrl:sponsort,
    description:
      "Build valuable connections with potential sponsors for your events.",
    info: [
      "Sponsorship packages",
      "Networking events",
      "Marketing opportunities",
    ],
  },
];
