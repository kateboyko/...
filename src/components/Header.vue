<template>
  <div class="head">
    <div class="title">
      <div class="logo">
        <span class="bold">Ш</span><span class="green bold">++</span><span>/</span></div><div class="chapter">projects</div>
    </div>
    <div class="profile-info">
      <div class="profile-img"><img src=" " alt=""></div>
      <div class="profile-name"><span>{{ username }}</span></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'head',
    data () {
      return {
        msg: '',
        slash: '',
        username: ''
      }
    }
  }
</script>

<style>
  .head {
    width: 100%;
    height: 90px; }

  .title {
    display: inline-block;
    float: left;
    font-family: Arial, serif;
    margin: 1% 0 0 5%; }
  .title .logo {
    font-size: 340%;
    display: inline-block; }
  .title .logo span {
    padding: 0;
    margin: 0; }
  .title .chapter {
    font-size: 230%;
    display: inline-block; }

  .profile-info {
    float: right;
    width: 20%;
    height: 90px;
    display: inline-block;
    z-index: 99; }

  .profile-img {
    padding: 12% 2% 0 10%;
    width: 10%;
    vertical-align: text-bottom;
    display: inline-block; }
  .profile-img img {
    width: 95%;
    height: auto;
    vertical-align: middle; }

  .profile-name {
    margin: 0 auto;
    float: none;
    width: 70%;
    display: inline-block;
    font-size: 100%; }
</style>
