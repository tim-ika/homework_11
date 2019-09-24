
import {Card} from './card.js';

export class CardList {

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