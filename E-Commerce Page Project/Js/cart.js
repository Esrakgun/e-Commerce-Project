
import elements from "./helpers.js";
import { calculateCartToTotal, getFromLocalStorage, saveToLocalStorage } from "./utils.js";

//A// !LocalStorageden Cart verisini aldık:
let cart = getFromLocalStorage();

//B//Sepet oluşturcak ve yazdırdık..Kart dizisi oluşturdu sepetteki ürün dizisi ne tıklıyorsam düseşn o ürünün özelliklerini gösteriyor.
// console.log(cart);
// !Sepete Ekleme Yapan Fonsiyon:
const addToCart = (e, products) => {
  // console.log(`Card js dosyasından selamlar size..`);
  // console.log(e);
  // console.log(e.target);
  // console.log(e.target.dataset.id);

  //C//!Tıklanılan elemanın id'sine eriş:
  const productId = parseInt(e.target.dataset.id);
  // console.log(productId);

  //D//!Product içerisinde id'si bilinen elemana erişmek:
  const product = products.find((product) => product.id === productId);

  //E//!Eğer ürün sepette varsa diziyi kontrol etmek:
  if (product) {
    // !Ürün sepette var mı bunu kontrol et ve varsa bunu ExitingIteme aktar:
    const exitingItem = cart.find((item) => item.id === productId);
    // console.log(exitingItem);
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      // console.log(product);
      //!Erişilen elemanın verileriyle bir cart elemanı objesi oluşturma:
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      //F//!Cart dizisine bu cart objesini(cartItem) ekle push ile:
      cart.push(cartItem);
      // console.log(cartItem);
    }
    // saveToLocalStorage(cartItem);
    //G// !Cart dizisini LocalStorage'a eklemek için yaptık:
    saveToLocalStorage(cart);

    //H// !Sepete Ekle Butonunun içeriğini güncelle:
    e.target.textContent = "Added";

    //I // 2sn sonra elemanın içiriğini tekrardan eski haline dönsün:
    setTimeout(() => {
      e.target.textContent = "Add to Cart";
    }, 2000);
  }
};

//1// !Sepetten Ürün Kaldıracak Fonksiyon:
const  removeFromCart = (e) =>{
        //  console.log(e.taret.dataset.id);
        // !Tıklanan Elemanın  Id'sine eriş:
        const productId= parseInt(e.target.dataset.id);
        // console.log(productId);
        // Id'si bilinen elemanı sepet içinde bul ve filter ile sepetten kaldırmak:
      cart=cart.filter((item) => item.id != productId);
      // console.log(cart);
      // !LocalStorage'i güncelle:
      saveToLocalStorage(cart);
      // !Arayüzü Tekrardan Render Et:
      renderCartItems();
      // Sepet toplamını render et:
      displayCartTotal();
};

// 2//!Sepetteki Ürünü Güncelleyen Fonksiyon:

    const onQuantityChange =(e)=>{
      // console.log(`Değişti`);
      // e.target;
      // console.log(e.target);
      // console.log(e.target.dataset.id);
      //? const productId= parseInt(e.target.dataset.id);
      //? console.log(productId);
      
      const productId = +e.target.dataset.id;
      // console.log(productId);

      const newQuantity =+e.target.value;
      // console.log(quantity);

      // !Sepetteki elemanın değeri 0'dan büyükse:
      if(newQuantity>0){
        // Sepet içerisinde miktarı değişen elemanı bulma:
        const cartItem = cart.find((item) => item.id === productId);
        // console.log(cartItem);

        // Bulunan elemanın miktarını güncelle:
        cartItem.quantity=newQuantity;
        // console.log(cartItem);
        // LocalStorage 'i Güncelleme:
        saveToLocalStorage(cart);

        // Toplam Fiyatı Güncelleme:
        displayCartTotal();
      }
    };



// ! Sepetteki ürünleri render edecek fonksiyon

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




    // !Remove-from-cart clasının sahip olan butonlara eriş:
     const removeButtons = document.querySelectorAll(".remove-from-cart");
    // console.log(removeButtons);

  //  RemoveButtons içeriisndeki herbir butona ayrı ayrı eriş:
   for (let i = 0; i < removeButtons.length; i++) {
     const removeButton = removeButtons[i];
    //  console.log(removeButton);
    //  !Bu butonlara tıklanma gerçekleştiğinde bir fonksiyon tetile:
    removeButton.addEventListener("click", removeFromCart);
  //     (e)=>{
  // console.log(`Sil Butonuna Tıklandı..`);
  // console.log(e.target);
  //}
 
   }

  //  Cart-item-quantity Classına sahip tüm elemanlara eriş:
  const quantityInputs=document.querySelectorAll(".cart-item-quantity");
  console.log(quantity);

  // quantityInputs içeriğindeki herbir inputa ayrı ayrı eriş:
  for(let i=0; i<quantityInputs.length; i++){
    const quantityInput =quantityInputs[i];
    // console.log(quantityInput);

    //!quantityInput'lara birer olay izleyiciis eklemek:
    quantityInput.addEventListener("change",()=>{
      //  console.log(`İnput Değişti.`)
    });
  }
  
};

// Sepetteki toplam ürün mikarını render eden fonksiyon
const displayCartTotal = () => {
  // calculateCartTotal ile sepetteki toplam fiyatı hesapla:
  const total = calculateCartToTotal(cart);
  // console.log(total);
  
  // Toplam değeri ekranda render et
  elements.cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};


export {addToCart, renderCartItems};