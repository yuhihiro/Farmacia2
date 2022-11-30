class User {
    constructor(id, name, photo, email, phone, admim, password) {
        this._id = id
        this._name = name
        this._photo = photo
        this._email = email
        this._admin = admim
        this._password = password
        let date = new Date()
        this._date = date.toLocaleDateString('pt-BR') + '  ' + date.toLocaleTimeString('pt-BR').slice(0, 5)
    }
    getId() {
        return this._id;
    }
    getName() {
        return this._name;
    }
    getPhoto() {
        return this._photo;
    }
    getEmail() {
        return this._email;
    }
    getPhone() {
        return this._photo;
    }
    getAdmin() {
        return this._admin;
    }
    getPassword(password) {
        if (password === 'Senha do Moderador') {
            return this._password;
        } else {
            return 'Senha se Moderador Incorreta'
        }

    }
    getDate() {
        return this._date;
    }
}