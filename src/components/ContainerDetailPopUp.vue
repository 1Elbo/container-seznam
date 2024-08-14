<template>
  <div class="detail-popup">
    <div class="header">
      <h1>Detail kontejneru</h1>
      <div class="close"></div>
    </div>
    <div class="informations">
      <h2>{{ objectById.driverName }}</h2>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
/* import { data } from '@/seznamKontejneru.js'; */

export default {
  props: {
    objectById: {
      type: Object,
      required: true,
    },
  },
  setup() {
    /* const seznamKontejneru = ref(data); */
    const state = reactive({
      count: 0,
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style>
.detail-popup {
  position: absolute;
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  padding-left: 15px;
  box-sizing: border-box;
}
.header {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.close {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 32px;
  height: 32px;
  opacity: 0.4;
}
.close:hover {
  opacity: 1;
  cursor: pointer;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #ff0000f3;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>
