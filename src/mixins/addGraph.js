import { addGraphs } from '@/api/relationMap';

export default {
  methods: {
    addGraphAjax(obj) {
      addGraphs(obj)
        .then(() => {
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 3000,
            showClose: true,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
