<script setup></script>
<template>
    <div class="rotating-card-container">
        <div class="card card-rotate card-background shadow-dark mt-md-0 mt-5" :aptList="aptList">
            <slot />
        </div>
    </div>
</template>
