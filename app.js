//data structure to contain user info as objects
let userContainer = [];

//DOM reference strings stored centrally in variables
const domStrings = {
  firstName: "register_first_name",
  lastName: "register_surname",
  email: "register_email",
  userName: "register_username",
  password: "register_password",
  loginUsername: "userName",
  loginPassword: "userPassword",
  loginButton: "submit_btn",
  registerSubmit: "register_submit_btn",
  registerWrapper: ".register_form",
  registerForm: ".register_user",
  loginForm: ".login_box",
  loginBox: "login_form",
  loginSubmit: "login_btn",
  registerReturn: "return_to_register"
};

//regexps stored as variables
const regexps = {
  passwordReg: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
  noSpacesReg: /^\S*$/
};

//validates password and username conditions and pushes user input data into the data structure if condition returns true
const addUser = ev => {
  let pword = document.getElementById(domStrings.password).value;
  let uName = document.getElementById(domStrings.userName).value;
  ev.preventDefault();
  if (
    regexps.passwordReg.test(pword) === true &&
    regexps.noSpacesReg.test(uName) === true
  ) {
    let newUser = {
      id: Date.now(),
      firstName: document.getElementById(domStrings.firstName).value,
      lastName: document.getElementById(domStrings.lastName).value,
      email: document.getElementById(domStrings.email).value,
      userName: document.getElementById(domStrings.userName).value,
      password: document.getElementById(domStrings.password).value
    };
    userContainer.push(newUser);
    document.querySelector(domStrings.registerForm).reset();
    console.log(userContainer);
  } else {
    alert("Please enter a different password");
  }
};

//Reads the user input in the login form and checks whether the email exists
//then whether the password matches the password stored with that email
const loginUser = ev => {
  let loginName = document.getElementById(domStrings.loginUsername).value;
  let loginPwordInput = document.getElementById(domStrings.loginPassword).value;

  ev.preventDefault();

  if (loginName !== "" && loginPwordInput !== "") {
    userContainer.map(cur => {
      if (cur.email === loginName || cur.userName === loginName) {
        if (cur.password === loginPwordInput) {
          alert("That works well");
        } else {
          alert("That username or password are incorrect");
        }
      }
    });
  }
  document.getElementById(domStrings.loginBox).reset();
};

const changeToLogin = ev => {
  document.querySelector(domStrings.registerWrapper).style.display = "none";
  document.querySelector(domStrings.loginForm).style.display = "block";
};

const changeToRegister = ev => {
  document.querySelector(domStrings.registerWrapper).style.display = "block";
  document.querySelector(domStrings.loginForm).style.display = "none";
};

const keypressSubmit = ev => {
  if (
    (document.querySelector(domStrings.registerWrapper).style.display =
      "block" && ev.keyCode === 13)
  ) {
    addUser();
  } else if (
    (document.querySelector(domStrings.loginForm).style.display =
      "block" && ev.keyCode === 13)
  ) {
    loginUser();
  }
};

//Event listeners setup to be passed into the init function
const setupEventListeners = () => {
  document
    .getElementById(domStrings.registerSubmit)
    .addEventListener("click", addUser);

  document
    .getElementById(domStrings.loginButton)
    .addEventListener("click", loginUser);

  document
    .getElementById(domStrings.loginSubmit)
    .addEventListener("click", changeToLogin);

  document
    .getElementById(domStrings.registerReturn)
    .addEventListener("click", changeToRegister);

  document.addEventListener("keypress", keypressSubmit);

  console.log("Event listeners have been setup");
};

//init function for when page loads
const init = () => {
  setupEventListeners();
  document.querySelector(domStrings.loginForm).style.display = "none";
  console.log("Init has been initialised");
};

init();
