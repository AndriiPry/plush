export const storeUser = (data) => {
    localStorage.setItem(
        "user",
        JSON.stringify({
            username : data.user.username,
            jwt : data.jwt,
        })
    );
};

export const userData = (data) => {
  const stringifiedUser  = localStorage.getItem("user") || '""';
  return JSON.parse(stringifiedUser || {});
};
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
