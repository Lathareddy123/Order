var cartVisible = false;
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    var botonesremoveItem = document.getElementsByClassName('btn-remove');
    for(var i=0;i<botonesremoveItem.length; i++){
        var button = botonesremoveItem[i];
        button.addEventListener('click',removeItemcart);
    }

    var botonesSumarquantity = document.getElementsByClassName('sumar-quantity');
    for(var i=0;i<botonesSumarquantity.length; i++){
        var button = botonesSumarquantity[i];
        button.addEventListener('click',sumarquantity);
    }
    var botonesRestarquantity = document.getElementsByClassName('restar-quantity');
    for(var i=0;i<botonesRestarquantity.length; i++){
        var button = botonesRestarquantity[i];
        button.addEventListener('click',restarquantity);
    }

    var botonesaddtocart = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesaddtocart.length;i++){
        var button = botonesaddtocart[i];
        button.addEventListener('click', addtocartClicked);
    }
   }

function addtocartClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var title = item.getElementsByClassName('title-item')[0].innerText;
    var price = item.getElementsByClassName('price-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlcart(title, price, imagenSrc);

    doVisiblecart();
}


function doVisiblecart(){
    cartVisible = true;
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight = '0';
    cart.style.opacity = '1';

    var items =document.getElementsByClassName('con-items')[0];
    items.style.width = '60%';
}


function agregarItemAlcart(title, price, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemscart = document.getElementsByClassName('cart-items')[0];

    
    var numbersItemscart = itemscart.getElementsByClassName('cart-item-title');
    for(var i=0;i < numbersItemscart.length;i++){
        if(numbersItemscart[i].innerText==title){
            alert("alredy iteam added on cart");
            return;
        }
    }

    var itemcartquantity = `
        <div class="cart-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="cart-item-details">
                <span class="cart-item-title">${title}</span>
                <div class="selector-quantity">
                    <i class="fa-solid fa-minus restar-quantity"></i>
                    <input type="text" value="1" class="cart-item-quantity" disabled>
                    <i class="fa-solid fa-plus sumar-quantity"></i>
                </div>
                <span class="cart-item-price">${price}</span>
            </div>
            <button class="btn-remove">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemcartquantity;
    itemscart.append(item);

    
     item.getElementsByClassName('btn-remove')[0].addEventListener('click', removeItemcart);

    
    var botonRestarquantity = item.getElementsByClassName('restar-quantity')[0];
    botonRestarquantity.addEventListener('click',restarquantity);

    
    var botonSumarquantity = item.getElementsByClassName('sumar-quantity')[0];
    botonSumarquantity.addEventListener('click',sumarquantity);

    
    updateTotalcart();
}

function sumarquantity(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-quantity')[0].value);
    var quantityActual = selector.getElementsByClassName('cart-item-quantity')[0].value;
    quantityActual++;
    selector.getElementsByClassName('cart-item-quantity')[0].value = quantityActual;
    updateTotalcart();
}

function restarquantity(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-quantity')[0].value);
    var quantityActual = selector.getElementsByClassName('cart-item-quantity')[0].value;
    quantityActual--;
    if(quantityActual>=1){
        selector.getElementsByClassName('cart-item-quantity')[0].value = quantityActual;
        updateTotalcart();
    }
}


function removeItemcart(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    
    updateTotalcart();
    
    ocultarcart();
}

function ocultarcart(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems.childElementCount==0){
        var cart = document.getElementsByClassName('cart')[0];
        cart.style.marginRight = '-100%';
        cart.style.opacity = '0';
        cartVisible = false;
    
        var items =document.getElementsByClassName('con-items')[0];
        items.style.width = '100%';
    }
}

function updateTotalcart(){
    
    var cartcon = document.getElementsByClassName('cart')[0];
    var cartItems = cartcon.getElementsByClassName('cart-item');
    var total = 0;
    
    for(var i=0; i< cartItems.length;i++){
        var item = cartItems[i];
        var priceElemento = item.getElementsByClassName('cart-item-price')[0];
        
        var price = parseFloat(priceElemento.innerText.replace('$','').replace('.',''));
        var quantityItem = item.getElementsByClassName('cart-item-quantity')[0];
        console.log(price);
        var quantity = quantityItem.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('cart-price-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}








