import store from '@/store/index';

export default {
  inserted(el, binding) {
    let list = store.state.permission.permissionList;
    let hide = true;
    let { value } = binding;
    if (!value) {
      return;
    }
    /* eslint-disable-next-line */
    for (let need of value) {
      if (!list.some(s => s === need)) {
        hide = false;
        break;
      }
    }
    if (hide) {
      el.parentNode.removeChild(el);
    }
  },
};
