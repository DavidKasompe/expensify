const caseStudies = [
  {
    logo: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/logo-accordcare.png',
    quote: 'Automated 100%',
    quoteRest: ' of NetSuite entries',
    image: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/image-accordcare.jpg',
    link: 'https://use.expensify.com/resource-center/accordcare-case-study',
  },
  {
    logo: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/logo-aviv.png',
    quote: 'Rolled out company-wide card, travel, and expense',
    quoteRest: '',
    image: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/image-aviv.jpg',
    link: 'https://use.expensify.com/resource-center/aviv-clinics-healthcare-expense-management-case-study',
  },
  {
    logo: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/logo-redmond.png',
    quote: 'Achieved 50% faster',
    quoteRest: ' client reimbursements',
    image: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/image-redmond.jpg',
    link: 'https://use.expensify.com/resource-center/casestudy/redmond-accounting',
  },
  {
    logo: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/logo-roadtrippers.png',
    quote: 'Saved 48+ hours/month',
    quoteRest: ' with SmartScan',
    image: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/image-roadtrippers.jpg',
    link: 'https://use.expensify.com/resource-center/casestudy/roadtrippers',
  },
  {
    logo: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/logo-philzcoffee.png',
    quote: 'Reduced corporate card reconciliation',
    quoteRest: ' time by 90%',
    image: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/case-studies/image-philzcoffee.jpg',
    link: 'https://use.expensify.com/resource-center/casestudy/philz',
  },
];

export default function CaseStudies() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              {/* Background image */}
              <div
                className="h-44 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${cs.image})` }}
              >
                <div className="absolute inset-0 bg-[#003D2B]/60" />
                <div className="absolute top-4 left-4">
                  <img src={cs.logo} alt="" className="h-8 object-contain brightness-0 invert" />
                </div>
              </div>
              {/* Quote */}
              <div className="p-5">
                <blockquote className="text-gray-900 font-bold text-base mb-4 leading-snug">
                  <span className="text-[#00A86B]">{cs.quote}</span>
                  {cs.quoteRest}
                </blockquote>
                <a
                  href={cs.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-block px-4 py-2 rounded-full bg-[#00A86B] text-white text-xs font-semibold hover:bg-[#009960] transition-colors"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
