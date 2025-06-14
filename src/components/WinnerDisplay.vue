<script setup lang="ts">
type Props = {
  winner: string
  isVisible: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    v-if="winner"
    class="mb-8 translate-y-5 rounded-3xl bg-white p-8 text-center opacity-0 shadow-custom transition-all duration-500 ease-out"
    :class="{ 'translate-y-0 opacity-100': isVisible }"
  >
    <h2 class="mb-4 text-3xl font-bold text-gray-800">
      🎉 Winner!
    </h2>
    <p class="gradient-text text-2xl font-semibold text-gray-600">
      {{ winner }}
    </p>
  </div>
</template>
