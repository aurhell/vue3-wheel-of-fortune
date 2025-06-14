<script setup lang="ts">
import { DEFAULT_COLORS } from "@/constants"

import SegmentItem from "./SegmentItem.vue"

import type { HexColor, Segment } from "@/types"

type Props = {
  segments: Segment[]
}

const props = defineProps<Props>()

type Emits = {
  "segment:remove": [index: number]
  "segment:update:name": [index: number, segment: string]
  "segment:update:color": [index: number, color: HexColor]
}

const emit = defineEmits<Emits>()

const colors = DEFAULT_COLORS

const getSegmentColor = (index: number): string => {
  return props.segments[index].color || colors[index % colors.length]
}

const onSegmentRemove = (index: number): void => {
  emit("segment:remove", index)
}

const onSegmentUpdateName = (index: number, segment: string): void => {
  emit("segment:update:name", index, segment)
}

const onSegmentUpdateColor = (index: number, color: HexColor): void => {
  emit("segment:update:color", index, color)
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
      @segment:remove="onSegmentRemove"
      @segment:update:name="onSegmentUpdateName"
      @segment:update:color="onSegmentUpdateColor"
    />
  </div>
</template>
