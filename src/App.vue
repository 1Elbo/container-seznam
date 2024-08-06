<template>
  <SideBar></SideBar>
  <router-view></router-view>
</template>

<script>
import SideBar from './components/SideBar.vue';
import { reactive, toRefs, onMounted } from 'vue';

export default {
  name: 'App',
  components: {
    SideBar,
  },
  setup() {
    const state = reactive({
      seznamActive: '',
      kontejnerActive: true,
    });
    onMounted(() => {
      window.eventBus.on('seznam-clicked', (event) => {
        state.kontejnerActive = event.kontejnerActive;
        state.seznamActive = event.seznamActive;
      });
      window.eventBus.on('kontejner-page-clicked', (even) => {
        state.kontejnerActive = even.kontejnerActive;
        state.seznamActive = even.seznamActive;
      });
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
h1 {
  font-size: 3rem;
}
</style>
