<script setup>
import CenteredBlogCard from "@/examples/cards/blogCards/CenteredBlogCard.vue";
import house1 from "@/assets/img/house1.jpg";

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
    <!-- class="front front-background" -->
    <div
        :style="{
            // backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
        }"
    >
        <div class="card-body py-7 text-center">
            <CenteredBlogCard :image="house1" :title="aptAddress" :description="apartmentName" />
        </div>
    </div>
</template>
