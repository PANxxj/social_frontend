<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="mai-left col-span-1">
            <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
                <img src="https://i.pravatar.cc/300?img=70" alt="" class="mb-6 rounded-full" />
                <p><strong>{{ user.name }}</strong></p>
                <div class="mt-6 flex space-x-8 justify-around" v-if="user.id">
                    <RouterLink :to="{ name: 'friends', params: { id: user.id } }" class="text-ts text-gray-500">{{
                        user.friend_count }} friends</RouterLink>
                    <p class="text-ts text-gray-500">{{ user.posts_count }} posts</p>
                </div>
                <div class="mt-6" v-if="this.$store.state.user.id != user.id">
                    <button class="inline-block py-4 px-3 text-sm bg-purple-600 text-white rounded-lg"
                        @click="sentFriendShipRequest">Sent Friendship Request</button>
                    <button class="inline-block mt-4 py-4 px-3 text-sm bg-teal-600 text-white rounded-lg"
                        @click="sentDireactMessage">Sent Direct Message</button>
                </div>
                <div class="mt-6" v-if="this.$store.state.user.id == user.id">
                    <button class="inline-block py-4 px-6 text-sm bg-red-600 text-white rounded-lg"
                        @click="logout">Log Out</button>
                </div>
            </div>
        </div>

        <div class="main-center col-span-2 space-y-4">
            <div class="bg-white border bordr-gray-200 rounded-lg" v-if="this.$store.state.user.id == user.id">
                <form method="post" v-on:submit.prevent="submitForm">
                    <div class="p-4">
                        <textarea v-model=body name="" id="" cols="30" rows="5" class="p-4 w-full bg-gray-100 rounded-lg"
                            placeholder="lets post...."></textarea>
                    </div>
                    <div class="p-4 border-t border-gray-100 flex justify-between">
                        <a href="#" class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg">Attach image</a>
                        <button class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">Post</button>
                    </div>
                </form>
            </div>

            <div class="p-4 bg-white border border-gray-200 rounded-lg" v-for="post in posts" :key="post.id">
                <!-- <div class="mb-6 flex items-center justify-between">
                    <div class="flex items-center space-x-6">
                        <img src="https://i.pravatar.cc/300?img=70" alt="" class="w-[40px] rounded-full" />
                        <p><strong>{{ post.created_by.name }}</strong></p>
                    </div>
                    <p class="text-gray-600">{{ post.created_at_formatted }}</p>
                </div>

                
                <p>{{ post.body }}</p>

                <div class="my-6 flex justify-between">
                    <div class="flex space-x-6">
                        <div class="flex items-center space-x-2" @click="likePost(post.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <span class="text-gray-500 text-xs" >{{ post.like_count }} Likes</span>
                        </div>

                        <div class="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                            </svg>

                            <span class="text-gray-500 text-xs">0 Comments</span>
                        </div>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </div>
                </div> -->
                <FeedItem :post="post"/>
            </div>
        </div>
        <div class="main-right col-span-1 space-y-4">
            <PeopleYouMayKnow />
            <Trends />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import PeopleYouMayKnow from '../components/PeopleYouMayKnow.vue'
import Trends from '../components/Trends.vue'
import FeedItem from '../components/FeedItem.vue'

export default {
    name: 'ProfileView',
    components: {
        PeopleYouMayKnow,
        Trends,
        FeedItem
    },
    data() {

        return {
            posts: [],
            user: {
                id:null
            },
            body: ''
        }
    },
    mounted() {
        this.getFeed()
    },
    // beforeRouteUpdate(to ,from ,next){
    //     console.log(from,'frp and to',to);
    //     if (from.name===to.name){
    //         console.log(from,'frp and to',to);
    //         this.getFeed()
    //     }
    // },
    watch: {
        '$route.params.id': {
            handler: function () {
                console.log('saddfdf');
                this.getFeed()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        getFeed() {
            axios.get(`api/post_on_profile/${this.$route.params.id}`)
                .then(response => {
                    this.posts = response.data.post
                    this.user = response.data.user
                    console.log('responser data', response.data);
                    console.log('responser id', this.user.id);
                    console.log('responser store id', this.$store.state.user.id);
                })
                .catch(error => {
                    console.log('errorrororor', error);
                })
        },
        submitForm() {
            axios.post('api/post_create', {
                'body': this.body
            })
                .then(response => {
                    console.log(response);
                    this.getFeed()
                    this.body = ''
                })
                .catch(error => {
                    console.log(error);
                })

        },
        sentFriendShipRequest() {
            axios.post(`api/friends/request/${this.$route.params.id}`)
                .then(response => {
                    // this.posts=response.data.post
                    // this.user=response.data.user
                    console.log('responser data', response.data);
                    if (response.data == 'request already exit') {
                        this.$store.dispatch('showToast', { 'ms': 5000, 'message': 'Request has already been sent ', 'classes': 'bg-red-300' })
                    }
                    else {
                        this.$store.dispatch('showToast', { 'ms': 5000, 'message': 'Request hs been sent', 'classes': 'bg-emerald-500' });
                    }

                })
                .catch(error => {
                    console.log('errorrororor', error);
                })

        },
        logout(){
            this.$store.dispatch('removeToken')
            this.$router.push('/log-in')
        },
        likePost(id){
            axios.post(`api/post/like/${id}`)
            .then(response =>{
                console.log('respomse...//',response.data);
            })
            .catch(error=>{
                console.log('error...//',error);
            })

        },
        sentDireactMessage(){
            axios.post(`api/chat/get_or_create/${this.$route.params.id}`)
            .then(response =>{
                this.$router.push('/chat')
            })
            .catch(error=>{
                console.log('error...//',error);
            })
        }
    }
}
</script>