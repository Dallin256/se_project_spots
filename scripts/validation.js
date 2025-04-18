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
  buttonElement.classList.remove("modal__button-save_disabled");
  buttonElement.removeAttribute("disabled");
}

forms.forEach((form) => {
  const formFields = Array.from(form.querySelectorAll(".modal__form-label"));
  const submit = form.querySelector(".modal__button-save");

  formFields.forEach((field) => {
    const input = field.querySelector(".modal__input");
    const msg = field.querySelector(".error__message");

    input.addEventListener("input", () => {
      checkValidity(input, msg, submit);
    });
  });
});

function checkValidity(input, msg, submit) {
  if (!input.validity.valid) {
    showError(input, msg, submit);
  } else {
    hideError(input, msg, submit);
  }
}
