                                                                                                                                                                                                                                                       /** * @file Parkour.js
 * @description Funciones para el procesamiento de la info enviada por el MS Parkour
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Parkour = {};
Parkour.datosJugadoresNulos=null;

// Parkour de datosDescargados vacíos
Parkour.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Parkour al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Parkour.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Parkour
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Parkour
 */
Parkour.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Parkour Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Parkour
 */
Parkour.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Parkour Acerca de", mensajeAMostrar)
}



/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Parkour.procesarHome = function () {
    this.descargarRuta("/parkour/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Parkour.procesarAcercaDe = function () {
    this.descargarRuta("/parkour/acercade", this.mostrarAcercaDe);
}


/*HISTORIA DE USUARIO 2 */

Parkour.listar = function () {
    this.recupera(this.imprime);
}



/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Parkour.pieTable = function () {
    return "</tbody></table>";
}

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Parkour.cabeceraTable = function () {
    return `<table class="listado-proyectos" id="myTable">
        <thead>
        <th>nombreCompleto</th>
        </thead>`;
}

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Parkour.cuerpoTr = function (p) {
    const d = p.data

    return `<tr><td><em>${d.nombre}${d.apellidos}</em></td></tr>`;
}




Parkour.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/parkour/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}



/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
Parkour.imprime = function (vector) {
    vector = vector || this.datosJugadoresNulos
    let msj = "";
    
    if (vector === null || vector.length === 0 || typeof vector !== "object") {
      msj = OBJETO_VACIO;
    } else {
      msj += Parkour.cabeceraTable();
      vector.forEach(e => msj += Parkour.cuerpoTr(e))
      msj += Parkour.pieTable();
    }
    
    Frontend.Article.actualizar( "Listado de proyectos", msj );
  }



/*HISTORIA DE USUARIO 3 */

Parkour.listar1 = function () {
    this.recupera1(this.imprime);
}


Parkour.recupera1 = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/parkour/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        vectorProyectos.data.sort((a, b) => {
            const nombreA = a.data.nombre.toLowerCase();
            const nombreB = b.data.nombre.toLowerCase();
            if (nombreA < nombreB) {
                return -1;
            }
            if (nombreA > nombreB) {
                return 1;
            }
            return 0;
        });
        callBackFn(vectorProyectos.data)
    }
}






/*HISTORIA DE USUARIO 4 */

Parkour.listarTodo = function () {
    this.recupera(this.imprimeTodo);
}


/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
Parkour.imprimeTodo = function (vector) {
    vector = vector || this.datosJugadoresNulos
    let msj = "";
    
    if (vector === null || vector.length === 0 || typeof vector !== "object") {
      msj = OBJETO_VACIO;
    } else {
      msj += Parkour.cabeceraTableTodo();
      vector.forEach(e => msj += Parkour.cuerpoTrTodo(e))
      msj += Parkour.pieTable();
    }
    
    Frontend.Article.actualizar( "Listado de proyectos", msj );
  }


/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Parkour.cabeceraTableTodo = function () {
    return `<table class="listado-proyectos" id="myTable">
        <thead>
        <th>nombre</th>
        <th>apellidos</th>
        <th>fecha_nacimiento</th>
        <th>participaciones_comp_oficiales</th>
        <th>participaciones_comp_internacional</th>
        <th>numero_trofeos</th>
        </thead>`;
}

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Parkour.cuerpoTrTodo = function (p) {
    const d = p.data
    const nombre = d.nombre;
    const apellidos = d.apellidos;
    const fecha_nacimiento = d.fecha_de_nacimiento;
    const participaciones_comp_oficiales=d.participaciones_en_competiciones_oficiales;
    const participaciones_comp_internacional=d.Participaciones_en_eventos_a_nivel_internacional;
    const numero_trofeos=d.numero_de_trofeos_conseguidos;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${nombre}</td>
    <td>${apellidos}</td>
    <td>${fecha_nacimiento.dia}/${fecha_nacimiento.mes}/${fecha_nacimiento.año}</td>
    <td>${participaciones_comp_oficiales}</td>
    <td>${participaciones_comp_internacional}</td>
    <td>${numero_trofeos}</td>
    </tr>
    `;
}



/*HISTORIA DE USUARIO 6 */



Parkour.personaComoFormulario = function (persona) {
    return Parkour.ParkourFormularioPersona.actualiza( persona );
}

Parkour.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Parkour.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Parkour.almacenaDatos(persona)
}


Parkour.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/parkour/getPorId/" + idPersona 
        const response = await fetch(url);
            if (response) {
                const persona = await response.json()
                callBackFn(persona)
            }
    } catch (error) {
            alert("ErrorRecuperaUnaPersona: No se han podido acceder al API Gateway")
            console.error(error)
        }
}

Parkour.mostrarP = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}

Parkour.ParkourTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "COMPETICIONES_OFICIALES": "### COMPETICIONES_OFICIALES ###",
    "PARTICIPACIONES_INTERNACIONALES": "### PARTICIPACIONES_INTERNACIONALES ###",
    "TROFEOS_CONSEGUIDOS": "### TROFEOS_CONSEGUIDOS ###",
}

Parkour.sustituyeTags = function (Parkour, persona) {
    return Parkour
        .replace(new RegExp(Parkour.ParkourTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Parkour.ParkourTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Parkour.ParkourTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Parkour.ParkourTags.COMPETICIONES_OFICIALES, 'g'), persona.data.participaciones_en_competiciones_oficiales)
        .replace(new RegExp(Parkour.ParkourTags.PARTICIPACIONES_INTERNACIONALES, 'g'), persona.data.Participaciones_en_eventos_a_nivel_internacional)
        .replace(new RegExp(Parkour.ParkourTags.TROFEOS_CONSEGUIDOS, 'g'), persona.data.numero_de_trofeos_conseguidos)   
}

Parkour.ParkourFormularioPersona = {}

Parkour.form = {
    ID: "form-persona-id",
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    COMPETICIONES_OFICIALES: "form-persona-competiciones_oficiales",
    PARTICIPACIONES_INTERNACIONALES: "form-persona-participaciones-internacionales",
    TROFEOS_CONSEGUIDOS: "form-persona-trofeosConseguidos",
}

Parkour.ParkourFormularioPersona.actualiza = function (persona) {
    return Parkour.sustituyeTags(this.formulario, persona)
}

Parkour.ParkourFormularioPersona.formulario = `
<form method='post' action=''>
    <table class="listado-proyectos">
        <thead>
            <th>Id</th>
            <th>Nombre</th>
            <th>APELLIDOS</th>
            <th></th>
            <th>COMPETICIONES_OFICIALES</th>
            <th></th>
            <th>PARTICIPACIONES_INTERNACIONALES</th>
            <th>TROFEOS_CONSEGUIDOS</th>
        </thead>
        <tbody>
            <tr title="${Parkour.ParkourTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Parkour.ParkourTags.ID}" 
                        name="id_persona"/></td>
                        
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Parkour.ParkourTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apellidos" required value="${Parkour.ParkourTags.APELLIDOS}" 
                        name="apellidos_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-competiciones_oficiales" required value="${Parkour.ParkourTags.COMPETICIONES_OFICIALES}" 
                        name="competiciones_oficiales"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-participaciones_oficiales" required value="${Parkour.ParkourTags.PARTICIPACIONES_INTERNACIONALES}" 
                        name="participaciones_oficiales"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-trofeosConseguidos" required value="${Parkour.ParkourTags.TROFEOS_CONSEGUIDOS}" 
                        name="trofeos_conseguidos"/></td>
            </tr>
        </tbody>
    </table>
</form>
`;



Parkour.personaMostrada = null

Parkour.almacenaDatos = function (persona) {
    Parkour.personaMostrada = persona;
}



/*FUNCIONES PARA HU8 */

Parkour.listarBuscador= function (search){ 
    this.recuperaBuscador(this.imprime,search);
}
  
  
Parkour.recuperaBuscador = async function (callBackFn,nombre) { 
    let response = null
  
    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/parkour/getTodas"
        response = await fetch(url)
  
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }
  
    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === nombre )
        callBackFn(filtro)
    }
}





/*FUNCIONES PARA HU12 */


/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Parkour.ModificarDatos = function () {
    Parkour.recupera(Parkour.imprimeMuchasPersonas);
}


Parkour.ParkourTablaPersonas = {}

Parkour.ParkourTablaPersonas.cabecera = `<table width="100%" class="listado-proyectos">
                    <thead>
                        <th>Id</th>
                        <th>nombre</th>
                        <th>apellidos</th>
                        <th>fecha_nacimiento</th>
                        <th>participaciones_comp_oficiales</th>
                        <th>participaciones_comp_internacional</th>
                        <th>numero_trofeos</th>
                    </thead>
                    <tbody>`;

Parkour.ParkourTablaPersonas.cuerpo = `
    <tr title="${Parkour.ParkourTags.ID}">
        <td>${Parkour.ParkourTags.ID}</td>
        <td>${Parkour.ParkourTags.NOMBRE}</td>
        <td>${Parkour.ParkourTags.APELLIDOS}</td>
        <td>${Parkour.ParkourTags.COMPETICIONES_OFICIALES}</td>
        <td>${Parkour.ParkourTags.PARTICIPACIONES_INTERNACIONALES}</td>
        <td>${Parkour.ParkourTags.TROFEOS_CONSEGUIDOS}</td>
        <td>
                    <div><a href="javascript:Parkour.mostrar('${Parkour.ParkourTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;
Parkour.ParkourTablaPersonas.pie = `</tbody>
             </table>
             `;
Parkour.ParkourTablaPersonas.actualiza = function (persona) {
        
    return Parkour.sustituyeTags(this.cuerpo, persona)
}

Parkour.ParkourFormularioPersona.actualiza2 = function (persona) {
    return Parkour.sustituyeTags(this.formulario1, persona)
}




Parkour.personaComoTabla = function (persona) {
    return Parkour.ParkourTablaPersonas.cabecera
        + Parkour.ParkourTablaPersonas.actualiza(persona)
        + Parkour.ParkourTablaPersonas.pie;
}





Parkour.personaComoFormulario2 = function (persona) {
    return Parkour.ParkourFormularioPersona.actualiza2( persona );
}


/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Parkour.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Parkour.ParkourTablaPersonas.cabecera
    vector.forEach(e => msj += Parkour.ParkourTablaPersonas.actualiza(e))
    msj += Parkour.ParkourTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizarBoton("Listado de proyectos", msj)
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Parkour.imprimePersona = function (persona) { 
    let msj = Parkour.personaComoFormulario(persona);

    Frontend.Article.actualizar("Mostrar una persona", msj)

    Parkour.almacenaDatos(persona)
}

Parkour.imprimePersona2 = function (persona) {
    let msj = Parkour.personaComoFormulario2(persona);

    Frontend.Article.actualizar("Mostrar participante", msj)

    Parkour.almacenaDatos(persona)
}

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Parkour.almacenaDatos = function (persona) {
    Parkour.personaMostrada = persona;
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */

Parkour.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}



/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Parkour.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Parkour.form) {
        document.getElementById(Parkour.form[campo]).disabled = deshabilitando
    }
    return this
}


/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Parkour.deshabilitarCamposEditables = function () {
    Parkour.habilitarDeshabilitarCamposEditables(true)
    return this
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Parkour.habilitarCamposEditables = function () {
    Parkour.habilitarDeshabilitarCamposEditables(false)
    return this
}


/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */


//NADA
Parkour.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Parkour.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}


/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Parkour.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Parkour.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}


/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Parkour.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}


/**
 * Función que permite modificar los datos de una persona
 */
Parkour.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Parkour.cancelar = function () {
    this.imprimePersona2(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}




Parkour.recuperaBuscar2 = async function (callBackFn,nombre) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/parkour/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        const filtro=vectorPersonas.data.filter(persona => persona.data.nombre === nombre)
        callBackFn(filtro)
    }
}


/**
 * Función para guardar los nuevos datos de una persona
 */
Parkour.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/parkour/setTodo/"
        let id_persona = document.getElementById("form-persona-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_persona": id_persona,
                "nombre_persona": document.getElementById("form-persona-nombre").value,
                "apellidos_persona": document.getElementById("form-persona-apellidos").value,
                "apellidos_persona": document.getElementById("form-persona-apellidos").value,
                "competicionesOficiales_persona": document.getElementById("form-persona-competiciones_oficiales").value,
                "trofeosConseguidos_persona": document.getElementById("form-persona-trofeosConseguidos").value,
            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Parkour.mostrar(id_persona)
    } catch (error) {
        alert("ErrorGuardar: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}


Parkour.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimePersona2);
}


Parkour.ParkourFormularioPersona.formulario1 = `
<form method='post' action=''>
    <table class="listado-proyectos">
        <thead>
            <th>Id</th>
            <th>Nombre</th>
            <th>APELLIDOS</th>
            <th></th>
            <th>COMPETICIONES_OFICIALES</th>
            <th></th>
            <th>PARTICIPACIONES_INTERNACIONALES</th>
            <th>TROFEOS_CONSEGUIDOS</th>
        </thead>
        <tbody>
            <tr title="${Parkour.ParkourTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Parkour.ParkourTags.ID}" 
                        name="id_persona"/></td>
                        
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Parkour.ParkourTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apellidos" required value="${Parkour.ParkourTags.APELLIDOS}" 
                        name="apellidos_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-competiciones_oficiales" required value="${Parkour.ParkourTags.COMPETICIONES_OFICIALES}" 
                        name="competiciones_oficiales"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-participaciones_oficiales" required value="${Parkour.ParkourTags.PARTICIPACIONES_INTERNACIONALES}" 
                        name="participaciones_oficiales"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-trofeosConseguidos" required value="${Parkour.ParkourTags.TROFEOS_CONSEGUIDOS}" 
                        name="trofeos_conseguidos"/></td>

                <td>
                        <div><a href="javascript:Parkour.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                        <div><a href="javascript:Parkour.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                        <div><a href="javascript:Parkour.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>        
            </tr>
        </tbody>
    </table>
</form>
`;







/*FUNCIONES PARA HU9 */


Parkour.buscarCampos = function (search2) {
    this.BuscaCampos(this.imprimeTodo,search2)
}


Parkour.BuscaCampos = async function (callBackFn,dato) { 
    let response = null
  
    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/parkour/getTodas"
        response = await fetch(url)
  
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }
  
    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === dato ||  persona.data.apellidos === dato ||  persona.data.fecha_de_nacimiento.dia === dato ||  persona.data.fecha_de_nacimiento.mes === dato || persona.data.fecha_de_nacimiento.año === dato || persona.data.participaciones_en_competiciones_oficiales === dato)
        callBackFn(filtro)
    }
}