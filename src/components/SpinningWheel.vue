<script setup lang="ts">

import { watchEffect } from "vue"

import { useSpin } from "@/composables/use-spin"
import { HALF_CIRCLE, QUARTER_CIRCLE, THREE_QUARTER_CIRCLE, MIN_SEGMENTS, DEFAULT_COLORS } from "@/constants"

import type { Segment } from "@/types"

// Constants
const SVG_SIZE = 300
// eslint-disable-next-line no-magic-numbers
const WHEEL_CENTER_X = SVG_SIZE / 2
// eslint-disable-next-line no-magic-numbers
const WHEEL_CENTER_Y = SVG_SIZE / 2
const WHEEL_RADIUS = 140
const TEXT_RADIUS = 90
const SEGMENT_STROKE_WIDTH = 2
const TEXT_FONT_SIZE = 12
const MAX_TEXT_LENGTH = 12
const TRUNCATE_LENGTH = 10
const DEGREES_TO_RADIANS = Math.PI / HALF_CIRCLE

type Props = {
  segments: Segment[]
}

const props = defineProps<Props>()

type Emits = {
  spin: []
  winner: [value: string]
}

const emit = defineEmits<Emits>()

const colors = DEFAULT_COLORS

const {
  isSpinning,
  rotation,
  spin,
  segmentAngle,
  winner,
} = useSpin(props.segments)

const getSegmentColor = (index: number): string => {
  return props.segments[index].color || colors[index % colors.length]
}

const getSegmentPath = (index: number): string => {
  const angle = segmentAngle.value
  const startAngle = (index * angle - QUARTER_CIRCLE) * DEGREES_TO_RADIANS
  const endAngle = ((index + 1) * angle - QUARTER_CIRCLE) * DEGREES_TO_RADIANS

  const x1 = WHEEL_CENTER_X + WHEEL_RADIUS * Math.cos(startAngle)
  const y1 = WHEEL_CENTER_Y + WHEEL_RADIUS * Math.sin(startAngle)
  const x2 = WHEEL_CENTER_X + WHEEL_RADIUS * Math.cos(endAngle)
  const y2 = WHEEL_CENTER_Y + WHEEL_RADIUS * Math.sin(endAngle)

  const largeArcFlag = angle > HALF_CIRCLE ? 1 : 0

  return `M ${WHEEL_CENTER_X} ${WHEEL_CENTER_Y} L ${x1} ${y1} A ${WHEEL_RADIUS} ${WHEEL_RADIUS} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
}

const getTextX = (index: number): number => {
  // eslint-disable-next-line no-magic-numbers
  const angle = (index * segmentAngle.value + segmentAngle.value / 2 - QUARTER_CIRCLE) * DEGREES_TO_RADIANS
  return WHEEL_CENTER_X + TEXT_RADIUS * Math.cos(angle)
}

const getTextY = (index: number): number => {
  // eslint-disable-next-line no-magic-numbers
  const angle = (index * segmentAngle.value + segmentAngle.value / 2 - QUARTER_CIRCLE) * DEGREES_TO_RADIANS
  return WHEEL_CENTER_Y + TEXT_RADIUS * Math.sin(angle)
}

const getTextTransform = (index: number): string => {
  // eslint-disable-next-line no-magic-numbers
  const angle = index * segmentAngle.value + segmentAngle.value / 2 - QUARTER_CIRCLE
  const x = getTextX(index)
  const y = getTextY(index)
  return `rotate(${angle > QUARTER_CIRCLE && angle < THREE_QUARTER_CIRCLE ? angle + HALF_CIRCLE : angle}, ${x}, ${y})`
}

watchEffect(() => {
  emit("winner", winner.value)
})
</script>

<template>
  <div class="mb-12 flex flex-col items-center">
    <div class="relative mb-8">
      <svg
        class="wheel-spin-transition xs:size-[200px] size-[300px] rounded-full sm:size-[250px] md:size-[300px]"
        :class="{ 'wheel-spin-transition': isSpinning }"
        :style="{ transform: `rotate(${rotation}deg)` }"
        :width="SVG_SIZE"
        :height="SVG_SIZE"
        :viewBox="`0 0 ${SVG_SIZE} ${SVG_SIZE}`"
      >
        <!-- Wheel segments -->
        <g
          v-for="(segment, index) in segments"
          :key="index"
        >
          <path
            :d="getSegmentPath(index)"
            :fill="getSegmentColor(index)"
            stroke="#fff"
            :stroke-width="SEGMENT_STROKE_WIDTH"
          />
          <text
            :x="getTextX(index)"
            :y="getTextY(index)"
            :transform="getTextTransform(index)"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#fff"
            font-weight="600"
            :font-size="TEXT_FONT_SIZE"
            class="pointer-events-none font-inter text-xs sm:text-[10px]"
          >
            {{ segment.name.length > MAX_TEXT_LENGTH ? segment.name.substring(0, TRUNCATE_LENGTH) + '...' : segment.name }}
          </text>
        </g>
      </svg>

      <!-- Pointer -->
      <div class="absolute -top-2.5 left-1/2 z-10 size-0 -translate-x-1/2 transform border-x-[15px] border-t-[30px] border-x-transparent border-t-wheel-red" />
    </div>

    <!-- Spin Button -->
    <button
      class="cursor-pointer rounded-full border-none bg-gradient-to-r from-wheel-red to-wheel-red-dark px-10 py-4 text-xl font-bold uppercase tracking-wider text-white shadow-button transition-all duration-300 hover:-translate-y-0.5 hover:shadow-button-hover active:translate-y-0 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-60"
      :class="{ 'animate-pulse-custom': isSpinning }"
      :disabled="isSpinning || segments.length < MIN_SEGMENTS"
      aria-label="Spin the wheel button"
      @click="spin"
    >
      {{ isSpinning ? 'Spinning...' : 'SPIN!' }}
    </button>
  </div>
</template>

