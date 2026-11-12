type Event = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: Event[] = [
  {
    title: "AWS re:Invent 2026",
    image: "/images/event1.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, Nevada",
    date: "November 30 – December 4, 2026",
    time: "9:00 AM – 6:00 PM PST",
  },
  {
    title: "FOSDEM 2027",
    image: "/images/event2.png",
    slug: "fosdem-2027",
    location: "Brussels, Belgium",
    date: "February 6–7, 2027",
    time: "9:00 AM – 6:00 PM CET",
  },
  {
    title: "CES 2027",
    image: "/images/event3.png",
    slug: "ces-2027",
    location: "Las Vegas, Nevada",
    date: "January 2027 (dates to be announced)",
    time: "Schedule to be announced",
  },
  {
    title: "React Summit 2027",
    image: "/images/event4.png",
    slug: "react-summit-2027",
    location: "Amsterdam, Netherlands",
    date: "June 2027 (dates to be announced)",
    time: "Schedule to be announced",
  },
  {
    title: "KubeCon + CloudNativeCon Europe 2027",
    image: "/images/event5.png",
    slug: "kubecon-cloudnativecon-europe-2027",
    location: "Europe (venue to be announced)",
    date: "2027 (dates to be announced)",
    time: "Schedule to be announced",
  },
  {
    title: "Google I/O",
    image: "/images/event6.png",
    slug: "google-io",
    location: "Mountain View, California",
    date: "Annual developer conference",
    time: "Schedule varies by year",
  },
];
