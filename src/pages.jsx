import { useEffect, useRef, useState } from 'react'
import { Star, FolderOpen, GraduationCap, Briefcase, Code2, Copy, Check } from 'lucide-react'
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
  const isNum = typeof value === 'number'
  const isFloat = typeof value === 'string' && !isNaN(parseFloat(value))
  const [n, setN] = useState(() => (isNum ? 0 : isFloat ? '0.00' : value))

  useEffect(() => {
    if (isNum) {
      let i = 0
      const id = setInterval(() => { setN(++i); if (i >= value) clearInterval(id) }, 140)
      return () => clearInterval(id)
    } else if (isFloat) {
      const target = parseFloat(value)
      let cur = 0
      const step = target / 25
      const id = setInterval(() => {
        cur += step
        if (cur >= target) {
          setN(target.toFixed(2))
          clearInterval(id)
        } else {
          setN(cur.toFixed(2))
        }
      }, 40)
      return () => clearInterval(id)
    }
  }, [value, isNum, isFloat])

  const display = isNum ? `+${n}` : isFloat ? n : value
  return (
    <div className="group">
      <b className="block text-[40px] font-semibold leading-tight text-zinc-100 transition-colors group-hover:text-accent">
        {display}
      </b>
      <span className="text-sm text-muted">{label}</span>
    </div>
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
    <div className="ml-3 border-l-2 border-line/80 pl-6">
      {items.map((e) => (
        <div key={e.title} className="relative mb-[30px] before:absolute before:-left-[31px] before:top-[7px] before:h-3 before:w-3 before:rounded-full before:bg-accent before:ring-4 before:ring-[#163035] before:content-['']">
          <h3 className="text-[17px] font-semibold">{e.title}</h3>
          <em className="block text-[15px] not-italic text-muted">{e.org}</em>
          <time className="mt-1.5 block text-[14px] font-medium text-accent">{e.when}</time>
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
      className="w-[min(680px,92vw)] rounded-[20px] border border-line bg-card p-6 text-zinc-100 shadow-2xl backdrop:backdrop-blur-md">
      {sel && (<>
        <h3 id="cv-title" className="text-xl font-semibold">{sel.title}</h3>
        <p className="mt-1 text-muted">Issued by {sel.issuer}, {sel.date}</p>
        <Thumb src={sel.img} alt={sel.title} className="my-4 aspect-[4/3]" />
        <div className="flex flex-wrap justify-end gap-3">
          {sel.url && sel.url !== '#' && (
            <a href={sel.url} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-accent px-4 py-2.5 text-[14.5px] font-semibold text-[#0d2326] transition-transform hover:-translate-y-0.5">
              Open original
            </a>
          )}
          <button type="button" onClick={() => ref.current?.close()} className="rounded-xl border border-line bg-chip px-4 py-2.5 text-[14.5px] font-semibold transition-transform hover:-translate-y-0.5">
            Close
          </button>
        </div>
      </>)}
    </dialog>
  </>)
}

const field = 'mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-[11px] text-[15px] text-zinc-100 focus:border-accent transition-colors'
export function Contact() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(P.email) } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const submit = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    location.href = `mailto:${P.email}?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${encodeURIComponent(`${f.message}\n\n${f.name} (${f.email})`)}`
  }
  return (<>
    <Title>Let’s connect</Title>
    <div className="mt-7 grid gap-9 md:grid-cols-2">
      <div>
        <Lead className="mt-0">Have an opportunity, collaboration, or a question? Send a message and I’ll reply as soon as possible.</Lead>
        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-line bg-chip/50 p-4">
            <small className="block text-xs uppercase tracking-wider text-muted font-medium">Direct Email</small>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <a href={`mailto:${P.email}`} className="text-[15px] font-medium text-accent hover:underline break-all">
                {P.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-chip px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                title="Copy email address"
              >
                {copied ? <><Check size={14} className="text-emerald-400" /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
          </div>
          {P.phone && (
            <div className="rounded-2xl border border-line bg-chip/50 p-4">
              <small className="block text-xs uppercase tracking-wider text-muted font-medium">Phone</small>
              <div className="mt-1.5">
                <a href={`tel:${P.phone.replace(/\s+/g, '')}`} className="text-[15px] font-medium text-accent hover:underline">
                  {P.phone}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={submit}>
        {[['name', 'Your name', 'text'], ['email', 'Your email', 'email']].map(([n, l, t]) => (
          <label key={n} className="mb-3.5 block text-sm text-muted">{l}<input name={n} type={t} required className={field} /></label>
        ))}
        <label className="mb-3.5 block text-sm text-muted">Message<textarea name="message" required className={`${field} min-h-[130px] resize-y`} /></label>
        <button type="submit" className="rounded-xl bg-accent px-6 py-[11px] font-semibold text-[#0d2326] transition-transform hover:-translate-y-0.5 hover:brightness-105">
          Send message
        </button>
        <small className="mt-2 block text-xs text-muted/70">
          Clicking send will launch your email client with your message pre-filled.
        </small>
      </form>
    </div>
  </>)
}
