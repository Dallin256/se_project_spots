const settings = {
  formSelector: ".modal__form",
  saveButtonSelector: ".modal__button-save",
  formFieldSelector: ".modal__form-label",
  inputFieldSelector: ".modal__input",
  inputErrorSelector: ".error__message",
  errorMessageActiveClass: "error__message_active",
  errorInputClass: "error__input-box",
  saveButtonDisabledClass: "modal__button-save_disabled",
};

function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.errorInputClass);
  errorElement.classList.add(config.errorMessageActiveClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.errorInputClass);
  errorElement.classList.remove(config.errorMessageActiveClass);
}

function disableButton(form, config) {
  const saveButton = form.querySelector(config.saveButtonSelector);
  saveButton.classList.add(config.saveButtonDisabledClass);
  saveButton.setAttribute("disabled", true);
}

function enableButton(form, config) {
  const saveButton = form.querySelector(config.saveButtonSelector);
  saveButton.classList.remove(config.saveButtonDisabledClass);
  saveButton.removeAttribute("disabled", true);
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const formFields = Array.from(
      form.querySelectorAll(config.formFieldSelector)
    );

    formFields.forEach((field) => {
      const input = field.querySelector(config.inputFieldSelector);
      const msg = field.querySelector(config.inputErrorSelector);

      input.addEventListener("input", () => {
        checkValidity(input, msg, form, config);
      });
    });
  });
}

function checkValidity(input, msg, form, config) {
  if (!input.validity.valid) {
    showError(input, msg, config);
    disableButton(form, config);
  } else {
    hideError(input, msg, config);
    enableButton(form, config);
  }
}
function resetValidation(form, config) {
  const formFields = Array.from(
    form.querySelectorAll(config.formFieldSelector)
  );
  formFields.forEach((field) => {
    const input = field.querySelector(config.inputFieldSelector);
    const msg = field.querySelector(config.inputErrorSelector);
    hideError(input, msg, config);
  });
}

enableValidation(settings);
