const tabla = document.getElementById("tablaVehiculos");
const form = document.getElementById("formVehiculo");
const btnMostrarForm = document.getElementById("btnMostrarForm");
const buscar = document.getElementById("buscar");

// Campos del formulario
const inputNombre = document.getElementById("nombre");
const inputVehiculo = document.getElementById("vehiculo");
const inputPatente = document.getElementById("patente");
const inputFuncion = document.getElementById("funcion");
const inputEmail = document.getElementById("email");

// Configuración de EmailJS
const USER_ID = "ejRSnRUs9ROUUS3yY";
const SERVICE_ID = "service_tfobs8p";
const TEMPLATE_ID = "template_tgg1jhi";

// Variable para saber si estamos editando un elemento (-1 = nuevo registro)
let editIndex = -1;

// Inicializando EmailJS
(function () {
    emailjs.init(USER_ID);
})();

let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [
    {
        nombre: "Ramiro Sanchez",
        vehiculo: "Toyota Hilux",
        patente: "AD456FB",
        funcion: "Docente",
        email: "",
        estado: "Pendiente"
    },
    {
        nombre: "Pablo Perez",
        vehiculo: "Fiat Cronos",
        patente: "FP224AL",
        funcion: "No Docente",
        email: "",
        estado: "Pendiente"
    },
    {
        nombre: "Laura Rodriguez",
        vehiculo: "Toyota Etios",
        patente: "GT444CV",
        funcion: "Alumna",
        email: "",
        estado: "Pendiente"
    }
];

function guardar() {
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
}

function getEstadoBadge(estado) {
    const colores = {
        "Pendiente": "warning",
        "Autorizado": "success",
        "No Autorizado": "danger"
    };

    return `<span class="badge bg-${colores[estado] || 'secondary'}">${estado}</span>`;
}

function construirMensajeEmail(v) {
    return `Asunto: Solicitud de Autorizacion - Vehiculo ${v.patente}

Estimado/a,

Se solicita autorizacion para el siguiente vehiculo:

Nombre: ${v.nombre}
Vehiculo: ${v.vehiculo}
Patente: ${v.patente}
Funcion: ${v.funcion}
Email: ${v.email || ""}

==========================================
RESPUESTA: Responde a este correo electronico indicando:
- Si, Autorizado (para aprobar)
- No, Autorizado (para rechazar)
=================================================

Saludos.`;
}

function mostrarTabla(filtro = "") {
    tabla.innerHTML = "";

    const texto = filtro.toLowerCase();

    const vehiculosFiltrados = vehiculos.filter(v =>
        v.nombre.toLowerCase().includes(texto) ||
        v.vehiculo.toLowerCase().includes(texto) ||
        v.patente.toLowerCase().includes(texto) ||
        v.funcion.toLowerCase().includes(texto) ||
        (v.email || "").toLowerCase().includes(texto) ||
        v.estado.toLowerCase().includes(texto)
    );

    // Ordenamos alfabéticamente por el campo "nombre" (A-Z)
    vehiculosFiltrados.sort((a, b) =>
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );

    vehiculosFiltrados.forEach((v) => {

        // Obtenemos el índice real en el arreglo original
        const index = vehiculos.indexOf(v);

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${v.nombre}</td>
            <td>${v.vehiculo}</td>
            <td>${v.patente}</td>
            <td>${v.funcion}</td>
            <td>${v.email || ""}</td>
            <td>${getEstadoBadge(v.estado)}</td>
            <td class="d-flex gap-1 flex-wrap">
                <button class="btn btn-warning btn-sm btn-editar">Editar</button>
                <button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>
                <button class="btn btn-info btn-sm text-white btn-email">Enviar email</button>
                <button class="btn btn-success btn-sm btn-autorizar">Autorizar</button>
                <button class="btn btn-secondary btn-sm btn-denegar">Denegar</button>
            </td>
        `;

        // EDITAR
        fila.querySelector(".btn-editar").onclick = () => {

            inputNombre.value = v.nombre;
            inputVehiculo.value = v.vehiculo;
            inputPatente.value = v.patente;
            inputFuncion.value = v.funcion;
            inputEmail.value = v.email || "";

            editIndex = index;

            form.classList.remove("d-none");
        };

        // ELIMINAR
        fila.querySelector(".btn-eliminar").onclick = () => {

            if (confirm(`¿Estás seguro de eliminar a ${v.nombre}?`)) {

                vehiculos.splice(index, 1);

                guardar();

                mostrarTabla(buscar.value);
            }
        };

        // EMAIL
        fila.querySelector(".btn-email").onclick = async () => {

            const email = prompt("Correo del destinatario:");

            if (!email) return;

            const mensajeEmail = construirMensajeEmail(v);

            const templateParams = {
                to_email: email,
                subject: `Solicitud de Autorizacion - Vehiculo ${v.patente}`,
                message: mensajeEmail,
                nombre: v.nombre,
                vehiculo: v.vehiculo,
                patente: v.patente,
                funcion: v.funcion,
                email: v.email || ""
            };

            try {

                await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    templateParams
                );

                alert("Email enviado correctamente.");

            } catch (error) {

                alert(
                    "Error al enviar email: " +
                    (error.text || JSON.stringify(error))
                );
            }
        };

        // AUTORIZAR
        fila.querySelector(".btn-autorizar").onclick = () => {

            vehiculos[index].estado = "Autorizado";

            guardar();

            mostrarTabla(buscar.value);
        };

        // DENEGAR
        fila.querySelector(".btn-denegar").onclick = () => {

            vehiculos[index].estado = "No Autorizado";

            guardar();

            mostrarTabla(buscar.value);
        };

        tabla.appendChild(fila);
    });
}

// Mostrar/Ocultar Formulario para un nuevo registro
btnMostrarForm.addEventListener("click", () => {

    editIndex = -1;

    form.reset();

    form.classList.toggle("d-none");
});

// Guardar Registro (Nuevo o Editado)
form.addEventListener("submit", e => {

    e.preventDefault();

    if (editIndex === -1) {

        // Crear nuevo registro
        const nuevo = {

            nombre: inputNombre.value,

            vehiculo: inputVehiculo.value,

            patente: inputPatente.value,

            funcion: inputFuncion.value,

            email: inputEmail.value,

            estado: "Pendiente"
        };

        vehiculos.push(nuevo);

    } else {

        // Actualizar registro existente
        vehiculos[editIndex].nombre = inputNombre.value;

        vehiculos[editIndex].vehiculo = inputVehiculo.value;

        vehiculos[editIndex].patente = inputPatente.value;

        vehiculos[editIndex].funcion = inputFuncion.value;

        vehiculos[editIndex].email = inputEmail.value;

        editIndex = -1;
    }

    guardar();

    mostrarTabla(buscar.value);

    form.reset();

    form.classList.add("d-none");
});

// Búsqueda en tiempo real
buscar.addEventListener("input", () => {

    mostrarTabla(buscar.value);
});

// Carga inicial
mostrarTabla();