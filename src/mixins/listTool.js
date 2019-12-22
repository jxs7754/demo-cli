// import { addGraphs } from '@/api/relationMap';
import store from '@/store/index';

import addGraph from '@/mixins/addGraph';
import addTarget from '@/mixins/addTarget';
import AddTarget from '@/views/target-manage/comp/add-target';
import Download from '@/views/target-manage/comp/download';

import deleteMix from '@/mixins/delete';
import deepCopy from '@/utils/deepCopy';

const toolList = [
  {
    type: 'target',
    name: '目标管理',
    handler: 'addProject',
    icon: 'icon-target',
  },
  {
    type: 'FORCE',
    name: '社交关系图',
    handler: 'addGraph',
    icon: 'icon-social',
  },
  {
    type: 'TOPOLOGY',
    name: '关系路径图',
    handler: 'addGraph',
    icon: 'icon-relation1',
  },
  {
    type: 'SPACE_TRAIL',
    name: '时空轨迹图',
    handler: 'addGraph',
    icon: 'icon-track-time',
    graphHide: true,
  },
  {
    type: 'tag',
    name: '标注',
    handler: 'addTag',
    icon: 'icon-target',
  },
  {
    type: 'copy',
    name: '复制',
    handler: 'handleTarget',
    icon: 'icon-target',
  },
  {
    type: 'move',
    name: '移动',
    handler: 'handleTarget',
    icon: 'icon-target',
  },
  {
    type: 'export',
    name: '下载',
    handler: 'handleExport',
    icon: 'icon-download',
  },
  // {
  //   type: 'download',
  //   name: '下载',
  //   handler: 'handleDownload',
  //   icon: 'icon-download',
  // },
  {
    type: 'delete',
    name: '删除',
    handler: 'handleDelete',
    icon: 'icon-delete',
  },
];


export default {
  mixins: [addGraph, addTarget, deleteMix],
  components: {
    AddTarget,
    Download,
  },
  data() {
    return {
      toolList: [],
      toolTypeList: ['target', 'FORCE', 'TOPOLOGY', 'SPACE_TRAIL', 'export'],
      handleData: [],
      downloadVisible: false,
      addRelationType: 12,
    };
  },
  methods: {
    handleTool(tool) {
      let type = tool.handler;
      this.handleData = deepCopy(this.selectedData);
      this[type](tool);
    },
    addGraph(tool) {
      console.log(tool);
      let seeds = this.handleData.map(i => ({
        objectId: i.uuid || i.xihuId || i.objectId,
        objectType: this.addRelationType,
      }));
      let obj = {
        graphType: tool.type,
        // objectIds: this.handleData.map(i => i.uuid || i.xihuId || i.objectId),
        seeds,
      };
      this.addGraphAjax(obj);
    },
    addTargetManage(tool) {
      console.log(tool);
    },
    getToolList() {
      let { permissionList } = store.state.permission;
      this.toolList = toolList.filter(i => (this.toolTypeList.indexOf(i.type) > -1
        && permissionList.indexOf(i.key) === -1));
    },
    handleDelete() {
      let targetIds = this.handleData.map(i => i.targetId)
        .toString();
      this.deleteTarget(targetIds, this.handleData.length);
    },
    handleExport() {
      this.downloadId = this.handleData.map(i => i.uuid || i.xihuId || i.objectId);
      this.downloadType = 'PEOPLE';
      this.isBatch = true;
      this.downloadVisible = true;
    },
    handleDownload() {
      let data = this.selectedData;
      this.downloadType = data.downloadType;
      this.downloadId = data.uuid || data.objectId || data.xihuId;
      this.downloadVisible = true;
      this.isBatch = false;
    },
  },
  created() {
    this.getToolList();
  },
};
