import { BASKET, itemSelector } from './selectors'

export interface BasketItem {
  id: number
  name: string
  price: number
}

export interface AddressData {
  email: string
  address: string
  city: string
  zip: string
  ccName: string
  ccNumber: string
  ccExpiration: string
  ccCvv: string
}

declare global {
  namespace Cypress {
    interface Chainable {
      addToBasket(item: BasketItem): Chainable<void>
      fillBillingAddress(data: AddressData): Chainable<void>
    }
  }
}

Cypress.Commands.add('addToBasket', (item: BasketItem) => {
  cy.get(itemSelector(item.id)).click()
})

Cypress.Commands.add('fillBillingAddress', (data: AddressData) => {
  cy.get(BASKET.email).type(data.email)
  cy.get(BASKET.address).type(data.address)
  cy.get(BASKET.country).select('United Kingdom')
  cy.get(BASKET.city).select(data.city)
  cy.get(BASKET.zip).type(data.zip)
  cy.get(BASKET.ccName).type(data.ccName)
  cy.get(BASKET.ccNumber).type(data.ccNumber)
  cy.get(BASKET.ccExpiration).type(data.ccExpiration)
  cy.get(BASKET.ccCvv).type(data.ccCvv)
})
