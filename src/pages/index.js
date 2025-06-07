//imports
import "./index.css";
import Section from "../components/Section.js";
import closeSrc from "../images/close.svg";
import closeSrcWhite from "../images/deleteWhite.png";
import editSrc from "../images/pencil.svg";
import headerImgSrc from "../images/logo.svg";
import editAvatarSrc from "../images/btn__edit_a.png";
import editAvatarSrcSm from "../images/btn__edit_a-sm.png";
import {
  closeImage0,
  closeImage1,
  closeImage2,
  closeImage3,
  closeImage4,
  cardTemplate,
  validationConfig,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import Api from "../utils/Api.js";

//general constants
const editImage = document.getElementById("logo_pencil");
const avatarImage = document.getElementById("avatar");
const editAvatarImage = document.getElementById("edit-avatar");
const logoImage = document.getElementById("logo");
const cardsBox = document.querySelector("#cards");
const avatarOverlay = document.querySelector(".profile__pic_overlay");
const avatarEdit = document.querySelector("#edit-avatar");

//forms
const profileEditForm = document.forms["profile-modal__form"];
const newPostForm = document.forms["new-post-modal__form"];
const avatarEditForm = document.forms["avatar-modal__form"];

//buttons
const newPostBtn = document.querySelector(".profile__new-post-btn");
const profileEditButton = document.querySelector("#profile-edit-button");

//modals
const newPostModal = document.querySelector("#add-card");
const profileEdit = document.querySelector("#profile-edit");
const avatarEditModal = document.querySelector("#avatar-edit");

//profile name and about
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");

//modal inputs
const profileNameEdit = document.querySelector("#profile__name-edit");
const profileDescEdit = document.querySelector("#profile__description-edit");
const profileAvatarEdit = document.querySelector("#avatar__image-edit");

/*setting each close image as it's own unique id.
if I didn't do this only the first of each type would work,
if at all...*/
closeImage0.src = closeSrcWhite;
closeImage1.src = closeSrc;
closeImage2.src = closeSrc;
closeImage3.src = closeSrcWhite;
closeImage4.src = closeSrc;
editImage.src = editSrc;
logoImage.src = headerImgSrc;
editAvatarImage.src = editAvatarSrc;

//api instantiation
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1b479a53-ca53-48f0-8ad9-ce6abaf33b2b",
    "Content-Type": "application/json",
  },
});

let section;

//initial page load rendering
api.getAppinfo().then(([cards, userInfo]) => {
  //Section instantiation
  section = new Section({
    items: cards,
    renderer: (item) => {
      renderCards(item);
    },
    containerEl: cardsBox,
  });

  //renders the initial cards.
  section.renderItems();

  //sets the profile name and description
  profileName.innerText = userInfo.name;
  profileDesc.innerText = userInfo.about;
  avatarImage.src = userInfo.avatar;
});

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

//edit Avatar instantiation.
const avatarPopup = new PopupWithForm({
  popupSelector: avatarEditModal,
  handleFormSubmit: () => {
    avatarImage.src = profileAvatarEdit.value;
    validateAvatarForm.resetValidation();
    avatarPopup.close();
    api.updateProfileAvatar({ avatar: avatarImage.src });
  },
});

//edit profile name and description instantiation.
const profilePopup = new PopupWithForm({
  popupSelector: profileEdit,
  handleFormSubmit: () => {
    profileName.innerText = profileNameEdit.value;
    profileDesc.innerText = profileDescEdit.value;
    validateProfileForm.resetValidation();
    profilePopup.close();
    api.updateProfile({
      name: profileName.innerText,
      about: profileDesc.innerText,
    });
  },
});

//new post form instantiation.
const newPostPopup = new PopupWithForm({
  popupSelector: newPostModal,
  handleFormSubmit: (values) => {
    const name = values["caption"];
    const link = values["image-link"];

    renderCards({ name, link });
    validateNewPostForm.resetValidation();
    newPostPopup.close();
    api.postCard({ name: name, link: link });
  },
});

//form validation instantiations.
const validateProfileForm = new FormValidator(
  validationConfig,
  profileEditForm
);

const validateNewPostForm = new FormValidator(validationConfig, newPostForm);

const validateAvatarForm = new FormValidator(validationConfig, avatarEditForm);

//event listeners.
profileEditButton.addEventListener("click", () => {
  profileNameEdit.value = profileName.innerText;
  profileDescEdit.value = profileDesc.innerText;
  profilePopup.open();
});

newPostBtn.addEventListener("click", () => {
  newPostPopup.open();
});

avatarOverlay.addEventListener("click", () => {
  avatarPopup.open();
});

avatarImage.addEventListener("mouseenter", () => {
  if (window.matchMedia("(min-width: 930px)").matches) {
    avatarOverlay.classList.add("profile__pic_overlay-visible");
    avatarEdit.classList.add("profile__pic_overlay-visible");
  }
});

avatarOverlay.addEventListener("mouseleave", () => {
  avatarOverlay.classList.remove("profile__pic_overlay-visible");
  avatarEdit.classList.remove("profile__pic_overlay-visible");
});

//calling validation and listeners.
validateProfileForm.enableValidation();
validateNewPostForm.enableValidation();
validateAvatarForm.enableValidation();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
newPostPopup.setEventListeners();

//resize handling.
function resizeProfileEdit() {
  if (!window.matchMedia("(min-width: 930px)").matches) {
    editAvatarImage.src = editAvatarSrcSm;
  } else {
    editAvatarImage.src = editAvatarSrc;
  }
}

resizeProfileEdit();

window.addEventListener("resize", resizeProfileEdit);
