import { useState } from 'react'
import { Mail, MapPin, Copy, Check } from 'lucide-react'
import { PROFILE as P } from '../data'

const IconBox = ({ children }) => (
  <div className="grid h-[46px] w-[46px] flex-none place-items-center rounded-[13px] border border-line bg-chip text-accent">{children}</div>
)

export default function Sidebar() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(P.email) } catch { /* clipboard may be blocked */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <aside className="rounded-3xl border border-line bg-card px-7 py-9 text-center lg:sticky lg:top-6">
      {P.avatar ? (
        <div className="mx-auto mb-5 h-[150px] w-[150px] overflow-hidden rounded-[26px] border border-line shadow-inner">
          <img
            src={P.avatar}
            alt={P.name}
            className="h-full w-full object-cover object-top"
          />
        </div>
      ) : (
        <div aria-hidden className="mx-auto mb-5 grid h-[150px] w-[150px] place-items-center rounded-[26px] bg-gradient-to-br from-[#2b3a3d] to-[#16282b] text-[44px] font-semibold text-accent">{P.initials}</div>
      )}
      <div className="mb-3.5 font-display text-[28px] font-semibold italic leading-tight">{P.name}</div>
      <span className="inline-block rounded-[10px] bg-chip px-[18px] py-1 text-[13.5px]">{P.role}</span><br />
      <span className="mt-[18px] inline-flex items-center gap-2 rounded-full border border-[#2c4636] bg-[#1c2b22] px-3.5 py-1 text-[13px] text-[#9be6b0]">
        <i className="h-2 w-2 animate-pulse rounded-full bg-green-400" />{P.status}
      </span>
      <hr className="my-7 border-line" />
      <div className="mb-5 flex items-center gap-3.5 text-left">
        <IconBox><Mail size={20} /></IconBox>
        <div className="min-w-0"><small className="block text-xs text-muted">Email</small><span className="break-all text-[14.5px]">{P.email}</span></div>
        <button type="button" onClick={copy} title="Copy email" aria-label="Copy email address"
          className="ml-auto rounded-[10px] border border-line p-[7px] text-muted transition-colors hover:border-accent hover:text-accent">
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
      <div className="mb-5 flex items-center gap-3.5 text-left">
        <IconBox><MapPin size={20} /></IconBox>
        <div><small className="block text-xs text-muted">Location</small><span className="text-[14.5px]">{P.location}</span></div>
      </div>
      <div className="mt-6 flex justify-center gap-[18px]">
        {P.links.map((l) => <a key={l.label} href={l.href} className="text-[13px] text-muted transition-colors hover:text-accent">{l.label}</a>)}
      </div>
      <div className="mt-6 flex flex-col gap-2.5">
        <a href={P.resume} className="rounded-xl bg-accent px-4 py-2.5 text-[14.5px] font-semibold text-[#0d2326] transition-transform hover:-translate-y-0.5">Download résumé</a>
        <a href="#contact" className="rounded-xl border border-line bg-chip px-4 py-2.5 text-[14.5px] font-semibold transition-transform hover:-translate-y-0.5">Get in touch</a>
      </div>
    </aside>
  )
}
