const mode = "local" 
let domain = "";

switch (mode) {
  case "local":
    domain = "http://localhost:1337/";
    break;
  default:
    domain = "/";
}

const endpoints ={
  root:domain,
  registerUser : `${domain}api/auth/local/register`,
  updateUser : `${domain}api/users`,
  confirmationEmail : `${domain}api/auth/send-email-confirmation`,
  signIn : `${domain}api/auth/local`,
  getUser : `${domain}api/users`,
  sendEmail : `${domain}api/email`,
  getAddress : `${domain}api/addresses`,
  getOrder : `${domain}api/orders`
}

export default endpoints
