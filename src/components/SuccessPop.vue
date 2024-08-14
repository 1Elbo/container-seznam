<template>
  <div class="success">
    <h1>Kontejner úspěšně přidán!</h1>
  </div>
</template>
<style scoped>
.success {
  position: absolute;
  top: 0;
  margin-left: 450px;
  height: 100%;
  width: 100%;
  background-color: rgb(158, 252, 158);
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  margin-left: -450px;
}
@media screen and (max-width: 900px) {
  .success {
    margin-left: 0;
    width: 100%;
    height: 100vh;
    margin-top: 300px;
  }
  h1 {
    margin-left: 0;
    font-size: 2rem;
    margin-top: -300px;
    text-align: center;
  }
}
</style>
