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
                    path: 'problem/:pid?',
                    name: 'problems',
                    component: () => import('@/views/problem/problemPage.vue'),
                },
                {
                    path: '/problem/detail/:pid',
                    name: 'problemDetail',
                    component: () => import('@/views/problem/problemDetail.vue')
                },
                {
                    path: 'contest/:pid?',
                    name: 'contest',
                    component: () => import('@/views/contest/contestPage.vue'),
                },
                {
                    path: 'contest/detail/:cid',
                    name: 'contestDetail',
                    component: () => import('@/views/contest/contestDetail.vue')
                },
                {
                    path: 'announcement',
                    name: 'announcement',
                    component: () => import('@/views/announcement/announcementPage.vue'),
                },
                {
                    path: 'announcement/:aid',
                    name: 'announcementDetail',
                    component: () => import('@/views/contest/announcementDetail.vue')
                },
            ]
        }
    ]
})

export default router
