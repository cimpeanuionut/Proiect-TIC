<template>
  <div class="UsersOption container">
    <div class="card-panel">
    <center>
      <h2 class="deep-purple-text">Alege o optiune</h2>
      <ul class="">
      <li><router-link :to="{name: 'LucruriPreferate', params: {email: this.email}}">Lucruri Preferate</router-link></li>
      <li><router-link :to="{name: 'Chat', params: {email: this.email}}">Enter Chat</router-link></li>
      </ul>
      </center>
      </div>
  </div>
</template>

<script>
export default {
  name: 'UsersOption',
  props: ['email'],
  data () {
    return {
      
    }
  }
}
</script>

<style>
.UsersOption{
  max-width: 400px;
  margin-top: 60px;
}
.UsersOption h2{
  margin-top: 60px;
  margin-bottom: 100px;
  font-size: 2em;
}
.UsersOption ul li{
  margin: 0;
  margin-bottom: 30px; 
  background: #fbe49b;
  text-decoration: none;
  padding: 10px 10px 6px 10px;
  text-transform: uppercase; 
  border-left: 1px solid #e4bc3f;
  border-top: 1px solid #e4bc3f; 
  border-right: 1px solid #e4bc3f;
  background-color: #fbe49b;    
}

</style>
