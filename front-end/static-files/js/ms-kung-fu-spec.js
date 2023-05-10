/**
 * @file ms-KungFu-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS KungFu en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "KungFu Home"
const TITULO_ACERCA_DE = "KungFu Acerca de"
const TITULO_IMPRIME_TODOS_JUGADORES = "KungFu del listados de los datos de todos los jugadores"
const TITULO_IMPRIME_NOMBRES_JUGADORES = "KungFu del listado de los nombres de todos los jugadores"
const TITULO_IMPRIME_DATOS_JUGADOR = "Mostrar los datos del jugador"
const OBJETO_VACIO = '';
const TITULO_IMPRIME_NOMBRES_ORDENADOS = "KungFu del listado de los nombres de todos los jugadores ordenados"
const TITULO_IMPRIME_NOMBRES_ORDENADOS_CRITERIO = "KungFu del listados de los datos de todos los jugadores ordenado según un criterio"

const TITULO_IMPRIME_TODOS = "Listado de los nombres de todos los jugadores de todos los deportes"

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

describe("KungFu.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            KungFu.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(KungFu.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            KungFu.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(KungFu.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            KungFu.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(KungFu.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            KungFu.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(KungFu.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            KungFu.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("KungFu.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            KungFu.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(KungFu.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            KungFu.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(KungFu.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            KungFu.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(KungFu.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            KungFu.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(KungFu.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            KungFu.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(KungFu.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            KungFu.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(KungFu.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            KungFu.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(KungFu.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            KungFu.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("KungFu.recupera: ", function() {
  let callBackFn = jasmine.createSpy("callBackFn");

  beforeEach(function() {
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        json: function() {
          return Promise.resolve({
            data: [{ name: "player1" }, { name: "player2" }]
          });
        }
      })
    );
  });

  it("debe llamar a la función callback con los datos descargados y ordenados", async function() {
    await KungFu.recupera(callBackFn, 'nombre');

    expect(callBackFn).toHaveBeenCalledWith([
      { name: "player1" },
      { name: "player2" }
    ], 'nombre');
  });

  it("debe llamar a la función callback con los datos descargados y ordenados", async function() {
    await KungFu.recupera(callBackFn, 'fecha_nacimiento');

    expect(callBackFn).toHaveBeenCalledWith([
      { name: "player1" },
      { name: "player2" }
    ], 'fecha_nacimiento');
  });

  it("debe llamar a la API del gateway con la URL correcta", async function() {
    await KungFu.recupera(callBackFn, 'nombre');

    expect(window.fetch).toHaveBeenCalledWith(
      Frontend.API_GATEWAY + "/kungfu/getTodos"
    );
  });
});
  

describe("KungFu.imprimeTodosJugadores: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo", 
        function () {
            // Objeto vacio
            KungFu.imprimeTodosJugadores([])
            expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_TODOS_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
    })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            KungFu.imprimeTodosJugadores(10)
            expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_TODOS_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
    })
})

describe("KungFu.imprimeSoloNombres: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo", 
        function() {
            KungFu.imprimeSoloNombres([])
            expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
    })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            KungFu.imprimeSoloNombres(10)
            expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
    })
})

describe("KungFu.imprimeUnJugador: " , function() {
    it("Mostrar datos nulos cuando le pasamos un valor nulo", 
    function() {
        let jugador = null;
        KungFu.imprimeUnJugador(jugador);
        expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_DATOS_JUGADOR);
    })
})

describe("KungFu.recuperaJugadorBuscado", function() {
  it("devuelve un vector vacío cuando no se encuentra el jugador buscado", async function() {
    const callBackFn = function(resultado) {
      expect(resultado).toEqual([]);
    }
    await KungFu.recuperaJugadorBuscado("Jugador Inexistente", callBackFn);
  });
});

describe("KungFu.recuperaJugadorBuscadoPorAspecto", function() {
    it("devuelve un vector vacío cuando no se encuentra el jugador buscado", async function() {
      const callBackFn = function(resultado) {
        expect(resultado).toEqual([]);
      }
      await KungFu.recuperaJugadorBuscadoPorAspecto("Jugador Inexistente", "Jugador Inexistente", "Jugador Inexistente", callBackFn);
    });
});

describe("KungFu.imprimeOrdenados: ", function() {
  it("Mostrar datos nulos cuando le pasamos vector nulo", 
      function() {
          KungFu.imprimeOrdenados([])
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_ORDENADOS)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })

  it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
      function() {
          KungFu.imprimeOrdenados(10)
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_ORDENADOS)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })
})

describe("KungFu.imprimeVariosOrdenados: ", function() {
  it("Mostrar datos nulos cuando le pasamos vector nulo", 
      function() {
          KungFu.imprimeVariosOrdenados([])
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_ORDENADOS_CRITERIO)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })

  it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
      function() {
          KungFu.imprimeVariosOrdenados(10)
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_ORDENADOS_CRITERIO)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })
})

describe("KungFu.recuperaJugadorBuscadoPorAspectoExacto", function() {
  it("devuelve un vector vacío cuando no se encuentra el jugador buscado", async function() {
    const callBackFn = function(resultado) {
      expect(resultado).toEqual([]);
    }
    await KungFu.recuperaJugadorBuscadoPorAspectoExacto("Jugador Inexistente", "Jugador Inexistente", "Jugador Inexistente", callBackFn);
  });
});

describe("KungFu.recuperaUnJugador: ", function() {
  let callBackFn = jasmine.createSpy("callBackFn");
  let idJugador = "123";

  beforeEach(function() {
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        json: function() {
          return Promise.resolve({ name: "player1" });
        }
      })
    );
  });

  it("debe llamar a la API del gateway con la URL correcta", async function() {
    await KungFu.recuperaUnJugador(idJugador, callBackFn);

    expect(window.fetch).toHaveBeenCalledWith(
      Frontend.API_GATEWAY + "/kungfu/getPorId/" + idJugador
    );
  });

  it("debe llamar a la función callback con los datos recuperados", async function() {
    await KungFu.recuperaUnJugador(idJugador, callBackFn);

    expect(callBackFn).toHaveBeenCalledWith({ name: "player1" });
  });
});

describe("KungFu.cerear", () => {
  it("devuelve un número con dos cifras si el número pasado es menor que 10", () => {
    expect(KungFu.cerear(5)).toBe("05");
  });

  it("devuelve un número sin cambios si el número pasado es mayor o igual a 10", () => {
    expect(KungFu.cerear(15)).toBe("15");
  });
});

//############################################################################################################################################################

describe("KungFu.imprimeTodos: ", function() {
  it("Mostrar datos nulos cuando le pasamos vector nulo", 
      function() {
          KungFu.imprimeTodos([])
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_TODOS)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })

  it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
      function() {
          KungFu.imprimeTodos(10)
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_TODOS)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })
})

describe("KungFu.recuperaJugadoresCompleto: ", function() {
  let callBackFn = jasmine.createSpy("callBackFn");

  beforeEach(function() {
    spyOn(window, "fetch").and.returnValues(
      Promise.resolve({
        json: function() {
          return Promise.resolve({
            data: [{ name: "player1" }, { name: "player2" }]
          });
        }
      }),
      Promise.resolve({
        json: function() {
          return Promise.resolve({
            data: [{ name: "player3" }, { name: "player4" }]
          });
        }
      }),
      Promise.resolve({
        json: function() {
          return Promise.resolve({
            data: [{ name: "player5" }, { name: "player6" }]
          });
        }
      }),
      Promise.resolve({
        json: function() {
          return Promise.resolve({
            data: [{ name: "player7" }, { name: "player8" }]
          });
        }
      }),
      Promise.resolve({
        json: function() {
          return Promise.resolve({
            data: [{ name: "player9" }, { name: "player10" }]
          });
        }
      })
    );
  });

  it("debe llamar a la función callback con los datos descargados de kungfu", async function() {
    await KungFu.recuperaJugadoresCompleto(callBackFn);

    expect(callBackFn).toHaveBeenCalledWith(
      [{ name: "player1" }, { name: "player2" }],
      [{ name: "player3" }, { name: "player4" }],
      [{ name: "player5" }, { name: "player6" }],
      [{ name: "player7" }, { name: "player8" }],
      [{ name: "player9" }, { name: "player10" }]
    );
  });

  it("debe llamar a la API del gateway con las URLs correctas", async function() {
    await KungFu.recuperaJugadoresCompleto(callBackFn);

    expect(window.fetch).toHaveBeenCalledTimes(5);
    expect(window.fetch.calls.argsFor(0)[0]).toEqual(
      Frontend.API_GATEWAY + "/kungfu/getTodos"
    );
    expect(window.fetch.calls.argsFor(1)[0]).toEqual(
      Frontend.API_GATEWAY + "/equitacion/getTodosInfo"
    );
    expect(window.fetch.calls.argsFor(2)[0]).toEqual(
      Frontend.API_GATEWAY + "/motociclismo/getTodos"
    );
    expect(window.fetch.calls.argsFor(3)[0]).toEqual(
      Frontend.API_GATEWAY + "/parkour/getTodas"
    );
    expect(window.fetch.calls.argsFor(4)[0]).toEqual(
      Frontend.API_GATEWAY + "/gimnasia/getTodas"
    );
  });
});


//############################################################################################################################################################

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - KungFu.descargarRuta
 - KungFu.procesarAcercaDe
 - KungFu.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
