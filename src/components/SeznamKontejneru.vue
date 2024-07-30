<template>
    <aside>
         <h1>Seznam Kontejnerů</h1>
         <div class="searchbar">
            <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Hledat..." 
            @input="filterList"
            />
         </div>
        <!-- <transition-group name="radek" tag="div" class="tabl">
            <div class="nadpisy">
                <span><h2>Číslo kontejneru</h2></span>
                <span><h2>Umístění kontejneru</h2></span>
                <span><h2>Typ kontejneru</h2></span>
            </div>
            <div 
            class="kontejner"
            v-for="kont in seznamKontejneru" :key="kont.id" 
            @click="kontejnerDelete(kont.id)"
            >
            <span>{{ kont.cisloKontejneru }}</span>
            <span>{{ kont.umisteniKontejneru }}</span>
            <span :class="kont.typKontejneru === 'HC' ? 'hc' : kont.typKontejneru === 'DV'? 'dv': 'ot' ">{{ kont.typKontejneru }}</span>
        </div>
        </transition-group> -->
        <div class="tabl">
            <div class="nadpisy">
                <span><h2>Číslo kontejneru</h2></span>
                <span><h2>Umístění kontejneru</h2></span>
                <span><h2>Typ kontejneru</h2></span>
            </div>
        <transition-group name="radek" tag="div">
            
            <div 
            :class="kont.popUp? 'deleting': null "
            class="kontejner"
            v-for="kont in filteredItems" :key="kont.id" 
            
            @click="kont.popUp = !kont.popUp"
            >
            <span>{{ kont.cisloKontejneru }}</span>
            <span>{{ kont.umisteniKontejneru }}</span>
            <span :class="kont.typKontejneru === 'HC' ? 'hc' : kont.typKontejneru === 'DV'? 'dv': 'ot' ">{{ kont.typKontejneru }}</span>
            <span class="cross" 
            @click="kontejnerDelete(kont.id)"
            v-if="kont.popUp"
            >Odstranit</span>
        </div>
        
        </transition-group>
    </div>
        <!-- <li v-for="item in filteredItems" :key="item.id">
        {{ item.cisloKontejneru }}
      </li> -->
    </aside>
    
</template>

<script>
import {ref, onMounted, computed } from 'vue'
import { data } from '@/seznamKontejneru.js';

export default {
    
    setup () {
        const seznamKontejneru = ref(data)
        
        const searchQuery = ref('');
    
        /* COMPUTED */   
    const filteredItems = computed(() => {
      return seznamKontejneru.value.filter(item =>
        item.cisloKontejneru.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    /* FUNCTIONS */

        const kontejnerDelete = (id) => {
           const index = seznamKontejneru.value.findIndex(kont => kont.id === id)
            seznamKontejneru.value.splice(index, 1)
        }
       

        /* ON MOUNTED*/
        
        onMounted(() => {
            window.eventBus.on("kontejner-add", event => {
          /* Math.Max(...state.seznamKontejneru.map(id)) */
                let maxId = Math.max(...seznamKontejneru.value.map(kont => kont.id))
          data.push({
            
            id: maxId + 1,
            cisloKontejneru:  event.cisloKontejneru,
            umisteniKontejneru: event.umisteniKontejneru,
            typKontejneru: event.typKontejneru,
            velikostKontejneru: event.velikostKontejneru
          })
          
          
        })
        })
    
        return {
        
         kontejnerDelete, seznamKontejneru,searchQuery,
         filteredItems, 
        }
    }
}
</script>

<style scoped>
aside{
    width: 80%;
    height: 100vh;   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0 auto;
    background-color: rgb(158, 252, 158);
}
table{
    border: 1px solid black;
    
    width: 80%;
}
h1{
    padding-block: 2rem;
}
.tabl{
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 80%;
    z-index: 1;
}
.nadpisy{
    background-color: black;
    color: #f8f8f8;
}
.nadpisy,
.kontejner{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
}
.nadpisy span,
.kontejner span{
    width: 30%;
    text-align: center;
}
.kontejner span{
    padding: 0.7rem;
}
.kontejner{
    background-color: #f8f8f8;
    position: relative;
}
.cross{
    content: "x";
    
    color: red;
    height: 40px;
    width: 30px!important;
    /* background-color: black; */
   ;right: -50px;
    margin-left: 75px;
    
    position: absolute;
}
.cross:hover{
    transform: scale(2)
}
.deleting{
    border: 2px solid red;
    box-sizing: border-box;
}
.kontejner:nth-child(even){
    background-color: rgb(241, 241, 241);
}
.kontejner:hover{
    background-color: rgb(219, 219, 219);
    cursor: pointer;
}
.searchbar{
    width: 80%;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 1rem;
}
.searchbar input{
    padding: 10px;
    border-radius: 10px;
}
h2{
    padding-block: 1rem;
}

.hc{
    color: rgba(255, 0, 0, 0.747);
    font-weight: 600;
}
.dv{
    color: rgb(0, 228, 0.747);
    font-weight: 600;
}
.ot{
    color: rgba(17, 0, 255, 0.747);
    font-weight: 600;
}
table td:first-child{
    padding-top: 5px;
}

.cross{
    color: red;
    font-weight: 800;
    
}
.cross:hover{
    cursor: pointer;
    transform: scale(1.1)
}
.radek-enter-active,
.radek-leave-active{
    transition: all 0.20s;
}
.radek-enter-from,
.radek-leave-to{
    opacity: 0;
    transform: scale(0.75);
}
</style>