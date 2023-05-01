
export const SERVICIO_URL = {
    SLIM4: {
        DOMINIO: `http://slim4.trabajo.ed/`,
        USUARIOS: {
            LOGIN: `usuarios/login`,
            TOKEN:{
                REFRESH: `usuarios/token`
            }
        },
        GENERAL:{
            MENU: `web/usuarios/usuarios/get-menu-accesos`,
        },
        SISTEMA:{
            COLUMNAS: `web/mantenimiento-tablas/tabla-sistemas/get-columna-sistemas`,
            FILAS: `web/mantenimiento-tablas/tabla-sistemas/get-filas-sistemas`,
        },
        PAGINA:{
            COLUMNAS: `web/mantenimiento-tablas/pagina/get-columna-pagina`,
            FILAS: `web/mantenimiento-tablas/pagina/get-filas-pagina`,
        }
        ,
        PLANTILLA:{
            COLUMNAS: `web/api/plantilla/get-columna-plantilla`,
            FILAS: `web/api/plantilla/get-filas-plantilla`,
            NUEVO: `web/api/plantilla/nueva-plantilla`,
            ACTUALIZAR: `web/api/plantilla/actualizar-plantilla`,
            ELIMINAR: `web/api/plantilla/eliminar-plantilla`
        },
        COMPONENTE:{
            COLUMNAS: `web/api/componente/get-columna-componente`,
            FILAS: `web/api/componente/get-filas-componente`,
            NUEVO: `web/api/componente/nuevo-componente`,
            ACTUALIZAR: `web/api/componente/actualizar-componente`,
            ELIMINAR: `web/api/componente/eliminar-componente`
        },
        USUARIO:{
            COLUMNAS: `web/api/usuario/get-columna-usuario`,
            FILAS: `web/api/usuario/get-filas-usuario`,
            NUEVO: `web/api/usuario/nuevo-usuario`,
            ACTUALIZAR: `web/api/usuario/actualizar-usuario`,
            RESETEAR_CLAVE: `web/api/usuario/resetear-clave-usuario`,
            ELIMINAR: `web/api/usuario/eliminar-usuario`,
            GETUSUARIOBYID: `web/api/usuario/get-usuario-by-id`,
        },
        ROL:{
            COLUMNAS: `web/api/rol/get-columna-rol`,
            FILAS: `web/api/rol/get-filas-rol`,
            NUEVO: `web/api/rol/nuevo-rol`,
            ACTUALIZAR: `web/api/rol/actualizar-rol`,
            ELIMINAR: `web/api/rol/eliminar-rol`,
            GETROLBYID: `web/api/rol/get-rol-by-id`,
        },
        USUARIO_ROL:{
            COLUMNAS: `web/api/usuario-rol/get-columna-usuario-rol`,
            FILAS: `web/api/usuario-rol/get-filas-usuario-rol`,
            NUEVO: `web/api/usuario-rol/nuevo-usuario-rol`,
            ACTUALIZAR: `web/api/usuario-rol/actualizar-usuario-rol`,
            ELIMINAR: `web/api/usuario-rol/eliminar-usuario-rol`,
            GETUSUARIOROLBYID: `web/api/usuario-rol/get-usuario-rol-by-id`,
        },
        ARCHIVO:{
            NUEVOIMAGEN: `web/api/archivo/nuevo-imagen`,
            NUEVODOCUMENTO: `web/api/archivo/nuevo-documento`,
        }
    }
};
