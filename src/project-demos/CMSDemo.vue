<template>
  <div class="space-y-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl shadow-black/40 sm:p-8">
    <header class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-amber-400/75">CMS platform</p>
        <h2 class="mt-2 text-3xl font-bold sm:text-4xl">Editorial workspace</h2>
        <p class="mt-3 max-w-2xl text-sm text-gray-300 sm:text-base">
          Draft content, save posts, and manage published items in a browser-backed editor.
        </p>
      </div>
      <div class="rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-amber-200">
        {{ cmsPosts.length }} posts saved
      </div>
    </header>

    <section class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
        <div class="space-y-4">
          <input v-model="postDraft.title" placeholder="Post title" class="w-full rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400" />
          <textarea v-model="postDraft.body" rows="4" placeholder="Post body" class="w-full resize-none rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"></textarea>
          <select v-model="postDraft.status" class="w-full rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400">
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
          <button @click="createPost" class="w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:from-amber-400 hover:to-orange-400">
            Save post
          </button>
        </div>
      </div>

      <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
        <h3 class="text-lg font-semibold text-white">Published content</h3>
        <div class="mt-4 space-y-3">
          <article v-for="post in cmsPosts" :key="post.id" class="rounded-2xl border border-gray-800 bg-slate-950/90 p-4">
            <div class="flex items-center justify-between">
              <h4 class="font-semibold text-white">{{ post.title }}</h4>
              <span :class="post.status === 'Published' ? 'text-emerald-400' : 'text-gray-400'" class="text-xs uppercase tracking-[0.2em]">
                {{ post.status }}
              </span>
            </div>
            <p class="mt-2 text-sm text-gray-400">{{ post.body }}</p>
          </article>
        </div>
        <div v-if="!cmsPosts.length" class="mt-4 rounded-2xl border border-dashed border-gray-700 p-4 text-sm text-gray-400">
          Create your first post to see it appear here.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getProjectStateStore, saveProjectStateStore } from '../projectData'

const props = defineProps({ projectId: { type: [String, Number], required: true } })
const postDraft = ref({ title: '', body: '', status: 'Draft' })
const cmsPosts = ref([])

function persistState() {
  const stored = getProjectStateStore()
  stored[props.projectId] = {
    ...stored[props.projectId],
    demo: {
      postDraft: postDraft.value,
      cmsPosts: cmsPosts.value
    }
  }
  saveProjectStateStore(stored)
}

function hydrate() {
  const stored = getProjectStateStore()
  const current = stored[props.projectId] || {}
  const demo = current.demo || {}
  postDraft.value = demo.postDraft || { title: '', body: '', status: 'Draft' }
  cmsPosts.value = demo.cmsPosts || []
}

function createPost() {
  if (!postDraft.value.title || !postDraft.value.body) return
  cmsPosts.value.unshift({
    id: Date.now(),
    title: postDraft.value.title,
    body: postDraft.value.body,
    status: postDraft.value.status
  })
  postDraft.value = { title: '', body: '', status: 'Draft' }
  persistState()
}

onMounted(() => {
  hydrate()
})
</script>
