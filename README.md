# Backend Ecommerce.

## Run Server
~~~ 
npm start
~~~ 


## Ruta /productos

### GET /listar
- Devuelve todos los productos disponibles.

### GET /listar/:id
- Devuelve producto por su id.

### POST /agregar
- Incorpora productos al listado (disponible para administradores).

~~~ 
req.body = 

    {
        "user":{
            "isAdmin":true
        },
        "item": {
            "nombte":"celular",
            "descripcion":"iphone",
            "codigo": 12345,
            "foto":"img.jpg",
            "precio": 100,
            "stock":20
        }
    }
~~~

### PUT /actualizar/:id
- Actualiza un producto por su id (disponible para administradores).

~~~ 
req.body = 

    {
        "user":{
            "isAdmin":true
        },
        "item": {
            
            //DATOS A ACTUALIZAR

        }
    }
~~~

### DELETE /borrar/:id
- Borra un producto por su id (disponible para administradores).

~~~ 
req.body = 

    {
        "user":{
            "isAdmin":true
        }
    }
~~~ 

## Ruta /carrito

### GET /listar
- Devuelve todos los productos disponibles.

### GET /listar/:id
- Devuelve producto por su id.

### POST /agregar/:id_producto
- Agrega un producto al carrito por su id de producto.

### DELETE /borrar/:id
- Borra un producto por su id. 