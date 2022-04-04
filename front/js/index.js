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

        <a href="./product.html?id=42">
          <article>
            <img src="${kanapé.imageUrl}" alt="image de kanapé type ${
              kanapé.name
            }"/>
              <h3 class="productName">${kanapé.name.toUpperCase()}</h3>
              <p class="productDescription">${kanapé.description}</p>
          </article>
      </a>

      `,
    )
    .join("");
}


kanapéDisplay();
