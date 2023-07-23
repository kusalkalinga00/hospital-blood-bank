import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please fill all the fields");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  email,
  password,
  role,
  name,
  organizationName,
  hospitalName,
  website,
  address,
  phone
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        email,
        password,
        role,
        name,
        organizationName,
        hospitalName,
        website,
        address,
        phone,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
