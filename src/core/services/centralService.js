import { sessionKeys } from "../../common/constants/constants";

export function setToken(token) {
  sessionStorage.setItem(sessionKeys.token, token);
}
export function setUserData(user) {
  sessionStorage.setItem(sessionKeys.currentUser, user);
}

export function getToken() {
  return sessionStorage.getItem(sessionKeys.token);
}

export function getUserData() {
  return sessionStorage.getItem(sessionKeys.currentUser);
}

export function clearCache() {
  sessionStorage.removeItem(sessionKeys.currentUser);
  sessionStorage.removeItem(sessionKeys.token);
}

export function cartCount(cartItems){ 
  if(cartItems.length === 0)
  return  0;
  
  if(cartItems.length === 1)
  return  cartItems[0].quantity;

 return  cartItems.reduce((acc,pre)=>{
    console.log("acc=",acc);
    console.log("pre=",pre);
  return acc.quantity+pre.quantity
  });
}