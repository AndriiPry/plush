
export const validateEmail = (email) => {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
export const validatePassword = (val) => {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i
    return re.test(val)
}

export const toTitleCase = (str) => {
    if (str)
      return str.replace(
        /\w\S*/g,
        function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
  
      );
  
    return null
}

export const accessToken = {
  set: val => {
    localStorage.setItem("wehear_lead_management_access_token", val);
  },
  get: () => localStorage.getItem("wehear_lead_management_access_token"),
  remove: () => {
    localStorage.removeItem("wehear_lead_management_access_token");
  },
};
export const loggedInUser = {
  set: val => {
    localStorage.setItem("wehear_lead_management_user", JSON.stringify(val));

  },
  get: () => localStorage.getItem("wehear_lead_management_user") ? JSON.parse(localStorage.getItem("wehear_lead_management_user")) : null,
  remove: () => {
    localStorage.removeItem("wehear_lead_management_user");
  },
};

export const refreshToken = {
  set: val => {
    localStorage.setItem("wehear_lead_management_refresh_token", val);
  },
  get: () => localStorage.getItem("wehear_lead_management_refresh_token"),
  remove: () => {
    localStorage.removeItem("wehear_lead_management_refresh_token");
  },
};

export const logOut = () => {
  refreshToken.remove();
  accessToken.remove();
  loggedInUser.remove()
};