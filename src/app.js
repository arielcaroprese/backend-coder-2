import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js'
import { Server } from 'socket.io';

import productsManager from './productsManager.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Motor de plantillas

app.use(express.static('public'));
app.engine("handlebars", handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


// rutas

app.use('/', viewsRouter )

app.use('/api/products', productsRouter)

app.use('/api/carts', cartsRouter)

const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
});

export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('Cliente conectado', socket.id);
    const products = await productsManager.getProducts();
    socketServer.emit('productsUpdate', products);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    })
})