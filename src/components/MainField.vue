<template>
    <aside>
        <header>
            <h1>Přidat kontejner</h1>
        </header>
        <!-- <form class="section-one" >
            
            
            
            
            
            
            
        </form> -->
            
        <form class="section-one" @submit.prevent="zkouzkaPush">
            
            <div class="input-container">
                <input type="text" 
                name="cislo" 
                autofocus 
                required 
                id="cislo-kontejneru" 
                v-model="cisloKontejneru" 
                >
                <label>Číslo kontejneru</label>		
            </div>
            <div class="input-container">		
                <input 
                type="text" 
                name="" 
                required 
                id=""  
                v-model="umisteniKontejneru">
                <label>Umístění kontejneru</label>
            </div>
            <div class="input-container">		
                <input 
                type="text" 
                v-model="typKontejneru"
                name="" 
                required 
                id="" 
                pattern="[A-Z]{2}"
                maxlength="2"
                ref="userInput"
                :title="typKontejneru.length === 0 ? 'Typ kontejneru' : 'např HC, DV' " >
                <label>Typ kontejneru</label>
            </div>
            <div class="input-container">		
                <input 
                type="text" 
                name="" 
                v-model="velikostKontejneru"
                required 
                id="" 
                 >
                <label>Velikost kontejneru</label>
            </div>
            <button type="submit"></button>
        </form>	
    
        
    </aside>
</template>

<script>
import { reactive, toRefs,  } from 'vue'

export default {
    setup () {
        
        const state = reactive({
            /* seznamKontejneru: [], */
            cisloKontejneru: "",
            umisteniKontejneru: "",
            typKontejneru: "",
            velikostKontejneru: ""
        })
        const zkouzkaPush = () => {
            
            /* state.seznamKontejneru.push(state.cisloKontejneru)
            console.log("z main field" + state.seznamKontejneru) */
            window.eventBus.emit("kontejner-add", {
                cisloKontejneru: state.cisloKontejneru,
                umisteniKontejneru: state.umisteniKontejneru,
                typKontejneru: state.typKontejneru,
                velikostKontejneru: state.velikostKontejneru
            })
        }
    
        return {
            ...toRefs(state), zkouzkaPush
        }
    }
}
</script>

<style  scoped>
header{
   padding-bottom: 150px;
   padding-top: 3rem;
}
aside{
    background-color: rgb(158, 252, 158);
    width: 80%;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
.section-one{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    row-gap: 50px;
    justify-content: center;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    box-sizing: content-box;
}
.section-one input{
    width: 40%;
    height: 30px;
    border-radius: 15px;
    padding: 5px;
    border: 1px solid #f8f8f8;
    overflow: visible;
    
}

button{
    display: none;
}
/*LABEL*/



.input-container{
	position:relative;
	margin-bottom:25px;
    flex: 0 0 45%;
}
.input-container label{
	position:absolute;
	top:10px;
	left:5px;
	font-size:16px;
    color:rgb(0, 177, 0);
    transition: all 0.5s ease-in-out;
}
.input-container input{ 
  border:0;
  background-color: #f8f8f8;  
  
  width:100%;
  padding:13px 0 10px 7px;
  font-size:16px;
  color:#000000;
  
}
.input-container input:focus{ 
    outline: none;
    border: 2px solid rgb(0, 177, 0);
    transform: scaleY(1.1)
}
.input-container input:focus ~ label,
.input-container input:valid ~ label{
	top:-21px;
	font-size:15px;
	
}
</style>