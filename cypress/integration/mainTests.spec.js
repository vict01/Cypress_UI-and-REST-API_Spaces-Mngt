/// <reference types="cypress" />
import { webElements } from '../fixtures/fixtures.json'

describe('Business Critical Scenarios', () => {
    let myNewSpace, auth

    before(() => {
        cy.goToLogin()
        cy.login();
    })

    beforeEach(() => {
        myNewSpace = 'My Space ' + Date.now()
        auth = `Bearer ${ Cypress.env('varToken') }`;
        cy.goToSpaces()
    })

    it('1.1. Verify Login successfully', () => {
        cy.assertLogin()
    });

    it('1.2. Create new private space successfully', () => {
        cy.waitSpacesMenuIsVisible()
        cy.acceptCookies()
        cy.getAmountOfSpaces().then(element => {
            cy.log(`The amount of spaces is: ${element}`)
            cy.clickOnCreateNewPrivateSpace()
            cy.typeTextInSpaceNameInput(myNewSpace)
            cy.get(webElements.spaceNameSaveButton).click({ force: true })
            cy.getTextFromInput(webElements.spaceNameInput).then(element => {
                cy.log(`The name space inserted was: ${element}`)
                expect(element).eq(myNewSpace)
            })
            cy.assertSpaceCreation()
            cy.goToSpaces()
            cy.getAmountOfSpaces().then(newElement => {
                cy.log(`Now, the amount of spaces is: ${newElement}`)
                expect(newElement).eq(element + 1)
            })
            cy.getSpaceByName(myNewSpace).should('exist')
        })
    });

    it('1.3. Create new public space successfully', () => {
        cy.waitSpacesMenuIsVisible()
        cy.acceptCookies()
        cy.getAmountOfSpaces().then(element => {
            cy.log(`The amount of spaces is: ${element}`)
            cy.clickOnCreateNewPublicSpace()
            cy.typeTextInSpaceNameInput(myNewSpace)
            cy.get(webElements.spaceNameSaveButton).click({ force: true })
            cy.getTextFromInput(webElements.spaceNameInput).then(element => {
                cy.log(`The name space inserted was: ${element}`)
                expect(element).eq(myNewSpace)
            })
            cy.assertSpaceCreation()
            cy.goToSpaces()
            cy.getAmountOfSpaces().then(newElement => {
                cy.log(`Now, the amount of spaces is: ${newElement}`)
                expect(newElement).eq(element + 1)
            })
            cy.getSpaceByName(myNewSpace).should('exist')
        })
    });

    it('1.4. Delete space successfully', () => {
        const SpacesById = 0
        cy.waitSpacesMenuIsVisible()
        cy.acceptCookies()
        cy.getSpacesById(SpacesById).then(spaceName => {
            var str = spaceName.text()
            var myNewSpace = str.trim();
            cy.log(`The space name selected is ${myNewSpace}`)

            cy.getAmountOfSpaces().then(element => {
                cy.log(`The amount of spaces is: ${element}`)
                if (element === 0) {
                    cy.clickOnCreateNewPublicSpace()
                    cy.goToSpaces()
                }
                spaceName.first().click()
                cy.clickOnSpaceMenu()
                cy.clickOnDeleteSpaceOption()
                cy.typeInDeleteSpace(myNewSpace)
                cy.findByText(/delete space permanently/i).should('be.enabled')
                cy.clickOnDeleteSpaceButton()
                cy.assertSpaceDeleted()
                cy.goToSpaces()
                cy.getAmountOfSpaces().then(newElement => {
                    cy.log(`Now, the amount of spaces is: ${newElement}`)
                    expect(newElement).eq(element - 1)
                })
            })
        })
    });

    it('1.5. Delete all spaces successfully', () => {
        cy.waitSpacesMenuIsVisible()
        cy.acceptCookies()
        cy.getAmountOfSpaces().then(element => {
            cy.log(`The amount of spaces is: ${element}`)
            if (element === 0) {
                cy.clickOnCreateNewPublicSpace()
                cy.goToSpaces()
            }
        })

        cy.getSpacesNameList().each(element => {
            cy.deleteSpaceApi(element.text(), auth)
        })
        cy.relogin()
        cy.goToSpaces()
        cy.getAmountOfSpaces().then(newElement => {
            cy.log(`Now, the amount of spaces is: ${newElement}`)
            expect(newElement).eq(0)
        })
    });

});