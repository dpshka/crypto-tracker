<script setup lang="ts">
import { IAsset } from "../models/coin.model";

defineProps<{ asset: IAsset }>();

const toReadableNumber = (num: number) => {
    return num.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
</script>

<template>
    <div class="asset">
        <div v-show="asset.icon" class="w-10">
            <img :src="asset.icon" :alt="asset.name" />
        </div>

        <div class="asset-name">
            {{ asset.name }}
        </div>

        <div class="asset-id">
            {{ asset.asset_id }}
        </div>

        <div class="asset-price">
            <div class="font-semibold">
                $
                {{ toReadableNumber(asset.price_usd) }}
            </div>
            <!-- <div>{{ toReadableNumber(asset.volume_1mth_usd) }}</div> -->
        </div>
    </div>
</template>

<style scoped>
.asset {
    @apply flex items-center space-x-4 bg-white rounded-lg shadow-md border border-gray-100 p-4;
}

.asset-name {
    @apply font-semibold text-xl md:text-2xl;
}

.asset-id {
    @apply font-light text-xl text-gray-400;
}

.asset-price {
    @apply flex-grow flex-col text-right justify-end;
}
</style>
