//01
describe('Funcionalidade: Products API', () => {
    it('Dado que quero obter todos os produtos, Quando der Get/Start, Então deve retornar 200 e um array' , () => {
        cy.request("GET", "https://fakestoreapi.com/products").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        })
    })

    //02
    it('Dado que quero testar a limitação do resultado, Quando der Get/Start, Então deve retornar apenas 5 produtos', ()=> {
        cy.request("GET", "https://fakestoreapi.com/products?limit=5").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.length(5);

        })
    })

    //03
    it('Dado que quero testar a ordenação decrescente, Quando der Get/Start, Então deve retornar os produtos em ordem decrescente', () => {
        cy.request("GET", "https://fakestoreapi.com/products?sort=desc").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0].price).to.be.greaterThan(response.body[1].price);
        })
    })

    //04
    it('Dado que quero testar as limitação de 3 e ordenação decrescente, Quando der Get/Start, Então deve retornar apenas 3 produtos em ordem decrescente', () => {
        cy.request("GET", "https://fakestoreapi.com/products?limit=3&sort=desc").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.length(3);
        })
    })

    //05
    it('Dado que quero buscar um produto especifico, Quando der Get, Então deve retornar o produto desejado', () => {
        cy.request("GET", "https://fakestoreapi.com/products/2").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id', 2);
            expect(response.body).to.be.an('object');
        })
    })
});