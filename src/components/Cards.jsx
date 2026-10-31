import { Image as ImageIcon, Code, ExternalLink } from 'lucide-react'

export function Thumb({ src, alt = '', className = '' }) {
  return src ? (
    <div className={`overflow-hidden rounded-xl bg-chip ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  ) : (
    <div aria-hidden className={`grid w-full place-items-center rounded-xl border border-dashed border-[#3a5258] bg-gradient-to-br from-[#25363a] to-[#18262a] text-accent ${className}`}>
      <ImageIcon size={36} strokeWidth={1.5} />
    </div>
  )
}

function Card({ item, thumbClass, children }) {
  const master = Boolean(item.m)
  return (
    <article className={`group flex gap-2.5 rounded-[18px] border bg-bg p-[22px] transition-all duration-300 hover:-translate-y-1 hover:border-accent/80 hover:shadow-[0_4px_24px_rgba(95,207,220,0.12)]
      ${master ? 'col-span-full flex-col gap-[18px] border-[#3a5258] bg-gradient-to-br from-[#1d2a2d] to-bg to-55% p-[26px] md:flex-row md:gap-[26px]' : 'flex-col border-line'}`}>
      <Thumb src={item.img} alt={item.title} className={master ? 'aspect-video md:aspect-auto md:min-h-[210px] md:w-[42%] md:flex-none' : thumbClass} />
      <div className={`flex flex-1 flex-col gap-2.5 ${master ? 'md:justify-center' : ''}`}>
        {master && <span className="self-start rounded-full border border-accent/30 bg-accent/90 px-3 py-0.5 text-[12.5px] font-semibold text-[#0d2326] shadow-sm">★ {item.m}</span>}
        {children(master)}
      </div>
    </article>
  )
}

export function ProjectCard({ p }) {
  return (
    <Card item={p} thumbClass="aspect-video">
      {(master) => (<>
        <h3 className={`font-semibold transition-colors group-hover:text-accent ${master ? 'text-[22px]' : 'text-[17px]'}`}>{p.title}</h3>
        <p className={`flex-1 text-muted ${master ? 'text-[15.5px]' : 'text-[14.5px]'} md:flex-none`}>{p.desc}</p>
        <ul className="flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="list-none rounded-lg border border-line/60 bg-chip px-3 py-0.5 text-[13px] text-zinc-300">{t}</li>)}</ul>
        <div className="mt-1 flex items-center gap-4 text-sm font-medium">
          {p.code && p.code !== '#' ? (
            <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
              <Code size={15} /> Code
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted/50 cursor-not-allowed" title="Repository is private or in progress">
              <Code size={13} /> Code
            </span>
          )}
          {p.demo && p.demo !== '#' ? (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
              <ExternalLink size={15} /> Live demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted/50 cursor-not-allowed" title="Demo in progress">
              <ExternalLink size={13} /> Demo
            </span>
          )}
        </div>
      </>)}
    </Card>
  )
}

export function CertCard({ c, onView }) {
  const master = Boolean(c.m)
  return (
    <article className={`group flex gap-2.5 rounded-[18px] border bg-bg p-[22px] transition-all duration-300 hover:-translate-y-1 hover:border-accent/80 hover:shadow-[0_4px_24px_rgba(95,207,220,0.12)]
      ${master ? 'col-span-full flex-col gap-[18px] border-[#3a5258] bg-gradient-to-br from-[#1d2a2d] to-bg to-55% p-[26px] md:flex-row md:gap-[26px]' : 'flex-col border-line'}`}>
      <div onClick={onView} className={`cursor-pointer ${master ? 'aspect-video md:aspect-auto md:min-h-[210px] md:w-[42%] md:flex-none' : 'aspect-[4/3]'}`} title="Click to view certificate">
        <Thumb src={c.img} alt={c.title} className="h-full w-full" />
      </div>
      <div className={`flex flex-1 flex-col gap-2.5 ${master ? 'md:justify-center' : ''}`}>
        {master && <span className="self-start rounded-full border border-accent/30 bg-accent/90 px-3 py-0.5 text-[12.5px] font-semibold text-[#0d2326] shadow-sm">★ {c.m}</span>}
        <h3 className={`font-semibold transition-colors group-hover:text-accent ${master ? 'text-[22px]' : 'text-[17px]'}`}>{c.title}</h3>
        <p className="flex-1 text-[14.5px] text-muted md:flex-none">Issued by {c.issuer}, {c.date}</p>
        <button type="button" onClick={onView}
          className={`rounded-xl bg-accent px-4 py-2.5 text-[14.5px] font-semibold text-[#0d2326] transition-transform hover:-translate-y-0.5 ${master ? 'self-start' : ''}`}>View certificate</button>
      </div>
    </article>
  )
}
