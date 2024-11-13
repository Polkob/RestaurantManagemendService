<!-- src/components/Editing.vue -->
<template>
    <div>
      <h2>Пакетный режим</h2>
      <nav>
        <router-link to="orders">Заказы</router-link>
        <router-link to="customers">Клиенты</router-link>
        <router-link to="products">Продукты</router-link>
      </nav>
      <router-view /> <!-- Здесь будут отображаться выбранные таблицы -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'BatchMode',
  };
  </script>
  
  <style>
  /* Стили для Editing компонента */
  nav {
    margin-bottom: 20px;
  }
  nav a {
    margin-right: 15px;
  }
  </style>