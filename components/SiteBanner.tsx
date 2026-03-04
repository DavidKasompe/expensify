export default function SiteBanner() {
  return (
    <div className="bg-[#003D2B] text-white text-sm py-2 px-4 flex items-center justify-center gap-2 text-center flex-wrap">
      <img
        src="http://use.expensify.com/assets/img/icons/trophy-green.svg"
        height={16}
        width={16}
        alt=""
      />
      <p className="m-0">
        Expensify named a TrustRadius Buyer&apos;s Choice 2026 award winner.
      </p>
      <a
        href="https://www.businesswire.com/news/home/20251119110238/en/Expensify-Earns-2026-Buyers-Choice-Award-from-TrustRadius"
        target="_blank"
        rel="noreferrer noopener"
        className="text-[#00A86B] font-semibold hover:underline flex items-center gap-1 whitespace-nowrap"
      >
        Read more
        <img
          src="http://use.expensify.com/assets/img/icons/arrow-right-small-white.svg"
          height={10}
          alt=""
        />
      </a>
    </div>
  );
}
