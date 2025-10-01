describe('Funcionalidade: Products API', () => {
    // 01
    it('Dado que quero obter todos os produtos, Quando der Get/Start, Então deve retornar 200 e um array', () => {
        cy.request("GET", "https://fakestoreapi.com/products").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        })
    })

    // 02
    it('Dado que quero testar a limitação do resultado, Quando der Get/Start, Então deve retornar apenas 5 produtos', () => {
        cy.request("GET", "https://fakestoreapi.com/products?limit=5").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.length(5);

        })
    })

    // 03
    it('Dado que quero testar a ordenação decrescente, Quando der Get/Start, Então deve retornar os produtos em ordem decrescente', () => {
        cy.request("GET", "https://fakestoreapi.com/products?sort=desc").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0].price).to.be.greaterThan(response.body[1].price);
        })
    })

    // 04
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

    // 06
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


    // 07
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

    // 08
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

    // 09
    it("Dado que quero obter todos os produtos de uma categoria especifica, Quando der Get/Start, Então deve retornar 200 e todos os produtos que pertencem a essa categoria", () => {
        cy.request(
            "GET",
            "https://fakestoreapi.com/products/category/electronics"
        ).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array");
        })
    })

    // 10
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

    // 12
    it('Dado que tenho os dados de um novo produto, Quando faço POST /products, Então o produto deve ser criado com sucesso e retornar um ID', () => {
        const newProduct = {
            title: "Novo Produto Teste",
            price: 100,
            description: "Produto criado via teste",
            image: "https://www.totvs.com/wp-content/uploads/2023/05/arquivo-eletronico.jpg",
            category: "electronics"
        };

        cy.request("POST", "https://fakestoreapi.com/products", newProduct).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('id');
        });
    });

    // 13
    it('Dado que envio dados incompletos, Quando faço POST /products, Então devo receber uma resposta de erro', () => {
        const invalidProduct = {
            price: "cem"
        };

        cy.request({
            method: "POST",
            url: "https://fakestoreapi.com/products",
            body: invalidProduct,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.not.equal(200);
        });
    });

    // 14
    it('Dado que desejo atualizar um produto, Quando faço PUT /products/1 com novos dados, Então os dados devem ser atualizados corretamente', () => {
        const updated = {
            title: "Produto Atualizado"
        };

        cy.request("PUT", "https://fakestoreapi.com/products/1", updated).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.title).to.equal(updated.title);
        });
    });

    // 15
    it('Dado que desejo excluir um produto, Quando faço DELETE /products/1, Então devo receber os dados do produto excluído', () => {
        cy.request("DELETE", "https://fakestoreapi.com/products/1").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id', 1);
        });
    });

});