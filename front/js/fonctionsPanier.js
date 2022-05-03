function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null){
        return [];
    }else{
        return JSON.parse(basket);
    }
}

function addBasket(product, quantité) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p._id == product._id);
    if (foundProduct != undefined) {  
        let foundProduct = basket.find(c => c.color == product.color);        
        if (foundProduct != undefined) {        
            console.log("produits identiques");    
            foundProduct.quantity += Number(quantité);                   
        }else{
            console.log("produits différents");
            product.quantity = Number(quantité);
            basket.push(product);
        }        
    }else{
        console.log("produits différents");
        product.quantity = Number(quantité);
        basket.push(product);
    }
    saveBasket(basket);
}

function calculNombreProduit() {
    let basket = getBasket();
    let number = 0;
    for (let produit of basket) {
        number += Number(produit.quantity);
    }
    return number;
}

function calculPrixTotal() {
    let basket = getBasket();
    let total = 0;
    for (let produit of basket) {
        total += produit.quantity * produit.price;
    }
    return total;
}

//----Récupération datas dans la fenêtre de navigation 
function getDataWindowLocation (val){
    var str = window.location;
    var url = new URL(str);    
    return url.searchParams.get(val);        
}
