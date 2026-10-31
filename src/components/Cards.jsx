import { Image as ImageIcon } from 'lucide-react'

export function Thumb({ src, alt = '', className = '' }) {
  return src
    ? <img src={src} alt={alt} className={`w-full rounded-xl object-cover ${className}`} />
    : <div aria-hidden className={`grid w-full place-items-center rounded-xl border border-dashed border-[#3a5258] bg-gradient-to-br from-[#25363a] to-[#18262a] text-accent ${className}`}><ImageIcon size={36} strokeWidth={1.5} /></div>
}

function Card({ item, thumbClass, children }) {
  const master = Boolean(item.m)
  return (
    <article className={`flex gap-2.5 rounded-[18px] border bg-bg p-[22px] transition duration-200 hover:-translate-y-1 hover:border-accent
      ${master ? 'col-span-full flex-col gap-[18px] border-[#3a5258] bg-gradient-to-br from-[#1d2a2d] to-bg to-55% p-[26px] md:flex-row md:gap-[26px]' : 'flex-col border-line'}`}>
      <Thumb src={item.img} alt={item.title} className={master ? 'aspect-video md:aspect-auto md:min-h-[210px] md:w-[42%] md:flex-none' : thumbClass} />
      <div className={`flex flex-1 flex-col gap-2.5 ${master ? 'md:justify-center' : ''}`}>
        {master && <span className="self-start rounded-full bg-accent px-3 py-0.5 text-[12.5px] font-semibold text-[#0d2326]">★ {item.m}</span>}
        {children(master)}
      </div>
    </article>
  )
}

export function ProjectCard({ p }) {
  return (
    <Card item={p} thumbClass="aspect-video">
      {(master) => (<>
        <h3 className={`font-semibold ${master ? 'text-[22px]' : 'text-[17px]'}`}>{p.title}</h3>
        <p className={`flex-1 text-muted ${master ? 'text-[15.5px]' : 'text-[14.5px]'} md:flex-none`}>{p.desc}</p>
        <ul className="flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="list-none rounded-lg bg-chip px-3 py-0.5 text-[13px]">{t}</li>)}</ul>
        <div className="flex gap-[18px] text-sm font-medium text-accent"><a href={p.code}>Code</a><a href={p.demo}>Live demo</a></div>
      </>)}
    </Card>
  )
}

export function CertCard({ c, onView }) {
  return (
    <Card item={c} thumbClass="aspect-[4/3]">
      {(master) => (<>
        <h3 className={`font-semibold ${master ? 'text-[22px]' : 'text-[17px]'}`}>{c.title}</h3>
        <p className="flex-1 text-[14.5px] text-muted md:flex-none">Issued by {c.issuer}, {c.date}</p>
        <button type="button" onClick={onView}
          className={`rounded-xl bg-accent px-4 py-2.5 text-[14.5px] font-semibold text-[#0d2326] transition-transform hover:-translate-y-0.5 ${master ? 'self-start' : ''}`}>View certificate</button>
      </>)}
    </Card>
  )
}
