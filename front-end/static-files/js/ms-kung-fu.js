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

// Cabecera de la tabla para solo los nombres
KungFu.KungFuTablaJugadores.cabeceraNombresTodos = `<table width="100%" class="listado_jugadores">
<thead>
    <th>Nombre</th>
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

//Elementos RT que muestra los datos de un jugador
KungFu.KungFuTablaJugadores.cuerpoNombresTodos = `
<tr title="${KungFu.KungFuTags.ID}">
    <td>${KungFu.KungFuTags.NOMBRE}</td>
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

//############################################################################################################################################################

//EQUITACION
KungFu.equitacionTags = {
    ID: "### ID ###",
    NOMBRE: "### NOMBRE ###",
    APELLIDO: "### APELLIDO ###",
    FECHANACIMIENTODia: "### FECHA DE NACIMIENTO Día ###",
    FECHANACIMIENTOMes: "### FECHA DE NACIMIENTO Mes ###",
    FECHANACIMIENTOAnio: "### FECHA DE NACIMIENTO Anio ###",
    NACIONALIDAD: "### NACIONALIDAD ###",
    EDAD: "### EDAD ###",
    DISCIPLINAS: "### DISCIPLINAS ###",
    CABALLOS: "### CABALLOS ###",
    ANIOSPARTICPACIONJJOO: "### AÑOS DE PARTICIPACION EN LOS JJOO ###"
}

//MOTOCICLISMO
KungFu.motociclismoTags = {
    "NOMBRE": "### NOMBRE ###",
    "NOMBRE_EQUIPO": "### NOMBRE_EQUIPO ###",
    "TIPO_MOTO": "### TIPO_MOTO ###",
    "FECHA_NACIMIENTO": "### FECHA_NACIMIENTO ###",
    "ANIOS_EXPERIENCIA": "### ANIOS_EXPERIENCIA ###",
    "PUNTUACIONES_CARRERA": "### PUNTUACIONES_CARRERA ###",
    "MARCAS_MOTOCICLETAS": "### MARCAS_MOTOCICLETAS ###",
    "POSICION_CAMPEONATO": "### POSICION_CAMPEONATO ###",
}

//PARKOUR
KungFu.ParkourTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "COMPETICIONES_OFICIALES": "### COMPETICIONES_OFICIALES ###",
    "PARTICIPACIONES_INTERNACIONALES": "### PARTICIPACIONES_INTERNACIONALES ###",
    "TROFEOS_CONSEGUIDOS": "### TROFEOS_CONSEGUIDOS ###",
}

//GIMNASIA
KungFu.gimnasiaTags = { //hecho el TDD
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "PAIS": "### PAIS ###",
    "EDAD": "### EDAD ###",
    "MODALIDAD": "### MODALIDAD ###",
    "GRUPO": "### GRUPO ###",
    "AniosJJOO": "### AniosJJOO ###",
}
KungFu.sustituyeTagsEquitacion = function (equitacion, deportista) {
    return equitacion
         .replace(new RegExp(KungFu.equitacionTags.ID, 'g'), deportista.ref['@ref'].id)
         .replace(new RegExp(KungFu.equitacionTags.NOMBRE, 'g'), deportista.data.nombre)
         .replace(new RegExp(KungFu.equitacionTags.APELLIDO, 'g'), deportista.data.apellido)
         .replace(new RegExp(KungFu.equitacionTags.FECHANACIMIENTODia, 'g'), deportista.data.fechaNacimiento.dia)
         .replace(new RegExp(KungFu.equitacionTags.FECHANACIMIENTOMes, 'g'), deportista.data.fechaNacimiento.mes)
         .replace(new RegExp(KungFu.equitacionTags.FECHANACIMIENTOAnio, 'g'), deportista.data.fechaNacimiento.anio)
         .replace(new RegExp(KungFu.equitacionTags.NACIONALIDAD, 'g'), deportista.data.nacionalidad)
         .replace(new RegExp(KungFu.equitacionTags.EDAD, 'g'), deportista.data.edad)
         .replace(new RegExp(KungFu.equitacionTags.DISCIPLINAS, 'g'), deportista.data.disciplinas)
         .replace(new RegExp(KungFu.equitacionTags.CABALLOS, 'g'), deportista.data.caballos)
         .replace(new RegExp(KungFu.equitacionTags.ANIOSPARTICPACIONJJOO, 'g'), deportista.data.aniosParticipacionJJOO)
}
KungFu.sustituyeTagsMotociclismo = function (motociclismo, persona) {
    return motociclismo
        .replace(new RegExp(KungFu.motociclismoTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(KungFu.motociclismoTags.NOMBRE_EQUIPO, 'g'), persona.data.nombre_equipo)
        .replace(new RegExp(KungFu.motociclismoTags.TIPO_MOTO, 'g'), persona.data.tipo_moto)
        .replace(new RegExp(KungFu.motociclismoTags["FECHA_NACIMIENTO"], 'g'),  persona.data.fecha_nacimiento.dia + "/" + persona.data.fecha_nacimiento.mes + "/" + persona.data.fecha_nacimiento.anio)
        .replace(new RegExp(KungFu.motociclismoTags["ANIOS_EXPERIENCIA"], 'g'), persona.data.anios_experiencia.join( ", "))
        .replace(new RegExp(KungFu.motociclismoTags["PUNTUACIONES_CARRERA"], 'g'), persona.data.puntuaciones_carrera.join( ", "))
        .replace(new RegExp(KungFu.motociclismoTags["MARCAS_MOTOCICLETAS"], 'g'), persona.data.marcas_motocicletas.join( ", "))
        .replace(new RegExp(KungFu.motociclismoTags.POSICION_CAMPEONATO, 'g'), persona.data.posicion_campeonato)
        
}

KungFu.sustituyeTagsParkour = function (Parkour, persona) {
    return Parkour
        .replace(new RegExp(KungFu.ParkourTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(KungFu.ParkourTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(KungFu.ParkourTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(KungFu.ParkourTags.COMPETICIONES_OFICIALES, 'g'), persona.data.participaciones_en_competiciones_oficiales)
        .replace(new RegExp(KungFu.ParkourTags.PARTICIPACIONES_INTERNACIONALES, 'g'), persona.data.Participaciones_en_eventos_a_nivel_internacional)
        .replace(new RegExp(KungFu.ParkourTags.TROFEOS_CONSEGUIDOS, 'g'), persona.data.numero_de_trofeos_conseguidos)   
}

KungFu.sustituyeTagsGimnasia = function (gimnasia, persona) {   //hecho el TDD
    return gimnasia
    .replace(new RegExp(KungFu.gimnasiaTags.ID, 'g'), persona.ref['@ref'].id)
    .replace(new RegExp(KungFu.gimnasiaTags.NOMBRE, 'g'), persona.data.nombre)
    .replace(new RegExp(KungFu.gimnasiaTags.PAIS, 'g'), persona.data.pais)
    .replace(new RegExp(KungFu.gimnasiaTags.EDAD, 'g'), persona.data.edad)
    .replace(new RegExp(KungFu.gimnasiaTags.MODALIDAD, 'g'), persona.data.modalidad)
    .replace(new RegExp(KungFu.gimnasiaTags.GRUPO, 'g'), persona.data.grupo)
    .replace(new RegExp(KungFu.gimnasiaTags.AniosJJOO, 'g'), persona.data.aniosJJOO)
}

//07
//############################################################################################################################################################

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

//############################################################################################################################################################

KungFu.KungFuTablaJugadores.actualizaNombresKungfu = function (jugador) {
    return KungFu.sustituyeTags(this.cuerpoNombresTodos, jugador)
}

KungFu.KungFuTablaJugadores.actualizaNombresEquitacion = function (jugador) {
    return KungFu.sustituyeTagsEquitacion(this.cuerpoNombresTodos, jugador)
}

KungFu.KungFuTablaJugadores.actualizaNombresMotociclismo = function (jugador) {
    return KungFu.sustituyeTagsMotociclismo(this.cuerpoNombresTodos, jugador)
}

KungFu.KungFuTablaJugadores.actualizaNombresParkour = function (jugador) {
    return KungFu.sustituyeTagsParkour(this.cuerpoNombresTodos, jugador)
}
KungFu.KungFuTablaJugadores.actualizaNombresGimnasia = function (jugador) {
    return KungFu.sustituyeTagsGimnasia(this.cuerpoNombresTodos, jugador)
}

//############################################################################################################################################################

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

//############################################################################################################################################################

KungFu.recuperaJugadoresCompleto = async function (callBackFn) {
   
    let response_kungfu = null
    let response_equitacion = null
    let response_motociclismo = null
    let response_parkour = null
    let response_gimnasia = null

    // Intento conectar el microservicio KungFu
    try {
        const url_kungfu = Frontend.API_GATEWAY + "/kungfu/getTodos"
        const url_equitacion = Frontend.API_GATEWAY + "/equitacion/getTodosInfo"
        const url_motociclismo = Frontend.API_GATEWAY + "/motociclismo/getTodos"
        const url_parkour = Frontend.API_GATEWAY + "/parkour/getTodas"
        const url_gimnasia = Frontend.API_GATEWAY + "/gimnasia/getTodas"

        response_kungfu = await fetch(url_kungfu)
        response_equitacion = await fetch(url_equitacion)
        response_motociclismo = await fetch(url_motociclismo)
        response_parkour = await fetch(url_parkour)
        response_gimnasia = await fetch(url_gimnasia)

    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }

    //mostrar todos los jugadores que se han descargado
    let vectorJugadores_kungfu = null
    let vectorJugadores_equitacion = null
    let vectorJugadores_motociclismo = null
    let vectorJugadores_parkour = null
    let vectorJugadores_gimnasia = null

    if (response_kungfu && response_equitacion && response_motociclismo && response_parkour&& response_gimnasia) {
        vectorJugadores_kungfu = await response_kungfu.json()
        vectorJugadores_equitacion = await response_equitacion.json()
        vectorJugadores_motociclismo = await response_motociclismo.json()
        vectorJugadores_parkour = await response_parkour.json()
        vectorJugadores_gimnasia = await response_gimnasia.json()
        
        
        callBackFn(vectorJugadores_kungfu.data, vectorJugadores_equitacion.data, vectorJugadores_motociclismo.data, vectorJugadores_parkour.data, vectorJugadores_gimnasia.data)
    }
}

KungFu.recuperaJugadoresCompletoAlfabeticamente = async function (callBackFn) {

    let response_kungfu = null
    let response_equitacion = null
    let response_motociclismo = null
    let response_parkour = null
    let response_gimnasia = null



    
    // Intento conectar el microservicio KungFu
    try {
        const url_kungfu = Frontend.API_GATEWAY + "/kungfu/getTodos"
        const url_equitacion = Frontend.API_GATEWAY + "/equitacion/getTodosInfo"
        const url_motociclismo = Frontend.API_GATEWAY + "/motociclismo/getTodos"
        const url_parkour = Frontend.API_GATEWAY + "/parkour/getTodas"
        const url_gimnasia = Frontend.API_GATEWAY + "/gimnasia/getTodas"

        response_kungfu = await fetch(url_kungfu)
        response_equitacion = await fetch(url_equitacion)
        response_motociclismo = await fetch(url_motociclismo)
        response_parkour = await fetch(url_parkour)
        response_gimnasia = await fetch(url_gimnasia)

    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }

    //mostrar todos los jugadores que se han descargado
    let vectorJugadores_kungfu = null
    let vectorJugadores_equitacion = null
    let vectorJugadores_motociclismo = null
    let vectorJugadores_parkour = null
    let vectorJugadores_gimnasia = null

    if (response_kungfu && response_equitacion && response_motociclismo && response_parkour&& response_gimnasia) {
        vectorJugadores_kungfu = await response_kungfu.json()
        vectorJugadores_equitacion = await response_equitacion.json()
        vectorJugadores_motociclismo = await response_motociclismo.json()
        vectorJugadores_parkour = await response_parkour.json()
        vectorJugadores_gimnasia = await response_gimnasia.json()

        const vectorJugadores = vectorJugadores_kungfu
        .concat(vectorJugadores_equitacion)
        .concat(vectorJugadores_motociclismo)
        .concat(vectorJugadores_parkour)
        .concat(vectorJugadores_gimnasia);
      
        

        const [responseKungfu, responseEquitacion, responseMotociclismo, responseParkour, responseGimnasia] = await Promise.all([
            response_kungfu,
            response_equitacion,
            response_motociclismo,
            response_parkour,
            response_gimnasia
          ]);
          
          let responses = [responseKungfu, responseEquitacion, responseMotociclismo, responseParkour, responseGimnasia];
        // Ordenamos el vector resultante alfabéticamente
        vectorJugadores = await responses.json()
        vectorJugadores.data.sort((a, b) => {
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
        

        // Pasamos el vector ordenado a la función callBackFn
        callBackFn(vectorJugadores.data)
         }
}


//############################################################################################################################################################

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

//############################################################################################################################################################

KungFu.imprimeTodos = function (vectorJugadores_kungfu, vectorJugadores_equitacion, vectorJugadores_motociclismo, vectorJugadores_parkour, vectorJugadores_gimnasia) {
    
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = KungFu.KungFuTablaJugadores.cabeceraNombresTodos

    if (Array.isArray(vectorJugadores_kungfu) && Array.isArray(vectorJugadores_equitacion) && Array.isArray(vectorJugadores_motociclismo) && Array.isArray(vectorJugadores_parkour ) && Array.isArray(vectorJugadores_gimnasia)) {
        vectorJugadores_kungfu.forEach(e => msj += KungFu.KungFuTablaJugadores.actualizaNombresKungfu(e));
        vectorJugadores_equitacion.forEach(e => msj += KungFu.KungFuTablaJugadores.actualizaNombresEquitacion(e));
        vectorJugadores_motociclismo.forEach(e => msj += KungFu.KungFuTablaJugadores.actualizaNombresMotociclismo(e));
        vectorJugadores_parkour.forEach(e => msj += KungFu.KungFuTablaJugadores.actualizaNombresParkour(e));
        vectorJugadores_gimnasia.forEach(e => msj += KungFu.KungFuTablaJugadores.actualizaNombresGimnasia(e));
    }
    msj += KungFu.KungFuTablaJugadores.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Listado de los nombres de todos los jugadores de todos los deportes", msj)
}

//############################################################################################################################################################

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


//---

/**
 * Función que muestra el jugador con el nombre indicado
 * @param {string} nombreBuscado El nombre del jugador buscado
 */
KungFu.listarTodosJugadores = function () {
    this.recuperaJugadoresCompleto(this.imprimeTodos); 
}

//---

//---

/**
 * Función que muestra el jugador con el nombre indicado en orden alfabetico
 * @param {string} nombreBuscado El nombre del jugador buscado
 */
KungFu.listarTodosJugadoresAlfabeticamente = function () {
    this.recuperaJugadoresCompletoAlfabeticamente(this.imprimeTodos);
}
//---