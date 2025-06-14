<script setup lang="ts">
import { DEFAULT_COLORS } from "@/constants"

import SegmentItem from "./SegmentItem.vue"

import type { Segment } from "@/types"

type Props = {
  segments: Segment[]
}

const props = defineProps<Props>()

type Emits = {
  removeSegment: [index: number]
  "update:name": [index: number, segment: string]
  "update:color": [index: number, color: string]
}

const emit = defineEmits<Emits>()

const colors = DEFAULT_COLORS

const getSegmentColor = (index: number): string => {
  return colors[index % colors.length]
}

const handleRemove = (index: number): void => {
  emit("removeSegment", index)
}

const handleUpdateSegment = (index: number, segment: string): void => {
  emit("update:name", index, segment)
}

const handleUpdateColor = (index: number, color: string): void => {
  emit("update:color", index, color)
}
</script>

<template>
  <div class="mb-4 grid gap-2.5">
    <SegmentItem
      v-for="(segment, index) in props.segments"
      :key="index"
      :segment="segment"
      :index="index"
      :color="getSegmentColor(index)"
      @remove="handleRemove"
      @update:name="handleUpdateSegment"
      @update:color="handleUpdateColor"
    />
  </div>
</template>
