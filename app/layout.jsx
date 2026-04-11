import Script from "next/script";

const stylesheets = [
  "/css/bootstrap.css",
  "/css/animate.css",
  "/css/font-awesome.css",
  "/css/furniture-icons.css",
  "/css/linear-icons.css",
  "/css/magnific-popup.css",
  "/css/owl.carousel.css",
  "/css/ion-range-slider.css",
  "/css/theme.css",
  "/css/next-override.css"
];

const legacyScriptSources = [
  "/js/jquery.min.js",
  "/js/jquery.bootstrap.js",
  "/js/jquery.magnific-popup.js",
  "/js/jquery.owl.carousel.js",
  "/js/jquery.ion.rangeSlider.js",
  "/js/jquery.isotope.pkgd.js",
  "/js/main.js"
];

export const metadata = {
  icons: {
    icon: [
      {
        url: "/assets/images/logo-idea-furniture.webp",
        type: "image/webp",
        sizes: "494x502"
      }
    ],
    shortcut: ["/assets/images/logo-idea-furniture.webp"]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="icon"
          type="image/webp"
          sizes="494x502"
          href="/assets/images/logo-idea-furniture.webp"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600&subset=latin-ext"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          rel="stylesheet"
        />
        {stylesheets.map((href) => (
          <link key={href} rel="stylesheet" media="all" href={href} />
        ))}
      </head>
      <body suppressHydrationWarning>
        {children}
        {legacyScriptSources.map((src) => (
          <Script key={src} src={src} strategy="beforeInteractive" />
        ))}
      </body>
    </html>
  );
}
