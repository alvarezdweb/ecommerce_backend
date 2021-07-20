class persistenceFactory {
    constructor() {}

    async getPersistence(type) {
        try {
            const module = await import (`./persistence/${type}.js`);
            return module.default
        } catch (err) {  
            throw err
        }
    }
}

export default new persistenceFactory();