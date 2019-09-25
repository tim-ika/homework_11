
import {Card} from './card.js';

export class CardList {

    constructor(container) {
        this.container = container;
    }

    loadInitialCards(cards) {
        cards.forEach((card) => { 
                this.addCard(card);
            });
    }

    addCard(card) {
        const place = new Card(card);
        this.container.appendChild(place.placeCardElement);
    }
}