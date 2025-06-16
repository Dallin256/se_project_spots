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

//modals
const modals = Array.from(document.querySelectorAll(".modal"));
const newPostModal = document.querySelector("#add-card");
const profileEdit = document.querySelector("#profile-edit");
const avatarEditModal = document.querySelector("#avatar-edit");
const deleteCardModal = document.querySelector("#delete-card");
const modalPicture = document.querySelector("#picture__modal");

//buttons
const newPostBtn = document.querySelector(".profile__new-post-btn");
const profileEditButton = document.querySelector("#profile-edit-button");

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

//renders existing cards from the database
function addCards(cards) {
  cards.forEach((iCard) => {
    const cardEl = getCardElement(iCard);
    cardsBox.append(cardEl);
    renderLike(cardEl, iCard);
  });
}

//initial page load rendering
api
  .getAppinfo()
  .then(([cards, userInfo]) => {
    //renders the initial cards.
    addCards(cards);

    //sets the profile name and description
    profileName.innerText = userInfo.name;
    profileDesc.innerText = userInfo.about;
    avatarImage.src = userInfo.avatar;
  })
  .catch(console.error);

//closes any modal by pressing the Escape key
function pressKey(evt) {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
}

//open and close modal functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", pressKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", pressKey);
}

//updates the profile name and description using user input from a modal
function handleProfileFormSubmit(e) {
  const profileSaveBtn = e.submitter;
  profileSaveBtn.innerText = "Saving...";

  e.preventDefault();
  api
    .updateProfile({
      name: profileNameEdit.value,
      about: profileDescEdit.value,
    })
    .then(
      (profileName.innerText = profileNameEdit.value),
      (profileDesc.innerText = profileDescEdit.value),
      closeModal(profileEdit)
    )
    .catch(console.error)
    .finally(() => {
      profileSaveBtn.innerText = "Save";
    });
}

// adds a new card to the page using user input from a modal
function handleNewPostFormSubmit(e) {
  const newPostSaveBtn = e.submitter;
  const postLink = cardImage.value;
  const postCaption = cardName.value;
  newPostSaveBtn.innerText = "Saving...";
  e.preventDefault();
  api
    .postCard({ name: postCaption, link: postLink })
    .then((data) => {
      const newCard = getCardElement(data);
      cardsBox.prepend(newCard);
      e.target.reset();
      disableButton(newPostForm, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      newPostSaveBtn.innerText = "Save";
    });
}

//opens a modal for the user to confirm whether or not they want to delete a card; and then deletes it.
function handleDeleteCardModal(cardEl, data) {
  const confirm = deleteCardModal.querySelector(".button__confirm-delete");
  const cancel = deleteCardModal.querySelector(".button__cancel");

  confirm.innerText = "Delete";
  openModal(deleteCardModal);

  const handleDeleteConfirm = () => {
    confirm.innerText = "Deleting...";
    api
      .removeCard(data._id)
      .then(cardEl.remove())
      .catch(console.error)
      .finally(closeModal(deleteCardModal));
  };

  confirm.addEventListener("click", handleDeleteConfirm);

  deleteCardModal.addEventListener("click", (evt) => {
    if (evt.target == cancel) {
      closeModal(deleteCardModal);
    }
  });
}

//gets the like status from a card and renders it on page load
function renderLike(cardEl, data) {
  const favoriteBtn = cardEl.querySelector(".card__heart");
  if (data.isLiked == true) {
    favoriteBtn.classList.add("card__heart_filled");
  } else if (data.isLiked == false) {
    favoriteBtn.classList.remove("card__heart_filled");
  } else {
    console.error;
  }
}

//fills the heart icon when the user clicks it and unfills when it is clicked while full
function handleLike(cardEl, data) {
  const favoriteBtn = cardEl.querySelector(".card__heart");
  if (
    favoriteBtn.classList.contains("card__heart_filled") ||
    data.isLiked == true
  ) {
    api
      .dislikeCard(data._id)
      .then(
        favoriteBtn.classList.remove("card__heart_filled"),
        (data.isLiked = false)
      )
      .catch(console.error);
  } else if (
    !favoriteBtn.classList.contains("card__heart_filled") ||
    data.isLiked == false
  ) {
    api
      .likeCard(data._id)
      .then(
        favoriteBtn.classList.add("card__heart_filled"),
        (data.isLiked = true)
      )
      .catch(console.error);
  }
}

//opens a modal that is a enlarged version of the card clicked
function handleImageClick(data) {
  const modalPictureImage = modalPicture.querySelector(".modal__picture");
  const modalImageCaption = modalPicture.querySelector(
    ".modal__picture-caption"
  );
  openModal(modalPicture);
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

//opens the Avatar modal, disables the button & sets listener
function handleAvatarModal() {
  disableButton(avatarEditModal, settings);
  openModal(avatarEditModal);
  avatarEditModal.addEventListener("submit", handleAvatarFormSubmit);
}

//updates the user avatar
function handleAvatarFormSubmit(e) {
  e.preventDefault();
  const confirm = e.submitter;
  const avatarImg = avatarImage.src;

  confirm.innerText = "Saving...";
  api
    .updateProfileAvatar({ avatar: avatarImg })
    .then(() => {
      avatarImage.src = profileAvatarEdit.value;
      closeModal(avatarEditModal);
      disableButton(avatarEditModal, settings);
      avatarEditModal.removeEventListener("submit", handleAvatarFormSubmit);
      resetValidation(avatarEditModal, settings);
    })
    .catch(console.error)
    .finally(() => {
      confirm.innerText = "Save";
    });
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
  handleAvatarModal();
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
