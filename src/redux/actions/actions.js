/*
 * action types
 */

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

/*
 * other constants
 */

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

/*
 * action creators
 */

export function addToCart(payload, qty) {
  return { type: ADD_TO_CART, payload, qty }
}

export function removeFromCart(payload) {
  return { type: REMOVE_FROM_CART, payload }
}

export function changeQuantity(payload) {
  return { type: CHANGE_QUANTITY, payload }
}
