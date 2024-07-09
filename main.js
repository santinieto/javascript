
/*******************************************************************************
** Comentarios:
** La idea de este script es comenzar una aplicacion para que se puedan crear
** usuarios y esos usuarios puedan enviar mensajes siempre que sean mayores de
** edad. Tambien se agregan un menu para el usuario y utilidades para mostrar
** por consola la lista de usuarios y mensajes registrados.
** En los casos donde se piden datos ingresados por teclado se verifica que el
** usuario no haya dejado campos vacios antes de continuar.
** Tambien se creo una funcion que cumpla la funcion de "capitalizar"
** las palabras.
*******************************************************************************/

/*******************************************************************************
** Variables globables
*******************************************************************************/
let users = []
let contacts = []

/*******************************************************************************
** Clases
*******************************************************************************/
class User {
    /* Constructor de la clase */
    constructor(name, lastname, age, tel) {
        this.name = capitalize(name)
        this.lastname = capitalize(lastname)
        this.age = age
        this.tel = tel
        
        /* Genero el correo para el usuario */
        this.create_username()
        
        /* Verifico si el usuario es mayor de edad o no */
        this.is_adult = this.check_adult_status()
    }
    
    /* Funciones o metodos de la clase */
    create_username() {
        let arg1 = this.name.toLowerCase()[0]
        let arg2 = this.lastname.toLowerCase()
        this.username = `${arg1}${arg2}`
        let extension = 'hotmail'
        this.email = `${this.username}@${extension}.com`
    }
    
    check_adult_status() {
        return this.age >= 18
    }
    
}

class Contact {
    /* Constructor de la clase */
    constructor(username, email, tel, message) {
        this.username = username
        this.email = email
        this.tel = tel
        this.message = message
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

/*******************************************************************************
** Funciones
*******************************************************************************/
function send_message()
{
    /* Mensaje de debug */
    console.log('Enviar un mensaje...')
    
    /* Verifico que haya usuarios registrados para mandar mensajes */
    if(users.length <= 0)
    {
        alert('No hay usuarios registrados en la base de datos!')
        return
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
        return
    }
    
    /* Si el usuario es menor de edad, no puede enviar mensajes */
    if (!user.is_adult)
    {
        alert(
            `El usuario [${user.username}] no esta habilitado para enviar mensajes.`
        )
        return
    }
    
    /* Solicito el mensaje a enviar */
    let message = String( prompt(`[${user.username}]. Ingrese su mensaje:`) )
    let contact = new Contact(user.username, user.email, user.tel, message)
    
    /* Agrego el mensaje a lista de contactos y lo muestro en pantalla */
    contacts.push(contact)
    console.log(contact)
}

function show_messages()
{
    /* Mensaje de debug */
    console.log('Mostrar mensajes...')
    
    /* Verifico que haya mensajes que mostrar */
    if(contacts.length <= 0)
    {
        alert('No hay mensajes registrados en la base de datos!')
        return
    }
    
    /* Muestro los mensajes uno por uno */
    for (let kk = 0 ; kk < contacts.length ; kk++) {
        let contact = contacts[kk]
        console.log(contact)
    }
}

function create_user()
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
    
    /* Creo el usuario y lo agrego a la lista */
    let user = new User(name, surname, age, tel)
    users.push(user)
    
    /* Mensaje de debug */
    console.log('Usuario agregado con exito!.')
}

function show_users()
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

/*******************************************************************************
** Bucle principal
*******************************************************************************/
function main()
{
    /* Variables propias de esta funcion*/
    let exit = false
    let user_opt
    
    /* Bucle a ejecutar hasta que el usuario salga */
    while (exit === false)
    {
        /* Le pido al usuario que ingrese una opcion */
        user_opt = prompt(
                    'Menu principal\n' +
                    '1. Enviar mensaje\n' +
                    '2. Ver mensajes\n' +
                    '3. Crear usuario\n' +
                    '4. Ver usuarios\n' +
                    '0. Salir\n'
                )

        /* Verifico que el usuario no haya dejado el campo vacio */
        if (!user_opt) {
            alert('Opcion incorrecta! Vuelva a intentarlo.')
            continue
        }

        /* Convertir la opción del usuario a número */
        user_opt = Number(user_opt)
        
        /* Verifico a la accion a llevar a cabo segun la opcion ingresada */
        switch (user_opt)
        {
            case 1:
                send_message()
                break
            case 2:
                show_messages()
                break
            case 3:
                create_user()
                break
            case 4:
                show_users()
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