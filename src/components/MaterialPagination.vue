<script setup>
defineProps({
  color: {
    type: String,
    default: "dark",
  },
  size: {
    type: String,
    default: "",
  },
});
function getClasses(color, size) {
  let colorValue, sizeValue;

  colorValue = color && `pagination-${color}`;
  sizeValue = size && `pagination-${size}`;

  return `${colorValue} ${sizeValue}`;
}
</script>
<template>
  <ul class="pagination m-auto" :class="getClasses(color, size)">
    <slot />
  </ul>
</template>
