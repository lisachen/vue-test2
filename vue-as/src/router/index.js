import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home'
import Detail from '../page/detail'
import Personal from '../page/personal'
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
      redirect: "/",
      name: 'Home',
      component: Home
    },
    {
      path: '/Detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/Personal',
      name: 'Personal',
      component: Personal
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
          path: 'article/:id',
          name: 'Reedit0',
          component: PostArticle
        },
        {
          path: 'draft/article/:draftId',
          name: 'DraftArticle',
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
