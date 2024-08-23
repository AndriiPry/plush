const mode = "local" 
let domain = "";

switch (mode) {
  case "local":
    domain = process.env.REACT_APP_API_URL;
    break;
  default:
    domain = "/";
}

const endpoints ={
  root:domain,
  registerUser : `${domain}/auth/local/register`,
  updateUser : `${domain}/users`,
  confirmationEmail : `${domain}/auth/send-email-confirmation`,
  signIn : `${domain}/auth/local`,
  getUser : `${domain}/users`,
  sendEmail : `${domain}/email`,
  getAddress : `${domain}/addresses`,
  getOrder : `${domain}/orders`
}

export default endpoints
