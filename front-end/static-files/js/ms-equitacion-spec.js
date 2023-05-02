/**
 * @file ms-eqitacion-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Equitacion en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Equitacion Home"
const TITULO_ACERCA_DE = "Equitacion Acerca de"

const datosDescargadosPrueba = {
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
describe("Equitacion.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Equitacion.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Equitacion.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
          Equitacion.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Equitacion.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Equitacion.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Equitacion.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Equitacion.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Equitacion.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
          Equitacion.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Equitacion.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
          Equitacion.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Equitacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
          Equitacion.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Equitacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Equitacion.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Equitacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Equitacion.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Equitacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Equitacion.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Equitacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Equitacion.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Equitacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Equitacion.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Equitacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
          Equitacion.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Equitacion.descargarRuta
 - Equitacion.procesarAcercaDe
 - Equitacion.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */


// SPECS para Jasmine
//Equitacion.sustituyeTags()
describe("Equitacion.sustituyeTags", function () {
      let equitacion;
      let deportista;
  
      beforeEach(() => {
        equitacion = "Mi nombre es ### NOMBRE ### y mi nacionalidad es ### NACIONALIDAD ### y naci en el año ### FECHA DE NACIMIENTO Anio ###";
        deportista = {
          ref: { "@ref": { id: "123456" } },
          data: {
            nombre: "Juan",
            apellido: "Pérez",
            fechaNacimiento: { dia: 1, mes: 1, anio: 2000 },
            nacionalidad: "Española",
            edad: 23,
            disciplinas: ["Natación", "Atletismo"],
            caballos: ["Caballo 1", "Caballo 2"],
            aniosParticipacionJJOO: [2016, 2020],
          },
        };
      });
  
      it("Debe reemplazar el tag NOMBRE", () => {
        const result = Equitacion.sustituyeTags(equitacion, deportista);
        expect(result).toBe(`Mi nombre es Juan y mi nacionalidad es Española y naci en el año 2000`);
      });

      it("Debe reemplazar el tag NACIONALIDAD", () => {
        const result = Equitacion.sustituyeTags(equitacion, deportista);
        expect(result).toBe(`Mi nombre es Juan y mi nacionalidad es Española y naci en el año 2000`);
      });

      it("Debe reemplazar el tag FECHANACIMIENTOAnio", () => {
        const result = Equitacion.sustituyeTags(equitacion, deportista);
        expect(result).toBe(`Mi nombre es Juan y mi nacionalidad es Española y naci en el año 2000`);
      });

});

//Equitacion.equitacionFormularioDeportista.actualiza
describe("Equitacion.equitacion.actualiza", () => {
    it("Debe devolver el formulario con los valores del deportista actualizados", () => {
      const equitacion = Equitacion.equitacionFormularioDeportista.formulario;
      const deportista = {
        ref: { "@ref": { id: "123" } },
        data: {
          nombre: "Juan",
          apellido: "Pérez",
          fechaNacimiento: { dia: "01", mes: "01", anio: "1990" },
          nacionalidad: "Argentina",
          edad: "32",
          disciplinas: ["Natación", "Atletismo"],
          caballos: ["Caballo 1", "Caballo 2"],
          aniosParticipacionJJOO: "3"
        }
      };
      const equitacionTags = Equitacion.equitacionTags;
  
      const resultado = Equitacion.equitacionFormularioDeportista.actualiza(deportista);
  
      expect(resultado).toBeDefined();
      expect(resultado).not.toEqual(equitacion);
      expect(resultado).toContain(deportista.ref["@ref"].id);
      expect(resultado).toContain(deportista.data.nombre);
      expect(resultado).toContain(deportista.data.apellido);
      expect(resultado).toContain(`${deportista.data.fechaNacimiento.dia}/${deportista.data.fechaNacimiento.mes}/${deportista.data.fechaNacimiento.anio}`);
      expect(resultado).toContain(deportista.data.nacionalidad);
      expect(resultado).toContain(deportista.data.edad);
      expect(resultado).toContain(deportista.data.disciplinas[0]);
      expect(resultado).toContain(deportista.data.disciplinas[1]);
      expect(resultado).toContain(deportista.data.caballos[0]);
      expect(resultado).toContain(deportista.data.caballos[1]);
      expect(resultado).toContain(deportista.data.aniosParticipacionJJOO);
      expect(resultado).not.toContain(equitacionTags.ID);
      expect(resultado).not.toContain(equitacionTags.NOMBRE);
      expect(resultado).not.toContain(equitacionTags.APELLIDO);
      expect(resultado).not.toContain(equitacionTags.FECHANACIMIENTODia);
      expect(resultado).not.toContain(equitacionTags.FECHANACIMIENTOMes);
      expect(resultado).not.toContain(equitacionTags.FECHANACIMIENTOAnio);
      expect(resultado).not.toContain(equitacionTags.NACIONALIDAD);
      expect(resultado).not.toContain(equitacionTags.EDAD);
      expect(resultado).not.toContain(equitacionTags.DISCIPLINAS);
      expect(resultado).not.toContain(equitacionTags.CABALLOS);
      expect(resultado).not.toContain(equitacionTags.ANIOSPARTICPACIONJJOO);
    });
});

//Equitacion.deportistaComoFormulario
describe("Equitacion.deportistaComoFormulario", function () {
    it("Debería contenr la cabecera del formulario correctamente y el primer campo el id", function () {
        const deportista = {
            ref: { "@ref": { id: "123" } },
            data: {
              nombre: "Juan",
              apellido: "Pérez",
              fechaNacimiento: { dia: "01", mes: "01", anio: "1990" },
              nacionalidad: "Argentina",
              edad: "32",
              disciplinas: ["Natación", "Atletismo"],
              caballos: ["Caballo 1", "Caballo 2"],
              aniosParticipacionJJOO: "3"
            }
          };
        const contain = 
       `<thead>
            <th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th>
            <th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th>
            <th>Años de participación en los JJOO</th><th>Editar Nombre</th><th>Editar</th><th>Guardar</th><th>Cancelar</th>
        </thead>
        <tbody>
            <tr title ="123">
                <td><input type="text" class="form-deportista-elemento" disabled id="form-deportista-id"`

        const result = Equitacion.deportistaComoFormulario(deportista);
        expect(result).toContain(contain);
    });
});

//Tiene que estar todo en una misma linea no entiendo por que.
//Equitacion.cabeceraTable()
describe("Equitacion.cabeceraTable", function () {
    it("Debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            const expectedOutput = `<table class="listado-Equitacion"><thead><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th><th>Opcion</th></thead><tbody>`;
            expect(Equitacion.cabeceraTable()).toBe(expectedOutput);
        });
        it("Debería generar una tabla HTML con la cantidad de columnas esperada",
        function () {
            const expectedColumns = 10;
            const cabecera = Equitacion.cabeceraTable();
            const cabeceraHTML = document.createElement("div");
            cabeceraHTML.innerHTML = cabecera;
            const columnas = cabeceraHTML.querySelectorAll("th").length;
            expect(columnas).toBe(expectedColumns);
        });
});

//Equitacion.cabeceraTableNombres()
describe("Equitacion.cabeceraTableNombres", function () {
    it("Debería devolver las etiquetas HTML para la cabecera de tabla con una única columna para los nombres",
        function () {
            const expectedOutput = `<table class="listado-Equitacion"><thead><th>Nombre</th></thead><tbody>`;
            expect(Equitacion.cabeceraTableNombres()).toBe(expectedOutput);
        });
});

//Equitacion.cabeceraTableResultadosFormulario
describe("Equitacion.cabeceraTableResultadosFormulario", function () {
    it("Debería devolver una cadena que no contiene 'Opcion' pero sí contiene 'Nombre'", function () {
      const cabecera = Equitacion.cabeceraTableResultadosFormulario();
      expect(cabecera).not.toContain("Opcion");
      expect(cabecera).toContain("Nombre");
    });
});

//Equitacion.cuerpoTr
describe("Equitacion.cuerpoTr", function () {
    it("Genera correctamente la plantilla HTML", function () {
        // Preparar datos de prueba
        let p = {
            ref: {
                "@ref": {
                    id: "ref deportista 1"
                }
            },
            data: {
                nombre: "Nombre deportista 1",
                apellido: "Apellido deportista 1",
                fechaNacimiento: { dia: 1, mes: 1, anio: 2000 },
                nacionalidad: "Nacionalidad deportista 1",
                edad: 23,
                disciplinas: ["Disciplina 1", "Disciplina 2"],
                caballos: ["Caballo 1", "Caballo 2"],
                aniosParticipacionJJOO: [2016, 2020]
            }
        };

        let resultado = Equitacion.cuerpoTr(p);

        let esperado = `<tr><td>ref deportista 1</td><td>Nombre deportista 1</td><td>Apellido deportista 1</td><td>1/1/2000</td><td>Nacionalidad deportista 1</td><td>23</td><td>Disciplina 1, Disciplina 2</td><td>Caballo 1,Caballo 2</td><td>2016,2020</td><td><div><a href="javascript:Equitacion.mostrarDeportista('ref deportista 1')"">Mostrar</a></div></td></tr>`;
        expect(resultado).toEqual(esperado);
    });
});

//Equitacion.cuerpoTrResultadosFormulario
describe("Equitacion.cuerpoTrResultadosFormulario", function () {
    it("Debería devolver un tr con los datos del deportista correctamente", function () {
      const deportista = {
        ref: { '@ref': { id: 'abc123' } },
        data: {
          nombre: 'Juan',
          apellido: 'Pérez',
          fechaNacimiento: { dia: '01', mes: '01', anio: '1990' },
          nacionalidad: 'Argentina',
          edad: 33,
          disciplinas: ['Atletismo', 'Natación'],
          caballos: ['Caballo1', 'Caballo2'],
          aniosParticipacionJJOO: 3
        }
      };
      const expected = 
           `<tr><td>abc123</td>
    <td>Juan</td>
    <td>Pérez</td>
    <td>01/01/1990</td>
    <td>Argentina</td>
    <td>33</td>
    <td>Atletismo, Natación</td>
    <td>Caballo1,Caballo2</td>
    <td>3</td>
    </tr>`;
      const result = Equitacion.cuerpoTrResultadosFormulario(deportista);
      expect(result).toEqual(expected);
    });
  });

//Equitacion.cuerpoTrNombres()
describe("Equitacion.cuerpoTrNombres", function() {
    it("Debe generar un HTML con el nombre dado", function() {
      const nombre = "Paco";
      const htmlEsperado = `<tr><td>${nombre}</td></tr>`;
      expect(Equitacion.cuerpoTrNombres(nombre)).toEqual(htmlEsperado);
    });
});

//Equitacion.pieTable()
describe("Equitacion.pieTable", function () {
    it("Debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Equitacion.pieTable()).toBe("</tbody></table>");
        });
});

//Equitacion.formulario
describe('Equitacion.formulario', function () {
    it("Devuelve un string que contiene el formulario de búsqueda por nombre", function(){
        const expected =
           `<div id="div_formulario">
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
    expect(Equitacion.formulario()).toContain(expected);
    });
});

//Equitacion.formulario_dos
describe("Equitacion.formulario_dos", function() {
  it("Debe contener una tabla con 1 fila y 5 columnas", function() {
    // Crear el elemento div y añadir el formulario dentro
    const div = document.createElement("div");
    div.innerHTML = Equitacion.formulario_dos();

    // Verificar que la tabla tenga 1 fila y 5 columnas
    const table = div.querySelector("table.listado-Equitacion");
    const rows = table.querySelectorAll("tbody tr");
    expect(rows.length).toEqual(1);
    rows.forEach(function(row) {
      const cells = row.querySelectorAll("td");
      expect(cells.length).toEqual(5);
    });
  });
});


//Equitacion.imprime_nombres
describe("Equitacion.imprime_nombres", function() {
    it("Debe generar una tabla con los nombres dados", function() {
      const nombres = ["John Doe", "Jane Smith", "Mark Johnson"];
      spyOn(Equitacion, "cabeceraTableNombres").and.returnValue("<thead><tr><th>Nombres</th></tr></thead>");
      spyOn(Equitacion, "pieTable").and.returnValue("</table>");
      spyOn(Equitacion, "cuerpoTrNombres").and.callFake(function(nombre) {
        return `<tr><td>${nombre}</td></tr>`;
      });
      spyOn(Frontend.Article, "actualizar");
  
      Equitacion.imprime_nombres(nombres);
  
      expect(Equitacion.cabeceraTableNombres).toHaveBeenCalled();
      expect(Equitacion.pieTable).toHaveBeenCalled();
      expect(Equitacion.cuerpoTrNombres.calls.allArgs()).toEqual([
        ["John Doe"],
        ["Jane Smith"],
        ["Mark Johnson"]
      ]);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de los nombres de los deportistas de equitacion", "<thead><tr><th>Nombres</th></tr></thead><tr><td>John Doe</td></tr><tr><td>Jane Smith</td></tr><tr><td>Mark Johnson</td></tr></table>");
    });
});

//Equitacion.imprime_alfabeticamente()
describe("Equitacion.imprime_alfabeticamente", function() {
    it("Debe generar una tabla con los nombres de los deportistas por orden alfabético", function() {
      let vector = [      
        {nombre: "Ana"},      
        {nombre: "Berta"},      
        {nombre: "Lucía"},      
        {nombre: "Pablo"}    
    ];
  
      // Configurar los espías para las funciones
      spyOn(Equitacion, "cabeceraTableNombres").and.returnValue("<thead><tr><th>Nombre</th></tr></thead>");
      spyOn(Equitacion, "cuerpoTrNombres").and.callFake(function(deportista) {
        return `<tr><td>${deportista.nombre}</td></tr>`;
      });
      spyOn(Equitacion, "pieTable").and.returnValue("</tbody></table>");
      spyOn(Frontend.Article, "actualizar");
  
      Equitacion.imprime_alfabeticamente(vector);
  
      const esperado = "<thead><tr><th>Nombre</th></tr></thead><tr><td>Ana</td></tr><tr><td>Berta</td></tr><tr><td>Lucía</td></tr><tr><td>Pablo</td></tr></tbody></table>";
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de los nombres de los deportistas de equitacion por orden alfabetico", esperado);
    });
  });

//Equitacion.imprime()
describe("Equitacion.imprime", function() {
    it("Debe generar una tabla con la información de los deportistas dados", function() {
    let vector = [
        {ref: {
            "@ref": {
                id: "ref deportista 1"
            }
        },
        data: {
        nombre: "Nombre deportista 1",
        apellido: "Apellido deportista 1",
        fechaNacimiento: { dia: 1, mes: 1, anio: 2000 },
        nacionalidad: "Nacionalidad deportista 1",
        edad: 23,
        disciplinas: ["Disciplina 1", "Disciplina 2"],
        caballos: ["Caballo 1", "Caballo 2"],
        aniosParticipacionJJOO: [2016, 2020]
        }
        },
        {
        ref: {
            "@ref": {
                id: "ref deportista 2"
            }
        },
        data: {
        nombre: "Nombre deportista 2",
        apellido: "Apellido deportista 2",
        fechaNacimiento: { dia: 2, mes: 2, anio: 2001 },
        nacionalidad: "Nacionalidad deportista 2",
        edad: 22,
        disciplinas: ["Disciplina 3", "Disciplina 4"],
        caballos: ["Caballo 3", "Caballo 4"],
        aniosParticipacionJJOO: [2016, 2020, 2024]
        }
        }
    ];

    // Configurar los espías para las funciones
    spyOn(Equitacion, "cabeceraTable").and.returnValue("<thead><tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th><th>Opcion</th></tr></thead>");
    spyOn(Equitacion, "cuerpoTr").and.callFake(function(deportista) {
        return `<tr><td>${deportista.ref['@ref'].id}</td><td>${deportista.data.nombre}</td><td>${deportista.data.apellido}</td><td>${deportista.data.fechaNacimiento.dia}/${deportista.data.fechaNacimiento.mes}/${deportista.data.fechaNacimiento.anio}</td><td>${deportista.data.nacionalidad}</td><td>${deportista.data.edad}</td><td>${deportista.data.disciplinas.join(", ")}</td><td>${deportista.data.caballos.join(", ")}</td><td>${deportista.data.aniosParticipacionJJOO.join(", ")}</td><td><div><a href="javascript:Equitacion.mostrarDeportista('${deportista.ref['@ref'].id}')"">Mostrar</a></div></td></tr>`;
    });
    spyOn(Equitacion, "pieTable").and.returnValue("</tbody></table>");
    spyOn(Frontend.Article, "actualizar");

    Equitacion.imprime(vector);

    const esperado = "<thead><tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th><th>Opcion</th></tr></thead><tr><td>ref deportista 1</td><td>Nombre deportista 1</td><td>Apellido deportista 1</td><td>1/1/2000</td><td>Nacionalidad deportista 1</td><td>23</td><td>Disciplina 1, Disciplina 2</td><td>Caballo 1, Caballo 2</td><td>2016, 2020</td><td><div><a href=\"javascript:Equitacion.mostrarDeportista('ref deportista 1')\">Mostrar</a></div></td></tr><tr><td>ref deportista 2</td><td>Nombre deportista 2</td><td>Apellido deportista 2</td><td>2/2/2001</td><td>Nacionalidad deportista 2</td><td>22</td><td>Disciplina 2, Disciplina 3</td><td>Caballo 2, Caballo 3</td><td>2020, 2024</td><td><div><a href=\"javascript:Equitacion.mostrarDeportista('ref deportista 2')\">Mostrar</a></div></td></tr></tbody></table>";
    expect(Frontend.Article.actualizar).toHaveBeenCalled();
    expect(Frontend.Article.actualizar.calls.mostRecent().args[0]).toBe("Listado de deportistas de equitacion con toda su información", esperado);
    });
});

//Equitacion.almacenaDatos()
describe('Equitacion.almacenaDatos', () => {
    it('Debe almacenar correctamente los datos del deportista', () => {
      const deportista = {
        nombre: "Nombre deportista 2",
        apellido: "Apellido deportista 2",
        fechaNacimiento: { dia: 2, mes: 2, anio: 2001 },
        nacionalidad: "Nacionalidad deportista 2",
        edad: 22,
        disciplinas: ["Disciplina 3", "Disciplina 4"],
        caballos: ["Caballo 3", "Caballo 4"],
        aniosParticipacionJJOO: [2016, 2020, 2024]
        }
      
        Equitacion.almacenaDatos(deportista)
  
      expect(Equitacion.deportistaMostrado).toEqual(deportista)
    })
  })

//Equitacion.recuperaDatosAlmacenados
describe("Equitacion.recuperaDatosAlmacenados", function() {
    it("Debe retornar null si no hay datos almacenados", function() {
      Equitacion.deportistaMostrado = null;
        expect(Equitacion.recuperaDatosAlmacenados()).toBeNull();
    });
    
    it("Debe retornar los datos almacenados", function() {
      Equitacion.deportistaMostrado = {nombre: "Juan", edad: 25, deporte: "equitacion"};
        expect(Equitacion.recuperaDatosAlmacenados()).toEqual({nombre: "Juan", edad: 25, deporte: "equitacion"});
    });
});

//Equitacion.imprimeformulario

//Equitacion.mostrar

//Equitacion.deshabilitarCamposEditablesNombre
describe("Equitacion.deshabilitarCamposEditablesNombre", function() {
    it("Deshabilita el campo editable correspondiente al nombre del deportista", function() {
      spyOn(Equitacion, "habilitarDeshabilitarCamposEditablesNombre");
  
      Equitacion.deshabilitarCamposEditablesNombre();
  
      expect(Equitacion.habilitarDeshabilitarCamposEditablesNombre).toHaveBeenCalledWith(true);
    });
});

//Equitacion.habilitarCamposEditablesNombre
describe("Equitacion.habilitarCamposEditablesNombre", function() {
    it("Habilita el campo editable correspondiente al nombre del deportista", function() {
      spyOn(Equitacion, "habilitarDeshabilitarCamposEditablesNombre");
  
      Equitacion.habilitarCamposEditablesNombre();
  
      expect(Equitacion.habilitarDeshabilitarCamposEditablesNombre).toHaveBeenCalledWith(false);
    });
});

//Equitacion.editarNombre
describe("Equitacion.editarNombre", function() {
    it("Debe habilitar los campos editables de nombre", function() {
        spyOn(Equitacion, "habilitarDeshabilitarCamposEditablesNombre");

        Equitacion.editarNombre();

        expect(Equitacion.habilitarDeshabilitarCamposEditablesNombre).toHaveBeenCalledWith(false);
    });
});
//Equitacion.habilitarDeshabilitarCamposEditables
describe("Equitacion.habilitarDeshabilitarCamposEditables", function() {
    it("Debería deshabilitar todos los campos editables cuando se le pasa 'true' como parámetro", function() {
      const inputNombre = document.createElement('input');
      inputNombre.setAttribute('id', Equitacion.form.NOMBRE);
      inputNombre.removeAttribute('disabled');
      document.body.appendChild(inputNombre);

      const inputApellido = document.createElement('input');
      inputApellido.setAttribute('id', Equitacion.form.APELLIDO);
      inputApellido.removeAttribute('disabled');
      document.body.appendChild(inputApellido);

      const inputCaballos = document.createElement('input');
      inputCaballos.setAttribute('id', Equitacion.form.CABALLOS);
      inputCaballos.removeAttribute('disabled');
      document.body.appendChild(inputCaballos);

      const inputAnios = document.createElement('input');
      inputAnios.setAttribute('id', Equitacion.form.ANIOSPARTICPACIONJJOO);
      inputAnios.removeAttribute('disabled');
      document.body.appendChild(inputAnios);

      const deshabilitando = true;
      
      Equitacion.habilitarDeshabilitarCamposEditables(deshabilitando);
  
      expect(inputNombre.disabled).toBe(true);
      expect(inputApellido.disabled).toBe(true);
      expect(inputCaballos.disabled).toBe(true);
      expect(inputAnios.disabled).toBe(true);
    });
});

//Equitacion.deshabilitarCamposEditables
describe("Equitacion.deshabilitarCamposEditables", function() {
    it("Deshabilita los campos editable correspondientes del deportista", function() {
      spyOn(Equitacion, "habilitarDeshabilitarCamposEditables");
  
      Equitacion.deshabilitarCamposEditables();
  
      expect(Equitacion.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
    });
});

//Equitacion.habilitarCamposEditables
describe("Equitacion.habilitarCamposEditables", function() {
    it("Habilita el campo editable correspondiente al nombre del deportista", function() {
      spyOn(Equitacion, "habilitarDeshabilitarCamposEditables");
  
      Equitacion.habilitarCamposEditables();
  
      expect(Equitacion.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
    });
});

//Equitacion.editar
describe("Equitacion.editar", function() {
    it("Debe habilitar los campos editables", function() {
        spyOn(Equitacion, "habilitarDeshabilitarCamposEditables");

        Equitacion.editar();

        expect(Equitacion.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
    });
});
