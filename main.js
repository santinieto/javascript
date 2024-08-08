/*******************************************************************************
** CLASES
*******************************************************************************/
class User {
    /* Constructor de la clase */
    constructor(name, lastname, age, tel, password) {
        this.name = capitalize(name)
        this.lastname = capitalize(lastname)
        this.age = Number(age)
        this.tel = Number(tel)
        this.password = password
        this.posts = []
        
        /* Genero el correo para el usuario */
        this.createUsername()
        
        /* Verifico si el usuario es mayor de edad o no */
        this.isAdult = this.checkAdultStatus()
    }
    
    /* Funciones o metodos de la clase */
    createUsername() {
        let arg1 = this.name.toLowerCase()[0]
        let arg2 = this.lastname.toLowerCase()
        this.username = `${arg1}${arg2}`
        let extension = 'hotmail'
        this.email = `${this.username}@${extension}.com`
    }
    
    checkAdultStatus() {
        return this.age >= 18
    }
    
}

class Post {
    /* Constructor de la clase */
    constructor(id, username, email, tel, content, img) {
        this.id = id
        this.username = username
        this.email = email
        this.tel = tel
        this.content = content
        this.date = new Date() /* Guarda la fecha como un objeto Date */
        this.img = img
    }
}

class IDGenerator {
    constructor(base){
        this.lastID = base
    }
    
    getNextID () {
        this.lastID += 1
        return this.lastID
    }
}

/*******************************************************************************
** UTILIDADES
*******************************************************************************/
function capitalize(str) {
    let mstring = String(str)
    if (mstring.length <= 0) {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getFormattedDate(date) {
    /* Si la fecha es un string, la convierto a formato fecha */
    if(typeof(date) === 'string') {
        date = new Date(date)
    }
    
    /* Obtener los componentes de la fecha y hora */
    const anio = date.getFullYear()
    const mes = date.getMonth() + 1 /* Los meses van de 0 a 11 */
    const dia = date.getDate()
    const horas = date.getHours()
    const minutos = date.getMinutes()
    const segundos = date.getSeconds()
    
    return `${anio}/${mes}/${dia} ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
}

function sortPosts(posts, property, dir) {
    /* Ordeno los posts por fecha */
    let arrayCopia = posts.map((el) => el)
    if(dir === 'asc') {
        return arrayCopia.sort((a,b) => {
            if(a[property] > b[property]) {
                return 1
            }
            else if(a[property] < b[property]) {
                return -1
            }
            else {
                return 0
            }
        })
    }
    else if(dir === 'desc') {
        return arrayCopia.sort((a,b) => {
            if(a[property] > b[property]) {
                return -1
            }
            else if(a[property] < b[property]) {
                return 1
            }
            else {
                return 0
            }
        })
    }
    else {
        return arrayCopia
    }
}

/* Estas funciones la creo solo para ejercitar el uso de funciones con
** parametros.
**/
function sumar(num1, num2) {
    if((typeof num1 !== 'number') || (typeof num2 !== 'number')) {
        console.log('Datos invalidos para la funcion sumar().')
        return 0
    }
    return num1 + num2
}

function restar(num1, num2) {
    if((typeof num1 !== 'number') || (typeof num2 !== 'number')) {
        console.log('Datos invalidos para la funcion restar().')
        return 0
    }
    return num1 - num2
}

function calcYearBirdth(age) {
    if(typeof age !== 'number') {
        age = Number(age)
    }
    thisYear = 2024
    return restar(thisYear, age)
}

/*******************************************************************************
** FUNCIONES
*******************************************************************************/
function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || []
    return users
}

function setJSONUsers(users) {
    let usersJSON = JSON.stringify(users)
    localStorage.setItem('users', usersJSON)
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || []
    return posts
}

function setJSONPosts(posts) {
    let postsJSON = JSON.stringify(posts)
    localStorage.setItem('posts', postsJSON)
}

function logIn() {
    /* Obtengo los datos de usuario y contraseña */
    let username = document.getElementById('login-username').value
    let password = document.getElementById('login-password').value
    
    /* Debug */
    // console.log(username)
    // console.log(password)
    
    /* Obtengo los usuarios desde el Local Storage */
    let users = loadUsers()
    
    /* Verifico que el usuario exista */
    let userExists = users.find(u => {
        return u.username === username
        && u.password === password
    })
    
    /* Si el usuario existe, verifico los datos */
    if(userExists) {
        /* Seteo el usuario actual en el local storage */
        let currentUserJSON = JSON.stringify(userExists)
        localStorage.setItem('currentUser', currentUserJSON)
        
        /* Muestro el mensaje de logeo exitoso */
        /* Lo saco porque es molesto */
        // alert(`Logeo exitoso!`)
        
        /* Actualizo la lista de posteos */
        updatePostsList(loadPosts())
        
        /* Voy a la pagina principal de posteos */
        showScreen('show-posts')
    }
    
    /* Muestro un mensaje de usuario o contraseña incorrectos */
    /* En este caso creo que vale la pena mostrar un alert */
    else {
        alert(`Nombre de usuario o contraseña incorrectos.`)
    }
}

function createUser() {
    /* En esta funcion voy a crear un usuario */
    
    /* Obtengo los datos desde el HTML */
    let name = document.getElementById('create-user-name').value
    let lastname = document.getElementById('create-user-lastname').value
    let age = document.getElementById('create-user-age').value
    let tel = document.getElementById('create-user-tel').value
    let password = document.getElementById('create-user-password').value
    
    /* Debug */
    // console.log(name)
    // console.log(lastname)
    // console.log(age)
    // console.log(tel)
    // console.log(password)
    
    /* Creo el objeto usuario */
    let user = new User(name, lastname, age, tel, password)
    
    /* Obtengo los usuarios desde el Local Storage */
    let users = loadUsers()
    
    /* Verifico que el usuario no exista */
    let userExists = users.find(u => u.username === user.username)
    
    /* Si el usuario ya existe largo un alert */
    if(userExists){
        alert(`El usuario [${user.username}] ya existe.`)
        
        /* El return me quedo de legado */
        return false
    }
    /* Si el usuario no existe lo agrego a la lista de usuarios */
    else {
        /* Agrego el usuario a la lista */
        users.push(user)
        
        /* Actualizo el Local Storage */
        setJSONUsers(users)
        
        /* Confirmo la creacion exitosa del usuario */
        alert(`Se ha creado el usuario [${user.username}] con exito.`)
        
        /* El return me quedo de legado */
        return true
    }
}

function createPost() {
    /* Obtengo el contenido del post */
    let postContent = document.getElementById('post-content').value
    let postImgSrc = document.getElementById('post-img').value
    
    /* NOTA: Se podria agregar contenido multimedia al post aca */
    
    /* Debug */
    // console.log(postContent)
    
    /* Obtengo el usuario actual */
    let user = JSON.parse(localStorage.getItem("currentUser"))
    
    /* Si no estoy logeado, no puedo crear un post */
    if(!user){
        alert('No se puede crear un post si no esta logeado.')
        return
    }
    
    /* Debug */
    // console.log(user)
    
    /* Si el usuario es menor de edad, no puede crear posts */
    if (!user.isAdult)
    {
        yearBirdth = calcYearBirdth(user.age)
        alert(
            `El usuario [${user.username}] no esta habilitado para crear posts ya que nacio en [${yearBirdth}].`
        )
        return
    }
    
    /* Obtengo la lista actual de posteos */
    let posts = loadPosts()
    
    /* Genero un indice para el post */
    let maxID
    if(posts.length > 0) {
        let maxPost = posts.reduce(function(prev, current) {
            return (prev && prev.id > current.id) ? prev : current
        })
        maxID = maxPost.id
    }
    else {
        maxID = 0
    }
    
    /* Debug */
    // console.log(maxID)
    
    /* Creo e objeto de tipo post */
    let post = new Post(maxID+1, user.username, user.email, user.tel, postContent, postImgSrc)
    
    /* Debug */
    // console.log(post)
    
    /* Agrego el post a la lista */
    posts.push(post)
    
    /* Actualizo el Local Storage */
    setJSONPosts(posts)
    
    /* Actualizo la lista de posteos */
    updatePostsList(posts)
}

function deletePosts() {
    /* Aca voy a borrar posteos */
    
    /* Obtengo el elemento HTML que necesito */
    let deleteIDs = document.getElementById('delete-ids').value
    
    /* Obtengo la lista de IDs a borrar */
    deleteIDs = deleteIDs.split(',')
    
    /* Obtengo la lista de posts actual */
    let posts = loadPosts()
    
    /* Tengo que verificar que los posts a borrar son el usuario logeado */
    /* Obtengo el usuario actual */
    let user = JSON.parse(localStorage.getItem("currentUser"))
    
    /* Si no estoy logeado, no puedo borrar posts */
    if(!user){
        alert('No se puede borrar posts si no esta logeado.')
        return
    }
    
    /* Si el post pertenece al usuario actual y ademas esta en la lista de IDs
    ** a borrar, entonces lo saco de la lista
    **/
    let filteredPosts = posts.filter((post) => {
        if(post.username === user.username
            && deleteIDs.includes( String(post.id) )) {
            return false
        }
        else {
            return true
        }
    })
    
    /* Aviso de que se borraron posts con exito */
    if(posts.length != filteredPosts.length){
        alert('Se borraron los posts con exito.')
    }
    
    /* Tendria que notificar sobre los posts que no se pudieron borrar */
    
    /* Actualizo el Local Storage */
    setJSONPosts(filteredPosts)
    
    /* Actualizo la lista de posteos */
    updatePostsList(filteredPosts)
    
    /* Voy a la pagina principal de posteos */
    showScreen('show-posts')
}

function deleteSinglePost(id) {
    /* Obtengo la lista de posteos */
    let posts = loadPosts()
    
    /* Debug */
    console.log(`Deleted post [${id}].`)
    
    /* Filtro */
    let filteredPosts = posts.filter((post) => post.id != Number(id))
    
    /* Actualizo el Local Storage */
    setJSONPosts(filteredPosts)
    
    /* Actualizo la lista de posteos */
    updatePostsList(filteredPosts)
    
    /* Voy a la pagina principal de posteos */
    showScreen('show-posts')
    
    return
}

function filterPosts(text) {
    /* Debug */
    // console.log(text)
    
    /* Paso todo a mayusculas */
    text = text.toUpperCase()
    
    /* Obtengo la lista de posteos */
    let posts = loadPosts()
    
    /* Me aseguro que los posts tienen su fecha en formato fecha */
    for (let index = 0; index < posts.length; index++) {
        let post = posts[index]
        post.date = new Date(post.date)
    }
    
    /* Me fijo si tengo que filtrar por ID */
    if(text.includes('ID:')) {
        /* Filtro los posts que necesito */
        const filteredPosts = posts.filter(
            (post) => post.id === Number(text.replace('ID:',''))
        )
        
        /* Actualizo la lista de posts */
        updatePostsList(filteredPosts)
    }
    
    /* Me fijo si tengo que filtrar por usuario */
    else if(text.includes('USER:')) {
        /* Filtro los posts que necesito */
        const userPosts = posts.filter(
            (post) => post.username.toUpperCase().includes(text.replace('USER:','').toUpperCase())
        )
        
        /* Actualizo la lista de posts */
        updatePostsList(userPosts)
    }
    
    /* Me fijo si tengo que filtrar por fecha */
    else if(text.includes('DATE:')) {
        
        /* Filtro la fecha */
        let date = text.replace('DATE:','')
        
        /* Obtengo los datos */
        let data = date.split('-')
        
        /* Codifico el dia, mes y anio */
        const year = Number(data[0])
        const month = Number(data[1])
        const day = Number(data[2])
        
        /* Filtro los posts que necesito */
        const filteredPosts = posts.filter((post) => {
            return post.date.getFullYear() === year &&
                    (post.date.getMonth() + 1) === month &&
                    post.date.getDate() === day
        })
        
        /* Actualizo la lista de posts */
        updatePostsList(filteredPosts)
    }
    
    /* Si no, filtro por contenido */
    else {
        /* Filtro los posts que necesito */
        const filteredPosts = posts.filter(
            (post) => post.content.toUpperCase().includes(text.toUpperCase())
        )
        
        /* Actualizo la lista de posts */
        updatePostsList(filteredPosts)
    }
    
}

function updatePostsList(posts) {
    /* Funcion para mostrar los posts en pantalla */
    
    /* Cargo el usuario actual */
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    
    /* Busco el elemento HTML que contiene la lista de posts */
    let postsListContainer = document.getElementsByClassName('post__list')[0]
    
    /* Ordeno los posts por fecha */
    let sortedPosts = sortPosts(posts, 'date', 'desc')
    
    /* Obtengo la lista de usuarios */
    let users = loadUsers()
    
    /* Muestro el elemento HTML actual en consola */
    // console.dir(postsListContainer)
    
    /* Borro el contenido HTML interno */
    postsListContainer.innerHTML = ''
    
    /* Asigno el nuevo contenido HTML */
    sortedPosts.forEach( post => {
        const user = users.filter(user => user.username === post.username)[0]
        
        postsListContainer.innerHTML += `
        <li class="post__list__item">
            <div class="post__list__item__user">
                <h3>(${post.id}) ${user.name} ${user.lastname}</h3>
                ${currentUser.username == user.username ? `<button class="post__list__item__delete" id="delete-post-${post.id}">Borrar post</button>` : '' }
            </div>
            <div class="post__list__item__content">
                <p>${post.content}</p>
                ${post.img ? `<img src="${post.img}" class="post__list__item__image alt="Post Image">` : ''}
            </div>
            <div class="post__list__item__date">
                <p>${getFormattedDate(post.date)}</p>
            </div>
        </li>
        `
    })

    /* Asigno la función al botón de borrar */
    /* En principio quise hacer esto con getElementById pero internet dice
    ** que es mejor usar querySelector porque selecciona con ID puede tener
    ** fallas si el DOM todavia no termino de cargar.
    **/
    sortedPosts.forEach(post => {
        let deletePostBtn = document.querySelector(`#delete-post-${post.id}`);
        if (deletePostBtn) {
            deletePostBtn.addEventListener('click', () => deleteSinglePost(post.id));
        }
    });
}

/*******************************************************************************
** SELECTOR DE PANTALLAS
*******************************************************************************/
function showScreen(screen) {
    /* Obtengo los elementos HTML */
    let navBar = document.getElementsByClassName('nav-bar')[0]
    let logInDiv = document.getElementById('login-div')
    let createUserdiv = document.getElementById('create-user-div')
    let postsDiv = document.getElementById('posts-div')
    let createPostdiv = document.getElementById('create-post-div')
    let deletePostsDiv = document.getElementById('delete-post-div')
    
    /* Guardo esos elementos en un array */
    divs = [
        navBar,
        logInDiv,
        createUserdiv,
        postsDiv,
        createPostdiv,
        deletePostsDiv
    ]
    
    /* Oculto todos los elementos */
    divs.forEach(div => {
        div.classList.add('hidden')
    })
    
    /* Muestro lo que corresponda segun la pantalla */
    if(screen === 'login') {
        logInDiv.classList.remove('hidden')
    }
    else if(screen === 'create-user') {
        createUserdiv.classList.remove('hidden')
    }
    else if(screen === 'show-posts') {
        navBar.classList.remove('hidden')
        postsDiv.classList.remove('hidden')
    }
    else if(screen === 'create-post') {
        navBar.classList.remove('hidden')
        createPostdiv.classList.remove('hidden')
    }
    else if(screen === 'delete-post') {
        navBar.classList.remove('hidden')
        deletePostsDiv.classList.remove('hidden')
    }
}

/*******************************************************************************
** GENERAR DATOS DE PRUEBA
*******************************************************************************/
function generateTestData() {
    /* Genero usuarios de prueba */
    test_users = [
        {name: 'Admin',    surname: 'Admin',     age: 99, tel: 9999999999, password: 'admin'},
        {name: 'Santiago', surname: 'Nieto',     age: 29, tel: 3512647957, password: '12345678'},
        {name: 'Juan',     surname: 'Perez',     age: 22, tel: 1234567089, password: '12345678'},
        {name: 'Pedro',    surname: 'Rodriguez', age: 12, tel: 2345067890, password: '12345678'},
        {name: 'Lara',     surname: 'Suarez',    age: 15, tel: 3405678901, password: '12345678'},
        {name: 'Ana',      surname: 'Lopez',     age: 25, tel: 4567891203, password: '12345678'},
    ]
    
    let users = []
    for (let index = 0; index < test_users.length; index++) {
        const element = test_users[index]
        
        /* Creo el usuario */
        let user = new User(element.name, element.surname, element.age, element.tel, element.password)
        
        /* Agrego el usuario a la base de datos*/
        if (user) {
            users.push(user)
        }
        
    }
    
    /* Genero mensajes de prueba */
    test_posts = [
        {id: 1000, username: 'snieto',  email: 'snieto@hotmail.com', tel: 3512647957, content: 'Mensaje de prueba 1', img: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', date: '2024-01-01T10:06:20'},
        {id: 1001, username: 'jperez',  email: 'jperez@hotmail.com', tel: 1234567089, content: 'Mensaje de prueba 2', img: '', date: '2024-03-21T11:03:10'},
        {id: 1002, username: 'snieto',  email: 'nieto@hotmail.com',  tel: 3512647957, content: 'Mensaje de prueba 3', img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', date: '2024-08-08T12:44:00'},
        {id: 1003, username: 'alopez',  email: 'alopez@hotmail.com', tel: 3405678901, content: 'Mensaje de prueba 4', img: '', date: '2024-07-25T17:00:10'},
        {id: 1004, username: 'alopez',  email: 'alopez@hotmail.com', tel: 4567891203, content: 'Mensaje de prueba 5', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', date: '2024-01-01T20:35:56'},
    ]
    
    let posts = []
    for (let index = 0; index < test_posts.length; index++) {
        const element = test_posts[index]
        
        /* Creo el usuario */
        let post = new Post(element.id, element.username, element.email, element.tel, element.content, element.img)
        
        /* Asigno la fecha personalizada al mensaje */
        /* NOTA: Busque en Google como hacer esto */
        post.date = new Date(element.date)
        
        /* Agrego el usuario a la base de datos*/
        if (post) {
            posts.push(post)
        }
        
    }
    
    /* Actualizo el Local Storage */
    setJSONUsers(users)
    setJSONPosts(posts)
    
    /* Mensaje de debug */
    alert('Datos de prueba generados correctamente.')
    
}

/*******************************************************************************
** GESTOR DE EVENTOS
*******************************************************************************/
function addEvents() {
    /* El boton de home muestra la lista de posteos general */
    let homeButton = document.getElementById('home-btn')
    homeButton.addEventListener('click', (e) => {
        e.preventDefault()
        updatePostsList(loadPosts())
        showScreen('show-posts')
    })
    
    let createUserButton = document.getElementById('create-user-btn')
    createUserButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('create-user')
    })
    
    let loginButton = document.getElementById('login-btn')
    loginButton.addEventListener('click', (e) => {
        e.preventDefault()
        logIn()
    })
    
    let loginUsernameText = document.getElementById('login-username')
    loginUsernameText.addEventListener('keypress', (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault()
            logIn()
        }
    })
    
    let loginPasswordText = document.getElementById('login-password')
    loginPasswordText.addEventListener('keypress', (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault()
            logIn()
        }
    })
    
    let cancelButton = document.getElementById('cancel-create-user-btn')
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('login')
    })
    
    let confirmCreateUserButton = document.getElementById('confirm-create-user-btn')
    confirmCreateUserButton.addEventListener('click', (e) => {
        e.preventDefault()
        if(createUser()){
            showScreen('login')
        }
        else {
            showScreen('create-user')
        }
    })
    
    let createUserPasswordText = document.getElementById('create-user-password')
    createUserPasswordText.addEventListener('keypress', (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault()
            if(createUser()){
                showScreen('login')
            }
            else {
                showScreen('create-user')
            }
        }
    })
    
    let clearLocalStorageButton = document.getElementById('clear-local-storage-btn')
    clearLocalStorageButton.addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.clear()
        alert('Datos borrados del Local Storage.')
        showScreen('login')
    })
    
    let logOutButton = document.getElementById('logout-btn')
    logOutButton.addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.removeItem('currentUser')
        showScreen('login')
    })
    
    let createPostButton = document.getElementById('create-post-btn')
    createPostButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('create-post')
    })
    
    let cancelCreatePostButton = document.getElementById('cancel-create-post-btn')
    cancelCreatePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('show-posts')
    })
    
    let confirmCreatePostButton = document.getElementById('confirm-create-post-btn')
    confirmCreatePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        createPost()
        showScreen('show-posts')
    })
    
    let deletePostButton = document.getElementById('delete-post-btn')
    deletePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('delete-post')
    })
    
    let cancelDeletePostButton = document.getElementById('cancel-delete-post-btn')
    cancelDeletePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('show-posts')
    })
    
    let confirmDeletePostButton = document.getElementById('confirm-delete-post-btn')
    confirmDeletePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        deletePosts()
        showScreen('show-posts')
    })
    
    let searchBar = document.getElementsByClassName('nav-bar__search')[0]
    searchBar.addEventListener('input', () => {
        filterPosts(searchBar.value)
        showScreen('show-posts')
    })
    
    let createTestDataButton = document.getElementById('create-test-data-btn')
    createTestDataButton.addEventListener('click', () => {
        generateTestData()
        showScreen('login')
    })
}

/*******************************************************************************
** FUNCION PRINCIPAL
*******************************************************************************/
function main() {
    addEvents()
    showScreen('login')
}
main()