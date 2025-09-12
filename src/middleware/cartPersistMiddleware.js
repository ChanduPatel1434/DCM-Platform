// New file: src/middleware/cartPersistMiddleware.js
export const cartPersistMiddleware = store => next => action => {
  const result = next(action);
  
  if (action.type?.startsWith('cart/')) {
    const cartState = store.getState().cart;
    localStorage.setItem('cart', JSON.stringify(cartState.items));
  }
  
  return result;
};