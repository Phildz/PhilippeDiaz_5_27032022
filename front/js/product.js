//----Récupération identifiant produit sélectionné en page d'accueil
let idProduit = récupérationDonnéeFenêtreUrl("id");

//----Création de la promesse produitData pour réception de données du produit canapé présélectionné
let produitData = [];

const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${idProduit}`)
    .then((res) => res.json())
    .then((promise) => {
      produitData = promise;
      //console.log(produitData);
    });
}

const affichageProduit = async () => {
  await fetchProduit();  
  
  affichageImage(`${produitData.imageUrl}`,`${produitData.altTxt}`);

  afficherInfosTexte("title", "price", "description");
  
  créerOptionCouleurs();

  ajoutPanier(produitData);
  
}

function affichageImage(src, alt) {
  var a = document.createElement("img");
  a.src = src;    
  a.alt = alt;    
  document.querySelector("body > main > div > section > article > div.item__img").appendChild(a);
}

function afficherInfosTexte (title, price, description){
  document.getElementById(title).textContent = `${produitData.name}`;
  document.getElementById(price).textContent = `${produitData.price}`;
  document.getElementById(description).textContent = `${produitData.description}`;
}

function créerOptionCouleurs() {
/**
   * Création du code html Options dans Select en fonction de la longueur du tableau "colors"
   * renvoie les options de choix "couleur" disponibles
   */
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
      console.log("quantité =", quantité);
      console.log("couleur =", couleur);


      if (isNaN(quantité) || quantité <= 0 || couleur == ""){
        alert("Veuillez renseigner correctement la couleur et/ou le nombre de produit choisis");
        input.value = "";
      }else{
        let fusionDataProduit = Object.assign({}, produitData,{
          color : couleur,
          quantity : quantité
        });

        console.log(fusionDataProduit);
        window.location.href = `cart.html?id=${idProduit}`;

        ajoutProduit(fusionDataProduit, quantité);

      }
    })
}

affichageProduit()