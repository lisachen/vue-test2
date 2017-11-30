import Vue from 'vue'
import Router from 'vue-router'

/*import Home from '../page/home'
import About from '@/views/About'
import PrivacyPolicy from '@/views/PrivacyPolicy'
import TermsOfService from '@/views/TermsOfService'

import Edit from '@/page/Edit'
import PostArticle from '@/views/PostArticle'
import PostImages from '@/views/PostImages'
import PostVideos from '@/views/PostVideos'

import Personal from '../page/personal'
import MyPosts from '@/views/MyPosts'
import MyDrafts from '@/views/MyDrafts'

import Detail from '../page/detail'*/

const Home = resolve => require(['@/page/Home'], resolve) 
const About = resolve => require(['@/views/About'], resolve) 
const PrivacyPolicy = resolve => require(['@/views/PrivacyPolicy'], resolve) 
const TermsOfService = resolve => require(['@/views/TermsOfService'], resolve) 

const Edit = resolve => require(['@/page/Edit'], resolve) 
const PostArticle = resolve => require(['@/views/PostArticle'], resolve) 
const PostImages = resolve => require(['@/views/PostImages'], resolve) 
const PostVideos = resolve => require(['@/views/PostVideos'], resolve) 

const Personal = resolve => require(['@/page/Personal'], resolve) 
const MyPosts = resolve => require(['@/views/MyPosts'], resolve) 
const MyDrafts = resolve => require(['@/views/MyDrafts'], resolve) 

const Detail = resolve => require(['@/page/detail'], resolve) 



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
      redirect: "/",
      name: 'Home',
      component: Home
    },
    {
      path: '/feed/index/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/personal',
      redirect: "/personal/posts",
      name: 'Personal',
      components: {
        default:Personal,
        MyPosts,
        MyDrafts
      },
      children:[
        {
            path:'posts',
            name:'MyPosts',
            component:MyPosts
        },
        {
            path:'drafts',
            name:'MyDrafts',
            component:MyDrafts
        }
      ]  
    },
    {
      path: '/edit',
      redirect: "/edit/article/blog",
      name: 'Edit',
      components:{
        default:Edit,
        PostArticle,
        PostImages,
        PostVideos
      },
      children:[
        {
            path:'article/:type',
            name:'PostArticle',
            component:PostArticle
        },
        {
          path: 'article/:category/:id',
          name: 'Reedit0',
          component: PostArticle
        },
        {
          path: 'draft/:category/:draftId',
          name: 'Draft0',
          component: PostArticle
        },
        {
            path:'images',
            name:'PostImages',
            component:PostImages
        },
/*        {
          path: 'images/:id',
          name: 'Reedit2',
          component: PostImages
        },*/
        {
            path:'videos',
            name:'PostVideos',
            component:PostVideos
        },
/*        {
          path: 'videos/:id',
          name: 'Reedit1',
          component: PostVideos
        },*/
      ]
    },
    
  ]
})
