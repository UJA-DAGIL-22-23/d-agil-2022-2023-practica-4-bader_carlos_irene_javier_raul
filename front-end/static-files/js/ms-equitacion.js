/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

/// Nombre de los campos del formulario para editar un deportista
Plantilla.form = {
    NOMBRE: "form-deportista-nombre",
    APELLIDO: "form-deportista-apellido",
    FECHANACIMIENTO: "form-deportista-fechanac",
    NACIONALIDAD: "form-deportista-nacionalidad",
    EDAD: "form-deportista-edad",
    DISCIPLINAS: "form-deportista-disciplinas",
    CABALLOS: "form-deportista-caballos",
    ANIOSPARTICPACIONJJOO: "form-deportista-JJOO"
}

Plantilla.deportistaMostrado = null

Plantilla.plantillaTags = {
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

// Funciones para mostrar una deportista como formulario.
Plantilla.plantillaFormularioDeportista = {}

//Cabecera del formulario.
Plantilla.plantillaFormularioDeportista.formulario =
    `
<form method='post' action=''>
    <table class="listado-plantilla">
        <thead>
            <th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th>
            <th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th>
            <th>Años de participación en los JJOO</th><th>Editar Nombre</th><th>Editar</th><th>Guardar</th><th>Cancelar</th>
        </thead>
        <tbody>
            <tr title ="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-deportista-elemento" disabled id="form-deportista-id"
                        value="${Plantilla.plantillaTags.ID}" name="id_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-nombre"
                        value="${Plantilla.plantillaTags.NOMBRE}" name="nombre_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-apellido"
                        value="${Plantilla.plantillaTags.APELLIDO}" name="apellido_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-fechanac"
                        value="${Plantilla.plantillaTags.FECHANACIMIENTODia}/${Plantilla.plantillaTags.FECHANACIMIENTOMes}/${Plantilla.plantillaTags.FECHANACIMIENTOAnio}" name="fechaNac_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-nacionalidad"
                        value="${Plantilla.plantillaTags.NACIONALIDAD}" name="nacionalidad_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-edad"
                        value="${Plantilla.plantillaTags.EDAD}" name="edad_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-disciplinas"
                        value="${Plantilla.plantillaTags.DISCIPLINAS}" name="diciplinas_deportista"/>
                </td>
                <td><input type="vector" class="form-deportista-elemento editable" disabled id="form-deportista-caballos"
                        value="${Plantilla.plantillaTags.CABALLOS}" name="caballos_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-JJOO"
                        value="${Plantilla.plantillaTags.ANIOSPARTICPACIONJJOO}" name="JJOO_deportista"/>
                </td>
                <td>
                    <div><a href="javascript:Plantilla.editarNombre()">Editar Nombre</a></div>
                </td>
                <td>
                    <div><a href="javascript:Plantilla.editar()">Editar 4 campos</a></div>
                </td>
                <td>
                    <div><a href="javascript:Plantilla.guardar()">Guardar</a></div>
                </td>    
                <td>    
                    <div><a href="javascript:Plantilla.cancelar()">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;

Plantilla.sustituyeTags = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), deportista.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), deportista.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDO, 'g'), deportista.data.apellido)
        .replace(new RegExp(Plantilla.plantillaTags.FECHANACIMIENTODia, 'g'), deportista.data.fechaNacimiento.dia)
        .replace(new RegExp(Plantilla.plantillaTags.FECHANACIMIENTOMes, 'g'), deportista.data.fechaNacimiento.mes)
        .replace(new RegExp(Plantilla.plantillaTags.FECHANACIMIENTOAnio, 'g'), deportista.data.fechaNacimiento.anio)
        .replace(new RegExp(Plantilla.plantillaTags.NACIONALIDAD, 'g'), deportista.data.nacionalidad)
        .replace(new RegExp(Plantilla.plantillaTags.EDAD, 'g'), deportista.data.edad)
        .replace(new RegExp(Plantilla.plantillaTags.DISCIPLINAS, 'g'), deportista.data.disciplinas)
        .replace(new RegExp(Plantilla.plantillaTags.CABALLOS, 'g'), deportista.data.caballos)
        .replace(new RegExp(Plantilla.plantillaTags.ANIOSPARTICPACIONJJOO, 'g'), deportista.data.aniosParticipacionJJOO)
}

Plantilla.plantillaFormularioDeportista.actualiza = function (deportista) {
    return Plantilla.sustituyeTags(this.formulario, deportista);
}

Plantilla.deportistaComoFormulario = function (deportista) {
    return Plantilla.plantillaFormularioDeportista.actualiza(deportista)
}

// Funciones para mostrar como TABLE
/**
* Crea la cabecera para mostrar la info como tabla
* @returns Cabecera de la tabla
*/
Plantilla.cabeceraTable = function () {
    return `<table class="listado-plantilla"><thead><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th><th>Opcion</th></thead><tbody>`;
}

/**
 * Crea la cabecera para mostrar la info del deportista una vez se busca en el domulario
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTableResultadosFormulario = function () {
    return `<table class="listado-plantilla"><thead><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th></thead><tbody>`;
}

/**
* Crea la cabecera para mostrar los nombres como tabla
* @returns Cabecera de la tabla
*/
Plantilla.cabeceraTableNombres = function () {
    return `<table class="listado-plantilla"><thead><th>Nombre</th></thead><tbody>`;
}

/**
* Muestra la información de cada deportista en un elemento TR con sus correspondientes TD
* @param {proyecto} p Datos del proyecto a mostrar
* @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
*/
Plantilla.cuerpoTr = function (p) {
    const d = p.data
    return `<tr><td>${p.ref['@ref'].id}</td><td>${d.nombre}</td><td>${d.apellido}</td><td>${d.fechaNacimiento.dia}/${d.fechaNacimiento.mes}/${d.fechaNacimiento.anio}</td><td>${d.nacionalidad}</td><td>${d.edad}</td><td>${d.disciplinas.join(", ")}</td><td>${d.caballos}</td><td>${d.aniosParticipacionJJOO}</td><td><div><a href="javascript:Plantilla.mostrarDeportista('${p.ref['@ref'].id}')"">Mostrar</a></div></td></tr>`;
}

/**
 * Muestra la información de cada deportista en un elemento TR con sus correspondientes TD para los deportistas que se buscan en el formulario
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Plantilla.cuerpoTrResultadosFormulario = function (p) {
    const d = p.data;
    return `<tr><td>${p.ref["@ref"].id}</td>
    <td>${d.nombre}</td>
    <td>${d.apellido}</td>
    <td>${d.fechaNacimiento.dia}/${d.fechaNacimiento.mes}/${d.fechaNacimiento.anio}</td>
    <td>${d.nacionalidad}</td>
    <td>${d.edad}</td>
    <td>${d.disciplinas.join(", ")}</td>
    <td>${d.caballos}</td>
    <td>${d.aniosParticipacionJJOO}</td>
    </tr>`;
};

/**
* Muestra la información de cada deportista en un elemento TR con sus correspondientes TD
* @param {proyecto} p Datos del proyecto a mostrar
* @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
*/
Plantilla.cuerpoTrNombres = function (nombre) {
    return `<tr><td>${nombre}</td></tr>`;
}

/**
* Pie de la tabla en la que se muestran los deportistas
* @returns Cadena con el pie de la tabla
*/
Plantilla.pieTable = function () {
    return "</tbody></table>";
}

//Funciones para mostrar el formulario para preguntar al cliente.
Plantilla.formulario = function () {
    return `<div id="div_formulario">
        <form method='get' id="forulario">
        <table class="listado-plantilla">
        <thead>
            <th>Nombre</th><th>Opcion</th>
        </thead>
        <tbody>
        <tr>
            <td>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre"><br><br>
            </td> 
            <td>
            <div><a href="javascript:Plantilla.buscar_nombre()" class="boton_buscar">Buscar</a></div>
            </td>
        </tr>
        </tbody>
        </table>
    </form> 
    </div>
    <div id="div_resultados"></div>`
}

///////////////////////TEST////////////////////////
Plantilla.formulario_dos = function (){
    return`
    <div id="div_formulario">
        <form method='get' id="forulario">
        <table class="listado-plantilla">
        <thead>
            <th>Nombre</th><th>Apellido</th><th>Nacionalidad</th><th>Disciplina</th><th>Opción</th>
        </thead>
        <tbody>
        <tr>
            <td>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre"><br><br>
            </td>
            <td>
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido"><br><br>
            </td> 
            <td>
            <label for="nacionalidad">Nacionalidad:</label>
            <select id="nacionalidad" name="nacionalidad">
                <option value="">Selecciona una opción</option>
                <option value="Española">Española</option>
                <option value="Argentina">Argentina</option>
                <option value="Colombiana">Colombiana</option>
                <option value="Francesa">Francesa</option>
                <option value="Estadounidense">Estadounidense</option>
                <option value="Mexicana">Mexicana</option>
                <option value="Alemana">Alemana</option>
            </select><br><br>
            </td>
            <td>
            <label for="disciplina">Disciplina:</label>
            <select id="disciplina" name="disciplina">
                <option value="">Selecciona una opción</option>
                <option value="Salto">Salto</option>
                <option value="Doma">Doma</option>
                <option value="Vaquera">Vaquera</option>
                <option value="Concurso completo">Concurso completo</option>
            </select><br><br>
            </td>
            <td>
            <div><a href="javascript:Plantilla.buscar()" class="boton_buscar">Buscar</a></div>
            </td>
        </tr>
        </tbody>
        </table>
    </form> 
    </div>
    <div id="div_resultados"></div>
    `
}

/**
* Función que recupera todos los nombres de los deportistas de equitación llamando al MS Plantilla
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.recupera_nombres = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getNombres"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los nombres que se han descargado
    let vectorNombres = null
    if (response) {
        vectorNombres = await response.json()
        callBackFn(vectorNombres.data)
    }
}

/**
* Función que recupera todos los nombres de los deportistas de equitación llamando al MS Plantilla
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.recupera_alfabeticamente = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getAlfabeticamente"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los nombres que se han descargado
    let vectorAlfabeticamente = null
    if (response) {
        vectorAlfabeticamente = await response.json()
        callBackFn(vectorAlfabeticamente.data)
    }
}

/**
* Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Plantilla
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodosInfo"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas los deportistas que se han descargado
    let vectorPlantilla = null
    if (response) {
        vectorPlantilla = await response.json()
        callBackFn(vectorPlantilla.data)
    }
}

/**
 *Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Plantilla dado un Id.
 *@param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.recuperaUnDeportista = async function (idDeportista, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idDeportista
        const response = await fetch(url);
        if (response) {
            const deportista = await response.json()
            callBackFn(deportista)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
* Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Plantilla y busca los que se corresponden con el formulario de busqueda
* En este caso solo el nombre
*/
Plantilla.buscar_nombre = async function () {
    let response = null
    try {
        var nuevoVector = [];
        document.getElementById("div_resultados").innerHTML = "<br><h1>Los resultados de la busqueda de arriba es/son los siguientes:</h1>"
        // Código copiado y adaptado de https://es.stackoverflow.com/questions/202409/hacer-una-peticion-get-con-fetch
        let url = new URL(Frontend.API_GATEWAY + "/plantilla/getTodosInfo")
        const params = {}
        if (document.getElementById("nombre").value) params.nombre = document.getElementById("nombre").value

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        };
        response = await fetch(url, dataRequest);

        // Muestro todas los deportistas que se han descargado
        let vectorPlantilla = null;
        if (response) {
            vectorPlantilla = await response.json();
            nuevoVector = [];
            for (var i = 0; i < vectorPlantilla.data.length; i++) {
                if (vectorPlantilla.data[i].data.nombre === params.nombre) {
                    nuevoVector.push(vectorPlantilla.data[i]);
                }
            }

            Plantilla.imprimeResultadosFormulario(nuevoVector)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

/**
* Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Plantilla y busca los que se corresponden con el formulario de busqueda
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.buscar = async function () {
    let response = null   
        try {
            document.getElementById( "div_resultados" ).innerHTML = "<br><h1>Los resultados de la busqueda de arriba es/son los siguientes:</h1>"
            // Código copiado y adaptado de https://es.stackoverflow.com/questions/202409/hacer-una-peticion-get-con-fetch
            let url = new URL( Frontend.API_GATEWAY + "/plantilla/getTodosInfo") 
            const params = {}
            if( document.getElementById("nombre").value ) params.nombre = document.getElementById("nombre").value
            if( document.getElementById("apellido").value ) params.apellido = document.getElementById("apellido").value
            // Otra opción: 
            //         params.nombre = document.getElementById("nombre").value?document.getElementById("nombre").value:"*"
            if( document.getElementById("nacionalidad").value ) params.nacionalidad = document.getElementById("nacionalidad").value
            
            if( document.getElementById("disciplina").value ) params.disciplina = document.getElementById("disciplina").value
            
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const dataRequest = {
               method: 'GET'
            };
            response = await fetch(url, dataRequest);
            
            // Muestro todas los deportistas que se han descargado
            let vectorPlantilla = null;
            if (response) {
                vectorPlantilla = await response.json();
                var nuevoVector = [];
                for (var i = 0; i < vectorPlantilla.data.length; i++) {
                    if (vectorPlantilla.data[i].data.nombre === params.nombre && vectorPlantilla.data[i].data.apellido === params.apellido && 
                        vectorPlantilla.data[i].data.nacionalidad === params.nacionalidad && vectorPlantilla.data[i].data.disciplinas.includes(params.disciplina)) {
                        nuevoVector.push(vectorPlantilla.data[i]);
                    } 
                }
                Plantilla.imprimeResultadosFormulario(nuevoVector);
            }   
        } catch (error) {
            alert("Error: No se han podido acceder al API Gateway " + error)
            //console.error(error)
        }
}

/**
* Función para mostrar en pantalla todos los deportistas de equitacion con su info que se han recuperado de la BBDD.
* @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
*/
Plantilla.imprime_nombres = function (vector) {
    let msj = "";
    msj += Plantilla.cabeceraTableNombres();
    vector.forEach(o => msj += Plantilla.cuerpoTrNombres(o))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de los nombres de los deportistas de equitacion", msj)
}

/**
* Función para mostrar en pantalla todos los deportistas de equitacion con su info que se han recuperado de la BBDD.
* @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
*/
Plantilla.imprime_alfabeticamente = function (vector) {
    let msj = "";
    msj += Plantilla.cabeceraTableNombres();
    vector.forEach(o => msj += Plantilla.cuerpoTrNombres(o))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de los nombres de los deportistas de equitacion por orden alfabetico", msj)
}

/**
* Función para mostrar en pantalla todos los deportistas de equitacion con su info que se han recuperado de la BBDD.
* @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
*/
Plantilla.imprime = function (array) {
    let msj = "";
    msj += Plantilla.cabeceraTable();
    array.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas de equitacion con toda su información", msj)
}

///////////////////////TEST////////////////////////
/**
 * Imprime en una tabla los datos de los deportistas devueltos por una búsqueda.
 * Si no hay ningún deportista, muuestra un mensaje indicándolo.
 * @param {Vector_de_deportistas} array Conjunto de deportistas devueltos por una búsqueda 
 */
Plantilla.imprimeResultadosFormulario = function (array) {
    let msj = "";
    if (array.length > 0) {
        msj += Plantilla.cabeceraTableResultadosFormulario();
        array.forEach((e) => (msj += Plantilla.cuerpoTrResultadosFormulario(e)));
        msj += Plantilla.pieTable();
    } else {
        msj = "<h3>Ningun deportista cumple las condiciones de busqueda</h3>"
    }

    Frontend.Article.resultados(msj)
};

/**
 *Función para mostrar en pantalla un deportista de equitacion con su info que se ha recuperado de la BBDD.
 *@param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
*/
///////////////////////TEST////////////////////////
Plantilla.imprimeUnDeportista = function (deportista) {
    let msj = Plantilla.deportistaComoFormulario(deportista);
    Frontend.Article.actualizar("Mostrar/Editar un deportista", msj)
    Plantilla.almacenaDatos(deportista)
}

Plantilla.almacenaDatos = function (deportista) {
    Plantilla.deportistaMostrado = deportista
}

/**
 * Recupera los valores almacenados del deportista que se estaba mostrando
 * @return Datos del deportista a almacenada
 */
Plantilla.recuperaDatosAlmacenados = function () {
    return this.deportistaMostrado;
}

/**
* Función que descarga la info MS Plantilla al llamar a una de sus rutas
* @param {string} ruta Ruta a descargar
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.descargarRuta = async function (ruta, callBackFn) {
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
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
* Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
*/
Plantilla.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

/**
* Función principal para responder al evento de elegir la opción "Home"
*/
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
* Función principal para responder al evento de elegir la opción "Acerca de"
*/
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
* Función principal para responder al evento de elegir la opción "Listar nombres"
*/
Plantilla.listar_nombres = function () {
    this.recupera_nombres(this.imprime_nombres);
}

/**
* Función principal para responder al evento de elegir la opción "Listar nombres"
*/
Plantilla.listar_alfabeticamente = function () {
    this.recupera_alfabeticamente(this.imprime_alfabeticamente);
}

/**
* Función principal para responder al evento de elegir la opción "Listar informacion completa"
*/
Plantilla.listar = function () {
    this.recupera(this.imprime);
}

/**
 *Función principal para responder al evento de elegir la opción "Mostrar un deportista de ejemplo".
*/
Plantilla.mostrarDeportista = function (idDeportista) {
    this.recuperaUnDeportista(idDeportista, this.imprimeUnDeportista)
}

/**
* Funciónes para mostrar los formularios con el que se le pedira información al usuario.
*/
///////////////////////TEST////////////////////////
Plantilla.imprimeformulario = function () {
    let msj = "";
    msj += Plantilla.formulario();
    Frontend.Article.actualizar("Formulario", msj)
}
///////////////////////TEST////////////////////////
Plantilla.mostrar = function () {
    this.imprimeformulario();
}

///////////////////////TEST////////////////////////
Plantilla.imprimeformulario_dos = function(){
    let msj ="";
    msj += Plantilla.formulario_dos();
    Frontend.Article.actualizar( "Formulario", msj )
}

///////////////////////TEST////////////////////////
Plantilla.mostrar_dos = function () {
    this.imprimeformulario_dos();
}



/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Plantilla, para concatenar llamadas
 */
///////////////////////TEST////////////////////////
Plantilla.habilitarDeshabilitarCamposEditablesNombre = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    document.getElementById(Plantilla.form.NOMBRE).disabled = deshabilitando
    return this
}

/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Plantilla, para concatenar llamadas
 */
Plantilla.deshabilitarCamposEditablesNombre = function () {
    Plantilla.habilitarDeshabilitarCamposEditablesNombre(true)
    return this
}
/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Plantilla, para concatenar llamadas
 */
Plantilla.habilitarCamposEditablesNombre = function () {
    Plantilla.habilitarDeshabilitarCamposEditablesNombre(false)
    return this
}
/**
 * Función que permite modificar los datos de un deportista
 */
Plantilla.editarNombre = function () {
    this.habilitarCamposEditablesNombre()
}
/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Plantilla, para concatenar llamadas
 */
Plantilla.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    document.getElementById(Plantilla.form.NOMBRE).disabled = deshabilitando
    document.getElementById(Plantilla.form.APELLIDO).disabled = deshabilitando
    document.getElementById(Plantilla.form.CABALLOS).disabled = deshabilitando
    document.getElementById(Plantilla.form.ANIOSPARTICPACIONJJOO).disabled = deshabilitando
    return this
}
/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Plantilla, para concatenar llamadas
 */
Plantilla.deshabilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(true)
    return this
}
/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Plantilla, para concatenar llamadas
 */
Plantilla.habilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(false)
    return this
}
/**
 * Función que permite modificar los datos de un deportista
 */
Plantilla.editar = function () {
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de un deportista
 */
///////////////////////TEST////////////////////////
Plantilla.cancelar = function () {
    this.imprimeUnDeportista(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
}
/**
* Función para guardar los nuevos datos de un deportista
*/
///////////////////////TEST////////////////////////
Plantilla.guardar = async function () {
    try {
        //let url = Frontend.API_GATEWAY + "/plantilla/setNombre/"
        let url = Frontend.API_GATEWAY + "/plantilla/setCuatroCampos/"
        let id_deportista = document.getElementById("form-deportista-id").value
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
                "id_deportista": id_deportista,
                "nombre_deportista": document.getElementById("form-deportista-nombre").value,
                "apellido_deportista": document.getElementById("form-deportista-apellido").value,
                "caballos_deportista": document.getElementById("form-deportista-caballos").value,
                "JJOO_deportista": document.getElementById("form-deportista-JJOO").value,
            }), // body data type must match "Content-Type" header
        })
        Plantilla.mostrarDeportista(id_deportista)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

