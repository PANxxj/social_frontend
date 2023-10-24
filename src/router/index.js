import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import FeedView from '../views/FeedView.vue'
import MessagesView from '../views/MessagesView.vue'
import SearchView from '../views/SearchView.vue'
import ProfileView from '../views/ProfileView.vue'
import FriendsView from '../views/FriendsView.vue'
import PostDetail from '../views/PostDetail.vue'
import ChatView from '../views/ChatView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/sign-up',
    name:'signup',
    component:SignUpView
  },
  {
    path:'/log-in',
    name:'login',
    component:LoginView
  },
  {
    path:'/feed',
    name:'feed',
    component:FeedView
  },
  {
    path:'/messages',
    name:'messages',
    component:MessagesView
  },
  {
    path:'/search',
    name:'search',
    component:SearchView
  },
  {
    path:'/profile/:id',
    name:'profile',
    component:ProfileView
  },
  {
    path:'/profile/:id/friends',
    name:'friends',
    component:FriendsView
  },
  {
    path:'/post/:id',
    name:'postdetail',
    component:PostDetail
  },
  {
    path:'/chat',
    name:'chat',
    component:ChatView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
