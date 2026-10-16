// The signature spinner + Anton title used at the top of every section.

export const Spinner = ({ className = 'h-9 w-9 md:h-11 md:w-11', duration = '6s' }) => (
  <div className={`relative shrink-0 animate-spin ${className}`} style={{ animationDuration: duration }} aria-hidden="true">
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <span
        key={angle}
        className="absolute left-1/2 top-1/2 h-[42%] w-[16%] rounded-full bg-neon"
        style={{
          transform: `translate(-50%, -100%) rotate(${angle}deg)`,
          transformOrigin: '50% 100%',
          opacity: 0.4 + (angle / 300) * 0.6,
        }}
      />
    ))}
  </div>
)

const SectionHeading = ({ index, title, kicker, aside, as: Tag = 'h2' }) => (
  <div className="mb-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 md:mb-16">
    <div>
      {(index || kicker) && (
        <p data-reveal="fade" className="eyebrow mb-4 flex items-center gap-3">
          {index && <span className="text-neon">{index}</span>}
          {index && kicker && <span className="h-px w-8 bg-white/20" />}
          {kicker}
        </p>
      )}
      <div className="flex items-center gap-4">
        <span data-reveal="fade">
          <Spinner />
        </span>
        <Tag
          data-split="chars"
          className="font-anton text-[clamp(2.5rem,6.5vw,4.75rem)] uppercase leading-[0.95] tracking-tight text-white"
        >
          {title}
        </Tag>
      </div>
    </div>
    {aside && (
      <div data-reveal="fade" className="max-w-sm text-[15px] leading-relaxed text-muted">
        {aside}
      </div>
    )}
  </div>
)

export default SectionHeading
