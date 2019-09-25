export class PlaceList {

    constructor(domElement) {
        this.list = [];
        this.domElement = domElement;
    }

    addCard(card) {
        this.list.push(card);
        this.domElement.appendChild(card.placeCardElement);
    }
}