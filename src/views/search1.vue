<template>

  <list-page
    :add-fun="getFun"
    :get-list-fun="getFun"
    :update-fun="getFun"
    :search-form-list="searchList"
    :form-list="formList">
  </list-page>

</template>

<script>

import ListPage from '../components/list-page.vue';

const searchList = [
  {
    type: 'text',
    key: 'name',
    label: '姓名',
  },
  {
    type: 'text',
    key: 'sex',
    label: '性别',
  },
];
export default {
  name: 'search1',
  components: { ListPage },
  data() {
    return {
      sex: '',
      searchList: null,
      formList: [
        {
          label: '姓名',
          key: 'name',
          type: 'text',
        },
        {
          label: '性别',
          key: 'sex',
          type: 'text',
        },
      ],
    };
  },
  methods: {
    getFun() {
      return Promise.resolve({
        total: 1,
        data: [
          {
            name: 'xx',
            age: 'xxx',
          }],
      });
    },
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 34px;
}
</style>
