<script setup lang="ts">
import { ref } from "vue"

import WheelOfFortune from "./components/WheelOfFortune.vue"

import type { Segment } from "./types"

const wheelRef = ref<InstanceType<typeof WheelOfFortune> | null>(null)

const segments = ref<Segment[]>([
  { name: "Option 1" },
  { name: "Option 2" },
  { name: "Option 3" },
  { name: "Option 4" },
  { name: "Option 5" },
  { name: "Option 6" },
])

const onWinner = (value: string): void => {
  if (value.trim() === "") return
  console.log(`Winner: ${value}`)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-wheel-primary to-wheel-secondary p-5 font-inter">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-8 text-center text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
        🎰 Wheel of fortune
      </h1>

      <WheelOfFortune
        ref="wheelRef"
        :segments="segments"
        with-spin-button
        with-winner-display
        with-controls
        @winner="onWinner"
      />
    </div>
  </div>
</template>
