<template>
  <div id="app">
    <router-view /> <!-- ページに応じてコンポーネントを動的に表示 -->
  </div>
</template>

<script>
export default {
  name: 'App', // コンポーネント名
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
