export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameNode = document.querySelector(nameSelector);
    this._aboutNode = document.querySelector(aboutSelector);
    this._avatarNode = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {name: this._name, about: this._about}
  }

  getUserId() {
    return this._id
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
    this._nameNode.textContent = this._name;
    this._aboutNode.textContent = this._about;
    this._avatarNode.src = this._avatar;
  }
}
