<template>
    <div id="main-section" class="container-fluid p-0">
        <div class="container-fuid d-flex h-100" style="gap: 1.3rem;">
            <section class="col-md-2 h-100"> <!-- consegui igualar essas sections na height -->
                <div class="container-fluid">
                    <SideBar />
                </div>
            </section>
            <section class="col-md-10 h-100 d-flex justify-content-center align-items-md-center">
                <div class="col-md-9 container-request-service">
                    <RequestService />
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import SideBar from '@/components/client/SideBar.vue';
import RequestService from '@/components/client/RequestService.vue';

</script>

<style lang="scss" scoped>
@import "@css/styles.scss";

#main-section {
    height: 100vh;
}

.container-request-service {
    background-color: map-get($background-colors, amarelo);
    border-radius: 25px;
    padding: 75px;
}
</style>