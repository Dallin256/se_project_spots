const forms = Array.from(document.querySelectorAll(".modal__content"));

forms.forEach((form) => {
  const formInputs = Array.from(form.querySelectorAll(".modal__input"));
  const formFields = Array.from(form.querySelectorAll(".modal__form-label"));

  formInputs.forEach((input) => {
    input.addEventListener(
      "invalid",
      (evt) => {
        evt.preventDefault();
      },
      true
    );
  });

  formFields.forEach((field) => {
    const input = field.querySelector(".modal__input");
    const msg = field.querySelector(".error__message");
    checkValidity(input, msg);
    evt.preventDefault();
  });
});

function checkValidity(input, msg) {
  if (!input.validity.valid) {
    msg.classList.add("error__message_active");
  } else {
    msg.classList.remove("error__message_active");
  }
}
/* form.addEventListener("submit", function (evt) {
       evt.preventDefault();
      console.log("added Listener");
   });
});*/
