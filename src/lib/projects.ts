export type ProjectData = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  type: string;
  status: string;
  statusColor: string;
  units: string;
  floors: number;
  element: string;
  elementSymbol: string;
  elementDesc: string;
  accentColor: string;
  gradient: string;
  reraNumber: string;
  qrImage: string;
  heroImages: string[];
  galleryImages: string[];
  highlights: { label: string; value: string }[];
  about: string;
  /** Folder name under /public/ holding this project's compliance PDFs.
   *  Omit (or point at a folder with no PDFs) to hide the compliance section. */
  pdfFolder?: string;
};

export const ALL_PROJECTS: ProjectData[] = [
  {
    slug: "siddhivinayak-chaitanya",
    name: "Siddhivinayak Chaitanya",
    tagline: "Sculpted living on NIBM Road.",
    location: "NIBM Road, Pune",
    type: "Boutique / Low-density",
    status: "Under Development",
    statusColor: "#C9A84C",
    units: "2 & 3 BHK",
    floors: 7,
    element: "Prithvi",
    elementSymbol: "⬡",
    elementDesc: "Solid foundations and quality construction — homes built to stand strong for generations.",
    accentColor: "#C9A84C",
    gradient: "linear-gradient(160deg, #2C1F0E 0%, #1C2B1E 100%)",
    reraNumber: "P52100077890",
    qrImage: "/img/qr-chaitanya.png",
    pdfFolder: "siddhivinayakchaitanya",
    heroImages: ["/img/chaitanya-1.jpeg", "/img/chaitanya-2.jpeg"],
    galleryImages: ["/img/element-10.jpeg", "/img/element-11.jpeg", "/img/element-12.jpeg"],
    highlights: [
      { label: "Configuration", value: "2 & 3 BHK" },
      { label: "Floors", value: "G + 7" },
      { label: "Location", value: "NIBM Road, Pune" },
      { label: "Type", value: "Boutique / Low-density" },
      { label: "Status", value: "Under Development" },
      { label: "Element", value: "Prithvi (Earth)" },
    ],
    about: "Siddhivinayak Chaitanya is a boutique low-density residence on NIBM Road — one of Pune's most established corridors. Sweeping cantilevered balconies and warm timber cladding define a facade that stands apart. Every home is designed with the earth element at its core: grounded, solid, and built to last well beyond the generation that first inhabits it.",
  },
  {
    slug: "t5e-apex",
    name: "T5E Apex",
    tagline: "Life, elevated to the rooftop.",
    location: "Pune",
    type: "Twin-Wing Tower",
    status: "Under Development",
    statusColor: "#7AADAA",
    units: "2 & 3 BHK",
    floors: 12,
    element: "Akash",
    elementSymbol: "◻",
    elementDesc: "Room to breathe — well-proportioned homes, sky views and a sense of quiet expanse.",
    accentColor: "#9B8FA6",
    gradient: "linear-gradient(160deg, #1A1E2E 0%, #1C2B1E 100%)",
    reraNumber: "P52100078901",
    qrImage: "/img/qr-apex.png",
    pdfFolder: "t5e_appex",
    heroImages: ["/img/apex-1.jpeg"],
    galleryImages: ["/img/element-01.jpeg", "/img/element-04.jpeg", "/img/element-06.jpeg"],
    highlights: [
      { label: "Configuration", value: "2 & 3 BHK" },
      { label: "Floors", value: "G + 12" },
      { label: "Location", value: "Pune" },
      { label: "Type", value: "Twin-Wing Tower" },
      { label: "Status", value: "Under Development" },
      { label: "Element", value: "Akash (Space)" },
    ],
    about: "T5E Apex rises as a twin-wing tower conceived around the fifth element — Akash, space. A rooftop clubhouse, sky lounge and landscaped lawn sit at its crown, making the sky itself an extension of daily life. Well-proportioned homes with expansive views ensure every resident experiences the quiet expanse that only genuine height and thoughtful design can deliver.",
  },
  {
    slug: "siddhivinayak-vishwa",
    name: "Siddhivinayak Vishwa",
    tagline: "Bright, contemporary living.",
    location: "Wagholi, Pune",
    type: "Modern Contemporary",
    status: "Under Development",
    statusColor: "#C9A84C",
    units: "1, 2 & 3 BHK",
    floors: 10,
    element: "Jal",
    elementSymbol: "◈",
    elementDesc: "Serenity and flow — thoughtful water planning, harvesting and calm, restorative spaces.",
    accentColor: "#60A5FA",
    gradient: "linear-gradient(160deg, #1C2B1E 0%, #1A2530 100%)",
    reraNumber: "P52100079012",
    qrImage: "/img/qr-vishwa.png",
    pdfFolder: "siddhivinayakvishwa",
    heroImages: ["/img/vishwa-1.jpeg"],
    galleryImages: ["/img/element-02.jpeg", "/img/element-05.jpeg", "/img/element-07.jpeg"],
    highlights: [
      { label: "Configuration", value: "1, 2 & 3 BHK" },
      { label: "Floors", value: "G + 10" },
      { label: "Location", value: "Wagholi, Pune" },
      { label: "Type", value: "Modern Contemporary" },
      { label: "Status", value: "Under Development" },
      { label: "Element", value: "Jal (Water)" },
    ],
    about: "Siddhivinayak Vishwa brings bright, contemporary living to Wagholi — one of Pune's fastest growing residential corridors. Timber-framed balconies and a landscaped stilt level establish a calm, restorative atmosphere from the moment you arrive. The Jal (water) element flows through the design: in the water harvesting systems, in the serene water features, and in the overall sense of ease the project delivers.",
  },
  {
    slug: "the-element",
    name: "The Element",
    tagline: "A facade with character.",
    location: "Pune",
    type: "Premium Residences",
    status: "Under Development",
    statusColor: "#5A9E6F",
    units: "2 & 3 BHK",
    floors: 8,
    element: "Vayu",
    elementSymbol: "○",
    elementDesc: "Breath and openness — cross-ventilation, generous balconies and fresh, moving air.",
    accentColor: "#7AADAA",
    gradient: "linear-gradient(160deg, #0E1E1A 0%, #1C2B1E 100%)",
    reraNumber: "P52100080123",
    qrImage: "/img/qr-element.png",
    pdfFolder: "the_elements",
    heroImages: [],
    galleryImages: ["/img/element-03.jpeg", "/img/element-08.jpeg", "/img/element-09.jpeg"],
    highlights: [
      { label: "Configuration", value: "2 & 3 BHK" },
      { label: "Floors", value: "G + 8" },
      { label: "Location", value: "Pune" },
      { label: "Type", value: "Premium Residences" },
      { label: "Status", value: "Under Development" },
      { label: "Element", value: "Vayu (Air)" },
    ],
    about: "The Element is defined by its backlit jali facade — a design language that is as functional as it is striking. The perforated screen breathes with the building, channelling cross-ventilation through every home while creating an interplay of light and shadow that changes with the day. An indoor games lounge and generous balconies reinforce the Vayu (air) philosophy: openness, movement, and fresh living.",
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}