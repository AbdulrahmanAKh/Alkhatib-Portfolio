import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { About, Resume, Projects, Certificates, Contact } from './pages'

const TABS = { about: About, resume: Resume, projects: Projects, certificates: Certificates, contact: Contact }

function useHash() {
  const read = () => { const h = location.hash.slice(1); return h in TABS ? h : 'about' }
  const [tab, setTab] = useState(read)
  useEffect(() => {
    const f = () => setTab(read())
    addEventListener('hashchange', f)
    return () => removeEventListener('hashchange', f)
  }, [])
  return tab
}

export default function App() {
  const tab = useHash()
  const Page = TABS[tab]
  return (
    <div className="mx-auto grid max-w-[1180px] gap-7 px-3.5 py-5 lg:grid-cols-[300px_1fr] lg:items-start lg:px-5 lg:py-12">
      <Sidebar />
      <main className="relative rounded-3xl border border-line bg-card px-[22px] pb-9 pt-7 lg:min-h-[640px] lg:px-10 lg:pb-12 lg:pt-9">
        <nav aria-label="Sections" className="sticky top-2 z-10 -mt-3 mb-6 flex gap-[18px] overflow-x-auto rounded-2xl border border-line bg-chip px-[18px] py-3 lg:absolute lg:right-0 lg:top-0 lg:m-0 lg:gap-[26px] lg:rounded-none lg:rounded-bl-[20px] lg:rounded-tr-3xl lg:border-0 lg:px-[26px] lg:py-3.5">
          {Object.keys(TABS).map((t) => (
            <a key={t} href={`#${t}`} aria-current={t === tab ? 'page' : undefined}
              className="py-0.5 text-[15px] font-medium capitalize transition-colors hover:text-accent aria-[current=page]:text-accent">{t}</a>
          ))}
        </nav>
        <div key={tab} className="animate-fade"><Page /></div>
      </main>
    </div>
  )
}
