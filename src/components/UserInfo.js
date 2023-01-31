//  M E S T O   -   O O P

// Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo.
// Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.

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
