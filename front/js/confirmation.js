//----Récupération de l'identifiant commande dans la fenêtre de navigation 
//----et injection dans le code html

function finalisationCommande(){
document.querySelector("#orderId").innerHTML = récupérationDonnéeFenêtreUrl("orderId");
console.log(orderId);
localStorage.clear();
}

finalisationCommande();