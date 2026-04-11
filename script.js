const tabla = document.getElementById("tablaVehiculos");
const form = document.getElementById("formVehiculo");
const btnMostrarForm = document.getElementById("btnMostrarForm");

const USER_ID = "ejRSnRUs9ROUUS3yY";
const SERVICE_ID = "service_tfobs8p";
const TEMPLATE_ID = "template_tgg1jhi";

(function() {
    emailjs.init(USER_ID);
})();

let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [
    { nombre: "Ramiro Sanchez", vehiculo: "Toyota Hilux", patente: "AD456FB", funcion: "Docente", estado: "Pendiente" },
    { nombre: "Pablo Perez", vehiculo: "Fiat Cronos", patente: "FP224AL", funcion: "No Docente", estado: "Pendiente" },
    { nombre: "Laura Rodriguez", vehiculo: "Toyota Etios", patente: "GT444CV", funcion: "Alumna", estado: "Pendiente" }
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

==========================================
RESPUESTA: Responde a este correo electronico indicando:
- Si, Autorizado (para aprobar)
- No, Autorizado (para rechazar)
=================================================

Saludos.`;
}

function mostrarTabla() {
    tabla.innerHTML = "";

    vehiculos.forEach((v, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${v.nombre}</td>
            <td>${v.vehiculo}</td>
            <td>${v.patente}</td>
            <td>${v.funcion}</td>
            <td>${getEstadoBadge(v.estado)}</td>
            <td>
                <button class="btn btn-warning btn-sm">Editar</button>
                <button class="btn btn-danger btn-sm">Eliminar</button>
                <button class="btn btn-info btn-sm text-white">Enviar email</button>
                <button class="btn btn-success btn-sm">Autorizar</button>
                <button class="btn btn-danger btn-sm text-white">Denegar</button>
            </td>
        `;

        fila.querySelector(".btn-warning").onclick = () => {
            document.getElementById("nombre").value = v.nombre;
            document.getElementById("vehiculo").value = v.vehiculo;
            document.getElementById("patente").value = v.patente;
            document.getElementById("funcion").value = v.funcion;

            vehiculos.splice(index, 1);
            guardar();
            mostrarTabla();
            form.classList.remove("d-none");
        };

        fila.querySelector(".btn-danger").onclick = () => {
            vehiculos.splice(index, 1);
            guardar();
            mostrarTabla();
        };

        fila.querySelector(".btn-info").onclick = async () => {
            const email = prompt("Ingresa correo electrónico del destinatario:");
            if (!email) return;
            const mensajeEmail = construirMensajeEmail(v);

            const templateParams = {
                to_email: email,
                subject: `Solicitud de Autorizacion - Vehiculo ${v.patente}`,
                message: mensajeEmail,
                nombre: v.nombre,
                vehiculo: v.vehiculo,
                patente: v.patente,
                funcion: v.funcion
            };

            try {
                await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
                alert("Email enviado correctamente a " + email);
            } catch (error) {
                alert("Error al enviar email. Responde: " + error.text);
            }
        };

        fila.querySelector(".btn-success").onclick = () => {
            vehiculos[index].estado = "Autorizado";
            guardar();
            mostrarTabla();
        };

        fila.querySelector(".btn-danger.text-white").onclick = () => {
            vehiculos[index].estado = "No Autorizado";
            guardar();
            mostrarTabla();
        };

        tabla.appendChild(fila);
    });
}

btnMostrarForm.addEventListener("click", () => {
    form.classList.toggle("d-none");
});

form.addEventListener("submit", e => {
    e.preventDefault();

    const nuevo = {
        nombre: nombre.value,
        vehiculo: vehiculo.value,
        patente: patente.value,
        funcion: funcion.value,
        estado: "Pendiente"
    };

    vehiculos.push(nuevo);
    guardar();
    mostrarTabla();

    form.reset();
    form.classList.add("d-none");
});

mostrarTabla();