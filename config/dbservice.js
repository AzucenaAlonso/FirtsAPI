//para tener el servicio de base de datos

//16 importamos mongoose
import mongoose from 'mongoose';

//21 impotamos dotenv y la configuramos
import dotenv from 'dotenv';
dotenv.config();

//17 exportamos la funcion connectDB
export async function connectDB(){                     //18 la funcion es asincrona porque la conexion a la base de datos puede tardar
  try {                         //19 usamos un bloque try catch para manejar errores 
    const db = mongoose;                                                  
    await db.connect(process.env.URLBD);  //20 usamos await para esperar a que la conexion se realice, y usamos process.env.MONGO_URI para obtener la cadena de conexion desde el archivo .env
        //URLDB lo sacamos para enlazar la bBdd con mongo atlas
     console.log("✅ Conectado a MongoDB");

  } catch (err) {
    console.error("❌ Error de conexión:", err);
    process.exit(1);
  }
};


