<template>
  <div class="pio-wrapper" v-if="list">
    {{list}}
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>
