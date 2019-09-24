export class Validator {
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