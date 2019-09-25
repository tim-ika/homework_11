export class User {

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