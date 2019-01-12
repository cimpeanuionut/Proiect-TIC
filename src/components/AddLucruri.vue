<template>
    <div class="add-preferate container">
        <div class="card-panel">
        <h2 class="center-align indigo-text">Adauga o noua lista cu lucruri preferate </h2>
        <form @submit.prevent="AddLista">
            <div class="field title">
                <label for="title">Titlul Listei</label>
                <input type="text" name="title" v-model="title">                
            </div>
            <div v-for="(list, index) in lista" :key="index" class="field">
                <label for="obiect">Element:</label>
                <input type="text" name="obiect" v-model="lista[index]" >
                <i class="material-icons delete" @click="deleteElem(list)">delete</i>
            </div>            
            <div class="field add-lista">
                <label for="add-lista">Adauga un obiect preferat in lista</label>
                <input type="text" name="add-lista" @keydown.enter.prevent="addObiect" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>                
                <button class="btn pink">Adauga Lista</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'AddLucruri',
    props: ['email'],
    data(){
        return{
            title: null,
            another: null,
            lista: [],
            feedback: null,
            slug: null
        }
    },
    methods:{
        AddLista(){
            if (this.title){
                this.feedback = null
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('preferate').add({
                    title: this.title,
                    lista: this.lista,
                    slug: this.slug,
                    email: this.email                    
                }).then(() => {
                    this.$router.push({name :'LucruriPreferate'})
                }).catch(err => {
                    this.feedback = err.message
                })
            }else{
                this.feedback = 'You must enter a title'
            }
        },
        addObiect(){
            if(this.another){
                this.lista.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = 'You must enter a value to add an object'
            }
        },
        deleteElem(list){
            this.lista = this.lista.filter(elem => {
                return elem != list
            })
        }
    }
}
</script>

<style>
.add-preferate{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-preferate h2{
    font-size: 1.5em;
    margin: 20px auto;
}
.add-preferate .field{
    margin: 20px auto;
    position: relative;
}
.add-preferate .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
