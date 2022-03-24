import { ActionsKey } from "../constants/constants";

const ordersInitialState = {
    cartItems: [] 
  }
  export const ordersReducer = (state = ordersInitialState, action) => {
    switch (action.type) {
      case ActionsKey.addToCart:
        const isProductExistWithinCart = state.cartItems.some((cartDetails)=> cartDetails.productDetails.id === action.newProduct.productDetails.id);
       if(isProductExistWithinCart){
         state.cartItems.forEach((cartDetails)=>{
            if(cartDetails.productDetails.id === action.newProduct.productDetails.id){
               const quantitySum = cartDetails.quantity + action.newProduct.quantity
               if(quantitySum <= cartDetails.productDetails.maxOrderQuantity){
                cartDetails.quantity += action.newProduct.quantity
               }
            }
            return cartDetails;
        });
       }else{
        state.cartItems=[...state.cartItems,action.newProduct];
       }
       return { ...state};
      case ActionsKey.getCartItems:
        console.log("getCartItems = ", state);
        return { ...state };
      default:
        return state;
    }
  };
  
  export default ordersReducer;
  