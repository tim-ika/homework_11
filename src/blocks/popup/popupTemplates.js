import img from '../../images/close.svg';
console.log(img);


export const templates = {
        authorFormTemplate: `
        <div class="popup__content">
            <img src="${img}" alt="" class="popup__close">
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
             <img src="${img}" alt="" class="popup__close">
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
        <img src="${img}" alt="" class="popup__close">
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
            <img src="${img}" alt="" class="popup-image__close">
         </div>
        `
    }