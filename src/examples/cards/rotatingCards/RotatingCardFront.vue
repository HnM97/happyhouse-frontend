<script setup>
import CenteredBlogCard from "@/examples/cards/blogCards/CenteredBlogCard.vue";

defineProps({
  image: {
    type: String,
    required: true,
  },
  aptAddress: {
    type: String,
    default: "서울",
  },
  apartmentName: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div
    class="front front-background"
    :style="{
      // backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
    }"
  >
    <div class="card-body py-7 text-center">
      <CenteredBlogCard
        image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        :title="aptAddress"
        :description="apartmentName"
      />
    </div>
  </div>
</template>
