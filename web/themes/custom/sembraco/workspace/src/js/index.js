import Navbar from "./component/Navbar";
import AboutUs from "./pages/AboutUs";
import Farmers from "./pages/Farmers";
import Bbva from "./pages/Bbva"
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MapSiembraco from "./component/MapSiembraco"
//import domReady from "./utils/utils"
/**
 *
 */
(function ($, Drupal) {
  /**
   *
   * @type {{attach: Drupal.behaviors.sembraco.attach}}
   */
  Drupal.behaviors.sembraco = {
    attach: function (context) {
      let ClassBodyHome = document.body.classList.contains("path-frontpage");
      ClassBodyHome === true ? Home() : null;

      let ClassAboutUs = document.body.classList.contains("about-us");
      ClassAboutUs === true ? AboutUs() : null;

      let ClassFarmers = document.body.classList.contains("farmers");
      ClassFarmers === true ? Farmers() : null;

      let ClassBbva = document.body.classList.contains("bbva");
      ClassBbva === true ? Bbva() : null;

      let ClassProduct = document.body.classList.contains("path-product");
      ClassProduct === true ? Product() : null;

      let ClassCart = document.body.classList.contains("path-cart");
      ClassCart === true ? Cart() : null;

      let ClassCheckout = document.body.classList.contains("path-checkout");
      ClassCheckout === true ? Checkout() : null;

      let OnlyLogin = document.querySelectorAll("a.only-login")
      for (let index = 0; index < OnlyLogin.length; index++) {
        const element = OnlyLogin[index];
        element.parentElement.classList.add("only-login")
      }
       let OnlyNotLogin = document.querySelectorAll("a.only-not-login")
      for (let index = 0; index < OnlyNotLogin.length; index++) {
        const element = OnlyNotLogin[index];
        element.parentElement.classList.add("only-not-login")
      }
      Weglot.initialize({
        api_key: 'wg_95fc29fd95124272938f1596e038dd751'
      });
      console.log("inicio desde aqui");
      function load() {
        setTimeout(() => {
          document.querySelector("html").classList.add("preload");
        }, 1000);
      }
      window.onload = load;

      if (document.getElementById("mapa-result-siembraco")) {
        MapSiembraco();
      }

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-W603SGNERR');
    },
  };
})(jQuery, Drupal);
