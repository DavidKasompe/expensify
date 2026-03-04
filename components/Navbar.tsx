export default function Navbar() {
  return (
    <nav className="bg-[#002419] px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
      <img
        src="https://d2k5nsl2zxldvw.cloudfront.net/images/brand/expensify-logo-reversed.svg"
        alt="Expensify"
        height={28}
        className="h-7 w-auto"
      />
      <button
        type="button"
        className="btn-green text-sm px-5 py-2"
      >
        Sign In
      </button>
    </nav>
  );
}
