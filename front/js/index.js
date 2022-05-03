let kanapéData = [];

const fetchKanapé = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
      kanapéData = promise;
      console.log(kanapéData);
    });
};

const kanapéDisplay = async () => {
  await fetchKanapé();

   document.getElementById("items").innerHTML = kanapéData
    .map(
      (kanapé) => `      

        <a href="./product.html?id=${kanapé._id}">
          <article>
            <img src="${kanapé.imageUrl}" alt="${
              kanapé.altTxt
            }"/>
              <h3 class="productName">${kanapé.name.toUpperCase()}</h3>
              <p class="productDescription">${kanapé.description}</p>
          </article>
        </a>

      `,
    )
    .join("");
    

  let liens = document.querySelectorAll("#items > a");
  console.log(liens);

};

kanapéDisplay();

