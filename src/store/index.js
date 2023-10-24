import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    toast:{
      ms:0,
      message:'',
      classes:'',
      isVisible:false
    },
    user:{
      id:null,
      name:null,
      email:null,
      isAuthenticated:false,
      access:null,
      refresh:null
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    showToast({ state }, { ms, message, classes }){
      this.state.toast.ms=parseInt(ms)
      this.state.toast.message=message
      this.state.toast.classes=classes
      this.state.toast.isVisible=true

      setTimeout(()=>{
          this.state.toast.classes+=' -translate-y-28'
      },10)
      setTimeout(()=>{
          this.state.toast.classes=this.state.toast.classes.replace('-translate-y-28','')
      },this.state.toast.ms-500)
      setTimeout(()=>{
          this.state.toast.isVisible=false
      },this.state.toast.ms)
  },
  initStore(state){
    if (localStorage.getItem('user.access')){
      this.state.user.access=localStorage.getItem('user.access')
      this.state.user.refresh=localStorage.getItem('user.refresh')
      this.state.user.id=localStorage.getItem('user.id')
      this.state.user.name=localStorage.getItem('user.name')
      this.state.user.email=localStorage.getItem('user.name')
      this.state.user.isAuthenticated=true

      this.dispatch('resfreshToken')
      console.log('user initialized...',this.state.user);

    }
  },
  setToken(state,data){
    console.log('sttaee',state.state);
    console.log('thissta',this.state);
    console.log('thissta',this.state.user);
    console.log('setToken...',data);

    this.state.user.access=data.access
    this.state.user.refresh=data.refresh
    this.state.user.isAuthenticated=true

    localStorage.setItem('user.access',data.access)
    localStorage.setItem('user.refresh',data.refresh)
  },
  removeToken() {
    console.log('remove token');

    this.state.user.id=null,
    this.state.user.name=null,
    this.state.user.email=null,
    this.state.user.isAuthenticated=false,
    this.state.user.access=null,
    this.state.user.refresh=null

    localStorage.setItem('user.access','')
    localStorage.setItem('user.refresh','')
    localStorage.setItem('user.id','')
    localStorage.setItem('user.name','')
    localStorage.setItem('user.email','')


  },
  setUserInfo(state,user){
    console.log('setuserinfo',user);

    this.state.user.id=user.id
    this.state.user.email=user.email
    this.state.user.name=user.name

    localStorage.setItem('user.id',user.id)
    localStorage.setItem('user.email',user.email)
    localStorage.setItem('user.name',user.name)
    console.log('this.usr',this.state.user);

    console.log('user..',state);
  },
  resfreshToken(){
    axios.post('api/refresh/',{
      refresh:this.state.user.refresh
    })
    .then((response)=>{
      this.state.user.access=response.data.access
      localStorage.setItem('user.access',response.data.access)

      axios.defaults.headers.common['Authorization']='Bearer '+response.data.access
    })
    .catch((error)=>{
      console.log('errors...',error);
      this.dispatch('removeToken')  
    })
  }
  },
  modules: {
  }
})
