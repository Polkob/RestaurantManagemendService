<!-- src/App.vue -->
<template>
  <div id="app">
    <header>
      <h1>Restaurant Management System</h1>
      <nav>
        <router-link to="/editing">Editing</router-link>
        <router-link to="/viewing">View</router-link>
        <router-link to="/deleting">Delete</router-link>
        <router-link to="/select">Select a record</router-link>
        <!-- <router-link to="/batch-mode">Batch mode</router-link>  -->
      </nav>
    </header>

    <!-- Здесь отображаются компоненты страниц в зависимости от маршрута -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  overflow: auto;
  width: 100%;
}

header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #232433;
  color: #fff;
  padding: 15px;
  margin: 0;
  z-index: 10;
  
}

nav a {
    font-weight: bold;
    text-decoration: none; /* Убираем стандартное подчеркивание */
    color: #676767; /* Цвет текста */
    background-color: rgba(84, 84, 84, 0.2); /* Полупрозрачный фон */
    padding: 10px 15px; /* Отступы вокруг текста */
    border-radius: 5px
}

nav a:hover{
  background-color: rgba(52, 152, 219, 0.4); /* Изменение фона при наведении */
    color: #2980b9; /* Темнее цвет текста при наведении */
    text-decoration: underline; /* Подчеркивание при наведении */
}

nav a.router-link-exact-active {
    font-weight: bold;
    text-decoration: none; /* Убираем стандартное подчеркивание */
    color: #3498db; /* Цвет текста */
    background-color: rgba(52, 152, 219, 0.2); /* Полупрозрачный фон */
    padding: 10px 15px; /* Отступы вокруг текста */
    border-radius: 5px; /* Закругленные углы */
    transition: background-color 0.3s, color 0.3s; /* Плавные переходы */
}

nav a.router-link-exact-active:hover {
    background-color: rgba(52, 152, 219, 0.4); /* Изменение фона при наведении */
    color: #2980b9; /* Темнее цвет текста при наведении */
    text-decoration: underline; /* Подчеркивание при наведении */
}
</style>
