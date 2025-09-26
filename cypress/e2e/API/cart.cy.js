// 16
describe('Funcionalidade: Cart API', () => {
    it('Dado que quero listar todos os carrinhos, Quando der GET/Start, Então deve retornar 200 e um array'), () => {
        cy.request("GET", "https://fakestoreapi.com/carts").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.status).to.be.an('array');
        })
    }

    it('Dado que tenho um carrinho válido, quando eu filtrar um id específico então eu recebo'), () => {
        cy.request("GET", "https://fakestoreapi.com/carts/1").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.status).to.have.property('useId', 1);
            expect(response.status).to.have.property('id', 1);
            expect(response.status).to.have.property('produtos').and.to.be.an('array');
        })
    }
    it('Dado que desejo cadastrar um novo carrinho, quando eu enviar um payload válido, Então o carrinho será adicionado'), () => {
        const newCart = {
            id: 0,
            userId: 1,
            products: [
                {
                    productId: 1,
                    quantity: 1
                }
            ]
        }
        cy.request("POST", "https://fakestoreapi.com/carts", newCart).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('userId', newCart.userId);
            expect(response.body).to.have.property('products').and.to.be.an('array');
        })
    }
});

