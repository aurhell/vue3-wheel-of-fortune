<script setup lang="ts">
import { ref, watchEffect } from "vue"

import SegmentControls from "./components/SegmentControls.vue"
import SpinningWheel from "./components/SpinningWheel.vue"
import WinnerDisplay from "./components/WinnerDisplay.vue"
import { MAX_SEGMENTS, MIN_SEGMENTS } from "./constants"

import type { Segment } from "./types"

const segments = ref<Segment[]>([
  { name: "Option 1" },
  { name: "Option 2" },
  { name: "Option 3" },
  { name: "Option 4" },
  { name: "Option 5" },
  { name: "Option 6" },
])

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

const winner = ref("")
const onWinner = (value: string): void => {
  winner.value = value
}

const isWinnerDisplayVisible = ref(false)
watchEffect(() => {
  isWinnerDisplayVisible.value = !!winner.value && winner.value.trim() !== ""
})
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
        @winner="onWinner"
      />

      <!-- Winner Display Component -->
      <WinnerDisplay
        :winner="winner"
        :is-visible="isWinnerDisplayVisible"
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
