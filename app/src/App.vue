<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

import AssetList from "./components/AssetList.vue";
import LoginForm from "./components/LoginForm.vue";

const user = ref("");

onMounted(async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`);
        user.value = data;
    } catch (err) {
        console.error(err);
    }
});
</script>

<template>
    <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="text-center font-bold text-4xl mb-10">Crypto Tracker</div>

        <AssetList v-if="user" />

        <LoginForm v-else />
    </div>
</template>

<style></style>
