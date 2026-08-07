<template>
  <div class="space-y-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl shadow-black/40 sm:p-8">
    <header class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-fuchsia-400/75">Analytics dashboard</p>
        <h2 class="mt-2 text-3xl font-bold sm:text-4xl">Business insight stream</h2>
        <p class="mt-3 max-w-2xl text-sm text-gray-300 sm:text-base">
          Add live insights and keep a running list of the performance notes you want to track.
        </p>
      </div>
      <div class="rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-fuchsia-200">
        {{ analyticsInsights.length }} insights
      </div>
    </header>

    <section class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
      <div class="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <input
          v-model="insightDraft"
          placeholder="Add a new insight"
          class="rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400"
        />
        <button @click="addInsight" class="rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-fuchsia-400 hover:to-pink-400">
          Add insight
        </button>
      </div>
      <div class="mt-6 space-y-3">
        <article v-for="item in analyticsInsights" :key="item" class="rounded-3xl border border-gray-800 bg-slate-950/90 p-4 text-sm text-gray-200">
          {{ item }}
        </article>
      </div>
      <div v-if="!analyticsInsights.length" class="mt-4 rounded-2xl border border-dashed border-gray-700 p-4 text-sm text-gray-400">
        Add an insight to make the dashboard feel alive.
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getProjectStateStore, saveProjectStateStore } from '../projectData'

const props = defineProps({ projectId: { type: [String, Number], required: true } })
const insightDraft = ref('')
const analyticsInsights = ref([])

function persistState() {
  const stored = getProjectStateStore()
  stored[props.projectId] = {
    ...stored[props.projectId],
    demo: {
      insightDraft: insightDraft.value,
      analyticsInsights: analyticsInsights.value
    }
  }
  saveProjectStateStore(stored)
}

function hydrate() {
  const stored = getProjectStateStore()
  const current = stored[props.projectId] || {}
  const demo = current.demo || {}
  insightDraft.value = demo.insightDraft || ''
  analyticsInsights.value = demo.analyticsInsights || ['Weekly growth up 12%', 'Engagement steady across campaigns']
}

function addInsight() {
  if (!insightDraft.value) return
  analyticsInsights.value.unshift(insightDraft.value)
  insightDraft.value = ''
  persistState()
}

onMounted(() => {
  hydrate()
})
</script>
