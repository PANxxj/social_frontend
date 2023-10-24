<template>
    <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
        <div class="main-left">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <h1 class="mb-6 text-2xl">Log In</h1>
                <p class="mb-6 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sed, itaque molestiae ut saepe  itaque molestiae ut saepe    itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe itaque molestiae ut saepe   itaque molestiae ut saepe ex quo, laborum cupiditate error veniam fugiat quaerat pariatur quasi dolor consequuntur ea odit quae nobis.

                </p>
                <p class="font-bold">
                    Don't have an account? <RouterLink :to="{'name':'signup'}" class="underline"> click here</RouterLink> to create a new account 
                </p>
            </div>
        </div>
        <div class="main-right">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <form action="" class="space-y-6" v-on:submit.prevent="submitForm">
                    <div>
                        <label for="">Email</label><br>
                        <input type="email" placeholder="your email address" v-model="form.email" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>
                    <div>
                        <label for="">Password</label><br>
                        <input type="password" placeholder="your password " v-model="form.password" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>
                    <template v-if="errors.length > 0">
                        <div class="bg-red-300 text-white rounded-lg p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>
                    <div>
                        <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {

    data() {
        return {
            form:{
                email:'',
                password:'',
            },
            errors:[]
        }
    },
    methods:{
        async submitForm(){
            this.errors=[]

            if(this.form.email === ''){
                this.errors.push('your e-mail is missing')
            }
            if(this.form.password===''){
                this.errors.push('your password is missing')
            }
            if(this.errors.length === 0){
                await axios
                    .post('api/login/',this.form)
                    
                    .then(response =>{
                        this.$store.dispatch('setToken',(response.data))
                        console.log('accesss/',response.data);  
                        console.log('accesss/',response.data.access);
                        
                        axios.defaults.headers.common['Authorization']="Bearer "+response.data.access
                        console.log('user logged',response.data)
                        
                    })
                    .catch(error=>{
                        console.log('error',error);
                    })
                await axios
                    .get('api/me')
                    .then(response=>{
                        this.$store.dispatch('setUserInfo',(response.data))

                        this.$router.push('/feed')
                    })
                    .catch(error=>{
                        console.log('error',error);
                    })
            }
        }
    }
}
</script>