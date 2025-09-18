//aqui va neustro mvc de usuario : modelo vista controlado
//la info que ira de la base de datos a la app y viceversa

//22 importamos mongoose
import mongoose from "mongoose";

//23 creamos el esquema de usuario -> datos que va a pedir
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String, required: true },               //ruta de la imagen no la imagen en si
    }, 
    { timestamps: true }
);


const User = mongoose.model("User", userSchema);
//24 exportamos el modelo de usuario
User.init();
export default User;        //Exportamos el modelo para usarlo en otros archivos