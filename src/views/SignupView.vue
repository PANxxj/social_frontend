<template>
    <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
        <div class="main-left">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <h1 class="mb-6 text-2xl">Sign Up</h1>
                <p class="mb-6 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sed, itaque molestiae ut saepe  itaque molestiae ut saepe    itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe  itaque molestiae ut saepe itaque molestiae ut saepe   itaque molestiae ut saepe ex quo, laborum cupiditate error veniam fugiat quaerat pariatur quasi dolor consequuntur ea odit quae nobis.

                </p>
                <p class="font-bold">
                    already have an account? <RouterLink :to="{'name':'login'}" class="underline"> click here</RouterLink> to Log In
                </p>
            </div>
        </div>
        <div class="main-right">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <form action="" class="space-y-6" v-on:submit.prevent="submitForm">
                    <div>
                        <label for="">Name</label><br>
                        <input type="text" v-model="form.name" placeholder="your full name" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>
                    <div>
                        <label for="">Email</label><br>
                        <input type="email" v-model="form.email" placeholder="your email address" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>
                    <div>
                        <label for="">Password</label><br>
                        <input type="password" v-model="form.password1" placeholder="your password   " class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>
                    
                    <div>
                        <label for="">Repeat Password</label><br>
                        <input type="password" v-model="form.password" placeholder="Repeat your password   " class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>
                    <template v-if="errors.length > 0">
                        <div class="bg-red-300 text-white rounded-lg p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>
                    <div>
                        <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            form:{
                email:'',
                name:'',
                password1:'',
                password:''

            },
            errors:[]
        }
    },
    methods:{
        submitForm(){
            this.errors=[]

            if(this.form.email === ''){
                this.errors.push("your email is missing")
            }
            if(this.form.name === ''){
                this.errors.push("your name is missing")
            }
            if(this.form.password1 === ''){
                this.errors.push('your password is missing')
            }
            if(this.form.password1!==this.form.password){
                this.errors.push('password does not match')
            }
            if(this.errors.length === 0){
                axios
                    .post('api/creatuser',this.form)
                    // console.log(response.data)
                    .then(response =>{
                        if (response.data.msg ==='ok'){
                            console.log(response.data)
                            this.$store.dispatch('showToast', {'ms':5000,'message':'The user has been created, please log in','classes':'bg-emerald-500'});

                            this.form.name=''
                            this.form.email=''
                            this.form.password1=''
                            this.form.password=''
                        }else{
                            this.$store.dispatch('showToast',{'ms':5000,'message':'something went wrong pleade try again ','classes':'bg-red-300'})
                        }
                        
                    })
                    .catch(error=>{
                        console.log('error',error);
                    })
                    this.$router.push('/log-in')
            }
        }
    }
}
</script>