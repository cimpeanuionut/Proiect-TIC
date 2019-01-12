<template>
    <div v-if="baza" class="chat container">
        <h2 class="center white-text">Chat </h2>
        <div class="card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="teal-text">{{message.name}}:</span>
                        <span class="grey-text text-darken-3">{{message.content}}</span>
                        <span class="grey-text time">{{message.timestamp}}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name="baza.name" />
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import NewMessage from '@/components/NewMessage'
import moment from 'moment'
export default {
    name: 'Chat',
    props: ['email'],   
    components: {
        NewMessage
    },
    data(){
        return{
            baza: null,
            messages: []
        }
    },
    created(){
        let ref = db.collection('users').where('email', '==', this.email)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.baza = doc.data()               
            })
        })
        let ref2 = db.collection('messages').orderBy('timestamp')
        ref2.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc
                    this.messages.push({
                        id: doc.id,
                        name: doc.data().name,
                        content: doc.data().content,
                        timestamp: moment(doc.data().timestamp).format('lll')
                    })
                }
            })
        })
    }
}
</script>

<style>
.chat h2{
    font-size: 2.6em;
    margin-bottom: 40px;
}
.chat span{
    font-size: 1.4em;    
}
.chat .time{
    display: block;
    font-size: 0.8em;
}
.messages{
    max-height: 300px;
    overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
 
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
 
.messages::-webkit-scrollbar-thumb {
  background: #aaa; 
}
</style>
