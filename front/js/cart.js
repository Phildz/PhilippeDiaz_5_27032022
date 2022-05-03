//Récupération de la variable produit dans le local storage
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
        
    if(k == produit.length) {
    //Injection html dans la page panier
        articlePosition.innerHTML = structurePagePanier;
        totalQuantityPosition.innerHTML = structureQuantitéPrixTotal;
        totalPricePosition.innerHTML = struturePrixTotal;
    }
    supprimerProduit();
    modifierQuantitéProduit();
    renseignerFormulaire();
    envoyerFormulaire(); 
}

const supprimerProduit = async (panierDisplay) => {
    await panierDisplay; 
    
    deleteProduct();

    function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

        for (let j = 0; j < btn_supprimer.length; j++){
            btn_supprimer[j].addEventListener("click" , (event) => {
                event.preventDefault();

                //Selection de l'element à supprimer en fonction de son id ET sa couleur
                let idDelete = produit[j]._id;
                let colorDelete = produit[j].color;

                produit = produit.filter(el => el._id !== idDelete || el.color !== colorDelete);             
                
                localStorage.setItem("basket", JSON.stringify(produit));

                //Alerte produit supprimé et refresh
                alert("Ce produit va être supprimé du panier");
                location.reload();
            })
        }
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

            let newQuantité = Number(`${quantitéTypeProduit[m].value}`);
            produit[m].quantity = newQuantité;
            console.log(produit[m].quantity);
            console.log(produit[m]);
            quantitéTypeProduit.innerHTML = newQuantité;

            saveBasket(produit);

            sommeTotale = calculNombreProduit();
            console.log("quantité totale :", sommeTotale);
            document.querySelector("#totalQuantity").textContent = sommeTotale;

            prixTotal = calculPrixTotal();
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
        })
    }
}

const envoyerFormulaire = async (panierDisplay) => {

    document.addEventListener('submit', envoyerFormulaire);
    function envoyerFormulaire(e){
        e.preventDefault();

        //const btn_Commander = e.target;

        //Création d'un objet de données
        const contact = {
            firstName : document.querySelector("#firstName").value,
            lastName : document.querySelector("#lastName").value,
            address : document.querySelector("#address").value,
            city : document.querySelector("#city").value,
            email :document.querySelector("#email").value
        }
      
        //Création d'un tableau d'id produit
        let products = [];
        for (n=0; n < produit.length; n++){
            products[n] = produit[n]._id;
        }
        console.log(products);

        localStorage.setItem("contact", JSON.stringify(contact));
        
        const donnéesAEnvoyer = {
            contact,
            products
        }
        console.log(donnéesAEnvoyer);

        //Synthèse contrôle d'erreurs avant envoi effectif
        let messageErreurPrénom = document.querySelector("#firstNameErrorMsg").textContent;
        let messageErreurNom = document.querySelector("#lastNameErrorMsg").textContent;
        let messageErreurAdresse = document.querySelector("#addressErrorMsg").textContent;
        let messageErreurVille = document.querySelector("#cityErrorMsg").textContent;
        let messageErreurEmail = document.querySelector("#emailErrorMsg").textContent;        
        
        if (!messageErreurPrénom && !messageErreurNom && !messageErreurAdresse && !messageErreurVille && !messageErreurEmail){

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
        }
    }
}

panierDisplay();