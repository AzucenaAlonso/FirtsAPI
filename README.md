# 📦 API de Gestión de Usuarios

Este proyecto es una **API RESTful** construida con **Node.js**, **Express** y **MongoDB**, que permite el **registro y autenticación de usuarios**, incluyendo subida de imágenes de perfil. Está diseñada con buenas prácticas de desarrollo, seguridad y escalabilidad.

---

## 📂 Estructura del proyecto

```
├── config/
│   └── dbservice.js        # Conexión a la base de datos
├── services/
│   └── user.service.js     # Lógica de registro y login de usuarios
├── models/
│   └── user.model.js       # Definición del modelo de usuario
├── archivos/               # Carpeta para almacenar imágenes subidas
├── node_modules/           # Dependencias
├── package.json
├── .env                    # Variables de entorno
└── server.js               # Entrada principal de la API
```

---

## 🛠 Tecnologías utilizadas

* **Backend:** Node.js + Express
* **Base de datos:** MongoDB
* **Seguridad:** bcrypt para hashing de contraseñas
* **Gestión de archivos:** multer
* **CORS:** habilitado para permitir llamadas desde distintos orígenes
* **Variables de entorno:** dotenv

---

## ⚡ Funcionalidades clave

* ✅ Registro de usuarios con hashing seguro de contraseñas y validación de duplicados.
* ✅ Autenticación de usuarios con validación de email y contraseña.
* ✅ Subida de imágenes de perfil mediante `multer`.
* ✅ Conexión a base de datos MongoDB centralizada (`connectDB`).
* ✅ Respuestas consistentes con `success`, `message` y `status` en login.
* ✅ API lista para integrarse con frontend externo mediante CORS.

---

## 🚦 Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/usuario/api-usuarios.git

# Entrar en el directorio
cd api-usuarios

# Instalar dependencias
npm install

# Configurar variables de entorno en .env
PORT=3000
MONGO_URI=<tu_uri_mongodb>

# Iniciar la API
npm start
```

---

## 📝 Endpoints principales

| Método | Ruta      | Descripción                                                |
| ------ | --------- | ---------------------------------------------------------- |
| POST   | /register | Registrar un nuevo usuario (con imagen de perfil opcional) |
| POST   | /login    | Autenticar usuario con email y contraseña                  |

> La ruta `/register` acepta `form-data` con los campos: `username`, `email`, `password` y `profileImg` (archivo opcional).
> La ruta `/login` recibe un `JSON` con `correo` y `clave`.

---

## 🔒 Buenas prácticas aplicadas

* Estructura modular (`services`, `config`, `models`).
* Hashing seguro de contraseñas con `bcrypt` y `saltRounds`.
* Validación de duplicados y manejo de errores con mensajes claros.
* Middleware `multer` para gestión segura de archivos.
* Variables sensibles gestionadas con `dotenv`.
* Respuestas consistentes para integración frontend.
* Preparada para pruebas con **Postman**.

---

## 👩‍💻 Autor

Desarrollado por **\Azucena Alonso**
Estudiante avanzado de **Desarrollo Web Fullstack**, con experiencia en:

* Arquitectura escalable y modular de aplicaciones
* Buenas prácticas de seguridad y gestión de datos
* Integración backend-frontend y testing de APIs

---

## 🌐 Conecta conmigo

* [LinkedIn](www.linkedin.com/in/azucenaalonsodg)
* [GitHub](https://github.com/AzucenaAlonso)

---

💡 *Esta API es una muestra profesional de cómo implementar un backend seguro, modular y listo para integraciones modernas.*

