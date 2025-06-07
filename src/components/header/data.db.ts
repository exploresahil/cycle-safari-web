type NavDataType = {
  label: string;
  href?: string;
  submenu?: NavDataType[];
};

export const NavData: NavDataType[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "The Spiti Escape",
    href: "/tours/the-spiti-escape",
  },
  {
    label: "Tours",
    submenu: [
      {
        label: "The Spiti Escape",
        href: "/tours/the-spiti-escape",
      },
      {
        label: "Tour De Satpura",
        href: "/tours/the-spiti-escape",
      },
      {
        label: "Tour of Mowgliland",
        href: "/tours/tour-of-mowgliland",
        submenu: [
          {
            label: "About the tour",
            href: "/tours/the-spiti-escape/about",
          },
          {
            label: "ToM Glimpse",
            href: "/tours/the-spiti-escape/tom-glimpse",
          },
          {
            label: "Testimonials",
            href: "/tours/the-spiti-escape/testimonials",
          },
        ],
      },
      {
        label: "Tour of Greater Pench",
        href: "/tours/tour-of-greater-pench",
      },
      {
        label: "Tour of Kanha",
        href: "/tours/tour-of-kanha",
      },
      {
        label: "Past Tours",
        href: "/tours/past-tours",
        submenu: [
          {
            label: "Tour De Chhattisgarh",
            href: "/tours/tour-de-chhattisgarh",
          },
          {
            label: "Tour De Chhattisgarh Hills",
            href: "/tours/tour-de-chhattisgarh-hills",
          },
          {
            label: "Manali - Leh Expedition",
            href: "/tours/manali-leh-expedition",
          },
        ],
      },
      {
        label: "Private Tours",
        href: "https://wa.me/918275555331?text=Hi,%20I%27m%20interested%20in%20doing%20a%20Cycle%20Safaris",
      },
    ],
  },
  {
    label: "Safari",
    href: "/safari",
  },
  {
    label: "S24O",
    href: "/s24o",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "About",
    href: "/about",
  },
];
