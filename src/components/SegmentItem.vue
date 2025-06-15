<script setup lang="ts">
import { ref } from "vue"

import Tooltip from "@/components/ui/Tooltip.vue"
import { MIN_SEGMENTS } from "@/constants"

import type { HexColor, Segment } from "@/types"

type Props = {
  segment: Segment
  index: number
  color: string
  canRemove?: boolean
}

const props = defineProps<Props>()

type Emits = {
  "segment:remove": [index: number]
  "segment:update:name": [index: number, name: string]
  "segment:update:color": [index: number, color: HexColor]
}

const emit = defineEmits<Emits>()

const onSegmentRemove = (): void => {
  emit("segment:remove", props.index)
}

const segmentInput = ref<HTMLInputElement | null>(null)
const segmentText = ref(props.segment.name)
const isEditing = ref(false)

const edit = () => {
  isEditing.value = true
  setTimeout(() => {
    segmentInput.value?.focus()
  }, 0)
}

const handleEdit = (): void => {
  if (!isEditing.value) return
  isEditing.value = false
  emit("segment:update:name", props.index, segmentText.value.trim())
}

const handleColorChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit("segment:update:color", props.index, target.value as HexColor)
}
</script>

<template>
  <div
    class="flex items-center justify-between rounded-xl border-l-4 bg-gray-50 px-4 py-3 transition-all duration-300 hover:translate-x-1 hover:bg-gray-100"
    :style="{ borderLeftColor: color }"
  >
    <Tooltip
      class="flex-1"
      @dblclick="edit"
    >
      <template #trigger>
        <input
          ref="segmentInput"
          v-model="segmentText"
          name="segmentName"
          aria-label="Segment name"
          type="text"
          class="flex-1 bg-transparent text-base font-medium text-gray-800 outline-none"
          :class="{
            'border-b-2 border-gray-300 focus:border-wheel-primary': isEditing,
            'cursor-default': !isEditing
          }"
          :readonly="!isEditing"
          :placeholder="isEditing ? 'Edit segment...' : 'Double-click to edit'"
          @blur="handleEdit"
          @keyup.enter="isEditing ? handleEdit() : edit()"
          @keyup.esc="handleEdit"
        >
      </template>
      <template #content>
        Double-click to edit
      </template>
    </Tooltip>

    <div class="flex items-center gap-2">
      <Tooltip>
        <template #trigger>
          <input
            type="color"
            aria-label="Segment color"
            :value="color"
            class="size-8 cursor-pointer bg-transparent transition-transform duration-200 hover:scale-110"
            @input="handleColorChange"
          >
        </template>
        <template #content>
          Change color
        </template>
      </Tooltip>

      <Tooltip>
        <template #trigger>
          <button
            :class="[
              'flex size-6 cursor-pointer items-center justify-center rounded-full border-none bg-wheel-red text-base font-bold text-white transition-all duration-300 hover:scale-110 hover:bg-wheel-red-hover',
              { 'cursor-not-allowed opacity-50 hover:scale-100 hover:bg-wheel-red': !props.canRemove }
            ]"
            :disabled="!props.canRemove"
            title="Remove"
            aria-label="Remove segment button"
            @click="onSegmentRemove"
          >
            ×
          </button>
        </template>
        <template #content>
          {{ props.canRemove ? 'Click to remove segment' : `You cannot have less than ${MIN_SEGMENTS} segments` }}
        </template>
      </Tooltip>
    </div>
  </div>
</template>
