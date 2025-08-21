
<template>
 <div class="min-h-screen bg-gray-900 text-white">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            DevPortfolio
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a 
              v-for="item in navItems" 
              :key="item.id"
              @click="scrollToSection(item.id)"
              :class="['cursor-pointer transition-colors hover:text-blue-400', activeSection === item.id ? 'text-blue-400' : 'text-gray-300']"
            >
              {{ item.name }}
            </a>
          </div>
          <button 
            @click="toggleMobileMenu"
            class="md:hidden text-gray-300 hover:text-white"
          >
            <MenuIcon class="w-6 h-6" />
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 border-t border-gray-800">
          <div class="flex flex-col space-y-4 mt-4">
            <a 
              v-for="item in navItems" 
              :key="item.id"
              @click="scrollToSection(item.id); toggleMobileMenu()"
              class="cursor-pointer text-gray-300 hover:text-blue-400 transition-colors"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      <div class="container mx-auto px-6 text-center relative z-10">
        <div class="animate-fade-in-up">
          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span class="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Devoy Douglas</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Full-Stack Web Developer crafting beautiful, functional, and user-centered digital experiences
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              @click="scrollToSection('projects')"
              class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              View My Work
            </button>
            <button 
              @click="scrollToSection('contact')"
              class="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-full font-semibold transition-all"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-float"></div>
      <div class="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full animate-float-delayed"></div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-800/50">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-16">About Me</h2>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div class="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <UserIcon class="w-40 h-40 text-white" />
            </div>
          </div>
          <div>
            <p class="text-lg text-gray-300 mb-6 leading-relaxed">
              I'm a passionate web developer with {{ yearsOfExperience }}+ years of experience creating digital solutions 
              that make a difference. I specialize in modern web technologies and love turning complex problems 
              into simple, beautiful designs.
            </p>
            <p class="text-lg text-gray-300 mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
              or sharing knowledge with the developer community.
            </p>
            
            <!-- Skills -->
            <div class="grid grid-cols-2 gap-4">
              <div v-for="skill in skills" :key="skill.name" class="bg-gray-700/50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-semibold">{{ skill.name }}</span>
                  <span class="text-sm text-gray-400">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    :style="{ width: `${skill.level}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-16">Featured Projects</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
          >
            <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <component :is="project.icon" class="w-16 h-16 text-white" />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
              <p class="text-gray-400 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="bg-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4">
                <button class="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <ExternalLinkIcon class="w-4 h-4" />
                  Live Demo
                </button>
                <button class="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                  <GithubIcon class="w-4 h-4" />
                  Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-20 bg-gray-800/50">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-16">Experience</h2>
        <div class="max-w-4xl mx-auto">
          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500"></div>
            
            <div v-for="(exp, index) in experience" :key="index" class="relative flex items-start mb-12">
              <!-- Timeline dot -->
              <div class="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900"></div>
              
              <div class="ml-16 bg-gray-800 p-6 rounded-lg flex-1">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 class="text-xl font-bold">{{ exp.position }}</h3>
                  <span class="text-blue-400 font-semibold">{{ exp.period }}</span>
                </div>
                <h4 class="text-lg text-gray-300 mb-3">{{ exp.company }}</h4>
                <p class="text-gray-400 leading-relaxed">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-16">Get In Touch</h2>
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-bold mb-6">Let's work together</h3>
            <p class="text-gray-300 mb-8 leading-relaxed">
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <MailIcon class="w-6 h-6 text-blue-400" />
                <span>Devoy Douglas@developer.com</span>
              </div>
              <div class="flex items-center gap-4">
                <PhoneIcon class="w-6 h-6 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div class="flex items-center gap-4">
                <MapPinIcon class="w-6 h-6 text-blue-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            <div class="flex gap-4 mt-8">
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <GithubIcon class="w-6 h-6" />
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <LinkedinIcon class="w-6 h-6" />
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <TwitterIcon class="w-6 h-6" />
              </a>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold mb-2">Name</label>
              <input 
                v-model="form.name"
                type="text" 
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">Message</label>
              <textarea 
                v-model="form.message"
                rows="5" 
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 py-8">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-400">
          © {{ currentYear }} Devoy Douglas Developer. Built with Vue.js and ❤️
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  MenuIcon, 
  UserIcon, 
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
import "./style.css"; // Import your main CSS file

// Reactive data
const activeSection = ref('home')
const mobileMenuOpen = ref(false)
const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

// Computed properties
const currentYear = computed(() => new Date().getFullYear())
const yearsOfExperience = computed(() => new Date().getFullYear() - 2019)

// Navigation items
const navItems = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'projects', name: 'Projects' },
  { id: 'experience', name: 'Experience' },
  { id: 'contact', name: 'Contact' }
]

// Skills data
const skills = [
  { name: 'JavaScript', level: 95 },
  { name: 'Vue.js', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 82 },
  { name: 'CSS/SCSS', level: 92 }
]

// Projects data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    icon: ShoppingCartIcon
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates and team features.',
    technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
    icon: BarChart3Icon
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with location-based forecasts and interactive maps.',
    technologies: ['JavaScript', 'API Integration', 'Chart.js'],
    icon: GlobeIcon
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    description: 'Secure mobile banking interface with biometric authentication and transaction history.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    icon: SmartphoneIcon
  },
  {
    id: 5,
    title: 'CMS Platform',
    description: 'Content management system with drag-and-drop editor and multi-user support.',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    icon: CodeIcon
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    description: 'Real-time analytics platform with customizable widgets and data visualization.',
    technologies: ['React', 'D3.js', 'Node.js', 'Redis'],
    icon: DatabaseIcon
  }
]

// Experience data
const experience = [
  {
    position: 'Senior Full-Stack Developer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description: 'Lead development of scalable web applications using modern JavaScript frameworks. Mentor junior developers and architect solutions for complex business requirements.'
  },
  {
    position: 'Frontend Developer',
    company: 'Digital Solutions Co.',
    period: '2020 - 2022',
    description: 'Developed responsive web applications using React and Vue.js. Collaborated with UX/UI designers to implement pixel-perfect designs and improve user experience.'
  },
  {
    position: 'Junior Web Developer',
    company: 'StartUp Studio',
    period: '2019 - 2020',
    description: 'Built and maintained websites using HTML, CSS, and JavaScript. Gained experience in version control, testing, and agile development methodologies.'
  }
]

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Reset form
  form.value = { name: '', email: '', message: '' }
  isSubmitting.value = false
  
  alert('Message sent successfully!')
}

const handleScroll = () => {
  const sections = navItems.map(item => item.id)
  const scrollPosition = window.scrollY + 100

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

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>
