<template>
    <div class="register container">
        <form @submit.prevent="register" class="card-panel">
            <h2 class="center deep-purple-text">Register</h2>
             <div class="field">
                <label for="name">Name:</label>
                <input type="text" name="name" v-model="name">
            </div>
            <div class="field">
                <label for="CNP">CNP:</label>
                <input type="number" name="CNP" v-model="CNP">
            </div>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email">
            </div>
             <div class="Password">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
             <div class="field">
                <label for="phone">Phone:</label>
                <input type="number" name="phone" v-model="phone">
            </div>
             
            <p class="red-text center" v-if="feedback">{{feedback}}</p>    
            <div class="field center">
                <button class="btn deep-purple">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'Register',
    data(){
        return{
            name: null,
            email: null,
            password: null,
            phone: null,
            CNP: null,
            feedback: null
        }
    },
    methods:{
        register(){
      if(this.name && this.CNP && this.email && this.password && this.phone){
        this.feedback = null
        this.slug = slugify(this.CNP, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if(doc.exists){
            this.feedback = 'This CNP already exists'
          } else {          
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              ref.set({
                CNP: this.CNP,
                name: this.name,
                phone: this.phone,
                user_id: cred.user.uid,                
                email: this.email
              })
            }).then(() => {
              this.$router.push({ name: 'UsersOption' })
            })
            .catch(err => {
              this.feedback = err.message
            })
          }
        })
      } else {
        this.feedback = 'Please complete all fields'
      }
    }
  }
}
</script>

<style>
.register{
    max-width: 400px;
    margin-top: 60px;
   
}
.register h2{
    font-size: 2.4em;
}
.register .field{
    margin-bottom: 16px;
}
</style>
