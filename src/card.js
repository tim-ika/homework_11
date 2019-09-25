import {Popup} from  './popup.js';

const myId = '2eb42d1f43b254fd8a76e373';

export class Card {
    constructor(card) {
        this.name = card.name;
        this.link = card.link;
        this.likes = card.likes.length;
        this.like = card.likes.some((user) => { return user._id === myId });
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
        if(this.owner._id == myId) {
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