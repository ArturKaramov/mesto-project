(()=>{"use strict";var t=document.querySelector(".profile__edit-button"),e=document.querySelector(".profile__add-button"),n=document.querySelector(".profile-edit"),r=n.querySelector(".profile-edit__name"),o=n.querySelector(".profile-edit__about"),i=document.querySelector(".profile__avatar-button"),u=document.querySelector(".page_loading"),a={formSelector:".popup__form",inputSelector:".popup__item",submitButtonSelector:".popup__button",inputErrorClass:"popup__item_type_error"},c={baseUrl:"https://nomoreparties.co/v1/".concat("plus-cohort-18"),headers:{authorization:"0d7ca977-0c10-4a5e-b941-b2da84cee22f","Content-Type":"application/json"}};function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==l(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===l(o)?o:String(o)),r)}var o}var f=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._config=e}var e,n;return e=t,(n=[{key:"isResponseOk",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"informResIsNotOk",value:function(t){console.error(t)}},{key:"getInitialData",value:function(){var t=this;return Promise.all([fetch("".concat(this._config.baseUrl,"/users/me"),{headers:this._config.headers}),fetch("".concat(this._config.baseUrl,"/cards"),{headers:this._config.headers})]).then((function(e){return Promise.all(e.map((function(e){return t.isResponseOk(e)})))}))}},{key:"setProfileData",value:function(t){var e=this;return fetch("".concat(this._config.baseUrl,"/users/me"),{method:"PATCH",headers:this._config.headers,body:JSON.stringify({name:t.name,about:t.about})}).then((function(t){return e.isResponseOk(t)}))}},{key:"postNewCard",value:function(t){var e=this;return fetch("".concat(this._config.baseUrl,"/cards"),{method:"POST",headers:this._config.headers,body:JSON.stringify({name:t.name,link:t.link})}).then((function(t){return e.isResponseOk(t)}))}},{key:"deleteCard",value:function(t){var e=this;return fetch("".concat(this._config.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:this._config.headers}).then((function(t){return e.isResponseOk(t)}))}},{key:"toggleLike",value:function(t,e){var n=this;return fetch("".concat(this._config.baseUrl,"/cards/likes/").concat(t),{method:e,headers:this._config.headers}).then((function(t){return n.isResponseOk(t)}))}},{key:"updateAvatar",value:function(t){var e=this;return fetch("".concat(this._config.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._config.headers,body:JSON.stringify({avatar:t})}).then((function(t){return e.isResponseOk(t)}))}}])&&s(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==p(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==p(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===p(o)?o:String(o)),r)}var o}var h=function(){function t(e,n){var r=e.formSelector,o=e.inputSelector,i=e.submitButtonSelector,u=e.inputErrorClass,a=n.formElement;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formSelector=r,this._inputSelector=o,this._submitButtonSelector=i,this._inputErrorClass=u,this._formElement=a,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}var e,n;return e=t,(n=[{key:"_showInputError",value:function(t,e){var n=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),n.textContent=e}},{key:"_hideInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),e.textContent=""}},{key:"_checkInputValidity",value:function(t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._buttonElement.setAttribute("disabled",""):this._buttonElement.removeAttribute("disabled","")}},{key:"togglePopupButtonState",value:function(){var t=this;this._inputList.forEach((function(e){t._hideInputError(e)})),this._toggleButtonState()}},{key:"_setEventListeners",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&y(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==m(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==m(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===m(o)?o:String(o)),r)}var o}var v=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_handleOverlayClose",value:function(t){t.target===t.currentTarget&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._popup.querySelector(".popup__close").addEventListener("click",(function(){return t.close()})),this._popup.addEventListener("mousedown",(function(e){return t._handleOverlayClose(e)}))}}])&&d(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function _(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==b(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===b(o)?o:String(o)),r)}var o}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=S(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},g.apply(this,arguments)}function S(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=O(t)););return t}function k(t,e){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},k(t,e)}function w(t,e){if(e&&("object"===b(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function O(t){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},O(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&k(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=O(r);if(o){var n=O(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return w(this,t)});function u(t,e){var n,r=e.handleSubmit;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._handleSubmit=r,n._submitButton=n._popup.querySelector(".popup__button"),n._submitButtonText=n._submitButton.textContent,n._inputList=Array.from(n._popup.querySelectorAll(".popup__item")),n._form=n._popup.querySelector(".popup__form"),n}return e=u,n=[{key:"renderLoading",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Создание...";this._submitButton.textContent=t?e:this._submitButtonText}},{key:"_getInputValues",value:function(){var t=this;return this._formValues={},this._inputList.forEach((function(e){t._formValues[e.name]=e.value})),this._formValues}},{key:"setEventListeners",value:function(){var t=this;g(O(u.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(e){e.preventDefault(),t._handleSubmit(t._getInputValues())}))}},{key:"close",value:function(){g(O(u.prototype),"close",this).call(this),this._form.reset()}}],n&&_(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(v);function C(t){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(t)}function P(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==C(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==C(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===C(o)?o:String(o)),r)}var o}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=L(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},j.apply(this,arguments)}function L(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=T(t)););return t}function I(t,e){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},I(t,e)}function R(t,e){if(e&&("object"===C(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function T(t){return T=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},T(t)}var B=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&I(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=T(r);if(o){var n=T(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return R(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._popupImgPhoto=document.querySelector(".popup-image__image"),e._popupImgName=document.querySelector(".popup-image__name"),e._popupImgOwner=document.querySelector(".popup-image__owner"),e}return e=u,(n=[{key:"open",value:function(t,e,n){this._popupImgPhoto.src=e,this._popupImgPhoto.alt=t,this._popupImgName.textContent=t,this._popupImgOwner.textContent=n,j(T(u.prototype),"open",this).call(this)}}])&&P(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(v);function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}function N(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==q(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===q(o)?o:String(o)),r)}var o}function x(){return x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=U(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},x.apply(this,arguments)}function U(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=M(t)););return t}function A(t,e){return A=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},A(t,e)}function D(t,e){if(e&&("object"===q(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return V(t)}function V(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function M(t){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},M(t)}var F=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&A(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=M(r);if(o){var n=M(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return D(this,t)});function u(t,e){var n,r=e.deleteCallback;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._deleteCallback=r,n._deleteFunction=n._deleteFunction.bind(V(n)),n._confirmButton=n._popup.querySelector(".popup__button"),n._confirmButtonText=n._confirmButton.textContent,n}return e=u,n=[{key:"_deleteFunction",value:function(){this._deleteCallback(this._card)}},{key:"renderLoading",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Удаление...";this._confirmButton.textContent=t?e:this._confirmButtonText}},{key:"open",value:function(t){x(M(u.prototype),"open",this).call(this),this._card=t,this._confirmButton.addEventListener("click",this._deleteFunction)}},{key:"close",value:function(){x(M(u.prototype),"close",this).call(this),this._confirmButton.removeEventListener("click",this._deleteFunction)}}],n&&N(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(v);function J(t){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},J(t)}function H(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==J(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==J(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===J(o)?o:String(o)),r)}var o}var z=function(){function t(e,n,r,o){var i=e.name,u=e.link,a=e.likes,c=e.owner,l=e._id,s=n.deleteCallback,f=n.likeCallback,p=n.handleCardClick,y=o.userId;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=i,this._link=u,this._likes=a,this._owner=c.name,this._isLiked=a.some((function(t){return t._id===y})),this._isMine=c._id===y,this._cardId=l,this._deleteCallback=s,this._likeCallback=f,this._handleCardClick=p,this._selector=r,this._activeClass="element__like_active"}var e,n;return e=t,(n=[{key:"_getElement",value:function(){return document.querySelector(this._selector).content.querySelector(".element").cloneNode(!0)}},{key:"_createCard",value:function(){return this._element=this._getElement(),this._photo=this._element.querySelector(".element__photo"),this._elementName=this._element.querySelector(".element__name"),this._deleteButton=this._element.querySelector(".element__delete"),this._likeButton=this._element.querySelector(".element__like"),this._likesNum=this._element.querySelector(".element__likes-number"),this._photo.src=this._link,this._photo.alt=this._name,this._elementName.textContent=this._name,this._setLikeCondition(),this._setEventListeners(),this._isMine||this._deleteButton.remove(),this._element}},{key:"_setLikeCondition",value:function(){this._isLiked?this._likeButton.classList.add(this._activeClass):this._likeButton.classList.remove(this._activeClass),this._likesNum.textContent=this._likes.length}},{key:"_toggleLike",value:function(){var t;t=this._isLiked?"DELETE":"PUT",this._likeCallback(this,t)}},{key:"changeLikeCondition",value:function(t){this._likes=t.likes,this._isLiked=!this._isLiked,this._setLikeCondition()}},{key:"_setEventListeners",value:function(){var t=this;this._deleteButton.addEventListener("click",(function(){t._deleteCallback(t)})),this._photo.addEventListener("click",(function(){t._handleCardClick(t._name,t._link,t._owner)})),this._likeButton.addEventListener("click",(function(){t._toggleLike()}))}},{key:"getCard",value:function(){return this._createCard()}},{key:"getCardId",value:function(){return this._cardId}},{key:"removeCard",value:function(){this._element.remove()}}])&&H(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function $(t){return $="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},$(t)}function G(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==$(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==$(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===$(o)?o:String(o)),r)}var o}var K=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.renderer=r,this.container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e.renderer(t)}))}},{key:"addItem",value:function(t){this.container.prepend(t)}},{key:"appendItem",value:function(t){this.container.append(t)}}])&&G(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function Q(t){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Q(t)}function W(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==Q(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==Q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===Q(o)?o:String(o)),r)}var o}var X=function(){function t(e){var n=e.nameSelector,r=e.aboutSelector,o=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._nameNode=document.querySelector(n),this._aboutNode=document.querySelector(r),this._avatarNode=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._name,about:this._about}}},{key:"getUserId",value:function(){return this._id}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about,r=t.avatar,o=t._id;this._name=e,this._about=n,this._avatar=r,this._id=o,this._nameNode.textContent=this._name,this._aboutNode.textContent=this._about,this._avatarNode.src=this._avatar}}])&&W(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function Y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var Z=new f(c),tt=new h(a,{formElement:document.querySelector(".popup__form[name=profile-data]")});tt.enableValidation();var et=new h(a,{formElement:document.querySelector(".popup__form[name=element-data]")});et.enableValidation();var nt=new h(a,{formElement:document.querySelector(".popup__form[name=avatar-link]")});nt.enableValidation();var rt=new E(".popup-profile",{handleSubmit:function(t){rt.renderLoading(!0,"Сохранение..."),Z.setProfileData(t).then((function(t){ct.setUserInfo(t),rt.close()})).catch((function(t){Z.informResIsNotOk(t)})).finally((function(){rt.renderLoading(!1,"Сохранение...")}))}});rt.setEventListeners();var ot=new E(".popup-element",{handleSubmit:function(t){ot.renderLoading(!0),Z.postNewCard(t).then((function(t){lt.addItem(st(t)),ot.close()})).catch((function(t){Z.informResIsNotOk(t)})).finally((function(){ot.renderLoading(!1)}))}});ot.setEventListeners();var it=new E(".popup-avatar",{handleSubmit:function(t){var e=t.link;it.renderLoading(!0),Z.updateAvatar(e).then((function(t){ct.setUserInfo(t),it.close()})).catch((function(t){return Z.informResIsNotOk(t)})).finally((function(){return it.renderLoading(!1)}))}});it.setEventListeners();var ut=new B(".popup-image");ut.setEventListeners();var at=new F(".popup-delete",{deleteCallback:function(t){at.renderLoading(!0),Z.deleteCard(t.getCardId()).then((function(){t.removeCard(),at.close()})).catch((function(t){return Z.informResIsNotOk(t)})).finally((function(){return at.renderLoading(!1)}))}});at.setEventListeners();var ct=new X({nameSelector:".profile__name",aboutSelector:".profile__about",avatarSelector:".profile__avatar"}),lt=new K({renderer:function(t){lt.appendItem(st(t))}},".elements__list"),st=function(t){return new z(t,{deleteCallback:function(t){at.open(t)},likeCallback:function(t,e){!function(t,e){Z.toggleLike(t.getCardId(),e).then((function(e){return t.changeLikeCondition(e)})).catch((function(t){return Z.informResIsNotOk(t)}))}(t,e)},handleCardClick:function(t,e,n){ut.open(t,e,n)}},".element__template",{userId:ct.getUserId()}).getCard()};t.addEventListener("click",(function(){var t=ct.getUserInfo();r.value=t.name,o.value=t.about,rt.open(),tt.togglePopupButtonState()})),e.addEventListener("click",(function(){ot.open(),et.togglePopupButtonState()})),i.addEventListener("click",(function(){it.open(),nt.togglePopupButtonState()})),Z.getInitialData().then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,u,a=[],c=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(a.push(r.value),a.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(e,n)||function(t,e){if(t){if("string"==typeof t)return Y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Y(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];ct.setUserInfo(o),console.log(i),lt.renderItems(i)})).catch((function(t){return Z.informResIsNotOk(t)})).finally((function(){u.style.visibility="hidden",u.style.opacity="0"}))})();