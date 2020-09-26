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
