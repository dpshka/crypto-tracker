<script setup lang="ts">
import { ref } from "vue";

const search = ref("");
</script>

<template>
    <div>
        <input
            v-model="search"
            @input.prevent="$emit('filter', search)"
            type="search"
            placeholder="Search..."
            class="form-input w-full md:w-1/2 mb-6"
        />
    </div>
</template>
