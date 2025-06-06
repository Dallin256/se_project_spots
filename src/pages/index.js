import "./index.css";
import closeSrc from "../images/close.svg";
import editSrc from "../images/pencil.svg";
import avatarSrc from "../images/Avatar.avif";
import headerImgSrc from "../images/logo.svg";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "./validation.js";

const closeImage0 = document.getElementById("close-button0");
const closeImage1 = document.getElementById("close-button1");
const closeImage2 = document.getElementById("close-button2");
const editImage = document.getElementById("logo_pencil");
const avatarImage = document.getElementById("avatar");
const logoImage = document.getElementById("logo");

const initialCards = [
  {
    name: "Aoraki Mountain ",
    link: "https://images.unsplash.com/photo-1589023846998-3cbff59d037f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Stone Forest",
    link: "https://plus.unsplash.com/premium_photo-1661963421878-fbe18ea938f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hagia Sophia",
    link: "https://images.unsplash.com/photo-1623621534850-d325a1980c7e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Rainbow Row",
    link: "https://images.unsplash.com/photo-1588007129936-5b7754628cd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoYXJsZXN0b258ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Thai Market",
    link: "https://images.unsplash.com/photo-1614888901558-dd1ef11bada3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Congaree",
    link: "https://images.unsplash.com/photo-1647747836228-e4a823814697?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZ2FyZWV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "bridge",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const profileEdit = document.querySelector("#profile-edit");
const profileEditForm = document.forms["profile-modal__form"];
const newPostForm = document.forms["new-post-modal__form"];
const profileEditButton = document.querySelector("#profile-edit-button");
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#add-card");
const newPostClose = newPostModal.querySelector(".modal__close-button");
const modalPicture = document.querySelector("#picture__modal");
const modalPictureClose = modalPicture.querySelector(".modal__close-button");
const modalPictureImage = modalPicture.querySelector(".modal__picture");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileNameEdit = document.querySelector("#profile__name-edit");
const profileDescEdit = document.querySelector("#profile__description-edit");
const cardName = newPostForm.querySelector("#card__name_form");
const cardImage = newPostForm.querySelector("#card__image_form");
const cardTemplate = document.querySelector("#card").content;
const cardsBox = document.querySelector("#cards");
const modalImageCaption = modalPicture.querySelector(".modal__picture-caption");
const modals = Array.from(document.querySelectorAll(".modal"));
const profileEditButtonClose = profileEdit.querySelector(
  ".modal__close-button"
);

closeImage0.src = closeSrc;
closeImage1.src = closeSrc;
closeImage2.src = closeSrc;
editImage.src = editSrc;
avatarImage.src = avatarSrc;
logoImage.src = headerImgSrc;

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
  profileName.innerText = profileNameEdit.value;
  profileDesc.innerText = profileDescEdit.value;
  e.preventDefault();
  closeModal(profileEdit);
}

function handleNewPostFormSubmit(e) {
  const postLink = cardImage.value;
  const postCaption = cardName.value;
  const newCard = getCardElement({ name: postCaption, link: postLink });
  cardsBox.prepend(newCard);
  e.preventDefault();
  e.target.reset();
  disableButton(newPostForm, settings);
  closeModal(newPostModal);
}

function handleDeleteCard(event) {
  event.target.closest(".card").remove();
}

function handleLike(event) {
  event.target.classList.toggle("card__heart_filled");
}

function handleImageClick(data) {
  openModal(modalPicture);
  console.log(modalPicture);
  modalPictureImage.src = data.link;
  modalPictureImage.alt = data.name;
  modalImageCaption.textContent = data.name;
}

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
  deleteCard.addEventListener("click", handleDeleteCard);
  heart.addEventListener("click", handleLike);
  return cardElement;
}

function addCards() {
  initialCards.forEach((iCard) => {
    const cardEl = getCardElement(iCard);
    cardsBox.append(cardEl);
  });
}

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

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostFormSubmit);
addCards();
enableValidation(settings);
