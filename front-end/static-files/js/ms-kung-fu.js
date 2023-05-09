/**
 * @file KungFu.js
 * @description Funciones para el procesamiento de la info enviada por el MS KungFu
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let KungFu = {};
KungFu.jugadorMostrado = null

// KungFu de datosDescargados vacíos
KungFu.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// KungFu de datosJugadores vacíos
KungFu.datosJugadoresNulos = {
    id: "undefined",
    nombre: "undefined",
    apellidos: "undefined",
    fecha_nacimiento: "undefined",
    direccion: "undefined",
    numero_particiapciones_Juegos_olimpicos: "undefined",
    años_participacion_juegos_olimpicos: "undefined",
    color_cinturon: "undefined",
    nombre_gimnasio: "undefined"
}

KungFu.KungFuTags = {
    "ID": "### ID ###",
    "NOMBRE_COMPLETO": "### NOMBRE_COMPLETO ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDS ###",
    "FECHA_NACIMIENTO": "### FECHA DE NACIMIENTO ###",
    "DIRECCION": "### DIRECCION ###",
    "NUMERO_PARTICIPACIONES": "### NUMERO PARTICIPACIONES ###",
    "AÑOS PARTICIPACION": "### AÑOS PARTICIPACION ###",
    "COLOR_CINTURON": "### COLOR_CINTURON ###",
    "NOMBRE_GIMNASIO": "### NOMBRE DEL GIMNASIO ###"
}

KungFu.jugadorComoTabla = function (jugador) {
    return KungFu.KungFuTablaJugadores.cabeceraEspecifico
        + KungFu.KungFuTablaJugadores.actualizaEspecifico(jugador)
        + KungFu.KungFuTablaJugadores.pie;
}

/**
 * Función que descarga la info MS KungFu al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
KungFu.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio KungFu
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS KungFu
 */
KungFu.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("KungFu Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS KungFu
 */
KungFu.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("KungFu Acerca de", mensajeAMostrar)
}

// KungFu para poner los datos de varios jugadores dentro de una tabla
KungFu.KungFuTablaJugadores = {}

// Cabecera de la tabla
KungFu.KungFuTablaJugadores.cabecera = `<table width="100%" class="listado_jugadores">
    <thead>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Fecha de nacimiento</th>
        <th>Dirección</th>
        <th>Número participaciones</th>
        <th>Años participación</th>
        <th>Color cinturón</th>
        <th>Nombre del gimnasio</th>
        <th>Acción</th>
    </thead>
<tbody>`;

// Cabecera de la tabla
KungFu.KungFuTablaJugadores.cabeceraEspecifico = `<table width="100%" class="listado_jugadores">
    <thead>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Fecha de nacimiento</th>
        <th>Dirección</th>
        <th>Número participaciones</th>
        <th>Años participación</th>
        <th>Color cinturón</th>
        <th>Nombre del gimnasio</th>
    </thead>
<tbody>`;

// Cabecera de la tabla para solo los nombres
KungFu.KungFuTablaJugadores.cabeceraNombres = `<table width="100%" class="listado_jugadores">
<thead>
    <th width="5%">ID</th>
    <th width="15%">Nombre</th>
    <th width="10%">Apellidos</th>
</thead>
<tbody>`;

//Elementos RT que muestra los datos de un jugador
KungFu.KungFuTablaJugadores.cuerpo = `
<tr title="${KungFu.KungFuTags.ID}">
    <td>${KungFu.KungFuTags.ID}</td>
    <td>${KungFu.KungFuTags.NOMBRE}</td>
    <td>${KungFu.KungFuTags.APELLIDOS}</td>
    <td>${KungFu.KungFuTags["FECHA_NACIMIENTO"]}</td>
    <td>${KungFu.KungFuTags.DIRECCION}</td>
    <td>${KungFu.KungFuTags.NUMERO_PARTICIPACIONES}</td>
    <td>${KungFu.KungFuTags["AÑOS PARTICIPACION"]}</td>
    <td>${KungFu.KungFuTags.COLOR_CINTURON}</td>
    <td>${KungFu.KungFuTags.NOMBRE_GIMNASIO}</td>
    <td>
        <div><a href="javascript:KungFu.mostrar('${KungFu.KungFuTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
    </td>
</tr>
`;

//Elementos RT que muestra los datos de un jugador
KungFu.KungFuTablaJugadores.cuerpoEspecifico = `
<tr title="${KungFu.KungFuTags.ID}">
    <td>${KungFu.KungFuTags.ID}</td>
    <td>${KungFu.KungFuTags.NOMBRE}</td>
    <td>${KungFu.KungFuTags.APELLIDOS}</td>
    <td>${KungFu.KungFuTags["FECHA_NACIMIENTO"]}</td>
    <td>${KungFu.KungFuTags.DIRECCION}</td>
    <td>${KungFu.KungFuTags.NUMERO_PARTICIPACIONES}</td>
    <td>${KungFu.KungFuTags["AÑOS PARTICIPACION"]}</td>
    <td>${KungFu.KungFuTags.COLOR_CINTURON}</td>
    <td>${KungFu.KungFuTags.NOMBRE_GIMNASIO}</td>
</tr>
`;

//Elementos RT que muestra los datos de un jugador
KungFu.KungFuTablaJugadores.cuerpoNombres = `
<tr title="${KungFu.KungFuTags.ID}">
    <td>${KungFu.KungFuTags.ID}</td>
    <td>${KungFu.KungFuTags.NOMBRE}</td>
    <td>${KungFu.KungFuTags.APELLIDOS}</td>
</tr>
`;

//pie de la tabla 
KungFu.KungFuTablaJugadores.pie = `</tbody>
</table>
`;

/**
 * Actualiza el cuerpo de la KungFu deseada con los datos de la persona que se le pasa
 * @param {String} KungFu Cadena conteniendo HTMLen la que se desea cambiar los campos de la KungFu por datos
 * @param {Jugador} jugador Objeto con los datos del jugador que queremos escribir en el TR
 * @returns La KungFu del cuerpo de la tabla con los datos actualizados
 */
KungFu.sustituyeTags = function (kungfu, jugador) {
    return kungfu
        .replace(new RegExp(KungFu.KungFuTags.ID, 'g'), jugador.ref['@ref'].id)
        .replace(new RegExp(KungFu.KungFuTags.NOMBRE, 'g'), jugador.data.nombre_completo.nombre)
        .replace(new RegExp(KungFu.KungFuTags.APELLIDOS, 'g'), jugador.data.nombre_completo.apellidos)
        .replace(new RegExp(KungFu.KungFuTags.FECHA_NACIMIENTO, 'g'), jugador.data.fecha_nacimiento.dia + "/" + jugador.data.fecha_nacimiento.mes + "/" + jugador.data.fecha_nacimiento.año)
        .replace(new RegExp(KungFu.KungFuTags.DIRECCION, 'g'), jugador.data.direccion.calle + ", " + jugador.data.direccion.localidad + ", " + jugador.data.direccion.provincia + ", " + jugador.data.direccion.pais)
        .replace(new RegExp(KungFu.KungFuTags.NUMERO_PARTICIPACIONES, 'g'), jugador.data.numero_particiapciones_Juegos_olimpicos)
        .replace(new RegExp(KungFu.KungFuTags["AÑOS PARTICIPACION"], 'g'), jugador.data.años_participacion_juegos_olimpicos)
        .replace(new RegExp(KungFu.KungFuTags.COLOR_CINTURON, 'g'), jugador.data.color_cinturon)
        .replace(new RegExp(KungFu.KungFuTags.NOMBRE_GIMNASIO, 'g'), jugador.data.nombre_gimnasio)
}
        
/**
 * Actualiza el cuerpo de la tabla con los datos de el jugadores que se le pasa
 * @param {Jugador} jugador Objeto con los datos de la persona que queremos escribir el TR
 * @returns La KungFu des cuerpo de la tabla con los datos actualizados
 */
KungFu.KungFuTablaJugadores.actualiza = function (jugador) {
    return KungFu.sustituyeTags(this.cuerpo, jugador)
}

/**
 * Actualiza el cuerpo de la tabla con los datos de el jugadores que se le pasa
 * @param {Jugador} jugador Objeto con los datos de la persona que queremos escribir el TR
 * @returns La KungFu des cuerpo de la tabla con los datos actualizados
 */
KungFu.KungFuTablaJugadores.actualizaEspecifico = function (jugador) {
    return KungFu.sustituyeTags(this.cuerpoEspecifico, jugador)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del jugadores que se le pasa
 * @param {Jugador} jugador Objeto con los datos de la persona que queremos escribir el TR
 * @returns La KungFu de cuerpo de la tabla con los datos actualizados
 */
KungFu.KungFuTablaJugadores.actualizaNombres = function (jugador) {
    return KungFu.sustituyeTags(this.cuerpoNombres, jugador)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del jugador que se le psas
 * @param {Jugador} jugador Objeto con los datos de la persona que queremos escribir el TR
 * @returns La KungFu de cuerpo de la tabla con los datos actualizados
 */
KungFu.KungFuTablaJugadores.actualizaNombresOrdenados = function (jugador) {
    return KungFu.sustituyeTags(this.cuerpoNombres, jugador)
}

/**
 * Función que recupera todos los jugadores llamando al MS KungFu 
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
KungFu.recupera = async function (callBackFn, orden) {
    let response = null

    // Intento conectar el microservicio KungFu
    try {
        const url = Frontend.API_GATEWAY + "/kungfu/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }

    //mostrar todos los jugadores que se han descargado
    let vectorJugadores = null
    if (response) {
        vectorJugadores = await response.json()
        callBackFn(vectorJugadores.data, orden)
    }
}

/**
 * Función que recupera todos los jugadores llamando al MS KungFu
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idJugador Identificador del jugador a mostrar
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
KungFu.recuperaUnJugador = async function (idJugador, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/kungfu/getPorId/" + idJugador
        const response = await fetch(url);
        if (response) {
            const jugador = await response.json()
            callBackFn(jugador)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

/**
 * Función que recupera todos los jugadores llamando al MS KungFu
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recperados.
 * @param {string} nombreBuscado El nombre del jugador buscado
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
KungFu.recuperaJugadorBuscado = async function (nombreBuscado, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/kungfu/getTodos"
        const response = await fetch(url);
        let vectorJugadores = null
        if (response) {
            vectorJugadores = await response.json()
            const filtro = vectorJugadores.data.filter(jugador => jugador.data.nombre_completo.nombre === nombreBuscado || jugador.data.nombre_completo.apellidos === nombreBuscado)
            callBackFn(filtro)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

//---

/**
 * Función que recupera todos los jugadores llamando al MS KungFu
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recperados.
 * @param {string} nombreBuscado El nombre del jugador buscado
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
KungFu.recuperaJugadoresCompleto = async function (nombreBuscado, callBackFn) {
    try {
        const urlKungFu = Frontend.API_GATEWAY + "/kungfu/getTodos"
        const urlEquitacion = Frontend.API_GATEWAY + "/equitacion/getNombres"
        const urlMotociclismo = Frontend.API_GATEWAY + "/motociclismo/getNombres"
        const urlParkour = Frontend.API_GATEWAY + "/parkour/getTodos"
        const urlGimnasia = Frontend.API_GATEWAY + "/gimnasia/getTodas"
        
        const responseKungFu = await fetch(urlKungFu);
        const responseEquitacion = await fetch(urlEquitacion);
        const responseMotociclismo = await fetch(urlMotociclismo);
        const responseParkour = await fetch(urlParkour);
        const responseGimnasia = await fetch(urlGimnasia);

        let vectorJugadoresKungFu = null
        let vectorJugadoresEquitacion = null
        let vectorJugadoresMotociclismo = null
        let vectorJugadoresParkour = null
        let vectorJugadoresGimnasia = null

        if (responseKungFu && responseEquitacion && responseMotociclismo && responseParkour && responseGimnasia) {
            vectorJugadoresKungFu = await responseKungFu.json()
            vectorJugadoresEquitacion = await responseEquitacion.json()
            vectorJugadoresMotociclismo = await responseMotociclismo.json()
            vectorJugadoresParkour = await responseParkour.json()
            vectorJugadoresGimnasia = await responseGimnasia.json()

            const filtroKungFu = vectorJugadoresKungFu.data.filter(jugador => jugador.data.nombre_completo.nombre === nombreBuscado)
            const filtroEquitacion = vectorJugadoresEquitacion.data.filter(jugador => jugador.data.nombre === nombreBuscado)
            const filtroMotociclismo = vectorJugadoresMotociclismo.data.filter(jugador => jugador.data.nombre === nombreBuscado)
            const filtroParkour = vectorJugadoresKungFu.data.filter(jugador => jugador.data.nombre === nombreBuscado)
            const filtroGimnasia = vectorJugadoresKungFu.data.filter(jugador => jugador.data.nombre === nombreBuscado)

            const todos = filtroKungFu + filtroParkour + filtroGimnasia + filtroEquitacion + filtroMotociclismo

            callBackFn(todos)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

//---

/**
 * Función que recupera todos los jugadores llamando al MS KungFu
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recperados.
 * @param {string} aspecto1 El primer aspecto que se busca
 * * @param {string} aspecto2 El segundo aspecto que se busca
 * * @param {string} aspecto3 El tercer aspecto que se busca
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
KungFu.recuperaJugadorBuscadoPorAspecto = async function (aspecto1, aspecto2, aspecto3, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/kungfu/getTodos"
        const response = await fetch(url);
        let vectorJugadores = null
        if (response) {
            vectorJugadores = await response.json()
            const filtro = vectorJugadores.data.filter(jugador => jugador.data.nombre_completo.nombre === aspecto1 || jugador.data.nombre_completo.apellidos === aspecto1 || jugador.data.fecha_nacimiento.dia === aspecto1 || jugador.data.fecha_nacimiento.mes === aspecto1 || jugador.data.fecha_nacimiento.año === aspecto1 || jugador.data.direccion.calle === aspecto1 || jugador.data.direccion.localidad === aspecto1 || jugador.data.direccion.provincia === aspecto1 || jugador.data.direccion.pais === aspecto1 || jugador.data.numero_particiapciones_Juegos_olimpicos === aspecto1 || jugador.data.años_participacion_juegos_olimpicos === aspecto1 || jugador.data.color_cinturon === aspecto1 || jugador.data.nombre_gimnasio === aspecto1 &&
                jugador.data.nombre_completo.nombre === aspecto2 || jugador.data.nombre_completo.apellidos === aspecto2 || jugador.data.fecha_nacimiento.dia === aspecto2 || jugador.data.fecha_nacimiento.mes === aspecto2 || jugador.data.fecha_nacimiento.año === aspecto2 || jugador.data.direccion.calle === aspecto2 || jugador.data.direccion.localidad === aspecto2 || jugador.data.direccion.provincia === aspecto2 || jugador.data.direccion.pais === aspecto2 || jugador.data.numero_particiapciones_Juegos_olimpicos === aspecto2 || jugador.data.años_participacion_juegos_olimpicos === aspecto2 || jugador.data.color_cinturon === aspecto2 || jugador.data.nombre_gimnasio === aspecto2 &&
                jugador.data.nombre_completo.nombre === aspecto3 || jugador.data.nombre_completo.apellidos === aspecto3 || jugador.data.fecha_nacimiento.dia === aspecto3 || jugador.data.fecha_nacimiento.mes === aspecto3 || jugador.data.fecha_nacimiento.año === aspecto3 || jugador.data.direccion.calle === aspecto3 || jugador.data.direccion.localidad === aspecto3 || jugador.data.direccion.provincia === aspecto3 || jugador.data.direccion.pais === aspecto3 || jugador.data.numero_particiapciones_Juegos_olimpicos === aspecto3 || jugador.data.años_participacion_juegos_olimpicos === aspecto3 || jugador.data.color_cinturon === aspecto3 || jugador.data.nombre_gimnasio === aspecto3)
            callBackFn(filtro)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

/**
 * Función que recupera todos los jugadores llamando al MS KungFu
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recperados.
 * @param {string} aspecto1 El primer aspecto que se busca
 * * @param {string} aspecto2 El segundo aspecto que se busca
 * * @param {string} aspecto3 El tercer aspecto que se busca
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
KungFu.recuperaJugadorBuscadoPorAspectoExacto = async function (aspecto1, aspecto2, aspecto3, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/kungfu/getTodos"
        const response = await fetch(url);
        let vectorJugadores = null
        if (response) {
            vectorJugadores = await response.json()
            const filtro = vectorJugadores.data.filter(jugador => jugador.data.nombre_completo.nombre === aspecto1 && jugador.data.direccion.provincia === aspecto2 && jugador.data.color_cinturon === aspecto3)
            callBackFn(filtro)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

/**
 * Función para mostrar los datos de todos los jugadores
 * que se han recuperado de la BBDD
 * @param {vector_de_jugadores} vector 
 */
KungFu.imprimeTodosJugadores = function (vector) {
    
    vector = vector || this.datosJugadoresNulos

    if (typeof vector !== "object") vector = this.datosJugadoresNulos

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = KungFu.KungFuTablaJugadores.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += KungFu.KungFuTablaJugadores.actualiza(e));
    }
    msj += KungFu.KungFuTablaJugadores.pie

    // Borrar toda la información de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("KungFu del listados de los datos de todos los jugadores" , msj)
}

//---

/**
 * Función para mostrar los datos de todos los jugadores
 * que se han recuperado de la BBDD
 * @param {vector_de_jugadores} vector 
 */
KungFu.imprimeTodos = function (vector) {
    
    vector = vector || this.datosJugadoresNulos

    if (typeof vector !== "object") vector = this.datosJugadoresNulos

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = KungFu.KungFuTablaJugadores.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += KungFu.KungFuTablaJugadores.actualiza(e));
    }
    msj += KungFu.KungFuTablaJugadores.pie

    // Borrar toda la información de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listados de los datos de todos los jugadores" , msj)
}

//---

/**
 * Función para mostrar solo los nombre de todos los jugadores
 * que se recuperan de la BBDD
 * @param {vector_de_jugadores} vector 
 */
KungFu.imprimeSoloNombres = function (vector) {

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = KungFu.KungFuTablaJugadores.cabeceraNombres

    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += KungFu.KungFuTablaJugadores.actualizaNombres(e));
    }
    msj += KungFu.KungFuTablaJugadores.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("KungFu del listado de los nombres de todos los jugadores", msj)
}

/**
 * Función que imprime todos los datos de todos los jugadores que se recuperan de la BBDD ordenados alfabéticamente
 * @param {vector_de_jugadores} vector 
 */
KungFu.imprimeOrdenados = function(vector) {

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = KungFu.KungFuTablaJugadores.cabeceraNombres

    if (vector && Array.isArray(vector)) {
        vector.sort(function(a, b) {
            let nombreA = a.data.nombre_completo.nombre.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
            let nombreB = b.data.nombre_completo.nombre.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
            if (nombreA < nombreB) {
                return -1;
            }
            if (nombreA > nombreB) {
                return 1;
            }
            return 0;
        });

        vector.forEach(e => msj += KungFu.KungFuTablaJugadores.actualizaNombresOrdenados(e));
    }
    msj += KungFu.KungFuTablaJugadores.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("KungFu del listado de los nombres de todos los jugadores ordenados", msj)
}

/**
 * Función que devuelve el numero pasado con dos cifras si no tiene
 * @param {entero} num numero para saber si es de una cifra o no
 * @returns devuelve el numero con dos cifras si no tiene
 */
KungFu.cerear = function(num) {
    if (num < 10) {
        return "0" + num.toString();
    } else {
        return num.toString();
    }
}

/**
 * Función que imprime todos los jugadores ordenado según como desee el usuario
 * @param {vector_de_jugadores} vector Array con todos los datos de todos los jugadores
 * @param {string} orden El tipo de orden deseado para ordenar los jugadores en la tabla
 */
KungFu.imprimeVariosOrdenados = function(vector, orden) {
    vector = vector || this.datosJugadoresNulos

    if (typeof vector !== "object") vector = this.datosJugadoresNulos

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = KungFu.KungFuTablaJugadores.cabecera

    if (vector && Array.isArray(vector)) {
        vector.sort(function(a, b){
            let campoA = null;
            let campoB = null;
            if(orden == 'fecha_nacimiento'){
                campoA = a.data[orden].año + "" +  KungFu.cerear(a.data[orden].mes) + "" + KungFu.cerear(a.data[orden].dia)
            
                campoB = b.data[orden].año + "" +  KungFu.cerear(b.data[orden].mes) + "" + KungFu.cerear(b.data[orden].dia)
            
            }else if (orden == 'nombre'){
                campoA = a.data.nombre_completo.nombre.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
                campoB = b.data.nombre_completo.nombre.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
            } else if (orden == 'apellido'){
                campoA = a.data.nombre_completo.apellidos.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
                campoB = b.data.nombre_completo.apellidos.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
            } else if (orden == 'provincia'){
                campoA = a.data.direccion.provincia.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
                campoB = b.data.direccion.provincia.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
            } else if (orden == 'color_cinturon'){
                campoA = a.data.color_cinturon.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
                campoB = b.data.color_cinturon.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
            } else if (orden == 'numero_particiapciones_Juegos_olimpicos'){
                campoA = a.data[orden] || 0;
                campoB = b.data[orden] || 0;
            }
            if (campoA < campoB) {
                return -1;
            }
            if (campoA > campoB) {
                return 1;
            }
            return 0;
        });
        
        vector.forEach(e => msj += KungFu.KungFuTablaJugadores.actualiza(e));
    }
    msj += KungFu.KungFuTablaJugadores.pie

    // Borrar toda la información de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("KungFu del listados de los datos de todos los jugadores ordenado según un criterio" , msj)
}

/**
 * Función que almacena en una variable el jugador mostrado actualmente
 * @param {vector} jugador Los datos del jugador mostrado
 */
KungFu.almacenaDatos = function (jugador) {
    KungFu.jugadorMostrado = jugador;
}

/**
 * Una función que imprime los datos de un jugador especifico en una tabla
 * @param {object} jugador El jugador buscado
 */
KungFu.imprimeUnJugador = function (jugador) {

    if (!jugador || typeof jugador !== "object") {
        elementoTitulo.innerHTML = "Mostrar los datos del jugador";

    } else {
        let msj = KungFu.jugadorComoTabla(jugador);
    
        //let msj = KungFu.jugadorComoFormulario(jugador);
        //Borrar toda la información de Article y la sustituyo por la que me interesa
        Frontend.Article.actualizarBoton("Mostrar los datos del jugador", msj)

        //Actualiza el objeto que guarda los datos mostrados
        KungFu.almacenaDatos(jugador)
    }
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
KungFu.procesarHome = function () {
    this.descargarRuta("/kungfu/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
KungFu.procesarAcercaDe = function () {
    this.descargarRuta("/kungfu/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para recuperar los jugadores desde el MS, y posteriormente imprimirlos
 */
KungFu.listarJugadores = function () {
    KungFu.recupera(KungFu.imprimeTodosJugadores);
}

/**
 * Función principal para recuperar solo los nombres de los jugadores desde el MS, y posteriormente imprimirlos
 */
KungFu.listarNombresJugadores = function () {
    KungFu.recupera(KungFu.imprimeSoloNombres);
}

/**
 * Función que muestra los datos de un jugador especifico
 * @param {string} idJugador id del jugador
 */
KungFu.mostrar = function (idJugador) {
    this.recuperaUnJugador(idJugador, this.imprimeUnJugador);
}

/**
 * Función que muestra el jugador con el nombre indicado
 * @param {string} nombreBuscado El nombre del jugador buscado
 */
KungFu.jugadorBuscado = function (nombreBuscado) {
    this.recuperaJugadorBuscado(nombreBuscado, this.imprimeTodosJugadores); 
}

//---

/**
 * Función que muestra el jugador con el nombre indicado
 * @param {string} nombreBuscado El nombre del jugador buscado
 */
KungFu.listarTodosJugadores = function (nombreBuscado) {
    this.recuperaJugadoresCompleto(nombreBuscado, this.imprimeTodos); 
}

//---

/**
 * Función que muestra el/los jugador/es con uno o varios aspectos indicados
 * @param {string} nombreBuscado El nombre del jugador buscado
 */
KungFu.jugadorBuscadoPorAspecto = function (aspecto1, aspecto2, aspecto3) {
    this.recuperaJugadorBuscadoPorAspecto(aspecto1, aspecto2, aspecto3, this.imprimeTodosJugadores); 
}

/**
 * Funcion que lista los nombres de los usuario ordenados alfabéticamente
 */
KungFu.listarNombresOrdenados = function() {
    KungFu.recupera(KungFu.imprimeOrdenados);
}

/**
 * Función que ordena los datos según como desee el usuario
 * @param {string} orden El orden deseado para ordenar los datos
 */
KungFu.listarOrdenados = function(orden) {
    KungFu.recupera(KungFu.imprimeVariosOrdenados, orden);
}

/**
 * Función que muestra el/los jugador/es con los aspectos indicados exactamente
 * @param {string} nombreBuscado El nombre del jugador buscado
 */
KungFu.jugadorBuscadoPorAspectoExactos = function (aspecto1, aspecto2, aspecto3) {
    this.recuperaJugadorBuscadoPorAspectoExacto(aspecto1, aspecto2, aspecto3, this.imprimeTodosJugadores); 
}