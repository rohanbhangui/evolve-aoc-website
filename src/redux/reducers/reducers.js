import { combineReducers } from 'redux';

import {
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../actions/actions';

function cart(state = [], action) {
  let variant, id, size;

  switch (action.type) {
    case ADD_TO_CART:

      let { name, color, image, price } = action.payload;
      ({ variant, id, size } = action.payload);
      const { qty } = action;
      
      let newItem = true;

      let updatedState = state.map(item => {
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

    case REMOVE_FROM_CART:
      // let { prodid = id, prodvariant = variant, prodsize = size } = action.payload;
      ({ variant, id, size } = action.payload);

      return state.filter(item => item.id !== id || item.variant !== variant || item.size !== size);
    default:
      return state
  }
}

const evolveApp = combineReducers({
  cart
})

export default evolveApp