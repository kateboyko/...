<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  }
}
</script>

<style>
  html, body {
    margin: 0;
    font-family: 'Open Sans', sans-serif; }
  .green {
    color: #27AE60; }
  .bold {
    font-weight: bold; }
  header {
    width: 100%;
    background-color: white;
    border-bottom: 5px solid #27AE60; }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 70%;
    margin: 0 auto;
  }
</style>
