import { site } from '../data/site'

// Vertical email rail on the left edge — desktop only (on phones the email lives in the menu and contact section).
const Emailbar = () => (
  <div className="pointer-events-none fixed bottom-0 left-5 z-40 hidden flex-col items-center gap-5 md:flex xl:left-8">
    <a
      href={`mailto:${site.email}`}
      style={{ writingMode: 'vertical-rl' }}
      className="pointer-events-auto font-anton text-[13px] tracking-[0.18em] text-neutral-500 transition-colors duration-300 hover:text-neon"
    >
      {site.email}
    </a>
    <span className="h-24 w-px bg-gradient-to-b from-neutral-600 to-transparent" />
  </div>
)

export default Emailbar
