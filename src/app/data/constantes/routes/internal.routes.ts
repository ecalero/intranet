export const ROUTES_PATHS = {
    AUTH: {
        DEFAULT: 'auth',
        LOGIN: 'login',
    },
    PANEL: {
        DEFAULT: 'panel',
        USER: 'user',
    },
    INTRANET: {
        DEFAULT: 'intranet',
        USUARIOS: 'usuarios',
    },
    SERVER: {
        E_404: '404',
    },
};

export const INTERNAL_PATHS = {
    /**
     * AUTHENTICATION
     */
    AUTH_DEFAULT: `${ROUTES_PATHS.AUTH.DEFAULT}`,
    AUTH_LOGIN: `${ROUTES_PATHS.AUTH.LOGIN}`,
    /**
     * PANEL
     */
    PANEL_DEFAULT: `${ROUTES_PATHS.PANEL.DEFAULT}`,
    PANEL_USER_LIST: `${ROUTES_PATHS.PANEL.USER}`,

    /**
     * INTRANET
     */
     INTRANET_DEFAULT: `${ROUTES_PATHS.INTRANET.DEFAULT}`,
     INTRANET_USER_LIST: `${ROUTES_PATHS.INTRANET.USUARIOS}`,
    /**
     * SERVER
     */
    SERVER_E_404: `${ROUTES_PATHS.SERVER.E_404}`,
};

export const INTERNAL_ROUTES = {
    /**
     * AUTHENTICATION
     */
    AUTH_LOGIN: `/${INTERNAL_PATHS.AUTH_DEFAULT}/${INTERNAL_PATHS.AUTH_LOGIN}`,
    /**
     * PANEL
     */
    PANEL_USER_LIST: `/${INTERNAL_PATHS.PANEL_DEFAULT}/${INTERNAL_PATHS.PANEL_USER_LIST}`,
        /**
     * INTRANET
     */
    INTRANET_USER_LIST: `/${INTERNAL_PATHS.INTRANET_DEFAULT}/${INTERNAL_PATHS.INTRANET_USER_LIST}`,
    /**
     * SERVER
     */
    SERVER_E_404: `/${INTERNAL_PATHS.SERVER_E_404}`,
};
