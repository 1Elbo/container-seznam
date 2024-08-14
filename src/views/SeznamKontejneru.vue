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
    <transition-group name="radek" tag="table" :key="-1">
      <tr class="nadpisy" :key="1">
        <td><h2>Číslo kontejneru</h2></td>
        <td><h2>Umístění kontejneru</h2></td>
        <td><h2>Typ kontejneru</h2></td>
      </tr>
      <tr
        v-for="kont in filteredItems"
        :key="kont.id"
        class="kontejner"
        @click="togglePopUp(kont.id)"
      >
        <td>{{ kont.cisloKontejneru }}</td>
        <td>
          {{ kont.umisteniKontejneru }}
        </td>
        <td
          :class="
            kont.typKontejneru === 'HC'
              ? 'hc'
              : kont.typKontejneru === 'DV'
              ? 'dv'
              : 'ot'
          "
        >
          {{ kont.typKontejneru }}
        </td>
      </tr>
    </transition-group>
  </aside>
  <Teleport to="table">
    <ContainerDetailPopUp
      v-if="isPopped"
      :objectById="objectById"
    ></ContainerDetailPopUp>
  </Teleport>
</template>

<script>
import { reactive, toRefs, ref, onMounted, computed } from 'vue';
import { data } from '@/seznamKontejneru.js';
import ContainerDetailPopUp from '@/components/ContainerDetailPopUp.vue';

export default {
  components: {
    ContainerDetailPopUp,
  },
  setup() {
    const seznamKontejneru = ref(data);
    const searchQuery = ref('');
    const state = reactive({
      isPopped: false,
      objectById: {},
    });

    /* COMPUTED */
    const filteredItems = computed(() => {
      return seznamKontejneru.value.filter((item) =>
        item.cisloKontejneru
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });

    /* FUNCTIONS */
    const togglePopUp = (id) => {
      const object = seznamKontejneru.value.find((kont) => kont.id === id);
      state.objectById = object;
      state.isPopped = true;
      setTimeout(() => {
        state.isPopped = false;
      }, 1500);
    };
    const kontejnerDelete = (id) => {
      const index = seznamKontejneru.value.findIndex((kont) => kont.id === id);
      seznamKontejneru.value.splice(index, 1);
    };
    const editList = (id) => {
      let object = seznamKontejneru.value.find((kont) => kont.id === id);
      console.log(object.id);
    };

    /* ON MOUNTED*/

    onMounted(() => {
      window.eventBus.on('container-add', (event) => {
        let maxId = Math.max(...seznamKontejneru.value.map((kont) => kont.id));
        data.push({
          id: maxId + 1,
          cisloKontejneru: event.cisloKontejneru,
          umisteniKontejneru: event.umisteniKontejneru,
          typKontejneru: event.typKontejneru,
          velikostKontejneru: event.velikostKontejneru,
        });
      });
    });

    return {
      kontejnerDelete,
      seznamKontejneru,
      searchQuery,
      filteredItems,
      togglePopUp,
      editList,

      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.popup {
  width: 80%;
  position: relative;
}
aside {
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  background-color: rgb(158, 252, 158);
}
table {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}
tr {
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;
}
td {
  width: 30%;
}
h1 {
  padding-block: 2rem;
}
.tabl {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  z-index: 1;
}
.nadpisy {
  background-color: black;
  color: #f8f8f8;
}
.nadpisy,
.kontejner {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}
.kontejner td {
  padding: 0.7rem;
}
.kontejner {
  background-color: #f8f8f8;
  position: relative;
}
.kontejner:nth-child(even) {
  background-color: rgb(241, 241, 241);
}
.kontejner:hover {
  background-color: rgb(219, 219, 219);
  cursor: pointer;
}
.searchbar {
  width: 80%;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
}
.searchbar input {
  padding: 10px;
  border-radius: 10px;
}
h2 {
  padding-block: 1rem;
}

.hc {
  color: rgba(255, 0, 0, 0.747);
  font-weight: 600;
}
.dv {
  color: rgb(0, 228, 0.747);
  font-weight: 600;
}
.ot {
  color: rgba(17, 0, 255, 0.747);
  font-weight: 600;
}
/* table td:first-child {
  padding-top: 5px;
} */

.cross {
  color: red;
  font-weight: 800;
}
.cross:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.radek-enter-active,
.radek-leave-active {
  transition: all 0.2s;
}
.radek-enter-from,
.radek-leave-to {
  opacity: 0;
  transform: scale(0.75);
}

@media screen and (max-width: 900px) {
  aside {
    width: 100%;
  }
  table {
    width: 98%;
  }
  /* table td:first-child {
    padding-top: 0px;
  } */
  h1 {
    text-align: center;
  }
  .nadpisy {
    font-size: 0.6rem;
  }
  .kontejner {
    font-size: 0.6rem;
  }
  .searchbar {
    justify-content: center;
  }
}
</style>
