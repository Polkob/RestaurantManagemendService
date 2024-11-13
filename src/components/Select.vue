<!-- src/components/Editing.vue -->
<template>
    <div>
      <h1>Выбор записи</h1>
      <nav>
        <router-link to="ordersSelect">Заказы</router-link>
        <router-link to="clientsSelect">Клиенты</router-link>
        <router-link to="cooksSelect">Повара</router-link>
        <router-link to="dishesSelect">Блюда</router-link>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Select',
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