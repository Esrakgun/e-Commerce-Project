import elements from "./helpers.js";
import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

//A //!Localstorage'dan cart verisini aldık:
let cart = getFromLocalStorage();
// Sepet ve Kart dizisi oluşturduk sepetteki ürün dizinden hangisine tıklıyorsam tıklanan ürünün özelliklerini gösteriyor.
// console.log(cart);

//B // !Sepete ekleme yapan fonksiyonU oluşturduk:
const addToCart = (e, products) => {
  // console.log(`Cart js dosyasından selamlar..`)
  // console.log(e);
  // console.log(e.target);
  // console.log(e.target.dataseti.id);

  //C //!Tıklanılan elemanın id'sine erişme:
  const productId = parseInt(e.target.dataset.id);
  // console.log(productId);

  //D //!Product içerisinden id'si bilinen elemana erişme:
  const product = products.find((product) => product.id === productId);

  //E //!Eğer ürün  sepette varsa cart dizisini kontrolme:

  if (product) {
    // Ürün sepette varmı bunu kontrol et ve varsa bunu exitingItem a aktar
    const exitingItem = cart.find((item) => item.id === productId);
    //console.log(exitingItem);

    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      // console.log(product);

      // Erişilen elemanın verileriyle bir cart elemanı objesi oluşturma:
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // Cart dizisine bu cart objesini (cartItem objesini) ekleme:
      cart.push(cartItem);
      // console.log(cartItem);

    }
    // saveToLocalstorage(cartItem);
    // Cart dizisini localstorage'a ekleme:
    saveToLocalStorage(cart);

    // Sepete ekle butonun içeriğini Güncelleme:
    e.target.textContent = "Added";

    // 2s sonra elemanın içeriğini tekrardan eski haline döndürme:
    setTimeout(() => {
      e.target.textContent = "Add to Cart";
    }, 2000);

    // Sepet ikonunu Güncelleme:
    updateCartIcon(cart);
  }
};

//1 // ! Sepetten Ürün Kaldıracak Fonksiyon:

const removeFromCart = (e) => {
  console.log(e.target.dataset.id);

  // Tıklanılan elemanın id'sine erişme:
  const productId = parseInt(e.target.dataset.id);
  // console.log(productId);

  //Id'si bilinen elemanı sepet içinde bul ve filter ile sepetten kaldırma:
  cart = cart.filter((item) => item.id != productId);
  // console.log(cart);

  // Localstorage'i güncelleme:
  saveToLocalStorage(cart);

  // Arayüzü tekrardan Render Etme:
  renderCartItems();

  // Sepet toplamını render Etme:
  displayCartTotal();

  // Sepet ikonunu güncelle
  updateCartIcon(cart);
};


//2 // ! Sepetteki Ürün Miktarını Güncelleyen Fonksiyon:

const onQuantityChange = (e) => {
  // console.log(`Değişti..`);
  // e.target;
  // console.log(e.target);
  // console.log(e.target.dataset.id);
  //? const productId =parseInt(e.target.dataset.id);
  //? console.log(productId);

  const productId = +e.target.dataset.id;
  // console.log(productId);

  const newQuantity = +e.target.value;
  // console.log(quantity);
  

//3 //! Sepeteki elemanın değeri 0'dan büyükse:
  if (newQuantity > 0) {
    // Sepet içerisinde miktarı değişen elemanı bulma:
    const cartItem = cart.find((item) => item.id === productId);
    // console.log(cartItem);

    // Bulunan elemanın miktarını Güncelleme:
    cartItem.quantity = newQuantity;
    // console.log(cartItem);

    // Localstorag'ı Güncelleme:
    saveToLocalStorage(cart);

    // Toplam Fiyatı Güncelleme:
    displayCartTotal();

    // Sepet ikonunu Güncelleme:
    updateCartIcon(cart);
  }
};

//4 // !Sepetteki ürünleri Render Edecek fonksiyon:

const renderCartItems = () => {
  elements.cartItemsList.innerHTML = cart
    .map(
      (item) => `  <div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />

              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input type="number" min="1" class='cart-item-quantity' data-id='${item.id}'  value="${item.quantity}" />
              </div>

              <h2 class="cart-item-price">$ ${item.price}</h2>

              <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
            </div>`
    )
    .join("");

  //5 //!Remove-from-cart classına sahip olan butonlara erişme:
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  // console.log(removeButtons);

  //6 //!RemoveButtons içerisindeki herbir butona ayrı ayrı erişme:

  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    // console.log(removeButton);

    //7 //!Bu butonlara bir tıklanma gerçekleştiğinde bir fonksiyon tetikleme:
    removeButton.addEventListener("click", removeFromCart);
    // (e)=>{
    //   console.log(`Sil Butonuna Tıklandı..`);
    //   console.log(e.target);}
  }

  //8 //!Cart-item-quantity classına sahip tüm elemanlara erişme:
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  // console.log(quantity);

  //9 //!quantityInputs içerisindeki herbir inputa ayrı ayrı erişme:

  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    // console.log(quantityInput);
    

    //quantityInput lara birer olay izleyicisi ekleme:
    quantityInput.addEventListener("change", onQuantityChange);
    // console.log(`Input Değişti..`);
    
  }
};

  //10  //! Sepetteki toplam ürün mikarını render eden fonksiyon:
  const displayCartTotal = () => {
       // calculateCartTotal ile sepetteki toplam fiyatı hesaplama:
    const total = calculateCartTotal(cart);
    // console.log(total);
    
    // Toplam değeri ekranda render etme:
    elements.cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  };

export { addToCart, renderCartItems, displayCartTotal };
