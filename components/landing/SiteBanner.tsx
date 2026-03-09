export default function SiteBanner() {
  return (
    <div className="bg-[#003D2B] text-white text-sm py-2 px-4 flex items-center justify-center gap-2 text-center flex-wrap">
      <span>🏗</span>
      <p className="m-0">
        Tora — Built for field finance teams managing projects across distributed locations.
      </p>
      <a
        href="#demo"
        className="text-[#00A86B] font-semibold hover:underline flex items-center gap-1 whitespace-nowrap"
      >
        Explore the demo →
      </a>
    </div>
  );
}
