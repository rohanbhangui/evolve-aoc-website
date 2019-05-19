/*
 * action types
 */

export const ADD_TO_CART = 'ADD_TO_CART'
// export const TOGGLE_TODO = 'TOGGLE_TODO'
// export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

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

export function addToCart(product, variant, qty) {
  return { type: ADD_TO_CART, product, variant, qty }
}

// export function toggleTodo(index) {
//   return { type: TOGGLE_TODO, index }
// }

// export function setVisibilityFilter(filter) {
//   return { type: SET_VISIBILITY_FILTER, filter }
// }