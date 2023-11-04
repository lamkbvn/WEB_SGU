
let btnLogin = document.querySelector('.btn-login');
let btnRegister = document.querySelector('.btn-register');
let formType = document.querySelector('.form-type');


let formSignin = `
      <div class="account">
      <label for="">Account name</label>
      <input type="text" id="accountname" class="input input-accountname" placeholder="Enter account name"
          maxlength="25">
      </div>
      <div class="password">
      <label for="">Password</label>
      <input type="password" id="password" class="input input-password" placeholder="Enter password"
          maxlength="25">
      <img src="img/iconlogin/hidden-pass.svg" alt="" class="hidden-password">
      </div>
      <button class="btn-signin">Sign in</button>
      <div class="invalid-account hidden-form">enter account</div>
      `
let formSignup = `
      <div class="name">
      <label for="">User name</label>
      <input type="text" id="username" class="input input-username" placeholder="Enter user name" maxlength="30">
      </div>
      <div class="account">
      <label for="">Account name</label>
      <input type="text" id="accountname" class="input input-accountname" placeholder="Enter account name"
          maxlength="25">
      </div>
      <div class="password">
      <label for="">Password</label>
      <input type="password" id="password" class="input input-password" placeholder="Enter password"
          maxlength="25">
      <img src="img/iconlogin/hidden-pass.svg" alt="" class="hidden-password">
      </div>
      <button class="btn-signup">Sign up</button>
      <div class="invalid-account hidden-form">enter account</div>
`


btnLogin.addEventListener('click' ,
  function (){
    btnLogin.classList.add('btn-active');
    btnRegister.classList.remove('btn-active');
    formType.innerHTML = formSignin;
    updateBtnlogin();
  }
)

btnRegister.addEventListener('click' ,
  function (){
    btnLogin.classList.remove('btn-active');
    btnRegister.classList.add('btn-active');
    formType.innerHTML = formSignup;
    updateBtnRegister();
  }
)

const account = JSON.parse(localStorage.getItem("account")) || [];

let formLogin = document.querySelector('.form');
let inputAccountName =  document.querySelector('.input-accountname');
let inputPassword = document.querySelector('.input-password');
let hiddenPassword = document.querySelector('.hidden-password');
let invalidAccount = document.querySelector('.invalid-account');
let btnSignIn = document.querySelector('.btn-signin');
let nameUser = document.querySelector('.name-user');
let btnSignOut = document.querySelector('.btn-sign-out');

let indexAccountnameCur = localStorage.getItem("indexAccountnameCur") || -1;
let isSignIn =Boolean(localStorage.getItem("isSignIn")) || false;

if(isSignIn){
            body.style.overflow = '';
            nameUser.innerHTML = account[indexAccountnameCur].username;
            btnSignOut.classList.remove('hidden-form');
            loadDataCart();
}

btnSignIn.addEventListener('click',enterPage);

function enterPage(){
  invalidAccount.classList.remove('hidden-form');
  if(account.length == 0){
    invalidAccount.innerHTML ='Account name no exist/';
    return;
  }
  if(inputAccountName.value =='' || inputPassword.value == '')
  {
    invalidAccount.innerHTML = 'You must enter account name and password before chose sign in';
  }
  else{
    for(let i = 0; i < account.length; i++){
      if(account[i].accountname == inputAccountName.value && account[i].password == inputPassword.value)
          {
            invalidAccount.innerHTML = 'Sign in sucess';
            sectionForm.classList.add('hidden');
            body.style.overflow = '';
            nameUser.innerHTML = account[i].username;
            btnSignOut.classList.remove('hidden-form');
            inputAccountName.value = '';
            inputPassword.value = '';
            indexAccountnameCur = i;
            isSignIn = true;
            loadDataCart();
            localStorage.setItem("indexAccountnameCur", indexAccountnameCur);
            localStorage.setItem("isSignIn", isSignIn);
          }
      else{
        if(account[i].accountname != inputAccountName.value && account[i].password == inputPassword.value)
          invalidAccount.innerHTML ='Account name no exist/';
        else
        if( account[i].accountname == inputAccountName.value && account[i].password != inputPassword.value)
          invalidAccount.innerHTML ='Password wrong/';
        else{
          invalidAccount.innerHTML ='Account name and Password Wrong/';
        }
      }
    }
  }
}

let hiddenPass = true;
hiddenPassword.addEventListener('click' , nonHiddenPassword);

function nonHiddenPassword(){
  if(hiddenPass)
  {
    hiddenPassword.src = 'img/iconlogin/non-hidden-pass.svg';
    hiddenPass = false;
    inputPassword.type = 'text';
  }
  else{
    hiddenPassword.src = 'img/iconlogin/hidden-pass.svg';
    hiddenPass = true;
    inputPassword.type = 'password';
  }
}

btnSignOut.addEventListener('click',signOutNow);

function signOutNow(){
  sectionForm.classList.remove('hidden');
  sectionForm.classList.add('hidden-form');
  nameUser.innerHTML = '';
  btnSignOut.classList.add('hidden-form');
  invalidAccount.innerHTML ='';
  invalidAccount.classList.add('hidden-form');
  indexAccountnameCur = -1;
  isSignIn =false;
  localStorage.setItem("indexAccountnameCur", indexAccountnameCur);
  localStorage.setItem("isSignIn", isSignIn);
  productCart.innerHTML = '';
  updateTotalPrice();
  saveData();
}

// SIGN UP



function updateBtnlogin(){
  btnSignIn = document.querySelector('.btn-signin');
  inputAccountName =  document.querySelector('.input-accountname');
  inputPassword = document.querySelector('.input-password');
  hiddenPassword = document.querySelector('.hidden-password');
  invalidAccount = document.querySelector('.invalid-account');
  hiddenPassword.addEventListener('click' , nonHiddenPassword);
  btnSignIn.addEventListener('click',enterPage);
}

function updateBtnRegister(){
  invalidAccount = document.querySelector('.invalid-account');
  btnSignUp = document.querySelector('.btn-signup');
  btnSignUp.addEventListener('click',signUp);
  inputUsername = document.querySelector('.input-username');
  inputAccountName =  document.querySelector('.input-accountname');
  inputPassword = document.querySelector('.input-password');
  hiddenPassword = document.querySelector('.hidden-password');
  hiddenPassword.addEventListener('click' , nonHiddenPassword);
}

let btnSignUp = document.querySelector('.btn-signup');
let inputUsername = document.querySelector('.input-username');

function signUp(){
  invalidAccount.classList.remove('hidden-form');
  if(inputAccountName.value =='' || inputPassword.value == '' || inputUsername.value == '')
    {
      invalidAccount.innerHTML = 'Enter full infor of you before sign up';
      return;
    }
  if(!checkAccountNameSignUp(inputAccountName.value)){
    invalidAccount.innerHTML = 'Account name accept a->z , A->Z , 0->9 ';
    return;
  }
  let newAccount = {
    username : inputUsername.value,
    accountname : inputAccountName.value,
    password : inputPassword.value,
    cart : []
  }

  for(let i = 0; i < account.length; i++)
    if(newAccount.accountname == account[i].accountname)
      {
        invalidAccount.innerHTML = 'Account Name exist ';
        return;
      }

  account.push(newAccount);
  saveData();
  invalidAccount.innerHTML = 'Sign up sucess.Return Login';
}

function checkAccountNameSignUp(inputAccountName){
    for(let i = 0; i < inputAccountName.length; i++){
      let c = inputAccountName.charCodeAt(i);
      if( c <= 47 || (c >= 58 && c <= 64) || (c >= 91 && c <= 96) || c >= 123)
        return 0;
    }
    return 1;
}


function saveData() {
  localStorage.removeItem("account");
  localStorage.setItem("account", JSON.stringify(account));
}