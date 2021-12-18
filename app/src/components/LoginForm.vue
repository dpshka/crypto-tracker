<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const username = ref("");
const password = ref("");

const submitForm = async () => {
    if (!isFormValid()) {
        return;
    }

    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
            username: username.value,
            password: password.value,
        });
    } catch (err) {
        console.error(err);
    }
};

const isFormValid = () => {
    return username.value?.length > 3 && password.value;
};
</script>

<template>
    <div class="max-w-lg mx-auto px-4">
        <div class="flex flex-col rounded-lg border-1">
            <div class="bg-gray-200 p-4 font-light text-xl">Login to your account</div>

            <div class="p-6 md:p-10">
                <form @submit.prevent="submitForm" class="flex flex-col space-y-4">
                    <input v-model="username" type="text" class="form-input" placeholder="Username" />

                    <input v-model="password" type="password" class="form-input" placeholder="Password" />

                    <button :disabled="!isFormValid()" type="submit" class="btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>
