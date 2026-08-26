# 🚗 Sistema de Registro de Vehículos con Envío de Emails

## 📌 Descripción

Este proyecto es una aplicación web desarrollada en JavaScript que permite gestionar un registro de vehículos y automatizar el envío de correos electrónicos para solicitudes de autorización.

El sistema incluye funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) y permite enviar notificaciones por email utilizando EmailJS.

---

## 🚀 Funcionalidades

* ✅ Registro de vehículos
* ✅ Edición de registros
* ✅ Eliminación de registros
* ✅ Visualización en tabla dinámica
* ✅ Estado de autorización:

  * Pendiente
  * Autorizado
  * No Autorizado
* ✅ Envío de correos electrónicos desde la aplicación
* ✅ Persistencia de datos con LocalStorage

---

## 🛠️ Tecnologías utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Bootstrap (para estilos y componentes UI)

### Servicios externos

* EmailJS (para envío de correos electrónicos sin backend)

### Almacenamiento

* LocalStorage (almacenamiento en el navegador)

---

## 📧 Envío de Emails

El sistema utiliza EmailJS para enviar correos electrónicos directamente desde el frontend.

### Configuración:

* Service ID
* Template ID
* Public Key (User ID)

### Datos enviados:

* Nombre
* Vehículo
* Patente
* Función

---

## 📂 Estructura del proyecto

```
/registro-vehiculos
│── index.html
│── styles.css
│── app.js
│── README.md
```

---

## ⚙️ Instalación y uso

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
```

2. Abrir el archivo `index.html` en el navegador

3. Configurar EmailJS:

   * Crear cuenta en [https://www.emailjs.com/](https://www.emailjs.com/)
   * Configurar servicio de email
   * Crear template
   * Reemplazar:

     ```js
     USER_ID
     SERVICE_ID
     TEMPLATE_ID
     ```

---

## 📸 Capturas (opcional)

Agrega aquí imágenes del sistema en funcionamiento.

---

## 💡 Mejoras futuras

* 🔒 Implementar autenticación de usuarios
* 🌐 Conectar con backend (Node.js / Django)
* 🗄️ Base de datos real (MySQL, PostgreSQL)
* 📄 Exportación a PDF
* 📩 Envío automático de correos
* 🎨 Mejoras de UI/UX

---

## 📈 Objetivo del proyecto

Este proyecto fue desarrollado como práctica para:

* Automatización de procesos
* Integración de servicios externos
* Desarrollo de aplicaciones web
* Creación de proyectos para portfolio freelance

---

## 👨‍💻 Autor

Juan Ignacio Barva

---

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y de portfolio.
