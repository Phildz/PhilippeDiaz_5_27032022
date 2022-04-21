var str = window.location;
var url = new URL(str);
var idProduit = url.searchParams.get("id");
//console.log(produit);


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
  
  function display_image(src, alt) {
    var a = document.createElement("img");
    a.src = src;    
    a.alt = alt;    
    document.querySelector("body > main > div > section > article > div.item__img").appendChild(a);
  }
  display_image(`${produitData.imageUrl}`,`${produitData.altTxt}`);
    
  document.getElementById("title").textContent = `${produitData.name}`;

  document.getElementById("price").textContent = `${produitData.price}`;

  document.getElementById("description").textContent = `${produitData.description}`;
  
  /**
   * Création du code html Options dans Select en fonction de la longueur du tableau "colors"
   * renvoie les options de choix "couleur" disponibles
   */
  let créerOption = () => {
    var sel = document.getElementById("colors");
    for (i=0; i < `${produitData.colors.length}`; i++){
      var opt_i = document.createElement("option");
      opt_i.value = `${produitData.colors[i]}`;
      opt_i.text = `${produitData.colors[i]}`;
      sel.add(opt_i, null);
    }
  }
  créerOption();

  ajoutPanier(produitData);
   
  
};

produitDisplay();


  


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

    //fonction fenêtre pop up
    const popupConfirmer = () => {
      if(window.confirm(`${produitData.name} couleur: ${couleur}, nombre :${quantité} a bien été ajouté au panier
      Consultez le panier OK ou revenir à l'accueil ANNULER`)){
        window.location.href = `cart.html?id=${idProduit}`;
      }else{
        window.location.href = "index.html"
      }
    }

    console.log(fusionDataProduit);

    popupConfirmer();

    addBasket(fusionDataProduit, couleur, quantité);


    

  });

};




