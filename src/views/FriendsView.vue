<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="mai-left col-span-1">
            <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
                <img src="https://i.pravatar.cc/300?img=70" alt="" class="mb-6 rounded-full" />
                <p><strong>{{ user.name }}</strong></p>
                <div class="mt-6 flex space-x-8 justify-around">
                    <p class="text-ts text-gray-500">{{ user.friend_count }} friends</p>
                    <p class="text-ts text-gray-500">{{ user.posts_count }} posts</p>
                </div>

            </div>
        </div>
        <!-- <hr> -->

        <div class="main-center col-span-2 space-y-4">
            <div class="p-4 bg-white border border-gray-200 rounded-lg " v-if="friendshipRequest[0]">
                <h2 class="mb-6 text-xl ">Friendship requests</h2>
                <div class="p-4 bg-gray-100 text-center rounded-lg" v-for="friendship in friendshipRequest"
                    :key="friendship.id">

                    <img src="https://i.pravatar.cc/100?img=70" alt="" class="mb-6 mx-auto rounded-full" />
                    <p><strong>
                            <RouterLink :to="{ name: 'profile', params: { 'id': friendship.id } }">{{ friendship.created_by.name }}
                            </RouterLink>
                        </strong></p>
                    <div class="mt-6 flex space-x-8 justify-around">
                        <p class="text-ts text-gray-500">{{ user.friend_count }} friends</p>
                        <p class="text-ts text-gray-500">{{ user.posts_count }} posts</p>
                    </div>
                    <div class="mt-6 space-x-4">
                        <button class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
                            @click="handleRequest('Accepted', friendship.created_by.id)">Accept</button>
                        <button class="inline-block py-4 px-6 bg-red-600 text-white rounded-lg"
                            @click="handleRequest('Rejected', friendship.created_by.id)">Reject </button>
                    </div>
                </div>

            </div>
            <div class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-2 gap-4" v-if="friends[0]">
            <div class="p-4 bg-gray-100 text-center rounded-lg" v-for="user in friends" :key="user.id">

                <img src="https://i.pravatar.cc/300?img=70" alt="" class="mb-6 rounded-full" />
                <p><strong>
                        <RouterLink :to="{ name: 'profile', params: { 'id': user.id } }">{{ user.name }}</RouterLink>
                    </strong></p>
                <div class="mt-6 flex space-x-8 justify-around">
                    <p class="text-ts text-gray-500">{{ user.friend_count }} friends</p>
                    <p class="text-ts text-gray-500">{{ user.posts_count }} posts</p>
                </div>
            </div>

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

export default {
    name: 'FriendsView',
    components: {
        PeopleYouMayKnow,
        Trends
    },
    data() {

        return {
            user: {},
            friendshipRequest: [],
            friends: []
        }
    },
    mounted() {
        this.getFriends()
    },
    methods: {
        getFriends() {
            axios.get(`api/friends/${this.$route.params.id}`)
                .then(response => {

                    this.friendshipRequest = response.data.requests
                    this.friends = response.data.friends
                    this.user = response.data.user
                    console.log('responser data', response.data);
                    console.log('responser id', this.user.id);
                    console.log('responser store id', this.$store.state.user.id);
                })
                .catch(error => {
                    console.log('errorrororor', error);
                })
        },
        handleRequest(status, id) {
            axios.post(`api/friends/${id}/${status}`)
                .then(response => {

                    console.log('responser data', response.data);
                    

                })
                .catch(error => {
                    console.log('errorrororor', error);
                })

        }
    }
}
</script>