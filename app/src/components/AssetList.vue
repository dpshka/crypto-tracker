<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { IAsset } from "../models/coin.model";
import Asset from "./Asset.vue";

let assets = ref<IAsset[]>();

onMounted(async () => {
    try {
        const { data } = await axios.get<IAsset[]>(
            "http://localhost:5001/crypto-tracker-192f2/us-central1/server/api/v1/coin/assets",
        );
        assets.value = data;
    } catch (err) {
        console.log(err);
    }
});
</script>

<template>
    <div class="grid md:grid-cols-2 gap-4">
        <Asset v-for="asset in assets" :key="asset.id" :asset="asset" />
    </div>
</template>

<style scoped></style>
