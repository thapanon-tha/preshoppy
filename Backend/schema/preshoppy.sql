-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2020 at 10:41 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

create database preshoppy;
use preshoppy;

--
-- Database: `preshoppy`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `e_id` int(11) NOT NULL,
  `e_name` varchar(256) NOT NULL,
  `e_detail` text NOT NULL,
  `e_start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `e_end_date` timestamp NULL DEFAULT NULL,
  `e_location` varchar(256) NOT NULL,
  `e_contacts` text NOT NULL,
  `e_img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`e_id`, `e_name`, `e_detail`, `e_start_date`, `e_end_date`, `e_location`, `e_contacts`, `e_img`) VALUES
(1, '555555555555555sssss', 'งานขายหนังสือที่ใหญ่ที่สุดในประเทษไทย', '2001-10-10 13:10:10', '2001-10-09 13:10:12', 'somelocation', 'mewifuuuuuuu', 'localhost:3000/eventpic/27254db9-5263-4689-8359-5e8e02e633d5.jpg'),
(2, '\'สััปดาห์หนังสือแห่งชาติ', 'งานขายหนังสือที่ใหญ่ที่สุดในประเทษไทย', '2001-10-10 13:10:10', '2001-10-09 13:10:12', 'impack เมืองทองทานี', '-', 'localhost:3000/eventpic/ae520e3e-0ac6-40cd-99c9-a8bf60ec003b.jpg'),
(3, 'สััปดาห์หนังสือแห่งชาติ', 'งานขายหนังสือที่ใหญ่ที่สุดในประเทษไทย', '2001-10-10 13:10:10', '2001-10-10 13:10:10', 'impack เมืองทองทานี', '-', 'localhost:3000/eventpic/b2957baf-e95c-417e-a835-394941bb1b5c.jpg'),
(4, 'สััปดาห์หนังสือแห่งชาติ', 'งานขายหนังสือที่ใหญ่ที่สุดในประเทษไทย', '2001-10-10 13:10:10', '2001-10-10 13:10:10', 'impack เมืองทองทานี', '-', 'localhost:3000/eventpic/ec751506-66ec-467c-b232-4f613adf68a0.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `massages`
--

CREATE TABLE `massages` (
  `m_id` int(11) NOT NULL,
  `m_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `m_contents` text NOT NULL,
  `m_sender_uid` int(11) NOT NULL,
  `m_receiver_uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `t_id` int(11) NOT NULL,
  `t_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `t_receipt` varchar(256) NOT NULL,
  `t_tracking_id` varchar(128) DEFAULT NULL,
  `t_evend_eid` int(11) NOT NULL,
  `t_vendor_uid` int(11) NOT NULL,
  `t_customer_uid` int(11) NOT NULL,
  `t_status_tsid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transection_item`
--

CREATE TABLE `transection_item` (
  `ti_id` int(11) NOT NULL,
  `ti_item` varchar(45) NOT NULL,
  `ti_quantity` int(11) NOT NULL,
  `ti_price` float NOT NULL,
  `ti_details` text NOT NULL,
  `ti_tid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transection_status`
--

CREATE TABLE `transection_status` (
  `ts_id` int(11) NOT NULL,
  `ts_name` varchar(64) NOT NULL,
  `ts_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `u_id` int(11) NOT NULL,
  `u_tel` varchar(11) NOT NULL,
  `u_password` varchar(256) NOT NULL,
  `u_email` varchar(64) NOT NULL,
  `u_firstname` varchar(128) NOT NULL,
  `u_lastname` varchar(128) NOT NULL,
  `u_reputation` int(11) DEFAULT NULL,
  `u_role_urid` int(11) NOT NULL,
  `u_verdor_command_uvcid` int(11) NOT NULL,
  `u_vendor_status_uvsid` int(11) NOT NULL,
  `u_id_img` varchar(256) DEFAULT NULL,
  `u_command_img` varchar(256) DEFAULT NULL,
  `u_profile` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`u_id`, `u_tel`, `u_password`, `u_email`, `u_firstname`, `u_lastname`, `u_reputation`, `u_role_urid`, `u_verdor_command_uvcid`, `u_vendor_status_uvsid`, `u_id_img`, `u_command_img`, `u_profile`) VALUES
(1, 'XXXXXXXXXXX', '$2a$10$GeRynhvlhLdfMUcapJaVouwW.RrE6vveusBQtFP4dzDTl5XITw/km', 'admin', 'admin', 'test', NULL, 1, 1, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `us_id` int(11) NOT NULL,
  `us_postal` int(11) NOT NULL,
  `us_province` varchar(64) NOT NULL,
  `us_district` varchar(64) NOT NULL,
  `us_details` text NOT NULL,
  `us_fullname` varchar(256) NOT NULL,
  `us_tel` varchar(11) NOT NULL,
  `us_uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `ur_id` int(11) NOT NULL,
  `u_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`ur_id`, `u_name`) VALUES
(1, 'admin'),
(2, 'supporter'),
(3, 'vendor'),
(4, 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `user_vendor_command`
--

CREATE TABLE `user_vendor_command` (
  `uvc_id` int(11) NOT NULL,
  `uvc_name` varchar(64) NOT NULL,
  `uvc_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_vendor_command`
--

INSERT INTO `user_vendor_command` (`uvc_id`, `uvc_name`, `uvc_description`) VALUES
(1, 'NO COMMANDS', '-');

-- --------------------------------------------------------

--
-- Table structure for table `user_vendor_status`
--

CREATE TABLE `user_vendor_status` (
  `uvs_status` int(11) NOT NULL,
  `uvs_name` varchar(64) NOT NULL,
  `uvs_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_vendor_status`
--

INSERT INTO `user_vendor_status` (`uvs_status`, `uvs_name`, `uvs_description`) VALUES
(1, 'NO REQUIRE', ''),
(2, 'approve', 'approve from customer to vendor'),
(3, 'disapproval', 'disapproval from require to upgrade account'),
(4, 'queue', 'in queue to recheck');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`e_id`);

--
-- Indexes for table `massages`
--
ALTER TABLE `massages`
  ADD PRIMARY KEY (`m_id`),
  ADD KEY `fkIdx_63` (`m_sender_uid`),
  ADD KEY `fkIdx_66` (`m_receiver_uid`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`t_id`),
  ADD KEY `fkIdx_85` (`t_evend_eid`),
  ADD KEY `fkIdx_88` (`t_vendor_uid`),
  ADD KEY `fkIdx_91` (`t_customer_uid`),
  ADD KEY `fkIdx_99` (`t_status_tsid`);

--
-- Indexes for table `transection_item`
--
ALTER TABLE `transection_item`
  ADD PRIMARY KEY (`ti_id`),
  ADD KEY `fkIdx_110` (`ti_tid`);

--
-- Indexes for table `transection_status`
--
ALTER TABLE `transection_status`
  ADD PRIMARY KEY (`ts_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`),
  ADD KEY `fkIdx_36` (`u_role_urid`),
  ADD KEY `fkIdx_47` (`u_verdor_command_uvcid`),
  ADD KEY `fkIdx_55` (`u_vendor_status_uvsid`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`us_id`),
  ADD KEY `fkIdx_129` (`us_uid`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`ur_id`);

--
-- Indexes for table `user_vendor_command`
--
ALTER TABLE `user_vendor_command`
  ADD PRIMARY KEY (`uvc_id`);

--
-- Indexes for table `user_vendor_status`
--
ALTER TABLE `user_vendor_status`
  ADD PRIMARY KEY (`uvs_status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `e_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `t_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transection_item`
--
ALTER TABLE `transection_item`
  MODIFY `ti_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `us_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_vendor_command`
--
ALTER TABLE `user_vendor_command`
  MODIFY `uvc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_vendor_status`
--
ALTER TABLE `user_vendor_status`
  MODIFY `uvs_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `massages`
--
ALTER TABLE `massages`
  ADD CONSTRAINT `FK_63` FOREIGN KEY (`m_sender_uid`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `FK_66` FOREIGN KEY (`m_receiver_uid`) REFERENCES `user` (`u_id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `FK_85` FOREIGN KEY (`t_evend_eid`) REFERENCES `events` (`e_id`),
  ADD CONSTRAINT `FK_88` FOREIGN KEY (`t_vendor_uid`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `FK_91` FOREIGN KEY (`t_customer_uid`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `FK_99` FOREIGN KEY (`t_status_tsid`) REFERENCES `transection_status` (`ts_id`);

--
-- Constraints for table `transection_item`
--
ALTER TABLE `transection_item`
  ADD CONSTRAINT `FK_110` FOREIGN KEY (`ti_tid`) REFERENCES `transactions` (`t_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_36` FOREIGN KEY (`u_role_urid`) REFERENCES `user_roles` (`ur_id`),
  ADD CONSTRAINT `FK_47` FOREIGN KEY (`u_verdor_command_uvcid`) REFERENCES `user_vendor_command` (`uvc_id`),
  ADD CONSTRAINT `FK_55` FOREIGN KEY (`u_vendor_status_uvsid`) REFERENCES `user_vendor_status` (`uvs_status`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `FK_129` FOREIGN KEY (`us_uid`) REFERENCES `user` (`u_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
