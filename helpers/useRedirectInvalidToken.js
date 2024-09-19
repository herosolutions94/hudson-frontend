// import { removeCookies } from "cookies-next";
import { deleteCookie } from "cookies-next";
const useRedirectInvalidToken = () => {
  
  deleteCookie("authToken")
  window.location.reload();

};

export default useRedirectInvalidToken;

