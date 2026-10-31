import { useState } from 'react'
import { Mail, Phone, MapPin, Copy, Check } from 'lucide-react'
import { PROFILE as P } from '../data'

const IconBox = ({ children }) => (
  <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[11px] border border-line bg-chip text-accent">{children}</div>
)

export default function Sidebar() {
  const [copiedKey, setCopiedKey] = useState(null)
  const [resumeNotice, setResumeNotice] = useState(false)

  const copy = async (text, key) => {
    try { await navigator.clipboard.writeText(text) } catch { /* clipboard may be blocked */ }
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1800)
  }

  const handleResumeClick = (e) => {
    if (!P.resume || P.resume === '#') {
      e.preventDefault()
      setResumeNotice(true)
      setTimeout(() => setResumeNotice(false), 2500)
    }
  }

  return (
    <aside className="rounded-3xl border border-line bg-card px-5 py-6 text-center lg:sticky lg:top-6">
      {P.avatar ? (
        <div className="group relative mx-auto mb-3.5 h-[120px] w-[120px] overflow-hidden rounded-[22px] border border-line shadow-inner transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_20px_rgba(95,207,220,0.2)]">
          <img
            src={P.avatar}
            alt={P.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div aria-hidden className="mx-auto mb-3.5 grid h-[120px] w-[120px] place-items-center rounded-[22px] bg-gradient-to-br from-[#2b3a3d] to-[#16282b] text-[38px] font-semibold text-accent">{P.initials}</div>
      )}
      <div className="mb-2 font-display text-[23px] font-semibold italic leading-tight">{P.name}</div>
      <div className="flex flex-col items-center gap-1.5">
        <span className="inline-block rounded-lg bg-chip px-3 py-0.5 text-[12.5px] font-medium">{P.role}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2c4636] bg-[#1c2b22] px-3 py-0.5 text-[11.5px] text-[#9be6b0]">
          <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />{P.status}
        </span>
      </div>

      <hr className="my-4 border-line" />

      <div className="space-y-3 text-left">
        <div className="flex items-center gap-3">
          <IconBox><Mail size={17} /></IconBox>
          <div className="min-w-0 flex-1">
            <small className="block text-[11px] text-muted leading-tight">Email</small>
            <a href={`mailto:${P.email}`} className="block truncate text-[13.5px] hover:text-accent transition-colors" title={P.email}>
              {P.email}
            </a>
          </div>
          <div className="relative">
            <button type="button" onClick={() => copy(P.email, 'email')} title="Copy email" aria-label="Copy email address"
              className="rounded-lg border border-line p-1.5 text-muted transition-colors hover:border-accent hover:text-accent">
              {copiedKey === 'email' ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            </button>
            {copiedKey === 'email' && (
              <span className="absolute -top-7 right-0 rounded border border-line bg-chip px-1.5 py-0.5 text-[10.5px] font-medium text-accent shadow-md whitespace-nowrap animate-fade">
                Copied!
              </span>
            )}
          </div>
        </div>

        {P.phone && (
          <div className="flex items-center gap-3">
            <IconBox><Phone size={17} /></IconBox>
            <div className="min-w-0 flex-1">
              <small className="block text-[11px] text-muted leading-tight">Phone</small>
              <a href={`tel:${P.phone.replace(/\s+/g, '')}`} className="block text-[13.5px] hover:text-accent transition-colors">
                {P.phone}
              </a>
            </div>
            <div className="relative">
              <button type="button" onClick={() => copy(P.phone, 'phone')} title="Copy phone number" aria-label="Copy phone number"
                className="rounded-lg border border-line p-1.5 text-muted transition-colors hover:border-accent hover:text-accent">
                {copiedKey === 'phone' ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
              </button>
              {copiedKey === 'phone' && (
                <span className="absolute -top-7 right-0 rounded border border-line bg-chip px-1.5 py-0.5 text-[10.5px] font-medium text-accent shadow-md whitespace-nowrap animate-fade">
                  Copied!
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <IconBox><MapPin size={17} /></IconBox>
          <div className="min-w-0 flex-1">
            <small className="block text-[11px] text-muted leading-tight">Location</small>
            <span className="block text-[13.5px]">{P.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        {P.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={(e) => { if (l.href === '#') e.preventDefault() }}
            className={`text-[12.5px] transition-colors ${l.href === '#' ? 'cursor-not-allowed opacity-50' : 'text-muted hover:text-accent'}`}
            title={l.href === '#' ? 'Link coming soon' : undefined}
          >
            {l.label}
          </a>
        ))}
      </div>

      <div className="relative mt-4 flex flex-col gap-2">
        <a
          href={P.resume}
          onClick={handleResumeClick}
          className="rounded-xl bg-accent px-4 py-2 text-[14px] font-semibold text-[#0d2326] transition-transform hover:-translate-y-0.5"
        >
          Download résumé
        </a>
        {resumeNotice && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md border border-line bg-chip px-2.5 py-0.5 text-[11px] text-zinc-300 shadow-md whitespace-nowrap animate-fade">
            Résumé file coming soon
          </span>
        )}
        <a href="#contact" className="rounded-xl border border-line bg-chip px-4 py-2 text-[14px] font-semibold transition-transform hover:-translate-y-0.5">Get in touch</a>
      </div>
    </aside>
  )
}
