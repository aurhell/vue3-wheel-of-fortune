import { computed, ref } from "vue"

import { MIN_SEGMENTS, FULL_CIRCLE } from "@/constants"

import type { Segment } from "@/types"

const SPINNING_DURATION = 3000

export const useSpin = (segments: Segment[]) => {

  const isSpinning = ref(false)
  const winner = ref("")
  const rotation = ref(0)
  const segmentAngle = computed(() => FULL_CIRCLE / segments.length)

  const spin = () => {
    if (isSpinning.value || segments.length < MIN_SEGMENTS) {
      return
    }

    isSpinning.value = true
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
      const selectedSegment = segments[winnerIndex]
      winner.value = typeof selectedSegment === "string" ? selectedSegment : selectedSegment.name

      isSpinning.value = false
    }, SPINNING_DURATION)
  }

  return {
    isSpinning,
    winner,
    rotation,
    segmentAngle,
    spin,
  }
}
