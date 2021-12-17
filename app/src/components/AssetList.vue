<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { IAsset } from "../models/coin.model";
import Asset from "./Asset.vue";

let assets = ref<IAsset[]>();
let filtered = ref<IAsset[]>();
const search = ref("");

const filterBy = (event: Event) => {
    filtered.value = assets.value?.filter((asset) => {
        const searchString = search.value.toLowerCase();

        return asset.name.toLowerCase().includes(searchString) || asset.symbol.toLowerCase().includes(searchString);
    });
};

onMounted(async () => {
    try {
        const { data } = await axios.get<IAsset[]>(`${import.meta.env.VITE_API_URL}/coin/assets`);
        assets.value = data;
        filtered.value = data;
    } catch (err) {
        console.log(err);
    }
});
</script>

<template>
    <div class="mb-8">
        <input
            v-model="search"
            @input.prevent="filterBy"
            type="search"
            placeholder="Search..."
            class="rounded-lg border-1 border-gray-400 w-1/2"
        />
    </div>

    <div class="grid md:grid-cols-2 gap-4">
        <Asset v-for="asset in filtered" :key="asset.id" :asset="asset" />
    </div>
</template>

<style scoped></style>
