-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 16-12-2024 a las 12:18:42
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `booksExchange`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Books`
--

CREATE TABLE `Books` (
  `id_book` int(8) UNSIGNED NOT NULL,
  `external_id_api` varchar(255) NOT NULL,
  `user_id` int(8) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `author` text DEFAULT NULL,
  `publishers` varchar(255) NOT NULL,
  `subject` text DEFAULT NULL,
  `isbn` varchar(255) DEFAULT NULL,
  `number_of_pages` int(50) DEFAULT NULL,
  `cover` text DEFAULT NULL,
  `favorite` tinyint(4) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Books`
--

INSERT INTO `Books` (`id_book`, `external_id_api`, `user_id`, `title`, `author`, `publishers`, `subject`, `isbn`, `number_of_pages`, `cover`, `favorite`, `created_at`, `updated_at`) VALUES
(24, '/works/OL34766796W', 13, 'El Principito', 'Antoine de Saint-Exupéry, Marie Mersoye', 'Salamandra Infantil y Juvenil, Publicaciones y Ediciones Salamandra, S.A.', '', '8418797452, 9788418797453', 96, 'https://covers.openlibrary.org/b/olid/OL47116985M-L.jpg', 0, '2024-12-16 00:16:04', '2024-12-16 00:16:04'),
(25, '/works/OL82548W', 13, 'Harry Potter and the Order of the Phoenix', 'J. K. Rowling', 'Media Rodzina', '', '837278096X, 9788372780966', 954, 'https://covers.openlibrary.org/b/olid/OL25662116M-L.jpg', 0, '2024-12-16 00:19:22', '2024-12-16 00:19:22'),
(26, '/works/OL82586W', 13, 'Harry Potter and the Deathly Hallows', 'J. K. Rowling', 'Scholastic, Incorporated, Arthur A. Levine Books, Scholastic Inc.', '', '9781338878981', 784, 'https://covers.openlibrary.org/b/olid/OL28172760M-L.jpg', 0, '2024-12-16 00:28:21', '2024-12-16 00:28:21'),
(28, '/works/OL17071997W', 13, 'La ciudad de las damas ', NULL, 'siruela', '', '8478444890', NULL, 'https://covers.openlibrary.org/b/olid/OL25641536M-L.jpg', 0, '2024-12-16 00:32:39', '2024-12-16 00:32:39'),
(29, '/works/OL38394337W', 13, 'Harry Potter y la Piedra Filosofal / Harry Potter and the Sorcerer\'s Stone', 'J. K. Rowling', 'Publicaciones y Ediciones Salamandra, S.A.', '', '9781536489378', 288, 'https://covers.openlibrary.org/b/olid/undefined-L.jpg', 0, '2024-12-16 00:38:03', '2024-12-16 00:38:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `BooksWishes`
--

CREATE TABLE `BooksWishes` (
  `id_bookWish` int(8) UNSIGNED NOT NULL,
  `external_id_api` varchar(255) NOT NULL,
  `user_id` int(8) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `author` text DEFAULT NULL,
  `publishers` varchar(255) NOT NULL,
  `subject` text DEFAULT NULL,
  `isbn` varchar(255) DEFAULT NULL,
  `number_of_pages` int(50) DEFAULT NULL,
  `cover` text DEFAULT NULL,
  `favorite` tinyint(4) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `BooksWishes`
--

INSERT INTO `BooksWishes` (`id_bookWish`, `external_id_api`, `user_id`, `title`, `author`, `publishers`, `subject`, `isbn`, `number_of_pages`, `cover`, `favorite`, `created_at`, `updated_at`) VALUES
(1, '/works/OL10284561W', 13, 'La Ciudad de Las Damas', 'Cristina de Pizan', 'Siruela', '', '8478444890, 9788478444892', 298, 'https://covers.openlibrary.org/b/olid/OL13311239M-L.jpg', 0, '2024-12-16 00:37:06', '2024-12-16 00:37:06'),
(5, '/works/OL34766796W', 13, 'El Principito', 'Antoine de Saint-Exupéry, Marie Mersoye', 'Salamandra Infantil y Juvenil, Publicaciones y Ediciones Salamandra, S.A.', '', '8418797452, 9788418797453', 96, 'https://covers.openlibrary.org/b/olid/OL47116985M-L.jpg', 0, '2024-12-16 09:53:50', '2024-12-16 09:53:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Exchanges`
--

CREATE TABLE `Exchanges` (
  `id_exchange` int(8) NOT NULL,
  `book_id` int(8) UNSIGNED NOT NULL,
  `requested_book_id` int(8) UNSIGNED NOT NULL,
  `from_user_id` int(8) UNSIGNED NOT NULL,
  `to_user_id` int(8) UNSIGNED NOT NULL,
  `status` enum('pending','accepted','rejected','completed') DEFAULT 'pending',
  `review_rating` tinyint(1) DEFAULT NULL,
  `review_comment` text DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Localizaciones`
--

CREATE TABLE `Localizaciones` (
  `id_localizacion` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(11,8) NOT NULL,
  `categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Localizaciones`
--

INSERT INTO `Localizaciones` (`id_localizacion`, `nombre`, `latitud`, `longitud`, `categoria`) VALUES
(11, 'Papelería El Corte Inglés', 41.37858500, 2.19130300, 'Papelería'),
(12, 'Biblioteca de Catalunya', 41.38483700, 2.17423700, 'Biblioteca'),
(13, 'Papelería Rivas', 41.38634400, 2.17855600, 'Papelería'),
(14, 'Biblioteca Sagrada Família - Josep M. Ainaud de Lasarte', 41.40657600, 2.17926400, 'Biblioteca'),
(15, 'Papelería Balmes', 41.39805100, 2.16612500, 'Papelería'),
(16, 'Biblioteca Jaume Fuster', 41.40830300, 2.15050600, 'Biblioteca'),
(17, 'Tienda de Barrio La Comerç', 41.38737600, 2.17402900, 'Tienda de barrio'),
(18, 'Papelería Ramoneda', 41.37526100, 2.14575600, 'Papelería'),
(19, 'Tienda de Barrio Verdún', 41.43892500, 2.17496400, 'Tienda de barrio'),
(20, 'Biblioteca El Carmel - Juan Marsé', 41.42330300, 2.15605800, 'Biblioteca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Messages`
--

CREATE TABLE `Messages` (
  `id_message` int(8) UNSIGNED NOT NULL,
  `book_id` int(8) UNSIGNED NOT NULL,
  `from_user_id` int(8) UNSIGNED NOT NULL,
  `to_user_id` int(8) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RecoveryTokens`
--

CREATE TABLE `RecoveryTokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` int(8) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Users`
--

CREATE TABLE `Users` (
  `id_user` int(8) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` varchar(30) NOT NULL DEFAULT 'user',
  `photo` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Users`
--

INSERT INTO `Users` (`id_user`, `name`, `email`, `password`, `roles`, `photo`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'johndoe@example.com', 'hashed_password_here', 'admin', 'profile_picture.jpg', '2024-11-27 17:53:14', '2024-11-27 17:53:14'),
(2, 'Jane Smith', 'janesmith@example.com', 'hashed_password_here', 'user', NULL, '2024-11-27 17:53:14', '2024-11-27 17:53:14'),
(3, 'Josesito', 'jose@example.com', '$2b$10$tBBmSlV1QGbCjTOsWdp8s.diZPm6MUmWG2GhqFOtuNQUVNj/TsuEW', 'admin', 'profile_pictures.jpg', '2024-11-27 19:56:08', '2024-11-27 19:56:08'),
(8, 'jhorman', 'jhormanca@gmail.com', '$2b$10$os2NFeucnT6RInGlA//Pj.iQlcr8a4njrHjIkLN8CDZ6/XKU6VSSy', 'user', 'undefined-1732834608799.jpg', '2024-11-28 14:50:29', '2024-11-28 22:56:53'),
(9, 'camilo', 'camilo@gmail.com', '$2b$10$7xSr9C9QtsoPdLKhSm92zOvOvc0ansqyj56we7R5lzj1Ok3Z9/QDu', 'user', NULL, '2024-12-12 20:32:45', '2024-12-12 20:32:45'),
(10, 'camilon', 'camilon@gmail.com', '$2b$10$wNGuj1PoNT2lVPgEgCHtFuOuMIYMPo9in1JDbvRWuIhaGCztA3pT6', 'user', NULL, '2024-12-12 20:35:17', '2024-12-12 20:35:17'),
(11, 'camilon ', 'camilon2@gmail.com', '$2b$10$dWPz9QVO8R.yWy5gYjyGeuiXiAJvLC24lr81gP3dNubbTkJ00v8nS', 'user', NULL, '2024-12-12 21:51:36', '2024-12-12 21:51:36'),
(12, 'camilon ', 'camilon3@gmail.com', '$2b$10$Hm2banSBCot2Ay33cSW6NuqNAkOdtgezRPqJIv/9p6V8IIUoTqaw.', 'user', NULL, '2024-12-12 21:56:43', '2024-12-12 21:56:43'),
(13, 'camilon ', 'camilon4@gmail.com', '$2b$10$bW4XnFb3lyO2HocdMuI8MO63s4pFl5yvqtByW/LGIm0GXATFmK3b2', 'user', NULL, '2024-12-12 21:57:24', '2024-12-12 21:57:24'),
(14, 'jhorman', 'jhormanvalero@gmail.com', '$2b$10$UTpUcvDpuuOZp2Cxm9E13OO7GUks0vV/.aouCgVDNlKLLlTt9qyh2', 'user', NULL, '2024-12-12 23:08:45', '2024-12-12 23:08:45'),
(15, 'jhormanvalero', 'valero1@gmail.com', '$2b$10$hdpM7bW2xthBzScDhlgT5.IMnuzow5X4/6diCGfDtHbo.hxEuMIkq', 'user', NULL, '2024-12-12 23:12:10', '2024-12-12 23:12:10'),
(16, 'jhorman', 'valero2@gmail.com', '$2b$10$U40m.uDo/9y0JGsmEt4z7.tDwYvdq8x8tnvggEmQEtHMnchlKfSlW', 'user', NULL, '2024-12-12 23:12:40', '2024-12-12 23:12:40'),
(17, 'Jhorman', 'jhormancamilo@gmail.com', '$2b$10$zmbecnc3t/7xcje00O5FJOcieAez35onn0agdRbtP.jfZaDA6rPm6', 'user', NULL, '2024-12-13 01:49:26', '2024-12-13 01:49:26'),
(18, 'paola', 'paolita@gmail.com', '$2b$10$rT4y5VqsCmJ1vAdsP4SQs.f9WCudkiKkAcVNPCJK.ZaXjMakobX56', 'user', NULL, '2024-12-13 01:52:12', '2024-12-13 01:52:12'),
(19, 'jhormanvalerocadena', 'jhorvalero@gmail.com', '$2b$10$CP5Jjrg6aRSdbpZOZCmI8.NkruqsqvVYbIfxEsBX83IAzOI8GrZDK', 'user', NULL, '2024-12-13 02:01:33', '2024-12-13 02:01:33'),
(20, 'jhormanvaleroc', 'camilonjhorman@gmail.com', '$2b$10$zfFqboASb9s0u9W.1VMGX.RFYWw2AASkVjGodouIwomwKPqnAClDm', 'user', NULL, '2024-12-13 02:04:18', '2024-12-13 02:04:18'),
(21, 'paula ', 'paulacadena1@gmail.com', '$2b$10$IRHhbSuWmMKQULxv3nN./OYg8hi6FDzIzqwHueMG5haSLwRTSKJBe', 'user', NULL, '2024-12-13 02:09:08', '2024-12-13 02:09:08'),
(22, 'jose', 'josito@gmail.com', '$2b$10$V2i5HkRJvM3tEvgDVnSom.tPEyiJFFcM3lLjWDAiEqvABx98UUKYC', 'user', NULL, '2024-12-13 12:15:17', '2024-12-13 12:15:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `WishlistsAsociates`
--

CREATE TABLE `WishlistsAsociates` (
  `id_wishlist` int(8) UNSIGNED NOT NULL,
  `user_id` int(8) UNSIGNED NOT NULL,
  `book_id` int(8) UNSIGNED NOT NULL,
  `added_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`id_book`),
  ADD UNIQUE KEY `books_external_id_api_user_id` (`external_id_api`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `BooksWishes`
--
ALTER TABLE `BooksWishes`
  ADD PRIMARY KEY (`id_bookWish`),
  ADD UNIQUE KEY `books_external_id_api_user_id` (`external_id_api`,`user_id`),
  ADD UNIQUE KEY `books_wishes_external_id_api_user_id` (`external_id_api`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `Exchanges`
--
ALTER TABLE `Exchanges`
  ADD PRIMARY KEY (`id_exchange`),
  ADD KEY `from_user_id` (`from_user_id`),
  ADD KEY `to_user_id` (`to_user_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `requested_book_id` (`requested_book_id`);

--
-- Indices de la tabla `Localizaciones`
--
ALTER TABLE `Localizaciones`
  ADD PRIMARY KEY (`id_localizacion`);

--
-- Indices de la tabla `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `from_user_id` (`from_user_id`),
  ADD KEY `to_user_id` (`to_user_id`);

--
-- Indices de la tabla `RecoveryTokens`
--
ALTER TABLE `RecoveryTokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `users_email` (`email`);

--
-- Indices de la tabla `WishlistsAsociates`
--
ALTER TABLE `WishlistsAsociates`
  ADD PRIMARY KEY (`id_wishlist`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Books`
--
ALTER TABLE `Books`
  MODIFY `id_book` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `BooksWishes`
--
ALTER TABLE `BooksWishes`
  MODIFY `id_bookWish` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `Exchanges`
--
ALTER TABLE `Exchanges`
  MODIFY `id_exchange` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Localizaciones`
--
ALTER TABLE `Localizaciones`
  MODIFY `id_localizacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `Messages`
--
ALTER TABLE `Messages`
  MODIFY `id_message` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `RecoveryTokens`
--
ALTER TABLE `RecoveryTokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `Users`
--
ALTER TABLE `Users`
  MODIFY `id_user` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `WishlistsAsociates`
--
ALTER TABLE `WishlistsAsociates`
  MODIFY `id_wishlist` int(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Exchanges`
--
ALTER TABLE `Exchanges`
  ADD CONSTRAINT `exchanges_ibfk_1` FOREIGN KEY (`from_user_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exchanges_ibfk_2` FOREIGN KEY (`to_user_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exchanges_ibfk_3` FOREIGN KEY (`book_id`) REFERENCES `Books` (`id_book`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exchanges_ibfk_4` FOREIGN KEY (`requested_book_id`) REFERENCES `Books` (`id_book`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Messages`
--
ALTER TABLE `Messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `Books` (`id_book`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`from_user_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`to_user_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `RecoveryTokens`
--
ALTER TABLE `RecoveryTokens`
  ADD CONSTRAINT `recoverytokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `WishlistsAsociates`
--
ALTER TABLE `WishlistsAsociates`
  ADD CONSTRAINT `wishlistsasociates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id_user`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlistsasociates_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `Books` (`id_book`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
