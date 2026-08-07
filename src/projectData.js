import {
  ShoppingCartIcon,
  BarChart3Icon,
  GlobeIcon,
  SmartphoneIcon,
  CodeIcon,
  DatabaseIcon
} from 'lucide-vue-next'

export const STORAGE_KEY = 'devoy-portfolio-project-state'

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A polished storefront with merchandising, cart recovery, and a powerful admin dashboard.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    icon: ShoppingCartIcon,
    gradient: 'from-blue-500 via-cyan-500 to-teal-400',
    demoSummary: 'A multi-step storefront experience designed to keep shoppers engaged from discovery to checkout.',
    liveLabel: 'Live demo • customer journey + operations hub',
    overview: 'This storefront blends product discovery, conversion strategy, and operational insight into a single premium experience. The launch-ready interface gives teams a faster way to manage promotions, cart recovery, and product merchandising from one place.',
    highlights: [
      { title: 'Smart merchandising', description: 'Category pages, bundles, and promotional banners adapt instantly for seasonal campaigns.' },
      { title: 'Friction-free checkout', description: 'Saved addresses, multiple payment options, and resilient cart recovery reduce abandonment.' },
      { title: 'Operations console', description: 'Inventory oversight, shipping visibility, and sales reporting are all surfaced in one hub.' }
    ],
    stats: [
      { label: 'Conversion uplift', value: '+32%' },
      { label: 'Average order value', value: '+18%' },
      { label: 'Support tickets', value: '-41%' }
    ],
    checklist: ['Cart recovery tuned', 'Inventory sync enabled', 'Promotion banners live'],
    notes: 'The storefront is ready for another round of conversion experiments.'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative planning tool for teams that need visibility, focus, and momentum.',
    technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
    icon: BarChart3Icon,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    demoSummary: 'A real-time workspace for project tracking, deadline planning, and seamless team coordination.',
    liveLabel: 'Live demo • shared boards + instant collaboration',
    overview: 'Built for fast-moving teams, this workspace turns scattered work into a visible operating system. Boards, timelines, and shared updates keep everyone aligned without creating noise.',
    highlights: [
      { title: 'Live collaboration', description: 'Board updates and comments appear instantly across team members.' },
      { title: 'Smart planning', description: 'Recurring tasks, dependencies, and timeline views help teams stay aligned.' },
      { title: 'Team clarity', description: 'Custom workspaces and role-based permissions keep complexity organized.' }
    ],
    stats: [
      { label: 'Weekly active users', value: '12k+' },
      { label: 'Task completion', value: '+27%' },
      { label: 'Release velocity', value: '+2x' }
    ],
    checklist: ['Realtime sync enabled', 'Dependency planning added', 'Board templates ready'],
    notes: 'The shared boards are performing well and are ready for a deeper rollout.'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'An immersive forecasting experience with personalized weather insights and rich visuals.',
    technologies: ['JavaScript', 'API Integration', 'Chart.js'],
    icon: GlobeIcon,
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    demoSummary: 'A vivid weather experience that turns raw data into concise, useful decision support.',
    liveLabel: 'Live demo • insights + local forecasts',
    overview: 'This weather experience turns forecasts into a calm, readable service. Users can explore conditions at a glance, understand upcoming shifts, and plan with confidence.',
    highlights: [
      { title: 'Context-aware forecasts', description: 'Hourly and daily predictions shift beautifully based on location and time.' },
      { title: 'Visual trend analysis', description: 'Temperature, rain, and wind charts make changing conditions easy to read.' },
      { title: 'Personalized alerts', description: 'Users receive intelligent summaries for travel, commuting, and daily planning.' }
    ],
    stats: [
      { label: 'Forecast accuracy', value: '94%' },
      { label: 'Session time', value: '+38%' },
      { label: 'Daily users', value: '8.4k' }
    ],
    checklist: ['Forecast widgets live', 'Daily summaries active', 'Location card updated'],
    notes: 'The forecast cards are polished and ready to go live.'
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    description: 'A secure, reassuring finance interface focused on confidence and clarity.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    icon: SmartphoneIcon,
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    demoSummary: 'A premium mobile finance experience that balances security, usability, and trust.',
    liveLabel: 'Live demo • secure flows + instant visibility',
    overview: 'The finance experience is designed to feel reassuring rather than intimidating. Secure login flows, focused transaction views, and friendly insights all help users feel comfortable acting quickly.',
    highlights: [
      { title: 'Secure onboarding', description: 'Biometric sign-in and guided verification keep access safe and simple.' },
      { title: 'Transaction clarity', description: 'Users can review statements, recurring payments, and cards in one place.' },
      { title: 'Helpful nudges', description: 'The experience surfaces smart alerts for spending, savings, and account security.' }
    ],
    stats: [
      { label: 'Fraud protection', value: '99.98%' },
      { label: 'User trust score', value: '4.9/5' },
      { label: 'App retention', value: '+24%' }
    ],
    checklist: ['Biometric sign-in ready', 'Account overview polished', 'Security messaging updated'],
    notes: 'The banking experience is now tuned around trust and clarity.'
  },
  {
    id: 5,
    title: 'CMS Platform',
    description: 'A flexible publishing platform for content teams and fast-moving product launches.',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    icon: CodeIcon,
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    demoSummary: 'A content workspace where editors can publish, collaborate, and review with less friction.',
    liveLabel: 'Live demo • editorial workflow + publishing',
    overview: 'This content platform helps editors move faster by making collaboration visible and publishing predictable. The experience is built to support both day-to-day updates and larger launches.',
    highlights: [
      { title: 'Drag-and-drop editing', description: 'A visual editor keeps page building fast and intuitive for non-technical teams.' },
      { title: 'Approval flow', description: 'Collaborators can review drafts and publish with clear sign-off controls.' },
      { title: 'Scalable structure', description: 'Reusable templates and content blocks support rapid growth and consistent design.' }
    ],
    stats: [
      { label: 'Publishing speed', value: '3x faster' },
      { label: 'Editor adoption', value: '96%' },
      { label: 'Content errors', value: '-58%' }
    ],
    checklist: ['Approval steps wired', 'Template library ready', 'Publishing workflow tested'],
    notes: 'Editorial workflows are now more reliable and faster to manage.'
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    description: 'A high-signal business analytics experience for fast-moving teams.',
    technologies: ['React', 'D3.js', 'Node.js', 'Redis'],
    icon: DatabaseIcon,
    gradient: 'from-fuchsia-500 via-purple-500 to-indigo-500',
    demoSummary: 'A live data workspace that surfaces clear performance direction without sacrificing depth.',
    liveLabel: 'Live demo • insight panels + real-time metrics',
    overview: 'The analytics workspace is designed for operators who need a high-signal view of live performance. It blends rich data with calm interactions so decision-making stays fast and confident.',
    highlights: [
      { title: 'Real-time monitoring', description: 'Operators can watch key metrics move instantly as conditions shift.' },
      { title: 'Flexible widgets', description: 'Dashboards can be tailored to team goals, roles, and priorities.' },
      { title: 'Decision-ready views', description: 'Charts and summaries highlight what matters most without overwhelming users.' }
    ],
    stats: [
      { label: 'Query speed', value: '< 1.2s' },
      { label: 'Focus time', value: '+31%' },
      { label: 'Reporting time', value: '-45%' }
    ],
    checklist: ['Live metrics wired', 'Widget filters tuned', 'Executive summary ready'],
    notes: 'The dashboard now feels ready for a real operating room.'
  }
]

function defaultDemoForProject(id) {
  switch (Number(id)) {
    case 1:
      return {
        cartItems: [],
        checkoutDraft: { name: '', email: '', address: '' },
        orderMessage: ''
      }
    case 2:
      return {
        taskItems: [],
        taskDraft: { title: '', category: '', note: '' }
      }
    case 3:
      return {
        weatherDraft: '',
        weatherLocations: [
          { name: 'Kingston', condition: 'Sunny', temp: 31, humidity: 62, wind: 14 },
          { name: 'Montego Bay', condition: 'Cloudy', temp: 28, humidity: 77, wind: 9 }
        ]
      }
    case 4:
      return {
        transferDraft: { recipient: '', amount: '' },
        bankingBalance: 4820,
        bankingTransactions: [
          { id: 1, label: 'Salary deposit', amount: 2400 },
          { id: 2, label: 'Groceries', amount: -86 }
        ]
      }
    case 5:
      return {
        postDraft: { title: '', body: '', status: 'Draft' },
        cmsPosts: []
      }
    case 6:
      return {
        insightDraft: '',
        analyticsInsights: ['Weekly growth up 12%', 'Engagement steady across campaigns']
      }
    default:
      return {}
  }
}

function buildDefaultState() {
  return Object.fromEntries(
    projects.map((project) => [
      project.id,
      {
        status: 'Live',
        progress: 78,
        notes: project.notes,
        checklist: project.checklist,
        lastUpdated: 'Seeded in browser',
        demo: defaultDemoForProject(project.id)
      }
    ])
  )
}

export function getProjects() {
  return projects
}

export function getProjectById(id) {
  return projects.find((project) => project.id === Number(id)) || null
}

export function getProjectStateStore() {
  if (typeof window === 'undefined') {
    return buildDefaultState()
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return buildDefaultState()
    }

    const parsed = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') {
      return buildDefaultState()
    }

    return { ...buildDefaultState(), ...parsed }
  } catch (error) {
    return buildDefaultState()
  }
}

export function saveProjectStateStore(state) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
