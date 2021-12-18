<script setup lang="ts">
import { ref } from "vue";

const search = ref("");
const sort = ref("cmc_rank");
const order = ref("asc");
</script>

<template>
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div class="flex-grow">
            <input
                v-model="search"
                @input.prevent="$emit('search', search)"
                type="search"
                placeholder="Search..."
                class="form-input w-full md:w-3/4"
            />
        </div>

        <div class="flex items-center space-x-4">
            <select v-model="sort" @change="$emit('sort', sort, order)" class="form-input">
                <option value="cmc_rank">by CMC rank</option>
                <option value="name">by name</option>
                <option value="circulating_supply">by circulating supply</option>
                <option value="date_added">by date added</option>
                <option value="quote.market_cap">by market cap</option>
                <option value="quote.price">by price</option>
                <option value="quote.percent_change_24h">by change 24h</option>
                <option value="quote.percent_change_7d">by change 7d</option>
            </select>

            <div class="flex space-x-4">
                <div>
                    <input
                        v-model="order"
                        @change="$emit('sort', sort, order)"
                        type="radio"
                        id="order-asc"
                        value="asc"
                    />
                    <label for="order-asc" class="ml-2">ASC</label>
                </div>

                <div>
                    <input
                        v-model="order"
                        @change="$emit('sort', sort, order)"
                        type="radio"
                        id="order-desc"
                        value="desc"
                    />
                    <label for="order-desc" class="ml-2">DESC</label>
                </div>
            </div>
        </div>
    </div>
</template>
