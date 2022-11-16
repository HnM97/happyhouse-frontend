<script setup>
import RotatingCard from "../../../examples/cards/rotatingCards/RotatingCard.vue";
import RotatingCardFront from "../../../examples/cards/rotatingCards/RotatingCardFront.vue";
import RotatingCardBack from "../../../examples/cards/rotatingCards/RotatingCardBack.vue";
import aptData from "@/assets/data/AptData";

const aptList = aptData;
</script>
<template>
  <div class="card box-shadow overflow-hidden">
    <div class="row justify-content-evenly">
      <div class="col-5">
        <RotatingCard>
          <RotatingCardFront
            image="https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            :aptAddress="aptList[0].aptCode"
            :apartmentName="aptList[0].apartmentName"
          />
          <RotatingCardBack
            image="https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80"
            title="Discover More"
            description="You will save a lot of time going from prototyping to full-functional
                code because all elements are implemented."
            :action="[
              {
                route: './/sections/page-sections/hero-sections.html',
                label: 'Start with Headers',
              },
            ]"
          />
        </RotatingCard>
      </div>
      <div class="col-5 border">
        <RotatingCard>
          <RotatingCardFront
            image="https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            :aptAddress="aptList[1].aptCode"
            :apartmentName="aptList[1].apartmentName"
          />

          <RotatingCardBack
            image="https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80"
            title="Discover More"
            description="You will save a lot of time going from prototyping to full-functional
                code because all elements are implemented."
            :action="[
              {
                route: './/sections/page-sections/hero-sections.html',
                label: 'Start with Headers',
              },
            ]"
          />
        </RotatingCard>
      </div>
    </div>
    <div class="row justify-content-evenly">
      <div class="col-5">
        <RotatingCard>
          <RotatingCardFront
            image="https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            :aptAddress="aptList[2].aptCode"
            :apartmentName="aptList[2].apartmentName"
          />

          <RotatingCardBack
            image="https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80"
            title="Discover More"
            description="You will save a lot of time going from prototyping to full-functional
                code because all elements are implemented."
            :action="[
              {
                route: './/sections/page-sections/hero-sections.html',
                label: 'Start with Headers',
              },
            ]"
          />
        </RotatingCard>
      </div>
      <div class="col-5 border">
        <RotatingCard>
          <RotatingCardFront
            image="https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            :aptAddress="aptList[3].aptCode"
            :apartmentName="aptList[3].apartmentName"
          />

          <RotatingCardBack
            image="https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80"
            title="Discover More"
            description="You will save a lot of time going from prototyping to full-functional
                code because all elements are implemented."
            :action="[
              {
                route: './/sections/page-sections/hero-sections.html',
                label: 'Start with Headers',
              },
            ]"
          />
        </RotatingCard>
      </div>
    </div>
  </div>
</template>
