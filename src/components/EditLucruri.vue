<template>
    <div v-if="list" class="edit-preferate container">
        <div class="card-panel">       
        <h2>Editeaza lista ta cu {{list.title}}</h2>
        <form @submit.prevent="EditLista">
            <div class="field title">
                <label for="title">Titlul Listei</label>
                <input type="text" name="title" v-model="list.title">                
            </div>
            <div v-for="(l, index) in list.lista" :key="index" class="field">
                <label for="obiect">Element:</label>
                <input type="text" name="obiect" v-model="list.lista[index]" >
                <i class="material-icons delete" @click="deleteElem(l)">delete</i>
            </div>            
            <div class="field edit-lista">
                <label for="edit-lista">Adauga un obiect preferat in lista</label>
                <input type="text" name="edit-lista" @keydown.enter.prevent="addObiect" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>                
                <button class="btn pink">Editeaza Lista</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'EditLucruri',
    data(){
        return{
            list: null,
            another: null,
            feedback: null
        }
    },
    methods:{
        EditLista(){
             if (this.list.title){
                this.feedback = null
                this.list.slug = slugify(this.list.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('preferate').doc(this.list.id).update({
                    title: this.list.title,
                    lista: this.list.lista,
                    slug: this.list.slug                    
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
                this.list.lista.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = 'You must enter a value to add an object'
            }
        },
        deleteElem(l){
            this.list.lista = this.list.lista.filter(elem => {
                return elem != l
            })
        }
    },
    created(){
        let ref = db.collection('preferate').where('slug', '==', this.$route.params.lista_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => { 
                this.list = doc.data()
                this.list.id = doc.id
            })
        })
    }
}
</script>

<style>
.edit-preferate{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-preferate h2{
    font-size: 1.5em;
    margin: 20px auto;
}
.edit-preferate .field{
    margin: 20px auto;
    position: relative;
}
.edit-preferate .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
