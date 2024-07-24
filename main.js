
/*******************************************************************************
** Comentarios:
** 1. Mi objetivo final con esta pre entrega es poder generar un sistema similar
**    a una red social en la cual los usuario puedan crear posts.
** 2. Agregue nuevas funciones al menu.
** 3. Lo que antes eran mensajes de usuarios ahora son posteos.
** 4. Los posts generados se pueden filtrar por usuario y por fecha.
** 5. Los postos SIEMPRE se muestran desde el mas reciente en orden descendente.
**    - Los ordeno cuando los muestros, el array original se mantiene tal cual.
** 6. Se agrego la funcionalidad para crear datos de prueba y omitr la parte
**    que fue expuesta en la primer pre entrega.
** 7. Se agregaron funciones de utilidad tales como filtros, metodos de
**    ordenamiento, generadores de IDs, etc.
** 9. Se agrego un breve contenido HTML para mostrar los posteos cuando los
**    usuarios finalizan el ciclo while principal de la aplicacion.
**
** Trabajo futuro:
** 1. Implementar funciones para editar posteos.
** 2. Mostrar el nombre de la persona en lugar del nombre de usuario cuando voy
**    a generar el contenido HTML.
** 3. Agregar imagenes a los objetos tipo post y mostrarlas.
*******************************************************************************/

/*******************************************************************************
** Variables globables
** NOTA: En clase comentaron que NO era una buena practica tener variables
**       globales. Voy a intentar dejar este espacio vacio
*******************************************************************************/

/*******************************************************************************
** Clases
*******************************************************************************/
class IDGenerator {
    constructor(base){
        this.last_id = base
    }
    
    get_next_id () {
        this.last_id += 1
        return this.last_id
    }
}

class User {
    /* Constructor de la clase */
    constructor(name, lastname, age, tel) {
        this.name = capitalize(name)
        this.lastname = capitalize(lastname)
        this.age = age
        this.tel = tel
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
    constructor(id, username, email, tel, content) {
        this.id = id
        this.username = username
        this.email = email
        this.tel = tel
        this.content = content
        this.date = new Date(); // Guarda la fecha como un objeto Date
    }
}

/*******************************************************************************
** Utilidades
*******************************************************************************/
function capitalize(str) {
    let mstring = String(str)
    if (mstring.length <= 0) {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function get_formatted_date(date) {
    // Obtener los componentes de la fecha y hora
    const anio = date.getFullYear();
    const mes = date.getMonth() + 1; // Los meses van de 0 a 11
    const dia = date.getDate();
    const horas = date.getHours();
    const minutos = date.getMinutes();
    const segundos = date.getSeconds();
    
    return `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`
}

function sort_posts(posts, property, dir) {
    // Ordeno los posts por fecha
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
    thisYear = 2024
    return restar(thisYear, age)
}

/*******************************************************************************
** Funciones sobre el HTML
*******************************************************************************/
function update_posts_list(posts) {
    /* Funcion para mostrar los posts en pantalla */
    /* NOTA: Los posts no se van a mostrar en la pantall hasta que no salgamos
    ** del ciclo while principal
    **/
    
    /* Busco el elemento HTML que contiene la lista de posts */
    let posts_list = document.getElementsByClassName('post__list')[0];
    
    /* Muestro el elemento HTML actual en consola */
    console.dir(posts_list)
    
    /* Borro el contenido HTML interno */
    posts_list.innerHTML = ''
    
    /* Asigno el nuevo contenido HTML */
    posts.forEach( post => {
        posts_list.innerHTML += `
        <li class="post__list__item">
            <div class="post__list__item__user">
                <h3>${post.username}</h3>
            </div>
            <div class="post__list__item__content">
                <p>${post.content}</p>
            </div>
            <div class="post__list__item__date">
                <p>${get_formatted_date(post.date)}</p>
            </div>
        </li>
        `
    })
}

/*******************************************************************************
** Funciones de backend
*******************************************************************************/
function createPost(users, tmp_id)
{
    /* Mensaje de debug */
    console.log('Crear post...')
    
    /* Verifico que haya usuarios registrados para crear posts */
    if(users.length <= 0)
    {
        alert('No hay usuarios registrados en la base de datos!')
        return NaN
    }
    
    /* Variables de esta funcion */
    let found = false
    let user
    
    /* Solicito un usuario para buscar */
    let username
    while(!username)
    {
        username = prompt('Ingrese su nombre de usuario:')
        if(!username)
        {
            alert('Ingrese un nombre de usuario para continuar!')
        }
    }
    
    /* Mensaje de debug */
    console.log(
        `Se va a buscar al usuario [${username}] en la lista de usuarios...`
    )
    
    /* Busco el usuario en la lista de usuarios */
    for (let kk = 0 ; kk < users.length ; kk++) {
        
        /* Verifico si el usuario actual es el que estoy buscando
        ** y dejo de buscar
        **/
        user = users[kk]
        if(user.username === username) {
            found = true
            break
        }
    }
    
    /* Si no encontre el usuario salgo de la funcion */
    if (!found)
    {
        alert(`No se encontro al usuario [${username}] en la base de datos.`)
        return NaN
    }
    
    /* Si el usuario es menor de edad, no puede crear posts */
    if (!user.isAdult)
    {
        yearBirdth = calcYearBirdth(user.age)
        alert(
            `El usuario [${user.username}] no esta habilitado para crear posts ya que nacio en [${yearBirdth}].`
        )
        return NaN
    }
    
    /* Solicito el elemento Post a crear */
    let content = String( prompt(`[${user.username}]. Contenido:`) )
    let post = new Post(tmp_id, user.username, user.email, user.tel, content)
    
    /* Guardo el post en la lista de posts del usuario */
    user.posts.push(post)
    
    /* Muestro por consola el post. */
    console.log(post)
    
    /* Devuelvo el objeto tipo Post */
    return post
}

function showPosts(posts)
{
    /* Mensaje de debug */
    console.log('Mostrar posts...')
    
    /* Verifico que haya posts que mostrar */
    if(posts.length <= 0)
    {
        alert('No hay posts registrados en la base de datos!')
        return
    }
    
    /* Ordeno los posts por fecha */
    let sorted_posts = sort_posts(posts, 'date', 'desc')
    
    /* Sub menu de esta funcion */
    let opt
    while(!opt)
    {
        opt = Number(prompt(
            'Elija una opcion\n' +
            '1. Ver todos\n' +
            '2. Filtrar por usuario\n' +
            '3. Filtrar por fecha'
        ))
        if(!opt)
        {
            alert('Ingrese una opcion valida para continuar!')
        }
    }
    
    /* Ver todos los posts */
    if(opt === 1)
    {
        msg = ''
        sorted_posts.forEach(post => {
            msg += `(${post.id}) ${post.username} [${get_formatted_date(post.date)}]: ${post.content}\n`
        });
        alert(msg)
        
        /* Actualizo el contenido HTML*/
        update_posts_list(sorted_posts)
    }
    
    /* Filtrar por usuario */
    else if(opt === 2)
    {
        /* Solicito que se ingrese el usuario a filtrar */
        let username
        while(!username)
        {
            username = prompt('Ingrese el nombre de usuario')
            
            /* Verifico datos validos */
            if(!username)
            {
                alert('Ingrese un nombre de usuario para continuar!')
            }
        }
        
        /* Verifico que el usuario esta en la base de datos*/
        const user_exists = sorted_posts.find((post) => post.username === username)
        
        if(user_exists)
        {
            /* Filtro los posts que necesito */
            const user_posts = sorted_posts.filter((post) => post.username === username);
            
            /* Creo la cadena para mostrar los posts */
            msg = user_posts.map(post => `(${post.id}) ${post.username} [${get_formatted_date(post.date)}]: ${post.content}`).join('\n')
            alert(msg)
        
            /* Actualizo el contenido HTML*/
            update_posts_list(user_posts)
        }
        else {
            alert('El usuario no existe o no ha posteado nada aún.')
        }
        
    }
    
    /* Filtrar por fecha */
    else if(opt === 3)
    {
        /* Solicito que se ingrese el usuario a filtrar */
        let date
        let data
        while(!date)
        {
            date = prompt('Ingrese la fecha (YYYY-MM-DD)')
        
            /* Obtengo los datos */
            data = date.split('-')
            
            /* Verifico datos validos */
            if(!date || data.length < 3)
            {
                alert('Ingrese una fecha validad para continuar!')
            }
        }
        
        /* Codifico el dia, mes y anio */
        const year = Number(data[0])
        const month = Number(data[1])
        const day = Number(data[2])
        
        /* Filtro los posts que necesito */
        const filt_posts = sorted_posts.filter((post) => {
            return post.date.getFullYear() === year &&
                    (post.date.getMonth() + 1) === month &&
                    post.date.getDate() === day;
        });
        
        if(filt_posts.length > 0) {
            /* Creo la cadena para mostrar los posts */
            msg = filt_posts.map(post => `(${post.id}) ${post.username} [${get_formatted_date(post.date)}]: ${post.content}`).join('\n')
            alert(msg)
            
            /* Actualizo el contenido HTML*/
            update_posts_list(filt_posts)
        }
        else {
            alert('No hay posteos en la fecha seleccionada!.')
        }
    }
}

function deletePosts(posts) {
    /* Mensaje de debug */
    console.log('Borrar posts...')
    
    /* Verifico que haya mensajes que mostrar */
    if(posts.length <= 0)
    {
        alert('No hay posts registrados en la base de datos!')
        return
    }
    
    /* Variables de esta funcion */
    let post_id = Number(prompt('Ingrese el ID del post a borrar'))
    
    /* Verifico que el ID del post existe */
    const msg_exists = posts.find((post) => post.id === post_id)
    
    /* Si el post existe, lo borro */
    if(msg_exists) {
        const indice = posts.findIndex(post => post.id === post_id);
        posts.splice(indice, 1);
        alert(`El post con ID ${post_id} ha sido borrado con exito.`)
    }
    else {
        alert(`El post con ID ${post_id} no existe.`)
    }
    
}

function createUser()
{
    /* Mensaje de debug */
    console.log('Crear un usuario...')
    
    /* Variables de esta funcion */
    let name = prompt('Ingrese su nombre')
    let surname = prompt('Ingrese su apellido')
    let age = Number(prompt('Ingrese su edad'))
    let tel = Number(prompt('Ingrese su telefono'))
    
    /* Mensaje de debug */
    console.log(
        `Se va a crear un nuevo usuario con los siguientes datos:\n` +
        `Nombre: ${name} ${surname}\n` +
        `Edad: ${age}\n` +
        `Telefono: ${tel}\n`
    )
    
    /* Creo el usuario */
    let user = new User(name, surname, age, tel)
    
    /* Mensaje de debug */
    console.log('Usuario creado con exito!.')
    
    /* Devuelvo el usuario para que sea agregado en la lista */
    return user
}

function showUsers(users)
{
    /* Mensaje de debug */
    console.log('Mostrar usuarios...')
    
    /* Verifico que haya usuarios que mostrar */
    if(users.length <= 0)
    {
        alert('No hay usuarios registrados en la base de datos!')
        return
    }
    
    /* Muestro los usuarios uno por uno */
    for (let kk = 0 ; kk < users.length ; kk++) {
        let user = users[kk]
        console.log(user)
    }
}

function generateTestData(database) {
    /* Genero usuarios de prueba */
    test_users = [
        {name: 'Santiago', surname: 'Nieto',     age: 29, tel: 3512647957},
        {name: 'Juan',     surname: 'Perez',     age: 22, tel: 1234567089},
        {name: 'Pedro',    surname: 'Rodriguez', age: 12, tel: 2345067890},
        {name: 'Lara',     surname: 'Suarez',    age: 15, tel: 3405678901},
        {name: 'Ana',      surname: 'Lopez',     age: 25, tel: 4567891203},
    ]
    
    for (let index = 0; index < test_users.length; index++) {
        const element = test_users[index];
        
        /* Creo el usuario */
        let user = new User(element.name, element.surname, element.age, element.tel)
        
        /* Agrego el usuario a la base de datos*/
        if (user) {
            database.users.push(user)
        }
        
    }
    
    /* Genero mensajes de prueba */
    /* NOTA: Lo ideal seria que los indices los genere el generador
    ** que cree mas arriba pero estos son solo datos de prueba
    **/
    test_posts = [
        {id: 1000, username: 'snieto',  email: 'snieto@hotmail.com', tel: 3512647957, content: 'Mensaje de prueba 1', date: '2024-01-01T10:06:20'},
        {id: 1001, username: 'jperez',  email: 'jperez@hotmail.com', tel: 1234567089, content: 'Mensaje de prueba 2', date: '2024-03-21T11:03:10'},
        {id: 1002, username: 'nieto',   email: 'nieto@hotmail.com',  tel: 3512647957, content: 'Mensaje de prueba 3', date: '2024-08-08T12:44:00'},
        {id: 1003, username: 'alopez',  email: 'alopez@hotmail.com', tel: 3405678901, content: 'Mensaje de prueba 4', date: '2024-07-25T17:00:10'},
        {id: 1004, username: 'alopez',  email: 'alopez@hotmail.com', tel: 4567891203, content: 'Mensaje de prueba 5', date: '2024-01-01T20:35:56'},
    ]
    
    for (let index = 0; index < test_posts.length; index++) {
        const element = test_posts[index];
        
        /* Creo el usuario */
        let post = new Post(element.id, element.username, element.email, element.tel, element.content)
        
        /* Asigno la fecha personalizada al mensaje */
        /* NOTA: Busque en Google como hacer esto */
        post.date = new Date(element.date)
        
        /* Agrego el usuario a la base de datos*/
        if (post) {
            database.posts.push(post)
        }
        
    }
    
    alert('Datos de prueba generados correctamente.')
    
}

/*******************************************************************************
** Bucle principal
*******************************************************************************/
function main()
{
    /* Variables propias de esta funcion*/
    let exit = false
    let menuOption = NaN
    let user = NaN
    let post = NaN
    
    /* Creo el objeto para los datos */
    const database = {
        users: [],
        posts: [],
    }
    
    /* */
    id_gen = new IDGenerator(10)
    
    /* Bucle a ejecutar hasta que el usuario salga */
    while (exit === false)
    {
        /* Le pido al usuario que ingrese una opcion */
        menuOption = prompt(
                    'Menu principal\n' +
                    '1. Postear\n' +
                    '2. Ver posts\n' +
                    '3. Borrar posts\n' +
                    '4. Crear usuario\n' +
                    '5. Ver usuarios (Salida por consola)\n' +
                    '6. Generar datos de prueba\n' +
                    '0. Salir\n'
                )

        /* Verifico que el usuario no haya dejado el campo vacio */
        if (!menuOption) {
            alert('Opcion incorrecta! Vuelva a intentarlo.')
            /* Salto la iteracion del While */
            continue
        }

        /* Convertir la opción del usuario a número */
        menuOption = Number(menuOption)
        
        /* Verifico a la accion a llevar a cabo segun la opcion ingresada */
        switch (menuOption)
        {
            case 1:
                post = createPost(database.users, id_gen.get_next_id())
                if (post) {
                    database.posts.push(post)
                }
                break
            case 2:
                showPosts(database.posts)
                break
            case 3:
                deletePosts(database.posts)
                break
            case 4:
                user = createUser()
                if (user) {
                    database.users.push(user)
                }
                break
            case 5:
                showUsers(database.users)
                break
            case 6:
                generateTestData(database)
                break
            case 0:
                exit = true
                break
            default:
                alert('Opcion incorrecta! Vuelva a intentarlo.')
                break
        }
    }
}

/* Ejecuto el bucle principal del programa */
main()