<!-- src/components/Editing.vue -->
<template>
    <div>
      <h1>Просмотр без редактирования</h1>
      <nav>
        <router-link to="ordersDetail">Заказы</router-link>
        <router-link to="clientsDetail">Клиенты</router-link>
        <router-link to="cooksDetail">Повара</router-link>
        <router-link to="dishesDetail">Блюда</router-link>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Viewing',
  };
  </script>
  
  <style>
  nav {
    margin-bottom: 20px;
  }
  nav a {
    margin-right: 15px;
  }
  </style>