<template>
  <!-- Color picker -->
  <div class="group relative">
    <slot name="trigger" />

    <div
      v-if="$slots.content"
      class="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100"
    >
      <slot name="content" />
      <div class="absolute left-1/2 top-full size-0 -translate-x-1/2 transform border-x-2 border-t-2 border-transparent border-t-gray-900" />
    </div>
  </div>
</template>
