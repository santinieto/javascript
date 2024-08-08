# Descripcion del proyecto
La idea central de este proyecto consiste en la creación de una red social básica. Dentro de la aplicación las personas pueden registrare con algunos datos sobre ellos y pueden crear publicaciones para que sean vistas por los demás usuarios. Cada publicación puede contener texto y/o imagenes.

No hay restricciones de edad en la creación de usuarios pero solo aquellos que sean mayores de edad tendrán la posibilidad de crear publicaciones.

En las siguientes secciones se describen las partes del proyecto y se muestran las estructuras de datos que se manejan.

## Usuarios
Cada objeto del tipo User dispondra de los siguientes campos básicos:
- Nombre
- Apellido
- Edad
- Telefono
- Contraseña

Cuando se crea un usuario nuevo en la plataforma, se deben ingresar los datos básicos descriptos anteriormente y una vez terminado eses proceso, se le asignara al nuevo usuario un "username" que será compuesto por la primera letra de su nombre de pila seguido de su apellido (todo en minúscula).

Ejemplo: El usuario Martín Perez tendrá el usuario "mperez". De la misma forma Alicia Torres tendrá el usuario "atorres".

Además de lo anterior, cada usuario dispone de un atributo del tipo booleano "isAdult" que indica si el mismo es mayor o menor de edad. Esa bandera es utilizada para determinar si el usuario actual está habilitado para crear posteos.

NOTA 1: En futuras versiones se agregará la funcionalidad para evitar la duplicación de usuarios.
NOTA 2: Por el momento no existen restricciones de seguridad en la contraseña para los usuarios.

## Posts
Los posteos son publicaciones que los usuarios pueden crear dentro del proyecto. Cada objeto del tipo Post consta de:

- ID de posteo (único para cada post)
- Username
- Email
- Telefono
- Contenido
- URL de imagen
- Fecha de publicación

Los posteos solo pueden ser eliminados por el usuario que lo creó. Ejemplo: El usuario "snieto" solo puede borrar los posteos cuyo username sea "snieto".

Cabe destacar que solo los usuarios que sean mayores de edad estarán habilitados para crear posteos, de lo contrario, solo estarán habilitados a ver los que hayan creado otros usuarios.

NOTA: En futuras versiones se agregará la opción para que los posteos puedan ser eliminados por el perfil de administrador.

## Pantala de logeo
En esta pantalla, el usuario tiene cuatro opciones disponibles:
1. Logearse con un usuario existente: En este caso se deberá ingresar un usuario y contraseña válidos. Si se proporcionan datos incorrectos entonces un mensaje apropiado será mostrado, caso contrario, se guardará en el Local Storage la información del usuario actual para posteriores procesamientos y se mostrará la pantalla principal del proyecto.
2. Crear un nuevo usuario: En este caso, se mostrará un formulario solicitando los datos pertinentes para crear el objeto de tipo usuario.
3. Borrar la memoria del Local Storage: Este botón elimina toda la información almacenada en el Local Storage.
4. Crear datos de prueba: En este caso se crearán datos usuarios y posteos de prueba para agilizar el proceso de "testing".

Los usuarios de prueba son:

```
test_users = [
    {name: 'Admin',    surname: 'Admin',     age: 99, tel: 9999999999, password: 'admin'},
    {name: 'Santiago', surname: 'Nieto',     age: 29, tel: 3512647957, password: '12345678'},
    {name: 'Juan',     surname: 'Perez',     age: 22, tel: 1234567089, password: '12345678'},
    {name: 'Pedro',    surname: 'Rodriguez', age: 12, tel: 2345067890, password: '12345678'},
    {name: 'Lara',     surname: 'Suarez',    age: 15, tel: 3405678901, password: '12345678'},
    {name: 'Ana',      surname: 'Lopez',     age: 25, tel: 4567891203, password: '12345678'},
]
```

Los posteos de prueba son:

```
test_posts = [
    {id: 1000, username: 'snieto',  email: 'snieto@hotmail.com', tel: 3512647957, content: 'Mensaje de prueba 1', img: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', date: '2024-01-01T10:06:20'},
    {id: 1001, username: 'jperez',  email: 'jperez@hotmail.com', tel: 1234567089, content: 'Mensaje de prueba 2', img: '', date: '2024-03-21T11:03:10'},
    {id: 1002, username: 'snieto',  email: 'nieto@hotmail.com',  tel: 3512647957, content: 'Mensaje de prueba 3', img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', date: '2024-08-08T12:44:00'},
    {id: 1003, username: 'alopez',  email: 'alopez@hotmail.com', tel: 3405678901, content: 'Mensaje de prueba 4', img: '', date: '2024-07-25T17:00:10'},
    {id: 1004, username: 'alopez',  email: 'alopez@hotmail.com', tel: 4567891203, content: 'Mensaje de prueba 5', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', date: '2024-01-01T20:35:56'},
]
```

## Pantalla de inicio
Los posteos son mostrados en la pantalla de inicio. por defecto se muestran todos los posteos cargados en el Local Storage pero los mismos pueden ser filtrado mediante el uso de la barra de navegación. Los filtros para los posteos están explicados en la sección correspondiente.

Los posteos se visualizan en forma ordenada descendente teniendo como parámetro de ordenamiento la fecha de publicación. Esto quiere decir que los posteos que aparezcan arriba serán los más recientes.

En particular, cada posteo aparecerá en un recuadro y se mostrará la siguiente información:
- ID del posteo (para poder borrarlo mediante la pantalla correspondiente).
- Nombre y apellido del creador.
- Contenido textual del posteo.
- Contenido multimedia (si lo tuviera).
- Fecha de publicación.

Adicionalmente, se agregará un botón en cada posteo que pertenezca al usuario que se encuentre logeado actualmente.

## Barra de navegacion
En la barra de navegacion se disponen de algunas opciones utiles:
- Inicio: En esta pantalla se mostraran todos los posteos que esten alojados en el Local Storage. Aquí no se hará distinción de ningún tipo a no ser que se aplique alguno de los filtros descriptos en la sección correspondiente más abajo.
- Crear post: Este botón lleva a la pantalla para la creación de posteos.
- Borrar post: Este botón lleva a la pantalla para borrar posteos
- Salir: Con ese botón se vuelve a la pantalla de logeo del proyecto
- Barra de busqueda: La barra de búsqueda es utilizada para aplicar los filtros correspondientes los cuales están descriptos en la sección correspondiente.

## Filtros de mensajes
En la pantalla de inicio se mostrarán por defecto todos los posteos que hayan sido creados en la plataforma pero se dispone de una barra de búsqueda para poder filtrar los mensajes. Cada filtro se compone de una palabra clave y el caracter ":", luego de eso se debe ingresar el campo de búsqueda. Los filtros disponibles son:

1. user:`username`
2. date:`yyyy-mm-dd`
3. id:`id`
4. `search-string`

Ejemplos de uso pueden ser:

1. user:snieto
2. date:2024-08-06
3. id:1002

Para el caso del último filtro, si no se aplica ninguno de los demás filtros, entonces se buscarán todos los posteos que contengan la cadena actual que haya sido ingresada en la barra de búsqueda. Cabe destacar que los filtros son insensibles a mayusculas o minusculas.

## Creación de posts
Para ingresar a la sección de creación de posteos basta con presionar el botón correspondiente en la barra de navegación. Al ingresar se dispondrá de dos campos:
1. Contenido de texto del posteo
2. Contenido multimedia del posteo.

En la versión actual del proyecto, el campo multimedia solo admite direcciones URL a imágenes para ser mostradas. Ejemplo:

https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0

Todas las imágenes serán mostradas con el mismo tamaño independientemente de su resolución.

## Eliminar posts
Para eliminar posteos existen dos métodos:
1. Apretando el botón correspondiente para el posteo a eliminar en la pantalla de inicio.
2. Proporcionando al sistema un string con los IDs de los posteos a eliminar separados por el caracter ",". Para llegar a está sección se dispone de un botón en la barra de navegación.

Cabe destacar que el usuario que haya iniciado sesión solo será capaz de borrar los posteos que sean de su autoría.

## Editar posteos
Trabajo en progreso.