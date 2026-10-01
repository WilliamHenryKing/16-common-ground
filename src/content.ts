export const disciplines = [
  {
    id: "public-affairs",
    name: "Public affairs",
    title: "Be part of the decisions that matter.",
    description:
      "Understand the landscape. Build meaningful relationships. Bring a clear, credible voice to the conversations shaping your sector.",
    tags: ["Stakeholder engagement", "Political insight", "Strategic advocacy"],
  },
  {
    id: "policy",
    name: "Policy",
    title: "Turn a complex landscape into a clear direction.",
    description:
      "Connect evidence with experience to make policy understandable, useful and ready for the next conversation.",
    tags: ["Policy research", "Consultation responses", "Issues mapping"],
  },
  {
    id: "communications",
    name: "Communications",
    title: "Find the story only you can tell.",
    description:
      "Align what you stand for with what people hear. Shape a distinctive narrative that travels across audiences, channels and moments.",
    tags: ["Narrative and positioning", "Campaign strategy", "Media relations"],
  },
  {
    id: "membership",
    name: "Membership",
    title: "A shared purpose. A stronger collective voice.",
    description:
      "Bring people together around the issues they care about. Build meaningful participation and turn individual perspectives into collective momentum.",
    tags: ["Member engagement", "Community strategy", "Collective representation"],
  },
  {
    id: "events",
    name: "Events",
    title: "Make space for the next important conversation.",
    description:
      "From a focused roundtable to a sector-wide forum, create the setting, the programme and the connections that move ideas forward.",
    tags: ["Conferences and forums", "Roundtable programmes", "Audience experience"],
  },
] as const;
export const perspectives = [
  {
    title: "Progress starts with a better conversation.",
    category: "PUBLIC AFFAIRS",
    image: "london",
    intro: "The right room is only the beginning. What happens in it matters more.",
    paragraphs: [
      "A useful conversation begins long before people sit down together. It starts by understanding what each participant needs, where interests overlap, and which questions have not yet been asked.",
      "Clear evidence creates common ground. Listening gives that evidence context. Together, they make it possible to move from competing positions to practical next steps.",
      "This is an illustrative editorial note for the design concept, not a report of client work.",
    ],
  },
  {
    title: "Bring people together. Move ideas forward.",
    category: "MEMBERSHIP & EVENTS",
    image: "forum",
    intro: "Design a gathering around the conversation you want to make possible.",
    paragraphs: [
      "The value of an event is not confined to its programme. It lives in the introductions, the unexpected questions and the connections that continue afterwards.",
      "Start with a clear purpose. Make space for different voices. Give people a useful way to carry the conversation into their everyday work.",
      "This is an illustrative editorial note. The photograph is licensed stock imagery and illustrates the concept rather than a commissioned event.",
    ],
  },
] as const;
