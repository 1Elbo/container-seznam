<template>
  <aside>
    <img :src="logo" alt="" srcset="" />
    <div class="links">
      <h2>Evidence kontejnerů</h2>
      <router-link to="/seznam">Seznam kontejnerů</router-link>
      <router-link to="/addContainer">Přidat kontejner</router-link>
    </div>
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
  width: 450px;
  height: 100vh;

  background-color: rgb(0, 199, 0);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.links {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
@media screen and (max-width: 900px) {
  aside {
    width: 100%;
    height: 300px;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
  aside img {
    padding-top: 0;
  }
  .links {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}
</style>
