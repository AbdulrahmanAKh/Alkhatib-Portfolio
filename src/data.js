import profileImg from './assets/profile.jpg'
import gradProjectImg from './assets/projects thumbnials/graduation_project.jpg'

// Edit everything about you here.
export const PROFILE = {
  name: 'Abdulrahman Alkhatib', initials: 'AA', avatar: profileImg, role: 'Fresh Graduate - CS', status: 'Open to work',
  email: 'aboodkhatib90@gmail.com', phone: '+966 56 750 3648', location: 'Jeddah, Saudi Arabia',
  links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdulrahman-alkhatib/' }, { label: 'GitHub', href: '#' }],
  resume: '#',
  about: [
    'I’m Abdulrahman Alkhatib, a fresh graduate computer science from Islamic University of Madinah. I enjoy building programming solutions, exploring data, and turning course material into projects I can show.',
    'I’m currently looking for work opportunity where I can help flexing my knowledge and skills and contribute into real projects.',
  ],
  glance: [['Graduated', 'December 2026'], ['Looking for', 'Work opporunity'], ['Focus', 'AI & Tech solutions'], ['Main languages', 'Python, Java, JS']],
  stats: [['4.89', 'GPA'], [6, 'Projects completed'], [15, 'Certificates']],
}

// m = "master" tag (renders a big card). img = optional thumbnail URL.
export const PROJECTS = [
  { title: 'Graduation Project Title', desc: 'Describe the problem you solved, your approach, your role, and the measurable result. This is the project to lead with.', tags: ['Python', 'Machine learning', 'SQL'], code: '#', demo: '#', img: gradProjectImg, m: 'Graduation Project' },
  { title: 'Project One', desc: 'A short sentence on what it does and why you built it.', tags: ['Python', 'Pandas'], code: '#', demo: '#' },
  { title: 'Project Two', desc: 'A course project with a clear problem and a measurable result.', tags: ['Java', 'SQL'], code: '#', demo: '#' },
  { title: 'Project Three', desc: 'A web app you designed and shipped end to end.', tags: ['JavaScript', 'HTML'], code: '#', demo: '#' },
]

export const CERTS = [
  { title: 'Bachelor’s Degree in Computer Science', issuer: 'Islamic University of Madinah', date: 'December 2026', url: '#', m: 'Bachelor’s Degree' },
  { title: 'Certificate One', issuer: 'Coursera', date: 'Mar 2025', url: '#' },
  { title: 'Certificate Two', issuer: 'Google', date: 'Aug 2025', url: '#' },
  { title: 'Certificate Three', issuer: 'Your University', date: 'Jan 2026', url: '#' },
]

export const EDUCATION = [{ title: 'B.Sc. Computer Science', org: 'Islamic University of Madinah', when: '2022 — 2026', desc: 'Relevant courses: Data Structures, Algorithms, Databases, Data Mining.' }]
export const EXPERIENCE = [{ title: 'IT Support Trainee', org: 'Mattex Group', when: 'May 2026 — Aug 2026', desc: 'Support IT infrastructure including hardware, software, and network connectivity for end-users.' }, { title: 'API Developer Intern', org: 'iSolutions', when: 'June 2026 — Aug 2026', desc: 'Develop RESTful APIs using Python and FastAPI, ensuring secure data exchange between frontend and backend systems.' }]
export const SKILLS = { Languages: ['Python', 'Java', 'JavaScript', 'SQL'], 'Tools & web': ['Git', 'HTML & CSS', 'Linux'], Concepts: ['Data structures', 'Machine learning basics'] }
