import fs from 'fs';

export const create = (file, content) => {
    try {
        fs.writeFile(`./storage/${file}`,JSON.stringify(content),{flag:'wx'}, err => {
            if(err){
                console.log('el archivo ya existe.');
            }else{
                console.log('el archivo se creo correctamente.');
            }
        });
    } catch (error) {
        throw new Error('error de escritura.');
    }
}

export const read = async (file) => {
    try {
        const data = await fs.promises.readFile(`./storage/${file}`, 'utf-8');
        const res = JSON.parse(data);
        return res;

    } catch (error) {
        throw new Error('No hay productos!')
    }
}

export const write = async (file, content) => {
    try {
        await fs.promises.writeFile(`./storage/${file}`, JSON.stringify(content));
    } catch (error) {
        throw new Error('No se puede guardar el producto, ARCHIVO INEXISTENTE!.');
    }
}