import router from '@/router';

function openNewPage(params) {
  const { href } = router.resolve(params);
  window.open(href, '_blank');
}

export default openNewPage;
