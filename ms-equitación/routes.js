/**
 * @file routes.js
 * @description Define las rutas ante las que va a responder al MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");



/**
 * Ruta raíz: /
 */
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Acerca De (es decir, About...)
 */
router.get("/acercade", async (req, res) => {
    try {
        await callbacks.acercaDe(req, res)
    } catch (error) {
        console.log(error);
    }
});



/**
 * Test de conexión a la BBDD
 */
router.get("/test_db", async (req, res) => {
    try {
        await callbacks.test_db(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Devuelve todos los nombres de los deportistas que hay en la BBDD
 */
router.get("/getNombres", async (req, res) => {
    try {
        await callbacks.getNombres(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Devuelve todos los nombres de los deportistas que hay en la BBDD en orden alfabetico
 */
router.get("/getAlfabeticamente", async (req, res) => {
    try {
        await callbacks.getAlfabeticamente(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Devuelve todos los deportistas que hay en la BBDD
 */
 router.get("/getTodosInfo", async (req, res) => {
    try {
        await callbacks.getTodosInfo(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.param("idDeportista", (req, res, next, id) => {
    next();
});
  
/**
 * Devuelve los datos del deportista con el id pasado
 */
router.get("/getPorId/:idDeportista", async (req, res) => {
    try {
        await callbacks.getPorId(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Modifica el nombre del deportista con el id pasado
 */
 router.post("/setNombre", async (req, res) => {
    try {
        await callbacks.setNombre(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Modifica cuatro campos del deportista con el id pasado
 */
 router.post("/setCuatroCampos", async (req, res) => {
    try {
        await callbacks.setCuatroCampos(req, res)
    } catch (error) {
        console.log(error);
    }
});


// Exporto el módulo para poder usarlo en server
module.exports = router;