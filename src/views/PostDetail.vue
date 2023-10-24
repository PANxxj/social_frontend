<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">

        <div class="main-center col-span-3 space-y-4">    
            <div class="p-4 bg-white border border-gray-200 rounded-lg"
                    v-if="post.id">
                    <FeedItem :post="post"/>
            </div>
            <div class="p-4 ml-6 bg-white border bordr-gray-200 rounded-lg" 
            v-for="comment in post.comments" :key="comment.id">
                <CommentItem :comment="comment"/>
            </div>
            <div class="bg-white border bordr-gray-200 rounded-lg">
                <form method="post" v-on:submit.prevent="submitForm">
                    <div class="p-4">
                        <textarea v-model=body  name="" id="" cols="30" rows="5" class="p-4 w-full bg-gray-100 rounded-lg"
                            placeholder="Add comment...."></textarea>
                    </div>
                    <div class="p-4 border-t border-gray-100 ">
                        <!-- <a href="#" class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg">Attach image</a> -->
                        <button href="#" class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">Comment</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="main-right col-span-1 space-y-4">
            <PeopleYouMayKnow/>
            <Trends/>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import PeopleYouMayKnow from '../components/PeopleYouMayKnow.vue'
import Trends from '../components/Trends.vue'
import FeedItem from '../components/FeedItem.vue'
import CommentItem from '../components/CommentItem.vue'

export default{
    name:'PostDetail',
    components:{
        PeopleYouMayKnow,
        Trends,
        FeedItem,
        CommentItem
    },
    data(){

        return {
            post:{
                id:null,
                comments:[]
            },
            body:''
           
        }
    },
    mounted() {
        this.getPost()
    },
    methods:{
        getPost(){
            axios.get(`api/post_detail/${this.$route.params.id}`)
            .then(response=>{
                this.post=response.data.data
                this.post.comments=response.data.comments
                console.log('commments...///',response.data.comments);
                console.log('responser data',response.data.data);
            })
            .catch(error =>{
                console.log('errorrororor',error);
            })
        },
        submitForm(){
            axios.post(`api/post/comment/${this.$route.params.id}`,{
                'body':this.body
            })
            .then(response=>{
                console.log(response);
                this.post.comments.push(response.data)
                this.post.comments_count+=1
                this.body=''
            })
            .catch(error=>{
                console.log(error);
            })

        }
    }
}
</script>