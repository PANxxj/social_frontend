
<template>
    <div v-if="this.$store.state.toast.isVisible"
        class="trasition ease-in-out delay-500 duration-500 px-6 py-6 fixed top-full right-8 rounded-xl shadow-xl"
        :class="this.$store.state.toast.classes">{{this.$store.state.toast.message }}

    </div>
</template>