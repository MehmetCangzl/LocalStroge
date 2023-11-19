const notyf = new Notyf({
    duration: 2000,
    position: {
        x: 'right',
        y: 'top',
    }
});

function navChange(id){
    let login = document.querySelector('#login');
    let register = document.querySelector('#register');
    let home = document.querySelector('#home');
    if (id === 'login') {
        login.classList.remove('hide');
        home.classList.add('hide');
        register.classList.add('hide');
    }
    if (id === 'register') {
        login.classList.add('hide');
        home.classList.add('hide');
        register.classList.remove('hide');
    }
    if (id === 'home') {
        login.classList.add('hide');
        register.classList.add('hide');
        home.classList.remove('hide');
    }
}

function login() {
    let userName = document.querySelector('#loginUser').value;
    let password = document.querySelector('#loginPass').value;
    let userData = JSON.parse(localStorage.getItem('Users'));
    if (userData && userData.length) {
        let userPresent = userData.some(user => user.username === userName && user.password === password)
        if (userPresent) {

            notyf.success('Eve Hoşgeldin!')           
            let loggedUser = JSON.stringify({ "username": userName, "password": password })
            localStorage.setItem('User', loggedUser);
            let msgSpan = document.querySelector('#msg');
            msgSpan.textContent = `Merhaba ${userName}, LocalStroge denemsine hoşgeldin.`;
            document.querySelector('nav').classList.add('hide');
            navChange('home')
        } else {
            notyf.error('Yanlış kullanıcı adı / şifre!')


        }
    } else {

        notyf.error('kullanıcı yok!')
    }
}


function register() {


    let userName = document.querySelector('#regUser').value;
    let email = document.querySelector('#regEmail').value;
    let password = document.querySelector('#regPass').value;
    let userList = JSON.parse(localStorage.getItem('Users'));
    let data = [];
    if (userList) {
        let notUnique = userList.some(user => (user.email == email || user.username == userName));
        if (notUnique) {
            notyf.error('kullanıcı adı ve e-posta benzersiz olmalıdır!')
            return;
        }
        data = JSON.stringify([...userList, { "username": userName, "email": email, "password": password }])
    } else {
        data = JSON.stringify([{ "username": userName, "email": email, "password": password }])

    }
    localStorage.setItem('Users', data)
    notyf.success('başarıyla kaydoldum!')
    navChange('login');
}

function logout() {
    localStorage.removeItem('User');
    document.querySelector('nav').classList.remove('hide');
    navChange('login')

}