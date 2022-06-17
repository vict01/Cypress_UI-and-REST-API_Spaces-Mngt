import { appData, credentials, webElements } from "../fixtures/fixtures.json"
const spacesUrl = appData.urlApi + '/onboarding/*FOfYyvjxBAjkofcR'

Cypress.Commands.add('goToLogin', () => {
    cy.visit('/')
    cy.acceptCookies()
    cy.waitUntilPageLoads()
    cy.findByText(/Sign in/i, { timeout: 10000 }).click({ force: true })
})

Cypress.Commands.add('login', (user = credentials.username, pwd = credentials.password) => {
    cy.fillOutLoginForm(user, pwd)
    cy.get('#edit-submit').click()
        .then(() => {
            cy.setToken()
        })
    window.localStorage.setItem('cookieConsent', true)
    window.localStorage.setItem('onboarding.spacesvisited', true)
})

Cypress.Commands.add('fillOutLoginForm', (user = credentials.username, pwd = credentials.password) => {
    cy.findByLabelText(/Username/i, { timeout: 10000 }).clear().type(user)
    cy.findByLabelText(/Password/i, { timeout: 10000 }).clear().type(pwd)
})

Cypress.Commands.add('waitUntilPageLoads', () => {
    window.onload = () => {
        cy.log('page is fully loaded');
    };
})

Cypress.Commands.add('waitUntilSpaceElementsLoad', () => {
    cy.intercept(spacesUrl).as('spaceLoaded')
        .wait('@spaceLoaded', { timeout: 20000 })
})

Cypress.Commands.add('waitSpacesMenuIsVisible', () => {
    cy.get('.create-space-card > .title', { timeout: 10000 }).should('be.visible')
})

Cypress.Commands.add('acceptCookies', () => {
    cy.get('body').then($body => {
        if ($body.find('.accept-button').length) {
            $body.find('.accept-button').trigger('click', { force: true })
        }
    });
})

Cypress.Commands.add('assertLogin', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.get(webElements.avatarProfile, { timeout: 10000 }).should('be.visible')
    cy.window().its('localStorage.cookieConsent').should('to.be', true)
})

Cypress.Commands.add('relogin', () => {
    cy.logout()
    cy.goToLogin()
    cy.login();
    cy.acceptCookies()
})

Cypress.Commands.add('goToProfile', () => {
    cy.get(webElements.avatarProfile, { timeout: 10000 }).click({ force: true })
    cy.findByText(/Profile/i).click()
})

Cypress.Commands.add('logout', () => {
    cy.get(webElements.avatarProfile, { timeout: 10000 }).click({ force: true })
    cy.findByText(/Logout/i).click()
})

Cypress.Commands.add('getAmountOfSpaces', () => {
    cy.getSpacesList().then(mySpaces => {
        if (mySpaces) {
            return mySpaces.length
        } else {
            return 0;
        }
    })
})

Cypress.Commands.add('getSpacesList', () => {
    cy.get('body').then($body => {
        if ($body.find('.card-body').length) {
            return cy.get('.card-body')
        } else {
            return false;
        }
    });
})

Cypress.Commands.add('getSpacesNameList', () => {
    cy.get('body').then($body => {
        if ($body.find('.space-card > .card-body > .title').length) {
            return cy.get('.space-card > .card-body > .title')
        } else {
            return false;
        }
    })
})

Cypress.Commands.add('getSpacesById', (spaceId) => {
    cy.getSpacesNameList().then(($el) => {
        if ($el) {
            return $el[spaceId]
        } else {
            throw new Error(`Error: There's no items to be selected!`)
        }
    })
})

Cypress.Commands.add('goToSpaces', () => {
    cy.get(webElements.avatarProfile, { timeout: 10000 }).click({ force: true })
    cy.findAllByText(/Spaces/i, { timeout: 10000 })
        .click({ multiple: true, force: true })
})

Cypress.Commands.add('clickOnSpacesInPanel', () => {
    cy.get(':nth-child(3) > a > span').click()
})

Cypress.Commands.add('clickOnSpacesInNavBar', () => {
    cy.findAllByText(/Spaces/i).click({ multiple: true, force: true })
})

Cypress.Commands.add('clickOnCreateNewPrivateSpace', () => {
    cy.get('.buttons').contains('Private space').click({ force: true });
})

Cypress.Commands.add('clickOnCreateNewPublicSpace', () => {
    cy.get('.buttons').contains('Public space').click({ force: true });
})

Cypress.Commands.add('typeTextInSpaceNameInput', (spaceName) => {
    spaceName = spaceName.trim()
    cy.get(webElements.spaceNameInput, { timeout: 10000 }).clear()
        .type(spaceName)
})

Cypress.Commands.add('getTextFromInput', (inputElement) => {
    cy.get(inputElement, { timeout: 10000 })
        .invoke('val')
        .then(sometext => { return sometext });
})

Cypress.Commands.add('assertSpaceCreation', () => {
    cy.findAllByText(/successfully/i).should('exist')
})

Cypress.Commands.add('assertSpaceNameAlreadyExist', () => {
    cy.findAllByText(/already taken/i).should('exist')
})

Cypress.Commands.add('assertSpaceNameInvalid', () => {
    cy.findAllByText(/are not allowed/i).should('exist')
})

Cypress.Commands.add('getSpaceByName', (spaceName) => {
    const cleanedName = spaceName.trim()
    return cy.findAllByText(cleanedName)
})

Cypress.Commands.add('clickOnSpaceMenu', () => {
    cy.get('.toggle > svg').click({ multiple: true, force: true })
})

Cypress.Commands.add('clickOnDeleteSpaceOption', () => {
    cy.findByText(/Delete space/i, { timeout: 10000 }).click({ force: true })
})

Cypress.Commands.add('typeInDeleteSpace', (text) => {
    cy.get('input:nth-child(1)').clear().type(text)
})

Cypress.Commands.add('clickOnDeleteSpaceButton', () => {
    cy.findByText(/delete space permanently/i).click()
})

Cypress.Commands.add('assertSpaceDeleted', () => {
    cy.findByText(/deleted successfully!/i).should('exist')
})

Cypress.Commands.add('closeDeleteSpaceBox', () => {
    cy.get('.header > .closer > svg').click()
})