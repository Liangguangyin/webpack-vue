<template>
  <div>
    {{$store.state.name}}
    {{$store.getters.nameInfo}}
    <button @click="changes">change</button>
    <button @click="gettre">gettre</button>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    changes() {
      this.$store.commit("changeName", "OFF");
    },
    gettre() {
      this.$store.commit("changeName", "No");
    }
  }
};
</script>

<style scoped>
</style>