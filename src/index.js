import "./style.css";

import {CardList} from "./cardList.js"
import {Popup} from "./popup.js"
import {Validator} from "./validator.js"
import {User} from "./user.js"
import {Api} from "./api.js"

console.log('Hello!');

const root = document.querySelector('.root');

const placesContainer = document.querySelector('.places-list');

const placesList = new CardList(placesContainer);
console.log(placesList);
const validator = new Validator();

const user = new User();

const config = {
    baseUrl: 'http://95.216.175.5/cohort2',
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


