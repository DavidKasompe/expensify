const reviews = [
  {
    stars: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/stars5.svg',
    title: '"The easiest expense tool I\'ve ever used."',
    quote:
      'It is very very easy, as soon as you get a receipt you can scan it, the AI will capture all relevant information and it is very little interaction to get to the final submission of the expense. It is so easy!!!',
    avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/author_luis.png',
    name: 'Luis F.',
  },
  {
    stars: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/stars5.svg',
    title: '"Great Program!"',
    quote:
      'Expensify has a great UI interface and is very intuitive to use. I particularly like the functionality of taking a picture of a receipt and having it uploaded to my account.',
    avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/author_kristen.png',
    name: 'Kirsten H.',
  },
  {
    stars: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/stars5.svg',
    title: '"Simple, Straight-forward Expenses!"',
    quote:
      "Expensify makes the process easier by prompting you to auto-import expenses as you go, and their straight-forward, simple interface makes the task in the office easier than any system that I've used in the past.",
    avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/author_weston.png',
    name: 'Weston M.',
  },
  {
    stars: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/stars.svg',
    title: '"Makes expense submission easy!"',
    quote:
      "Expensify has a really easy user interface for uploading receipts and getting expense reports submitted in a timely manner. I'm also getting reimbursed in quick order as well.",
    avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/author_dean.png',
    name: 'Dean M.',
  },
  {
    stars: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/stars5.svg',
    title: '"Super Easy to Use"',
    quote:
      "It's quick and easy to use as a user, trying to get reimbursed and also very easy as a manager. I particularly like the ability to forward email receipts and have them auto imported into Expensify.",
    avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/author_christy.png',
    name: 'Christy H.',
  },
];

export default function Reviews() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">
          Highly rated,
          <br />
          easy to use
        </h2>

        {/* Scrollable review cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory mb-10">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 w-72 md:w-80 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <img src={r.stars} width={100} alt="5 stars" className="mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-2">{r.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-6">{r.quote}</p>
              <div className="flex items-center gap-3">
                <img
                  src={r.avatar}
                  width={36}
                  height={36}
                  alt={r.name}
                  className="rounded-full w-9 h-9 object-cover"
                />
                <span className="text-sm font-semibold text-gray-800">{r.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rating + Badges */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/logo_G2.svg"
              width={32}
              alt="G2"
            />
            <img
              src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/stars.svg"
              width={100}
              alt="stars"
            />
            <p className="text-sm text-gray-700">
              <strong>4.5</strong> (4,889 reviews)
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.g2.com/products/expensify/reviews" target="_blank" rel="noreferrer noopener">
              <img
                src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/badge_g2.svg"
                width={52}
                alt="G2 badge"
              />
            </a>
            <a href="https://www.trustradius.com/products/expensify/reviews" target="_blank" rel="noreferrer noopener">
              <img
                src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/badge_tr.svg"
                width={66}
                alt="TrustRadius badge"
              />
            </a>
            <a href="https://www.capterra.com/p/97594/Expensify/" target="_blank" rel="noreferrer noopener">
              <img
                src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/badge_capterra.svg"
                width={70}
                alt="Capterra badge"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
