<script setup lang="ts">
import { ref } from "vue"

import type { Segment } from "@/types"

type Props = {
  segment: Segment
  index: number
  color: string
}

const props = defineProps<Props>()

type Emits = {
  remove: [index: number]
  "update:name": [index: number, name: string]
  "update:color": [index: number, color: string]
}

const emit = defineEmits<Emits>()

const handleRemove = (): void => {
  emit("remove", props.index)
}

const segmentInput = ref<HTMLInputElement | null>(null)
const segmentText = ref(props.segment.name)
const isEditing = ref(false)

const edit = () => {
  isEditing.value = true
  setTimeout(() => {
    segmentInput.value?.focus()
    segmentInput.value?.setSelectionRange(0, segmentInput.value.value.length)
  }, 0)
}

const handleEdit = (): void => {
  isEditing.value = false
  emit("update:name", props.index, segmentText.value.trim())
}

const handleColorChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit("update:color", props.index, target.value)
}
</script>

<template>
  <div
    class="flex items-center justify-between rounded-xl border-l-4 bg-gray-50 px-4 py-3 transition-all duration-300 hover:translate-x-1 hover:bg-gray-100"
    :style="{ borderLeftColor: color }"
  >
    <div
      class="group relative flex-1"
      @dblclick="edit"
    >
      <input
        ref="segmentInput"
        v-model="segmentText"
        type="text"
        class="flex-1 bg-transparent text-base font-medium text-gray-800 outline-none"
        :class="{
          'border-b-2 border-gray-300 focus:border-wheel-primary': isEditing,
          'cursor-default': !isEditing
        }"
        :readonly="!isEditing"
        :placeholder="isEditing ? 'Edit segment...' : 'Double-click to edit'"

        @blur="handleEdit"
        @keyup.enter="handleEdit"
        @keyup.esc="handleEdit"
      >

      <div class="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
        Double-click to edit
        <div class="absolute left-1/2 top-full size-0 -translate-x-1/2 transform border-x-2 border-t-2 border-transparent border-t-gray-900" />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <!-- Color picker -->
      <div class="group relative">
        <input
          type="color"
          :value="color"
          class="size-8 cursor-pointer rounded-full border-2 border-white shadow-md transition-transform duration-200 hover:scale-110"
          @input="handleColorChange"
        >

        <!-- Color picker tooltip -->
        <div class="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
          Click to change color
          <div class="absolute left-1/2 top-full size-0 -translate-x-1/2 transform border-x-2 border-t-2 border-transparent border-t-gray-900" />
        </div>
      </div>

      <div class="group relative">
        <button
          class="flex size-6 cursor-pointer items-center justify-center rounded-full border-none bg-wheel-red text-base font-bold text-white transition-all duration-300 hover:scale-110 hover:bg-wheel-red-hover"
          title="Remove"
          @click="handleRemove"
        >
          ×
        </button>
        <div class="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
          Click to remove segment
          <div class="absolute left-1/2 top-full size-0 -translate-x-1/2 transform border-x-2 border-t-2 border-transparent border-t-gray-900" />
        </div>
      </div>
    </div>
  </div>
</template>
