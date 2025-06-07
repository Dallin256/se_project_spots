// export const initialCards = [
//   {
//     name: "Aoraki Mountain ",
//     link: "https://images.unsplash.com/photo-1589023846998-3cbff59d037f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Stone Forest",
//     link: "https://plus.unsplash.com/premium_photo-1661963421878-fbe18ea938f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Hagia Sophia",
//     link: "https://images.unsplash.com/photo-1623621534850-d325a1980c7e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Rainbow Row",
//     link: "https://images.unsplash.com/photo-1588007129936-5b7754628cd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoYXJsZXN0b258ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     name: "Thai Market",
//     link: "https://images.unsplash.com/photo-1614888901558-dd1ef11bada3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Congaree",
//     link: "https://images.unsplash.com/photo-1647747836228-e4a823814697?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZ2FyZWV8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     name: "bridge",
//     link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

export const profileEdit = document.querySelector("#profile-edit");
export const profileEditForm = document.forms["profile-modal__form"];
export const newPostForm = document.forms["new-post-modal__form"];
export const profileEditButton = document.querySelector("#profile-edit-button");
export const newPostBtn = document.querySelector(".profile__new-post-btn");
export const newPostModal = document.querySelector("#add-card");
export const newPostClose = newPostModal.querySelector(".modal__close-button");
export const profileEditButtonClose = profileEdit.querySelector(
  ".modal__close-button"
);
export const modalPicture = document.querySelector("#picture__modal");
export const modalPictureClose = modalPicture.querySelector(
  ".modal__close-button"
);
export const modalPictureImage = modalPicture.querySelector(".modal__picture");
export const profileName = document.querySelector(".profile__name");
export const profileDesc = document.querySelector(".profile__description");
export const profileNameEdit = document.querySelector("#profile__name-edit");
export const profileDescEdit = document.querySelector(
  "#profile__description-edit"
);
export const cardName = newPostForm.querySelector("#card__name_form");
export const cardImage = newPostForm.querySelector("#card__image_form");
export const cardTemplate = document.querySelector("#card").content;
export const cardsBox = document.querySelector("#cards");
export const modalImageCaption = modalPicture.querySelector(
  ".modal__picture-caption"
);
export const modals = Array.from(document.querySelectorAll(".modal"));
