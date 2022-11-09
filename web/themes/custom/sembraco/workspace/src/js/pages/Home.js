import Gallery from "../component/Gallery";

export default function Home() {
  let $elem = document.querySelector(".view--store--outstanding .view-content");
  Gallery($elem);
  let $elemStep = document.querySelector(".step-by-step .field-content");
  Gallery($elemStep);
  let $elemfarmers = document.querySelector(
    ".view-block-farmers .view-content"
  );
  Gallery($elemfarmers);
  let semilla = ["sem1", "sem2", "sem3", "sem4", "sem5"]
  let animation = document.querySelector("#block-semilla img");
  let valueblock = document.querySelector("body").offsetHeight / 6;
  window.addEventListener('scroll', function () {
    let scroll_position = window.scrollY;
    planta(scroll_position );
  });
  function planta(scrollPosition ) {
    if (scrollPosition < valueblock) {
      animation.src = `${window.location.origin}/sites/default/files/2022-02/${semilla[0]}.png`
    } else if (scrollPosition < valueblock * 2) {
      animation.src = `${window.location.origin}/sites/default/files/2022-02/${semilla[1]}.png`
    } else if (scrollPosition < valueblock * 3) {
      animation.src = `${window.location.origin}/sites/default/files/2022-02/${semilla[2]}.png`
    } else if (scrollPosition < valueblock * 4) {
      animation.src = `${window.location.origin}/sites/default/files/2022-02/${semilla[3]}.png`
    } else if (scrollPosition < valueblock * 5) {
      animation.src = `${window.location.origin}/sites/default/files/2022-02/${semilla[4]}.png`
    }
  }
  let scroll_position = window.scrollY;
  planta(scroll_position);
}
