<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AlertMessage from "./AlertMessage.vue";

const email = ref("");
const password = ref("");
const error = ref(false);

const submitForm = async () => {
    if (!isFormValid()) {
        return;
    }

    error.value = false;

    try {
        await signInWithEmailAndPassword(getAuth(), email.value, password.value);
    } catch (err) {
        error.value = true;
    }
};

const isFormValid = () => {
    return email.value && password.value;
};
</script>

<template>
    <div class="max-w-lg mx-auto px-4">
        <div class="flex flex-col rounded-lg border-1">
            <div class="bg-gray-200 p-4 font-light text-xl">Login to your account</div>

            <div class="p-6 md:p-10">
                <AlertMessage v-show="error">Failed to login :P</AlertMessage>

                <form @submit.prevent="submitForm" class="flex flex-col space-y-4">
                    <input v-model="email" type="email" class="form-input" placeholder="Email address" />

                    <input v-model="password" type="password" class="form-input" placeholder="Password" />

                    <button :disabled="!isFormValid()" type="submit" class="btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>
