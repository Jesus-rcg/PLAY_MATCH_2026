import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' with { type: 'json' };

const app = express();

app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',    
   password: '',  
   database: 'playmatch_nuevo'
});

db.connect(err => {
   if (err) throw err;
   console.log('MySQL Conectado...');
});

app.post("/login", (req, res) => {
  const { correo, password } = req.body;

  
  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [correo], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error del servidor" });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Correo o contraseña incorrectos"
      });
    }

    const usuario = result[0];

    const coincide = await bcrypt.compare(password, usuario.password);

    if (coincide) {
      res.json({
        message: "Login exitoso",
        usuario
      });
    } else {
      res.status(401).json({
        message: "Correo o contraseña incorrectos"
      });
    }
  });
});

app.get('/usuarios', (req, res) => {
    const sql = 'SELECT id_usuario, nombre, email, rol, activo, fecha_actualizado FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


app.post('/usuarios/agregar', async (req, res) => {
    const { nombre, email, password, rol, activo } = req.body;

    const passwordHash = await bcrypt.hash(password, 10); //Encriptar contraseña

    const sql = 'INSERT INTO usuarios (nombre, email, password, rol, activo) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, email, passwordHash, rol, activo], (err, results) => { //passwordHash se manda a la BD.
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, ...req.body });
    });
});



app.put('/usuarios/editar/:id', async (req, res) => {
    const { nombre, email, password, rol, activo } = req.body;

    let sql;
    let params;
    let passwordHash = password;

    if (password) {
        passwordHash = await bcrypt.hash(password, 10);

        sql = 'UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ?, activo = ? WHERE id_usuario = ?';
        params = [nombre, email, passwordHash, rol, activo, req.params.id];
    }else{
        sql = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ?, activo = ? WHERE id_usuario = ?';
        params = [nombre, email, rol, activo, req.params.id];
    }
    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Usuario actualizado' });
    });
});

app.put("/jugadores/editar/:id", async (req, res) => {
  const { id_equipo, nombre, apellido, documento, numero_camiseta, estado } = req.body;

 db.query(
      `UPDATE jugadores  
       SET id_equipo = ?, nombre = ?, apellido = ?, documento = ?, numero_camiseta = ?, estado = ?
       WHERE id_jugador = ?`,
      [id_equipo, nombre, apellido, documento, numero_camiseta, estado, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Jugador actualizado' });
  });
});









app.delete('/usuarios/eliminar/:id', (req, res) => {
    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Usuario eliminado' });
    });
});


app.get('/posiciones', (req, res) => {
    const sql = `
    SELECT
      p.id_posicion, 
      p.id_torneo,
      p.id_equipo,
      t.nombre AS torneo, 
      e.nombre AS equipo, 
      p.jugados, 
      p.ganados, 
      p.empatados, 
      p.perdidos, 
      p.gf, 
      p.gc, 
      p.puntos, 
      p.actualizado 
     FROM posiciones p
     JOIN torneos t ON p.id_torneo = t.id_torneo
     JOIN equipos e ON p.id_equipo = e.id_equipo`;
    db.query(sql, (err, results) => {
        if (err) {
         console.log(err);
         return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.post('/posiciones/agregar', (req, res) => {
  const {
    id_torneo,
    id_equipo,
    jugados,
    ganados,
    empatados,
    perdidos,
    gf,
    gc,
  } = req.body;

  const puntos = (ganados * 3) + (empatados * 1);

  const sql = `
    INSERT INTO posiciones (id_torneo, id_equipo, jugados, ganados, perdidos, gf, gc, puntos) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [id_torneo, id_equipo, jugados, ganados, perdidos, gf, gc, puntos],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Posición creada" });
    });
});



app.put('/posiciones/editar/:id', (req, res) => {

  const { id } = req.params;

  const {
    id_torneo,
    id_equipo,
    jugados,
    ganados,
    empatados,
    perdidos,
    gf,
    gc
  } = req.body; 

  const puntos = (ganados * 3) + (empatados * 1);

  const sql = `
    UPDATE posiciones SET
    id_torneo = ?,
    id_equipo = ?,
    jugados = ?,
    ganados = ?,
    empatados = ?,
    perdidos = ?,
    gf = ?,
    gc = ?,
    puntos = ?
    WHERE id_posicion = ?
  `;

  db.query(sql, [
    id_torneo,
    id_equipo,
    jugados,
    ganados,
    empatados,
    perdidos,
    gf,
    gc,
    puntos,
    id
  ], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Posición actualizada" });
  });
});



app.delete('/posiciones/eliminar/:id', (req, res) => {
    const sql = 'DELETE FROM posiciones WHERE id_posicion = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Posición eliminada' });
    });
});





app.get('/torneos', (req, res) => {
  db.query("SELECT id_torneo, nombre, descripcion, fecha_inicio, fecha_fin, estado FROM torneos", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/torneos/agregar', async (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_fin, estado } = req.body;

    const sql = 'INSERT INTO torneos (nombre, descripcion, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, descripcion, fecha_inicio, fecha_fin, estado], (err, results) => { 
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, ...req.body });
    });
});

app.put('/torneos/editar/:id', async (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_fin, estado } = req.body;

    const sql = 'UPDATE torneos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id_torneo = ?';
    db.query(sql, [nombre, descripcion, fecha_inicio, fecha_fin, estado, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Torneo actualizado' });
    });
});

app.delete('/torneos/eliminar/:id', (req, res) => {
    const sql = 'DELETE FROM torneos WHERE id_torneo = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Torneo eliminado' });
    });
});


app.get('/equipos', (req, res) => {
    const sql = `
    SELECT
      e.id_equipo, 
      e.id_torneo,
      t.nombre AS torneo, 
      e.nombre, 
      e.entrenador
     FROM equipos e
     JOIN torneos t ON e.id_torneo = t.id_torneo`;
    db.query(sql, (err, results) => {
        if (err) {
         console.log(err);
         return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.post('/equipos/agregar', (req, res) => {
  const {
    id_torneo,
    nombre,
    entrenador,
  } = req.body;

  const sql = `
    INSERT INTO equipos (id_torneo, nombre, entrenador) 
    VALUES (?, ?, ?)`;
  db.query(sql, [id_torneo, nombre, entrenador],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Equipo creado" });
    });
});



app.put('/equipos/editar/:id', (req, res) => {

  const { id } = req.params;

  const {
    id_torneo,
    nombre,
    entrenador
  } = req.body; 

  const sql = `
    UPDATE equipos SET
    id_torneo = ?,
    nombre = ?,
    entrenador = ?
    WHERE id_equipo = ?
  `;

  db.query(sql, [
    id_torneo,
    nombre,
    entrenador,
    id
  ], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Equipo actualizado" });
  });
});



app.delete('/equipos/eliminar/:id', (req, res) => {
    const sql = 'DELETE FROM equipos WHERE id_equipo = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Equipo eliminado' });
    });
});





app.get("/jugadores", (req, res) => {
    const sql = `
    SELECT 
    j.id_jugador,
    j.id_equipo,
    e.nombre AS equipo,
    j.nombre,
    j.apellido,
    j.documento,
    j.numero_camiseta,
    j.estado
    FROM jugadores j
    JOIN equipos e ON j.id_equipo = e.id_equipo`;
    db.query(sql, (err, results) => {
        if (err) {
         console.log(err);
         return res.status(500).send(err);
        }
        res.json(results);
    });
});




app.put('/jugadores/editar/:id', (req, res) => {

  const { id } = req.params;

  const {
    id_equipo,
    nombre,
    apellido,
    documento,
    numero_camiseta,
    estado
  } = req.body; 


  const sql = `
    UPDATE jugadores SET
    id_equipo = ?,
    nombre = ?,
    apellido = ?,
    documento = ?,
    numero_camiseta = ?,
    estado = ?
    WHERE id_jugador = ?
  `;

  db.query(sql, [
    id_equipo,
    nombre,
    apellido,
    documento,
    numero_camiseta,
    estado,
    id
  ], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Jugador actualizado" });
  });
});


app.post('/jugadores/agregar', async (req, res) => {
  const { id_equipo, nombre, apellido, documento, numero_camiseta, estado } = req.body;

    const sql = `
      INSERT INTO jugadores 
      (id_equipo, nombre, apellido, documento, numero_camiseta, estado) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      id_equipo,
      nombre,
      apellido,
      documento,
      numero_camiseta,
      estado
    ], (err, results) => { //passwordHash se manda a la BD.
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, ...req.body });
    });
});

app.delete("/jugadores/eliminar/:id",  (req, res) => {
  const sql = 'DELETE FROM jugadores WHERE id_jugador = ?';
  db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Torneo eliminado' });
  });
});

app.listen(3000, () => {
   console.log('Servidor corriendo en el puerto 3000');
});
