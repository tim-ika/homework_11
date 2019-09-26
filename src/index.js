import {Api} from "./vendor/api.js";
import {PlaceList} from "./blocks/places-list/placeList.js";
import {Popup} from "./blocks/popup/popup.js";
import {Validator} from "./vendor/validator.js";
import {User} from "./blocks/user-info/user.js";
import {PlaceCard} from "./blocks/place-card/placeCard.js";

import likeActive from './images/like-active.svg';
import likeInActive from './images/like-inactive.svg';
import deleteIcon from './images/trash-icon.svg'

import "./blocks/button/button.css";
import "./blocks/counter/counter.css";
import "./blocks/error-message/error-message.css";
import "./blocks/header/header.css";
import "./blocks/input-container/input-container.css";
import "./blocks/logo/logo.css";
import "./blocks/place-card/place-card.css";
import "./blocks/places-list/places-list.css";
import "./blocks/popup/popup.css";
import "./blocks/popup-edit/popup-edit.css";
import "./blocks/popup-image/popup-image.css";
import "./blocks/profile/profile.css";
import "./blocks/root/root.css";
import "./blocks/user-info/user-info.css";
import "./vendor/fonts.css";
import "./vendor/normalize.css";

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';
const root = document.querySelector('.root');
const placesList = new PlaceList(document.querySelector('.places-list'));
const validator = new Validator();
const user = new User();

const config = {
    baseUrl: serverUrl,
    headers: {
      authorization: '1f0edc3a-b0f8-423d-a488-e6cdea7d5c7e',
      'Content-Type': 'application/json'
    }
  }
const api = new Api(config);

api.getUserData()
    .then(userData => user.create(userData))
    .catch(err => console.log(err));

api.getInitialCards()
    .then(cards => {
        cards.forEach((card) => { 
            placesList.addCard(new PlaceCard(card));
        });
    })
    .catch(err => console.log(err));

root.addEventListener('click', function (event) {
    if(event.target.closest('.user-info')) {
        const popup = new Popup();
        popup.show(event, user);
    }

    if(event.target.closest('.place-card__image')) {
        const popup = new Popup();
        
        const place = event.target.closest('.place-card');
        const item = placesList.list.find(item => item.id == place.id);
        
        popup.show(event, item);
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
                const place = new PlaceCard(card);
                placesList.addCard(place);
                popup.remove(); 
            })
            .catch(err => console.log(err));
    }
});


