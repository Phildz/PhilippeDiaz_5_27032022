//----Récupération data orderId dans la fenêtre de navigation 
//----et injection dans le code html

function finalisationCommande(){
document.querySelector("#orderId").innerHTML = getDataWindowLocation("orderId");
console.log(orderId);
localStorage.clear();
}

finalisationCommande();
