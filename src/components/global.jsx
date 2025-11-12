export  const Global = {
  currentUser: "",
  role: "",
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
   sum:0,
   username:localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).username
    : "",
};
