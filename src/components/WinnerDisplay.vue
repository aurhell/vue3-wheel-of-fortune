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
    class="w-full translate-y-5 rounded-3xl bg-white p-8 text-center opacity-0 shadow-custom transition-all duration-500 ease-out"
    :class="{ 'translate-y-0 opacity-100': isVisible }"
  >
    <h2 class="mb-4 text-3xl font-bold text-gray-800">
      🎉 Winner!
    </h2>
    <p class="text-4xl font-semibold">
      {{ winner }}
    </p>
  </div>
</template>
