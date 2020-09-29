# 结论先行

1. 事件监听，组件注销时记得销毁。
2. 组件中销毁要指定销毁事件。


# 说明

1. 如果组件注销时事件监听没有被销毁，那么之后触发的话依然会执行，可能产生副作用。
2. 如果没有指定销毁的事件，只用 this.xxx.$off("emit") 的话，会移除所有对该事件的监听，如果其他组件（甚至是同一组件，但是放在页面的两个地方）也监听了这个事件，同样会失效。

# 示例
main.js
```javascript
const notify = new Vue();
Vue.prototype.notify = notify;
```
App.vue

```xml

<template>
  <div id="app">
    <CountComponent v-if="show" />
    <CountComponent2 />
    <button @click="click">触发计数</button>
    <button @click="render">注销/重新渲染第一个组件</button>
  </div>
</template>

```

```javascript

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

```


CountComponent.vue

```xml

<template>
  <div>count: {{ count }}</div>
</template>

```

```javascript

export default {
  data() {
    return { count: 0 };
  },
  mounted() {
    console.log("count component mounted");
    this.notify.$on("notify", this.listen);
  },
  beforeDestroy() {
    console.log("count component beforeDestroy");
    // 移除所有监听事件，当本组件被引用多次时，所有引用的监听全部移除
    // this.notify.$off("notify");
    // 移除指定监听事件
    // this.notify.$off("notify", this.listen);
  },
  methods: {
    listen() {
      console.log("count component listen");
      this.count++;
    },
  },
};

```

CountComponent2.vue 复制一份，换一下打印字符串就是。

页面如图：


![页面效果](https://img-blog.csdnimg.cn/20200925211522523.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tpbGwzNzAzNTQ=,size_16,color_FFFFFF,t_70#pic_center)



 1. 当  beforeDestroy 中两条 $off 语句都没有执行时，即使注销了第一个组件，点击触发计数按钮，控制台也还是会同时打印两条语句。如果重新渲染第一个组件，打印语句会变成三条……

2. 如果在第一个组件中解开下列代码：

```javascript
    // 移除所有监听事件，当本组件被引用多次时，所有引用的监听全部移除
     this.notify.$off("notify");
```
注销第一个组件后，点击触发计数按钮毫无反应。重新渲染后点击时，只会触发第一个组件的事件监听函数，打印日志只有一条。

3. 如果在第一个组件中解开下列代码：

```javascript
    // 移除指定监听事件
    this.notify.$off("notify", this.listen);
```
就是理想情况：打印语句只有一条，页面上的计数器还是会改变。重新渲染时就会出现两条打印日志。

另外我还注意到，原本是先执行第一个组件的事件监听处理函数，后执行第二个组件的的，如果第一个组件注销又重新渲染，执行会在第二个组件之后。不知道以后会不会踩到这个坑。


[点击这里查看示例代码](https://github.com/kill370354/remove-listener-before-destroy)

# 后记
看了一下 3.0 的[文档](https://vue3js.cn/docs/zh/guide/migration/events-api.html)，

> $on，$off 和 $once 实例方法已被移除，应用实例不再实现事件触发接口。

以后不会有这个问题了。