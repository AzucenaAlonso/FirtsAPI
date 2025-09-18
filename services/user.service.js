//10 creamos el servicio user.service.js
//11 importamos express
//import express from 'express'; 


//14 la funcion conectar se encargara de validar que el usuario que intenta iniciar sesion este registrado
//async function conectar(){}

//13 importamos la libreria multer atraves de npm i multer y la dotenv

//29 importamos en nuestro servicio nuestro modelo de usuario
import User from '../model/user.js';

// 40 impostamos bcrypt para hashear las contraseñas
import bcrypt from 'bcrypt';
//41 Configuramos bcrypt que hemos importado arriba
const saltRound = 10; // encripta 10 veces la contraseña 

//12  exportamos la funcion que crea el registro
export async function register({ user, mail, pass, img }) {  //34 recibimos los datos que vienen en el body de la peticion cambiando porq no son las mismas variables

     //30 creamos un nuevo usuario usando el modelo importado
    try {
        const nuevoUsuario = await new User({   //await porque es una operacion que puede tardar
            username: user ,
            email: mail ,
            password: pass ,
            profileImg: img,
        });

        //31 guardamos el nuevo usuario en la base de datos 
        await nuevoUsuario.save();
        return "Usuario registrado con exito";  

    } catch (error) {
        console.log("Error al registrar usuario:", error);
        if (error.code === 11000) {                             //codigo de error de mongo para duplicados 
            return "El usuario o email ya existe";
        }
        return "Error al registrar usuario";
    }
}

//43 exportamos el login,
export async function login({ correo, clave }) {
    //48 Capturamos los datos que vienen en el body de la peticion
    try{
        //50  buscamos el usuario en la base de datos por su email
        const user = await User.findOne({ email: correo }); 
        //51 si no existe devolvemos un mensaje de error:
        if (!user) {
            return { success: false, message: "Usuario no encontrado" };
        }
        //52  verificamos la contraseña usando bcrypt
        const isMatch = await bcrypt.compare(clave.toString(), user.password); //comparamos la contraseña ingresada con la almacenada en la base de datos
       console.log(isMatch) // true si coinciden, false si no
       
        //53  si no coincide devolvemos un mensaje de error
         if (!isMatch) {
            return { success: false, message: "Contraseña incorrecta", status:403 };
         };
        //54 si todo es correcto devolvemos un mensaje de exito
         return { success: true, message: "Login exitoso", status:200};
    } catch (e) {
        console.log("error", error);
        return {success: false, message: "Error en el servidor", status:400};
       
    }
}







