<script setup>
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import MapFilter from "./Sections/MapFilter.vue";
import RightContent from "./Sections/RightContent.vue";
import MapContent from "./Sections/MapContent.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

const checks = ["Hospital", "Subway", "BookMark"];
const conditions = ["Amount", "Popular", "Area"];
</script>
<template>
    <div class="position-sticky z-index-sticky top-0">
        <div class="row" style="padding-right: 0">
            <div class="bg-white col-12">
                <NavbarDefault light />
                <MapFilter />
            </div>
        </div>
        <div class="row">
            <div class="col-8 mt-3">
                <MapContent class="shadow-sm ms-3 text-center" />
            </div>
            <div class="col-4 mt-3">
                <RightContent />
            </div>
        </div>
        <FooterDefault />
    </div>
</template>
