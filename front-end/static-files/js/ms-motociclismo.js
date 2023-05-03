/**
 * @file Motociclismo.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Motociclismo = {};

// Plantilla de datosDescargados vacíos
Motociclismo.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Motociclismo.descargarRuta = async function (ruta, callBackFn) {
    let response = null

   // Intento conectar con el microservicio Plantilla
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Motociclismo.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Motociclismo Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Motociclismo.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Motociclismo Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Motociclismo.procesarHome = function () {
    this.descargarRuta("/motociclismo/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Motociclismo.procesarAcercaDe = function () {
    this.descargarRuta("/motociclismo/acercade", this.mostrarAcercaDe);
}

//HU 04 : Ver un listado con todos los datos de todos los jugadores/equipos.

/**
 * Función que recuperar todos los datos llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Motociclismo.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/motociclismo/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorMotociclismo = null
    if (response) {
        vectorMotociclismo = await response.json()
        callBackFn(vectorMotociclismo.data)
    }
}


/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_motociclistas} vector Vector con los datos de los motociclistas a mostrar
 */
Motociclismo.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Motociclismo.cabeceraTable();
    vector.forEach(e => msj += Motociclismo.cuerpoTr(e))
    msj += Motociclismo.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de motociclistas", msj )

}

// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Motociclismo.cabeceraTable = function () {
    return `<table class="listado-Motociclistas1">
        <thead>
        <th>Nombre</th><th>Nombre_Equipo</th><th>Tipo_Moto</th><th>Fecha_Nacimiento</th><th>Anios_Experiencia</th><th>Puntuaciones_Carrera</th><th>Marcas_Motocicletas</th><th>Posicion_Campeonato</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {motociclistas} p Datos del motociclista a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Motociclismo.cuerpoTr = function (p) {
    const d = p.data
    const fecha = d.fecha_nacimiento;
    const anios_experiencia = d.anios_experiencia.join(', ');
    const puntuaciones_carrera = d.puntuaciones_carrera.join(', ');
    const marcas_motocicletas = d.marcas_motocicletas.join(', ');

    return `<tr>
    <td>${d.nombre}</td>
    <td><em>${d.nombre_equipo}</em></td>
    <td>${d.tipo_moto}</td>
    <td>${fecha.dia}/${fecha.mes}/${fecha.anio}</td>
    <td>${anios_experiencia}</td>
    <td>${puntuaciones_carrera}</td>
    <td>${marcas_motocicletas}</td>
    <td>${d.posicion_campeonato}</td>
    
    </tr>
   
    `;
}

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Motociclismo.pieTable = function () {
    return "</tbody></table>";
}


/**
 * Función principal para recuperar los datos desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */

Motociclismo.listar = function () {
  this.recupera(this.imprime);
}


//HU 02 : Ver un listado solo con los nombres de todos los jugadores/equipos.
// REALIZAMOS LA OPCIÓN DE MOSTRAR SOLO NOMBRES

/**
 * Función que recuperar todos los datos llamando al MS Motociclismo
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Motociclismo.recuperaNombres = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio Motociclismo
    try {
        const url = Frontend.API_GATEWAY + "/motociclismo/getNombres"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los datos que se han descargado
    let vectorMotociclismo = null
    if (response) {
        vectorPlantilla = await response.json()
        callBackFn(vectorMotociclismo.data)
    }
}


/**
 * Función para mostrar en pantalla todos los DATOS que se han recuperado de la BBDD.
 * @param {Vector_de_motociclistas} vector Vector con los datos de los motociclistas a mostrar
 */
Motociclismo.imprimeNombres = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Motociclismo.cabeceraTableN();
    vector.forEach(e => msj += Motociclismo.cuerpoTrN(e))
    msj += Motociclismo.pieTableN();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de NOMBRES de motociclistas", msj )

}

// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Motociclismo.cabeceraTableN = function () {
    return `<table class="listado-Motociclistas1">
        <thead>
        <th>Nombre</th>
        </thead>
        <tbody>
    `;
}


/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {motociclistas} m Datos del motociclista a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Motociclismo.cuerpoTrN = function (nombre) {
   
    return `
    <tr">
    <td>${nombre}</td>

    </tr>
    `;
}

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Motociclismo.pieTableN = function () {
    return "</tbody></table>";
}

/**
 * Función principal para recuperar los nombres de los motociclistas desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */

Motociclismo.listarNombres = function () {
  this.recuperaNombres(this.imprimeNombres);
}


//HU 03 : Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente.
// REALIZAMOS LA OPCIÓN DE MOSTRAR NOMBRES POR RORDEN ALFABÉTICO

/**
 * Función que recuperar todos los datos llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Motociclismo.recuperaNombresAZ = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + "/motociclismo/getNAlfabeticamente"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los datos que se han descargado
    let vectorMotociclismo = null
    if (response) {
        vectorMotociclismo = await response.json()
        callBackFn(vectorMotociclismo.data.sort())
    }
}


/**
 * Función para mostrar en pantalla todos los DATOS que se han recuperado de la BBDD.
 * @param {Vector_de_motociclistas} vector Vector con los datos de los motociclistas a mostrar
 */
Motociclismo.imprimeNAZ = function (vector) {
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Motociclismo.cabeceraTableNAZ();
    vector.forEach(e => msj += Motociclismo.cuerpoTrNAZ(e))
    msj += Motociclismo.pieTableNAZ();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de NOMBRES Aa-Zz de motociclistas", msj )

}

// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Motociclismo.cabeceraTableNAZ = function () {
    return `<table class="listado-Motociclistas1">
        <thead>
        <th>Nombre</th>
        </thead>
        <tbody>
    `;
}


/**
 * Muestra los nombres ordenados alfabéticamente en un elemento TR con sus correspondientes TD
 * @param {motociclistas} m Datos del motociclista a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Motociclismo.cuerpoTrNAZ = function (nombre) {

    return `
    <tr">
    <td>${nombre}</td>

    </tr>
    `;
}

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Motociclismo.pieTableNAZ = function () {
    return "</tbody></table>";
}

/**
 * Función principal para recuperar los nombres por orden alfabético de los motociclistas desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */

Motociclismo.listarNombresAZ = function () {
  this.recuperaNombresAZ(this.imprimeNAZ);
}

//HU 08 : Ver un listado de todos los datos de jugadores/equipos cuyo nombre cumple con un criterio de búsqueda indicado por el usuario. (Por ejemplo: buscar todos aquellos cuyo nombre incluye “Antonio”).

// Tags que voy a usar para sustituir los campos
Motociclismo.plantillaTags = {
    "NOMBRE": "### NOMBRE ###",
    "NOMBRE_EQUIPO": "### NOMBRE_EQUIPO ###",
    "TIPO_MOTO": "### TIPO_MOTO ###",
    "FECHA_NACIMIENTO": "### FECHA_NACIMIENTO ###",
    "ANIOS_EXPERIENCIA": "### ANIOS_EXPERIENCIA ###",
    "PUNTUACIONES_CARRERA": "### PUNTUACIONES_CARRERA ###",
    "MARCAS_MOTOCICLETAS": "### MARCAS_MOTOCICLETAS ###",
    "POSICION_CAMPEONATO": "### POSICION_CAMPEONATO ###",
}
/// Plantilla para poner los datos de varias personas dentro de una tabla
Motociclismo.plantillaTablaMotociclistas = {}


// Cabecera de la tabla
Motociclismo.plantillaTablaMotociclistas.cabecera = `<table width="100%" class="listado-motociclistas">
                    <thead>
                        <th>Nombre</th>
                        <th>Nombre_Equipo</th>
                        <th>Tipo_Moto</th>
                        <th>Fecha_Nacimiento</th>
                        <th>Anios_Experiencia</th>
                        <th>Puntuaciones_Carrera</th>
                        <th>Marcas_Motociletas</th>
                        <th>Posicion_Campeonato</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Motociclismo.plantillaTablaMotociclistas.cuerpo = `
    <tr title="${Motociclismo.plantillaTags.NOMBRE}">
        <td>${Motociclismo.plantillaTags.NOMBRE}</td>
        <td>${Motociclismo.plantillaTags.NOMBRE_EQUIPO}</td>
        <td>${Motociclismo.plantillaTags.TIPO_MOTO}</td>
        <td>${Motociclismo.plantillaTags["FECHA_NACIMIENTO"]}</td>
        <td>${Motociclismo.plantillaTags["ANIOS_EXPERIENCIA"]}</td>
        <td>${Motociclismo.plantillaTags["PUNTUACIONES_CARRERA"]}</td>
        <td>${Motociclismo.plantillaTags["MARCAS_MOTOCICLETAS"]}</td>
        <td>${Motociclismo.plantillaTags.POSICION_CAMPEONATO}</td>
        
    </tr>
    `;

// Pie de la tabla
Motociclismo.plantillaTablaMotociclistas.pie = `        </tbody>
             </table>
             `;


/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Motociclismo.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Motociclismo.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Motociclismo.plantillaTags.NOMBRE_EQUIPO, 'g'), persona.data.nombre_equipo)
        .replace(new RegExp(Motociclismo.plantillaTags.TIPO_MOTO, 'g'), persona.data.tipo_moto)
        .replace(new RegExp(Motociclismo.plantillaTags["FECHA_NACIMIENTO"], 'g'),  persona.data.fecha_nacimiento.dia + "/" + persona.data.fecha_nacimiento.mes + "/" + persona.data.fecha_nacimiento.anio)
        .replace(new RegExp(Motociclismo.plantillaTags["ANIOS_EXPERIENCIA"], 'g'), persona.data.anios_experiencia.join( ", "))
        .replace(new RegExp(Motociclismo.plantillaTags["PUNTUACIONES_CARRERA"], 'g'), persona.data.puntuaciones_carrera.join( ", "))
        .replace(new RegExp(Motociclismo.plantillaTags["MARCAS_MOTOCICLETAS"], 'g'), persona.data.marcas_motocicletas.join( ", "))
        .replace(new RegExp(Motociclismo.plantillaTags.POSICION_CAMPEONATO, 'g'), persona.data.posicion_campeonato)
        
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Motociclismo.plantillaTablaMotociclistas.actualiza = function (persona) {
    return Motociclismo.sustituyeTags(this.cuerpo, persona)
}

Motociclismo.recuperapersonaBuscar = async function (nombreBuscar,callBackFn) {

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/motociclismo/getTodos"
        const response = await fetch(url);
        let vectorMotociclismo = null
        if (response) {
            vectorMotociclismo = await response.json()
            const filtro = vectorMotociclismo.data.filter(persona => persona.data.nombre === nombreBuscar)
            callBackFn(filtro)
        }

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)

    }

}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Motociclismo.imprimeTodosMotociclistas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Motociclismo.plantillaTablaMotociclistas.cabecera
    vector.forEach(e => msj += Motociclismo.plantillaTablaMotociclistas.actualiza(e))
    msj += Motociclismo.plantillaTablaMotociclistas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de motocilistas", msj)
}


/**
 * Función principal para recuperar los nombres por orden alfabético de los motociclistas desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Motociclismo.personaBuscar = function (nombreBuscar){
    this.recuperapersonaBuscar(nombreBuscar, this.imprimeTodosMotociclistas);
}


//HU 10 : Ver un listado de todos los datos de jugadores/equipos que cumplen simultáneamente con varios criterios de búsqueda indicados por el usuario para algunos de sus campos.

/**
 * Función que recuperar todos los datos llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Motociclismo.recuperaCumpleVariosCriterios = async function (criterio1,criterio2,criterio3,callBackFn) {

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/motociclismo/getTodos"
        const response = await fetch(url);
        let vectorMotociclismo = null
        if (response) {
            vectorMotociclismo = await response.json()
            const filtro = vectorMotociclismo.data.filter(persona => persona.data.tipo_moto === criterio1 && persona.data.nombre_equipo === criterio2 && persona.data.posicion_campeonato === criterio3)
            
            callBackFn(filtro)
        }

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)

    }

}
/**
 * Función principal para recuperar los datos de jugadores/equipos que cumplen simultáneamente con varios criterios de búsqueda indicados por el usuario para algunos de sus campos.
 * @param {string} criterio1 - Primer criterio de búsqueda.
 * @param {string} criterio2 - Segundo criterio de búsqueda.
 * @param {string} criterio3 - Tercer criterio de búsqueda.
 * @returns {boolean} - Retorna verdadero.
 */
Motociclismo.BuscarCumpleVariosCriterios = function (criterio1, criterio2, criterio3){
    this.recuperaCumpleVariosCriterios(criterio1, criterio2, criterio3, this.imprimeTodosMotociclistas);

}


//HU 11 : Ver un listado de todos los datos de jugadores/equipos que cumplen simultáneamente con varios criterios de búsqueda indicados por el usuario para algunos de sus campos.

/**
 * Función que recuperar todos los datos llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Motociclismo.recuperaVariosCriterios = async function (criterio1p,criterio2p,criterio3p,callBackFn) {

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/motociclismo/getTodos"
        const response = await fetch(url);
        let vectorMotociclismo = null
        if (response) {
            vectorMotociclismo = await response.json()
            const filtro = vectorMotociclismo.data.filter(persona => persona.data.tipo_moto === criterio1p || persona.data.nombre_equipo === criterio2p || persona.data.posicion_campeonato === criterio3p)
            
            callBackFn(filtro)
        }

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)

    }

}
/**
 * Función principal para recuperar los datos de jugadores/equipos que cumplen simultáneamente con varios criterios de búsqueda indicados por el usuario para algunos de sus campos.
 * @param {string} criterio1p - Primer criterio de búsqueda.
 * @param {string} criterio2p - Segundo criterio de búsqueda.
 * @param {string} criterio3p - Tercer criterio de búsqueda.
 * @returns {boolean} - Retorna verdadero.
 */
Motociclismo.BuscarVariosCriterios = function (criterio1p, criterio2p, criterio3p){
    this.recuperaVariosCriterios(criterio1p, criterio2p, criterio3p, this.imprimeTodosMotociclistas);

}

