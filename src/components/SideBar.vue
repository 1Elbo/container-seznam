<template>
  <aside>
    <img :src="logo" alt="" srcset="" />
    <h2>Evidence kontejnerů</h2>
    <router-link to="/seznam">Seznam kontejnerů</router-link>
    <router-link to="/addContainer">Přidat kontejner</router-link>
  </aside>
</template>

<script>
import { reactive, toRefs } from 'vue';
import logo from '/src/assets/logo.png';

export default {
  setup() {
    const state = reactive({
      seznamActive: false,
      kontejnerActive: true,
    });
    const seznamShow = () => {
      (state.seznamActive = true), (state.kontejnerActive = false);
      window.eventBus.emit('seznam-clicked', {
        kontejnerActive: state.kontejnerActive,
        seznamActive: state.seznamActive,
      });
    };
    const kontejnerAddShow = () => {
      (state.seznamActive = false), (state.kontejnerActive = true);
      window.eventBus.emit('kontejner-page-clicked', {
        kontejnerActive: state.kontejnerActive,
        seznamActive: state.seznamActive,
      });
    };

    return {
      ...toRefs(state),
      logo,
      seznamShow,
      kontejnerAddShow,
    };
  },
};
</script>

<style scoped>
aside {
  width: 25%;
  height: 100vh;

  background-color: rgb(0, 199, 0);
  display: flex;
  align-items: center;
  flex-direction: column;
}
img {
  width: 100px;
  height: 100px;
  padding-top: 50px;
  filter: drop-shadow(1px 1px 2px black);
}
a {
  text-decoration: none;
  color: black;
  margin-top: 1rem;
}
nav:hover {
  transform: scale(1.02);
}
</style>
