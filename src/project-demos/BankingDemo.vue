<template>
  <div class="space-y-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl shadow-black/40 sm:p-8">
    <header class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-emerald-400/75">Mobile banking</p>
        <h2 class="mt-2 text-3xl font-bold sm:text-4xl">Secure finance quick actions</h2>
        <p class="mt-3 max-w-2xl text-sm text-gray-300 sm:text-base">
          Manage a demo balance, send transfers, and keep each transaction saved in the browser.
        </p>
      </div>
      <div class="rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-emerald-200">
        Balance: <span class="font-semibold text-white">${{ bankingBalance }}</span>
      </div>
    </header>

    <div class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
        <div class="mb-4 text-sm text-gray-400">Start a transfer</div>
        <input v-model="transferDraft.recipient" placeholder="Recipient" class="mb-3 w-full rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
        <input v-model="transferDraft.amount" type="number" min="1" placeholder="Amount" class="mb-4 w-full rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
        <button @click="makeTransfer" class="w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:from-emerald-400 hover:to-teal-400">
          Send money
        </button>
      </section>

      <section class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">Recent activity</h3>
          <span class="text-sm text-gray-400">{{ bankingTransactions.length }} entries</span>
        </div>
        <div class="space-y-3">
          <div v-for="entry in bankingTransactions" :key="entry.id" class="rounded-2xl border border-gray-800 bg-slate-950/90 p-4 text-sm text-gray-300">
            <div class="flex items-center justify-between">
              <span>{{ entry.label }}</span>
              <span :class="entry.amount > 0 ? 'text-emerald-400' : 'text-rose-400'">{{ entry.amount > 0 ? '+' : '' }}${{ entry.amount }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getProjectStateStore, saveProjectStateStore } from '../projectData'

const props = defineProps({ projectId: { type: [String, Number], required: true } })
const transferDraft = ref({ recipient: '', amount: '' })
const bankingBalance = ref(4820)
const bankingTransactions = ref([])

function persistState() {
  const stored = getProjectStateStore()
  stored[props.projectId] = {
    ...stored[props.projectId],
    demo: {
      transferDraft: transferDraft.value,
      bankingBalance: bankingBalance.value,
      bankingTransactions: bankingTransactions.value
    }
  }
  saveProjectStateStore(stored)
}

function hydrate() {
  const stored = getProjectStateStore()
  const current = stored[props.projectId] || {}
  const demo = current.demo || {}
  transferDraft.value = demo.transferDraft || { recipient: '', amount: '' }
  bankingBalance.value = demo.bankingBalance ?? 4820
  bankingTransactions.value = demo.bankingTransactions || [
    { id: 1, label: 'Salary deposit', amount: 2400 },
    { id: 2, label: 'Groceries', amount: -86 }
  ]
}

function makeTransfer() {
  const amount = Number(transferDraft.value.amount)
  if (!transferDraft.value.recipient || !amount) return
  bankingBalance.value -= amount
  bankingTransactions.value.unshift({
    id: Date.now(),
    label: `Transfer to ${transferDraft.value.recipient}`,
    amount: -amount
  })
  transferDraft.value = { recipient: '', amount: '' }
  persistState()
}

onMounted(() => {
  hydrate()
})
</script>
