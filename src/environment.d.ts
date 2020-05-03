declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            REACT_APP_MAPBOX_ACCESS_TOKEN: string;
            REACT_APP_PROD_API_URL?: string;
        }
    }
}

export { }