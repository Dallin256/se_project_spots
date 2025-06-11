//imports
import "./index.css";
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
} from "../utils/constants.js";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
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

//modals
const modals = Array.from(document.querySelectorAll(".modal"));
const newPostModal = document.querySelector("#add-card");
const profileEdit = document.querySelector("#profile-edit");
const avatarEditModal = document.querySelector("#avatar-edit");
const deleteCardModal = document.querySelector("#delete-card");

//buttons
const newPostBtn = document.querySelector(".profile__new-post-btn");
const profileEditButton = document.querySelector("#profile-edit-button");
const deleteCardConfirm = deleteCardModal.querySelector(
  ".button__confirm-delete"
);
const deleteCardCancel = deleteCardModal.querySelector("button__cancel");

//profile name and about
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");

//modal inputs
const profileNameEdit = document.querySelector("#profile__name-edit");
const profileDescEdit = document.querySelector("#profile__description-edit");
const profileAvatarEdit = document.querySelector("#avatar__image-edit");
const cardName = newPostForm.querySelector("#card__name_form");
const cardImage = newPostForm.querySelector("#card__image_form");

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

function addCards(cards) {
  cards.forEach((iCard) => {
    const cardEl = getCardElement(iCard);
    cardsBox.append(cardEl);
  });
}

//initial page load rendering
api.getAppinfo().then(([cards, userInfo]) => {
  //renders the initial cards.
  addCards(cards);

  //sets the profile name and description
  profileName.innerText = userInfo.name;
  profileDesc.innerText = userInfo.about;
  avatarImage.src = userInfo.avatar;
});

function pressKey(evt) {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", pressKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", pressKey);
}

function handleProfileFormSubmit(e) {
  const profileSaveBtn = profileEdit.querySelector(".modal__button-save");
  profileSaveBtn.innerText = "Loading....";
  profileName.innerText = profileNameEdit.value;
  profileDesc.innerText = profileDescEdit.value;
  e.preventDefault();
  api.updateProfile({
    name: profileName.innerText,
    about: profileDesc.innerText,
  });
  closeModal(profileEdit);
  profileSaveBtn.innerText = "Save";
}

function handleNewPostFormSubmit(e) {
  const newPostSaveBtn = newPostModal.querySelector(".modal__button-save");
  const postLink = cardImage.value;
  const postCaption = cardName.value;
  const newCard = getCardElement({ name: postCaption, link: postLink });
  newPostSaveBtn.innerText = "Loading....";
  api
    .postCard({ name: postCaption, link: postLink })
    .then(cardsBox.prepend(newCard));
  e.preventDefault();
  e.target.reset();
  disableButton(newPostForm, settings);
  closeModal(newPostModal);
  newPostSaveBtn.innerText = "Save";
}

function handleDeleteCardModal(cardEl, data) {
  openModal(deleteCardModal);

  const confirm = deleteCardModal.querySelector(".button__confirm-delete");
  const cancel = deleteCardModal.querySelector(".button__cancel");

  confirm.addEventListener("click", () => {
    confirm.innerText = "Loading....";
    api.removeCard(data._id).then(cardEl.remove());
    closeModal(deleteCardModal);
  });
  deleteCardModal.addEventListener("submit", () => {
    api.removeCard(data._id).then(cardEl.remove());
    closeModal(deleteCardModal);
  });
  deleteCardModal.addEventListener("click", (evt) => {
    if (evt.target == cancel) {
      closeModal(deleteCardModal);
    }
  });
}

function handleLike(cardEl, data) {
  const favoriteBtn = cardEl.querySelector(".card__heart");
  if (
    favoriteBtn.classList.contains("card__heart_filled") ||
    data.isLiked == "false"
  ) {
    favoriteBtn.classList.remove("card__heart_filled");
    data.isLiked = "false";
    api.dislikeCard(data._id);
  } else if (
    !favoriteBtn.classList.contains("card__heart_filled") ||
    data.isLiked == "true"
  ) {
    favoriteBtn.classList.add("card__heart_filled");
    data.isLiked = "true";
    api.likeCard(data._id);
  }
}

function handleImageClick(data) {
  openModal(modalPicture);
  console.log(modalPicture);
  modalPictureImage.src = data.link;
  modalPictureImage.alt = data.name;
  modalImageCaption.textContent = data.name;
}

//builds cards.
function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardNameElement = cardElement.querySelector(".card__name");
  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  const heart = cardElement.querySelector(".card__heart");
  const deleteCard = cardElement.querySelector(".card__delete-button");
  cardImageElement.addEventListener("click", () => {
    handleImageClick(data);
  });
  deleteCard.addEventListener("click", () => {
    handleDeleteCardModal(cardElement, data);
  });
  heart.addEventListener("click", () => {
    handleLike(cardElement, data);
  });
  return cardElement;
}

//sets basic listeners for all current & future modals
modals.forEach((modal) => {
  const buttonClose = modal.querySelector(".modal__close-button");

  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
  buttonClose.addEventListener("click", () => {
    closeModal(modal);
  });
});

function handleAvatarFormSubmit(e) {
  e.preventDefault();
  avatarImage.src = profileAvatarEdit.value;
  const avatarImg = avatarImage.src;
  api.updateProfileAvatar({ avatar: avatarImg });
  closeModal(avatarEditModal);
}

//resize handling.
function resizeProfileEdit() {
  if (!window.matchMedia("(min-width: 930px)").matches) {
    editAvatarImage.src = editAvatarSrcSm;
  } else {
    editAvatarImage.src = editAvatarSrc;
  }
}

//Event Listeners
window.addEventListener("resize", resizeProfileEdit);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostFormSubmit);

profileEditButton.addEventListener("click", () => {
  resetValidation(profileEdit, settings);
  openModal(profileEdit);
  profileNameEdit.value = profileName.innerText;
  profileDescEdit.value = profileDesc.innerText;
});

newPostBtn.addEventListener("click", () => {
  disableButton(newPostForm, settings);
  openModal(newPostModal);
});

avatarOverlay.addEventListener("click", () => {
  openModal(avatarEditModal);
  avatarEditModal.addEventListener("submit", handleAvatarFormSubmit);
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

//function calls
resizeProfileEdit();
enableValidation(settings);
