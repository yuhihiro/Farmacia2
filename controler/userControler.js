class UserController {
    constructor() {
        this.addEventBtns();
        this.users = {}
    }

    addLine(user) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td class='table-icon'>${user.getId()}</td>
        <td class='table-icon'><img src='${user.getPhoto()}' alt='Ícone'></td>
        <td class='table-name'>${user.getName()}</td>
        <td class='table-email'>${user.getEmail()}</td>
        <td class='table-phone'>${user.getPhone()}</td>
        <td class='table-date'>${user.getDate()}</td>`;
        if (user.getAdmin()) {
            tr.innerHTML += `<td class='table-admin'>Sim</td>`
        } else {
            tr.innerHTML += `<td class='table-admin'>Não</td>`
        }
        tr.innerHTML += `
        <td class='table-actions'>
                    <span class="material-icons-sharp edit-btn">edit</span>
                    <span class="material-icons-sharp delete-btn">delete</span>
                </td>`;

        document.querySelector('.users tbody').appendChild(tr);
    }

    readPhoto(data) {
        return new Promise((resolve, reject) => {
            let fr = new FileReader();
            fr.addEventListener('load', (e) => {
                resolve(fr.result);
            });
            fr.addEventListener('error', (e) => {
                reject(e)
            })
            fr.readAsDataURL(data);
        })
    }

    register() {
        let formE1 = document.querySelector('.register');
        let elements = formE1.elements;
        let user;
        let registerData = {};
        [...elements].forEach((v) => {
            switch (v.type) {
                case 'checkbox':
                    registerData.adimin = v.checked
                    break;
                case 'file':

                    break;
                default:
                    registerData[v.name] = v.value
                    break;
            }
        })

        if (JSON.stringify(this.users) == JSON.stringify({})) {
            user = new User(0, registerData.name, '', registerData.photo, registerData.email, registerData.photo, registerData.
                adimin, registerData.password);
        } else {
            let lastUser = Object.value({ 'a': 'teste', 'b': 'teste2' })[Object.values({ 'a': 'teste', 'b': 'teste2' }).length - 1];
            user = new User(lastUser.getId() + 1, registerData.name, '', registerData.photo, registerData.email, registerData.photo, registerData.
                adimin, registerData.password);
        }
        let fileE1 = elements.photo;
        if (fileE1.files.length == 0) {
            user.setPhoto('img/icon.jpg');
            this.addLine(user)
            document.querySelector('form-add').style.display='none'
            formE1.reset()
        } else {
            this.readPhoto(elements.photo.files[0]).then((result) => {
                user.setPhoto(result)
                this.addLine(user)
                document.querySelector('form-add').style.display='none'
                formE1.reset()
            }, (e) => {
                console.error(e)
            })
        }
        this.addLine(user)
    }

    addEventBtns() {
        document.querySelector('.add').addEventListener('click', () => {
            document.querySelector('.form-add').style.display = 'flex'
        })
        document.querySelectorAll('.close')[0].addEventListener('click', () => {
            document.querySelector('.form-add').style.display = 'none'
        })
        document.querySelectorAll('.check')[0].addEventListener('click', () => {
            this.register();
        })
        document.querySelectorAll('.close')[1].addEventListener('click', () => {
            document.querySelector('.form-edit').style.display = 'none'
        })
    }
}