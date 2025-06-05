export default class Api {
  constructor(options) {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "c0d9ab5c4-a8f5-4c10-8be4-2d8410dc23bc",
      },
    }).then((res) => res.json());
  }
}
