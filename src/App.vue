<template>
  <nav class="py-10 px-8 border-b border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="menu-left">
          <a href="/" class="text-xl">Social</a>
        </div>
        <div class="menu-center flex space-x-12" v-if="this.$store.state.user.isAuthenticated">
          <RouterLink to="/feed" class="text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </RouterLink>
          <RouterLink to="/chat">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>

          </RouterLink >
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>

          </a>
          <RouterLink to="/search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

          </RouterLink>
        </div>
        <div class="menu-right">
          <template v-if="this.$store.state.user.isAuthenticated">
            <RouterLink :to="{name:'profile',params:{'id':this.$store.state.user.id}}">
              <img src="https://i.pravatar.cc/300?img=70" alt="" class="rounded-full" height="40" width="40">
            </RouterLink >
          </template>
          <template v-else>
            <RouterLink to="/log-in" class="mr-4 py-4 px-6 bg-gray-600 text-white rounded-lg">Log in</RouterLink>
            <RouterLink to="/sign-up" class="py-4 px-6 bg-purple-600 text-white rounded-lg">Sign Up</RouterLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
  <main class="px-8 py-6 bg-gray-100">

    <RouterView />
  </main>
  <Toast/>
</template>

<script>
import Toast from '@/components/Toast.vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
export default {
  data(){

  },
  components:{
    Toast,
    RouterLink
},
  beforeCreate() {
    this.$store.dispatch('initStore')

    const token=this.$store.state.user.access

    if (token){
      axios.defaults.headers.common['Authorization']="Bearer "+token

    }
    else {
      axios.defaults.headers.common['Authorization']=""
    }
  }
}

</script>
