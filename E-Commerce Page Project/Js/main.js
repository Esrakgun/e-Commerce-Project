
import { addToCart, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";

const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

// console.log(menuIcon);
// console.log(menu);

// Menuİcon'a tıklanınca menu'ye bir class eklemek:
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.includes("./cart.html")) {
    // !Eğer sepet sayfasındaysak sepete ekelenen ürünleri render et:
    renderCartItems();
    displayCartTotal();
    // console.log("Cart Sayfasındasınız..");
  } else {
    //   console.log("Ana Sayfadasınız..");
    // ! Eğer AnaSayfadaysak Api'ye istek at ve verileri al:
    const products = await fetchProducts();
    // console.log(products);
    // !Api'den gelinen verileri Render Etme:
     renderProducts(products, (e) => {
       // console.log(e);
       addToCart(e, products);
       // console.log(`Butona Tıklanıldı`);
     });
  }
});




// setTimeout(()=>{
//   console.log(`İşlem Gerçekleşti..`);
// },2000);

// setInterval(()=>{
//   console.log(`Sen Bu İşi çok iyi Kıvırıcaksın Kızım:)`);
// },1000);