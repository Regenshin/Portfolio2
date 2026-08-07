<template>
  <div class="space-y-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl shadow-black/40 sm:p-8">
    <header class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-sky-400/75">Weather dashboard</p>
        <h2 class="mt-2 text-3xl font-bold sm:text-4xl">Jamaica weather center</h2>
        <p class="mt-3 max-w-2xl text-sm text-gray-300 sm:text-base">
          Search by city, parish, or county to get Jamaican weather that matches local conditions across every parish.
        </p>
      </div>
      <div class="flex items-center gap-4">
        <div class="rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-sky-200">
          {{ weatherLocations.length }} saved locations
        </div>

        <div class="rounded-3xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-sky-200 flex items-center gap-3">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="autoRefreshEnabled" class="h-4 w-4" />
            <span class="text-sm">Auto-refresh</span>
          </label>
          <select v-model.number="refreshIntervalMinutes" class="rounded-md bg-transparent px-2 py-1 text-sm">
            <option :value="5">5m</option>
            <option :value="10">10m</option>
            <option :value="15">15m</option>
            <option :value="30">30m</option>
          </select>
        </div>
      </div>
    </header>

    <div class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <input
              v-model="weatherDraft"
              placeholder="Search city, parish, or county (e.g. Mandeville, Jamaica)"
              class="flex-1 rounded-2xl border border-gray-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-sky-400"
            />
            <button @click="addLocation" class="rounded-full bg-gradient-to-r from-sky-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-sky-400 hover:to-blue-400">
              Add
            </button>
          </div>

          <div v-if="weatherDraft && suggestions.length" class="rounded-3xl border border-gray-700 bg-slate-950/80 p-4 text-sm text-gray-300">
            <p class="mb-3 text-xs uppercase tracking-[0.24em] text-sky-400/80">Suggestions</p>
            <div class="grid gap-2 sm:grid-cols-2">
              <button
                v-for="location in suggestions"
                :key="location.id"
                @click="chooseSuggestion(location)"
                class="rounded-2xl border border-gray-700 bg-gray-900/90 px-3 py-3 text-left text-sm transition hover:border-sky-400 hover:bg-slate-900"
              >
                <p class="font-semibold text-white">{{ location.label }}</p>
                <p class="mt-1 text-xs text-gray-400">{{ location.parish }} • {{ location.county }} County</p>
              </button>
            </div>
          </div>

          <p class="text-sm text-gray-400">Pick a location like Kingston, Mandeville, Falmouth, or Portuguese Town and see weather tied to the correct parish and county.</p>
        </div>
      </div>

      <div class="space-y-4">
        <article v-for="location in weatherLocations" :key="location.id" class="rounded-3xl border border-gray-800 bg-gray-900/80 p-5">
          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 class="text-xl font-semibold text-white">{{ location.label }}</h3>
              <p class="mt-2 text-sm text-gray-400">{{ location.condition }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-4xl font-bold text-white">{{ location.temp }}°</span>
              <button
                @click="removeLocation(location.id)"
                class="rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/15"
              >
                Remove
              </button>
            </div>
          </div>
                  <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <span>{{ location.parish }} parish</span>
                    <span>•</span>
                    <span>{{ location.county }} County</span>
                    <span>•</span>
                    <span>Humidity {{ location.humidity }}%</span>
                    <span>•</span>
                    <span>Wind {{ location.wind }} km/h</span>
                    <span>•</span>
                    <span>Chance of rain {{ location.rainChance ?? 0 }}%</span>
                    <span>•</span>
                    <span class="italic">Last updated: {{ location.lastUpdated ? new Date(location.lastUpdated).toLocaleString() : '—' }}</span>
                  </div>
          <div v-if="location.rainChance >= 40" class="mt-3 inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-3 py-2 text-sm font-semibold text-sky-200">
            <span class="h-2.5 w-2.5 rounded-full bg-sky-300"></span>
            High rain chance
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { getProjectStateStore, saveProjectStateStore } from '../projectData'

const props = defineProps({ projectId: { type: [String, Number], required: true } })
const weatherDraft = ref('')
const weatherLocations = ref([])
const refreshIntervalId = ref(null)

// Auto-refresh settings (persisted per-project)
const autoRefreshEnabled = ref(true)
const refreshIntervalMinutes = ref(10)

const jamaicaLocations = [
  { id: 'kingston', city: 'Kingston', parish: 'Kingston', county: 'Surrey', label: 'Kingston, Jamaica', latitude: 17.9714, longitude: -76.7936, condition: 'Warm and sunny', temp: 30, humidity: 68, wind: 12, rainChance: 10, forecast: 'Clear skies with coastal breezes.' },
  { id: 'new-kingston', city: 'New Kingston', parish: 'St. Andrew', county: 'Surrey', label: 'New Kingston, St. Andrew, Jamaica', latitude: 18.0015, longitude: -76.7920, condition: 'Humid with scattered clouds', temp: 29, humidity: 72, wind: 10, rainChance: 20, forecast: 'Afternoon clouds with a chance of light showers.' },
  { id: 'morant-bay', city: 'Morant Bay', parish: 'St. Thomas', county: 'Surrey', label: 'Morant Bay, St. Thomas, Jamaica', latitude: 17.9280, longitude: -76.6786, condition: 'Warm with sea breezes', temp: 28, humidity: 75, wind: 13, rainChance: 15, forecast: 'Sunshine and a gentle southeast wind.' },
  { id: 'port-antonio', city: 'Port Antonio', parish: 'Portland', county: 'Surrey', label: 'Port Antonio, Portland, Jamaica', latitude: 18.1638, longitude: -76.4524, condition: 'Cloudy with humidity', temp: 27, humidity: 78, wind: 11, rainChance: 40, forecast: 'Marine mist and isolated showers near the coast.' },
  { id: 'spanish-town', city: 'Spanish Town', parish: 'St. Catherine', county: 'Middlesex', label: 'Spanish Town, St. Catherine, Jamaica', latitude: 18.0089, longitude: -76.9526, condition: 'Mostly sunny', temp: 29, humidity: 70, wind: 13, rainChance: 10, forecast: 'Warm inland skies with light evening breezes.' },
  { id: 'may-pen', city: 'May Pen', parish: 'Clarendon', county: 'Middlesex', label: 'May Pen, Clarendon, Jamaica', latitude: 17.9660, longitude: -77.1048, condition: 'Sunny and warm', temp: 30, humidity: 65, wind: 12, rainChance: 12, forecast: 'Dry with good daytime visibility.' },
  { id: 'mandeville', city: 'Mandeville', parish: 'Manchester', county: 'Middlesex', label: 'Mandeville, Manchester, Jamaica', latitude: 18.0370, longitude: -77.5056, condition: 'Cooler hill weather', temp: 26, humidity: 68, wind: 10, rainChance: 8, forecast: 'Pleasant temperatures with clear nights.' },
  { id: 'port-maria', city: 'Port Maria', parish: 'St. Mary', county: 'Middlesex', label: 'Port Maria, St. Mary, Jamaica', latitude: 18.2126, longitude: -76.8600, condition: 'Partly cloudy', temp: 28, humidity: 74, wind: 12, rainChance: 25, forecast: 'Some showers possible near the coast.' },
  { id: 'ocho-rios', city: 'Ocho Rios', parish: 'St. Ann', county: 'Middlesex', label: 'Ocho Rios, St. Ann, Jamaica', latitude: 18.4081, longitude: -77.1038, condition: 'Rain showers', temp: 27, humidity: 80, wind: 14, rainChance: 60, forecast: 'Frequent tropical showers with humid air.' },
  { id: 'falmouth', city: 'Falmouth', parish: 'Trelawny', county: 'Cornwall', label: 'Falmouth, Trelawny, Jamaica', latitude: 18.5036, longitude: -77.7415, condition: 'Sunny and breezy', temp: 29, humidity: 69, wind: 15, rainChance: 15, forecast: 'Coastal sun with steady trade winds.' },
  { id: 'montego-bay', city: 'Montego Bay', parish: 'St. James', county: 'Cornwall', label: 'Montego Bay, St. James, Jamaica', latitude: 18.4764, longitude: -77.8933, condition: 'Bright and warm', temp: 30, humidity: 66, wind: 14, rainChance: 10, forecast: 'Mostly sunny with tropical evening cooling.' },
  { id: 'savanna-la-mar', city: 'Savanna-la-Mar', parish: 'Westmoreland', county: 'Cornwall', label: 'Savanna-la-Mar, Westmoreland, Jamaica', latitude: 18.0117, longitude: -77.8086, condition: 'Warm with sea breeze', temp: 29, humidity: 70, wind: 13, rainChance: 18, forecast: 'Dry inland with breezy coastlines.' },
  { id: 'black-river', city: 'Black River', parish: 'St. Elizabeth', county: 'Cornwall', label: 'Black River, St. Elizabeth, Jamaica', latitude: 17.9989, longitude: -77.8428, condition: 'Sunny with light clouds', temp: 30, humidity: 66, wind: 11, rainChance: 5, forecast: 'Dry and warm with good visibility.' },
  { id: 'lucea', city: 'Lucea', parish: 'Hanover', county: 'Cornwall', label: 'Lucea, Hanover, Jamaica', latitude: 18.4312, longitude: -78.1366, condition: 'Partly sunny', temp: 28, humidity: 73, wind: 12, rainChance: 22, forecast: 'Warm with a coastal breeze and isolated showers.' },
  { id: 'portmore', city: 'Portmore', parish: 'St. Catherine', county: 'Middlesex', label: 'Portmore, St. Catherine, Jamaica', latitude: 17.9714, longitude: -76.8503, condition: 'Mild with urban humidity', temp: 29, humidity: 71, wind: 12, rainChance: 18, forecast: 'Breezy conditions with building afternoon clouds.' }
]

const suggestions = computed(() => {
  const query = weatherDraft.value.trim().toLowerCase()
  if (!query) {
    return []
  }

  return jamaicaLocations.filter((location) => {
    const prefix = query.replace(/jamaica/g, '').replace(/,/g, '').trim()
    return [location.label, location.city, location.parish, location.county].some((field) => {
      return field.toLowerCase().startsWith(prefix)
    })
  })
})

function normalizeQuery(value) {
  return value
    .toLowerCase()
    .replace(/jamaica/g, '')
    .replace(/,/g, '')
    .trim()
}

function findLocation(query) {
  const normalized = normalizeQuery(query)
  return jamaicaLocations.find((location) => {
    return [location.label, location.city, location.parish, location.county].some((field) => {
      const normalizedField = field.toLowerCase().replace(/jamaica/g, '').replace(/,/g, '').trim()
      return normalizedField === normalized || normalizedField.startsWith(normalized)
    })
  })
}

function mapWeatherCode(code) {
  const map = {
    0: 'Clear',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Violent rain showers',
    85: 'Snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with heavy hail'
  }
  return map[code] || 'Variable conditions'
}

function normalizeWeatherLocation(location) {
  return {
    ...location,
    id: location.id || `custom-${Date.now()}`,
    label: location.label || `${location.city || 'Unknown'}, Jamaica`,
    parish: location.parish || 'Unknown parish',
    county: location.county || 'Unknown county',
    condition: location.condition || 'Variable conditions',
    temp: location.temp ?? 0,
    humidity: location.humidity ?? 0,
    wind: location.wind ?? 0,
    rainChance: location.rainChance ?? 0,
    lastUpdated: location.lastUpdated ?? null,
    forecast: location.forecast || `${location.condition || 'Variable conditions'} with a ${location.rainChance ?? 0}% chance of rain.`
  }
}

async function fetchWeather(location) {
  if (!location.latitude || !location.longitude) {
    return normalizeWeatherLocation(location)
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=relativehumidity_2m,precipitation_probability,windspeed_10m&timezone=America%2FJamaica`
    const response = await fetch(url)
    if (!response.ok) {
      return location
    }

    const data = await response.json()
    const currentTime = data.current_weather?.time

    // Find the nearest hourly index to the current weather time (handles minute-offsets)
    let index = -1
    if (Array.isArray(data.hourly?.time) && currentTime) {
      const target = Date.parse(currentTime)
      let bestDiff = Infinity
      for (let i = 0; i < data.hourly.time.length; i++) {
        const t = Date.parse(data.hourly.time[i])
        const diff = Math.abs(t - target)
        if (diff < bestDiff) {
          bestDiff = diff
          index = i
        }
      }
    }

    const humidity = index !== -1 && data.hourly?.relativehumidity_2m?.[index] != null ? data.hourly.relativehumidity_2m[index] : location.humidity
    const rainChance = index !== -1 && data.hourly?.precipitation_probability?.[index] != null ? data.hourly.precipitation_probability[index] : location.rainChance
    const wind = Math.round(data.current_weather?.windspeed ?? location.wind)
    const temp = Math.round(data.current_weather?.temperature ?? location.temp)
    const condition = mapWeatherCode(data.current_weather?.weathercode)
    const chance = rainChance ?? location.rainChance ?? 0

    return {
      ...location,
      condition,
      temp,
      wind,
      humidity: humidity ?? location.humidity,
      rainChance: chance,
      lastUpdated: new Date().toISOString(),
      forecast: `${condition} with a ${chance}% chance of rain.`
    }
  } catch (error) {
    return location
  }
}

function persistState() {
  const stored = getProjectStateStore()
  stored[props.projectId] = {
    ...stored[props.projectId],
    demo: {
      weatherDraft: weatherDraft.value,
      weatherLocations: weatherLocations.value,
      settings: {
        autoRefreshEnabled: autoRefreshEnabled.value,
        refreshIntervalMinutes: refreshIntervalMinutes.value
      }
    }
  }
  saveProjectStateStore(stored)
}

function hydrate() {
  const stored = getProjectStateStore()
  const current = stored[props.projectId] || {}
  const demo = current.demo || {}
  weatherDraft.value = demo.weatherDraft || ''
  weatherLocations.value = demo.weatherLocations?.length
    ? demo.weatherLocations.map(normalizeWeatherLocation)
    : [
        jamaicaLocations.find((loc) => loc.id === 'mandeville'),
        jamaicaLocations.find((loc) => loc.id === 'kingston')
      ].filter(Boolean).map(normalizeWeatherLocation)

  // restore settings
  autoRefreshEnabled.value = demo.settings?.autoRefreshEnabled ?? true
  refreshIntervalMinutes.value = demo.settings?.refreshIntervalMinutes ?? 10
}

async function refreshAllLocations() {
  const updated = await Promise.all(
    weatherLocations.value.map(async (location) => {
      return await fetchWeather(location)
    })
  )
  weatherLocations.value = updated
  persistState()
}

async function addLocation() {
  if (!weatherDraft.value) return

  const location = findLocation(weatherDraft.value)
  if (location) {
    if (!weatherLocations.value.some((item) => item.id === location.id)) {
      const updated = await fetchWeather(location)
      weatherLocations.value.push(updated)
    }
  } else {
    // Attempt to geocode the custom query to get accurate lat/lon
    const geocoded = await geocode(weatherDraft.value).catch(() => null)
    if (geocoded && geocoded.latitude && geocoded.longitude) {
      const geoLoc = {
        id: `custom-${Date.now()}`,
        city: geocoded.city || weatherDraft.value,
        parish: geocoded.parish || 'Unknown parish',
        county: geocoded.county || 'Unknown county',
        label: geocoded.display_name || `${weatherDraft.value.trim()}, Jamaica`,
        latitude: parseFloat(geocoded.latitude),
        longitude: parseFloat(geocoded.longitude)
      }

      const updated = await fetchWeather(geoLoc)
      weatherLocations.value.push(updated)
    } else {
      weatherLocations.value.push({
        id: `custom-${Date.now()}`,
        city: weatherDraft.value,
        parish: 'Unknown parish',
        county: 'Unknown county',
        label: `${weatherDraft.value.trim()}, Jamaica`,
        condition: 'Variable conditions',
        temp: 28,
        humidity: 72,
        wind: 12,
        rainChance: 18,
        lastUpdated: new Date().toISOString(),
        forecast: 'Weather is estimated from regional conditions.'
      })
    }
  }

  weatherDraft.value = ''
  persistState()
}

function removeLocation(id) {
  weatherLocations.value = weatherLocations.value.filter((location) => location.id !== id)
  persistState()
}

async function chooseSuggestion(location) {
  if (!weatherLocations.value.some((item) => item.id === location.id)) {
    const updated = await fetchWeather(location)
    weatherLocations.value.push(updated)
  }
  weatherDraft.value = ''
  persistState()
}

async function geocode(query) {
  // Use Nominatim to resolve place names; limit to one result and request address details
  const q = `${query} Jamaica`
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=1`
  const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
  if (!res.ok) return null
  const list = await res.json()
  if (!list || !list.length) return null
  const first = list[0]
  const addr = first.address || {}
  return {
    latitude: first.lat,
    longitude: first.lon,
    display_name: first.display_name,
    city: addr.city || addr.town || addr.village || addr.hamlet || null,
    parish: addr.county || addr.state || null,
    county: addr.state_district || addr.region || addr.county || null
  }
}

function setupAutoRefresh() {
  if (refreshIntervalId.value) {
    clearInterval(refreshIntervalId.value)
    refreshIntervalId.value = null
  }

  if (!autoRefreshEnabled.value) return

  const ms = (refreshIntervalMinutes.value || 10) * 60 * 1000
  refreshIntervalId.value = setInterval(() => {
    refreshAllLocations().catch(() => {})
  }, ms)
}

onMounted(async () => {
  hydrate()
  await refreshAllLocations()
  setupAutoRefresh()
})

onUnmounted(() => {
  if (refreshIntervalId.value) {
    clearInterval(refreshIntervalId.value)
    refreshIntervalId.value = null
  }
})

watch([autoRefreshEnabled, refreshIntervalMinutes], () => {
  setupAutoRefresh()
  persistState()
})
</script>
