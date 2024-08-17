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