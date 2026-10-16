import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { TLink } from './TransitionLink'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[14px] font-semibold tracking-wide transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.97]'

const variants = {
  primary: 'bg-neon text-[#0a0a0a] hover:bg-white',
  ghost: 'border border-white/15 bg-white/[0.04] text-white backdrop-blur-md hover:border-neon hover:text-neon',
}

/** Internal (page transition) or external link styled as a button. */
export const ButtonLink = ({ to, href, variant = 'primary', icon = 'arrow', children, className = '', ...rest }) => {
  const Icon = icon === 'external' ? ArrowUpRight : ArrowRight
  const content = (
    <>
      {children}
      {icon && (
        <Icon
          className={`h-4 w-4 transition-transform duration-300 ${
            icon === 'external' ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5' : 'group-hover:translate-x-1'
          }`}
        />
      )}
    </>
  )
  const cls = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <TLink to={to} className={cls} {...rest}>
        {content}
      </TLink>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
      {content}
    </a>
  )
}
