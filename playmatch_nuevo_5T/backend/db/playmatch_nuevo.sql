-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2026 a las 22:42:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `playmatch_nuevo`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_posiciones` ()   BEGIN
    DELETE FROM posiciones;
    
    INSERT INTO posiciones (id_equipo, equipo, torneo, jugados, ganados, empatados, perdidos, gf, gc, puntos)
    SELECT 
        e.id_equipo,
        e.nombre AS equipo,
        t.nombre AS torneo,
        COUNT(DISTINCT ec.id_encuentro) AS jugados,
        SUM(CASE WHEN (ec.id_equipo_local = e.id_equipo AND r.goles_local > r.goles_visitante) OR
                     (ec.id_equipo_visitante = e.id_equipo AND r.goles_visitante > r.goles_local) THEN 1 ELSE 0 END) AS ganados,
        SUM(CASE WHEN r.goles_local = r.goles_visitante THEN 1 ELSE 0 END) AS empatados,
        SUM(CASE WHEN (ec.id_equipo_local = e.id_equipo AND r.goles_local < r.goles_visitante) OR
                     (ec.id_equipo_visitante = e.id_equipo AND r.goles_visitante < r.goles_local) THEN 1 ELSE 0 END) AS perdidos,
        SUM(CASE WHEN ec.id_equipo_local = e.id_equipo THEN r.goles_local ELSE r.goles_visitante END) AS gf,
        SUM(CASE WHEN ec.id_equipo_local = e.id_equipo THEN r.goles_visitante ELSE r.goles_local END) AS gc,
        SUM(CASE WHEN (ec.id_equipo_local = e.id_equipo AND r.goles_local > r.goles_visitante) OR
                     (ec.id_equipo_visitante = e.id_equipo AND r.goles_visitante > r.goles_local) THEN 3
                WHEN r.goles_local = r.goles_visitante THEN 1 ELSE 0 END) AS puntos
    FROM equipos e
    JOIN torneos t ON e.id_torneo = t.id_torneo
    LEFT JOIN encuentros ec ON (ec.id_equipo_local = e.id_equipo OR ec.id_equipo_visitante = e.id_equipo) 
        AND ec.estado = 'jugado'
    LEFT JOIN resultados r ON ec.id_encuentro = r.id_encuentro
    GROUP BY e.id_equipo, e.nombre, t.nombre;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuentros`
--

CREATE TABLE `encuentros` (
  `id_encuentro` int(11) NOT NULL,
  `id_torneo` int(11) NOT NULL,
  `id_equipo_local` int(11) NOT NULL,
  `id_equipo_visitante` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `lugar` varchar(100) DEFAULT NULL,
  `jornada` enum('Mañana','Tarde','Noche') NOT NULL DEFAULT 'Tarde',
  `id_arbitro` int(11) DEFAULT NULL,
  `estado` enum('Programado','En curso','Finalizado','Cancelado') NOT NULL DEFAULT 'Programado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `encuentros`
--

INSERT INTO `encuentros` (`id_encuentro`, `id_torneo`, `id_equipo_local`, `id_equipo_visitante`, `fecha`, `lugar`, `jornada`, `id_arbitro`, `estado`) VALUES
(1, 1, 1, 2, '2024-12-05 15:00:00', 'Cancha Central', 'Mañana', 2, ''),
(2, 1, 2, 4, '2026-03-30 05:00:00', 'Cancha Pamela ', 'Mañana', 1, 'En curso'),
(5, 3, 2, 1, '2026-03-31 00:00:00', 'Parques', '', NULL, 'Programado'),
(6, 1, 1, 4, '2026-04-02 00:00:00', 'bosa', '', 3, 'Programado'),
(8, 5, 2, 4, '2026-05-28 00:00:00', 'Bosa', 'Noche', 13, 'Programado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int(11) NOT NULL,
  `id_torneo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `entrenador` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `id_torneo`, `nombre`, `entrenador`) VALUES
(1, 1, 'Castilla', 'Jugadores buenos'),
(2, 1, 'Bosa', 'Regulares'),
(4, 3, 'Prueba', 'Junior');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id_jugador` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `documento` varchar(20) DEFAULT NULL,
  `numero_camiseta` int(11) DEFAULT NULL,
  `estado` enum('activo','lesionado','suspendido') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id_jugador`, `id_equipo`, `nombre`, `apellido`, `documento`, `numero_camiseta`, `estado`) VALUES
(1, 1, 'Juan', 'Martínez', '12345678', 10, 'activo'),
(2, 1, 'Luis', 'Rodríguez', '87654321', 7, 'activo'),
(3, 2, 'Pedro', 'Gómez', '11223344', 9, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posiciones`
--

CREATE TABLE `posiciones` (
  `id_posicion` int(11) NOT NULL,
  `id_torneo` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `jugados` int(11) DEFAULT 0,
  `ganados` int(11) DEFAULT 0,
  `empatados` int(11) DEFAULT 0,
  `perdidos` int(11) DEFAULT 0,
  `gf` int(11) DEFAULT 0,
  `gc` int(11) DEFAULT 0,
  `puntos` int(11) DEFAULT 0,
  `actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posiciones`
--

INSERT INTO `posiciones` (`id_posicion`, `id_torneo`, `id_equipo`, `jugados`, `ganados`, `empatados`, `perdidos`, `gf`, `gc`, `puntos`, `actualizado`) VALUES
(4, 0, 1, 1, 1, 0, 0, 2, 1, 3, '2026-03-22 17:03:32'),
(5, 0, 2, 1, 0, 0, 1, 1, 2, 0, '2026-03-22 17:03:32'),
(11, 1, 2, 3, 1, 1, 1, 4, 1, 4, '2026-03-24 21:46:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `id_resultado` int(11) NOT NULL,
  `id_encuentro` int(11) NOT NULL,
  `goles_local` int(11) DEFAULT 0,
  `goles_visitante` int(11) DEFAULT 0,
  `faltas_local` int(11) DEFAULT 0,
  `faltas_visitante` int(11) DEFAULT 0,
  `tarjetas_amarillas` text DEFAULT NULL,
  `tarjetas_rojas` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `id_creador` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`id_resultado`, `id_encuentro`, `goles_local`, `goles_visitante`, `faltas_local`, `faltas_visitante`, `tarjetas_amarillas`, `tarjetas_rojas`, `observaciones`, `id_creador`, `fecha_creacion`) VALUES
(1, 1, 2, 1, 8, 12, '10,7', NULL, NULL, 1, '2026-03-22 17:03:32'),
(7, 2, 3, 0, 10, 11, '5', '0', 'El partido fue interumpido por varias faltas', 2, '2026-04-14 02:58:02'),
(26, 6, 9, 5, 4, 1, '0', '2', 'Se', 1, '2026-04-14 03:35:18'),
(33, 7, 1, 1, 1, 1, '1', '1', '1', 1, '2026-05-06 20:29:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE `torneos` (
  `id_torneo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` enum('Programado','En curso','Finalizado','Cancelado') NOT NULL DEFAULT 'Programado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `torneos`
--

INSERT INTO `torneos` (`id_torneo`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `estado`) VALUES
(1, 'Copa Navidad 2024', 'Torneo relámpago de fin de año', '2024-12-01', '2024-12-20', ''),
(3, 'Socios', '12', '2006-08-16', '2026-08-16', 'Programado'),
(5, 'Pepes', 'Pepes', '2026-05-06', '2026-05-08', 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','arbitro','entrenador','consultor') DEFAULT 'consultor',
  `estado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
  `fecha_actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `password`, `rol`, `estado`, `fecha_actualizado`) VALUES
(1, 'Admin Sistema', 'admin@torneo.com', '$2b$10$Nqe3vdVxpzkQsy4lji8zMePL9Hs./gqBOnLZocUEhultSSqbzp60K', 'admin', 'Activo', '2026-05-06 20:12:28'),
(2, 'Carlos Arbitro', 'arbitro@torneo.com', 'cf1b33af348aa06eeff41427e7830b207bd2256d8685b825633dd3cbb46ed0a6', 'arbitro', 'Activo', '2026-03-22 17:03:32'),
(3, 'Maria Entrenador', 'entrenador@torneo.com', 'defbe44d30454a18fbbd862cfe5e59818d18dafd8feba4d71a797c20c265b672', 'entrenador', 'Activo', '2026-03-22 17:03:32'),
(4, 'Camilo', 'camilo123@torneo.com', '$2b$10$JIz60cMgiVsCdPuul.rTb.4LGRdJT/8sbNxfWOG00zBBrMTD8GPLG', 'admin', 'Activo', '2026-05-05 21:49:25'),
(12, 'Prueba', 'prueba@gmail.com', '$2b$10$Gbwd2lHF4v1.VrBFIBBZpuaJnN0Bzv1eJ/vTr18Mswgv.T8ecWrhu', 'admin', 'Activo', '2026-05-05 22:45:34'),
(13, 'Sebastian', 'sebastian1234@gmail.com', '$2b$10$3u7nc9GF8ejOIIXwVACcfezHQwWJLAKMTQZuh66fhte.cmnpMLeYK', 'admin', 'Activo', '2026-05-06 20:12:51'),
(14, 'prueba', 'prueba98@gmail.com', '$2b$10$h9cIgGcI7VV7eSM89nBNvemXPqDgKciLmC/oGXzMwUXjfHLYQVOZi', 'arbitro', 'Inactivo', '2026-05-06 20:13:35');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encuentros`
--
ALTER TABLE `encuentros`
  ADD PRIMARY KEY (`id_encuentro`),
  ADD KEY `id_torneo` (`id_torneo`),
  ADD KEY `id_equipo_local` (`id_equipo_local`),
  ADD KEY `id_equipo_visitante` (`id_equipo_visitante`),
  ADD KEY `id_arbitro` (`id_arbitro`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `id_torneo` (`id_torneo`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id_jugador`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `posiciones`
--
ALTER TABLE `posiciones`
  ADD PRIMARY KEY (`id_posicion`),
  ADD UNIQUE KEY `unique_equipo_torneo` (`id_equipo`,`id_torneo`),
  ADD KEY `fk_posiciones_torneo` (`id_torneo`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`id_resultado`),
  ADD UNIQUE KEY `id_encuentro` (`id_encuentro`),
  ADD KEY `id_created_by` (`id_creador`);

--
-- Indices de la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`id_torneo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `encuentros`
--
ALTER TABLE `encuentros`
  MODIFY `id_encuentro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id_jugador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `posiciones`
--
ALTER TABLE `posiciones`
  MODIFY `id_posicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `id_resultado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `torneos`
--
ALTER TABLE `torneos`
  MODIFY `id_torneo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `encuentros`
--
ALTER TABLE `encuentros`
  ADD CONSTRAINT `encuentros_ibfk_1` FOREIGN KEY (`id_torneo`) REFERENCES `torneos` (`id_torneo`) ON DELETE CASCADE,
  ADD CONSTRAINT `encuentros_ibfk_2` FOREIGN KEY (`id_equipo_local`) REFERENCES `equipos` (`id_equipo`),
  ADD CONSTRAINT `encuentros_ibfk_3` FOREIGN KEY (`id_equipo_visitante`) REFERENCES `equipos` (`id_equipo`),
  ADD CONSTRAINT `encuentros_ibfk_4` FOREIGN KEY (`id_arbitro`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL;

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`id_torneo`) REFERENCES `torneos` (`id_torneo`) ON DELETE CASCADE;

--
-- Filtros para la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD CONSTRAINT `jugadores_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
