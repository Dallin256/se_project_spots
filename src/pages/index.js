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
import Popup from "../components/Popup.js";
import DeleteCard from "../components/DeleteCard.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";

const editImage = document.getElementById("logo_pencil");
const avatarImage = document.getElementById("avatar");
const logoImage = document.getElementById("logo");
const profileEdit = document.querySelector("#profile-edit");
const profileEditForm = document.forms["profile-modal__form"];
const newPostForm = document.forms["new-post-modal__form"];
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#add-card");
const modalPicture = document.querySelector("#picture__modal");
const modalPictureImage = modalPicture.querySelector(".modal__picture");
const cardsBox = document.querySelector("#cards");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileNameEdit = document.querySelector("#profile__name-edit");
const profileDescEdit = document.querySelector("#profile__description-edit");
const profileEditButton = document.querySelector("#profile-edit-button");

closeImage0.src = closeSrcWhite;
closeImage1.src = closeSrc;
closeImage2.src = closeSrc;
closeImage3.src = closeSrcWhite;
editImage.src = editSrc;
avatarImage.src = avatarSrc;
logoImage.src = headerImgSrc;

const generateCard = (data) => {
  const card = new Card(data, cardTemplate);
  const cardElement = card.getView();
  return cardElement;
};

const renderCards = (values) => {
  const card = generateCard(values);
  section.addItem(card);
};

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCards(item);
  },
  containerEl: cardsBox,
});

section.renderItems();

const profilePopup = new PopupWithForm({
  popupSelector: profileEdit,
  handleFormSubmit: () => {
    profileName.innerText = profileNameEdit.value;
    profileDesc.innerText = profileDescEdit.value;
    validateProfileForm.resetValidation();
    profilePopup.close();
  },
});

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

const validateProfileForm = new FormValidator(
  validationConfig,
  profileEditForm
);

const validateNewPostForm = new FormValidator(validationConfig, newPostForm);

profileEditButton.addEventListener("click", () => {
  profilePopup.open();
});

newPostBtn.addEventListener("click", () => {
  newPostPopup.open();
});

validateProfileForm.enableValidation();
validateNewPostForm.enableValidation();
profilePopup.setEventListeners();
newPostPopup.setEventListeners();
