<script setup lang="ts">
import { inject, computed } from "vue"

import { DEFAULT_COLORS, DEFAULT_WHEEL_SIZE } from "@/constants"

import type { Segment } from "@/types"

const QUARTER_CIRCLE_DEGREES = 90
const HALF_CIRCLE_DEGREES = 180
const THREE_QUARTER_CIRCLE_DEGREES = 270
const DEGREES_TO_RADIANS = Math.PI / HALF_CIRCLE_DEGREES

const WHEEL_RADIUS_RATIO = 0.47
const TEXT_RADIUS_RATIO = 0.3
const POINTER_WIDTH_RATIO = 0.05
const POINTER_HEIGHT_RATIO = 0.1

type Props = {
  segments: Segment[]
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: DEFAULT_WHEEL_SIZE,
})

const isSpinning = inject<boolean>("isSpinning")
const rotation = inject<number>("rotation")
const segmentAngle = inject<{ value: number }>("segmentAngle")

// eslint-disable-next-line no-magic-numbers
const wheelCenterX = computed(() => props.size / 2)
// eslint-disable-next-line no-magic-numbers
const wheelCenterY = computed(() => props.size / 2)

const wheelRadius = computed(() => {
  return props.size * WHEEL_RADIUS_RATIO
})

const textRadius = computed(() => {
  return props.size * TEXT_RADIUS_RATIO
})

const fontSize = computed(() => {
  // Dynamic font size based on wheel size and number of segments
  // eslint-disable-next-line no-magic-numbers
  const baseSize = props.size * 0.04 // 4% of wheel size
  const segmentCount = props.segments.length

  // Reduce font size for more segments
  let scaleFactor = 1
  // eslint-disable-next-line no-magic-numbers
  if (segmentCount > 8) scaleFactor = 0.8
  // eslint-disable-next-line no-magic-numbers
  if (segmentCount > 12) scaleFactor = 0.6

  // eslint-disable-next-line no-magic-numbers
  return Math.max(baseSize * scaleFactor, 10) // Minimum 10px
})

const strokeWidth = computed(() => {
  // eslint-disable-next-line no-magic-numbers
  return Math.max(props.size * 0.006, 1) // 0.6% of size, minimum 1px
})

const pointerWidth = computed(() => {
  return props.size * POINTER_WIDTH_RATIO
})

const pointerHeight = computed(() => {
  return props.size * POINTER_HEIGHT_RATIO
})

const letterSpacing = computed(() => {
  // Adjust letter spacing based on font size for better readability
  // eslint-disable-next-line no-magic-numbers
  if (fontSize.value < 12) return "0.5px"
  // eslint-disable-next-line no-magic-numbers
  if (fontSize.value < 16) return "0.3px"
  return "0.1px"
})

const maxTextLength = computed(() => {
  // Dynamic max text length based on wheel size and number of segments
  const segmentCount = props.segments.length
  // The more segments, the less space for text
  // eslint-disable-next-line no-magic-numbers
  const baseLength = Math.floor(props.size / (segmentCount * 2.5))
  // Minimum 3 characters, maximum 12
  // eslint-disable-next-line no-magic-numbers
  return Math.max(3, Math.min(baseLength, 12))
})

// eslint-disable-next-line no-magic-numbers
const truncateLength = computed(() => Math.max(maxTextLength.value - 3, 3))

// Methods
const getSegmentColor = (index: number): string => {
  const segment = props.segments[index]
  if (segment.color) {
    return segment.color
  }
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length]
}

const getSegmentPath = (index: number) => {
  if (!segmentAngle?.value) {
    throw new Error("Segment angle is not defined")
  }
  const angle = segmentAngle.value
  const startAngle = (index * angle - QUARTER_CIRCLE_DEGREES) * DEGREES_TO_RADIANS
  const endAngle = ((index + 1) * angle - QUARTER_CIRCLE_DEGREES) * DEGREES_TO_RADIANS

  const x1 = wheelCenterX.value + wheelRadius.value * Math.cos(startAngle)
  const y1 = wheelCenterY.value + wheelRadius.value * Math.sin(startAngle)
  const x2 = wheelCenterX.value + wheelRadius.value * Math.cos(endAngle)
  const y2 = wheelCenterY.value + wheelRadius.value * Math.sin(endAngle)

  const largeArcFlag = angle > HALF_CIRCLE_DEGREES ? 1 : 0

  return `M ${wheelCenterX.value} ${wheelCenterY.value} L ${x1} ${y1} A ${wheelRadius.value} ${wheelRadius.value} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
}

const getTextX = (index: number) => {
  if (!segmentAngle?.value) {
    throw new Error("Segment angle is not defined")
  }
  // eslint-disable-next-line no-magic-numbers
  const angle = (index * segmentAngle.value + segmentAngle.value / 2 - QUARTER_CIRCLE_DEGREES) * DEGREES_TO_RADIANS
  return wheelCenterX.value + textRadius.value * Math.cos(angle)
}

const getTextY = (index: number) => {
  if (!segmentAngle?.value) {
    throw new Error("Segment angle is not defined")
  }
  // eslint-disable-next-line no-magic-numbers
  const angle = (index * segmentAngle.value + segmentAngle.value / 2 - QUARTER_CIRCLE_DEGREES) * DEGREES_TO_RADIANS
  return wheelCenterY.value + textRadius.value * Math.sin(angle)
}

const getTextTransform = (index: number) => {
  if (!segmentAngle?.value) {
    throw new Error("Segment angle is not defined")
  }
  // eslint-disable-next-line no-magic-numbers
  const angle = index * segmentAngle.value + segmentAngle.value / 2 - QUARTER_CIRCLE_DEGREES
  const x = getTextX(index)
  const y = getTextY(index)

  // Ensure text is always readable (not upside down)
  const rotationAngle = angle > QUARTER_CIRCLE_DEGREES && angle < THREE_QUARTER_CIRCLE_DEGREES
    ? angle + HALF_CIRCLE_DEGREES
    : angle

  return `rotate(${rotationAngle}, ${x}, ${y})`
}

const getTruncatedText = (text: string) => {
  return text.length > maxTextLength.value
    ? `${text.substring(0, truncateLength.value)  }...`
    : text
}

</script>

<template>
  <div class="flex flex-col items-center">
    <div class="relative">
      <div class="relative mb-8">
        <svg
          class="rounded-full"
          :class="{ 'wheel-spin-transition': isSpinning }"
          :style="{
            transform: `rotate(${rotation}deg)`,
            width: `${size}px`,
            height: `${size}px`,
          }"
          :width="size"
          :height="size"
          :viewBox="`0 0 ${size} ${size}`"
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
              :stroke-width="strokeWidth"
            />
            <text
              :x="getTextX(index)"
              :y="getTextY(index)"
              :transform="getTextTransform(index)"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#fff"
              font-weight="600"
              :font-size="fontSize"
              class="pointer-events-none font-sans"
              :style="{ letterSpacing: letterSpacing }"
            >
              {{ getTruncatedText(segment.name) }}
            </text>
          </g>
        </svg>

        <!-- Pointer -->
        <div
          class="absolute left-1/2 z-10 size-0 -translate-x-1/2 transform border-x-transparent transition-all duration-200"
          :class="[`-top-2.5`, { 'animate-bounce': isSpinning }]"
          :style="{
            borderLeftWidth: `${pointerWidth}px`,
            borderRightWidth: `${pointerWidth}px`,
            borderTopWidth: `${pointerHeight}px`,
            borderTopColor: '#ff4757'
          }"
        />
      </div>
    </div>
  </div>
</template>

