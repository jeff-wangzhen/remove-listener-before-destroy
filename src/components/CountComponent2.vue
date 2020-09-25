<template>
  <div>count2: {{ count }}</div>
</template>

<script>
export default {
  data() {
    return { count: 0 };
  },
  mounted() {
    console.log("2 mounted");
    this.notify.$on("notify", this.listen);
  },
  beforeDestroy() {
    console.log("2 beforeDestroy");
    // 移除所有监听事件，当本组件被引用多次时，所有引用的监听全部移除
    // this.notify.$off("notify");
    // 移除所有监听事件，当本组件被引用多次时，所有引用的监听全部移除
    // this.notify.$off("notify", this.listen);
  },
  methods: {
    listen() {
      console.log("2 listen");
      this.count++;
    },
  },
};
</script>
<style scoped></style>
