describe('Funcionalidade: Products API', () => {
  //06
  it("Dado que quero buscar um produto específico com um id inválido, Quando der Get, Então deve retornar um erro como 404", () => {
    cy.request({
      method: "GET",
      url: "https://fakestoreapi.com/products/999", 
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.equal(404); 
      expect(response.body).to.be.empty; 
    })
  })


  //07
  it("Dado que quero buscar um produto específico com um id com formato inválido, Quando der Get, Então deve retornar um erro como 404", () => {
    cy.request({
      method: "GET",
      url: "https://fakestoreapi.com/products/abc",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.be.empty;
    })
  })

  //08
  it("Dado que quero obter todas as categorias, Quando der Get/Start, Então deve retornar 200 e um array", () => {
    cy.request("GET", "https://fakestoreapi.com/products/categories").then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        response.body.forEach((category) => {
          expect(category).to.be.a("string");
        })
      })
  })
  //09
  it("Dado que quero obter todos os produtos de uma categoria especifica, Quando der Get/Start, Então deve retornar 200 e todos os produtos que pertencem a essa categoria", () => {
    cy.request(
      "GET",
      "https://fakestoreapi.com/products/category/electronics"
    ).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    })
  })

//10
it("Dado que quero obter uma categoria inválida, Quando der Get/Start, Então deve retornar 404 e um array vazio", () => {
  cy.request("GET", "https://fakestoreapi.com/products/category/movies").then(
    (response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.be.an("array");
      response.body.forEach((product) => {
        expect(product.category).to.equal("electronics");
      })
    })
})

// 11
 it("Dado que desejo criar um novo produto, Quando eu enviar um payload válido, Então o produto será adicionado", () => {
   const newProduct = {
     title: "iPhone 16",
     price: 999.99,
     description:
       "O mais novo iPhone 16 com câmera de 200MP, tela Super Retina XDR e chip A18 Bionic.",
     category: "electronics",
     image: "https://example.com/iphone16.jpg",
   };
   cy.request("POST", "https://fakestoreapi.com/products", newProduct).then(
     (response) => {
       expect(response.status).to.equal(201);
       expect(response.body).to.be.an("object");
       expect(response.body.title).to.equal(newProduct.title);
       expect(response.body.price).to.equal(newProduct.price);
       expect(response.body.description).to.equal(newProduct.description);
       expect(response.body.category).to.equal(newProduct.category);
       expect(response.body).to.have.property("id");
     })
 })

});