import { createRouter, createWebHistory } from 'vue-router';
import OrderList from '../components/OrderList.vue';
import OrderDetail from '../components/OrderDetail.vue';
import OrderDelete from '../components/OrderDelete.vue';
import OrderSelect from '../components/OrderSelect.vue';
import ClientList from '../components/ClientList.vue';
import ClientDetail from '../components/ClientDetail.vue';
import ClientDelete from '../components/ClientDelete.vue';
import ClientSelect from '../components/ClientSelect.vue';
import CookList from '../components/CookList.vue';
import CookDetail from '../components/CookDetail.vue';
import CookDelete from '../components/CookDelete.vue';
import CookSelect from '../components/CookSelect.vue';
import DishList from '../components/DishList.vue';
import DishDetail from '../components/DishDetail.vue';
import DishDelete from '../components/DishDelete.vue';
import DishSelect from '../components/DishSelect.vue';
import Editing from '../components/Editing.vue';
import Viewing from '../components/Viewing.vue';
import Deleting from '../components/Deleting.vue';
import Select from '../components/Select.vue';

const routes = [
  {
    path: '/',
    redirect: '/editing', // Редирект на Editing по умолчанию
  },
  {
    path: '/editing',
    name: 'Editing',
    component: Editing,
    children: [
      {
        path: '',
        redirect: '/orders', // Редирект на таблицу заказов по умолчанию
      },
      {
        path: '/orders',
        name: 'OrderList',
        component: OrderList,
      },
      {
        path: '/clients',
        name: 'ClientList',
        component: ClientList,
      },
      {
        path: '/cooks',
        name: 'CookList',
        component: CookList,
      },
      {
        path: '/dishes',
        name: 'DishList',
        component: DishList,
      },
    ]
  },
  {
    path: '/viewing',
    name: 'Viewing',
    component: Viewing,
    children: [
      {
        path: '',
        redirect: '/ordersDetail', 
      },
      {
        path: '/ordersDetail',
        name: 'OrderDetail',
        component: OrderDetail,
      },
      {
        path: '/clientsDetail',
        name: 'ClientDetail',
        component: ClientDetail,
      },
      {
        path: '/cooksDetail',
        name: 'CookDetail',
        component: CookDetail,
      },
      {
        path: '/dishesDetail',
        name: 'DishDetail',
        component: DishDetail,
      },
    ]
  },
  {
    path: '/deleting',
    name: 'Deleting',
    component: Deleting,
    children: [
      {
        path: '',
        redirect: '/ordersDelete', 
      },
      {
        path: '/ordersDelete',
        name: 'OrderDelete',
        component: OrderDelete,
      },
      {
        path: '/clientsDelete',
        name: 'ClientDelete',
        component: ClientDelete,
      },
      {
        path: '/cooksDelete',
        name: 'CookDelete',
        component: CookDelete,
      },
      {
        path: '/dishesDelete',
        name: 'DishDelete',
        component: DishDelete,
      },
    ]
  },
  {
    path: '/select',
    name: 'Select',
    component: Select,
    children: [
      {
        path: '',
        redirect: '/ordersSelect', 
      },
      {
        path: '/ordersSelect',
        name: 'OrderSelect',
        component: OrderSelect,
      },
      {
        path: '/clientsSelect',
        name: 'ClientSelect',
        component: ClientSelect,
      },
      {
        path: '/cooksSelect',
        name: 'CookSelect',
        component: CookSelect,
      },
      {
        path: '/dishesSelect',
        name: 'DishSelect',
        component: DishSelect,
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;