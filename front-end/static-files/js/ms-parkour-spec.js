/**
 * @file ms-Parkour-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Parkour en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloRaul = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO);
const elementoContenidoRaul = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO);
const TITULO_HOMERaul = "Parkour Home";
const TITULO_ACERCA_DERaul = "Parkour Acerca de";
const MOSTRAR_NOMBRES_JUGADORESRaul = "Listado de proyectos";
const OBJETO_VACIORaul = "";

const datosDescargadosPruebaRaul = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Parkour.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Parkour.mostrarHome()
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_HOMERaul)
            expect(elementoContenidoRaul.innerHTML).toBe(Parkour.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Parkour.mostrarHome(23)
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_HOMERaul)
            expect(elementoContenidoRaul.innerHTML).toBe(Parkour.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Parkour.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOMERaul)
            expect(elementoContenidoRaul.innerHTML).toBe(Parkour.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Parkour.mostrarHome({ foo: "bar" })
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_HOMERaul)
            expect(elementoContenidoRaul.innerHTML).toBe(Parkour.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Parkour.mostrarHome(datosDescargadosPrueba)
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_HOMERaul)
            expect(elementoContenidoRaul.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Parkour.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Parkour.mostrarAcercaDe()
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_ACERCA_DERaul)
            expect(elementoContenidoRaul.innerHTML.search(Parkour.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Parkour.mostrarAcercaDe(23)
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_ACERCA_DERaul)
            expect(elementoContenidoRaul.innerHTML.search(Parkour.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Parkour.mostrarAcercaDe({})
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_ACERCA_DERaul)
            expect(elementoContenidoRaul.innerHTML.search(Parkour.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Parkour.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_ACERCA_DERaul)
            expect(elementoContenidoRaul.innerHTML.search(Parkour.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Parkour.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_ACERCA_DERaul)
            expect(elementoContenidoRaul.innerHTML.search(Parkour.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Parkour.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_ACERCA_DERaul)
            expect(elementoContenidoRaul.innerHTML.search(Parkour.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Parkour.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_ACERCA_DERaul)
            expect(elementoContenidoRaul.innerHTML.search(Parkour.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Parkour.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTituloRaul.innerHTML).toBe(TITULO_ACERCA_DERaul)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidoRaul.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenidoRaul.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenidoRaul.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})



/* EXPECTS HISTORIA DE USUARIO 3 */

describe('Parkour.imprime', function () {
  // Realizo los expect
  it("debería mostrar una tabla con todos los datos de las personas de la Parkour",
      function () {
          const vector = [
              {
                  ref: { "@ref": { id: "ref persona 1" } },
                  data: { 
                      Nombre_completo: { Nombre: "Pedro", Apellidos: "Cortes Heredia" },
                  }
              },
              {
                  ref: { "@ref": { id: "ref persona 2" } },
                  data: { 
                      Nombre_completo: { Nombre: "Jose", Apellidos: "Fernandez Cortes" },
                     
              }
              }
          ];

          const expectedMsj = Parkour.cabeceraTable() + Parkour.cuerpoTr(vector[0]) + Parkour.cuerpoTr(vector[1]) + Parkour.pieTable();
          spyOn(Frontend.Article, 'actualizar');
          Parkour.imprime(vector);
          expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de proyectos', expectedMsj);
      });
})



describe("Parkour.pieTable ", function () {
  it("Debe devolverse el codigo html del pie de tabla",
      function () {
          expect(Parkour.pieTable()).toBe("</tbody></table>");
      });
});

describe("Parkour.cabeceraTable", function() {
  it('existe la función cabeceraTable', () => {
    expect(Parkour.cabeceraTable).toBeDefined();
  });

  it('devuelve una cadena de texto', () => {
    const resultado = Parkour.cabeceraTable();
    expect(typeof resultado).toBe('string');
  });

  it('devuelve una tabla con la clase "listado-proyectos"', () => {
    const resultado = Parkour.cabeceraTable();
    expect(resultado).toContain('<table class="listado-proyectos"');
  });

  it('devuelve una tabla con la etiqueta "thead"', () => {
    const resultado = Parkour.cabeceraTable();
    expect(resultado).toContain('<thead>');
  });

  it('devuelve una tabla con dos columnas', () => {
    const resultado = Parkour.cabeceraTable();
    expect(resultado).toContain('<th>nombreCompleto</th>');
  });

  it('devuelve una tabla con el ID "myTable"', () => {
    const resultado = Parkour.cabeceraTable();
    expect(resultado).toContain('id="myTable"');
  });
});




  
describe("Cuerpotr hu2", function(){

  it("comprueba que la función rellena la tabla correctamente con solo los nombres completos de los jugadores", function() {
      const c = {
          data: {
            nombre: 'Pedro',
            apellidos: ' Cortes Heredia'
          }
      };
      const resultado=Parkour.cuerpoTr(c);
      expect(resultado).toBe('<tr><td><em>Pedro Cortes Heredia</em></td></tr>');

  });
})


/* EXPECTS HISTORIA DE USUARIO 3(Son los mismos que en la HU2) */

/* EXPECTS HISTORIA DE USUARIO 4*/

describe("Funcion imprime.Todo que muestra todos los datos de los jugadores", function(){
    
  it("debería mostrar una tabla con todos los datos de las personas de la Parkour",
  function () {
      const vector = [
        {
          ref: { "@ref": { id: "ref persona 1" } },
          data: { 
            nombre: "Proyecto 1",
            apellidos: "Apellido 1",
            fecha_de_nacimiento: { dia: 1, mes: 1, año: 2000 },
            participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
            Participaciones_en_eventos_a_nivel_internacional: 3,
            numero_de_trofeos_conseguidos: 2,
          }
        },
        {
          ref: { "@ref": { id: "ref persona 2" } },
          data: { 
            nombre: "Proyecto 1",
            apellidos: "Apellido 1",
            fecha_de_nacimiento: { dia: 1, mes: 1, año: 2000 },
            participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
            Participaciones_en_eventos_a_nivel_internacional: 3,
            numero_de_trofeos_conseguidos: 2,
             
          }
        }
    ];
      const expectedMsj = Parkour.cabeceraTableTodo() + Parkour.cuerpoTrTodo(vector[0]) + Parkour.cuerpoTrTodo(vector[1]) + Parkour.pieTable();
      spyOn(Frontend.Article, 'actualizar');
      Parkour.imprimeTodo(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de proyectos', expectedMsj);
  })
});


describe("Parkour.cabeceraTableTodo()", function() {
  it("Debe devolver la informacion de las distintas columnas de un jugador", function() {
    const expected = `<table class="listado-proyectos" id="myTable">
        <thead>
        <th>nombre</th>
        <th>apellidos</th>
        <th>fecha_nacimiento</th>
        <th>participaciones_comp_oficiales</th>
        <th>participaciones_comp_internacional</th>
        <th>numero_trofeos</th>
        </thead>`;
    const result = Parkour.cabeceraTableTodo();
    expect(result).toEqual(expected);
  });
});

describe("Parkour.cuerpoTrTodo", () => {
  it("debe devolver un string con los datos de los jugadores en HTML", () => {
    const proyecto = {
      data: {
        nombre: "nombre 1",
        apellidos: "Apellido 1",
        fecha_de_nacimiento: { dia: 1, mes: 1, año: 2000 },
        participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
        Participaciones_en_eventos_a_nivel_internacional: 3,
        numero_de_trofeos_conseguidos: 2,
      },
      ref: { "@ref": { id: "123456" } },
    };
    const expectedOutput = `<tr title="123456">
    <td>nombre 1</td>
    <td>Apellido 1</td>
    <td>1/1/2000</td>
    <td>2005,2006,2007,2009,2010,2012,2013,2014</td>
    <td>3</td>
    <td>2</td>
    </tr>
    `;

    const result = Parkour.cuerpoTrTodo(proyecto);

    expect(result).toBe(expectedOutput);
  });
});

/* EXPECTS HISTORIA DE USUARIO 6*/



  describe("personaComoFormulario", function() {
    it("comprueba que la función devuelve el formulario de persona correctamente actualizado", function() {
      const persona = {
        ref: {
          '@ref': {
            id: '222222'
          }
        },
        data: {
          nombre: 'Pedro',
          apellidos: 'Cortes Heredia',
          participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
          Participaciones_en_eventos_a_nivel_internacional: 5,
          numero_de_trofeos_conseguidos: 3
        }
      };

      const formulario = '<form><input type="text" name="nombre" value="' + persona.data.nombre + '">' +
                          '<input type="text" name="apellidos" value="' + persona.data.apellidos + '">' +
                          '<input type="number" name="participaciones_en_competiciones_oficiales" value="' + persona.data.participaciones_en_competiciones_oficiales + '">' +
                          '<input type="number" name="Participaciones_en_eventos_a_nivel_internacional" value="' + persona.data.Participaciones_en_eventos_a_nivel_internacional + '">' +
                          '<input type="number" name="numero_de_trofeos_conseguidos" value="' + persona.data.numero_de_trofeos_conseguidos + '">' +
                          '<input type="hidden" name="id" value="' + persona.ref['@ref'].id + '">' +
                          '<input type="submit" value="Enviar"></form>';

      spyOn(Parkour, 'sustituyeTags').and.returnValue(formulario);

      const resultado = Parkour.personaComoFormulario(persona);

      expect(Parkour.sustituyeTags).toHaveBeenCalledWith(Parkour.ParkourFormularioPersona.formulario, persona);
      expect(resultado).toBe(formulario);
    });
  });


  describe("Parkour.imprimeUnaPersona", function () {

    let persona = {
      ref: {
        '@ref': {
          id: 'persona123'
        }
      },
      data: {
        nombre: 'Pedro',
        apellidos: 'Cortes Heredia',
        participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
        Participaciones_en_eventos_a_nivel_internacional: 2,
        numero_de_trofeos_conseguidos: 3
      }
    };
  
    beforeEach(function () {
      spyOn(Parkour, 'personaComoFormulario').and.returnValue('<form></form>');
      spyOn(Frontend.Article, 'actualizar');
      spyOn(Parkour, 'almacenaDatos');
    });
  
    it("llama a Parkour.personaComoFormulario con la persona correspondiente", function () {
      Parkour.imprimeUnaPersona(persona);
      expect(Parkour.personaComoFormulario).toHaveBeenCalledWith(persona);
    });
  
    it("actualiza el artículo con el formulario generado por Parkour.personaComoFormulario", function () {
      Parkour.imprimeUnaPersona(persona);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Mostrar una persona", '<form></form>');
    });
  
    it("almacena los datos de la persona", function () {
      Parkour.imprimeUnaPersona(persona);
      expect(Parkour.almacenaDatos).toHaveBeenCalledWith(persona);
    });
  
  });
  

  describe("Prueba de Parkour.mostrarP()", function() {
    let recuperaUnaPersonaSpy, imprimeUnaPersonaSpy;
  
    beforeEach(function() {

      recuperaUnaPersonaSpy = spyOn(Parkour, "recuperaUnaPersona");
      imprimeUnaPersonaSpy = spyOn(Parkour, "imprimeUnaPersona");
    });
  
    it("debe llamar a Parkour.recuperaUnaPersona() con el ID de la persona", function() {
      // Configurar la prueba
      const idPersona = "666666";
  
      // Ejecutar el código a probar
      Parkour.mostrarP(idPersona);
  
      // Comprobar el resultado
      expect(recuperaUnaPersonaSpy).toHaveBeenCalledWith(idPersona, jasmine.any(Function));
    });
  
    it("debe llamar a Parkour.imprimeUnaPersona() con la persona recuperada", function() {
      // Configurar la prueba
      const persona = {
        ref: { "@ref": { id: "666666" } },
        data: {
          nombre: "Pedro",
          apellidos: "Cortes Heredia",
          participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
          Participaciones_en_eventos_a_nivel_internacional: 5,
          numero_de_trofeos_conseguidos: 3
        }
      };
      recuperaUnaPersonaSpy.and.callFake(function(id, callBackFn) {
        callBackFn(persona);
      });
  
      Parkour.mostrarP("666666");
  
      expect(imprimeUnaPersonaSpy).toHaveBeenCalledWith(persona);
    });
  });


  describe('Parkour.almacenaDatos', () => {
    it('debe almacenar correctamente la persona mostrada', () => {
      const persona = {
        ref: { '@ref': { id: '666666' } },
        data: {
          nombre: 'Pedro',
          apellidos: 'Cortes Heredia',
          participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
          Participaciones_en_eventos_a_nivel_internacional: 2,
          numero_de_trofeos_conseguidos: 3
        }
      };
  
      Parkour.almacenaDatos(persona);
  
      expect(Parkour.personaMostrada).toEqual(persona);
    });
  });
  


  describe("Parkour Tags", function () {

    it("debería tener un tag para el ID", function () {
      expect(Parkour.ParkourTags.ID).toBeDefined();
      expect(typeof Parkour.ParkourTags.ID).toBe("string");
    });
  
    it("debería tener un tag para el nombre", function () {
      expect(Parkour.ParkourTags.NOMBRE).toBeDefined();
      expect(typeof Parkour.ParkourTags.NOMBRE).toBe("string");
    });
  
    it("debería tener un tag para los apellidos", function () {
      expect(Parkour.ParkourTags.APELLIDOS).toBeDefined();
      expect(typeof Parkour.ParkourTags.APELLIDOS).toBe("string");
    });
  
    it("debería tener un tag para las competiciones oficiales", function () {
      expect(Parkour.ParkourTags.COMPETICIONES_OFICIALES).toBeDefined();
      expect(typeof Parkour.ParkourTags.COMPETICIONES_OFICIALES).toBe("string");
    });
  
    it("debería tener un tag para las participaciones internacionales", function () {
      expect(Parkour.ParkourTags.PARTICIPACIONES_INTERNACIONALES).toBeDefined();
      expect(typeof Parkour.ParkourTags.PARTICIPACIONES_INTERNACIONALES).toBe("string");
    });
  
    it("debería tener un tag para los trofeos conseguidos", function () {
      expect(Parkour.ParkourTags.TROFEOS_CONSEGUIDOS).toBeDefined();
      expect(typeof Parkour.ParkourTags.TROFEOS_CONSEGUIDOS).toBe("string");
    });
  
  });
  





  describe("Parkour.form", function() {
    it("debe tener una propiedad ID", function() {
      expect(Parkour.form.hasOwnProperty('ID')).toBe(true);
    });
  
    it("debe tener una propiedad NOMBRE", function() {
      expect(Parkour.form.hasOwnProperty('NOMBRE')).toBe(true);
    });
  
    it("debe tener una propiedad APELLIDOS", function() {
      expect(Parkour.form.hasOwnProperty('APELLIDOS')).toBe(true);
    });
  
    it("debe tener una propiedad COMPETICIONES_OFICIALES", function() {
      expect(Parkour.form.hasOwnProperty('COMPETICIONES_OFICIALES')).toBe(true);
    });
  
    it("debe tener una propiedad PARTICIPACIONES_INTERNACIONALES", function() {
      expect(Parkour.form.hasOwnProperty('PARTICIPACIONES_INTERNACIONALES')).toBe(true);
    });
  
    it("debe tener una propiedad TROFEOS_CONSEGUIDOS", function() {
      expect(Parkour.form.hasOwnProperty('TROFEOS_CONSEGUIDOS')).toBe(true);
    });
  });
  
  
describe("Parkour.ParkourFormularioPersona.formulario", function() {
  it("debe contener las etiquetas de Parkour correspondientes", function() {
    expect(Parkour.ParkourFormularioPersona.formulario).toContain("form-persona-id");
    expect(Parkour.ParkourFormularioPersona.formulario).toContain("form-persona-nombre");
    expect(Parkour.ParkourFormularioPersona.formulario).toContain("form-persona-apellidos");
    expect(Parkour.ParkourFormularioPersona.formulario).toContain("form-persona-competiciones_oficiales");
    expect(Parkour.ParkourFormularioPersona.formulario).toContain("form-persona-participaciones_oficiales");
    expect(Parkour.ParkourFormularioPersona.formulario).toContain("form-persona-trofeosConseguidos");
  });
});




describe("almacenaDatos", function() {
  it("debe almacenar la persona proporcionada", function() {
    var persona = {
      ID: "666666",
      NOMBRE: "Pedro",
      APELLIDOS: "Cortes Heredia",
      COMPETICIONES_OFICIALES: [2005,2006,2007,2009,2010,2012,2013,2014],
      PARTICIPACIONES_INTERNACIONALES: "1",
      TROFEOS_CONSEGUIDOS: "2"
    };
    Parkour.almacenaDatos(persona);
    expect(Parkour.personaMostrada).toEqual(persona);
  });
});




  
  

/* EXPECTS HISTORIA DE USUARIO 8*/


describe("Parkour.listarBuscador", () => {
  it("should call Parkour.recuperaBuscador with search parameter", () => {
    spyOn(Parkour, "recuperaBuscador");
    const search = "Pedro Cortes";
    Parkour.listarBuscador(search);
    expect(Parkour.recuperaBuscador).toHaveBeenCalledWith(Parkour.imprime, search);
  });
});







/* EXPECTS HISTORIA DE USUARIO 12 y 13*/

describe('Parkour.ModificarDatos', () => {
  it('Debe llamar a la función recupera con la función imprimeMuchasPersonas como argumento', () => {
    spyOn(Parkour, 'recupera');
    spyOn(Parkour, 'imprimeMuchasPersonas');
    Parkour.ModificarDatos();
    expect(Parkour.recupera).toHaveBeenCalledWith(Parkour.imprimeMuchasPersonas);
  });
});


describe("Parkour.ParkourTablaPersonas.cabecera", function() {
  it("Debería generar la cabecera de una tabla HTML con las columnas y encabezados correspondientes", function() {
    const columnasEsperadas = [
      "Id",
      "nombre",
      "apellidos",
      "fecha_nacimiento",
      "participaciones_comp_oficiales",
      "participaciones_comp_internacional",
      "numero_trofeos"
    ];

    const resultado = Parkour.ParkourTablaPersonas.cabecera;

    const cabeceraEsperada = `
      <table width="100%" class="listado-proyectos">
        <thead>
          <tr>
            ${columnasEsperadas.map(c => `<th>${c}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
    `;
  });

  it("Debería incluir una etiqueta de cierre para la tabla HTML", function() {


    const resultado = Parkour.ParkourTablaPersonas.cabecera;

    expect(resultado.endsWith("<tbody>")).toBe(true);
  });

  it("Debería tener una clase 'listado-proyectos'", function() {
    

    const resultado = Parkour.ParkourTablaPersonas.cabecera;
    expect(resultado.includes('class="listado-proyectos"')).toBe(true);
  });

  it("Debería tener una etiqueta <thead> y <tbody> en la estructura de la tabla HTML", function() {
    
  
    const resultado = Parkour.ParkourTablaPersonas.cabecera;

  
    expect(resultado.includes("<thead>")).toBe(true);
    expect(resultado.includes("</thead>")).toBe(true);
    expect(resultado.includes("<tbody>")).toBe(true);
  });
});


describe("Parkour.ParkourTablaPersonas.pie", () => {
    it("debe contener la etiqueta </tbody>", () => {
      expect(Parkour.ParkourTablaPersonas.pie).toContain("</tbody>");
    });

    it("debe contener la etiqueta </table>", () => {
      expect(Parkour.ParkourTablaPersonas.pie).toContain("</table>");
    });

    it("debe tener una longitud mayor que cero", () => {
      expect(Parkour.ParkourTablaPersonas.pie.length).toBeGreaterThan(0);
    });
});







describe("personaComoFormulario2", function() {
  it("debe comprobar que la función devuelve el formulario de persona bien actualizado", function() {
    const persona = {
      ref: { "@ref": { id: "ref persona 2" } },
      data: { 
        nombre: "Persona 1",
        apellidos: "Apellidos",
        participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
        Participaciones_en_eventos_a_nivel_internacional: 3,
        numero_de_trofeos_conseguidos: 2,
    }
  }

    const formulario = '<form><input type="text" name="nombre" value="' + persona.data.nombre + '">' +
                        '<input type="text" name="pais" value="' + persona.data.apellidos + '">' +
                        '<input type="number" name="edad" value="' + persona.data.participaciones_en_competiciones_oficiales + '">' +
                        '<input type="text" name="modalidad" value="' + persona.data.Participaciones_en_eventos_a_nivel_internacional + '">' +
                        '<input type="number" name="grupo" value="' + persona.data.numero_de_trofeos_conseguidos + '">' +
                        '<input type="submit" value="Enviar"></form>';

    spyOn(Parkour, 'sustituyeTags').and.returnValue(formulario);

    const resultado = Parkour.personaComoFormulario(persona);

    expect(Parkour.sustituyeTags).toHaveBeenCalledWith(Parkour.ParkourFormularioPersona.formulario, persona);
    expect(resultado).toBe(formulario);
  });
});



describe('Parkour.imprimePersona', () => {
  const persona = {
    ref: { "@ref": { id: "ref persona 2" } },
    data: { 
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  };

  let actualizarSpy;
  let almacenaDatosSpy;

  beforeEach(() => {
    actualizarSpy = spyOn(Frontend.Article, 'actualizar');
    almacenaDatosSpy = spyOn(Parkour, 'almacenaDatos');
  });



  it('debe llamar a la función Parkour.personaComoFormulario', () => {
    spyOn(Parkour, 'personaComoFormulario');
    Parkour.imprimePersona(persona);
    expect(Parkour.personaComoFormulario).toHaveBeenCalledWith(persona);
  });
});




describe('Parkour.imprimePersona2', () => {
  const persona = {
    ref: { "@ref": { id: "ref persona 2" } },
    data: { 
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  };

  let actualizar;
  let almacenaDatos;
  let personaComoFormulario;

  beforeEach(() => {
    actualizar = spyOn(Frontend.Article, 'actualizar');
    almacenaDatos = spyOn(Parkour, 'almacenaDatos');
    personaComoFormulario = spyOn(Parkour, 'personaComoFormulario2').and.returnValue("Formulario de la persona");
  });

  it('debe llamar a la función Frontend.Article.actualizar con el mensaje correcto', () => {
    Parkour.imprimePersona2(persona);
    expect(actualizar).toHaveBeenCalledWith("Mostrar participante", "Formulario de la persona");
  });

  it('debe llamar a la función Parkour.almacenaDatos con la persona', () => {
    Parkour.imprimePersona2(persona);
    expect(almacenaDatos).toHaveBeenCalledWith(persona);
  });

  it('debe llamar a la función Parkour.personaComoFormulario2 con la persona', () => {
    Parkour.imprimePersona2(persona);
    expect(personaComoFormulario).toHaveBeenCalledWith(persona);
  });
});



describe('Parkour.almacenaDatos', () => {
  const persona = {
    ref: { "@ref": { id: "ref persona 2" } },
    data: { 
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  };

  it('debe almacenar correctamente la persona en Parkour.personaMostrada', () => {
    Parkour.almacenaDatos(persona);
    expect(Parkour.personaMostrada).toEqual(persona);
  });
});



describe('Parkour.recuperaDatosAlmacenados', () => {
  const persona = {
    ref: { "@ref": { id: "ref persona 2" } },
    data: { 
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  };

  beforeEach(() => {
    Parkour.personaMostrada = persona;
  });

  it('debe devolver la persona almacenada en Parkour.personaMostrada', () => {
    const personaRecuperada = Parkour.recuperaDatosAlmacenados();
    expect(personaRecuperada).toEqual(persona);
  });
});


describe('Parkour.deshabilitarCamposEditables', () => {
  let spyHabilitarDeshabilitarCamposEditables;
  beforeEach(() => {
    spyHabilitarDeshabilitarCamposEditables = spyOn(Parkour, 'habilitarDeshabilitarCamposEditables');
  });
  it('debe llamar a la función Parkour.habilitarDeshabilitarCamposEditables con true', () => {
    Parkour.deshabilitarCamposEditables();
    expect(spyHabilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
  });

  it('debe retornar la instancia de la Parkour', () => {
    const resultado = Parkour.deshabilitarCamposEditables();
    expect(resultado).toBe(Parkour);
  });
});



describe('Parkour.habilitarCamposEditables', () => {
  let spyHabilitarDeshabilitarCamposEditables;
  beforeEach(() => {
    spyHabilitarDeshabilitarCamposEditables = spyOn(Parkour, 'habilitarDeshabilitarCamposEditables');
  });

  it('debe llamar a la función Parkour.habilitarDeshabilitarCamposEditables con false', () => {
    Parkour.habilitarCamposEditables();
    expect(spyHabilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });

  it('debe retornar la instancia de la Parkour', () => {
    const resultado = Parkour.habilitarCamposEditables();
    expect(resultado).toBe(Parkour);
  });
});



describe('Parkour.ocultarOpcionesSecundarias', () => {
  let opcionesMostrarOcultarSpy;

  beforeEach(() => {
    opcionesMostrarOcultarSpy = spyOn(Parkour, 'opcionesMostrarOcultar');
  });

  it('debe llamar a la función Parkour.opcionesMostrarOcultar con el parámetro "opcion-secundaria" y false', () => {
    Parkour.ocultarOpcionesSecundarias();
    expect(opcionesMostrarOcultarSpy).toHaveBeenCalledWith("opcion-secundaria", false);
  });
});



describe('Parkour.mostrarOpcionesSecundarias', () => {
  let opcionesMostrarOcultarSpy;

  beforeEach(() => {
    opcionesMostrarOcultarSpy = spyOn(Parkour, 'opcionesMostrarOcultar');
  });

  it('debe llamar a la función Parkour.opcionesMostrarOcultar con el parámetro "opcion-secundaria" y true', () => {
    Parkour.mostrarOpcionesSecundarias();
    expect(opcionesMostrarOcultarSpy).toHaveBeenCalledWith("opcion-secundaria", true);
  });
});


describe('Parkour.mostrarOcionesTerciariasEditar', () => {
  let opcionesMostrarOcultarSpy;

  beforeEach(() => {
    opcionesMostrarOcultarSpy = spyOn(Parkour, 'opcionesMostrarOcultar');
  });

  it('debe llamar a la función Parkour.opcionesMostrarOcultar con classname="opcion-terciaria editar" y mostrando=true', () => {
    Parkour.mostrarOcionesTerciariasEditar();
    expect(opcionesMostrarOcultarSpy).toHaveBeenCalledWith("opcion-terciaria editar", true);
  });
});



describe('Parkour.ocultarOcionesTerciariasEditar', () => {
  let opcionesMostrarOcultarSpy;

  beforeEach(() => {
    opcionesMostrarOcultarSpy = spyOn(Parkour, 'opcionesMostrarOcultar');
  });

  it('debe llamar a la función Parkour.opcionesMostrarOcultar con los parámetros correctos', () => {
    Parkour.ocultarOcionesTerciariasEditar();
    expect(opcionesMostrarOcultarSpy).toHaveBeenCalledWith('opcion-terciaria editar', false);
  });
});


describe("Parkour.editar", function() {
  beforeEach(function() {
    spyOn(Parkour, "ocultarOpcionesSecundarias");
    spyOn(Parkour, "mostrarOcionesTerciariasEditar");
    spyOn(Parkour, "habilitarCamposEditables");
  });

  it("debe llamar a Parkour.ocultarOpcionesSecundarias", function() {
    Parkour.editar();
    expect(Parkour.ocultarOpcionesSecundarias).toHaveBeenCalled();
  });

  it("debe llamar a Parkour.mostrarOcionesTerciariasEditar", function() {
    Parkour.editar();
    expect(Parkour.mostrarOcionesTerciariasEditar).toHaveBeenCalled();
  });

  it("debe llamar a Parkour.habilitarCamposEditables", function() {
    Parkour.editar();
    expect(Parkour.habilitarCamposEditables).toHaveBeenCalled();
  });
});




describe("Parkour.cancelar", function() {
  beforeEach(function() {
    spyOn(Parkour, "imprimePersona2");
    spyOn(Parkour, "deshabilitarCamposEditables");
    spyOn(Parkour, "ocultarOcionesTerciariasEditar");
    spyOn(Parkour, "mostrarOpcionesSecundarias");
    spyOn(Parkour, "recuperaDatosAlmacenados").and.returnValue("datos de persona");
  });

  it("Tiene que llamar a imprimePersona2 con el resultado de recuperaDatosAlmacenados", function() {
    Parkour.cancelar();
    expect(Parkour.imprimePersona2).toHaveBeenCalledWith("datos de persona");
  });

  it("Tiene que llamar a deshabilitarCamposEditables", function() {
    Parkour.cancelar();
    expect(Parkour.deshabilitarCamposEditables).toHaveBeenCalled();
  });

  it("Tiene que llamar a ocultarOcionesTerciariasEditar", function() {
    Parkour.cancelar();
    expect(Parkour.ocultarOcionesTerciariasEditar).toHaveBeenCalled();
  });

  it("Tiene que llamar a mostrarOpcionesSecundarias", function() {
    Parkour.cancelar();
    expect(Parkour.mostrarOpcionesSecundarias).toHaveBeenCalled();
  });
});

/* EXPECTS HISTORIA DE USUARIO 9*/

describe('Parkour.buscarCampos', () => {
  const search2 = 'Juan';
  
  it('Llama a Parkour.BuscaCampos con los parámetros correctos', () => {
      const spy = spyOn(Parkour, 'BuscaCampos');
      Parkour.buscarCampos(search2); 
      
      expect(spy).toHaveBeenCalledWith(Parkour.imprimeTodo, search2); 
  });
});





/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Parkour.descargarRuta
 - Parkour.procesarAcercaDe
 - Parkour.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
