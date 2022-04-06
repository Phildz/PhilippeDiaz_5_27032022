const produit = window.location.search.split("?").join("");
console.log(produit);


let produitData = [];

const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${produit}`)
    .then((res) => res.json())
    .then((promise) => {
      produitData = promise;
      console.log(produitData);
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
   * Création des Options dans Select en fonction de la longueur du tableau "colors"
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
  
};     

produitDisplay();

  




