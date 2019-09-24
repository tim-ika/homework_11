export class Api {
    constructor(config) {
      this.baseUrl = config.baseUrl;
      this.headers = config.headers;
    }

    async getResponseData(res) {
        if (res.ok) {
            return await res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async getInitialCards() {
        const res = await fetch(`${this.baseUrl}/cards`, { headers: this.headers });
        return this.getResponseData(res);
    }

    async getUserData() {
        const res = await fetch(`${this.baseUrl}/users/me`, { headers: this.headers });
        return this.getResponseData(res);
    }

    async setUserData(name, about) {
       /* Можно лучше: лучше не писать все в одну строку, слишком длинно, тяжело читается.
       При работе я обычно работаю с несколькими файлами разделив окно редактора вертикально,
       т.к. часто приходится переключаться между файлами. А когда можно видеть сразу два - позволяет
       меньше терять контекст.
       Так что стараюсь писать, чтобы длинная строк была не больше ширины 
       редактора http://prntscr.com/owv7jt */
       const res = await fetch(`${this.baseUrl}/users/me`, { method: 'PATCH', headers: this.headers, body: `{"name": "${name}", "about": "${about}"}` });
       return this.getResponseData(res);
    }

    async setUserAvatar(url) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, { method: 'PATCH', headers: this.headers, body: `{"avatar": "${url}"}` });
        return this.getResponseData(res);
    }

    async postNewCard(name, link) {
        const res = await fetch(`${this.baseUrl}/cards`, { method: 'POST', headers: this.headers, body: `{"name": "${name}", "link": "${link}"}` });
        return this.getResponseData(res);
    }

    async deleteCard(id) {
        await fetch(`${this.baseUrl}/cards/${id}`, { method: 'DELETE', headers: this.headers });
    }

    async likeCard(id) {
        const res = await fetch(`${this.baseUrl}/cards/like/${id}`, { method: 'PUT', headers: this.headers });
        return this.getResponseData(res);
    }

    async unLikeCard(id) {
        const res = await fetch(`${this.baseUrl}/cards/like/${id}`, { method: 'DELETE', headers: this.headers });
        return this.getResponseData(res);
    }
}