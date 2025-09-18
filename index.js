//1. importamos librerias de express
import express from 'express';
//15 importamos la libreria dotenv que hemos instalado
import dotenv from 'dotenv';
//18 importamos la funcion connectDB desde dbservice.js
import { connectDB } from './config/dbservice.js';  

//27 importamos la funcion register desde user.service.js
import { register } from './services/user.service.js';

//35 importamos multer para manejar la subida de archivos multimedia
import multer from 'multer';

//44 importamoslos servicios de login   
import { login } from './services/user.service.js';
//Importamos cors para permitir que nuestro backend pueda ser llamado desde otro origen (por ejemplo desde un frontend distinto)
import cors from 'cors';


//ZONA DE CONFIGURACION 

//38 Configuramos multer en la ruta de registro
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'archivos/'); // carpeta donde se guardará la imagen
    },
    filename: (req, file, cb) => {
        // Nombre personalizado enviado en form-data o nombre original
        const nombrePersonalizado = req.body.filenombre || file.originalname;

        cb(null, nombrePersonalizado);
    }
});


//36 configuramos multer para guardar las imagenes en la carpeta 'archivos'
const upload = multer({ storage });   //storage es la configuracion que hemos creado arriba (el destino)

//2.declaramos una variable en donde decimos "usaremos el puerto que se nos asigne y en caso de no haber alguno usaremos el 3000"
const PORT = process.env.port || 3000;

//21  configuramos dotenv
dotenv.config();

//3. declamaos la constatre api
const api = express()
//le indicamos a nuestra variable que este dispuesta a trabajar con objetos de tipo JSON (esto es util para interpretar las peticiones)
api.use(express.json())
api.use(cors())    // habilitar CORS para todas las rutas y orígenes : cors:
 connectDB();  //20 llamamos a la funcion connectDB para conectar con la base de datos


// RUTAS DE LA API
//cada metodo (get, post, put, delete, etc) recibe 2 parametros, el 1ero es la ruta y el 2do es la funcion encargada de ejecutar las acciones
//el metodo get se usa para obtener datos del servidor, recibe 2 parametros, el 1ero es la ruta y el 2do es la funcion encargada de ejecutar las acciones

//4 el motodo post funciona de la misma manera, con la diferencia de que por regla general este recibe información por medio de la request,
// para los demas metodos (put, delet, patch, etc) se manejan de la misma manera que el post, basicamente reciben 2 parametros,
// siendo el 1ero la ruta y el 2do la funcion encargada de ejecutar las acciones
//Gracias a esto se conecta el front con el backend
api.post('/login', async (request, response) => {   //7. Dentro de los parentesis despues del login colocamos el  request y el response (req, res)
    //48 llamar a la funcion login para manejar el login
    //49 capturamos los datos que vienen en el body de la peticion
    const { email, password } = request.body;  

    //45 crear cont asincrona para manejar el login
   const var_login = await login(); //46 capturamos los datos que vienen en el body de la peticion

    response.status(200).send("Conectando con el back... ... ... Exito!"); //8. Con el response le decimos que nos envie un mensaje de exito
})

//19 llamamos a la funcion connectDB para conectar con la base de datos
connectDB(); 

//9 Creamos la ruta register para registrar usuarios
api.post('/register', upload.single('profileImg'), async (request, response) => {        //37  añadimos el middleware upload.single('profileImg') para manejar la subida de un solo archivo con el nombre 'profileImg'
    //33 capturar los datos que vienen en el body de la peticion
    const { username, email, password } = request.body; 
    //39  capturamos la ruta de la imagen subida
    const profileImg = request.file ? `archivos/${request.file.filename}` : null; // Si se subió un archivo, obtenemos su ruta, si no, dejamos el campo vacío
   
    //42 Hasheamos la contraseña antes de enviarla al servicio de registro
    const hashedPassword = await bcrypt.hash(password, saltRound);

    //28 registro es igual a register  ->  //34 Añadimos los parametros que necesita la funcion register
    const registro = await register({ user: username, mail: email, pass: hashedPassword, img: profileImg });  //llamamos a la funcionque se encanga de hacer el resgistro  -> //42 Cambiamos pass por hashedPassword para enviar la contraseña hasheada
    //32 enviamos la respuesta al cliente
    if(registro == "Error al registrar usuario"){
        response.status(201).send({message: "Error al registrar usuario"});  //El cod 400 es para indicar que hubo un error en la solicitud
    } else {
        response.status(400).send({message: registro});  //El cod 201 es para indicar que se ha creado un nuevo recurso
    }
})

//5. el metodo listen es el encargado de poner a escuchar nuestro servidor en el puerto que le indiquemos
api.listen(PORT, () => {  //el metodo listen recibe 2 parametros, el 1ero es el puerto y el 2do es una funcion que se ejecuta una vez el servidor este corriendo
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

//6. Realizamos conexion con Postman
//Para probar nuestra api, abrimos postman y seleccionamos el metodo POST, en la barra de direcciones colocamos "localhost:3000/login" y damos click en enviar
//Si todo sale bien, en la terminal veremos el mensaje "Conectando con el backend.... exito!" y en postman veremos el mensaje "Could not get any response" 


