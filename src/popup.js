import {templates} from './formTemplates.js';

export class Popup {
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
            this.popupElement.insertAdjacentHTML('beforeend', templates.authorFormTemplate);
            this.popupElement.classList.add('popup_is-opened');
            root.appendChild(this.popupElement);

            const form = document.forms.edit;
            const { name, about } = form.elements;

            name.value = object.name;
            about.value = object.about;
        }

        if (event.target.classList.contains('user-info__button')) {
            this.popupElement.insertAdjacentHTML('beforeend', templates.placeFormTemplate)
            this.popupElement.classList.add('popup_is-opened');
            root.appendChild(this.popupElement);

            const form = document.forms.new;
            form.elements.save.disabled = true;
        }

        if (event.target.classList.contains('place-card__image')) {
            this.popupElement.insertAdjacentHTML('beforeend', templates.imageTemplate);
            const img = document.createElement('img');
            const popupImageContent = this.popupElement.querySelector('.popup-image__content');

            img.classList.add('popup-image__image');
            img.src = object.link;

            popupImageContent.appendChild(img);
            this.popupElement.classList.add('popup_is-opened');
            root.appendChild(this.popupElement);
        }

        if (event.target.classList.contains('user-info__photo')) {
            this.popupElement.insertAdjacentHTML('beforeend', templates.avatarFormTemplate)
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