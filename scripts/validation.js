const forms = Array.from(document.querySelectorAll(".modal__content"));

function showError(inputElement, errorElement, buttonElement) {
  inputElement.classList.add("error__input-box");
  errorElement.classList.add("error__message_active");
  errorElement.textContent = inputElement.validationMessage;
  buttonElement.classList.add("modal__button-save_disabled");
  buttonElement.setAttribute("disabled", true);
}

function hideError(inputElement, errorElement, buttonElement) {
  inputElement.classList.remove("error__input-box");
  errorElement.classList.remove("error__message_active");
}

function disableButton(form) {
  const saveButton = form.querySelector(".modal__button-save");
  saveButton.classList.add("modal__button-save_disabled");
  saveButton.setAttribute("disabled", true);
}

function enableButton(form) {
  const saveButton = form.querySelector(".modal__button-save");
  saveButton.classList.remove("modal__button-save_disabled");
  saveButton.removeAttribute("disabled", true);
}

function enableValidation() {
  forms.forEach((form) => {
    const formFields = Array.from(form.querySelectorAll(".modal__form-label"));
    const submit = form.querySelector(".modal__button-save");

    formFields.forEach((field) => {
      const input = field.querySelector(".modal__input");
      const msg = field.querySelector(".error__message");

      input.addEventListener("input", () => {
        checkValidity(input, msg, submit, form);
      });
    });
  });
}

function checkValidity(input, msg, submit, form) {
  if (!input.validity.valid) {
    showError(input, msg, submit);
    disableButton(form);
  } else {
    hideError(input, msg, submit);
    enableButton(form);
  }
}

enableValidation();
