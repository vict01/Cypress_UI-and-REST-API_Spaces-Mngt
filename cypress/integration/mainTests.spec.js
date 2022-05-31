/// <reference types="cypress" />
import * as fixture from "../fixtures/fixtures.json"

describe('Business Critical Scenarios', () => {
    before(() => {
        cy.goToLogin()
        cy.login();
    })

    it('1.1. Verify Login successfully', () => {
        cy.assertLogin()
    });

    it('1.2. Create new private space successfully', () => {
        const myNewSpace = 'My private space ' + Date.now()
        cy.goToSpaces()
        cy.waitUntilPageLoads()
        cy.acceptCookies()
        cy.getAmountOfSpaces().then(element => {
            cy.log(`The amount of spaces is: ${element}`)
            cy.clickOnCreateNewPrivateSpace()
            cy.typeTextInSpaceNameInput(myNewSpace)
            cy.get(fixture.spaceNameSaveButton).click({ force: true })
            cy.getTextFromInput(fixture.spaceNameInput).then(element => {
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
        const myNewSpace = 'My public space ' + Date.now()
        cy.goToSpaces()
        cy.waitUntilPageLoads()
        cy.acceptCookies()
        cy.getAmountOfSpaces().then(element => {
            cy.log(`The amount of spaces is: ${element}`)
            cy.clickOnCreateNewPublicSpace()
            cy.typeTextInSpaceNameInput(myNewSpace)
            cy.get(fixture.spaceNameSaveButton).click({ force: true })
            cy.getTextFromInput(fixture.spaceNameInput).then(element => {
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
        const SpacesById = 1
        cy.goToSpaces()
        cy.waitUntilPageLoads()
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
        const auth = `Bearer ${ Cypress.env('varToken') }`;
        cy.goToSpaces()
        cy.waitUntilPageLoads()
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