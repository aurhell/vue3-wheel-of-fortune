<script setup lang="ts">
import { ref } from "vue"

import Tooltip from "@/components/ui/Tooltip.vue"
import { MAX_SEGMENTS } from "@/constants"

import SegmentList from "./SegmentList.vue"

import type { HexColor, Segment } from "@/types"

type Props = {
  segments: Segment[]
}

const props = defineProps<Props>()

type Emits = {
  "segment:add": [name: string]
  "segment:remove": [index: number]
  "segment:update:name": [index: number, name: string]
  "segment:update:color": [index: number, color: HexColor]
}

const emit = defineEmits<Emits>()

const newSegment = ref("")

const handleAddSegment = (): void => {
  if (newSegment.value.trim() && props.segments.length < MAX_SEGMENTS) {
    emit("segment:add", newSegment.value.trim())
    newSegment.value = ""
  }
}

const onSegmentRemove = (index: number): void => {
  emit("segment:remove", index)
}

const onSegmentUpdateName = (index: number, segment: string): void => {
  if (segment.trim()) {
    emit("segment:update:name", index, segment.trim())
  }
}

const onSegmentUpdateColor = (index: number, color: HexColor): void => {
  emit("segment:update:color", index, color)
}
</script>

<template>
  <div class="w-full rounded-3xl bg-white p-8 shadow-custom sm:p-4 md:p-6">
    <h3 class="mb-6 text-center text-2xl font-semibold text-gray-800">
      Customize Your Wheel
    </h3>

    <div class="mb-8 flex gap-2.5 md:flex-col">
      <Tooltip>
        <template #trigger>
          <input
            v-model="newSegment"
            name="newSegment"
            aria-label="New segment name"
            type="text"
            :disabled="segments.length >= MAX_SEGMENTS"
            placeholder="Enter a new option..."
            maxlength="20"
            class="w-full flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-base transition-colors duration-300 focus:border-wheel-primary focus:outline-none disabled:cursor-not-allowed"
            @keyup.enter="handleAddSegment"
          >
        </template>
        <template
          v-if="segments.length >= MAX_SEGMENTS"
          #content
        >
          You can't add more than {{ MAX_SEGMENTS }} segments
        </template>
      </Tooltip>

      <button
        :disabled="!newSegment.trim() || props.segments.length >= MAX_SEGMENTS"
        aria-label="Add a new segment button"
        class="cursor-pointer rounded-xl border-none bg-gradient-to-r from-wheel-primary to-wheel-secondary px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 md:self-start"
        @click="handleAddSegment"
      >
        Add
      </button>
    </div>

    <SegmentList
      :segments="segments"
      @segment:remove="onSegmentRemove"
      @segment:update:name="onSegmentUpdateName"
      @segment:update:color="onSegmentUpdateColor"
    />

    <p class="m-0 text-center text-sm text-gray-500">
      {{ segments.length }} segments
    </p>
  </div>
</template>
