import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home'
import About from '@/views/About'
import PrivacyPolicy from '@/views/PrivacyPolicy'
import TermsOfService from '@/views/TermsOfService'
import Edit from '@/page/Edit'
import PostArticle from '@/views/PostArticle'
import PostImages from '@/views/PostImages'
import PostVideos from '@/views/PostVideos'



Vue.use(Router)
export default new Router({
  mode:'history',
  saveScrollPosition:true,
  routes: [
    {
      path: '/',
      components:{
        default:Home,
        about:About,
        privacy:PrivacyPolicy,
        terms:TermsOfService
      },
      children:[
        {
            path:'/',
            name:'About',
            component:About
        },
        {
            path:'privacy',
            name:'PrivacyPolicy',
            component:PrivacyPolicy
        },
        {
            path:'terms',
            name:'TermsOfService',
            component:TermsOfService
        }
      ] 
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/edit',
      redirect: "/edit/article",
      name: 'Edit',
      components:{
        default:Edit,
        PostArticle,
        PostImages,
        PostVideos
      },
      children:[
        {
            path:'article',
            name:'PostArticle',
            component:PostArticle
        },
        {
            path:'images',
            name:'PostImages',
            component:PostImages
        },
        {
            path:'videos',
            name:'PostVideos',
            component:PostVideos
        }
      ] 
    }
  ]
})
