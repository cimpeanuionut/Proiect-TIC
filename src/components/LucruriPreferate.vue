<template>
  <div>
    <NavbarLucruriPreferate/>
    <div class="index container">
    <div class="card" v-for="user in users_pref" :key="user.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deletePref(user.id)">delete</i>
        <h2 class="indigo-text">{{ user.title }}</h2>
        <ul class="ingredients">
          <li v-for="(list, index) in user.lista" :key="index">
            <span class="chip">{{ list }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditLucruri' , params: {lista_slug: user.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import NavbarLucruriPreferate from '@/components/NavbarLucruriPreferate'
export default {
  name: 'Index',
  props: ['email'],
  components: {
    NavbarLucruriPreferate
  },
  data(){
    return{
      users_pref: []      
    }
  },
  methods: {
    deletePref(id){
        db.collection('preferate').doc(id).delete()
        .then(() => {
        this.users_pref = this.users_pref.filter(user => {
        return user.id != id
      })
        })      
     }
  },
  created(){     
    db.collection('preferate').where('email', '==', this.email).get()
    .then(snapshot => {
      snapshot.forEach(doc => {        
        let user = doc.data()
        user.id = doc.id             
        this.users_pref.push(user)                       
      })
    }) 
    
  }
}
</script>

<style>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients{
  margin: 30px auto;
}
.index .ingredients li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>