import { combineReducers } from 'redux';

import {
  ADD_TO_CART,
} from '../actions/actions';

function cart(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:

      const { name, variant, color, id, image, price, size } = action.payload;
      const { qty } = action;
      
      let newItem = true;

      const updatedState = state.map(item => {
        if(item.id === id && item.variant === variant && item.size === size) {
          newItem = false;
          return {
            id,
            variant,
            name,
            color,
            image,
            price,
            size,
            qty: item.qty + 1
          }
        }
        
        return item;
      });

      if(newItem) {
        return [
          ...updatedState,
          {
            id,
            variant,
            name,
            color,
            image,
            price,
            size,
            qty
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