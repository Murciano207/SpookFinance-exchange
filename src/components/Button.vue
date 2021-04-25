<template>
    <button
        :class="{ primary }"
    >
        <LoadingIndicator v-if="loading" />
        {{ text }}
    </button>
</template>

<script>
import { defineComponent } from 'vue';

import LoadingIndicator from '@/components/LoadingIndicator.vue';

export default defineComponent({
    components: {
        LoadingIndicator,
    },
    props: {
        text: {
            type: String,
            required: true,
        },
        primary: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style scoped>
button {
    height: var(--block-height);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-large);
    font-weight: bold;
    color: var(--text-primary);
    background: var(--background-control);
    border: 1px solid var(--border);
    border-radius: var(--border-radius-medium);
    cursor: pointer;
}

button:hover {
    background: var(--background-primary);
}

button.primary {
    border: none;
    border-radius: 2rem;
    background-color: var(--btn-bg);
    color: var(--btn-font);
    transition: .1s background ease-out;
}

button.primary:hover {
    color: #fff;
    background-color: #59b566;
}

button.primary:active {
    background-color: #02566f;
}

button:disabled,
button:disabled:hover {
    opacity: 0.35;
    cursor: not-allowed;
}
</style>
