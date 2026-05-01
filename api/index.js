import express from "express";
import { uid } from "uid";

const app = express();
app.use(express.json());

const port = 3001;

let canciones = [
    {
        id: uid(),
        titulo: "Cryogen",
        artista: "Muse",
        genero: "Rock Alternativo",
        duracion: 302,
        favorita: true
    },
    {
        id: uid(),
        titulo: "Soaked",
        artista: "Adam Lambert",
        genero: "Electropop",
        duracion: 274,
        favorita: true
    },
    {
        id: uid(),
        titulo: "Lowlife",
        artista: "Poppy",
        genero: "Pop Reggae",
        duracion: 206,
        favorita: false
    },
    {
        id: uid(),
        titulo: "commatose",
        artista: "glass beach",
        genero: "Indie",
        duracion: 590,
        favorita: true
    },
];

app.get("/", (req, res) => {
    res.send(
        `<html>
        <h1>ENDPOINTS DISPONIBLES:</h1>
        <h3>GET:</h3>

        <ul>
            <li>/canciones</li>
            <li>/cancion/{id_cancion}</li>
        </ul>

        <h3>POST:</h3>
        <ul>
            <li>Placeholder</li>
        </ul>

        <h3>DELETE:</h3>
        <ul>
            <li>Placeholder</li>
        </ul>

        <h3>PUT:</h3>
        <ul>
            <li>Placeholder</li>
        </ul>
        <p><u>Para traer una cancion hay que agregar un uid en la busqueda</u></p>
        </html>`
    );
});

// GET
app.get("/cancion", (req, res) => {
    res.json(canciones[0]);
});

app.get("/canciones", (req, res) => {
    res.send(canciones);
});

// POST
app.post("/cancion", (req, res) => {
    let cancion_nueva = req.body;
    console.log(req.body);

    canciones.push({
        ...cancion_nueva,
        id: uid(),
    });

    res.send(canciones);
});

// DELETE
app.delete("/cancion/:id", (req, res) => {
    let id_eliminar = req.params.id;
    canciones = canciones.filter((_ca) => _ca.id != id_eliminar);

    res.send(canciones);
});

// PUT
app.put("/cancion/:id", (req, res) => {
    let cancion_nueva = req.body;
    let id_buscar = req.params.id;

    let cancion_encontrada = canciones.find((c) => c.id == id_buscar);

    if (cancion_encontrada) {
        cancion_encontrada.titulo = cancion_nueva.titulo;
        cancion_encontrada.artista = cancion_nueva.artista;
        cancion_encontrada.genero = cancion_nueva.genero;
        cancion_encontrada.duracion = cancion_nueva.duracion;
        cancion_encontrada.favorita = cancion_nueva.favorita;

        let currentIndex = canciones.findIndex((c) => c.id == id_buscar);
        canciones[currentIndex] = cancion_encontrada;
        res.send(canciones);
    } else {
        res.status(404).send("No existe")
    }
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});