<template>
   <div class="navbarlucruripreferate container">
       <nav class="nav-extended indigo darken-2">
           <div class="nav-content">
               <router-link :to="{name: 'LucruriPreferate', params: {email: this.email}}">
                 <center><span class="nav-title">Lista cu lucrurile tale preferate</span></center>
               </router-link>
               <a href="" class="btn-floating btn-large halfway-fab pink">
                   <router-link :to="{name: 'AddLucruri'}">
                       <i class="material-icons">add</i>
                   </router-link>
               </a>
           </div>
       </nav>
   </div> 
</template>

<script>
export default {
    name: 'NavbarLucruriPreferate',
    props: ['email'],
    data(){
        return{

        }
    }
}
</script>

<style>
.navbarlucruripreferate{
    margin-top: 100px;
}
.navbarlucruripreferate nav{
    padding: 0 20px;

}
</style>

