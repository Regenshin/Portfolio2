<template>
  <div :class="rootClass">
    <nav :style="isStandalone && project ? { background: project.primaryColor } : null" class="border-b border-gray-800 bg-gray-900/90 backdrop-blur-sm">
      <div class="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <div v-if="isStandalone && project" class="flex items-center gap-4">
          <div class="text-2xl">{{ project.logo }}</div>
          <div class="flex flex-col">
            <span class="font-bold text-lg">{{ project.siteName || project.title }}</span>
            <span class="text-xs opacity-80">{{ project.description }}</span>
          </div>
        </div>
        <div v-else>
          <button @click="goBack" class="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-blue-400 hover:text-white">
            ← Back to portfolio
          </button>
        </div>

        <div class="flex items-center gap-4">
          <template v-if="isStandalone && project">
            <a @click.prevent="scrollToSection('home')" href="#" class="text-sm font-medium text-white/90">Home</a>
            <a @click.prevent="scrollToSection('about')" href="#" class="text-sm font-medium text-white/90">About</a>
            <a @click.prevent="scrollToSection('demo')" href="#" class="text-sm font-medium text-white/90">Demo</a>
          </template>
        </div>
      </div>
    </nav>

    <main v-if="project" :class="mainClass">
      <section id="home" class="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <section :class="['rounded-3xl border border-gray-800 bg-gradient-to-br', project.gradient, 'p-6 sm:p-8', isStandalone ? 'lg:px-12 lg:py-10' : '']">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">Live project workspace</p>
            <h1 class="text-3xl font-bold text-white sm:text-4xl">{{ project.title }}</h1>
            <p class="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">{{ project.overview }}</p>
          </div>
          <div class="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90">
            {{ project.liveLabel }}
          </div>
        </div>
      </section>
      </section>

      <section :class="['mt-8 grid gap-6', isStandalone ? 'lg:grid-cols-1' : 'lg:grid-cols-[1.15fr_0.85fr]']" id="demo">
        <div class="space-y-6">
          <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-6">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 class="text-xl font-semibold">Project snapshot</h2>
                <div v-if="isStandalone" class="mt-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                  Standalone demo website
                </div>
              </div>
              <button v-if="!isStandalone" @click="openStandalone" class="self-start rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 md:self-center">
                Open full-screen website
              </button>
            </div>
            <p class="mt-4 leading-relaxed text-gray-400">{{ project.demoSummary }}</p>
            <div class="mt-6 flex flex-wrap gap-2">
              <span v-for="tech in project.technologies" :key="tech" class="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-6">
            <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-6">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold">Live demo</h2>
                <div class="text-sm text-gray-400">Auto-saved live state</div>
              </div>
              <div class="mt-4">
                <component v-if="demoComponent" :is="demoComponent" :project-id="project.id" />
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Live status</h2>
              <div class="text-sm text-gray-400">{{ state.lastUpdated }}</div>
            </div>
            <div class="mt-6">
              <div class="mb-2 flex items-center justify-between text-sm text-gray-400">
                <span>Launch readiness</span>
                <span>{{ state.progress }}%</span>
              </div>
              <div class="h-2 w-full rounded-full bg-gray-800">
                <div class="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" :style="{ width: `${state.progress}%` }"></div>
              </div>
            </div>
            <div class="mt-6 space-y-3">
              <div v-for="item in state.checklist" :key="item" class="flex items-center gap-2 rounded-xl bg-gray-800/70 px-3 py-2 text-sm text-gray-300">
                <span class="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></span>
                <span>{{ item }}</span>
              </div>
            </div>
          </div>

          <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-6">
            <h2 class="text-xl font-semibold">Auto-safe state</h2>
            <p class="mt-3 text-sm leading-relaxed text-gray-400">
              Updates are persisted automatically as you type so the workspace stays current without manual saves.
            </p>
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-300">Update note</label>
              <textarea v-model="draftNote" rows="4" class="w-full resize-none rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-gray-200 focus:border-blue-400 focus:outline-none"></textarea>
            </div>
          </div>
        </div>
      </section>
      <section id="about" class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div class="rounded-2xl border border-gray-800 bg-gray-900/80 p-6">
          <h3 class="text-lg font-semibold">About {{ project.siteName || project.title }}</h3>
          <p class="mt-3 text-gray-400">{{ project.description }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getProjectById, getProjectStateStore, saveProjectStateStore } from './projectData'
import EcommerceDemo from './project-demos/EcommerceDemo.vue'
import TaskManagerDemo from './project-demos/TaskManagerDemo.vue'
import WeatherDemo from './project-demos/WeatherDemo.vue'
import BankingDemo from './project-demos/BankingDemo.vue'
import CMSDemo from './project-demos/CMSDemo.vue'
import AnalyticsDemo from './project-demos/AnalyticsDemo.vue'

const props = defineProps({
  projectId: {
    type: [String, Number, null],
    default: null
  },
  standalone: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['back'])

const draftNote = ref('')
const project = computed(() => getProjectById(props.projectId))
const state = ref({ status: 'Live', progress: 78, notes: '', checklist: [], lastUpdated: 'Just loaded' })
const isStandalone = computed(() => props.standalone)

const demoComponent = computed(() => {
  const map = {
    1: EcommerceDemo,
    2: TaskManagerDemo,
    3: WeatherDemo,
    4: BankingDemo,
    5: CMSDemo,
    6: AnalyticsDemo
  }

  return project.value ? map[project.value.id] : null
})

const rootClass = computed(() => {
  if (!isStandalone.value || !project.value) return 'min-h-screen bg-gray-950 text-white'
  return project.value.light ? 'min-h-screen bg-white text-gray-900' : 'min-h-screen bg-gray-950 text-white'
})

const mainClass = computed(() => {
  // keep containers consistent but allow text color switching
  return project.value && project.value.light ? 'container mx-auto px-4 py-10 sm:px-6 lg:px-8 text-gray-900' : 'container mx-auto px-4 py-10 sm:px-6 lg:px-8'
})

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function goBack() {
  if (isStandalone.value && typeof window !== 'undefined') {
    window.location.href = `${window.location.origin}${window.location.pathname}`
    return
  }

  emit('back')
}

function openStandalone() {
  if (!project.value || typeof window === 'undefined') return

  const url = `${window.location.origin}${window.location.pathname}#project-${project.value.id}/full`
  window.open(url, '_blank')
}

function saveState() {
  if (!project.value) return

  const nextState = {
    ...getProjectStateStore(),
    [project.value.id]: {
      status: 'Live',
      progress: Math.min(100, state.value.progress + 5),
      notes: draftNote.value || `Updated ${new Date().toLocaleString()}`,
      checklist: state.value.checklist,
      lastUpdated: `Saved ${new Date().toLocaleString()}`
    }
  }

  saveProjectStateStore(nextState)
  state.value = nextState[project.value.id]
}

watch(draftNote, () => {
  saveState()
})

</script>
