import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/home',
            component: () => import('@/views/indexPage.vue'),
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import('@/views/home/homePage.vue')
                },
                {
                    path: 'problem',
                    name: 'problems',
                    component: () => import('@/views/problem/problemPage.vue'),
                    children: [{
                        path: ':pid',
                        name: 'problemDetail',
                        component: () => import('@/views/problem/problemDetail.vue')
                    }]
                },
                {
                    path: 'contest',
                    name: 'contest',
                    component: () => import('@/views/contest/contestPage.vue'),
                    children: [{
                        path: ':cid',
                        name: 'contestDetail',
                        component: () => import('@/views/contest/contestPage.vue')
                    }]
                },
                {
                    path: 'announcement',
                    name: 'announcement',
                    component: () => import('@/views/announcement/announcementPage.vue'),
                    children: [{
                        path: ':aid',
                        name: 'announcementDetail',
                        component: () => import('@/views/announcement/announcementDetail.vue')
                    }]
                }
            ]
        },
    ]
})

export default router
