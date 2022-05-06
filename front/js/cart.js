//---- Chargement des données produits stockées dans le local storage
let produits = chargementProduits();

const affichagePanier = () => { 
      
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

    for(k=0; k < produits.length; k++) {   
        
    
        structurePagePanier =  structurePagePanier + `      

            <article class="cart__item" data-id="${produits[k]._id}" data-color="${produits[k].color}">
                <div class="cart__item__img">
                    <img src="${produits[k].imageUrl}" alt="${produits[k].altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${produits[k].name}</h2>
                        <p>${produits[k].color}</p>
                        <p>${produits[k].price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produits[k].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">${texteSupprimer}</p>
                        </div>
                    </div>
                </div>
            </article>
        `;  

        //let quantitéProduit = Number(produits[k].quantity);   
        structureQuantitéPrixTotal = quantitéTotale += Number(produits[k].quantity);

        
        if (produits[k].quantity > 1) {
            prixTotal = prixTotal += Number(produits[k].price) * Number(produits[k].quantity);
            struturePrixTotal = prixTotal;
        }else{
            const numberPrix = Number(produits[k].price);
            struturePrixTotal = prixTotal += numberPrix; 
        }      
        
    }          
        
    if(k == produits.length) {
    //Injection html dans la page panier
        articlePosition.innerHTML = structurePagePanier;
        totalQuantityPosition.innerHTML = structureQuantitéPrixTotal;
        totalPricePosition.innerHTML = struturePrixTotal;
    }
    /*supprimerProduit();
    modifierQuantitéProduit();
    validerFormulaire();
    envoiFormulaire(); */
}

function supprimerProduit() {
let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++){
        btn_supprimer[j].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = produits[j]._id;
            let colorDelete = produits[j].color;

            produits = produits.filter(el => el._id !== idDelete || el.color !== colorDelete);             
            
            //localStorage.setItem("produits", JSON.stringify(produits));
            sauvegardeProduits(produits);

            //Alerte produit supprimé et refresh
            alert("Ce produit va être supprimé du panier");
            location.reload();
        })
    }
}

const modifierQuantitéProduit = () => {
   
    let quantitéTypeProduit = document.querySelectorAll(".itemQuantity");    

    console.log(quantitéTypeProduit);

    for (let m = 0; m < quantitéTypeProduit.length; m++){        

        quantitéTypeProduit[m].addEventListener("change", (event) => {
            event.preventDefault();

            console.log("quantité article modifiée");

            let newQuantité = Number(`${quantitéTypeProduit[m].value}`);

            if (isNaN(newQuantité) || newQuantité <= 0){
                alert("Veuillez renseigner correctement le nombre de produit choisi");
                quantitéTypeProduit[m].value = 0;
                newQuantité = 0;
                produits[m].quantity = newQuantité;                           
                quantitéTypeProduit.innerHTML = newQuantité;                
            }
           
            produits[m].quantity = newQuantité;
            console.log(produits[m].quantity);
            console.log(produits[m]);
            
            quantitéTypeProduit.innerHTML = newQuantité;            

            sauvegardeProduits(produits);            

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

function validerFormulaire() {

    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let PrénomNomVilleRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addresseRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la saisie du prénom
    form.firstName.addEventListener('change', function() {
        validationFirstName(this);
    });

    // Ecoute de la saisie du nom
    form.lastName.addEventListener('change', function() {
        validationLastName(this);
    });

    // Ecoute de la saisie de l'adresse
    form.address.addEventListener('change', function() {
        validationAddress(this);
    });

    // Ecoute de la saisie de la ville
    form.city.addEventListener('change', function() {
        validationCity(this);
    });

    // Ecoute de la saisie de l'email
    form.email.addEventListener('change', function() {
        validationEmail(this);
    });

    //validation du prénom
    const validationFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (PrénomNomVilleRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Champ incorrect';
        }
    };

    //validation du nom
    const validationLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (PrénomNomVilleRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Champ incorrect';
        }
    };

    //validation de l'adresse
    const validationAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addresseRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Champ incorrect';
        }
    };

    //validation de la ville
    const validationCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (PrénomNomVilleRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Champ incorrect';
        }
    };

    //validation de l'email
    const validationEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Champ incorrect';
        }
    };
    }

const envoiFormulaire = async () => {

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
        for (n=0; n < produits.length; n++){
            products[n] = produits[n]._id;
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
        let quantitéProduit = document.querySelectorAll("article input");        
        
        function validationQtésFinales (){
        let synthèseQté = 1;
        for (j = 0; j < quantitéProduit.length; j++){
            synthèseQté = synthèseQté * quantitéProduit[j].value;
            console.log("Qté = ", synthèseQté);
            if (synthèseQté <= 0){
                erreurQuantité = true
            }else{
                erreurQuantité = false
            }
        }
        return erreurQuantité
        }

        validationQtésFinales();        
           
           if (!erreurQuantité && !messageErreurPrénom && !messageErreurNom && !messageErreurAdresse && !messageErreurVille && !messageErreurEmail){

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
            }else{
                if(erreurQuantité){
                    alert("Veuillez renseigner correctement le nombre de produit choisi");
                }else{
                    alert("Veuillez renseigner correctement vos informations personnelles");
                }
            }
        //}
    }
}

affichagePanier();
supprimerProduit();
modifierQuantitéProduit();
validerFormulaire();
envoiFormulaire();
