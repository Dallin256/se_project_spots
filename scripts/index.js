
const profileEdit = document.querySelector("#profile-edit", "modal");
const profileEditButton = document.querySelector("#profile-edit-button") ;
const profileEditButtonClose = document.querySelector(".modal__close-button");
const profileSave = document.querySelector(".modal__save");
let profileName = document.querySelector(".profile__name");
let profileDesc = document.querySelector(".profile__description");
let profileNameEdit = document.querySelector("#profile__name-edit");
let profileDescEdit = document.querySelector("#profile__description-edit");
const cardTemplate = document.querySelector("#card").Content;


profileEditButton.addEventListener('click', editProfile);

function editProfile() {  
   profileEdit.setAttribute("style", "visibility: visible");
}

function formSave(){
   profileName.innerText = profileNameEdit.value;
   profileDesc.innerText = profileDescEdit.value;
   profileDescEdit.setAttribute('placeholder', profileDescEdit.value);
   profileNameEdit.setAttribute('placeholder', profileNameEdit.value);
   event.preventDefault();
   profileEdit.setAttribute('style', "visibility: hidden");
   
}
profileSave.addEventListener('click', formSave);

profileEditButtonClose.addEventListener('click', editProfileClose);

function editProfileClose(){
   profileEdit.setAttribute("style", "visibility: hidden");
}
document.querySelector(".profile__name");
  const initialCards= [card1, card2, card3, card5, card6];

   initialCards[0]={
        name: "Aoraki Mountain ",
        link: "https://images.unsplash.com/photo-1589023846998-3cbff59d037f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
     };
     initialCards[1]={
        name: "Stone Forest" ,
        link: "https://plus.unsplash.com/premium_photo-1661963421878-fbe18ea938f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
     };
     initialCards[2]={
        name: "Hagia Sophia" ,
        link: "https://images.unsplash.com/photo-1623621534850-d325a1980c7e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
     };
     initialCards[3]={
        name: "Rainbow Row" ,
        link: "https://images.unsplash.com/photo-1588007129936-5b7754628cd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoYXJsZXN0b258ZW58MHx8MHx8fDA%3D"
     };
     initialCards[4]={
        name: "Thai Market" ,
        link: "https://images.unsplash.com/photo-1614888901558-dd1ef11bada3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
     };
     initialCards[5]={
        name: "Congaree" ,
        link: "https://images.unsplash.com/photo-1647747836228-e4a823814697?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZ2FyZWV8ZW58MHx8MHx8fDA%3D"
     };
