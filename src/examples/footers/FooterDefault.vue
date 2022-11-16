<script setup>
import logoDark from "@/assets/img/logo-ct-dark.png";
import houseLogo from "@/assets/img/house-logo.jpg";
defineProps({
    brand: {
        type: Object,
        name: String,
        logo: String,
        route: "",
        default: () => ({
            name: "SSAFY",
            logo: houseLogo,
            route: "/",
        }),
    },
    socials: {
        type: Array,
        icon: String,
        link: String,
        default: () => [
            {
                icon: '<i class="fab fa-facebook text-lg opacity-8"></i>',
                link: "#",
            },
            {
                icon: '<i class="fab fa-instagram text-lg opacity-8"></i>',
                link: "#",
            },
            {
                icon: '<i class="fab fa-github text-lg opacity-8"></i>',
                link: "#",
            },
            {
                icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
                link: "#",
            },
        ],
    },
    menus: {
        type: Array,
        name: String,
        items: {
            type: Array,
            name: String,
            href: String,
        },
        // default: () => [
        //     {
        //         name: "company",
        //         items: [
        //             {
        //                 name: "about us",
        //                 href: "https://www.creative-tim.com/presentation",
        //             },
        //             {
        //                 name: "freebies",
        //                 href: "https://www.creative-tim.com/templates/free",
        //             },
        //             {
        //                 name: "premium tools",
        //                 href: "https://www.creative-tim.com/templates/premium",
        //             },
        //             { name: "blog", href: "https://www.creative-tim.com/blog" },
        //         ],
        //     },
        // ],
    },
});
</script>
<template>
    <footer class="footer pt-3 mt-4">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div>
                        <a :href="brand.route">
                            <img :src="brand.logo" class="mb-3 footer-logo" alt="main_logo" />
                        </a>
                        <h6 class="font-weight-bolder mb-4">{{ brand.name }}</h6>
                    </div>
                    <div>
                        <ul class="d-flex flex-row ms-n3 nav">
                            <li class="nav-item" v-for="{ icon, link } of socials" :key="link">
                                <a class="nav-link pe-1" :href="link" target="_blank" v-html="icon"> </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-2 col-sm-6 col-6 mb-4" v-for="{ name, items } of menus" :key="name">
                    <h6 class="text-sm">{{ name }}</h6>
                    <ul class="flex-column ms-n3 nav">
                        <li class="nav-item" v-for="item of items" :key="item.name">
                            <a class="nav-link" :href="item.href" target="_blank">
                                {{ item.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="col-12">
                    <div class="text-center">
                        <p class="text-dark mb-4 text-sm font-weight-normal">
                            {{ new Date().getFullYear() }}
                            ©
                            <a href="https://www.creative-tim.com" target="_blank">SSAFY</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
