function sauvegardeProduits(produits) {
    localStorage.setItem("produits", JSON.stringify(produits));
}

function chargementProduits() {
    let produits = localStorage.getItem("produits");
    if (produits == null){
        return [];
    }else{
        return JSON.parse(produits);
    }
}

function ajoutProduit(produit, quantité) {
    let produits = chargementProduits();
    let produitTrouvé = produits.find(p => p._id == produit._id);
    if (produitTrouvé != undefined) {  
        let produitTrouvé = produits.find(c => c.color == produit.color);        
        if (produitTrouvé != undefined) {        
            console.log("produits identiques");    
            produitTrouvé.quantity += Number(quantité);                   
        }else{
            console.log("produits différents");
            produit.quantity = Number(quantité);
            produits.push(produit);
        }        
    }else{
        console.log("produits différents");
        produit.quantity = Number(quantité);
        produits.push(produit);
    }
    sauvegardeProduits(produits);
}

function calculNombreProduit() {
    let produits = chargementProduits();
    let number = 0;
    for (let produit of produits) {
        number += Number(produit.quantity);
    }
    return number;
}

function calculPrixTotal() {
    let produits = chargementProduits();
    let total = 0;
    for (let produit of produits) {
        total += produit.quantity * produit.price;
    }
    return total;
}

//----Récupération donnée dans la fenêtre de navigation 
function récupérationDonnéeFenêtreUrl (val){
    var str = window.location;
    var url = new URL(str);    
    return url.searchParams.get(val);        
}
