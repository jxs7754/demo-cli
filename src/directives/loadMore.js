/* eslint-disable */
const loadmore = {
  bind(el, binding) {
    let { arg } = binding;
    if (arg) {
      el = el.getElementsByClassName(arg)[0];
    }
    el.addEventListener('scroll', () => {
      if (el.scrollHeight - el.clientHeight === el.scrollTop) {
        binding.value(binding.arg);
      }
    });
  },
};
export default loadmore;
