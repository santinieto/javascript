
/*******************************************************************************
** Comentarios:
** 1. Mi objetivo final con esta pre entrega es poder generar un sistema para
**    que las personas puedan contactarse conmigo a través de mi portfolio
**    personal.
** 2. La idea de este script es comenzar una aplicacion para que se puedan crear
**    usuarios y esos usuarios puedan enviar mensajes siempre que sean mayores
**    de edad.
** 3. Se agregan un menu para el usuario y utilidades para mostrar por consola
**    la lista de usuarios y mensajes registrados.
** 4. En los casos donde se piden datos ingresados por teclado se verifica que
**    el usuario no haya dejado campos vacios antes de continuar.
** 5. Tambien se crea una funcion que cumpla la funcion de "capitalizar"
**    las palabras.
*******************************************************************************/

/*******************************************************************************
** Variables globables
** NOTA: En clase comentaron que NO era una buena practica tener variables
**       globales. Voy a intentar dejar este espacio vacio
*******************************************************************************/

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
        this.messages = []
        
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
** Funciones
*******************************************************************************/
function sendMessage(users)
{
    /* Mensaje de debug */
    console.log('Enviar un mensaje...')
    
    /* Verifico que haya usuarios registrados para mandar mensajes */
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
    
    /* Si el usuario es menor de edad, no puede enviar mensajes */
    if (!user.isAdult)
    {
        yearBirdth = calcYearBirdth(user.age)
        alert(
            `El usuario [${user.username}] no esta habilitado para enviar mensajes ya que nacio en [${yearBirdth}].`
        )
        return NaN
    }
    
    /* Solicito el mensaje a enviar */
    let message = String( prompt(`[${user.username}]. Ingrese su mensaje:`) )
    let contact = new Contact(user.username, user.email, user.tel, message)
    
    /* Guardo el mensaje en la lista de mensajes del usuario */
    user.messages.push(message)
    
    /* Muestro por pantalla el mensaje. */
    console.log(contact)
    
    /* Devuelvo el mensaje */
    return contact
}

function showMessages(contacts)
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

/*******************************************************************************
** Bucle principal
*******************************************************************************/
function main()
{
    /* Variables propias de esta funcion*/
    let exit = false
    let menuOption = NaN
    let user = NaN
    let contact = NaN
    
    /* Creo el objeto para los datos */
    const database = {
        users: [],
        contacts: [],
    }
    
    /* Bucle a ejecutar hasta que el usuario salga */
    while (exit === false)
    {
        /* Le pido al usuario que ingrese una opcion */
        menuOption = prompt(
                    'Menu principal\n' +
                    '1. Enviar mensaje\n' +
                    '2. Ver mensajes (consola)\n' +
                    '3. Crear usuario\n' +
                    '4. Ver usuarios (consola)\n' +
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
                contact = sendMessage(database.users)
                if (contact) {
                    database.contacts.push(contact)
                }
                break
            case 2:
                showMessages(database.contacts)
                break
            case 3:
                user = createUser()
                if (user) {
                    database.users.push(user)
                }
                break
            case 4:
                showUsers(database.users)
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