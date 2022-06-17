import { appData, credentials } from "../fixtures/fixtures.json"
const urlApi = appData.urlApi + 'repository'

Cypress.Commands.add('loginApi', (user = credentials.username, pwd = credentials.password) => {
    cy.goToLogin()
    cy.get('#edit-name').type(user)
    cy.get('#edit-pass').type(pwd)
    cy.get('#edit-submit').click()
        .then(() => {
            setToken()
        })
})

function setToken() {
    cy.intercept('/').as('xsrfResponse');
    cy.visit('/')
        .wait('@xsrfResponse', { timeout: 20000 })
        .then((xhr) => {
            let headerCookie = JSON.stringify(xhr.request.headers['cookie'])
            let begining = headerCookie.indexOf('ey')
            headerCookie = headerCookie.substring(begining)
            let token = headerCookie.substring(0, 1462)
            Cypress.env('varToken', token);
        })
}

Cypress.Commands.add('setToken', setToken)

function getCreateOption(spaceName, auth, isPrivate = true, user = credentials.username) {
    return {
        url: `${urlApi}/Users/${user}/${spaceName}`,
        qs: {
            overwrite: false
        },
        method: 'PUT',
        body: {
            private: isPrivate,
            type: "Space",
            path: `/Users/vict01/${spaceName}`,
            owner: user,
            author: user,
        },
        headers: {
            authorization: auth,
            'content-type': "application/octet-stream"
        },
        failOnStatusCode: false
    }
}

Cypress.Commands.add('createSpaceApi', (spaceName, auth) => {
    const option = getCreateOption(spaceName, auth)
    cy.request(option)
})

Cypress.Commands.add('deleteSpaceApi', (spaceName, auth, user = credentials.username) => {
    spaceName = spaceName.trim()
    cy
        .request({
            url: `${urlApi}//Users/${user}/${spaceName}`,
            qs: {},
            method: 'DELETE',
            body: {},
            headers: {
                authorization: auth,
            }
        })
        .then((resp) => {
            expect(resp.status).to.eq(204)
            expect(resp.isOkStatusCode).to.eq(true)
        })
})