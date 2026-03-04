const logos = [
  {
    src: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/logo_xero.svg',
    width: 42,
    alt: 'Xero',
  },
  {
    src: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/logo_tribeca.svg',
    width: 80,
    alt: 'Tribeca',
  },
  {
    src: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/logo_warby.svg',
    width: 145,
    alt: 'Warby Parker',
  },
  {
    src: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/logo_swatch.svg',
    width: 120,
    alt: 'Swatch',
  },
  {
    src: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/logo_pinterest.svg',
    width: 46,
    alt: 'Pinterest',
  },
  {
    src: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/logo_uk.svg',
    width: 152,
    alt: 'UK',
  },
  {
    src: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/logo_github.svg',
    width: 82,
    alt: 'GitHub',
  },
];

export default function LogoMarquee() {
  return (
    <section className="bg-[#002E22] py-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <h3 className="text-white/70 text-sm font-medium tracking-wide uppercase">
          Join 15 million+ members who trust Expensify
        </h3>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track">
          {/* First set */}
          {logos.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center px-10 opacity-60 hover:opacity-100 transition-opacity">
              <img src={logo.src} width={logo.width} alt={logo.alt} className="h-8 object-contain brightness-0 invert" />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((logo) => (
            <div key={`${logo.alt}-dup`} className="flex items-center justify-center px-10 opacity-60 hover:opacity-100 transition-opacity">
              <img src={logo.src} width={logo.width} alt="" className="h-8 object-contain brightness-0 invert" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
