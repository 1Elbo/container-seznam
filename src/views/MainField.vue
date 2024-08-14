<template>
  <aside>
    <header>
      <h1>Přidat kontejner</h1>
    </header>
    <form class="section-one" @submit.prevent="submitForm">
      <div class="input-container">
        <input
          type="text"
          name="cislo"
          autofocus
          required
          id="cislo-kontejneru"
          v-model="cisloKontejneru"
        />
        <label>Číslo kontejneru</label>
      </div>
      <div class="input-container">
        <input
          type="text"
          name=""
          required
          id=""
          v-model="umisteniKontejneru"
        />
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
          :title="typKontejneru.length === 0 ? 'Typ kontejneru' : 'např HC, DV'"
        />
        <label>Typ kontejneru</label>
      </div>
      <div class="input-container">
        <input
          type="text"
          name=""
          v-model="velikostKontejneru"
          required
          id=""
        />
        <label>Velikost kontejneru</label>
      </div>
      <button type="submit"></button>
    </form>
  </aside>

  <Teleport to="body">
    <Transition name="sucess">
      <SuccessPop v-if="formSubmitted"></SuccessPop>
    </Transition>
  </Teleport>
</template>

<script>
import { reactive, toRefs } from 'vue';
import SuccessPop from '@/components/SuccessPop.vue';
import { setTimeout } from 'core-js';

export default {
  components: {
    SuccessPop,
  },
  setup() {
    const state = reactive({
      /* seznamKontejneru: [], */
      cisloKontejneru: '',
      umisteniKontejneru: '',
      typKontejneru: '',
      velikostKontejneru: '',
      formSubmitted: false,
    });
    const submitForm = () => {
      window.eventBus.emit('container-add', {
        cisloKontejneru: state.cisloKontejneru,
        umisteniKontejneru: state.umisteniKontejneru,
        typKontejneru: state.typKontejneru,
        velikostKontejneru: state.velikostKontejneru,
      });

      state.formSubmitted = true;
      document.activeElement.blur();
      setTimeout(() => {
        state.formSubmitted = false;
      }, 3000);
    };

    return {
      ...toRefs(state),
      submitForm,
    };
  },
};
</script>

<style scoped>
header {
  padding-bottom: 150px;
  padding-top: 3rem;
}
aside {
  background-color: rgb(158, 252, 158);
  width: 80%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.section-one {
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
.section-one input {
  width: 40%;
  height: 30px;
  border-radius: 15px;
  padding: 5px;
  border: 1px solid #f8f8f8;
  overflow: visible;
}

button {
  display: none;
}
/*LABEL*/

.input-container {
  position: relative;
  margin-bottom: 25px;
  flex: 0 0 45%;
}
.input-container label {
  position: absolute;
  top: -25px;
  left: 5px;
  font-size: 16px;
  color: rgb(0, 177, 0);
  transition: all 0.5s ease-in-out;
}
.input-container input {
  border: 0;
  background-color: #f8f8f8;

  width: 100%;
  padding: 13px 0 10px 7px;
  font-size: 16px;
  color: #000000;
}
.input-container input:focus {
  outline: none;
  border: 2px solid rgb(0, 177, 0);
  transform: scaleY(1.1);
}
.sucess-enter-active,
.sucess-leave-active {
  transition: opacity 0.5s ease;
}

.sucess-enter-from,
.sucess-leave-to {
  opacity: 0;
}
@media screen and (max-width: 900px) {
  aside {
    width: 100%;
  }
}
@media screen and (max-width: 900px) {
  .section-one {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .input-container {
    flex: none;
    margin-bottom: 0;
    width: 80%;
  }
  header {
    padding-bottom: 3rem;
  }
  h1 {
    text-align: center;
  }
}
</style>
