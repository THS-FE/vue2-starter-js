<template>
  <div>
    <img :src="require(`../assets/images/exception/${exceptionType}.png`)" :alt="exceptionType" />
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api';

export default {
  setup(props, { root: { $route } }) {
    /**
     * 异常类型
     * @type {string}
     * @default '403'
     */
    const exceptionType = ref('403');
    onMounted(() => {
      exceptionType.value = $route.params.type;
    });
    return {
      exceptionType,
    };
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  height: 100%;
}
img {
  height: 100%;
}
</style>
