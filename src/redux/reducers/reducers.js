import { combineReducers } from 'redux';

import {
  ADD_TO_CART,
} from '../actions/actions';

function cart(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      
      let newItem = true;

      const updatedState = state.map(item => {
        if(item.product === action.product && item.variant === action.variant) {
          newItem = false;
          return {
            product: action.product,
            variant: action.variant,
            qty: item.qty + 1
          }
        }
        
        return item;
      });

      if(newItem) {
        return [
          ...updatedState,
          {
            product: action.product,
            variant: action.variant,
            qty: action.qty
          }
        ]
      }

      return updatedState;
    default:
      return state
  }
}

const evolveApp = combineReducers({
  cart
})

export default evolveApp