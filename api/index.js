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
        duracion: "5:02",
        favorita: true
    },
    {
        id: uid(),
        titulo: "Soaked",
        artista: "Adam Lambert",
        genero: "Electropop",
        duracion: "4:34",
        favorita: true
    },
    {
        id: uid(),
        titulo: "Lowlife",
        artista: "Poppy",
        genero: "Pop Reggae",
        duracion: "3:26",
        favorita: false
    },
    {
        id: uid(),
        titulo: "commatose",
        artista: "glass beach",
        genero: "Indie",
        duracion: "9:50",
        favorita: true
    },
    {
        id: uid(),
        titulo: "Daily Blues",
        artista: "King Gizzard & The Lizard Wizard",
        genero: "Rock",
        duracion: "7:43",
        favorita: true
    },
];

// -=- ENDPOINTS OBLIGATORIOS-=-
// GET "/": HTML con documentación de todos los endpoints
app.get("/", (req, res) => {
    res.send(
        `<html>
        <h1>ENDPOINTS DISPONIBLES:</h1>
        <h3>GET:</h3>

        <ul>
            <li>/</li>
            <li>/info</li>
            <li>/saludo</li>
            <li>/api/status</li>
            <li>/api/canciones</li>
            <li>/api/canciones/{id_cancion}</li>
        </ul>

        <h3>POST:</h3>
        <ul>
            <li>/api/canciones</li>
        </ul>

        <h3>PUT:</h3>
        <ul>
            <li>/api/canciones/{id_cancion}</li>
        </ul>

        <h3>PATCH:</h3>
        <ul>
            <li>/api/canciones/{id_cancion}</li>
        </ul>

        <h3>DELETE:</h3>
        <ul>
            <li>/api/canciones/{id_cancion}</li>
        </ul>

        <p><u>Para traer una cancion hay que agregar un uid en la busqueda</u></p>
        </html>`
    );
});

// GET "/info": JSON con "mensaje", "curso", "tecnologia", "version"
app.get("/info", (req, res) => {
    res.json({
        mensaje: "API de canciones funcionando",
        curso: "Sistemas y Tecnologías Web",
        tecnologia: "Node.js y Express",
        version: "1.0.0"
    });
});

// GET "/saludo": Texto plano con un saludo personalizado
app.get("/saludo", (req, res) => {
    res.send("Hola! Ya que te has molestado en llegar a este endpoint, te diré que mi canción favorita entre las que están precargadas es 'commatose' :)");
});

// GET "/api/status": JSON con "ok" (boolean), "status" (string), "puerto" (number), "timestamp" (fecha actual)
app.get("/api/status", (req, res) => {
    res.json({
        ok: true,
        status: "running",
        puerto: port,
        timestamp: new Date().toISOString()
    });
});

// -=- RUTAS CRUD -=-
// RUTA GET: Devuelve todos los elementos
app.get("/api/canciones", (req, res) => {
    res.send(canciones);
});

// RUTA GET: Devuelve un elemento por su ID
app.get("/api/canciones/:id", (req, res) => {
    let id_buscar = req.params.id;
    let cancion_encontrada = canciones.find((c) => c.id == id_buscar);

    if (cancion_encontrada) {
        let currentIndex = canciones.findIndex((c) => c.id == id_buscar);
        res.json({
            ok: true,
            data: canciones[currentIndex]
        });
    } else {
        res.status(404).json({
            ok: false,
            error: "No existe una canción para este ID."
        })
    }
});

// RUTA POST: Crea un nuevo elemento
app.post("/api/canciones", (req, res) => {
    let cancion_nueva = req.body;

    if(!titulo || !artista || !genero || !duracion || !favorita) {
        return res.status(400).json({
            ok: false,
            error: "Por favor, llenar todos los campos: Título, Artista, Género, Duración, Favorita"
        });
    }

    canciones.push({
        ...cancion_nueva,
        id: uid(),
    });

    res.json({
        ok: true,
        data: canciones
    });
});

// RUTA DELETE: Elimina un elemento por su ID
app.delete("/api/canciones/:id", (req, res) => {
    let id_eliminar = req.params.id;
    canciones = canciones.filter((_ca) => _ca.id != id_eliminar);

    res.send(canciones);
});

// RUTA PUT: Actualiza un elemento existente (reemplazo completo)
app.put("/api/canciones/:id", (req, res) => {
    let cancion_nueva = req.body;
    let id_buscar = req.params.id;

    let cancion_encontrada = canciones.find((c) => c.id == id_buscar);

    if (cancion_encontrada) {

        if(!titulo || !artista || !genero || !duracion || !favorita) {
            return res.status(400).json({
                ok: false,
                error: "Por favor, llenar todos los campos: Título, Artista, Género, Duración, Favorita"
            });
        }

        cancion_encontrada.titulo = cancion_nueva.titulo;
        cancion_encontrada.artista = cancion_nueva.artista;
        cancion_encontrada.genero = cancion_nueva.genero;
        cancion_encontrada.duracion = cancion_nueva.duracion;
        cancion_encontrada.favorita = cancion_nueva.favorita;

        let currentIndex = canciones.findIndex((c) => c.id == id_buscar);
        canciones[currentIndex] = cancion_encontrada;
        res.json({
            ok: true,
            data: canciones
        });
    } else {
        res.status(404).json({
            ok: false,
            error: "No existe una canción para este ID."
        });
    }
});

// RUTA PATCH: Actualiza parcialmente un elemento (solo los campos enviados)
app.patch("/api/canciones/:id", (req, res) => {
    let cambios_cancion = req.body;
    let id_buscar = req.params.id;
    let cancion_a_cambiar = canciones.find((can) => can.id == id_buscar);

    if(cancion_a_cambiar) {
        let currentIndex = canciones.findIndex((can) => can.id == id_buscar);

        canciones[currentIndex] = {
            ...canciones[currentIndex],
            ...cambios_cancion
        }

        res.json({
            ok: true,
            data: canciones
        });
    } else {
        res.status(404).json({
            ok: false,
            error: "No existe una canción para este ID."
        });
    }
});

app.listen(port, () => {
    console.log(`API de canciones corriendo en http://localhost:${port}`);
});