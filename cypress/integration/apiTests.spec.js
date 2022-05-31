/// <reference types="cypress" />

describe('REST-API Testing', () => {
    before(() => {
        cy.loginApi();
    });

    it('4.1. Create space successfully', () => {
        const auth = `Bearer ${ Cypress.env('varToken') }`;
        const spaceName = 'My Space ' + Date.now()
        cy.createSpaceApi(spaceName, auth).then((resp) => {
            expect(resp.requestHeaders).toString().includes(`"authorization":"Bearer`)
            expect(resp.status).to.eq(201)
            expect(resp.statusText).to.contains('Created')
            const body = resp.body;
            expect(body).to.contain.property('id');
            expect(body).to.contain.property('description');
            expect(body).to.contain.property('path');
        })
    });

    it('4.2. Create 2 spaces with the same name', () => {
        const auth = `Bearer ${ Cypress.env('varToken') }`;
        const spaceName = 'My Space ' + Date.now()
        cy.createSpaceApi(spaceName, auth).then((resp) => {
            expect(resp.status).to.eq(201)
            expect(resp.statusText).to.contains('Created')
        })

        cy.createSpaceApi(spaceName, auth).then((resp) => {
            expect(resp.status).to.not.eq(201)
            expect(resp.statusText).to.not.contains('Created')
            expect(resp.body).contains(`Overwriting a space is not allowed`)
        })
    });

    it('4.3. Delete space successfully', () => {
        const auth = `Bearer ${ Cypress.env('varToken') }`;
        const spaceName = 'My space2 ' + Date.now()
        cy.createSpaceApi(spaceName, auth)
        cy.deleteSpaceApi(spaceName, auth)
    });

});