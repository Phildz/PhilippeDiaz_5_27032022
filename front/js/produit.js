
//----Récupération data idProduit dans la fenêtre de navigation

idProduit = getDataWindowLocation("id");

let produitData = [];

const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${idProduit}`)
    .then((res) => res.json())
    .then((promise) => {
      produitData = promise;
      //console.log(produitData);
    });
};

const produitDisplay = async () => {
  await fetchProduit();  
  
  affichageImage(`${produitData.imageUrl}`,`${produitData.altTxt}`);

  afficherInfosTexte("title", "price", "description");

  function afficherInfosTexte (title, price, description){
    document.getElementById(title).textContent = `${produitData.name}`;
    document.getElementById(price).textContent = `${produitData.price}`;
    document.getElementById(description).textContent = `${produitData.description}`;
  }
  
  
  
  créerOption();

  ajoutPanier(produitData);   
  
};

function affichageImage(src, alt) {
  var a = document.createElement("img");
  a.src = src;    
  a.alt = alt;    
  document.querySelector("body > main > div > section > article > div.item__img").appendChild(a);
}

/**
   * Création du code html Options dans Select en fonction de la longueur du tableau "colors"
   * renvoie les options de choix "couleur" disponibles
   */
const créerOption = () => {
  var sel = document.getElementById("colors");
  for (i=0; i < `${produitData.colors.length}`; i++){
    var opt_i = document.createElement("option");
    opt_i.value = `${produitData.colors[i]}`;
    opt_i.text = `${produitData.colors[i]}`;
    sel.add(opt_i, null);
  }
}

const ajoutPanier = (produitData) => {  
  const btn_envoyerPanier = document.getElementById("addToCart");
  btn_envoyerPanier.addEventListener("click", () =>{ 
    
    let select = document.getElementById("colors");    
    let input = document.getElementById("quantity");
    let couleur = `${select.value}`;
    let quantité =  `${input.value}`; 
    
    let fusionDataProduit = Object.assign({}, produitData,{
      color : couleur,
      quantity : quantité
    });

    console.log(fusionDataProduit);
    window.location.href = `cart.html?id=${idProduit}`;

    addBasket(fusionDataProduit, couleur, quantité);    

  });

};

produitDisplay();


