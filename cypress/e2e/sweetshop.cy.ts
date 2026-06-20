import { NAV, HOME, SWEETS, BASKET, itemSelector } from '../support/selectors'
import { BasketItem, AddressData } from '../support/commands'

const chocolateCups: BasketItem = { id: 1, name: 'Chocolate Cups', price: 1.00 }
const sherbertStraws: BasketItem = { id: 2, name: 'Sherbert Straws', price: 0.75 }
const sherbertDiscs: BasketItem = { id: 3, name: 'Sherbet Discs', price: 0.95 }

const testAddress: AddressData = {
  email: 'testuser@example.com',
  address: '123 Main Street',
  city: 'Bristol',
  zip: 'BS1 1AA',
  ccName: 'John Doe',
  ccNumber: '4111111111111111',
  ccExpiration: '12/26',
  ccCvv: '123',
}

describe('Sweet Shop - testy E2E', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('#01 | Strona główna ładuje się poprawnie', () => {
    cy.visit('/')

    cy.title().should('eq', 'Sweet Shop')
    cy.get(HOME.heading).should('contain.text', 'Welcome to the sweet shop!')
    cy.get(HOME.browseButton).should('be.visible').and('contain.text', 'Browse Sweets')
    cy.get(HOME.popularHeading).should('contain.text', 'Most popular')
    cy.get(HOME.popularCards).should('have.length', 4)
    cy.get(NAV.basketBadge).should('have.text', '0')
  })

  it('#02 | Link "Sweets" w nawigacji przenosi na stronę produktów', () => {
    cy.visit('/')

    cy.get(NAV.sweetsLink).click()

    cy.url().should('include', '/sweets')
    cy.get(SWEETS.heading).should('contain.text', 'Browse sweets')
    cy.get(SWEETS.allAddButtons).should('have.length', 16)
  })

  it('#03 | Strona Sweets zawiera 16 produktów z tytułami i przyciskami', () => {
    cy.visit('/sweets')

    cy.get(SWEETS.cardTitles).should('have.length', 16)

    cy.get(SWEETS.cardTitles).each(($title) => {
      cy.wrap($title).should('be.visible').and('not.be.empty')
    })

    cy.get(SWEETS.allAddButtons).each(($btn) => {
      cy.wrap($btn).should('be.visible').and('contain.text', 'Add to Basket')
    })
  })

  it('#04 | Dodanie produktu do koszyka zwiększa licznik w nawigacji', () => {
    cy.visit('/')

    cy.get(NAV.basketBadge).should('have.text', '0')

    cy.get(itemSelector(1)).click()

    cy.get(NAV.basketBadge).should('have.text', '1')
  })

  it('#05 | Dodanie wielu produktów za pomocą komendy addToBasket', () => {
    cy.visit('/sweets')

    cy.addToBasket(chocolateCups)
    cy.addToBasket(sherbertStraws)
    cy.addToBasket(sherbertDiscs)

    cy.get(NAV.basketBadge).should('have.text', '3')
  })

  it('#06 | Strona koszyka wyświetla poprawną liczbę dodanych produktów', () => {
    cy.visit('/sweets')

    cy.addToBasket(chocolateCups)
    cy.addToBasket(sherbertStraws)

    cy.get(NAV.basketLink).click()

    cy.url().should('include', '/basket')
    cy.get(BASKET.heading).should('contain.text', 'Your Basket')
    cy.get(BASKET.itemCount).should('have.text', '2')
    cy.get(BASKET.basketProductItems).should('have.length', 2)
  })

  it('#07 | Opróżnienie koszyka resetuje licznik do zera', () => {
    cy.visit('/sweets')

    cy.addToBasket(chocolateCups)
    cy.get(NAV.basketBadge).should('have.text', '1')

    cy.get(NAV.basketLink).click()
    cy.get(BASKET.emptyBasket).click()

    cy.get(BASKET.itemCount).should('have.text', '0')
    cy.get(BASKET.basketProductItems).should('have.length', 0)
  })

  it('#08 | Wybór opcji dostawy zmienia zaznaczony radio button', () => {
    cy.visit('/basket')

    cy.get(BASKET.deliveryFree).should('be.checked')
    cy.get(BASKET.deliveryStandard).should('not.be.checked')

    cy.get(BASKET.deliveryStandardLabel).click()

    cy.get(BASKET.deliveryStandard).should('be.checked')
    cy.get(BASKET.deliveryFree).should('not.be.checked')
  })

  it('#09 | Formularz adresowy i płatności wypełnia się poprawnie', () => {
    cy.visit('/basket')

    cy.fillBillingAddress(testAddress)

    cy.get(BASKET.email).should('have.value', testAddress.email)
    cy.get(BASKET.address).should('have.value', testAddress.address)
    cy.get(BASKET.city).should('have.value', testAddress.city)
    cy.get(BASKET.zip).should('have.value', testAddress.zip)
    cy.get(BASKET.ccName).should('have.value', testAddress.ccName)
    cy.get(BASKET.ccNumber).should('have.value', testAddress.ccNumber)
  })
})
