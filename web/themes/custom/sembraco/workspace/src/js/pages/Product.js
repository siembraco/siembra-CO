import Gallery from "../component/Gallery";

export default function Product() {
  let imagen = document.querySelectorAll(
    ".product__wrapper--three .paragraph--type--galeria-imagen .field--name-field-imagen"
  );
  let element = document.querySelector(
    ".product__wrapper--three .field--name-field-galeria"
  );
  if (imagen.length > 1) {
    setTimeout(() => {
      Gallery(element);
    }, 1000);
  }
  let $elem = document.querySelector(".view--store--outstanding .view-content");
  Gallery($elem);
  let title = document.querySelector(".main-content .field--name-title");
  let hopeTitle = document.querySelector(".hope-title");
  hopeTitle.innerHTML = title.innerHTML;

  let list = document.querySelectorAll(
    ".field--name-field-lista- .field__item"
  );
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    element.addEventListener("click", function () {
      this.classList.add("active-item-list");
      for (let sibling of this.parentNode.children) {
        if (sibling !== this) sibling.classList.remove("active-item-list");
      }
    });
  }
  let list1 = document.querySelector(".field--name-field-lista- .field__item");
  list1.click();

  let blockBannerdetalleproducto = document.querySelector(
    "#block-bannerdetalleproducto"
  );
  blockBannerdetalleproducto.classList.add("banner-template-two");
  blockBannerdetalleproducto.classList.add("banner");

  let ilustracion = document.querySelector("body.path-product .product__wrapper--one .field--name-field-ilustracion- img");
  ilustracion.classList.add("animation-siembraco");
  setInterval(() => {
    let bodyText = document.querySelector("body.path-product .product__wrapper--one .field--name-body");
    bodyText.classList.add("animation-siembraco");
    let price = document.querySelector("body.path-product article .field--name-price");
    price.classList.add("animation-siembraco");
    let background = document.querySelector("body.path-product .product__wrapper--one .field--name-field-imagen-de-fondo");
    background.classList.add("animation-siembraco");
    let title = document.querySelector(" body.path-product article .field--name-title");
    title.classList.add("animation-siembraco");
  }, 600);
  window.addEventListener('scroll', function () {
    let scroll_position = window.scrollY;
    let BlockAboutOne = document.querySelector(".product__wrapper--one");
    let BlockAboutTwo = document.querySelector(".product__wrapper--two");
    let BlockAboutThree = document.querySelector(".product__wrapper--three");

    if (BlockAboutOne.scrollHeight <= parseInt(scroll_position - 200)) {
      BlockAboutTwo.classList.add("animation-siembraco");
      setInterval(() => {
        BlockAboutThree.classList.add("animation-siembraco");
      }, 1500);
    } else {
      BlockAboutTwo.classList.remove("animation-siembraco");
      BlockAboutThree.classList.remove("animation-siembraco");
    }
    if (BlockAboutOne.scrollHeight <= parseInt(scroll_position - 400)) {
      ilustracion.classList.add("animation-siembraco-stop");
    } else {
      ilustracion.classList.remove("animation-siembraco-stop");
    }
  });
}
