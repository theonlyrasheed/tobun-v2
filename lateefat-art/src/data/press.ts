export type PressBodyBlock =
  | { p: string }
  | { quote: string; by: string }
  | { img: string; cap: string };

export interface PressArticle {
  slug: string;
  outlet: string;
  kind: string;
  date: string;
  read: string;
  title: string;
  standfirst: string;
  hero: string;
  heroCaption: string;
  body: PressBodyBlock[];
  gallery: string[];
  source: { label: string; href: string };
}

export const pressArticles: PressArticle[] = [
  {
    slug: "creative-worship",
    outlet: "Creative Worship",
    kind: "Feature",
    date: "October 2025",
    read: "5 min read",
    title: "Tradition, reimagined: a digital couturier's rise",
    standfirst:
      "How four yards of ADIRE cloth became a practice that treats heritage as a living material — and why the runway of the future might be rendered, not stitched.",
    hero: "https://picsum.photos/seed/lt-26-coverage/1600/1000",
    heroCaption: "Lateefat Tobun in the studio, 2025",
    body: [
      {
        p: "Lateefat Modupeola Tobun does not draw a line between the loom and the laptop. In her hands, the traditional Yoruba tie-and-dye textile ADIRE is not a relic to be preserved behind glass, but a living material — one that can be folded, scanned, re-coloured and worn in spaces that don't physically exist.",
      },
      {
        p: "Her route here was anything but obvious. An economist by training, with two master's degrees including one in Applied Artificial Intelligence and Data Analytics, Tobun could have spent her career in spreadsheets. Instead, she says, her heart chose colour.",
      },
      {
        quote:
          "I never wanted to choose between the hand and the machine. The work is most honest when both are in the room.",
        by: "Lateefat Tobun",
      },
      {
        p: "That conviction is everywhere in her practice. A garment begins as indigo on cloth and ends as a digital couture piece you can wear in virtual space — the pattern carried faithfully from one medium to the next. The result feels at once ancestral and unmistakably new.",
      },
      {
        img: "https://picsum.photos/seed/lt-1-digital-couture-01/1200/800",
        cap: "Form Beyond Fabric — digital couture study, 2024",
      },
      {
        p: "What makes the work resonate, beyond its craft, is its generosity. Tobun treats artificial intelligence as a collaborator rather than a shortcut, using it to extend hand-made work into something sustainable and scalable without losing the cultural story at its centre.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/lt-1-digital-couture-01/700/700",
      "https://picsum.photos/seed/lt-2-adire-indigo-study/700/700",
      "https://picsum.photos/seed/lt-9-tie-dye-pattern/700/700",
    ],
    source: { label: "Creative Worship", href: "#" },
  },
  {
    slug: "digital-culture",
    outlet: "Digital Culture",
    kind: "Report",
    date: "January 2025",
    read: "4 min read",
    title: "Inside the Digital Culture Event: art for a common goal",
    standfirst:
      "A first-hand report from a gathering built on a single idea — that creativity is most powerful when it is shared, and that technology and tradition deserve equal billing.",
    hero: "https://picsum.photos/seed/lt-27-coverage/1600/1000",
    heroCaption: "Workshop floor at the Digital Culture Event",
    body: [
      {
        p: "There were printing tables on one side of the room and rendering screens on the other, and by the end of the afternoon it was hard to tell which had drawn the bigger crowd.",
      },
      {
        p: "The Digital Culture Event brought together makers who had never met, around a goal none of them could have reached alone. Some arrived to learn ADIRE printing; others came for the AI tools. Most left having tried both.",
      },
      {
        quote: "Art turns a room of strangers into makers. You watch it happen in an afternoon.",
        by: "Lateefat Tobun",
      },
      {
        p: "If there is a thesis to the event, it is that creativity is a communal act. The technology is only ever in service of the people in the room — a way to widen the door, not to replace the hand that opens it.",
      },
      {
        img: "https://picsum.photos/seed/lt-12-ai-illustration-hy/1200/800",
        cap: "Minds on Earth — AI and illustration hybrid",
      },
      {
        p: "By closing time the work pinned to the walls was a record of the day itself: indigo beside generative pattern, sketch beside render, all of it made by hands that had arrived as strangers.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/lt-12-ai-illustration-hy/700/700",
      "https://picsum.photos/seed/lt-4-ai-feature/700/700",
      "https://picsum.photos/seed/lt-6-digital-illustrati/700/700",
    ],
    source: { label: "Digital Culture", href: "#" },
  },
  {
    slug: "arts-review",
    outlet: "Arts Review",
    kind: "Profile",
    date: "November 2024",
    read: "6 min read",
    title: "From four yards of fabric to wearable digital art",
    standfirst:
      "It started with a single garment and a growing curiosity about how pattern interacts with the body. It has ended — for now — on a digital runway.",
    hero: "https://picsum.photos/seed/lt-28-coverage/1600/1000",
    heroCaption: "Tie-dye study, the origin of a practice",
    body: [
      {
        p: "In 2017, with only four yards of fabric, Lateefat Tobun began to imagine form beyond flat material. There were no mannequins and no digital tools — just cloth, dye, and a question about how a pattern behaves once it wraps a body.",
      },
      {
        p: "That question has carried her a long way. The garment became a series; the series became a practice spanning murals, painting, illustration and digital couture.",
      },
      {
        quote:
          "Four yards of fabric taught me everything. Pattern is a language — I just kept learning new ways to speak it.",
        by: "Lateefat Tobun",
      },
      {
        p: "Arts Review has followed that thread from the first experiment to the present, where AI and data tools let the same indigo pattern live as wearable art in a global digital economy.",
      },
      {
        img: "https://picsum.photos/seed/lt-14-wearable-art/1200/800",
        cap: "The Pocket Stories — wearable art, 2026",
      },
      {
        p: "The insistence that the two belong in the same frame is what gives the work its charge. Heritage is not diluted by technology here; it is amplified by it.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/lt-9-tie-dye-pattern/700/700",
      "https://picsum.photos/seed/lt-14-wearable-art/700/700",
      "https://picsum.photos/seed/lt-8-digital-couture-02/700/700",
    ],
    source: { label: "Arts Review", href: "#" },
  },
  {
    slug: "heritage-now",
    outlet: "Heritage Now",
    kind: "Feature",
    date: "May 2024",
    read: "5 min read",
    title: "Elevating heritage: ADIRE meets the algorithm",
    standfirst:
      "At a Ghana exhibition, Yoruba indigo met generative pattern — and raised a question worth sitting with: what does it mean to keep a tradition alive by letting it change?",
    hero: "https://picsum.photos/seed/lt-29-coverage/1600/1000",
    heroCaption: "Elevating Heritage, Accra, 2024",
    body: [
      {
        p: "The murals came first — large-scale public work rooted in community and place, ADIRE lifted off the body and onto the wall. But the exhibition's real provocation was quieter: a series in which traditional indigo pattern was reinterpreted by generative systems.",
      },
      {
        p: "Heritage Now went to Accra expecting a celebration of craft. We found something more searching — an argument that heritage is not a fixed object but a conversation.",
      },
      {
        quote: "A tradition you are not allowed to change is a tradition you have already lost.",
        by: "Lateefat Tobun",
      },
      {
        p: "Paired with a live printing workshop, the show reconnected craft and identity for everyone who walked through it.",
      },
      {
        img: "https://picsum.photos/seed/lt-11-mural-heritage/1200/800",
        cap: "Mural and textile work, Elevating Heritage",
      },
      {
        p: "It is a generous way to think about culture — as something held in common and kept alive precisely because it is allowed to move.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/lt-11-mural-heritage/700/700",
      "https://picsum.photos/seed/lt-3-clayton-community-/700/700",
      "https://picsum.photos/seed/lt-2-adire-indigo-study/700/700",
    ],
    source: { label: "Heritage Now", href: "#" },
  },
  {
    slug: "fashion-tech",
    outlet: "Fashion Tech",
    kind: "Interview",
    date: "July 2023",
    read: "4 min read",
    title: "Empowering women to innovate in art and fashion",
    standfirst:
      "An interview about access — who gets to make, who gets to innovate, and how a single bootcamp can change the answer.",
    hero: "https://picsum.photos/seed/lt-30-coverage/1600/1000",
    heroCaption: "Fashion-tech bootcamp in session",
    body: [
      {
        p: "Ask Lateefat Tobun what her workshops are really about and she will not start with software. She starts with the room — who is in it, who feels they are allowed to be there, and what changes when the tools are simply handed over.",
      },
      {
        p: "Her fashion-tech bootcamps introduce digital couture, illustration and AI tools to people who rarely see themselves represented in those spaces.",
      },
      {
        quote: "Give people the tools and the room, and the creativity takes care of itself.",
        by: "Lateefat Tobun",
      },
      {
        p: "In conversation with Fashion Tech, she is clear that empowerment is not a slogan but a method — structured, repeatable, and measured by who walks out able to keep making on their own.",
      },
      {
        img: "https://picsum.photos/seed/lt-7-editorial-photogra/1200/800",
        cap: "Editorial photography from a recent bootcamp",
      },
      {
        p: "It is an optimism grounded in evidence. Cohort after cohort, the work that emerges makes the case better than any manifesto could.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/lt-7-editorial-photogra/700/700",
      "https://picsum.photos/seed/lt-13-studio-photography/700/700",
      "https://picsum.photos/seed/lt-15-sketch-series/700/700",
    ],
    source: { label: "Fashion Tech", href: "#" },
  },
  {
    slug: "mindful-arts",
    outlet: "Mindful Arts",
    kind: "Feature",
    date: "September 2025",
    read: "5 min read",
    title: "Art as healing: creativity for emotional regulation",
    standfirst:
      "The most recent turn in Lateefat Tobun's practice treats making as care — a therapeutic tool to help people regulate emotion, find calm, and experience creativity as a form of healing.",
    hero: "https://picsum.photos/seed/lt-31-coverage/1600/1000",
    heroCaption: "A mindful regulation session",
    body: [
      {
        p: "Somewhere between the murals and the digital couture, Lateefat Tobun's work turned inward. Her recent sessions on mindful regulation are less about the object produced than the state of the person producing it.",
      },
      {
        p: "The shift is consistent with everything that came before. If her earlier work argued that creativity is communal, this argues that it is also restorative.",
      },
      {
        quote: "Creativity is not only what you make. Sometimes it is simply what keeps you well.",
        by: "Lateefat Tobun",
      },
      {
        p: "Mindful Arts found the sessions notable for their lack of pressure. There is no finished piece to judge, no technique to master — only the act of making, offered as a form of care.",
      },
      {
        img: "https://picsum.photos/seed/lt-5-charcoal-contrast-/1200/800",
        cap: "Charcoal study — The Art We Carry",
      },
      {
        p: "It reframes the whole practice in a single move: creativity not as output but as process, valued for the doing, and extended as an invitation rather than a performance.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/lt-5-charcoal-contrast-/700/700",
      "https://picsum.photos/seed/lt-10-visual-painting/700/700",
      "https://picsum.photos/seed/lt-16-fabric-painting/700/700",
    ],
    source: { label: "Mindful Arts", href: "#" },
  },
];

export const pressOrder = [
  "creative-worship",
  "digital-culture",
  "arts-review",
  "heritage-now",
  "fashion-tech",
  "mindful-arts",
];

export function getPressArticle(slug: string): PressArticle | undefined {
  return pressArticles.find((a) => a.slug === slug);
}
