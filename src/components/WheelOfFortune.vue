<script setup lang="ts">
import { onMounted, provide, ref, watchEffect } from "vue"

import SegmentControls from "@/components/SegmentControls.vue"
import SpinningWheel from "@/components/SpinningWheel.vue"
import WinnerDisplay from "@/components/WinnerDisplay.vue"
import { useSegmentControls } from "@/composables/use-segment-controls"
import { useSpin } from "@/composables/use-spin"
import { MIN_SEGMENTS } from "@/constants"

import type { Segment } from "@/types"

type Emits = {
  winner: [value: string]
}

const emit = defineEmits<Emits>()

type Props = {
  segments: Segment[],
  wheelSize?: number,
  withSpinButton?: boolean,
  withWinnerDisplay?: boolean,
  withControls?: boolean,
}

const props = defineProps<Props>()

const {
  isSpinning,
  spin,
  winner,
  rotation,
  segmentAngle,
} = useSpin(props.segments)

provide("spin", spin)
provide("isSpinning", isSpinning)
provide("rotation", rotation)
provide("segmentAngle", segmentAngle)

defineExpose({ spin })

watchEffect(() => {
  emit("winner", winner.value)
})

const isWinnerDisplayVisible = ref(false)

watchEffect(() => {
  if (!props.withWinnerDisplay) {
    return
  }
  isWinnerDisplayVisible.value = !!winner.value && winner.value.trim() !== ""
})

const segmentsRef = ref(props.segments)
const { onSegmentAdd, onSegmentRemove, onSegmentUpdateName, onSegmentUpdateColor } = useSegmentControls(segmentsRef)

onMounted(() => {
  console.info("[WheelOfFortune] To start the wheel manually, call the `spin` method on the component instance.")
  console.info("[WheelOfFortune] Example: `wheelRef.value?.spin()`")
  console.info("[WheelOfFortune] You can also use the `withSpinButton` prop to display a spin button.")
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8 p-8">
    <SpinningWheel
      :segments="props.segments"
      :size="props.wheelSize"
      :is-spinning="isSpinning"
    />

    <button
      v-if="props.withSpinButton"
      class="cursor-pointer rounded-full border-none bg-gradient-to-r from-wheel-red to-wheel-red-dark px-10 py-4 text-xl font-bold uppercase tracking-wider text-white shadow-button transition-all duration-300 hover:-translate-y-0.5 hover:shadow-button-hover active:translate-y-0 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-60"
      :class="{ 'animate-pulse-custom': isSpinning }"
      :disabled="isSpinning || segments.length < MIN_SEGMENTS"
      aria-label="Spin the wheel button"
      @click="spin"
    >
      {{ isSpinning ? 'Spinning...' : 'SPIN!' }}
    </button>

    <WinnerDisplay
      v-if="props.withWinnerDisplay"
      :winner="winner"
      :is-visible="isWinnerDisplayVisible"
    />

    <SegmentControls
      v-if="props.withControls"
      :segments="props.segments"
      @segment:add="onSegmentAdd"
      @segment:remove="onSegmentRemove"
      @segment:update:name="onSegmentUpdateName"
      @segment:update:color="onSegmentUpdateColor"
    />
  </div>
</template>
