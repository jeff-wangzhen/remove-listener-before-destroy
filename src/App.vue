<template>
  <div id="app">
    <CountComponent v-if="show" />
    <CountComponent2 />
    <button @click="click">触发计数</button>
    <button @click="render">注销/重新渲染第一个组件</button>
  </div>
</template>

<script>
import CountComponent from "./components/CountComponent.vue";
import CountComponent2 from "./components/CountComponent2.vue";

export default {
  name: "App",
  components: { CountComponent, CountComponent2 },
  data() {
    return { show: true };
  },
  methods: {
    click() {
      this.notify.$emit("notify");
    },
    render() {
      this.show = !this.show;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  margin: 10px;
}
</style>
