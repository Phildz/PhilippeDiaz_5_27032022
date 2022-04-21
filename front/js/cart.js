//Récupération de la variable produit dans le local

function getCart() {
    let produit = localStorage.getItem("basket");
    if (produit == null){
        return [];        
    }else{
        return JSON.parse(produit);
    }
  };
  
const produit = getCart();
console.log(produit);


const panierDisplay = () => {
  //await fetchKanapé();
  
    const articlePosition = document.getElementById("cart__items"); 
    const totalQuantityPosition = document.getElementById("totalQuantity");
    const totalPricePosition = document.getElementById("totalPrice");
      

    let structurePagePanier = [];
    let structureQuantitéPrixTotal = [];
    let struturePrixTotal = [];
    let quantitéTotale = 0;
    let prixTotal = 0;
    let quantitéProduit = 0;
    

    for(k=0; k < produit.length; k++) {

        structurePagePanier =  structurePagePanier + `      

            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                    <img src="${produit[k].imageUrl}" alt="${produit[k].altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${produit[k].name}</h2>
                        <p>${produit[k].color}</p>
                        <p>${produit[k].price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit[k].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
        `;
            
        structureQuantitéPrixTotal = quantitéTotale += Number(produit[k].quantity);

        
        if (produit[k].quantity > 1) {
            prixTotal = prixTotal += Number(produit[k].price) * Number(produit[k].quantity);
            struturePrixTotal = prixTotal;
        }else{
            const numberPrix = Number(produit[k].price);
            struturePrixTotal = prixTotal += numberPrix; 
        }
    }             
        
        if(k == produit.length) {
            //Injection html dans la page panier
            articlePosition.innerHTML = structurePagePanier;
            totalQuantityPosition.innerHTML = structureQuantitéPrixTotal;
            totalPricePosition.innerHTML = struturePrixTotal;
    } 
    
}





panierDisplay();

