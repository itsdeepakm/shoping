export  const Global = {
  currentUser: "",
  role: "",
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
   sum:0,
   username:""
};
