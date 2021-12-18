<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import AssetList from "./components/AssetList.vue";
import LoginForm from "./components/LoginForm.vue";

const user = ref<User | null>();
const auth = getAuth();

const logout = async (event: Event) => await auth.signOut();

onMounted(() => {
    onAuthStateChanged(auth, (u) => (user.value = u));
});
</script>

<template>
    <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="text-center font-bold text-4xl mb-10">Crypto Tracker</div>

        <div v-if="user">
            <button @click.prevent="logout" class="btn-primary mb-8">Logout</button>
            <AssetList />
        </div>

        <LoginForm v-else />
    </div>
</template>

<style></style>
