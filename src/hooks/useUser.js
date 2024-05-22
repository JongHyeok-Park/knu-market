import { useDispatch } from "react-redux"
import { setUser } from "../store/userSlice"
import { getUser } from "../api/userApi";
import { getCookie } from "../utils/cookieManage";

function useUser() {
  let dispatch = useDispatch();

  const userInfo = () => {
    if (getCookie('accessToken')) {
      getUser(getCookie('accessToken'))
        .then((data) => {
          dispatch(setUser({name: data.name, imagePath: data.imagePath, starScore: data.starScore}));
        });
    }
  }

  return [userInfo];
}

export default useUser;