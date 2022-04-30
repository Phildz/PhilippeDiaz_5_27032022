//Récupération de la variable produit dans le local
let produit = getBasket();

const panierDisplay = () => { 
      
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
    renseignerFormulaire();       
        
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
        
        console.log("l=", l);
        console.log("article supprimé");
        console.log("longueur tab=", btn_supprimer.length);

        //let id_selection_suppression = produit[l]._id;
        //let couleur_selection_suppression = produit[l].color;

        //console.log("id_selection_suppression");
        //console.log(id_selection_suppression);
        //console.log("couleur_selection_suppression");
       // console.log(couleur_selection_suppression);

        if (produit.length >1){
            produit = produit.filter(el => el._id !== produit[l]._id || el.color !== produit[l].color);        
            console.log(produit);            
        }else{
            produit=[];            
        }
        saveBasket(produit);

        btn_supprimer[l].closest("article").remove();

        sommeTotale = getNumberProduit();
        console.log("quantité totale :", sommeTotale);
        document.querySelector("#totalQuantity").textContent = sommeTotale;

        prixTotal = getTotalPrice();
        console.log("quantité totale :", prixTotal);
        document.querySelector("#totalPrice").textContent = prixTotal;
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

const renseignerFormulaire = async (panierDisplay) => {
    await panierDisplay;

// -------------Validation des données du formulaire
    let inputs = document.querySelectorAll("form input");
    let divInputs = document.querySelectorAll("form div p");
    //document.querySelector("#order").setAttribute("disabled", true);
        
    
    for (let m = 0; m < inputs.length; m++){  
        
        inputs[m].addEventListener("change", function(champ) {
            var valeurChamp = champ.target.value;
            var nomChamp = inputs[m].name;
        
            console.log(valeurChamp);
            console.log(nomChamp);

            

            if(nomChamp == inputs[0].name || nomChamp == inputs[1].name) {
                console.log("champPrénomNom");
                console.log(valeurChamp);
                var validitéChamp = testPrénomNom(valeurChamp);
                gestionMessageErreur(valeurChamp);
            }else{
                if(nomChamp == inputs[3].name){
                    console.log("champVille");
                    console.log(valeurChamp);
                    var validitéChamp = testVille(valeurChamp);
                    gestionMessageErreur(valeurChamp);
                }else{
                    if(nomChamp == inputs[2].name){
                        console.log("champ adresse");
                        console.log(valeurChamp);
                        var validitéChamp = testAdresse(valeurChamp);
                        gestionMessageErreur(); 
                    }else{
                        if(nomChamp == inputs[4].name){
                            console.log("champ email");
                            console.log(valeurChamp);
                            var validitéChamp = testEmail(valeurChamp);
                            gestionMessageErreur(valeurChamp);                    
                        }else{
                        console.log("bouton commander");
                        }
                    }
                }                
            }           

            function gestionMessageErreur(input){
            if (valeurChamp === "" || validitéChamp) {
                //désactivationBtnCommander(false);
                let message = "";
                divInputs[m].innerHTML = message;  
            }else{                     
                let message = "Champ incorrect";                
                divInputs[m].innerHTML = message;                
                //désactivationBtnCommander(true);                               
                }
            }
            
            function testPrénomNom(input) {
                let regex = /^[a-zA-Z]+$/i;
                return regex.test(input);
            }

            function testEmail(input) {        
                let regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
                return regex.test(input);
                }

            function testVille(input){
                let regex = /^[a-zA-Z]+\s[a-zA-Z]+$/i;
                return regex.test(input);
            }

            function testAdresse(input) {
                let regex = /^[0-9]+\s([a-zA-Z]+( [a-zA-Z]+)+)$/i;
                return regex.test(input);
            } 
            // --------------Récupération des données du formulaire

            /*const donnéesFormulaire = {
                prénom : document.querySelector("#firstName").value,
                nom : document.querySelector("#lastName").value,
                adresse : document.querySelector("#address").value,
                ville : document.querySelector("#city").value,
                email :document.querySelector("#email").value
                }
            localStorage.setItem("donnéesFormulaire", JSON.stringify(donnéesFormulaire));

            const donnéesAEnvoyer = {
                donnéesFormulaire,
                produit
            }
            console.log(donnéesAEnvoyer);

            // --------------Envoi du formulaire 

            document.querySelector("#order").addEventListener("click", transfert);
            function transfert(){
            window.location.href = "./confirmation.html?id=011111111";
            }  */
        })
    }
};
// --------------Envoi du formulaire 
    document.addEventListener('submit', function(e){
        e.preventDefault()

        const btn_Commander = e.target;

        const contact = {
            firstName : document.querySelector("#firstName").value,
            lastName : document.querySelector("#lastName").value,
            address : document.querySelector("#address").value,
            city : document.querySelector("#city").value,
            email :document.querySelector("#email").value
        }

      
        //Création d'un tableau d'id
        let products = [];
        for (n=0; n<produit.length; n++){
            products[n] = produit[n]._id;
        }
        console.log(products);

        localStorage.setItem("contact", JSON.stringify(contact));
        
        const donnéesAEnvoyer = {
            contact,
            products
        }
        console.log(donnéesAEnvoyer);

        const promiseCommande = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donnéesAEnvoyer),
        });

        promiseCommande.then(async (response) => {
            try {
                console.log(response);
                const contenu = await response.json();
                console.log(contenu);
                console.log(contenu.orderId);
                window.location.href = `confirmation.html?orderId=${contenu.orderId}`;
            } catch (e) {
                console.log(e);
            }
        });
    })
/*
function send(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donnéesAEnvoyer),
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {

        //<a href="./product.html?id=${kanapé._id}"></a>

        window.location.href = "confirmation.html?id=${produit._id}";
        document.getElementById("result").innerText = value.postData.text;
    });
  }*/
  //console.log(produit._id);
  
  //document.getElementById("form").addEventListener("submit", transfert);
  /*document.querySelector("#order").addEventListener("click", transfert);
  function transfert(){
    window.location.href = "./confirmation.html?id=011111111";  
  }*/



panierDisplay();