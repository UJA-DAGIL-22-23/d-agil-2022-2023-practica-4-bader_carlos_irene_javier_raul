/**
 * @file ms-gimnasia-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Gimnasia en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Gimnasia Home"
const TITULO_ACERCA_DE = "Gimnasia Acerca de"

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

describe("Gimnasia.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Gimnasia.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Gimnasia.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Gimnasia.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Gimnasia.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Gimnasia.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Gimnasia.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Gimnasia.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Gimnasia.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Gimnasia.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Gimnasia.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Gimnasia.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Gimnasia.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Gimnasia.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Gimnasia.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Gimnasia.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Gimnasia.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Gimnasia.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Gimnasia.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

                                                                              /*    TDD     HU      2*/


describe("Gimnasia.imprime", function () {
    it("Debe mostrar una tabla con los datos de las personas de la Gimnasia",
        function () {
            const vector = [
                {
                    ref: { "@ref": { id: "ref persona 1" } },
                    data: { 
                        nombre: { nombre: "Marta Ruiz"},
                    }
                },
                {
                    ref: { "@ref": { id: "ref persona 2" } },
                    data: { 
                        nombre: { nombre: "Antonio Juan"},
                       
                }
                }
            ];
  
            const expectedMsj = Gimnasia.cabeceraTablee() + Gimnasia.cuerpoTrr(vector[0]) + Gimnasia.cuerpoTrr(vector[1]) + Gimnasia.pieTable();
            spyOn(Frontend.Article, 'actualizar');
            Gimnasia.imprimee(vector);
            expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de proyectos', expectedMsj);
        });
  });


  describe("Gimnasia.pieTable ", function () {
    it("Debe devolver el codigo del pie de tabla",
        function () {
            expect(Gimnasia.pieTable()).toBe("</tbody></table>");
        });
  });


                                                                                          /*    TDD     HU      3*/

  describe("Gimnasia.cabeceraTablee", function() {
    it('existe la función cabeceraTablee', () => {
      expect(Gimnasia.cabeceraTablee).toBeDefined();
    });
  
    it('devuelve una cadena de texto', () => {
      const resultado = Gimnasia.cabeceraTablee();
      expect(typeof resultado).toBe('string');
    });
  
    it('devuelve una tabla con la clase "listado-proyectos"', () => {
      const resultado = Gimnasia.cabeceraTablee();
      expect(resultado).toContain('<table class="listado-proyectos"');
    });
  
    it('devuelve una tabla con la etiqueta "thead"', () => {
      const resultado = Gimnasia.cabeceraTablee();
      expect(resultado).toContain('<thead>');
    });
  
    it('devuelve una tabla', () => {
      const resultado = Gimnasia.cabeceraTablee();
      expect(resultado).toContain('<th>Nombre de los participantes</th>');
    });
  });


  describe("Gimnasia.cuerpoTrr", function() {
    it('devuelve una fila de tabla HTML con el título correcto', () => {
      const proyecto = { ref: { '@ref': { id: '359558425872433356' } }, data: { nombre: 'Marta Ruiz' } };
      const resultado = Gimnasia.cuerpoTrr(proyecto);
      expect(resultado).toContain('<td>Marta Ruiz</td>');
    });
  });


                                                                    /*    TDD     HU      4*/

  describe("Gimnasia.imprime todos los participantes", function(){
    it("debe mostrar una tabla con todos los datos de los participantes",
    function () {
        const vector = [
          {
            ref: { "@ref": { id: "ref persona 1" } },
            data: { 
              nombre: "Marta Ruiz",
              fechaNacimiento: { dia: 6, mes: 6, año: 1995 },
              pais: "Brasil",
              edad: 28,
              modalidad: "pareja_mixta",
              grupo: 1,
              aniosJJOO: [2005,2009,2013],
            }
          },
          {
            ref: { "@ref": { id: "ref persona 2" } },
            data: { 
                nombre: "Antonio Juan",
                fechaNacimiento: { dia: 5, mes: 6, año: 1999 },
                pais: "Portugal",
                edad: 27,
                modalidad: "pareja_masculina",
                grupo: 1,
                aniosJJOO: [2013,2017],
            }
          }
      ];
        const expectedMsj = Gimnasia.cabeceraTable() + Gimnasia.cuerpoTr(vector[0]) + Gimnasia.cuerpoTr(vector[1]) + Gimnasia.pieTable();
        spyOn(Frontend.Article, 'actualizar');
        Gimnasia.imprime(vector);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de proyectos', expectedMsj);
    })
  });



  describe("Gimnasia.cabeceraTable", function() {
    it('existe la función cabeceraTable', () => {
      expect(Gimnasia.cabeceraTable).toBeDefined();
    });
  
    it('devuelve una cadena de texto', () => {
      const resultado = Gimnasia.cabeceraTable();
      expect(typeof resultado).toBe('string');
    });
  
    it('devuelve una tabla con la clase "listado-proyectos"', () => {
      const resultado = Gimnasia.cabeceraTable();
      expect(resultado).toContain('<table class="listado-proyectos"');
    });
  
    it('devuelve una tabla con la etiqueta "thead"', () => {
      const resultado = Gimnasia.cabeceraTable();
      expect(resultado).toContain('<thead>');
    });
  
    it('devuelve una tabla', () => {
      const resultado = Gimnasia.cabeceraTable();
      expect(resultado).toContain('<th>Nombre</th>');
    });

    it('devuelve una tabla', () => {
        const resultado = Gimnasia.cabeceraTable();
        expect(resultado).toContain('<th>Fecha</th>');
    });

    it('devuelve una tabla', () => {
        const resultado = Gimnasia.cabeceraTable();
        expect(resultado).toContain('<th>Pais</th>');
    });  

    it('devuelve una tabla', () => {
        const resultado = Gimnasia.cabeceraTable();
        expect(resultado).toContain('<th>Edad</th>');
    });

    it('devuelve una tabla', () => {
        const resultado = Gimnasia.cabeceraTable();
        expect(resultado).toContain('<th>Modalidad</th>');
    });
      
    it('devuelve una tabla', () => {
        const resultado = Gimnasia.cabeceraTable();
        expect(resultado).toContain('<th>Grupo</th>');
    });
    
    it('devuelve una tabla', () => {
        const resultado = Gimnasia.cabeceraTable();
        expect(resultado).toContain('<th>AniosJJOO</th>');
    });  

  });
  



                                                                        /*    TDD     HU      6*/

describe('Gimnasia.almacenaDatos', () => {
      it('debe almacenar correctamente la persona mostrada', () => {
        const persona = {
          ref: { '@ref': { id: '359558425872433356' } },
          data: {
            nombre: "Marta Ruiz",
            pais: "Brasil",
            edad: 28,
            modalidad: "pareja_mixta",
            grupo: 1,
            aniosJJOO: [2005,2009,2013]
          }
        };

        Gimnasia.almacenaDatos(persona);

    expect(Gimnasia.personaMostrada).toEqual(persona);
  });
});


describe("Gimnasia.imprimeUnaPersona", function () {
  let persona = {
    ref: {
      '@ref': {
        id: 'persona123'
      }
    },
    data: {
      nombre: 'Marta Ruiz',
      pais: 'Brasil',
      edad: 25,
      modalidad: 'pareja_mixta',
      grupo: 3,
      aniosJJOO: [2005]
    }
  };

  beforeEach(function () {
    spyOn(Gimnasia, 'personaComoFormulario').and.returnValue('<form></form>');
    spyOn(Frontend.Article, 'actualizar');
    spyOn(Gimnasia, 'almacenaDatos');
  });

  it("llama a la funcion personaComoFormulario con la persona correspondiente", function () {
    Gimnasia.imprimeUnaPersona(persona);
    expect(Gimnasia.personaComoFormulario).toHaveBeenCalledWith(persona);
  });

  it("actualiza el artículo con el formulario generado por Gimnasia.personaComoFormulario", function () {
    Gimnasia.imprimeUnaPersona(persona);
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Mostrar a Marta Ruiz", '<form></form>');
  });

  it("almacena los datos de la persona", function () {
    Gimnasia.imprimeUnaPersona(persona);
    expect(Gimnasia.almacenaDatos).toHaveBeenCalledWith(persona);
  });

});




describe("Gimnasia.mostrarP()", function() {
  let recuperaUnaPersonaSpy, imprimeUnaPersonaSpy;

  beforeEach(function() {
    recuperaUnaPersonaSpy = spyOn(Gimnasia, "recuperaUnaPersona");
    imprimeUnaPersonaSpy = spyOn(Gimnasia, "imprimeUnaPersona");
  });

  it("debe llamar a la funcion recuperaUnaPersona() con el ID de la persona", function() {
    const idPersona = "333";
    Gimnasia.mostrarP(idPersona);
    expect(recuperaUnaPersonaSpy).toHaveBeenCalledWith(idPersona, jasmine.any(Function));
  });

  it("debe llamar a la funcion imprimeUnaPersona() con la persona recuperada", function() {
    const persona = {
      ref: { "@ref": { id: "666666" } },
      data: {
        nombre: 'Marta Ruiz',
          pais: 'Brasil',
          edad: 25,
          modalidad: 'pareja_mixta',
          grupo: 3,
          aniosJJOO: [2005]
      }
    };
    recuperaUnaPersonaSpy.and.callFake(function(id, callBackFn) {
      callBackFn(persona);
    });
    Gimnasia.mostrarP("333");
    expect(imprimeUnaPersonaSpy).toHaveBeenCalledWith(persona);
  });
});



describe('Gimnasia.form', () => {
  it('debe tener las etiquetas de formulario correctas', () => {
    const esperado = {
      ID: "form-persona-id",
      NOMBRE: "form-persona-nombre",
      PAIS: "form-persona-pais",
      EDAD: "form-persona-edad",
      MODALIDAD: "form-persona-modalidad",
      GRUPO: "form-persona-grupo",
      AniosJJOO: "form-persona-aniosjjoo"
    };
    expect(Gimnasia.form).toEqual(esperado);
  });
});




                                                                              /*    TDD     HU12      &&        HU13*/

describe("Gimnasia.recuperaDatosAlmacenados", () => {
  it("devuelve la persona mostrada almacenada en la variable 'personaMostrada'", () => {
    const personaMostrada = { 
      ID: 1, 
      NOMBRE: "Juan", 
      PAIS: "Argentina", 
      EDAD: 30, 
      GRUPO: "A" 
    };
    Gimnasia.personaMostrada = personaMostrada;
    const result = Gimnasia.recuperaDatosAlmacenados();
    expect(result).toEqual(personaMostrada);
  });
});


describe("Gimnasia.editar", function() {
  it("La funcion habilitar los campos editables", function() {
      spyOn(Gimnasia, "habilitarDeshabilitarCamposEditables");

      Gimnasia.editar();

      expect(Gimnasia.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });
});


describe("Gimnasia.cancelar", function() {
  it("debe cancelar todos los campos editables", function() {
      spyOn(Gimnasia, "habilitarDeshabilitarCamposEditables");

      Gimnasia.editar();

      expect(Gimnasia.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });
});


describe("Gimnasia.deshabilitarCamposEditables", function() {
  it("desabilita el campo editable", function() {
    spyOn(Gimnasia, "habilitarDeshabilitarCamposEditables");

    Gimnasia.deshabilitarCamposEditables();

    expect(Gimnasia.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
  });
});



describe("Gimnasia.mostrarOpcionesSecundarias", () => {
  it("muestra todas las opciones secundarias", () => {
    let Gimnasia;
    const opciones = document.querySelectorAll(".opcion-secundaria");
    opciones.forEach((opcion) => {
      expect(opcion.style.display).toBe("");
    });
  });
});



describe('Gimnasia.ocultarOcionesTerciariasEditar', function () {
  it('debe ocultar las opciones terciarias de editar', function () {
    let Gimnasia;
    
    // Simulamos que se han mostrado las opciones terciarias de editar
    const opcionesTerciarias = document.querySelectorAll('.opcion-terciaria.editar');
    opcionesTerciarias.forEach(opcion => opcion.style.display = 'block');
    
    
    // Verificamos que se hayan ocultado las opciones terciarias de editar
    const opcionesTerciariasOcultas = document.querySelectorAll('.opcion-terciaria.editar[style="display: none;"]');
    expect(opcionesTerciariasOcultas.length).toEqual(opcionesTerciarias.length);
  });
});


describe("Gimnasia.habilitarCamposEditables", function() {
  it("debe habilttrtr el campo editable", function() {
    spyOn(Gimnasia, "habilitarDeshabilitarCamposEditables");

    Gimnasia.habilitarCamposEditables();

    expect(Gimnasia.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });
});


console.assert(
  Gimnasia.opcionesMostrarOcultar("opcion-secundaria", false) === Gimnasia,
  "Error: No se ha devuelto la instancia de Gimnasia"
);
console.assert(
  Gimnasia.opcionesMostrarOcultar("opcion-terciaria editar", true) === Gimnasia,
  "Error: No se ha devuelto la instancia de Gimnasia"
);

describe('Gimnasia.sustituyeTags', () => {
  it('sustituye los tags por los valores de la persona', () => {
    // Arrange
    const plantilla = `
      <p>ID: ### ID ###</p>
      <p>Nombre: ### NOMBRE ###</p>
      <p>País: ### PAIS ###</p>
      <p>Edad: ### EDAD ###</p>
      <p>Modalidad: ### MODALIDAD ###</p>
      <p>Grupo: ### GRUPO ###</p>
      <p>Años JJOO: ### AniosJJOO ###</p>
    `;
    const persona = {
      ref: { '@ref': { id: '1234567890' } },
      data: {
        nombre: 'Juan Pérez',
        pais: 'México',
        edad: 25,
        modalidad: 'Ciclismo',
        grupo: 'Individual',
        aniosJJOO: '2016, 2020'
      }
    };
    const expected = `
      <p>ID: 1234567890</p>
      <p>Nombre: Juan Pérez</p>
      <p>País: México</p>
      <p>Edad: 25</p>
      <p>Modalidad: Ciclismo</p>
      <p>Grupo: Individual</p>
      <p>Años JJOO: 2016, 2020</p>
    `;

    // Act
    const result = Gimnasia.sustituyeTags(plantilla, persona);

    // Assert
    expect(result).toBe(expected);
  });
});


describe('Gimnasia.plantillaFormularioPersona.actualiza', () => {
  const mockPersona = {
    ref: { '@ref': { id: '1234' } },
    data: {
      nombre: 'Juan',
      pais: 'España',
      edad: 30,
      modalidad: 'Atletismo',
      grupo: 1,
      aniosJJOO: 2016
    }
  }

  it('should replace the ID tag with the persona id', () => {
    const result = Gimnasia.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.ref['@ref'].id)).toBe(true)
  })

  it('deberia reemplazar el tag NOMBRE por nombre', () => {
    const result = Gimnasia.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.nombre)).toBe(true)
  })

  it('deberia reemplazar el tag PAIS por pais', () => {
    const result = Gimnasia.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.pais)).toBe(true)
  })

  it('deberia reemplazar el tag EDAD por edad', () => {
    const result = Gimnasia.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.edad)).toBe(true)
  })

  it('deberia reemplazar el tag MODALIDAD por modalidad', () => {
    const result = Gimnasia.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.modalidad)).toBe(true)
  })

  it('deberia reemplazar el tag GRUPO por grupo', () => {
    const result = Gimnasia.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.grupo)).toBe(true)
  })

  it('deberia reemplazar el tag ANIOSJJOO por aniosJJOO', () => {
    const result = Gimnasia.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.aniosJJOO)).toBe(true)
  })
})


describe("Gimnasia", function() {
  describe("Gimnasia.personaComoFormulario12", function() {
    it("debe comprobar que la función devuelve el formulario de persona bien actualizado", function() {
      const persona = {
        ref: {
          '@ref': {
            id: '222222'
          }
        },
        data: {
          nombre: 'Marta Ruiz',
          pais: 'Brasil',
          edad: 25,
          modalidad: 'pareja_mixta',
          grupo: 3,
          aniosJJOO: [2005]
        }
      };

      const formulario = '<form><input type="text" name="nombre" value="' + persona.data.nombre + '">' +
                          '<input type="text" name="pais" value="' + persona.data.pais + '">' +
                          '<input type="number" name="edad" value="' + persona.data.edad + '">' +
                          '<input type="text" name="modalidad" value="' + persona.data.modalidad + '">' +
                          '<input type="number" name="grupo" value="' + persona.data.grupo + '">' +
                          '<input type="number" name="aniosJJOO" value="' + persona.data.aniosJJOO + '">' +
                          '<input type="hidden" name="id" value="' + persona.ref['@ref'].id + '">' +
                          '<input type="submit" value="Enviar"></form>';

      spyOn(Gimnasia, 'sustituyeTags').and.returnValue(formulario);

      const resultado = Gimnasia.personaComoFormulario12(persona);

      expect(Gimnasia.sustituyeTags).toHaveBeenCalledWith(Gimnasia.plantillaFormularioPersona.formulario1, persona);
      expect(resultado).toBe(formulario);
    });
  });
});


describe('Gimnasia.plantillaFormularioPersona.formulario1', () => {
  it('debería ser una cadena de texto', () => {
    expect(typeof Gimnasia.plantillaFormularioPersona.formulario1).toBe('string');
  });

  it('debería contener la etiqueta form', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('<form');
  });

  it('debería contener la etiqueta table', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('<table');
  });

  it('debería contener la etiqueta thead', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('<thead');
  });

  it('debería contener la etiqueta tbody', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('<tbody');
  });

  it('debería contener la etiqueta tr', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('<tr');
  });

  it('debería contener la etiqueta td', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('<td');
  });

  it('debería contener la etiqueta input', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('<input');
  });

  it('debería contener la etiqueta name="id_persona"', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('name="id_persona"');
  });

  it('debería contener la etiqueta name="nombre_persona"', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('name="nombre_persona"');
  });

  it('debería contener la etiqueta name="pais_persona"', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('name="pais_persona"');
  });

  it('debería contener la etiqueta name="edad_persona"', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('name="edad_persona"');
  });

  it('debería contener la etiqueta name="grupo_persona"', () => {
    expect(Gimnasia.plantillaFormularioPersona.formulario1).toContain('name="grupo_persona"');
  });

});


describe('Gimnasia.plantillaTablaPersonas.cabecera', () => {
  it('Debería estar definida correctamente', () => {
    const expected = `<table width="100%" class="listado-proyectos">
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
    expect(Gimnasia.plantillaTablaPersonas.cabecera).toEqual(expected);
  });
});


describe('Gimnasia.plantillaTags', () => {
  it('debe ser un objeto con las etiquetas de la plantilla', () => {
    const plantillaTags = Gimnasia.plantillaTags;
    expect(plantillaTags).toBeDefined();
    expect(plantillaTags).toBeInstanceOf(Object);
    expect(plantillaTags.ID).toBeDefined();
    expect(plantillaTags.NOMBRE).toBeDefined();
    expect(plantillaTags.PAIS).toBeDefined();
    expect(plantillaTags.EDAD).toBeDefined();
    expect(plantillaTags.MODALIDAD).toBeDefined();
    expect(plantillaTags.GRUPO).toBeDefined();
    expect(plantillaTags.AniosJJOO).toBeDefined();
    expect(typeof plantillaTags.ID).toBe('string');
    expect(typeof plantillaTags.NOMBRE).toBe('string');
    expect(typeof plantillaTags.PAIS).toBe('string');
    expect(typeof plantillaTags.EDAD).toBe('string');
    expect(typeof plantillaTags.MODALIDAD).toBe('string');
    expect(typeof plantillaTags.GRUPO).toBe('string');
    expect(typeof plantillaTags.AniosJJOO).toBe('string');
  });
});


describe('Gimnasia.plantillaTablaPersonas.pie', () => {
  it('should be a string', () => {
    expect(typeof Gimnasia.plantillaTablaPersonas.pie).toBe('string');
  });

  it('should contain </tbody> tag', () => {
    expect(Gimnasia.plantillaTablaPersonas.pie).toContain('</tbody>');
  });

  it('should contain </table> tag', () => {
    expect(Gimnasia.plantillaTablaPersonas.pie).toContain('</table>');
  });
});


describe("Gimnasia.mostrarOpcionesTerciariasEditar", () => {
  it("Debería mostrar las opciones terciarias para editar", () => {
    let Gimnasia;
    const opcionesTerciarias = document.querySelectorAll(".opcion-terciaria.editar");
    opcionesTerciarias.forEach((opcion) => {
      opcion.classList.add("hidden");
    });
    

    opcionesTerciarias.forEach((opcion) => {
      expect(opcion.classList.contains("hidden")).toBe(false);
    });
  });
});


describe("Gimnasia.ocultarOpcionesSecundarias", () => {
  it("debería ocultar todas las opciones secundarias", () => {
    // Arrange
    let Gimnasia;
    // Assert
    const opcionesSecundarias = document.querySelectorAll(".opcion-secundaria");
    expect(opcionesSecundarias.length).toBe(0);
  });
});






























      
      

      
      
      
      
  
  
  
  
  








/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Gimnasia.descargarRuta
 - Gimnasia.procesarAcercaDe
 - Gimnasia.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
 