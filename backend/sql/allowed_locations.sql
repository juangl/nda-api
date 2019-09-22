-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 12, 2019 at 05:47 PM
-- Server version: 5.6.44-cll-lve
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `domi_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `allowed_locations`
--

CREATE TABLE `allowed_locations` (
  `idallowed_locations` int(10) NOT NULL,
  `name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `areacoords` varchar(1000) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `allowed_locations`
--

INSERT INTO `allowed_locations` (`idallowed_locations`, `name`, `areacoords`) VALUES
(1, 'Arandas Jalisco', '[[-102.3606852,20.6974888],[-102.3618868,20.6959231],[-102.3617151,20.6922698],[-102.3576381,20.691507],[-102.3568442,20.6889978],[-102.3559645,20.6835175],[-102.3487547,20.681751],[-102.3432615,20.6819115],[-102.3432617,20.6891383],[-102.3376827,20.6889777],[-102.3367384,20.6926712],[-102.3386699,20.699456],[-102.3329406,20.7017244],[-102.3267285,20.7007709],[-102.3201731,20.7022259],[-102.3218467,20.7055578],[-102.3171046,20.7105957],[-102.3219862,20.712352],[-102.3277262,20.7118603],[-102.330816,20.7152723],[-102.3368242,20.7173997],[-102.3482397,20.7175603],[-102.355192,20.7144293],[-102.3586254,20.7078461],[-102.3637751,20.7080066],[-102.3644617,20.7032696],[-102.3605993,20.7016237],[-102.3606852,20.6974888]]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allowed_locations`
--
ALTER TABLE `allowed_locations`
  ADD PRIMARY KEY (`idallowed_locations`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allowed_locations`
--
ALTER TABLE `allowed_locations`
  MODIFY `idallowed_locations` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
