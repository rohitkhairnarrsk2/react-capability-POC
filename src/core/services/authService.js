import { auth } from "./firebase";
import centralStore from "../../common/store/centralStore";
import { ActionsKey } from "../../common/constants/constants";
import httpService from "./httpService";
export async function login(credentials) {
  // centralStore.dispatch({
  //   token: "abcd",
  //   type: ActionsKey.setToken,
  // });
  // centralStore.dispatch({
  //   user: {},
  //   type: ActionsKey.setCurrentUser,
  // });
  httpService
    .get("http://localhost:3000/auth/login", { withCredentials: true })
    .then();
  // getCSRFToken();
  return await Promise.resolve();
  // return await auth
  //   .signInWithEmailAndPassword("rohitkhairnarrsk@gmail.com", "123456")
  //   .then((response) => {
  //     const decodedResponse = response.user.toJSON();
  //     centralStore.dispatch({
  //       token: decodedResponse.stsTokenManager.accessToken,
  //       type: ActionsKey.setToken,
  //     });
  //     centralStore.dispatch({
  //       user: decodedResponse,
  //       type: ActionsKey.setCurrentUser,
  //     });
  //   });
}
export async function registerUser(userDetails) {
  // const response = await httpService.post(`/users/register`, userDetails);
  // return response;
  httpService
    .get("http://localhost:3000/auth/logout", { withCredentials: true })
    .then();
  return await Promise.resolve();
}
export async function loginFirbase(credentials) {
  return await auth
    .signInWithEmailAndPassword("rohitkhairnarrsk@gmail.com", "123456")
    .then((response) => {
      const decodedResponse = response.user.toJSON();
      centralStore.dispatch({
        token: decodedResponse.stsTokenManager.accessToken,
        type: ActionsKey.setToken,
      });
      centralStore.dispatch({
        user: decodedResponse,
        type: ActionsKey.setCurrentUser,
      });
    });
}
export async function logOut() {
  centralStore.dispatch({
    type: ActionsKey.logOut,
  });
}

export const getCSRFToken = async () => {
  const response = await httpService.get(
    "http://localhost:3000/auth/getCSRFToken"
  );
  httpService.defaults.headers.post["X-CSRF-Token"] = response.data.CSRFToken;
};
