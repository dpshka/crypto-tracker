<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { getHeaders } from "../helpers";
import { IAsset } from "../models/coin.model";
import Asset from "./Asset.vue";
import AlertMessage from "./AlertMessage.vue";
import LoadingBar from "./LoadingBar.vue";
import Pagination from "./Pagination.vue";

let assets = ref<IAsset[]>();
let filtered = ref<IAsset[]>();
const search = ref("");
const error = ref(false);

const filterBy = (event: Event) => {
    filtered.value = assets.value?.filter((asset) => {
        const searchString = search.value.toLowerCase();

        return asset.name.toLowerCase().includes(searchString) || asset.symbol.toLowerCase().includes(searchString);
    });
};

const getAssets = (start = 0, limit = 50) => {
    getAuth()
        .currentUser?.getIdToken(true)
        .then(async (token) => {
            error.value = false;

            try {
                const { data } = await axios.get<IAsset[]>(`${import.meta.env.VITE_API_URL}/coin/assets`, {
                    headers: getHeaders(token),
                    params: { start: start * limit + 1, limit },
                });
                assets.value = data;
                filtered.value = data;
            } catch (err) {
                console.log(err);
                error.value = true;
            }
        })
        .catch(console.error);
};

onMounted(() => {
    getAssets();
});
</script>

<template>
    <AlertMessage v-if="error">No assets found!</AlertMessage>

    <div v-else>
        <input
            v-model="search"
            @input.prevent="filterBy"
            type="search"
            placeholder="Search..."
            class="form-input w-full md:w-1/2 mb-6"
        />

        <Pagination @update="getAssets" />

        <div v-if="filtered" class="grid md:grid-cols-2 gap-4">
            <Asset v-for="asset in filtered" :key="asset.id" :asset="asset" />
        </div>

        <LoadingBar v-else>Loading assets...</LoadingBar>
    </div>
</template>
