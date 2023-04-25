/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio Equitacion: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Julia al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[1].data.hasOwnProperty('nombre'));
          assert(res.body.data[1].data.nombre === "Julia");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it ('Devuelve Anna al consultar el test mediante getNombres', (done) =>{
      supertest(app)
        .get('/getNombres')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          // console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[8] === "Anna");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it ('No hay campos vacíos en los datos al consultar el test mediante getNombres', (done) =>{
      supertest(app)
        .get('/getNombres')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          const data = res.body.data;
          for (let i = 0; i < data.length; i++) {
            assert(data[i] !== "");
          }
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it ('Los nombres están ordenados al obtenernlos mediante getAlfabeticamente', (done) =>{
      supertest(app)
        .get('/getAlfabeticamente')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          const data = res.body.data;
          for (let i = 1; i < data.length; i++) {
            assert(data[i-1]<= data[i]);
          }
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it ('Devuelve un array con los datos de todos los deportistas al consultar mediante getTodosInfo', (done) =>{
      supertest(app)
        .get('/getTodosInfo')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          const data = res.body.data;
            assert(Array.isArray(data));
            assert(data.length > 0);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve un vector de tamaño 10 al consultar mediante getTodosInfo', (done) => {
      supertest(app)
        .get('/getTodosInfo')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          // console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.length === 10);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve la nacionalidad Española al recuperar los datos de la Persona con id 359074418347999438 mediante getPorId', (done) => {
      supertest(app)
        .get('/getPorId/359074418347999438')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('nacionalidad'));
          assert(res.body.data.nacionalidad === "Española");
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
  })

  it('Devuelve NOMBRE CAMBIADO al recuperar los datos del Deportista con id 359074418347999438 mediante setNombre', (done) => {
    const NOMBRE_TEST= 'NOMBRE CAMBIADO'
    const deportista = {
      id_deportista: '359074418347999438',
      nombre_deportista: NOMBRE_TEST
    };
    supertest(app)
    .post('/setNombre')
    .send(deportista)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      assert(res.body.data.hasOwnProperty('nombre'));
      assert(res.body.data.nombre === NOMBRE_TEST);
    })
    .end((error) => { error ? done.fail(error) : done(); }
    );
  });

  it('Devuelve NUEVO APELLIDO TEST al recuperar los datos del Deportista con id 359074418347999438 mediante setCuatroCampos', (done) => {
    const APELLIDO_TEST= 'NUEVO APELLIDO TEST'
    const deportista = {
      id_deportista: '359074418347999438',
      nombre_deportista: 'Juan',
      apellido_deportista: APELLIDO_TEST,
      caballos_deportista: 'Truenito',
      JJOO_deportista: 2008
    };
    supertest(app)
    .post('/setCuatroCampos')
    .send(deportista)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      assert(res.body.data.hasOwnProperty('apellido'));
      assert(res.body.data.apellido === APELLIDO_TEST);
    })
    .end((error) => { error ? done.fail(error) : done(); }
    );
  });

  
});


