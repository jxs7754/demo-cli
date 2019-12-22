import addGraph from './addGraph';

const routerNameMap = {
  PEOPLE: 'personDetail',
  COMPANY: 'organizationDetail',
};
/* const menuList = [
  'viewDetail', 'add', 'label', 'FORCE', 'TOPOLOGY', 'SPACE_TRAIL', 'download', 'copy', 'move',
  'delete',
]; */
export default {
  mixins: [addGraph],
  data() {
    return {
      contextmenuList: [
        {
          label: '查看详情',
          type: 'viewDetail',
          action: (data) => {
            let id = data.uuid || data.objectId || data.xihuId;
            const { href } = this.$router.resolve({
              name: routerNameMap[this.type],
              params: { id },
            });
            window.open(href, '_blank');
          },
        },
        {
          label: '目标库',
          type: 'add',
          action: (data, option) => {
            this.$emit('right-click', option.type, data);
          },
        },
        {
          label: '数据标注',
          type: 'label',
          action: (data, option) => {
            this.$emit('right-click', option.type, data);
          },
        },
        {
          label: '社交关系图',
          type: 'FORCE',
          action: (data, option) => {
            this.handleGraph(data, option);
          },
        },
        {
          label: '关系路径图',
          type: 'TOPOLOGY',
          action: (data, option) => {
            this.handleGraph(data, option);
          },
        },
        {
          label: '时空轨迹图',
          type: 'SPACE_TRAIL',
          action: (data, option) => {
            this.handleGraph(data, option);
          },
        },
        {
          label: '下载',
          type: 'download',
          action: (data, option) => {
            data = Object.assign({}, data, { downloadType: this.type });
            this.$emit('right-click', option.type, data);
          },
        },
        {
          label: '复制到',
          type: 'copy',
          action: (data, option) => {
            this.$emit('right-click', option.type, data);
          },
        },
        {
          label: '移动到',
          type: 'move',
          action: (data, option) => {
            this.$emit('right-click', option.type, data);
          },
        },
        {
          label: '删除',
          type: 'delete',
          action: (data, option) => {
            this.$emit('right-click', option.type, data);
          },
        },
      ],
    };
  },
  methods: {
    handleGraph(data, option) {
      let seed = {
        objectId: data.uuid || data.objectId || data.xihuId,
        objectType: this.type === 'PEOPLE' ? 1 : 12,
      };
      let obj = {
        graphType: option.type,
        seeds: [seed],
      };
      this.addGraphAjax(obj);
    },
    contextmenu(row, noCollect) {
      if (noCollect) {
        return;
      }
      this.$contextmenu({
        items: this.contextmenuList,
        data: row,
      });
    },
  },
  created() {
    if (this.list) {
      this.contextmenuList = this.contextmenuList.filter(i => this.list.indexOf(i.type) > -1);
    } else {
      this.contextmenuList = [];
    }
  },
};
