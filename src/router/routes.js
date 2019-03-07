// import Home from '@/pages/Home'
// import Kind from '@/pages/Kind'
// import News from '@/pages/News'
// import User from '@/pages/User'
// import Cart from '@/pages/Cart'
// import Detail from '@/pages/Detail'
// import Footer from '@/components/Footer'

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        components: {
            default: () =>
                import ( /* webpackChunkName: "group-footer" */ '@/pages/Home'), //路由懒加载，优化页面加载速度
            footer: () =>
                import ( /* webpackChunkName: "group-footer" */ '@/components/Footer')
        }
    },
    {
        path: '/kind',
        name: 'kind',
        components: {
            default: () =>
                import ( /* webpackChunkName: "group-footer" */ '@/pages/Kind'),
            footer: () =>
                import ( /* webpackChunkName: "group-footer" */ '@/components/Footer')
        }
    },
    {
        path: '/news',
        name: 'news',
        components: {
            default: () =>
                import ( /* webpackChunkName: "group-footer" */ '@/pages/News'),
            footer: () =>
                import ( /* webpackChunkName: "group-footer" */ '@/components/Footer')
        }
    },
    {
        path: '/cart',
        name: 'cart',
        components: {
            default: () =>
                import ( /* webpackChunkName: "group-footer" */ '@/pages/Cart')
        }
    },
    {
        path: '/user',
        name: 'user',
        components: {
            default: () =>
                import ( /* webpackChunkName: "group-footer" */ '@/pages/User'),
            footer: () =>
                import ( /* webpackChunkName: "group-footer" */ '@/components/Footer')
        }
    },
    {
        path: '/detail',
        name: 'detail',
        components: {
            default: () =>
                import ( /* webpackChunkName: "group-detail" */ '@/pages/Detail'),
        }
    },
    {
        path: '/register',
        name: 'register',
        components: {
            default: () =>
                import ( /* webpackChunkName: "group-register" */ '@/pages/Register'),
        }
    },
    {
        path: '/login',
        name: 'login',
        components: {
            default: () =>
                import ( /* webpackChunkName: "group-login" */ '@/pages/Login'),
        }
    },
    {
        path: '/navdetail',
        name: 'navdetail',
        components: {
            default: () =>
                import ( /* webpackChunkName: "group-nav" */ '@/pages/Navdetail'),
        }
    },
]

export default routes