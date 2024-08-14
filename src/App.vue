<template>
  <SideBar></SideBar>
  <router-view></router-view>
</template>

<script>
import SideBar from './components/SideBar.vue';
export default {
  name: 'App',
  components: {
    SideBar,
  },
  setup() {
    return {};
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
@media screen and (max-width: 900px) {
  #app {
    flex-direction: column;
  }
}
</style>
