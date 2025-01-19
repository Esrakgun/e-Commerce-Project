import elements from "./helpers.js";

// !LocalStorage'e ekleme Yapan Fonksiyon:
const saveToLocalStorage=(cart)=>{
    // ! Dışarıdan verilen eleman string e çevir ve localstorage'a ekle:
    localStorage.setItem("cart", JSON.stringify(cart));
};

// !LocalStorage'den eleman Çağıran Fonksiyon:
const getFromLocalStorage =()=>{
    // Cart key'indeki tüm elemanları localstorage'dan al:
    const strData=localStorage.getItem("cart");

    // Eğer strData varsa bunu JSON.parse ile dönüştür ve return et eğer yoksa boş bir dizi return et:
    return strData ?JSON.parse(strData):[];

};
// !Sepet Toplamını Hesaplayan Fonksiyon:
const calculateCartTotal = (cart)=> {
    // !Cart'daki Ürünlerin Miktar ve Fiyatını çarparak Toplam sonucu Elde et:
    // Reduce methodu Bir dizi üzerindeki tüm eelemanları dönerek bir işleme tabi tutar.Bu method belirtilen işlevin gerçekleştirdikten sonra geriye toplu bir sonuç döndürür.
    // Bu method diziAdı.reduce((1,2)=>{},3) şeklinde kullanılır Buradaki 1.değer toplam sonucun aktarılıcağı bir değişkendir buradaki 2. değerse currentVAlue karşılık gelir.Buda Her dönülen elemanın değerini alır. 

    // !Reduce'un 3. parametresi bir başlangıç değeri vardır.Bu değer,reduce'un başladığında dizi elemanları dönmek için ilk değerdir.Bu değer varsayılan olarak 0'dır.
 return cart.reduce((sum,item)=>sum + item.price * item.quantity, 0);
};

const updateCartIcon = (cart) => {
  // Septteki toplam ürün miktarını hesaplama:
  let totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  //  Sepetteki Ürün Miktarını Dinamik Şekilde Render Etme:
  // !SetAttribute özelliği bir elemana attrribute eklemek için kullanılır.
  elements.icon.setAttribute("data-quantity", totalQuantity);
};

// console.log(elements);


export { 
    saveToLocalStorage, 
    getFromLocalStorage, 
    calculateCartTotal,
    updateCartIcon,
 };