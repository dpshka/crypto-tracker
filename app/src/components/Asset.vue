<script setup lang="ts">
import { computed } from "vue";
import { IAsset } from "../models/coin.model";

const props = defineProps<{ asset: IAsset }>();
const quote = props.asset.quote["USD"];

const toReadableNumber = (num: number) => {
    return num.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const changeColor = computed(() => {
    return quote.percent_change_24h < 0 ? "text-red-500" : "text-green-500";
});
</script>

<template>
    <div class="asset">
        <div class="flex items-center space-x-4">
            <div v-show="asset.icon" class="w-10">
                <img :src="asset.icon" :alt="asset.name" />
            </div>

            <div class="asset-name">
                {{ asset.name }}
            </div>

            <div class="asset-symbol">
                {{ asset.symbol }}
            </div>

            <div :class="changeColor" class="asset-price">
                <div class="font-semibold">
                    $
                    {{ toReadableNumber(quote.price) }}
                </div>
                <div :class="changeColor">{{ toReadableNumber(quote.percent_change_24h) }} %</div>
            </div>
        </div>

        <div class="asset-details">
            Market cap: <span>$ {{ toReadableNumber(quote.market_cap) }}</span>
        </div>

        <div class="asset-details">
            Circulating supply: <span>{{ toReadableNumber(asset.circulating_supply) }} {{ asset.symbol }}</span>
        </div>

        <div class="asset-details italic text-right">
            Last updated: {{ new Date(asset.last_updated).toLocaleString() }}
        </div>
    </div>
</template>

<style scoped>
.asset {
    @apply flex-col space-y-2 bg-white rounded-lg shadow-md border border-gray-100 p-4 transition-colors duration-300;
}

.asset:active,
.asset:focus,
.asset:hover {
    @apply cursor-pointer bg-gray-50;
}

.asset-name {
    @apply font-semibold text-xl;
}

.asset-symbol {
    @apply font-light text-lg text-gray-400;
}

.asset-price {
    @apply flex-grow flex-col text-right justify-end;
}

.asset-details {
    @apply text-sm text-gray-400 capitalize;
}

.asset-details > span {
    @apply font-semibold text-gray-900;
}
</style>
