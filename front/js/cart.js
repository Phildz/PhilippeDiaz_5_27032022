//Récupération de la variable produit dans le local

let produit = JSON.parse(localStorage.getItem("basket"));

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
    
    let texteSupprimer = "Supprimer";
    let indexProduit = 0;
     

    for(k=0; k < produit.length; k++) {   
        
    
        structurePagePanier =  structurePagePanier + `      

            <article class="cart__item" data-id="${produit[k]._id}" data-color="${produit[k].color}">
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
                            <p class="deleteItem">${texteSupprimer}</p>
                        </div>
                    </div>
                </div>
            </article>
        `;  

        //let quantitéProduit = Number(produit[k].quantity);   
        structureQuantitéPrixTotal = quantitéTotale += Number(produit[k].quantity);

        
        if (produit[k].quantity > 1) {
            prixTotal = prixTotal += Number(produit[k].price) * Number(produit[k].quantity);
            struturePrixTotal = prixTotal;
        }else{
            const numberPrix = Number(produit[k].price);
            struturePrixTotal = prixTotal += numberPrix; 
        }      
        
    }   
    removeProduct();
    modifierQuantitéProduit();    
        
    if(k == produit.length) {
    //Injection html dans la page panier
        articlePosition.innerHTML = structurePagePanier;
        totalQuantityPosition.innerHTML = structureQuantitéPrixTotal;
        totalPricePosition.innerHTML = struturePrixTotal;
    }
}

const removeProduct = async (panierDisplay) => {
    await panierDisplay;

    let btn_supprimer = document.querySelectorAll(".deleteItem");
    console.log(btn_supprimer);

    for (let l = 0; l < btn_supprimer.length; l++){
        btn_supprimer[l].addEventListener("click", (event) => {
            event.preventDefault();

            console.log("article supprimé");

        let id_selection_suppression = produit[l]._id;
        let couleur_selection_suppression = produit[l].color;

        console.log("id_selection_suppression");
        console.log(id_selection_suppression);
        console.log("couleur_selection_suppression");
        console.log(couleur_selection_suppression);


        produit = produit.filter(el => el._id !== id_selection_suppression || el.color !== couleur_selection_suppression);
        console.log(produit);

        saveBasket(produit);
        //window.location.href = "cart.html";

        sommeTotale = getNumberProduit();
        console.log("quantité totale :", sommeTotale);
        document.querySelector("#totalQuantity").textContent = sommeTotale;

        prixTotal = getTotalPrice();
        console.log("quantité totale :", prixTotal);
        document.querySelector("#totalPrice").textContent = prixTotal;

        btn_supprimer[l].closest("article").remove();        

        })
    }
}

const modifierQuantitéProduit = async (panierDisplay) =>{
    await panierDisplay;

    let quantitéTypeProduit = document.querySelectorAll(".itemQuantity");    

    console.log(quantitéTypeProduit);

    for (let m = 0; m < quantitéTypeProduit.length; m++){        

        quantitéTypeProduit[m].addEventListener("change", (event) => {
            event.preventDefault();

            console.log("quantité article modifiée");

            let newQuantité =  `${quantitéTypeProduit[m].value}`;
            produit[m].quantity = newQuantité;
            console.log(produit[m].quantity);
            console.log(produit[m]);
            quantitéTypeProduit.innerHTML = newQuantité;

            saveBasket(produit);

            sommeTotale = getNumberProduit();
            console.log("quantité totale :", sommeTotale);
            document.querySelector("#totalQuantity").textContent = sommeTotale;

            prixTotal = getTotalPrice();
            console.log("quantité totale :", prixTotal);
            document.querySelector("#totalPrice").textContent = prixTotal;
                      
        });
        
           
    } 
    return
}

panierDisplay();