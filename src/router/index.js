import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/home',
            component: () => import('@/views/indexPage.vue'),
            children: [
                {
                    path: 'login',
                    name: 'userLogin',
                    component: () => import('@/views/user/loginPage.vue')
                },
                {
                    path: 'register',
                    component: () => import('@/views/user/registerPage.vue')
                },
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
                    component: () => import('@/views/problem/problemDetail.vue'),
                    children: [
                        {
                            path: '',
                            name: 'problemDescription',
                            component: () => import('@/components/problemPage/problem-description.vue')
                        },
                        {
                            path: 'submissions',
                            name: 'problemSubmission',
                            component: () => import('@/components/problemPage/problem-submission.vue')
                        }
                    ]
                },
                {
                    path: 'contest/:pid?',
                    name: 'contest',
                    component: () => import('@/views/contest/contestPage.vue'),
                },
                {
                    path: 'contest/detail/:cid',
                    name: 'contestDetail',
                    component: () => import('@/views/contest/contestDetail.vue'),
                    children: [
                        {
                            path: '',
                            component: () => import('@/components/contestPage/overview.vue'),
                            children: [
                                {
                                    path: '',
                                    name: 'contestDescription',
                                    component: () => import('@/components/contestPage/description.vue')
                                },
                                {
                                    path: 'problems',
                                    name: 'contestProblems',
                                    component: () => import('@/components/contestPage/problems.vue'),
                                },
                                {
                                    path: 'rank',
                                    name: 'contestRank',
                                    component: () => import('@/components/contestPage/rank.vue'),
                                },
                                {
                                    path: 'announcement',
                                    name: 'contestAnnouncements',
                                    component: () => import('@/components/contestPage/announcement.vue'),
                                }
                            ]
                        },
                        {
                            path: 'problems/:sid',
                            name: 'contestProblemDetail',
                            component: () => import('@/views/contest/contestProblemDetail.vue'),
                            children: [
                                {
                                    path: '',
                                    name: 'contestProblemDescription',
                                    component: () => import('@/components/contestPage/problem/problem-description.vue')
                                },
                                {
                                    path: 'submissions',
                                    name: 'contestProblemSubmission',
                                    component: () => import('@/components/contestPage/problem/problem-submission.vue')
                                }
                            ]
                        },
                    ]
                },
                {
                    path: 'announcement',
                    name: 'announcement',
                    component: () => import('@/views/announcement/announcementPage.vue'),
                },
                {
                    path: 'announcement/:aid',
                    name: 'announcementDetail',
                    component: () => import('@/views/announcement/announcementPage.vue')
                },
            ]
        },
        {
            name: 'admin',
            path: '/admin',
            component: () => import('@/views/adminPage.vue'),
            redirect: 'admin/home',
            children: [
                {
                    name: 'adminHome',
                    path: 'home'
                },
                {
                    name: 'adminProblems',
                    path: 'problem/:pid?',
                    component: () => import('@/views/admin/adminProblemPage.vue')
                },
                {
                    name: 'adminProblemEdit',
                    path: 'problem/edit/:pid?',
                    component: () => import('@/views/admin/adminProblemEditPage.vue')
                },
                {
                    name: 'adminProblemAdd',
                    path: 'problem/add',
                    component: () => import('@/views/admin/adminProblemEditPage.vue')
                },
                {
                    name: 'adminContest',
                    path: 'contest',
                    component: () => import('@/views/admin/adminContestPage.vue'),
                    redirect: '/admin/contest/all',
                    children: [
                        {
                            name: 'adminContestAll',
                            path: 'all',
                            component: () => import('@/components/adminPage/admin-contest-all.vue')
                        },
                        {
                            name: 'adminContestAdd',
                            path: 'add',
                            component: () => import('@/components/adminPage/admin-contest-edit.vue')
                        },
                        {
                            name: 'adminContestEdit',
                            path: ':cid/edit',
                            component: () => import('@/components/adminPage/admin-contest-edit.vue')
                        },
                        {
                            name: 'adminContestProblemAll',
                            path: ':cid/problem',
                            component: () => import('@/views/admin/adminContestProblemPage.vue')
                        },
                        {
                            name: 'adminContestProblemAdd',
                            path: ':cid/problem/add',
                            component: () => import('@/views/admin/adminProblemEditPage.vue')
                        },
                    ]
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/404_not_found.vue')
        }
    ]
})

export default router
