/// <reference types="cypress" />
import * as fixture from "../fixtures/fixtures.json"
import { buildUser } from "../support/constants"

describe('Negative tests', () => {
    beforeEach(() => {
        cy.goToLogin()
        cy.login();
    })

    it('2.1. Verify failed Login', () => {
        const fakeCredentials = buildUser()
        cy.logout()
        cy.get(fixture.avatarProfile).should('not.exist')
        cy.goToLogin()
        cy.fillOutLoginForm(fakeCredentials.username, fakeCredentials.password)
        cy.get('#edit-submit').click()
        cy.findByText(/Unrecognized /i).should('exist')
    });

    it('2.2. Should not be created spaces with existing name', () => {
        const SpacesById = 0
        cy.goToSpaces()
        cy.waitUntilPageLoads()
        cy.acceptCookies()
        cy.getAmountOfSpaces().then(element => {
            cy.log(`The amount of spaces is: ${element}`)
            if (element === 0) {
                cy.clickOnCreateNewPublicSpace()
                cy.goToSpaces()
            }

            cy.clickOnCreateNewPublicSpace()
            cy.getSpacesById(SpacesById).then(spaceName => {
                const myNewSpace = spaceName.text().trim()
                cy.log(`The space name selected is ${myNewSpace}`)
                cy.typeTextInSpaceNameInput(myNewSpace)
                cy.get(fixture.spaceNameSaveButton).click({ force: true })
                cy.assertSpaceNameAlreadyExist()
            })

            cy.goToSpaces()
            cy.getAmountOfSpaces().then(newElement => {
                cy.log(`Now, the amount of spaces is: ${newElement}`)
                expect(newElement).eq(element)
            })
        })
    });

    it('2.3. Should not be created spaces with special characters', () => {
        const myNewSpace = 'My private space #'
        cy.goToSpaces()
        cy.waitUntilPageLoads()
        cy.acceptCookies()
        cy.getAmountOfSpaces().then(element => {
            cy.log(`The amount of spaces is: ${element}`)

            cy.clickOnCreateNewPrivateSpace()
            cy.typeTextInSpaceNameInput(myNewSpace)
            cy.waitUntilPageLoads()
            cy.assertSpaceNameInvalid()

            cy.get(fixture.spaceNameSaveButton).click({ force: true })
            cy.getTextFromInput(fixture.spaceNameInput).then(element => {
                cy.log(`The name space inserted was: ${element}`)
                expect(element).not.eq(myNewSpace)
            })

            cy.goToSpaces()
            cy.getAmountOfSpaces().then(newElement => {
                cy.log(`Now, the amount of spaces is: ${newElement}`)
                expect(newElement).eq(element)
            })
        })
    });

    it('2.4. Deletion not possible if the name entered does not match', () => {
        const SpacesById = 1
        cy.goToSpaces()
        cy.waitUntilPageLoads()
        cy.acceptCookies()
        cy.getSpacesById(SpacesById).then(spaceName => {
            var myNewSpace = spaceName.text()
            cy.log(`The space name selected is ${myNewSpace}`)

            cy.getAmountOfSpaces().then(element => {
                cy.log(`The amount of spaces is: ${element}`)
                if (element === 0) {
                    cy.clickOnCreateNewPublicSpace()
                    cy.goToSpaces()
                }
                spaceName.click()
                cy.clickOnSpaceMenu()
                cy.clickOnDeleteSpaceOption()
                cy.typeInDeleteSpace(myNewSpace)
                cy.findByText(/delete space permanently/i).should('be.disabled')
                cy.closeDeleteSpaceBox()
            })
        })
    });

});