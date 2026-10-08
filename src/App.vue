
<template>
  <div v-if="activeView === 'project' && currentProjectId !== null" class="min-h-screen bg-gray-900 text-white">
    <ProjectPage :project-id="currentProjectId" :standalone="isStandaloneView" @back="closeProject" />
  </div>

  <div v-else class="portfolio-shell min-h-screen">
    <nav class="site-nav fixed top-0 z-50 w-full border-b backdrop-blur-sm">
      <div class="container mx-auto px-4 py-4 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="nav-name text-lg font-bold sm:text-2xl">
            DD<span class="nav-mark">.</span>
          </div>
          <div class="hidden items-center space-x-8 md:flex">
            <a
              v-for="item in navItems"
              :key="item.id"
              @click="scrollToSection(item.id)"
              :class="['cursor-pointer transition-colors', activeSection === item.id ? 'is-active' : '']"
            >
              {{ item.name }}
            </a>
          </div>
          <button @click="toggleMobileMenu" class="menu-toggle md:hidden" aria-label="Toggle navigation">
            <MenuIcon class="h-6 w-6" />
          </button>
        </div>

        <transition name="slide-down">
          <div v-if="mobileMenuOpen" class="mobile-nav mt-4 overflow-hidden border-t pb-4 md:hidden">
            <div class="mt-4 flex flex-col space-y-4">
              <a
                v-for="item in navItems"
                :key="item.id"
                @click="scrollToSection(item.id); toggleMobileMenu()"
                class="cursor-pointer transition-colors"
              >
                {{ item.name }}
              </a>
            </div>
          </div>
        </transition>
      </div>
    </nav>

    <section id="home" class="hero-section relative flex min-h-screen items-center overflow-hidden">
      <div class="hero-grid absolute inset-0" aria-hidden="true"></div>
      <div class="hero-orbit orbit-one" aria-hidden="true"></div>
      <div class="hero-orbit orbit-two" aria-hidden="true"></div>
      <div class="hero-layout container relative z-10 mx-auto px-4 sm:px-6">
        <div class="hero-copy animate-fade-in-up reveal-on-scroll">
          <p class="eyebrow"><span class="availability-dot"></span> Available for select projects</p>
          <p class="hero-kicker">Independent developer <span>·</span> Jamaica</p>
          <h1>
            I make digital<br />
            things <span class="hero-highlight">feel alive.</span>
          </h1>
          <p class="hero-description">
            Hey, I'm Devoy Douglas. I design and build thoughtful web experiences where bold ideas meet useful details.
          </p>
          <div class="hero-actions flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              @click="scrollToSection('projects')"
              class="button-primary w-full px-5 py-3 text-sm font-semibold transition-all duration-300 sm:w-auto sm:text-base"
            >
              Explore selected work <span aria-hidden="true">↗</span>
            </button>
            <button
              @click="scrollToSection('contact')"
              class="button-secondary w-full px-5 py-3 text-sm font-semibold transition-all duration-300 sm:w-auto sm:text-base"
            >
              Say hello
            </button>
          </div>
          <div class="hero-footnote"><span>01 / 05</span><span>Scroll to explore</span><span class="footnote-line"></span></div>
        </div>
        <div class="hero-portrait-wrap reveal-on-scroll">
          <div class="portrait-sticker sticker-top">Curious<br />by nature <span>✳</span></div>
          <div class="portrait-frame"><img :src="Img" alt="Devoy Douglas in his graduation gown" /></div>
          <div class="portrait-sun" aria-hidden="true"></div>
          <div class="portrait-caption"><span>DEVoy DOUGLAS</span><span>BUILDING WHAT'S NEXT</span></div>
          <div class="portrait-sticker sticker-bottom">Code with<br />character <span>↗</span></div>
        </div>
      </div>
    </section>

    <section id="about" class="about-section py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="section-heading mb-12 sm:mb-16"><p class="section-index">01 — A LITTLE ABOUT ME</p><h2>Good work starts<br />with <span>good questions.</span></h2></div>
        <div class="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div class="about-image-column reveal-on-scroll">
            <div class="about-photo-shell mx-auto flex h-64 w-64 items-center justify-center p-2 sm:h-80 sm:w-80">
              <img class="h-full w-full object-cover" :src="Img2" alt="Devoy Douglas at work" />
            </div>
            <p class="image-note">Based in Mandeville, Jamaica <span>18.04° N / 77.50° W</span></p>
          </div>
          <div class="reveal-on-scroll">
            <p class="about-lead mb-6 text-base leading-relaxed sm:text-lg">
              I'm a passionate web developer with {{ yearsOfExperience }}+ years of experience creating digital solutions that move businesses forward. I combine product thinking with modern engineering to ship experiences that feel effortless and impactful.
            </p>
            <p class="about-copy mb-8 text-base leading-relaxed sm:text-lg">
              From responsive interfaces to backend systems and data-rich dashboards, I enjoy turning complex problems into clear, intuitive products.
            </p>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div v-for="skill in skills" :key="skill.name" class="skill-item p-4">
                <div class="mb-2 flex items-center justify-between">
                  <span class="font-semibold">{{ skill.name }}</span>
                  <span class="text-sm text-gray-400">{{ skill.level }}%</span>
                </div>
                <div class="h-2 w-full rounded-full bg-gray-600">
                  <div
                    class="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000"
                    :style="{ width: `${skill.level}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="projects-section py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="section-heading section-heading-row mb-12 sm:mb-16"><div><p class="section-index">02 — SELECTED WORK</p><h2>Made to make<br /><span>a difference.</span></h2></div><p class="section-aside">A few useful things, carefully made.<br />Choose one to take a closer look.</p></div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="project in projects"
            :key="project.id"
            class="project-card group reveal-on-scroll overflow-hidden transition-all duration-300 hover:-translate-y-2"
          >
            <div :class="['flex h-48 items-center justify-between bg-gradient-to-br', project.gradient, 'p-6']">
              <component :is="project.icon" class="h-16 w-16 text-white" />
              <div class="project-number">
                0{{ project.id }} <span>↗</span>
              </div>
            </div>
            <div class="p-5 sm:p-6">
              <h3 class="mb-2 text-lg font-bold sm:text-xl">
                <a
                  :href="`#project-${project.id}`"
                  class="project-card-title-link"
                  :aria-label="`Open ${project.title} project`"
                  @click.prevent="openProject(project)"
                >{{ project.title }}</a>
              </h3>
              <p class="mb-4 text-sm leading-relaxed text-gray-400">{{ project.description }}</p>
              <div class="mb-4 flex flex-wrap gap-2">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="tech-tag px-2 py-1 text-xs"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="project-card-actions relative z-10 flex flex-wrap gap-4">
                <button @click="openProject(project)" class="flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300">
                  <ExternalLinkIcon class="h-4 w-4" />
                  Live Demo
                </button>
                <button @click="openStandaloneProject(project)" class="flex items-center gap-2 text-emerald-400 transition-colors hover:text-emerald-300">
                  <GlobeIcon class="h-4 w-4" />
                  Open website
                </button>
                <button class="flex items-center gap-2 text-gray-400 transition-colors hover:text-gray-300">
                  <GithubIcon class="h-4 w-4" />
                  Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="experience" class="experience-section py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="section-heading mb-12 sm:mb-16"><p class="section-index">03 — THE PATH SO FAR</p><h2>Learning by <span>making.</span></h2></div>
        <div class="mx-auto max-w-4xl">
          <div class="relative">
            <div class="absolute bottom-0 left-4 top-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 sm:left-8"></div>

            <div v-for="(exp, index) in experience" :key="index" class="relative mb-8 flex items-start sm:mb-12">
              <div class="absolute left-2 h-4 w-4 rounded-full border-4 border-gray-900 bg-blue-500 sm:left-6"></div>

              <div class="ml-8 flex-1 rounded-lg bg-gray-800 p-4 sm:ml-16 sm:p-6">
                <div class="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <h3 class="text-lg font-bold sm:text-xl">{{ exp.position }}</h3>
                  <span class="font-semibold text-blue-400">{{ exp.period }}</span>
                </div>
                <h4 class="mb-3 text-base text-gray-300 sm:text-lg">{{ exp.company }}</h4>
                <p class="leading-relaxed text-sm text-gray-400 sm:text-base">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-section py-20">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="section-heading mb-12 sm:mb-16"><p class="section-index">04 — YOUR TURN</p><h2>Have a good one<br /><span>in mind?</span></h2></div>
        <div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:gap-12">
          <div class="reveal-on-scroll">
            <h3 class="mb-6 text-xl font-bold sm:text-2xl">Let's work together</h3>
            <p class="mb-8 leading-relaxed text-gray-300">
              I'm always excited to collaborate on ambitious ideas, product launches, or polished user experiences. Reach out and we'll shape something meaningful.
            </p>

            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <MailIcon class="mt-1 h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
                <span class="break-all text-sm sm:text-base">devoydouglas@gmail.com</span>
              </div>
              <div class="flex items-start gap-4">
                <PhoneIcon class="mt-1 h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
                <span class="text-sm sm:text-base">+1 876 299 8960</span>
              </div>
              <div class="flex items-start gap-4">
                <MapPinIcon class="mt-1 h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
                <span class="text-sm sm:text-base">Mandeville, Manchester, Jamaica</span>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a href="#" class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-blue-500">
                <GithubIcon class="h-6 w-6" />
              </a>
              <a href="#" class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-blue-500">
                <LinkedinIcon class="h-6 w-6" />
              </a>
              <a href="#" class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-blue-500">
                <TwitterIcon class="h-6 w-6" />
              </a>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="space-y-6 reveal-on-scroll">
            <div>
              <label for="contact-name" class="mb-2 block text-sm font-semibold">Name</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 transition-colors focus:border-blue-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label for="contact-email" class="mb-2 block text-sm font-semibold">Email</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 transition-colors focus:border-blue-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label for="contact-message" class="mb-2 block text-sm font-semibold">Message</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                class="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 transition-colors focus:border-blue-400 focus:outline-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send Message
            </button>
            <p v-if="formStatus" class="message-status" role="status">
              {{ formStatus }}
              <a :href="mailtoHref">Open your email draft</a>
            </p>
          </form>
        </div>
      </div>
    </section>

    <footer class="site-footer py-8">
      <div class="container mx-auto px-4 text-center sm:px-6">
        <p class="text-gray-400">
          © {{ currentYear }} Devoy Douglas. Built with Vue.js and Tailwind CSS.
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import ProjectPage from './ProjectPage.vue'
import {
  MenuIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CodeIcon,
  DatabaseIcon,
  SmartphoneIcon,
  GlobeIcon,
  ShoppingCartIcon,
  BarChart3Icon
} from 'lucide-vue-next'
import Img from './assets/img/me.png'
import Img2 from './assets/img/me-side.png'

const activeSection = ref('home')
const mobileMenuOpen = ref(false)
const revealObserver = ref(null)
const activeView = ref('home')
const currentProjectId = ref(null)
const isStandaloneView = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})
const formStatus = ref('')
const mailtoHref = computed(() => {
  const subject = `Portfolio message from ${form.value.name.trim() || 'a visitor'}`
  const body = [
    `Name: ${form.value.name.trim()}`,
    `Email: ${form.value.email.trim()}`,
    '',
    form.value.message.trim()
  ].join('\n')

  return `mailto:devoydouglas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

const currentYear = computed(() => new Date().getFullYear())
const yearsOfExperience = computed(() => new Date().getFullYear() - 2019)

const navItems = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'projects', name: 'Projects' },
  { id: 'experience', name: 'Experience' },
  { id: 'contact', name: 'Contact' }
]

const skills = [
  { name: 'JavaScript', level: 95 },
  { name: 'Vue.js', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 82 },
  { name: 'CSS/SCSS', level: 92 }
]

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    siteName: 'Aurora Shop',
    logo: '🛒',
    primaryColor: '#0ea5a4',
    light: false,
    description: 'A polished storefront with merchandising, cart recovery, and a powerful admin dashboard.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    icon: ShoppingCartIcon,
    gradient: 'from-blue-500 via-cyan-500 to-teal-400',
    demoSummary: 'A multi-step storefront experience designed to keep shoppers engaged from discovery to checkout.',
    liveLabel: 'Live demo • customer journey + operations hub',
    features: [
      { title: 'Responsive merchandising', description: 'Flexible category pages, promotional banners, and tailored product discovery.' },
      { title: 'Smart checkout', description: 'One-click payment flow, saved addresses, and resilient cart recovery.' },
      { title: 'Admin insights', description: 'Inventory controls, sales reporting, and shipping automation in one console.' }
    ],
    metrics: [
      { label: 'Conversion uplift', value: '+32%' },
      { label: 'Average order value', value: '+18%' },
      { label: 'Support tickets', value: '-41%' }
    ],
    process: [
      'Mapped user journeys for shoppers, admins, and support teams.',
      'Built modular UI components with reusable state and animations.',
      'Connected secure payments, inventory sync, and reporting dashboards.'
    ],
    impact: 'The experience balances conversion-focused design with operational clarity, giving the business a storefront that feels premium while remaining easy to manage.'
  },
  {
    id: 2,
    title: 'Task Management App',
    siteName: 'Momentum Boards',
    logo: '📋',
    primaryColor: '#7c3aed',
    light: true,
    description: 'A collaborative planning tool for teams that need visibility, focus, and momentum.',
    technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
    icon: BarChart3Icon,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    demoSummary: 'A real-time workspace for project tracking, deadline planning, and seamless team coordination.',
    liveLabel: 'Live demo • shared boards + instant collaboration',
    features: [
      { title: 'Live collaboration', description: 'Board updates and comments appear instantly across team members.' },
      { title: 'Smart planning', description: 'Recurring tasks, dependencies, and timeline views help teams stay aligned.' },
      { title: 'Team clarity', description: 'Custom workspaces and role-based permissions keep complexity organized.' }
    ],
    metrics: [
      { label: 'Weekly active users', value: '12k+' },
      { label: 'Task completion', value: '+27%' },
      { label: 'Release velocity', value: '+2x' }
    ],
    process: [
      'Designed a board-first experience for fast task capture and prioritization.',
      'Implemented live sync and optimistic updates for collaborative editing.',
      'Optimized workflows for planning, reporting, and stakeholder transparency.'
    ],
    impact: 'The platform turns scattered work into a calm, visible operating system that makes progress easy to follow and action easy to take.'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    siteName: 'Island Weather',
    logo: '🌤️',
    primaryColor: '#0284c7',
    light: false,
    description: 'An immersive forecasting experience with personalized weather insights and rich visuals.',
    technologies: ['JavaScript', 'API Integration', 'Chart.js'],
    icon: GlobeIcon,
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    demoSummary: 'A vivid weather experience that turns raw data into concise, useful decision support.',
    liveLabel: 'Live demo • insights + local forecasts',
    features: [
      { title: 'Context-aware forecasts', description: 'Hourly and daily predictions shift beautifully based on location and time.' },
      { title: 'Visual trend analysis', description: 'Temperature, rain, and wind charts make changing conditions easy to read.' },
      { title: 'Personalized alerts', description: 'Users receive intelligent summaries for travel, commuting, and daily planning.' }
    ],
    metrics: [
      { label: 'Forecast accuracy', value: '94%' },
      { label: 'Session time', value: '+38%' },
      { label: 'Daily users', value: '8.4k' }
    ],
    process: [
      'Combined weather APIs with rich UI states for fast and resilient loading.',
      'Designed motion and color systems that support reading at a glance.',
      'Added filtered views for travel, commute, and weekend planning.'
    ],
    impact: 'The result is a data-rich but approachable experience that helps people make decisions faster without feeling overwhelmed.'
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    siteName: 'Verdant Bank',
    logo: '🏦',
    primaryColor: '#10b981',
    light: true,
    description: 'A secure, reassuring finance interface focused on confidence and clarity.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    icon: SmartphoneIcon,
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    demoSummary: 'A premium mobile finance experience that balances security, usability, and trust.',
    liveLabel: 'Live demo • secure flows + instant visibility',
    features: [
      { title: 'Secure onboarding', description: 'Biometric sign-in and guided verification keep access safe and simple.' },
      { title: 'Transaction clarity', description: 'Users can review statements, recurring payments, and cards in one place.' },
      { title: 'Helpful nudges', description: 'The experience surfaces smart alerts for spending, savings, and account security.' }
    ],
    metrics: [
      { label: 'Fraud protection', value: '99.98%' },
      { label: 'User trust score', value: '4.9/5' },
      { label: 'App retention', value: '+24%' }
    ],
    process: [
      'Structured the flow around confidence, reducing friction at critical moments.',
      'Drafted interaction states for verification, transfers, and account insights.',
      'Built a consistent visual language that feels secure and approachable.'
    ],
    impact: 'The experience brings calm to everyday money management and turns sensitive flows into something users feel good about using.'
  },
  {
    id: 5,
    title: 'CMS Platform',
    siteName: 'Publishly',
    logo: '✍️',
    primaryColor: '#f59e0b',
    light: false,
    description: 'A flexible publishing platform for content teams and fast-moving product launches.',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    icon: CodeIcon,
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    demoSummary: 'A content workspace where editors can publish, collaborate, and review with less friction.',
    liveLabel: 'Live demo • editorial workflow + publishing',
    features: [
      { title: 'Drag-and-drop editing', description: 'A visual editor keeps page building fast and intuitive for non-technical teams.' },
      { title: 'Approval flow', description: 'Collaborators can review drafts and publish with clear sign-off controls.' },
      { title: 'Scalable structure', description: 'Reusable templates and content blocks support rapid growth and consistent design.' }
    ],
    metrics: [
      { label: 'Publishing speed', value: '3x faster' },
      { label: 'Editor adoption', value: '96%' },
      { label: 'Content errors', value: '-58%' }
    ],
    process: [
      'Mapped the editorial workflow from draft to publish and roll out.',
      'Introduced reusable layouts and content modules to reduce effort.',
      'Connected the app with permission controls and review states for teams.'
    ],
    impact: 'The platform helps content teams publish with confidence while creating a more consistent experience for every audience.'
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    siteName: 'Signal Lens',
    logo: '📊',
    primaryColor: '#8b5cf6',
    light: true,
    description: 'A high-signal business analytics experience for fast-moving teams.',
    technologies: ['React', 'D3.js', 'Node.js', 'Redis'],
    icon: DatabaseIcon,
    gradient: 'from-fuchsia-500 via-purple-500 to-indigo-500',
    demoSummary: 'A live data workspace that surfaces clear performance direction without sacrificing depth.',
    liveLabel: 'Live demo • insight panels + real-time metrics',
    features: [
      { title: 'Real-time monitoring', description: 'Operators can watch key metrics move instantly as conditions shift.' },
      { title: 'Flexible widgets', description: 'Dashboards can be tailored to team goals, roles, and priorities.' },
      { title: 'Decision-ready views', description: 'Charts and summaries highlight what matters most without overwhelming users.' }
    ],
    metrics: [
      { label: 'Query speed', value: '< 1.2s' },
      { label: 'Focus time', value: '+31%' },
      { label: 'Reporting time', value: '-45%' }
    ],
    process: [
      'Prioritized clarity and quick interpretation over dense data dumps.',
      'Built interactive cards and filters for sectional analysis.',
      'Connected streaming data and dashboard state without sacrificing performance.'
    ],
    impact: 'The experience turns complex metrics into a calm operational dashboard that helps teams act decisively and quickly.'
  }
]

const experience = [
  {
    position: 'Junior Developer',
    company: 'StartUp Studio',
    period: '2019 - Present',
    description: 'Built and maintained websites using HTML, CSS, and JavaScript. Gained strong fundamentals in version control, testing, and agile delivery while growing into more advanced front-end and full-stack work.'
  }
]

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function scrollToSection(id) {
  const section = document.getElementById(id)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = id
    mobileMenuOpen.value = false
  }
}

function openProject(project) {
  currentProjectId.value = project.id
  activeView.value = 'project'
  updateLocationHash(project.id)
}

function openStandaloneProject(project) {
  if (typeof window === 'undefined') return

  const url = `${window.location.origin}${window.location.pathname}#project-${project.id}/full`
  window.open(url, '_blank')
}

function closeProject() {
  currentProjectId.value = null
  activeView.value = 'home'
  isStandaloneView.value = false
  updateLocationHash()
}

function updateLocationHash(projectId = null, standalone = false) {
  if (typeof window === 'undefined') return

  const hash = projectId ? `#project-${projectId}${standalone ? '/full' : ''}` : ''
  window.history.replaceState(null, '', `${window.location.pathname}${hash}`)
  isStandaloneView.value = standalone
}

function syncViewFromHash() {
  if (typeof window === 'undefined') return

  const match = window.location.hash.match(/^#project-(\d+)(?:\/(full|standalone))?$/)
  if (match) {
    currentProjectId.value = Number(match[1])
    activeView.value = 'project'
    isStandaloneView.value = Boolean(match[2])
    return
  }

  currentProjectId.value = null
  activeView.value = 'home'
  isStandaloneView.value = false
}

function handleScroll() {
  const sections = navItems.map((item) => item.id)
  const scrollPosition = window.scrollY + 120

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = sectionId
        break
      }
    }
  }
}

function observeRevealElements() {
  revealObserver.value?.disconnect()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.16 }
  )

  document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element))
  revealObserver.value = observer
}

function submitForm() {
  formStatus.value = 'Your email app should open with the message ready to send.'
  window.location.href = mailtoHref.value
}

onMounted(() => {
  syncViewFromHash()
  observeRevealElements()
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

watch(activeView, async (view) => {
  if (view !== 'home') return

  await nextTick()
  observeRevealElements()
  handleScroll()
})

onUnmounted(() => {
  revealObserver.value?.disconnect()
  window.removeEventListener('scroll', handleScroll)
})
</script>
