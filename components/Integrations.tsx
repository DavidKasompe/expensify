export default function Integrations() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#003D2B] min-h-[240px] flex items-center">
          <img
            src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/bg_integrations--dark.png"
            alt="Integrations background"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="relative z-10 p-10 md:p-14">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">45+ Integrations</h2>
            <a
              href="https://use.expensify.com/all-integrations"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 btn-green px-6 py-3 text-sm rounded-full"
            >
              See All Integrations
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
