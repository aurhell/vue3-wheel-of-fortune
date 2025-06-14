<script setup lang="ts">
import { ref, computed } from "vue"

import SegmentControls from "./components/SegmentControls.vue"
import SpinningWheel from "./components/SpinningWheel.vue"
import WinnerDisplay from "./components/WinnerDisplay.vue"
import { FULL_CIRCLE, MAX_SEGMENTS, MIN_SEGMENTS } from "./constants"

import type { Segment } from "./types"

const SHOW_WINNER_DELAY = 200
const SPINNING_DURATION = 3000

const segments = ref<Segment[]>([
  { name: "Option 1" },
  { name: "Option 2" },
  { name: "Option 3" },
  { name: "Option 4" },
  { name: "Option 5" },
  { name: "Option 6" },
])

const rotation = ref(0)
const isSpinning = ref(false)
const winner = ref("")
const showWinner = ref(false)

const segmentAngle = computed(() => FULL_CIRCLE / segments.value.length)

const addSegment = (name: string): void => {
  if (segments.value.length < MAX_SEGMENTS) {
    segments.value.push({ name: name.trim() })
  }
}

const removeSegment = (index: number): void => {
  if (segments.value.length > MIN_SEGMENTS) {
    segments.value.splice(index, 1)
  }
}

const editSegment = (index: number, segment: string): void => {
  if (segment.trim() && segments.value.length < MAX_SEGMENTS) {
    segments.value[index].name = segment.trim()
  }
}

const updateSegmentColor = (index: number, color: string): void => {
  segments.value[index].color = color
}

const spin = (): void => {
  if (isSpinning.value || segments.value.length < MIN_SEGMENTS) {return}

  isSpinning.value = true
  showWinner.value = false
  winner.value = ""

  // Generate random spin (3-6 full rotations + random angle)
  const minSpins = 3
  const maxSpins = 6
  const spins = minSpins + Math.random() * (maxSpins - minSpins)
  const finalAngle = Math.random() * FULL_CIRCLE
  const totalRotation = spins * FULL_CIRCLE + finalAngle

  rotation.value += totalRotation

  // Calculate winner after spin completes
  setTimeout(() => {
    const normalizedAngle = (FULL_CIRCLE - (rotation.value % FULL_CIRCLE)) % FULL_CIRCLE
    const winnerIndex = Math.floor(normalizedAngle / segmentAngle.value)
    const selectedSegment = segments.value[winnerIndex]
    winner.value = typeof selectedSegment === "string" ? selectedSegment : selectedSegment.name

    isSpinning.value = false

    // Show winner with delay for better UX
    setTimeout(() => {
      showWinner.value = true
    }, SHOW_WINNER_DELAY)
  }, SPINNING_DURATION)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-wheel-primary to-wheel-secondary p-5 font-inter">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-8 text-center text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
        🎰 Wheel of fortune
      </h1>

      <!-- Spinning Wheel Component -->
      <SpinningWheel
        :segments="segments"
        :is-spinning="isSpinning"
        :rotation="rotation"
        @spin="spin"
      />

      <!-- Winner Display Component -->
      <WinnerDisplay
        :winner="winner"
        :show-winner="showWinner"
      />

      <!-- Segment Controls Component -->
      <SegmentControls
        :segments="segments"
        @add-segment="addSegment"
        @remove-segment="removeSegment"
        @update:name="editSegment"
        @update:color="updateSegmentColor"
      />
    </div>
  </div>
</template>
