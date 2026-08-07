<template>
  <div class="space-y-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl shadow-black/40 sm:p-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-sky-400/70">Live storefront</p>
        <h2 class="mt-2 text-3xl font-bold sm:text-4xl">Shop from the demo store</h2>
        <p class="mt-3 max-w-2xl text-sm text-gray-300 sm:text-base">
          Add products, manage your cart, and complete checkout with browser-persisted order state.
        </p>
      </div>
      <div class="rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-sky-200">
        Cart total: <span class="font-semibold text-white">${{ cartTotal }}</span>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <div class="grid gap-4 md:grid-cols-2">
        <article v-for="product in products" :key="product.id" class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-white">{{ product.name }}</h3>
              <p class="mt-2 text-sm text-gray-400">{{ product.description }}</p>
            </div>
            <span class="rounded-full bg-sky-500/15 px-3 py-1 text-sm text-sky-200">${{ product.price }}</span>
          </div>
          <button
            @click="addToCart(product)"
            class="mt-5 inline-flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            Add to cart
          </button>
        </article>
      </div>

      <section class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">Shopping cart</h3>
          <span class="text-sm text-gray-400">{{ cartItemCount }} items</span>
        </div>
        <div v-if="cartItems.length" class="space-y-3">
          <div v-for="item in cartItems" :key="item.id" class="rounded-2xl bg-slate-950/90 p-4">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-semibold text-white">{{ item.name }}</p>
                <p class="text-sm text-gray-400">${{ item.price }} each</p>
              </div>
              <div class="flex items-center gap-2">
                <button @click="updateCartQty(item, -1)" class="h-9 w-9 rounded-full bg-gray-800 text-white">−</button>
                <span class="w-7 text-center text-sm">{{ item.qty }}</span>
                <button @click="updateCartQty(item, 1)" class="h-9 w-9 rounded-full bg-gray-800 text-white">+</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="rounded-2xl border border-dashed border-gray-700 p-4 text-sm text-gray-400">
          Your cart is empty. Pick a product to get started.
        </div>

        <div class="mt-5 rounded-3xl bg-slate-950/80 p-4 text-sm text-gray-300">
          <div class="mb-3 flex items-center justify-between text-gray-400">
            <span>Order total</span>
            <span class="font-semibold text-white">${{ cartTotal }}</span>
          </div>
          <input
            v-model="checkoutDraft.name"
            placeholder="Name"
            class="mb-3 w-full rounded-2xl border border-gray-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-400"
          />
          <input
            v-model="checkoutDraft.email"
            placeholder="Email"
            class="mb-3 w-full rounded-2xl border border-gray-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-400"
          />
          <input
            v-model="checkoutDraft.address"
            placeholder="Shipping address"
            class="mb-4 w-full rounded-2xl border border-gray-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-400"
          />
          <button
            @click="completeCheckout"
            class="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:from-cyan-400 hover:to-blue-400"
          >
            Complete order
          </button>
          <p class="mt-4 text-sm text-emerald-300" v-if="orderMessage">{{ orderMessage }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getProjectStateStore, saveProjectStateStore } from '../projectData'

const props = defineProps({
  projectId: { type: [String, Number], required: true }
})

const products = ref([
  { id: 1, name: 'Aurora Lamp', description: 'Warm ambient lighting for studio spaces.', price: 89 },
  { id: 2, name: 'Cloud Chair', description: 'Minimal comfort with sculptural detailing.', price: 129 },
  { id: 3, name: 'Lumen Backpack', description: 'Everyday carry with a modular layout.', price: 74 }
])
const cartItems = ref([])
const checkoutDraft = ref({ name: '', email: '', address: '' })
const orderMessage = ref('')

const cartItemCount = computed(() => cartItems.value.reduce((count, item) => count + item.qty, 0))
const cartTotal = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * item.qty, 0))

function persistState() {
  const stored = getProjectStateStore()
  stored[props.projectId] = {
    ...stored[props.projectId],
    demo: {
      cartItems: cartItems.value,
      checkoutDraft: checkoutDraft.value
    }
  }
  saveProjectStateStore(stored)
}

function hydrate() {
  const stored = getProjectStateStore()
  const current = stored[props.projectId] || {}
  const demo = current.demo || {}
  cartItems.value = demo.cartItems || []
  checkoutDraft.value = demo.checkoutDraft || { name: '', email: '', address: '' }
}

function addToCart(product) {
  const existing = cartItems.value.find((item) => item.id === product.id)
  if (existing) {
    existing.qty += 1
  } else {
    cartItems.value.push({ ...product, qty: 1 })
  }
  persistState()
}

function updateCartQty(item, delta) {
  item.qty = Math.max(0, item.qty + delta)
  if (item.qty === 0) {
    cartItems.value = cartItems.value.filter((entry) => entry.id !== item.id)
  }
  persistState()
}

function completeCheckout() {
  if (!checkoutDraft.value.name || !checkoutDraft.value.email || !checkoutDraft.value.address) {
    orderMessage.value = 'Fill in all checkout fields to complete your order.'
    return
  }

  cartItems.value = []
  saveProjectStateStore({
    ...getProjectStateStore(),
    [props.projectId]: {
      ...getProjectStateStore()[props.projectId],
      demo: {
        cartItems: [],
        checkoutDraft: { name: '', email: '', address: '' }
      }
    }
  })
  checkoutDraft.value = { name: '', email: '', address: '' }
  orderMessage.value = 'Your order is complete! Thanks for shopping.'
}

onMounted(() => {
  hydrate()
})
</script>
