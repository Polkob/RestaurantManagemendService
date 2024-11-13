<!-- src/components/Editing.vue -->
<template>
    <div>
      <h1>Просмотр с редактированием</h1>
      <nav>
        <router-link to="orders">Заказы</router-link>
        <router-link to="clients">Клиенты</router-link>
        <router-link to="cooks">Повара</router-link>
        <router-link to="dishes">Блюда</router-link>
      </nav>
      <router-view /> <!-- Здесь будут отображаться выбранные таблицы -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'Editing',
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