/**
 * @file Gimnasia.js
 * @description Funciones para el procesamiento de la info enviada por el MS Gimnasia
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Gimnasia = {};

// Gimnasia de datosDescargados vacíos
Gimnasia.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Gimnasia al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Gimnasia.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Gimnasia
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Gimnasia
 */
Gimnasia.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Gimnasia Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Gimnasia
 */
Gimnasia.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Gimnasia Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Gimnasia.procesarHome = function () {
    this.descargarRuta("/gimnasia/", this.mostrarHome);
}

Gimnasia.listar = function () { //no TDD -> funcion async
    this.recupera(this.imprime);
}


Gimnasia.listarAlfb = function () { //no TDD -> funcion async
    (this.recuperaAlf(this.imprimee));
}

Gimnasia.listarPersona = function () { //no TDD -> funcion async
    this.recupera(this.imprimee);
}

Gimnasia.pieTable = function () { //hecho el TDD
    return "</tbody></table>";
}

Gimnasia.imprime = function (vector) { //hecho el TDD
    let msj = "";
    msj += Gimnasia.cabeceraTable();
    vector.forEach(e => msj += Gimnasia.cuerpoTr(e))
    msj += Gimnasia.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de proyectos", msj )
}

Gimnasia.imprimee = function (vector) { //hecho el TDD
    let msj = "";
    msj += Gimnasia.cabeceraTablee();
    vector.forEach(e => msj += Gimnasia.cuerpoTrr(e))
    msj += Gimnasia.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de proyectos", msj )
}


Gimnasia.recupera = async function (callBackFn) { //no TDD -> funcion async
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/gimnasia/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("ErrorRecupera: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

Gimnasia.recuperaAlf = async function (callBackFn) { //no TDD -> funcion async
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/gimnasia/getTodas"
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

Gimnasia.cabeceraTable = function () {  //hecho el TDD
    return `<table class="listado-proyectos">
        <thead>
        <th>Nombre</th><th>Fecha</th><th>Pais</th><th>Edad</th><th>Modalidad</th><th>Grupo</th><th>AniosJJOO</th>
        </thead>
        <tbody>
    `;
}

Gimnasia.cabeceraTablee = function () { //hecho el TDD
    return `<table class="listado-proyectos">
        <thead>
        <th>Nombre de los participantes</th>
        </thead>
        <tbody>
    `;
}

Gimnasia.cuerpoTr = function (p) { //FALTA POR HACER, ERROR
    const d = p.data
    const Nombre = d.nombre;
    const fecha = d.fechaNacimiento;
    const Pais = d.pais;
    const Edad=d.edad;
    const Modalidad=d.modalidad;
    const Grupo=d.grupo;
    const AniosJJOO=d.aniosJJOO;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${Nombre}</td>
    <td>${fecha.dia}/${fecha.mes}/${fecha.año}</td>
    <td>${Pais}</td>
    <td>${Edad}</td>
    <td>${Modalidad}</td>
    <td>${Grupo}</td>
    <td>${AniosJJOO}</td>
    </tr>
    `;
}

Gimnasia.cuerpoTrr = function (p) { //hecho el TDD
    const d = p.data
    const Nombre = d.nombre;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${Nombre}</td>
    </tr>
    `;
}

Gimnasia.procesarAcercaDe = function () {
    this.descargarRuta("/gimnasia/acercade", this.mostrarAcercaDe);
}


// Hasta aqui lo nuevo

Gimnasia.form = { //hecho el TDD
    ID: "form-persona-id",
    NOMBRE: "form-persona-nombre",
    PAIS: "form-persona-pais",
    EDAD: "form-persona-edad",
    MODALIDAD: "form-persona-modalidad",
    GRUPO: "form-persona-grupo",
    AniosJJOO: "form-persona-aniosjjoo"
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Gimnasia.personaMostrada = null


Gimnasia.plantillaTags = { //hecho el TDD
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "PAIS": "### PAIS ###",
    "EDAD": "### EDAD ###",
    "MODALIDAD": "### MODALIDAD ###",
    "GRUPO": "### GRUPO ###",
    "AniosJJOO": "### AniosJJOO ###",
}

Gimnasia.plantillaFormularioPersona = {}

//hecho el TDD
Gimnasia.plantillaFormularioPersona.formulario = ` 
<form method='post' action=''>
    <table class="listado-proyectos">
        <thead>
            <th>Id</th>
            <th>Nombre</th>
            <th>Pais</th>
            <th></th>
            <th>Edad</th>
            <th></th>
            <th>Modalidad</th>
            <th></th>
            <th>Grupo</th>
            <th>AniosJJOO</th>
        </thead>
        <tbody>
            <tr title="${Gimnasia.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Gimnasia.plantillaTags.ID}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Gimnasia.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-pais" required value="${Gimnasia.plantillaTags.PAIS}" 
                        name="pais_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-edad" required value="${Gimnasia.plantillaTags.EDAD}" 
                        name="edad_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-modalidad" required value="${Gimnasia.plantillaTags.MODALIDAD}"
                        name="modalidad_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-grupo" required value="${Gimnasia.plantillaTags.GRUPO}" 
                        name="grupo_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-aniosjjoo" required value="${Gimnasia.plantillaTags.AniosJJOO}" 
                        name="aniosjjoo_persona"/></td>
            </tr>
        </tbody>
    </table>
</form>
`; //hecho el TDD

//HECHO el TDD
Gimnasia.plantillaFormularioPersona.formulario1 = `
<form method='post' action=''>
    <table width="100%" class="listado-proyectos">
        <thead>
            <th width="20%">Id</th>
            <th width="20%">Nombre</th>
            <th width="20%">Pais</th>
            <th/th>
            <th width="10%">Edad</th>
            <th/th>
            <th width="20%">Grupo</th>
            <th width="40%">Acciones</th>
        </thead>
        <tbody>
            <tr title="${Gimnasia.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Gimnasia.plantillaTags.ID}"
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Gimnasia.plantillaTags.NOMBRE}"
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-pais" required value="${Gimnasia.plantillaTags.PAIS}"
                        name="pais_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-edad" required value="${Gimnasia.plantillaTags.EDAD}"
                        name="edad_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-grupo" required value="${Gimnasia.plantillaTags.GRUPO}"
                        name="grupo_persona"/></td>
                <td>
                    <div><a href="javascript:Gimnasia.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Gimnasia.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Gimnasia.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;
//hecho el TDD



/// Gimnasia para poner los datos de varias personas dentro de una tabla
Gimnasia.plantillaTablaPersonas = {}

Gimnasia.listarParaForm= function (search){ //no se hace TDD porque es asyncPo
    this.recuperaBuscar(this.imprime,search);
}


//hecho el TDD
Gimnasia.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-proyectos">
                    <thead>
                        <th width="20%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Pais</th>
                        <th width="20%">Edad</th>
                        <th width="20%">Grupo</th>
                        <th width="10%">Acciones</th>
                    </thead>
                    <tbody>
    `;

Gimnasia.recuperaUnaPersona = async function (idPersona, callBackFn) { //no se hace TDD porque es asyncPo
    try {
        const url = Frontend.API_GATEWAY + "/gimnasia/getPorId/" + idPersona
        console.log("url: ",url);
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

Gimnasia.mostrar = function (idPersona) { //no se hace TDD porque es asyncPo
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona12);
}

//TDD SIN HACER
Gimnasia.plantillaTablaPersonas.cuerpo = `
    <tr title="${Gimnasia.plantillaTags.ID}">
        <td>${Gimnasia.plantillaTags.ID}</td>
        <td>${Gimnasia.plantillaTags.NOMBRE}</td>
        <td>${Gimnasia.plantillaTags.PAIS}</td>
        <td>${Gimnasia.plantillaTags.EDAD}</td>
        <td>${Gimnasia.plantillaTags.GRUPO}</td>
        <td>
                    <div><a href="javascript:Gimnasia.mostrar('${Gimnasia.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

//hecho el TDD
Gimnasia.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


Gimnasia.sustituyeTags = function (gimnasia, persona) {   //hecho el TDD
    return gimnasia
    .replace(new RegExp(Gimnasia.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
    .replace(new RegExp(Gimnasia.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
    .replace(new RegExp(Gimnasia.plantillaTags.PAIS, 'g'), persona.data.pais)
    .replace(new RegExp(Gimnasia.plantillaTags.EDAD, 'g'), persona.data.edad)
    .replace(new RegExp(Gimnasia.plantillaTags.MODALIDAD, 'g'), persona.data.modalidad)
    .replace(new RegExp(Gimnasia.plantillaTags.GRUPO, 'g'), persona.data.grupo)
    .replace(new RegExp(Gimnasia.plantillaTags.AniosJJOO, 'g'), persona.data.aniosJJOO)
}


Gimnasia.plantillaTablaPersonas.actualiza = function (persona) {  //hecho el TDD
    return Gimnasia.sustituyeTags(this.cuerpo, persona)
}


Gimnasia.plantillaFormularioPersona.actualiza = function (persona) { //hecho el TDD
    return Gimnasia.sustituyeTags(this.formulario, persona)
}

Gimnasia.plantillaFormularioPersona.actualiza12 = function (persona) { //hecho el TDD
    return Gimnasia.sustituyeTags(this.formulario1, persona)
}

Gimnasia.mostrarP = function (idPersona) { // hecho el TDD, pero no se deberia de hacer porque es asincrona
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}


Gimnasia.personaComoTabla = function (persona) { // SIN HACER EL TDD
    return Gimnasia.plantillaTablaPersonas.cabecera
        + Gimnasia.plantillaTablaPersonas.actualiza(persona)
        + Gimnasia.plantillaTablaPersonas.pie;
}


Gimnasia.personaComoFormulario = function (persona) {          //hecho el TDD
    return Gimnasia.plantillaFormularioPersona.actualiza( persona );
}

Gimnasia.personaComoFormulario12 = function (persona) {        //hecho el TDD
    return Gimnasia.plantillaFormularioPersona.actualiza12( persona );
}



Gimnasia.imprimeMuchasPersonas = function (vector) { //sin hacer el TDD
    let msj = Gimnasia.GimnasiaTablaPersonas.cabecera
    vector.forEach(e => msj += Gimnasia.plantillaTablaPersonas.actualiza(e))
    msj += Gimnasia.GimnasiaTablaPersonas.pie

    
    Frontend.Article.actualizarBoton("Listado de proyectos", msj)
}


Gimnasia.imprimeUnaPersona = function (persona) {          // hecho el TDD
    let msj = Gimnasia.personaComoFormulario(persona);

    Frontend.Article.actualizar("Mostrar a Marta Ruiz", msj)

    Gimnasia.almacenaDatos(persona)
}

Gimnasia.imprimeUnaPersona12 = function (persona) {        // hecho el TDD
    let msj = Gimnasia.personaComoFormulario12(persona);

    Frontend.Article.actualizar("Mostrar participante", msj)

    Gimnasia.almacenaDatos(persona)
}


Gimnasia.almacenaDatos = function (persona) {              // hecho el TDD
    Gimnasia.personaMostrada = persona;
}



Gimnasia.recuperaDatosAlmacenados = function () {         // hecho el TDD 
    return this.personaMostrada;
}


Gimnasia.listar2 = function () {     //no se hace TDD, es async                      
    Gimnasia.recupera(Gimnasia.imprimeMuchasPersonas);
}



Gimnasia.habilitarDeshabilitarCamposEditables = function (deshabilitando) {       //TDD hecho
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Gimnasia.form) {
        document.getElementById(Gimnasia.form[campo]).disabled = deshabilitando
    }
    return this
}



Gimnasia.deshabilitarCamposEditables = function () {    //TDD hecho
    Gimnasia.habilitarDeshabilitarCamposEditables(true)
    return this
}


                                                                                        
Gimnasia.habilitarCamposEditables = function () {      //TDD hecho
    Gimnasia.habilitarDeshabilitarCamposEditables(false)
    return this
}



Gimnasia.opcionesMostrarOcultar = function (classname, mostrando) {     //TDD hecho
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}


Gimnasia.ocultarOpcionesSecundarias = function () {    //TDD hecho
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}



Gimnasia.mostrarOpcionesSecundarias = function () { //TDD hecho
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}



Gimnasia.mostrarOcionesTerciariasEditar = function () {  //TDD hecho
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}



Gimnasia.ocultarOcionesTerciariasEditar = function () {  //TDD hecho
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}



Gimnasia.editar = function () {    //TDD hecho
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}


Gimnasia.cancelar = function () {    //TDD hecho
    this.imprimeUnaPersona12(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

Gimnasia.listarBuscar= function (search){      //no se hace TDD, es async
    this.recuperaBuscar(this.imprime,search);
    
}

Gimnasia.listarBuscar2= function (search){     //no se hace TDD, es async
    this.recuperaBuscar2(this.imprime,search);
}

Gimnasia.recuperaBuscar = async function (callBackFn,nombre) {     //no se hace TDD, es async
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/gimnasia/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("ErrorRecuperaBuscar: No se han podido acceder al API Gateway")
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

Gimnasia.recuperaBuscar2 = async function (callBackFn,nombre) {    //no se hace TDD, es async
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/gimnasia/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("ErrorRecuperaBuscar2: No se han podido acceder al API Gateway")
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


Gimnasia.guardar = async function () {     //no se hace TDD, es async
    try {
        let url = Frontend.API_GATEWAY + "/gimnasia/setTodo/"
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
                "pais_persona": document.getElementById("form-persona-pais").value,
                "edad_persona": document.getElementById("form-persona-edad").value,
                "grupo_persona": document.getElementById("form-persona-grupo").value,
            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Gimnasia.mostrar(id_persona)
    } catch (error) {
        alert("ErrorGuardar: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}


Gimnasia.historia10 = function(term1, term2, term3, term4) {
    this.recuperahistoria10(this.imprime, term1, term2, term3, term4);
}

Gimnasia.recuperahistoria10 = async function(callBackFn, nombre, edad, pais, grupo) {
    let response = null;
    try {
        const url = Frontend.API_GATEWAY + "/gimnasia/getTodas";
        response = await fetch(url);
    } catch (error) {
        alert("ErrorRecuperaHistoria10: No se pudo acceder al API Gateway. Intente de nuevo más tarde.");
        console.error(error);
    }
    
    let vectorPersonas = null;
    if (response) {
        vectorPersonas = await response.json();
        const filtro = vectorPersonas.data.filter(persona => 
            persona.data.nombre.includes(nombre) && 
            persona.data.edad.includes(edad) && 
            persona.data.pais.includes(pais) && 
            persona.data.grupo.includes(grupo));
        callBackFn(filtro);
    }
}
















