<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-1">
            <div class="p-4 bg-white border border-gray-200 rounded-lg">

                <div class="space-y-4">
                    <div class="flex items-center justify-between" 
                    v-for="conversation in conversations" :key="conversation.id"
                    @click="setActiveConversation(conversation.id)"
                    >
                        <div class="flex items-center space-x-2">
                            <img src="https://i.pravatar.cc/300?img=70" alt="" class="w-[40px] rounded-full">
                            <!-- <p class="text-xs"><strong>Social Baba</strong></p> -->
                            <template v-for="user in conversation.users" :key="user.id">
                                <p class="text-xs font-bold" 
                                v-if="user.id !== this.$store.state.user.id">
                                {{ user.name }}
                                </p>

                            </template>
                        </div>
                        <span class="text-xs text-gray-500">{{ conversation.modified_at_formatted }} ago </span>
                    </div>
                    
                </div>
                
            </div>
        </div>
        <div class="mian-center col-span-3 space-y-4">
            <div class="bg-white border bordr-gray-200 rounded-lg">
                <div class="flex flex-col flex-grow p-4">
                    <template v-for="messages in activeConversation.messages" :key="messages.id">
                        <div class="flex w-full mt-2 space-x-3 max-w-md ml-auto justify-end"
                        v-if="messages.created_by.id == this.$store.state.user.id"
                    >
                        <div>
                            <div class="bg-blue-500 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p class="text-sx">{{ messages.body }}</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">{{ messages.created_at_formatted }} ago</span>
                        </div>
                        <div class="flex-shrink-0 h-10 rounded-full bg-gray-300">
                            <img src="https://i.pravatar.cc/300?img=70" alt="" class="w-[40px] rounded-full">
                        </div>
                    </div>
                    <div v-else class="flex w-full mt-2 space-x-3 max-w-md">
                        <div class="flex-shrink-0 h-10 rounded-full bg-gray-300">
                            <img src="https://i.pravatar.cc/300?img=70" alt="" class="w-[40px] rounded-full">
                        </div>
                        <div>
                            <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <p class="text-sx">{{ messages.body }}</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">{{ messages.created_at_formatted }} ago</span>
                        </div>
                        
                    </div>
                    </template>
                    <!-- <div class="flex w-full mt-2 space-x-3 max-w-md ml-auto justify-end"
                    
                    >
                        <div>
                            <div class="bg-blue-500 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p class="text-sx">{{ messages.body }}</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">{{ messages.created_at_formatted }} min ago</span>
                        </div>
                        <div class="flex-shrink-0 h-10 rounded-full bg-gray-300">
                            <img src="https://i.pravatar.cc/300?img=70" alt="" class="w-[40px] rounded-full">
                        </div>
                    </div> -->
                    <!-- <div class="flex w-full mt-2 space-x-3 max-w-md">
                        <div class="flex-shrink-0 h-10 rounded-full bg-gray-300">
                            <img src="https://i.pravatar.cc/300?img=70" alt="" class="w-[40px] rounded-full">
                        </div>
                        <div>
                            <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <p class="text-sx">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio itaque debitis, aliquam, e</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        
                    </div> -->
                </div>
            </div>
            <div class="bg-white border bordr-gray-200 rounded-lg">
                <form v-on:submit.prevent="submitForm">
                <div class="p-4">
                    <textarea v-model="body" name="" id="" cols="30" rows="5" class="p-4 w-full bg-gray-100 rounded-lg"
                        placeholder="what do you wanna say..."></textarea>
                </div>
                <div class="p-4 border-t border-gray-100 flex justify-between">
                    <button class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">Send</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'ChatView',
    data(){
        return {
            conversations:[
                {
                    users:[]
                }
            ],
            activeConversation:{},
            body:''
        }
    },
    mounted(){
        this.getConversation()
    },
    methods:{
        setActiveConversation(id){
            this.activeConversation=id
            this.getMessages()
        },
        getConversation(){
            axios.get('api/conversation_list')
                .then(response =>{
                    this.conversations=response.data
                    console.log('data1',response.data);

                    if (this.conversations.length){
                        this.activeConversation=this.conversations[0].id
                    }
                    this.getMessages()
                })
                .catch(error =>{
                    console.log(error);
                })
                
        },
        getMessages(){
            axios.get(`api/conversation_detail/${this.activeConversation}`)
            .then(response =>{
                console.log('data1',response.data);
                this.activeConversation=response.data
            })
            .catch(error =>{
                console.log(error);
            })
        },
        submitForm(){
            axios.post(`api/send_messages/${this.activeConversation.id}`,{body:this.body})
                .then(response =>{
                    console.log('data1',response.data);
                    this.activeConversation.messages.push(response.data)
                    this.body=''
                })
                .catch(error =>{
                    console.log(error);
                })
        },
        
    }

}

</script>