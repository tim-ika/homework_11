class Card {

    myId = '2eb42d1f43b254fd8a76e373';

    constructor(card) {
        this.name = card.name;
        this.link = card.link;
        this.likes = card.likes.length;
        this.like = card.likes.some((user) => { return user._id === this.myId });
        this.owner = card.owner;
        this.id = card._id;
        this.placeCardElement = this.createCardElement(this.name, this.link, this.likes, this.id);
        this.placeCardElement.addEventListener('click', this.delegate.bind(this));
    }

    createCardElement(name, link, likes, id) {
        const element = function(elm, cls) { 
                const element = document.createElement(elm);
                element.classList.add(cls);
                return element;
            ;}
      
        const card = element('div', 'place-card');
        const cardImage = element('div', 'place-card__image');
        const cardDeleteButton = element('button', 'place-card__delete-icon');
        const cardDescription = element('div', 'place-card__description');
        const cardName = element('h3', 'place-card__name');
        const cardLikeContainer = element('div', 'place-card__like-container');
        const cardLikeButton = element('button', 'place-card__like-icon');
        const cardCounterLike = element('h4', 'counter');
        
        card.setAttribute('id', `${id}`);
        cardImage.setAttribute('style', `background-image: url(${link})`);
        cardName.textContent = name;
        cardCounterLike.textContent = likes;

        cardImage.appendChild(cardDeleteButton);

        if(this.like) {
            cardLikeButton.classList.add('place-card__like-icon_liked');
        }
        if(this.owner._id == this.myId) {
            cardDeleteButton.style.display = 'block';
        }
        card.appendChild(cardImage);
        cardDescription.appendChild(cardName);
        cardLikeContainer.appendChild(cardLikeButton);
        cardLikeContainer.appendChild(cardCounterLike);
        cardDescription.appendChild(cardLikeContainer);
        card.appendChild(cardDescription);

        return card;
    }

    delegate(event) {
        const targetCL = event.target.classList;

        if (targetCL.contains('place-card__delete-icon')) {
            this.delete();
        }

        if (targetCL.contains('place-card__image')) {
            this.openInPopup(event);
        }
    }

    delete() {
        this.placeCardElement.remove();
    }

    openInPopup(event) {
        const popup = new Popup();
        popup.show(event, this);
    }
}

class CardList {

    constructor(container) {
        this.container = container;
        this.cardList = [];
    }

    loadInitialCards(cards) {
        cards.forEach((card) => { 
                this.addCard(card);
                
            });
    }

    addCard(card) {
        const cardElement = new Card(card);
        this.cardList.push(cardElement);
        this.container.appendChild(cardElement.placeCardElement);
    }
}

class Popup {

    templates = {
        authorFormTemplate: `
        <div class="popup__content">
            <img src="./images/close.svg" alt="" class="popup__close">
            <h3 class="popup__title">Редактировать профиль</h3>
            <form class="popup__form" name="edit">
                <div class="input-container">
                    <input type="text" name="name" class="popup__input popup__input_type_name" placeholder=" ">
                    <div class="error-message error-message_name"></div>
                </div>
                <div class="input-container">
                    <input type="text" name="about" class="popup__input popup__input_type_about" placeholder=" ">
                    <div class="error-message error-message_job"></div>
                </div>
                <button type="submit" name="save" class="button popup__button">Сохранить</button>
            </form>
        </div>
        `,
        avatarFormTemplate: `
        <div class="popup__content">
            <img src="./images/close.svg" alt="" class="popup__close">
            <h3 class="popup__title">Обновить аватар</h3>
            <form class="popup__form" name="avatar">
                <div class="input-container">
                    <input type="text" name="link" class="popup__input popup__input_type_link-url" placeholder="Ссылка на аватар">
                    <div class="error-message error-message_link"></div>
                </div>
                <button type="submit" name="save" class="button popup__button">Сохранить</button>
            </form>
        </div>
        `,
        placeFormTemplate: `
        <div class="popup__content">
        <img src="./images/close.svg" alt="" class="popup__close">  
        <h3 class="popup__title">Новое место</h3>
        <form class="popup__form" name="new">
            <div class="input-container">
                <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Название">
                <div class="error-message error-message_place"></div>
            </div>
            <div class="input-container">
                <input type="text" name="link" class="popup__input popup__input_type_link-url"
            placeholder="Ссылка на картинку">
                <div class="error-message error-message_link"></div>
            </div>
        <button type="submit" name="save" class="button popup__button">+</button>
        </form>
        </div>
        `,
        imageTemplate: `
        <div class="popup-image__content">
            <img src="./images/close.svg" alt="" class="popup-image__close">
         </div>
        `
    }

    create() {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        return popup;
    }

    show(event, object) {
        
        const root = document.querySelector('.root');

        this.popupElement = this.create();
        this.popupElement.addEventListener('click', this.close.bind(this));

        if (event.target.classList.contains('user-info__edit')) {
            this.popupElement.insertAdjacentHTML('beforeend', this.templates.authorFormTemplate)
            this.popupElement.classList.add('popup_is-opened');
            root.appendChild(this.popupElement);

            const form = document.forms.edit;
            const { name, about } = form.elements;

            name.value = object.name;
            about.value = object.about;
        }

        if (event.target.classList.contains('user-info__button')) {
            this.popupElement.insertAdjacentHTML('beforeend', this.templates.placeFormTemplate)
            this.popupElement.classList.add('popup_is-opened');
            root.appendChild(this.popupElement);

            const form = document.forms.new;
            form.elements.save.disabled = true;
        }

        if (event.target.classList.contains('place-card__image')) {
            this.popupElement.insertAdjacentHTML('beforeend', this.templates.imageTemplate);
            const img = document.createElement('img');
            const popupImageContent = this.popupElement.querySelector('.popup-image__content');

            img.classList.add('popup-image__image');
            img.src = object.link;

            popupImageContent.appendChild(img);
            this.popupElement.classList.add('popup_is-opened');
            root.appendChild(this.popupElement);
        }

        if (event.target.classList.contains('user-info__photo')) {
            this.popupElement.insertAdjacentHTML('beforeend', this.templates.avatarFormTemplate)
            this.popupElement.classList.add('popup_is-opened');
            root.appendChild(this.popupElement);

            const form = document.forms.avatar;
            form.elements.save.disabled = true;
        }
    }

    close(event) {
        const targetCL = event.target.classList;

        if (targetCL.contains('popup__close') || targetCL.contains('popup-image__close')) {
            this.popupElement.remove();
        }
    }
}

class Validator {
    fieldValidate(field) {
        event.preventDefault();

        const fieldValue = field.value;

        if (fieldValue == '') {
            field.nextElementSibling.textContent = 'Это поле обязательно';
            return false;
        }

        if (field.getAttribute('name') == 'link' && !fieldValue.startsWith('https://')) {
            field.nextElementSibling.textContent = 'Здесь должна быть ссылка';
            return false;
        }

        if (fieldValue.length == 1 || (fieldValue.length > 30 && !field.getAttribute('name') == 'link')) {
            field.nextElementSibling.textContent = 'Должно быть от 2 до 30 символов';
            return false;
        }

        field.nextElementSibling.textContent = '';
        return true;
    }

    validateForm(form) {
        event.preventDefault();
        const valid = Array.from(form.elements).filter((item) => !item.classList.contains('popup__button')).every((field) => this.fieldValidate(field));

        return valid;
    }

}

class User {

    create(userData) {
        this.name = userData.name;
        this.about = userData.about;
        this.avatar = userData.avatar;
        this.id = userData._id;
        this.cohort = userData.cohort;

        this.renderUser();
        
    }

    renderUser() {
        const name = document.querySelector('.user-info__name');
        const about = document.querySelector('.user-info__job');
        const avatar = document.querySelector('.user-info__photo');
        name.textContent = this.name;
        about.textContent = this.about;
        avatar.setAttribute('style', `background-image: url(${this.avatar})`);
    }

    editUserInfo(name, about) {
        this.name = name;
        this.about = about;
    }

    editUserAvatar(link) {
        this.avatar = link;
    }

    getUser() {
        return this;
    }
}

class Api {
    constructor(config) {
      this.baseUrl = config.baseUrl;
      this.headers = config.headers;
    }

    async getResponseData(res) {
        if (res.ok) {
            return await res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async getInitialCards() {
        const res = await fetch(`${this.baseUrl}/cards`, { headers: this.headers });
        return this.getResponseData(res);
    }

    async getUserData() {
        const res = await fetch(`${this.baseUrl}/users/me`, { headers: this.headers });
        return this.getResponseData(res);
    }

    async setUserData(name, about) {
       /* Можно лучше: лучше не писать все в одну строку, слишком длинно, тяжело читается.
       При работе я обычно работаю с несколькими файлами разделив окно редактора вертикально,
       т.к. часто приходится переключаться между файлами. А когда можно видеть сразу два - позволяет
       меньше терять контекст.
       Так что стараюсь писать, чтобы длинная строк была не больше ширины 
       редактора http://prntscr.com/owv7jt */
       const res = await fetch(`${this.baseUrl}/users/me`, { method: 'PATCH', headers: this.headers, body: `{"name": "${name}", "about": "${about}"}` });
       return this.getResponseData(res);
    }

    async setUserAvatar(url) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, { method: 'PATCH', headers: this.headers, body: `{"avatar": "${url}"}` });
        return this.getResponseData(res);
    }

    async postNewCard(name, link) {
        const res = await fetch(`${this.baseUrl}/cards`, { method: 'POST', headers: this.headers, body: `{"name": "${name}", "link": "${link}"}` });
        return this.getResponseData(res);
    }

    async deleteCard(id) {
        await fetch(`${this.baseUrl}/cards/${id}`, { method: 'DELETE', headers: this.headers });
    }

    async likeCard(id) {
        const res = await fetch(`${this.baseUrl}/cards/like/${id}`, { method: 'PUT', headers: this.headers });
        return this.getResponseData(res);
    }

    async unLikeCard(id) {
        const res = await fetch(`${this.baseUrl}/cards/like/${id}`, { method: 'DELETE', headers: this.headers });
        return this.getResponseData(res);
    }
}
  
const userInfo = document.querySelector('.user-info');
const root = document.querySelector('.root');
const placesContainer = document.querySelector('.places-list');

const placesList = new CardList(placesContainer);
const validator = new Validator();

const config = {
    baseUrl: 'http://95.216.175.5/cohort2',
    headers: {
      authorization: '1f0edc3a-b0f8-423d-a488-e6cdea7d5c7e',
      'Content-Type': 'application/json'
    }
  }

const api = new Api(config);
const user = new User();

/*
  Можно лучше: не обратил внимание в предыдущем ревью, но методы класса api объявлены
   как async, но работа с ними ведется как с обычными промисами.

  Можно использовать синтаксис async/await до конца и писать так:
  
  //создаем async функцию т.к. await не может выполняться глобально, только внутри async функций
  async getUserData() { 
    try{
        const userData = await api.getUserData(); 
        user.create(userData)
    } catch (err) {
        console.log(err);
    }
  }

  getUserData()
*/


api.getUserData()
    .then(userData => user.create(userData))
    .catch(err => console.log(err));

api.getInitialCards()
    .then(cards => placesList.loadInitialCards(cards))
    .catch(err => console.log(err));

root.addEventListener('click', function (event) {
    if(event.target.closest('.user-info')) {
        const popup = new Popup();
        popup.show(event, user);
    }

    if(event.target.classList.contains('place-card__delete-icon')) {
        const card = event.target.closest('.place-card');
        if (window.confirm("Вы действительно хотите удалить карточку?")) { 
            api.deleteCard(card.getAttribute('id'))
                .then(() => card.remove())
                .catch(err => console.log(err));
          }
    }

    if(event.target.classList.contains('place-card__like-icon')) {
        const card = event.target.closest('.place-card');
        const counter = card.querySelector('.counter');
        const cardId = card.getAttribute('id');
        
        if(!event.target.classList.contains('place-card__like-icon_liked')) {
            api.likeCard(cardId)
                .then((res) => {
                    event.target.classList.toggle('place-card__like-icon_liked');
                    counter.textContent = res.likes.length;
                 })
                .catch(err => console.log(err));
        } else {
            api.unLikeCard(cardId)
                .then((res) => {
                    event.target.classList.toggle('place-card__like-icon_liked');
                    counter.textContent = res.likes.length;
                })
                .catch(err => console.log(err));
        }
    }
});

root.addEventListener('input', (event) => {
    const form = event.target.closest('.popup__form');
    form.elements.save.disabled = !validator.validateForm(form);
});

root.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target.closest('.popup__form');
    const popup = document.querySelector('.popup');

    if (form.getAttribute('name') == 'edit') {
        const { name, about } = form.elements;
        
        api.setUserData(name.value, about.value)
            .then(() => {
                user.editUserInfo(name.value, about.value);
                user.renderUser();
                popup.remove();
            })
            .catch(err => console.log(err));
    }

    if (form.getAttribute('name') == 'avatar') {
        
        const { link } = form.elements;

        api.setUserAvatar(link.value)
            .then(() => { 
                user.editUserAvatar(link.value);
                user.renderUser();
                popup.remove(); 
        })
        .catch(err => console.log(err));
        popup.remove();
    }

    if (form.getAttribute('name') == 'new') {
       
        const { name, link } = form.elements;
        api.postNewCard(name.value, link.value)
            .then((card) => { 
                placesList.addCard(card);
                popup.remove(); 
            })
            .catch(err => console.log(err));
    }
});

//Привет! Не все пункты сделал.
//Нужно поправить комментарии с прошлого спринта.
//И обработать возможные ошибки.
//Во второй итерции сделаю всё сразу с вашими замечаниями.
//:)

/*
    Привет!
    Отлично, что в классе Api нет ничего лишнего - только обращение к серверу, а также что
    использованы операторы async await.

    Но в работе нужно поправить:
    - необходима проверка, что запрос выполнился успешно (res.ok)
    - все изменения на странице должны происходить только после ответа сервера
    - нужна обработка ошибок при взаимодействии с сервером - блок catch в конце цепочки then

    Жду работу на вторую итерацию ;)

*/

//Привет! Вторая итерация :))

/*
    Привет. Теперь все сделано и работает отлично, задание выполнено полностью.

    Для обращения к методам класса Api тоже можно было воспользоваться await
    На всякий случай вот пара сыылок по async/await
    https://learn.javascript.ru/async-await
    https://habr.com/ru/company/ruvds/blog/414373/

    Успехов Вам в дальнейшем обучении!
*/