/**
 * @file proxy-routes.js
 * @description Objeto que almacena las rutas que deben ser consideradas por el proxy.
 * Cualquier URL que empiece por /personas es derivada al ms de personas; igual para /proyectos, etc.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const ROUTES = [
    {
        url: '/kungfu',
        proxy: {
            target: "http://localhost:8002",
            changeOrigin: true,
            pathRewrite: {
                [`^/kungfu`]: '',
            },
        }
    },
    {
        url: '/equitacion',
        proxy: {
            target: "http://localhost:8003",
            changeOrigin: true,
            pathRewrite: {
                [`^/equitacion`]: '',
            },
        }
    },
    {
        url: '/motociclismo',
        proxy: {
            target: "http://localhost:8004",
            changeOrigin: true,
            pathRewrite: {
                [`^/motociclismo`]: '',
            },
        }
    },    
    {
        url: '/parkour',
        proxy: {
            target: "http://localhost:8006",
            changeOrigin: true,
            pathRewrite: {
                [`^/parkour`]: '',
            },
        }
    },
    {
        url: '/gimnasia',
        proxy: {
            target: "http://localhost:8007",
            changeOrigin: true,
            pathRewrite: {
                [`^/gimnasia`]: '',
            },
        }
    }


]

exports.routes = ROUTES;