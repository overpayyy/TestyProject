export const NAV = {
  brand: '.navbar-brand',
  sweetsLink: '.navbar-nav a[href="/sweets"]',
  basketLink: '.navbar-nav a[href="/basket"]',
  loginLink: '.navbar-nav a[href="/login"]',
  basketBadge: '.navbar-nav a[href="/basket"] .badge-success',
}

export const HOME = {
  heading: 'h1.display-3',
  browseButton: 'a.btn.sweets',
  popularHeading: 'h2',
  popularCards: '.cards .card',
  popularAddButtons: '.cards .addItem',
}

export const SWEETS = {
  heading: 'h1.display-3',
  allCards: '.col-lg-3 .card',
  allAddButtons: '.addItem',
  cardTitles: '.card-title',
}

export const BASKET = {
  heading: 'h1.display-3',
  itemCount: '#basketCount',
  itemsList: '#basketItems',
  basketProductItems: '#basketItems li.lh-condensed',
  emptyBasket: "a[onclick='emptyBasket();']",
  promoInput: 'input[placeholder="Promo code"]',
  deliveryFree: '#exampleRadios1',
  deliveryStandard: '#exampleRadios2',
  deliveryFreeLabel: 'label[for="exampleRadios1"]',
  deliveryStandardLabel: 'label[for="exampleRadios2"]',
  email: '#email',
  address: '#address',
  city: '#city',
  country: '#country',
  zip: '#zip',
  ccName: '#cc-name',
  ccNumber: '#cc-number',
  ccExpiration: '#cc-expiration',
  ccCvv: '#cc-cvv',
  checkoutButton: 'button[type="submit"]',
}

export const itemSelector = (id: number): string => `.addItem[data-id="${id}"]`
