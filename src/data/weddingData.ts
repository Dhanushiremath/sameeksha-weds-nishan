export type WeddingEvent = {
  id: string;
  title: string;
  time: string;
  description?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  rotation: number;
};

export type WeddingData = {
  invocation: string;
  monogram: string;
  bride: {
    displayName: string;
    formalName: string;
    parentage: string;
  };
  groom: {
    displayName: string;
    formalName: string;
    parentage: string;
  };
  date: {
    display: string;
    short: string;
    weekday: string;
    countdownTargetISO: string;
    calendarEndISO: string;
  };
  venue: {
    name: string;
    address: string;
    mapsUrl: string;
    illustration: string;
  };
  events: WeddingEvent[];
  gallery: GalleryImage[];
  hero: {
    src: string;
    alt: string;
  };
  hosts: string;
  blessing: string;
  share: {
    title: string;
    text: string;
  };
  opener: {
    cta: string;
  };
  ornaments: {
    stems: string;
    cluster: string;
    bouquet: string;
    hearts: string;
  };
  audio: {
    src: string;
  };
};

export const weddingData: WeddingData = {
  invocation: "|| Shree Kuladevatha Prasanna ||",
  monogram: "S & N",
  bride: {
    displayName: "Sameeksha",
    formalName: "Chi. Sou. Sameeksha R",
    parentage: "Daughter of Late Radhakrishna & Mrs. Vijayalakshmi, Moodbidri",
  },
  groom: {
    displayName: "Nishan",
    formalName: "Chi. Nishan R. Bangera",
    parentage: "Son of Mr. Rameshchandra & Mrs. Bharathi, Moodbidri",
  },
  date: {
    display: "Thursday, 26th November 2026",
    short: "26 November 2026",
    weekday: "Thursday",
    countdownTargetISO: "2026-11-26T11:15:00+05:30",
    calendarEndISO: "2026-11-26T14:00:00+05:30",
  },
  venue: {
    name: "Khandiga Greens Multipurpose Hall",
    address: "Beluvai",
    mapsUrl: "https://share.google/DBiXhusXTvqdmDPbq",
    illustration: "/images/venue-illustration.png",
  },
  events: [
    {
      id: "muhurtham",
      title: "Muhurtham / Ceremony",
      time: "11:15 AM",
      description: "Makara Lagna",
    },
  ],
  gallery: [
    {
      src: "/images/gallery-hero-prev.jpg",
      alt: "Sameeksha and Nishan on the steps",
      rotation: -2,
    },
    {
      src: "/images/gallery-1.jpg",
      alt: "Sameeksha and Nishan portrait",
      rotation: 1.5,
    },
    {
      src: "/images/gallery-beach.jpg",
      alt: "Sameeksha and Nishan on the beach",
      rotation: -1,
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Sameeksha and Nishan together",
      rotation: 1,
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Sameeksha and Nishan embrace",
      rotation: -1.5,
    },
  ],
  hero: {
    src: "/images/hero-vok5768.jpg",
    alt: "Sameeksha and Nishan",
  },
  hosts: "Best wishes from family and friends",
  blessing: "Blessings only",
  share: {
    title: "Sameeksha & Nishan Wedding Invitation",
    text: "You're invited to the wedding of Sameeksha & Nishan — Thursday, 26th November 2026 at Khandiga Greens Multipurpose Hall, Beluvai.",
  },
  opener: {
    cta: "Tap to Open",
  },
  ornaments: {
    stems: "/images/ornaments/rose-stems.png",
    cluster: "/images/ornaments/rose-cluster.png",
    bouquet: "/images/ornaments/rose-bouquet.png",
    hearts: "/images/ornaments/hearts.png",
  },
  audio: {
    src: "/audio/hridayam-theme.mp3",
  },
};
