declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_MAPBOX_ACCESS_TOKEN: string;
            NODE_ENV: 'development' | 'production' | 'test';
            REACT_APP_PROD_API_URL?: string;
        }
    }
}

export { }