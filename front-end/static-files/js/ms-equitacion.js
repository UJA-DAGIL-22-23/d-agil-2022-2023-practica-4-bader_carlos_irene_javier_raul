/**
 * @file Equitacion.js
 * @description Funciones para el procesamiento de la info enviada por el MS Equitacion
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

 "use strict";

 /// Creo el espacio de nombres
 let Equitacion = {};
 
 // Equitacion de datosDescargados vacíos
 Equitacion.datosDescargadosNulos = {
     mensaje: "Datos Descargados No válidos",
     autor: "",
     email: "",
     fecha: ""
 }
 
 /// Nombre de los campos del formulario para editar un deportista
 Equitacion.form = {
     NOMBRE: "form-deportista-nombre",
     APELLIDO: "form-deportista-apellido",
     FECHANACIMIENTO: "form-deportista-fechanac",
     NACIONALIDAD: "form-deportista-nacionalidad",
     EDAD: "form-deportista-edad",
     DISCIPLINAS: "form-deportista-disciplinas",
     CABALLOS: "form-deportista-caballos",
     ANIOSPARTICPACIONJJOO: "form-deportista-JJOO"
 }
 
 Equitacion.deportistaMostrado = null
 
 Equitacion.EquitacionTags = {
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
 Equitacion.EquitacionFormularioDeportista = {}
 
 //Cabecera del formulario.
 Equitacion.EquitacionFormularioDeportista.formulario =
     `
 <form method='post' action=''>
     <table class="listado-Equitacion">
         <thead>
             <th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th>
             <th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th>
             <th>Años de participación en los JJOO</th><th>Editar Nombre</th><th>Editar</th><th>Guardar</th><th>Cancelar</th>
         </thead>
         <tbody>
             <tr title ="${Equitacion.EquitacionTags.ID}">
                 <td><input type="text" class="form-deportista-elemento" disabled id="form-deportista-id"
                         value="${Equitacion.EquitacionTags.ID}" name="id_deportista"/>
                 </td>
                 <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-nombre"
                         value="${Equitacion.EquitacionTags.NOMBRE}" name="nombre_deportista"/>
                 </td>
                 <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-apellido"
                         value="${Equitacion.EquitacionTags.APELLIDO}" name="apellido_deportista"/>
                 </td>
                 <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-fechanac"
                         value="${Equitacion.EquitacionTags.FECHANACIMIENTODia}/${Equitacion.EquitacionTags.FECHANACIMIENTOMes}/${Equitacion.EquitacionTags.FECHANACIMIENTOAnio}" name="fechaNac_deportista"/>
                 </td>
                 <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-nacionalidad"
                         value="${Equitacion.EquitacionTags.NACIONALIDAD}" name="nacionalidad_deportista"/>
                 </td>
                 <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-edad"
                         value="${Equitacion.EquitacionTags.EDAD}" name="edad_deportista"/>
                 </td>
                 <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-disciplinas"
                         value="${Equitacion.EquitacionTags.DISCIPLINAS}" name="diciplinas_deportista"/>
                 </td>
                 <td><input type="vector" class="form-deportista-elemento editable" disabled id="form-deportista-caballos"
                         value="${Equitacion.EquitacionTags.CABALLOS}" name="caballos_deportista"/>
                 </td>
                 <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-JJOO"
                         value="${Equitacion.EquitacionTags.ANIOSPARTICPACIONJJOO}" name="JJOO_deportista"/>
                 </td>
                 <td>
                     <div><a href="javascript:Equitacion.editarNombre()">Editar Nombre</a></div>
                 </td>
                 <td>
                     <div><a href="javascript:Equitacion.editar()">Editar 4 campos</a></div>
                 </td>
                 <td>
                     <div><a href="javascript:Equitacion.guardar()">Guardar</a></div>
                 </td>    
                 <td>    
                     <div><a href="javascript:Equitacion.cancelar()">Cancelar</a></div>
                 </td>
             </tr>
         </tbody>
     </table>
 </form>
 `;
 
 Equitacion.sustituyeTags = function (Equitacion, deportista) {
     return Equitacion
         .replace(new RegExp(Equitacion.EquitacionTags.ID, 'g'), deportista.ref['@ref'].id)
         .replace(new RegExp(Equitacion.EquitacionTags.NOMBRE, 'g'), deportista.data.nombre)
         .replace(new RegExp(Equitacion.EquitacionTags.APELLIDO, 'g'), deportista.data.apellido)
         .replace(new RegExp(Equitacion.EquitacionTags.FECHANACIMIENTODia, 'g'), deportista.data.fechaNacimiento.dia)
         .replace(new RegExp(Equitacion.EquitacionTags.FECHANACIMIENTOMes, 'g'), deportista.data.fechaNacimiento.mes)
         .replace(new RegExp(Equitacion.EquitacionTags.FECHANACIMIENTOAnio, 'g'), deportista.data.fechaNacimiento.anio)
         .replace(new RegExp(Equitacion.EquitacionTags.NACIONALIDAD, 'g'), deportista.data.nacionalidad)
         .replace(new RegExp(Equitacion.EquitacionTags.EDAD, 'g'), deportista.data.edad)
         .replace(new RegExp(Equitacion.EquitacionTags.DISCIPLINAS, 'g'), deportista.data.disciplinas)
         .replace(new RegExp(Equitacion.EquitacionTags.CABALLOS, 'g'), deportista.data.caballos)
         .replace(new RegExp(Equitacion.EquitacionTags.ANIOSPARTICPACIONJJOO, 'g'), deportista.data.aniosParticipacionJJOO)
 }
 
 Equitacion.EquitacionFormularioDeportista.actualiza = function (deportista) {
     return Equitacion.sustituyeTags(this.formulario, deportista);
 }
 
 Equitacion.deportistaComoFormulario = function (deportista) {
     return Equitacion.EquitacionFormularioDeportista.actualiza(deportista)
 }
 
 // Funciones para mostrar como TABLE
 /**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
 Equitacion.cabeceraTable = function () {
     return `<table class="listado-Equitacion"><thead><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th><th>Opcion</th></thead><tbody>`;
 }
 
 /**
  * Crea la cabecera para mostrar la info del deportista una vez se busca en el domulario
  * @returns Cabecera de la tabla
  */
 Equitacion.cabeceraTableResultadosFormulario = function () {
     return `<table class="listado-Equitacion"><thead><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th></thead><tbody>`;
 }
 
 /**
 * Crea la cabecera para mostrar los nombres como tabla
 * @returns Cabecera de la tabla
 */
 Equitacion.cabeceraTableNombres = function () {
     return `<table class="listado-Equitacion"><thead><th>Nombre</th></thead><tbody>`;
 }
 
 /**
 * Muestra la información de cada deportista en un elemento TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
 Equitacion.cuerpoTr = function (p) {
     const d = p.data
     return `<tr><td>${p.ref['@ref'].id}</td><td>${d.nombre}</td><td>${d.apellido}</td><td>${d.fechaNacimiento.dia}/${d.fechaNacimiento.mes}/${d.fechaNacimiento.anio}</td><td>${d.nacionalidad}</td><td>${d.edad}</td><td>${d.disciplinas.join(", ")}</td><td>${d.caballos}</td><td>${d.aniosParticipacionJJOO}</td><td><div><a href="javascript:Equitacion.mostrarDeportista('${p.ref['@ref'].id}')"">Mostrar</a></div></td></tr>`;
 }
 
 /**
  * Muestra la información de cada deportista en un elemento TR con sus correspondientes TD para los deportistas que se buscan en el formulario
  * @param {proyecto} p Datos del proyecto a mostrar
  * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
  */
 Equitacion.cuerpoTrResultadosFormulario = function (p) {
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
 Equitacion.cuerpoTrNombres = function (nombre) {
     return `<tr><td>${nombre}</td></tr>`;
 }
 
 /**
 * Pie de la tabla en la que se muestran los deportistas
 * @returns Cadena con el pie de la tabla
 */
 Equitacion.pieTable = function () {
     return "</tbody></table>";
 }
 
 //Funciones para mostrar el formulario para preguntar al cliente.
 Equitacion.formulario = function () {
     return `<div id="div_formulario">
         <form method='get' id="forulario">
         <table class="listado-Equitacion">
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
             <div><a href="javascript:Equitacion.buscar_nombre()" class="boton_buscar">Buscar</a></div>
             </td>
         </tr>
         </tbody>
         </table>
     </form> 
     </div>
     <div id="div_resultados"></div>`
 }
 
 ///////////////////////TEST////////////////////////
 Equitacion.formulario_dos = function (){
     return`
     <div id="div_formulario">
         <form method='get' id="forulario">
         <table class="listado-Equitacion">
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
             <div><a href="javascript:Equitacion.buscar()" class="boton_buscar">Buscar</a></div>
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
 * Función que recupera todos los nombres de los deportistas de equitación llamando al MS Equitacion
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
 Equitacion.recupera_nombres = async function (callBackFn) {
     let response = null
 
     // Intento conectar con el microservicio Equitacion
     try {
         const url = Frontend.API_GATEWAY + "/equitacion/getNombres"
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
 * Función que recupera todos los nombres de los deportistas de equitación llamando al MS Equitacion
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
 Equitacion.recupera_alfabeticamente = async function (callBackFn) {
     let response = null
 
     // Intento conectar con el microservicio Equitacion
     try {
         const url = Frontend.API_GATEWAY + "/equitacion/getAlfabeticamente"
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
 * Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Equitacion
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
 Equitacion.recupera = async function (callBackFn) {
     let response = null
 
     // Intento conectar con el microservicio Equitacion
     try {
         const url = Frontend.API_GATEWAY + "/equitacion/getTodosInfo"
         response = await fetch(url)
 
     } catch (error) {
         alert("Error: No se han podido acceder al API Gateway")
         console.error(error)
         //throw error
     }
 
     // Muestro todas los deportistas que se han descargado
     let vectorEquitacion = null
     if (response) {
         vectorEquitacion = await response.json()
         callBackFn(vectorEquitacion.data)
     }
 }
 
 /**
  *Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Equitacion dado un Id.
  *@param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
 Equitacion.recuperaUnDeportista = async function (idDeportista, callBackFn) {
     try {
         const url = Frontend.API_GATEWAY + "/equitacion/getPorId/" + idDeportista
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
 * Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Equitacion y busca los que se corresponden con el formulario de busqueda
 * En este caso solo el nombre
 */
 Equitacion.buscar_nombre = async function () {
     let response = null
     try {
         var nuevoVector = [];
         document.getElementById("div_resultados").innerHTML = "<br><h1>Los resultados de la busqueda de arriba es/son los siguientes:</h1>"
         // Código copiado y adaptado de https://es.stackoverflow.com/questions/202409/hacer-una-peticion-get-con-fetch
         let url = new URL(Frontend.API_GATEWAY + "/equitacion/getTodosInfo")
         const params = {}
         if (document.getElementById("nombre").value) params.nombre = document.getElementById("nombre").value
 
         Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
         const dataRequest = {
             method: 'GET'
         };
         response = await fetch(url, dataRequest);
 
         // Muestro todas los deportistas que se han descargado
         let vectorEquitacion = null;
         if (response) {
             vectorEquitacion = await response.json();
             nuevoVector = [];
             for (var i = 0; i < vectorEquitacion.data.length; i++) {
                 if (vectorEquitacion.data[i].data.nombre === params.nombre) {
                     nuevoVector.push(vectorEquitacion.data[i]);
                 }
             }
 
             Equitacion.imprimeResultadosFormulario(nuevoVector)
         }
     } catch (error) {
         alert("Error: No se han podido acceder al API Gateway " + error)
         //console.error(error)
     }
 }
 
 /**
 * Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Equitacion y busca los que se corresponden con el formulario de busqueda
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
 Equitacion.buscar = async function () {
     let response = null   
         try {
             document.getElementById( "div_resultados" ).innerHTML = "<br><h1>Los resultados de la busqueda de arriba es/son los siguientes:</h1>"
             // Código copiado y adaptado de https://es.stackoverflow.com/questions/202409/hacer-una-peticion-get-con-fetch
             let url = new URL( Frontend.API_GATEWAY + "/equitacion/getTodosInfo") 
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
             let vectorEquitacion = null;
             if (response) {
                 vectorEquitacion = await response.json();
                 var nuevoVector = [];
                 for (var i = 0; i < vectorEquitacion.data.length; i++) {
                     if (vectorEquitacion.data[i].data.nombre === params.nombre && vectorEquitacion.data[i].data.apellido === params.apellido && 
                         vectorEquitacion.data[i].data.nacionalidad === params.nacionalidad && vectorEquitacion.data[i].data.disciplinas.includes(params.disciplina)) {
                         nuevoVector.push(vectorEquitacion.data[i]);
                     } 
                 }
                 Equitacion.imprimeResultadosFormulario(nuevoVector);
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
 Equitacion.imprime_nombres = function (vector) {
     let msj = "";
     msj += Equitacion.cabeceraTableNombres();
     vector.forEach(o => msj += Equitacion.cuerpoTrNombres(o))
     msj += Equitacion.pieTable();
 
     // Borro toda la info de Article y la sustituyo por la que me interesa
     Frontend.Article.actualizar("Listado de los nombres de los deportistas de equitacion", msj)
 }
 
 /**
 * Función para mostrar en pantalla todos los deportistas de equitacion con su info que se han recuperado de la BBDD.
 * @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
 */
 Equitacion.imprime_alfabeticamente = function (vector) {
     let msj = "";
     msj += Equitacion.cabeceraTableNombres();
     vector.forEach(o => msj += Equitacion.cuerpoTrNombres(o))
     msj += Equitacion.pieTable();
 
     // Borro toda la info de Article y la sustituyo por la que me interesa
     Frontend.Article.actualizar("Listado de los nombres de los deportistas de equitacion por orden alfabetico", msj)
 }
 
 /**
 * Función para mostrar en pantalla todos los deportistas de equitacion con su info que se han recuperado de la BBDD.
 * @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
 */
 Equitacion.imprime = function (array) {
     let msj = "";
     msj += Equitacion.cabeceraTable();
     array.forEach(e => msj += Equitacion.cuerpoTr(e))
     msj += Equitacion.pieTable();
 
     // Borro toda la info de Article y la sustituyo por la que me interesa
     Frontend.Article.actualizar("Listado de deportistas de equitacion con toda su información", msj)
 }
 
 ///////////////////////TEST////////////////////////
 /**
  * Imprime en una tabla los datos de los deportistas devueltos por una búsqueda.
  * Si no hay ningún deportista, muuestra un mensaje indicándolo.
  * @param {Vector_de_deportistas} array Conjunto de deportistas devueltos por una búsqueda 
  */
 Equitacion.imprimeResultadosFormulario = function (array) {
     let msj = "";
     if (array.length > 0) {
         msj += Equitacion.cabeceraTableResultadosFormulario();
         array.forEach((e) => (msj += Equitacion.cuerpoTrResultadosFormulario(e)));
         msj += Equitacion.pieTable();
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
 Equitacion.imprimeUnDeportista = function (deportista) {
     let msj = Equitacion.deportistaComoFormulario(deportista);
     Frontend.Article.actualizar("Mostrar/Editar un deportista", msj)
     Equitacion.almacenaDatos(deportista)
 }
 
 Equitacion.almacenaDatos = function (deportista) {
     Equitacion.deportistaMostrado = deportista
 }
 
 /**
  * Recupera los valores almacenados del deportista que se estaba mostrando
  * @return Datos del deportista a almacenada
  */
 Equitacion.recuperaDatosAlmacenados = function () {
     return this.deportistaMostrado;
 }
 
 /**
 * Función que descarga la info MS Equitacion al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
 Equitacion.descargarRuta = async function (ruta, callBackFn) {
     let response = null
 
     // Intento conectar con el microservicio Equitacion
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Equitacion
 */
 Equitacion.mostrarHome = function (datosDescargados) {
     // Si no se ha proporcionado valor para datosDescargados
     datosDescargados = datosDescargados || this.datosDescargadosNulos
 
     // Si datos descargados NO es un objeto 
     if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos
 
     // Si datos descargados NO contiene el campo mensaje
     if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos
 
     Frontend.Article.actualizar("Equitacion Home", datosDescargados.mensaje)
 }
 
 /**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Equitacion
 */
 Equitacion.mostrarAcercaDe = function (datosDescargados) {
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
     Frontend.Article.actualizar("Equitacion Acerca de", mensajeAMostrar)
 }
 
 /**
 * Función principal para responder al evento de elegir la opción "Home"
 */
 Equitacion.procesarHome = function () {
     this.descargarRuta("/equitacion/", this.mostrarHome);
 }
 
 /**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
 Equitacion.procesarAcercaDe = function () {
     this.descargarRuta("/equitacion/acercade", this.mostrarAcercaDe);
 }
 
 /**
 * Función principal para responder al evento de elegir la opción "Listar nombres"
 */
 Equitacion.listar_nombres = function () {
     this.recupera_nombres(this.imprime_nombres);
 }
 
 /**
 * Función principal para responder al evento de elegir la opción "Listar nombres"
 */
 Equitacion.listar_alfabeticamente = function () {
     this.recupera_alfabeticamente(this.imprime_alfabeticamente);
 }
 
 /**
 * Función principal para responder al evento de elegir la opción "Listar informacion completa"
 */
 Equitacion.listar = function () {
     this.recupera(this.imprime);
 }
 
 /**
  *Función principal para responder al evento de elegir la opción "Mostrar un deportista de ejemplo".
 */
 Equitacion.mostrarDeportista = function (idDeportista) {
     this.recuperaUnDeportista(idDeportista, this.imprimeUnDeportista)
 }
 
 /**
 * Funciónes para mostrar los formularios con el que se le pedira información al usuario.
 */
 ///////////////////////TEST////////////////////////
 Equitacion.imprimeformulario = function () {
     let msj = "";
     msj += Equitacion.formulario();
     Frontend.Article.actualizar("Formulario", msj)
 }
 ///////////////////////TEST////////////////////////
 Equitacion.mostrar = function () {
     this.imprimeformulario();
 }
 
 ///////////////////////TEST////////////////////////
 Equitacion.imprimeformulario_dos = function(){
     let msj ="";
     msj += Equitacion.formulario_dos();
     Frontend.Article.actualizar( "Formulario", msj )
 }
 
 ///////////////////////TEST////////////////////////
 Equitacion.mostrar_dos = function () {
     this.imprimeformulario_dos();
 }
 
 
 
 /**
  * Establece disable = habilitando en los campos editables
  * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
  * @returns El propio objeto Equitacion, para concatenar llamadas
  */
 ///////////////////////TEST////////////////////////
 Equitacion.habilitarDeshabilitarCamposEditablesNombre = function (deshabilitando) {
     deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
     document.getElementById(Equitacion.form.NOMBRE).disabled = deshabilitando
     return this
 }
 
 /**
  * Establece disable = true en los campos editables
  * @returns El propio objeto Equitacion, para concatenar llamadas
  */
 Equitacion.deshabilitarCamposEditablesNombre = function () {
     Equitacion.habilitarDeshabilitarCamposEditablesNombre(true)
     return this
 }
 /**
  * Establece disable = true en los campos editables
  * @returns El propio objeto Equitacion, para concatenar llamadas
  */
 Equitacion.habilitarCamposEditablesNombre = function () {
     Equitacion.habilitarDeshabilitarCamposEditablesNombre(false)
     return this
 }
 /**
  * Función que permite modificar los datos de un deportista
  */
 Equitacion.editarNombre = function () {
     this.habilitarCamposEditablesNombre()
 }
 /**
  * Establece disable = habilitando en los campos editables
  * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
  * @returns El propio objeto Equitacion, para concatenar llamadas
  */
 Equitacion.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
     deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
     document.getElementById(Equitacion.form.NOMBRE).disabled = deshabilitando
     document.getElementById(Equitacion.form.APELLIDO).disabled = deshabilitando
     document.getElementById(Equitacion.form.CABALLOS).disabled = deshabilitando
     document.getElementById(Equitacion.form.ANIOSPARTICPACIONJJOO).disabled = deshabilitando
     return this
 }
 /**
  * Establece disable = true en los campos editables
  * @returns El propio objeto Equitacion, para concatenar llamadas
  */
 Equitacion.deshabilitarCamposEditables = function () {
     Equitacion.habilitarDeshabilitarCamposEditables(true)
     return this
 }
 /**
  * Establece disable = true en los campos editables
  * @returns El propio objeto Equitacion, para concatenar llamadas
  */
 Equitacion.habilitarCamposEditables = function () {
     Equitacion.habilitarDeshabilitarCamposEditables(false)
     return this
 }
 /**
  * Función que permite modificar los datos de un deportista
  */
 Equitacion.editar = function () {
     this.habilitarCamposEditables()
 }
 
 /**
  * Función que permite cancelar la acción sobre los datos de un deportista
  */
 ///////////////////////TEST////////////////////////
 Equitacion.cancelar = function () {
     this.imprimeUnDeportista(this.recuperaDatosAlmacenados())
     this.deshabilitarCamposEditables()
 }
 /**
 * Función para guardar los nuevos datos de un deportista
 */
 ///////////////////////TEST////////////////////////
 Equitacion.guardar = async function () {
     try {
         //let url = Frontend.API_GATEWAY + "/equitacion/setNombre/"
         let url = Frontend.API_GATEWAY + "/equitacion/setCuatroCampos/"
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
         Equitacion.mostrarDeportista(id_deportista)
     } catch (error) {
         alert("Error: No se han podido acceder al API Gateway " + error)
         //console.error(error)
     }
 }
 