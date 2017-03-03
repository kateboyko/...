<template>
  <div class="hello">
    <div class="greeting">
      <p>Добро пожаловать! Тут вы сможете найти интересные проекты <a href="http://programming.kr.ua/ru">Ш++</a> и принять в них участие.
      </p>
      <h4>Основной мотивацией для вас мы видим:</h4>
      <ul>
        <li>командная работа</li>
        <li>реальный проект</li>
        <li>прокачка</li>
        <li>проект в ваше портфолио</li>
        <li>...</li>
      </ul>
      <p>По всем вопросам связывайтесь <a target="_blank" href="mailto:info@programming.kr.ua">info@programming.kr.ua</a></p>
    </div>
    <form class="login" action="http://localhost:3000/login" method="post">
      <input type="text" placeholder="login" name="login">
      <br>
      <input type="password" placeholder="pass" name="pass">
      <br>
      <button id='login' type="submit" class="button">Log In</button>
      <a class="forgot_pass" href="">забыли пароль?</a>
    </form>
  </div>
</template>

<script>
  const $ = require('jquery')

  $(document).ready(function () {
    $('.hello').keypress(function (e) {
      if (e.which === 13) $('.login').submit()
    })
//    $('#login').on('click', () => { $('.login').submit() })

    $('.login').submit(function (event) {
//      let data = $('.login').submit()
//      event.preventDefault()
      console.log(event)
    })
  })

  export default {
    name: 'hello',
//    props: ['userData'],
    data () {
      return {
//        data: this.userData
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    vertical-align: middle;
    margin-top: 10%;}
  .greeting {
    width: 50%;
    margin-right: 5%;
    text-align: left;
    display: inline-block;}
  .greeting a {
    color: #27AE60; }
  .greeting a:visited {
    color: #27AE60; }
  .login {
    width: 30%;
    display: inline-block;
    /*margin: 10% 0 0 10%;*/
    padding: 2%;
    vertical-align: top;
    margin-top: 5%;
    background-color: #ECF0F1; }
  .login input {
    padding: 5% 0 5% 5%;
    width: 95%;
    margin: 3% auto;
    border: none; }
  .login .button {
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    padding: 5%;
    margin: 2%;
    width: 30%;
    text-align: center;
    background-color: #27AE60;
    color: #ECF0F1;
    border: none;
    cursor: pointer; }
  .login .forgot_pass {
    margin-left: 5%;
    background: transparent;
    border: none;
    text-decoration: underline; }
  .login a {
    text-decoration: none;
    cursor: pointer;
    color: #27AE60; }
  .login a:visited {
    color: #27AE60; }
</style>
