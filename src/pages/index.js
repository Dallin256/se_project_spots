//tons of imports I know haha
import "./index.css";
import Section from "../components/Section.js";
import closeSrc from "../images/close.svg";
import closeSrcWhite from "../images/deleteWhite.png";
import editSrc from "../images/pencil.svg";
import avatarSrc from "../images/Avatar.avif";
import headerImgSrc from "../images/logo.svg";
import {
  initialCards,
  closeImage0,
  closeImage1,
  closeImage2,
  closeImage3,
  cardTemplate,
  validationConfig,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import Api from "../utils/Api.js";
//lots of constants.. should I move them to the const file?
const editImage = document.getElementById("logo_pencil");
const avatarImage = document.getElementById("avatar");
const logoImage = document.getElementById("logo");
const profileEdit = document.querySelector("#profile-edit");
const profileEditForm = document.forms["profile-modal__form"];
const newPostForm = document.forms["new-post-modal__form"];
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#add-card");
const cardsBox = document.querySelector("#cards");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileNameEdit = document.querySelector("#profile__name-edit");
const profileDescEdit = document.querySelector("#profile__description-edit");
const profileEditButton = document.querySelector("#profile-edit-button");
/*setting each close image as it's own unique id.
if I didn't do this only the first of each type would work,
if at all...*/
closeImage0.src = closeSrcWhite;
closeImage1.src = closeSrc;
closeImage2.src = closeSrc;
closeImage3.src = closeSrcWhite;
editImage.src = editSrc;
avatarImage.src = avatarSrc;
logoImage.src = headerImgSrc;
//api instantiation
// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "0d9ab5c4-a8f5-4c10-8be4-2d8410dc23bc",
//     "Content-Type": "application/json",
//   },
// });

// api.getInitialCards().then((cards) => {});

//gets card info and builds it.
const generateCard = (data) => {
  const card = new Card(data, cardTemplate);
  const cardElement = card.getView();
  return cardElement;
};
//uses a generated card to render it
const renderCards = (values) => {
  const card = generateCard(values);
  section.addItem(card);
};
//Section instantiation
const section = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCards(item);
  },
  containerEl: cardsBox,
});
//renders the initial cards.
section.renderItems();
//edit profile name and description instantiation.
const profilePopup = new PopupWithForm({
  popupSelector: profileEdit,
  handleFormSubmit: () => {
    profileName.innerText = profileNameEdit.value;
    profileDesc.innerText = profileDescEdit.value;
    validateProfileForm.resetValidation();
    profilePopup.close();
  },
});
//new post form instantiation.
const newPostPopup = new PopupWithForm({
  popupSelector: newPostModal,
  handleFormSubmit: (values) => {
    const name = values["caption"];
    const link = values["image-link"];

    renderCards({ name, link });
    newPostPopup.resetValidation();
    newPostPopup.close();
  },
});
//form validation instantiations.
const validateProfileForm = new FormValidator(
  validationConfig,
  profileEditForm
);

const validateNewPostForm = new FormValidator(validationConfig, newPostForm);
//event listeners.
profileEditButton.addEventListener("click", () => {
  profilePopup.open();
});

newPostBtn.addEventListener("click", () => {
  newPostPopup.open();
});
//calling validation and listeners.
validateProfileForm.enableValidation();
validateNewPostForm.enableValidation();
profilePopup.setEventListeners();
newPostPopup.setEventListeners();
