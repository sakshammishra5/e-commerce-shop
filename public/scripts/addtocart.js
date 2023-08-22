const productsList = document.querySelector('.productsList');

productsList.addEventListener('click', async(ev) => {
    console.log(ev.target);
    if (ev.target.classList.contains('addToCart')) {
        let productId = ev.target.getAttribute('productId')
        console.log(productId);
        try {
         let data= await axios.get(`/shop/addtocart?productId=${productId}`)
         console.log(data.data);
         const cartcount = document.querySelector('.cartcount');
         cartcount.innerText=data.data.cartCount
         let sideView = document.querySelector('.sideView');
         sideView.classList.toggle('showCart');
        }
        catch {
              
        }
    }
})