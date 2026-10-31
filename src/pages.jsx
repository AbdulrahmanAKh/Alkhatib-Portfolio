import { useEffect, useRef, useState } from 'react'
import { Star, FolderOpen, GraduationCap, Briefcase, Code2 } from 'lucide-react'
import { PROFILE as P, PROJECTS, CERTS, EDUCATION, EXPERIENCE, SKILLS } from './data'
import { ProjectCard, CertCard, Thumb } from './components/Cards'

const Title = ({ children }) => (
  <h1 className="mb-1 max-w-full text-[34px] font-semibold leading-tight after:mt-3 after:block after:h-1 after:w-11 after:rounded after:bg-accent after:content-[''] lg:max-w-[60%]">{children}</h1>
)
const H2 = ({ icon: Icon, children }) => (
  <h2 className="mb-[18px] mt-11 flex items-center gap-3 text-[23px] font-semibold">
    <span className="grid h-10 w-10 place-items-center rounded-[13px] border border-line bg-chip text-accent"><Icon size={20} /></span>{children}
  </h2>
)
const Grid = ({ children, className = '' }) => <div className={`grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[18px] ${className}`}>{children}</div>
const Lead = ({ children, className = '' }) => <p className={`mt-[18px] max-w-[72ch] text-zinc-300 ${className}`}>{children}</p>

function Stat({ value, label }) {
  const [n, setN] = useState(typeof value === 'number' ? 0 : value)
  useEffect(() => {
    if (typeof value !== 'number') return
    let i = 0
    const id = setInterval(() => { setN(++i); if (i >= value) clearInterval(id) }, 140)
    return () => clearInterval(id)
  }, [value])
  return (
    <div><b className="block text-[40px] font-semibold leading-tight">{typeof value === 'number' ? `+${n}` : n}</b><span className="text-sm text-muted">{label}</span></div>
  )
}

export function About() {
  return (<>
    <Title>About me</Title>
    {P.about.map((t) => <Lead key={t}>{t}</Lead>)}
    <div className="mt-[26px] grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3.5">
      {P.glance.map(([k, v]) => (
        <div key={k} className="rounded-[14px] border border-line bg-bg px-4 py-3"><small className="block text-[12.5px] leading-snug text-muted">{k}</small><b className="text-[14.5px] font-medium">{v}</b></div>
      ))}
    </div>
    <H2 icon={Star}>Highlights</H2>
    <div className="flex flex-wrap gap-x-16 gap-y-10">{P.stats.map(([v, l]) => <Stat key={l} value={v} label={l} />)}</div>
    <H2 icon={FolderOpen}>Featured projects</H2>
    <Grid>{PROJECTS.slice(0, 2).map((p) => <ProjectCard key={p.title} p={p} />)}</Grid>
  </>)
}

function Timeline({ items }) {
  return (
    <div className="ml-2 border-l border-line pl-[34px]">
      {items.map((e) => (
        <div key={e.title} className="relative mb-[30px] before:absolute before:-left-10 before:top-[9px] before:h-[11px] before:w-[11px] before:rounded-full before:bg-accent before:shadow-[0_0_0_4px_#2a4a50] before:content-['']">
          <h3 className="text-[17px] font-semibold">{e.title}</h3>
          <em className="block text-[15px] not-italic text-muted">{e.org}</em>
          <time className="mt-1.5 block text-[15px] text-accent">{e.when}</time>
          <p className="mt-1 text-[15px] text-zinc-300">{e.desc}</p>
        </div>
      ))}
    </div>
  )
}

export function Resume() {
  return (<>
    <Title>Resume</Title>
    <H2 icon={GraduationCap}>Education</H2><Timeline items={EDUCATION} />
    <H2 icon={Briefcase}>Experience</H2><Timeline items={EXPERIENCE} />
    <H2 icon={Code2}>Skills</H2>
    {Object.entries(SKILLS).map(([g, list]) => (
      <div key={g} className="mb-4"><small className="mb-2 block text-[13.5px] text-muted">{g}</small>
        <ul className="flex flex-wrap gap-2.5">{list.map((s) => <li key={s} className="list-none rounded-lg bg-chip px-4 py-[5px] text-sm">{s}</li>)}</ul></div>
    ))}
  </>)
}

export function Projects() {
  const tags = ['All', ...new Set(PROJECTS.flatMap((p) => p.tags))]
  const [cur, setCur] = useState('All')
  const shown = PROJECTS.filter((p) => cur === 'All' || p.tags.includes(cur))
  return (<>
    <Title>Projects</Title>
    <Lead>A selection of things I’ve built for courses and on my own.</Lead>
    <div role="group" aria-label="Filter projects by technology" className="mt-6 flex flex-wrap gap-2">
      {tags.map((t) => (
        <button key={t} type="button" aria-pressed={cur === t} onClick={() => setCur(t)}
          className="rounded-xl border border-line bg-chip px-4 py-[5px] text-[13.5px] font-medium aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-[#0d2326]">{t}</button>
      ))}
    </div>
    <Grid className="mt-5">{shown.map((p) => <ProjectCard key={p.title} p={p} />)}</Grid>
  </>)
}

export function Certificates() {
  const ref = useRef(null)
  const [sel, setSel] = useState(null)
  useEffect(() => { if (sel) ref.current?.showModal() }, [sel])
  return (<>
    <Title>Certificates</Title>
    <Lead>Courses and credentials I’ve completed.</Lead>
    <Grid className="mt-7">{CERTS.map((c) => <CertCard key={c.title} c={c} onView={() => setSel(c)} />)}</Grid>
    <dialog ref={ref} onClose={() => setSel(null)} onClick={(e) => e.target === ref.current && ref.current.close()} aria-labelledby="cv-title"
      className="w-[min(680px,92vw)] rounded-[20px] border border-line bg-card p-6 text-zinc-100">
      {sel && (<>
        <h3 id="cv-title" className="text-xl font-semibold">{sel.title}</h3>
        <p className="mt-1 text-muted">Issued by {sel.issuer}, {sel.date}</p>
        <Thumb src={sel.img} alt={sel.title} className="my-4 aspect-[4/3]" />
        <div className="flex flex-wrap justify-end gap-3">
          <a href={sel.url} className="rounded-xl bg-accent px-4 py-2.5 text-[14.5px] font-semibold text-[#0d2326]">Open original</a>
          <button type="button" onClick={() => ref.current.close()} className="rounded-xl border border-line bg-chip px-4 py-2.5 text-[14.5px] font-semibold">Close</button>
        </div>
      </>)}
    </dialog>
  </>)
}

const field = 'mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-[11px] text-[15px] text-zinc-100'
export function Contact() {
  const submit = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    location.href = `mailto:${P.email}?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${encodeURIComponent(`${f.message}\n\n${f.name} (${f.email})`)}`
  }
  return (<>
    <Title>Let’s connect</Title>
    <div className="mt-7 grid gap-9 md:grid-cols-2">
      <div><Lead className="mt-0">Have an opportunity or a question? Send a message and I’ll reply as soon as I can.</Lead>
        <Lead><b>Email</b><br />{P.email}</Lead></div>
      <form onSubmit={submit}>
        {[['name', 'Your name', 'text'], ['email', 'Your email', 'email']].map(([n, l, t]) => (
          <label key={n} className="mb-3.5 block text-sm text-muted">{l}<input name={n} type={t} required className={field} /></label>
        ))}
        <label className="mb-3.5 block text-sm text-muted">Message<textarea name="message" required className={`${field} min-h-[130px] resize-y`} /></label>
        <button type="submit" className="rounded-xl bg-accent px-6 py-[11px] font-semibold text-[#0d2326] hover:brightness-110">Send message</button>
      </form>
    </div>
  </>)
}
