export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameNode = document.querySelector(nameSelector);
    this._aboutNode = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {name: this._name, about: this._about}
  }

  setUserInfo({name, about}) {
    this._name = name;
    this._about = about;
    this._nameNode.textContent = this._name;
    this._aboutNode.textContent = this._about;
  }
}
