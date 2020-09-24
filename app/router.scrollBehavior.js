export default async function (to, from, savedPosition) {
  if (to.hash) {
    setTimeout(() => {
      $("html, body").animate({
        scrollTop: $(to.hash).offset().top - 100
      }, 600);
    }, 100)
     return;
  }

  return {
    x: 0,
    y: 0
  }
}
