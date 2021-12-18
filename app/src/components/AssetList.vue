<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { IAsset } from "../models/coin.model";
import Asset from "./Asset.vue";
import { getAuth } from "firebase/auth";
import { getHeaders } from "../helpers";
import AlertMessage from "./AlertMessage.vue";
import LoadingBar from "./LoadingBar.vue";

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

onMounted(() => {
    getAuth()
        .currentUser?.getIdToken(true)
        .then(async (token) => {
            error.value = false;

            try {
                const { data } = await axios.get<IAsset[]>(`${import.meta.env.VITE_API_URL}/coin/assets`, {
                    headers: getHeaders(token),
                });
                assets.value = data;
                filtered.value = data;
            } catch (err) {
                console.log(err);
                error.value = true;
            }
        })
        .catch(console.error);
});
</script>

<template>
    <AlertMessage v-if="error">No assets found!</AlertMessage>

    <div v-else>
        <div class="mb-8">
            <input
                v-model="search"
                @input.prevent="filterBy"
                type="search"
                placeholder="Search..."
                class="form-input w-1/2"
            />
        </div>

        <div v-if="filtered" class="grid md:grid-cols-2 gap-4">
            <Asset v-for="asset in filtered" :key="asset.id" :asset="asset" />
        </div>

        <LoadingBar v-else>Loading assets...</LoadingBar>
    </div>
</template>

<style scoped></style>
