// Selectores
const boton = document.querySelector(".button.u-full-width.button-primary");
const listaMensajes = document.querySelector("#lista-mensajes");
const mensajeInput = document.querySelector("#mensaje");

// Inicialización de mensajes
let mensajes = []

// Listeners
document.addEventListener("DOMContentLoaded", () => {
    cargarMensajesAlmacenados()
    boton.addEventListener("click", (e) => {
        e.preventDefault()
        mostrarMensaje()
    })
})

listaMensajes.addEventListener("click", (e) => {
    if (e.target.classList.contains("boton-eliminar")) {
        eliminarMensaje(e.target.dataset.index)
    }
})

// Función para guardar los mensajes en el almacenamiento local
function guardarMensajes() {
    localStorage.setItem("mensajes", JSON.stringify(mensajes))
}

// Función para cargar mensajes del almacenamiento local
function cargarMensajesAlmacenados() {
    const mensajesAlmacenados = localStorage.getItem("mensajes")
    mensajes = mensajesAlmacenados ? JSON.parse(mensajesAlmacenados) : []
    mostrarMensajesAlmacenados()
}

// Función para mostrar mensajes guardados en el contenedor
function mostrarMensajesAlmacenados() {
    listaMensajes.innerHTML = mensajes.map((mensaje, index) => `
        <p>${mensaje} <button class="boton-eliminar" data-index="${index}">X</button></p>
    `).join('')
}

// Función para mostrar un nuevo mensaje
function mostrarMensaje() {
    const mensaje = mensajeInput.value.trim()
    if (mensaje) {
        mensajes.push(mensaje)
        guardarMensajes()
        mensajeInput.value = ""
        agregarMensajeConBoton(mensaje, mensajes.length - 1)
    }
}

// Función para agregar un mensaje con el botón de eliminar
function agregarMensajeConBoton(mensaje, index) {
    const mensajeHTML = document.createElement("p")
    mensajeHTML.innerHTML = `${mensaje} <button class="boton-eliminar" data-index="${index}">X</button>`
    listaMensajes.appendChild(mensajeHTML)
}

// Función para eliminar un mensaje
function eliminarMensaje(index) {
    mensajes.splice(index, 1)
    guardarMensajes()
    mostrarMensajesAlmacenados()
}