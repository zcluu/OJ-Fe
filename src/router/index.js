import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/indexPage.vue'),
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import('@/views/homePage.vue')
                },
                {
                    path: 'problems',
                    name: 'problems',
                    component: () => import('@/views/problemPage.vue')
                },
                {
                    path: 'contest',
                    name: 'contest',
                    component: () => import('@/views/contestPage.vue'),
                    children:[{
                        path:':cid',
                        name:'contestDetail',
                        component:()=>import('@/views/contestPage.vue')
                    }]
                },
            ]
        },
    ]
})

export default router
