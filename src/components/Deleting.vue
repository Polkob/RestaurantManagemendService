<!-- src/components/Editing.vue -->
<template>
    <div>
      <h1>Удаление</h1>
      <nav>
        <router-link to="ordersDelete">Заказы</router-link>
        <router-link to="clientsDelete">Клиенты</router-link>
        <router-link to="cooksDelete">Повара</router-link>
        <router-link to="dishesDelete">Блюда</router-link>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Deleting',
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