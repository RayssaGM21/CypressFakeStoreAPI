describe('Funcionalidade: API de Usuários', () => {
    //19
    it('Dado que desejo obter todos os usuários, Quando faço GET /users, Então devo receber status 200 e um array de usuários', () => {
        cy.request("GET", "https://fakestoreapi.com/users").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });
    });

    //20
    it('Dado que desejo ver os dados de um usuário, Quando faço GET /users/1, Então devo receber os dados do usuário com ID 1', () => {
        cy.request("GET", "https://fakestoreapi.com/users/1").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id', 1);
            expect(response.body).to.have.property('email');
        });
    });
});