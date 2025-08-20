import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

console.log(PORT);

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

app.get('/', (_, res) => {
    res.send(`
        <h1>Curso Express.js V3</h1>
        <p>Esto es una aplicacion node.js con Express.js</p>
        <p>Corriendo en el puerto: ${PORT}</p>
        `);
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`
        <h1>Detalles del Usuario</h1>
        <p>ID: ${userId}</p>
    `);
});

app.get('/search', (req, res) => {
    const terms = req.query.termino || 'No especificado';
    const category = req.query.categoria || 'Todas';
    res.send(`
        <h2>Resultados de la Búsqueda</h2>
        <p>Término: ${terms}</p>
        <p>Categoría: ${category}</p>
    `);
});

app.post('/form', (req, res) => {
    const name = req.body.name || 'Anónimo';
    const email = req.body.email || 'No especificado';
    res.json({
        mensaje: "Datos recibidos",
        data: {
            name,
            email
        }
    });
});

app.post('/api/data', (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            mensaje: "No se recibieron datos",
            data: null
        });
    }

    res.status(200).json({
        mensaje: "Datos recibidos",
        data
    });
});

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
});