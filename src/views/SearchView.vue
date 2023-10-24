<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="mian-left col-span-3 space-y-4 ">
            <div class="bg-white border bordr-gray-200 rounded-lg">
                <form v-on:submit.prevent="submitForm" class="p-4 flex space-x-4">
                    <input v-model="query"  type="search" class="p-4 w-full bg-gray-100 rounded-lg"
                        placeholder="What are you looking for...">
                    <button class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </form>
            </div>
            <div class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-4 gap-4" v-if="users[0]">
                <div class="p-4 bg-gray-100 text-center rounded-lg"
                v-for="user in users"
                :key="user.id">

                    <img src="https://i.pravatar.cc/300?img=70" alt="" class="mb-6 rounded-full" />
                    <p><strong>
                        <RouterLink :to="{name:'profile',params:{'id':user.id}}" >{{ user.name }}</RouterLink>
                    </strong></p>
                    <div class="mt-6 flex space-x-8 justify-around">
                        <p class="text-ts text-gray-500">{{ user.friend_count }} friends</p>
                        <p class="text-ts text-gray-500">{{ user.posts_count }} posts</p>
                    </div>
                </div>
                
            </div>
            <div class="p-4 bg-white border border-gray-200 rounded-lg"
                    v-for="post in posts"
                    :key="post.id">
                <FeedItem :post="post"/>
            </div> 
        </div>
        <div class="main-right col-span-1 space-y-4">
            <PeopleYouMayKnow/>
            <Trends/>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import PeopleYouMayKnow from '../components/PeopleYouMayKnow.vue'
import Trends from '../components/Trends.vue'
import FeedItem from '../components/Trends.vue'
export default{
    name:'SearchView',
    components:{
        PeopleYouMayKnow,
        Trends,
        FeedItem
    },
    data(){
        return {
            query:'',
            users:[],
            posts:[]
        }
    },
    methods:{
        async submitForm(){
            await axios.post('api/search',{
                query:this.query
            })
            .then(reponse=>{
                console.log('response',reponse.data);
                this.users=reponse.data.users
                this.posts=reponse.data.posts

            })
            .catch(error=>{
                console.log(error);
            })
        }
    }
}
</script>