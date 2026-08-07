<template>
  <div class="space-y-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl shadow-black/40 sm:p-8">
    <header class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-violet-400/75">Task manager</p>
        <h2 class="mt-2 text-3xl font-bold sm:text-4xl">Daily reminders & focus list</h2>
        <p class="mt-3 max-w-2xl text-sm text-gray-300 sm:text-base">
          Add quick reminders, mark tasks complete, and keep your daily plan saved in the browser.
        </p>
      </div>
      <div class="rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-violet-200">
        {{ remainingTasks }} open reminders
      </div>
    </header>

    <section class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
        <form @submit.prevent="addTask" class="space-y-4">
          <div class="grid gap-3 sm:grid-cols-[1fr_0.8fr]">
            <input v-model="taskDraft.title" placeholder="Reminder title" class="rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400" />
            <input v-model="taskDraft.category" placeholder="Category" class="rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400" />
          </div>
          <textarea v-model="taskDraft.note" rows="3" placeholder="Add a note" class="w-full rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"></textarea>
          <button class="inline-flex w-full items-center justify-center rounded-full bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
            Add reminder
          </button>
        </form>
      </div>

      <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">Your reminders</h3>
          <button @click="clearCompleted" class="text-sm text-gray-400 transition hover:text-white">Clear done</button>
        </div>
        <div class="mt-4 space-y-3">
          <div v-for="task in taskItems" :key="task.id" class="rounded-2xl border border-gray-800 bg-slate-950/90 p-4">
            <label class="flex items-start justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <input type="checkbox" v-model="task.done" @change="persistState" class="h-5 w-5 rounded border-gray-600 bg-slate-900" />
                  <p :class="task.done ? 'text-gray-400 line-through' : 'text-white'" class="font-semibold">{{ task.title }}</p>
                </div>
                <p class="mt-2 text-sm text-gray-400">{{ task.category }} · {{ task.note }}</p>
              </div>
              <button @click.prevent="removeTask(task.id)" class="text-sm text-red-400 transition hover:text-red-300">Remove</button>
            </label>
          </div>
        </div>
        <div v-if="!taskItems.length" class="mt-4 rounded-2xl border border-dashed border-gray-700 p-4 text-sm text-gray-400">
          Create a reminder and it will stay here in your browser.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getProjectStateStore, saveProjectStateStore } from '../projectData'

const props = defineProps({ projectId: { type: [String, Number], required: true } })
const taskDraft = ref({ title: '', category: '', note: '' })
const taskItems = ref([])

const remainingTasks = computed(() => taskItems.value.filter((task) => !task.done).length)

function persistState() {
  const stored = getProjectStateStore()
  stored[props.projectId] = {
    ...stored[props.projectId],
    demo: {
      taskItems: taskItems.value,
      taskDraft: taskDraft.value
    }
  }
  saveProjectStateStore(stored)
}

function hydrate() {
  const stored = getProjectStateStore()
  const current = stored[props.projectId] || {}
  const demo = current.demo || {}
  taskItems.value = demo.taskItems || []
  taskDraft.value = demo.taskDraft || { title: '', category: '', note: '' }
}

function addTask() {
  if (!taskDraft.value.title) return
  taskItems.value.unshift({
    id: Date.now(),
    title: taskDraft.value.title,
    category: taskDraft.value.category || 'Personal',
    note: taskDraft.value.note || 'No details',
    done: false
  })
  taskDraft.value = { title: '', category: '', note: '' }
  persistState()
}

function removeTask(id) {
  taskItems.value = taskItems.value.filter((task) => task.id !== id)
  persistState()
}

function clearCompleted() {
  taskItems.value = taskItems.value.filter((task) => !task.done)
  persistState()
}

onMounted(() => {
  hydrate()
})
</script>
