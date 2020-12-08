SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
CREATE TABLE `events` (
  `e_id` int(11) NOT NULL,
  `e_name` varchar(256) NOT NULL,
  `e_detail` text NOT NULL,
  `e_start_date` datetime NOT NULL,
  `e_end_date` datetime NOT NULL,
  `e_location` varchar(256) NOT NULL,
  `e_contacts` text NOT NULL,
  `e_img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `events` (`e_id`, `e_name`, `e_detail`, `e_start_date`, `e_end_date`, `e_location`, `e_contacts`, `e_img`) VALUES
(1, 'ทดสอบ', 'งานทดสอบ', '2001-10-10 13:10:10', '2001-10-09 13:10:12', 'โลก', 'คุณแมว 069-696-6969', '27254db9-5263-4689-8359-5e8e02e633d5.jpg'),
(2, 'สัปดาห์หนังสือแห่งชาติ', 'งานขายหนังสือที่ใหญ่ที่สุดในประเทศไทย', '2001-10-10 13:10:10', '2001-10-09 13:10:12', 'IMPACT เมืองทองธานี', '', 'ae520e3e-0ac6-40cd-99c9-a8bf60ec003b.jpg'),
(3, 'สัปดาห์หนังสือแห่งชาติ', 'งานขายหนังสือที่ใหญ่ที่สุดในประเทศไทย', '2001-10-10 13:10:10', '2001-10-10 13:10:10', 'IMPACT เมืองทองธานี', '', 'b2957baf-e95c-417e-a835-394941bb1b5c.jpg'),
(4, 'สัปดาห์หนังสือแห่งชาติ', 'งานขายหนังสือที่ใหญ่ที่สุดในประเทศไทย', '2001-10-10 13:10:10', '2001-10-10 13:10:10', 'IMPACT เมืองทองธานี', '', 'ec751506-66ec-467c-b232-4f613adf68a0.jpg'),
(5, 'มอเตอร์โชว์', 'งานขายนมใหญ่ที่สุดในประเทศไทย', '2001-10-10 13:10:10', '2001-10-10 13:10:10', 'ไบเทคบางนา', '', '66f2115b-1c0f-4efd-8da4-b381bd35f40c.jpg');
CREATE TABLE `messages` (
  `m_id` int(11) NOT NULL,
  `m_timestamp` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `m_contents` text NOT NULL,
  `m_sender_uid` int(11) NOT NULL,
  `m_receiver_uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `transactions` (
  `t_id` int(11) NOT NULL,
  `t_timestamp` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `t_receipt` varchar(256) DEFAULT NULL,
  `t_tracking_id` varchar(128) DEFAULT NULL,
  `t_event_eid` int(11) NOT NULL,
  `t_vendor_uid` int(11) NOT NULL,
  `t_customer_uid` int(11) NOT NULL,
  `t_status_tsid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `transactions` (`t_id`, `t_timestamp`, `t_receipt`, `t_tracking_id`, `t_event_eid`, `t_vendor_uid`, `t_customer_uid`, `t_status_tsid`) VALUES
(3, '2020-12-07 05:14:06', '9f7ad44f-80e3-44f6-8758-6c44577c8abb.jpg', NULL, 1, 1, 3, 2);
CREATE TABLE `transaction_item` (
  `ti_id` int(11) NOT NULL,
  `ti_item` varchar(45) NOT NULL,
  `ti_quantity` int(11) NOT NULL,
  `ti_price` float NOT NULL,
  `ti_details` text NOT NULL,
  `ti_tid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `transaction_item` (`ti_id`, `ti_item`, `ti_quantity`, `ti_price`, `ti_details`, `ti_tid`) VALUES
(1, 'book', 3, 1200, 'just a book', 3),
(2, 'cat', 3, 1300, 'some cat', 3),
(3, 'dog', 3, 1300, 'hot dog', 3),
(4, 'apple', 3, 1300, 'green apple', 3);
CREATE TABLE `transaction_status` (
  `ts_id` int(11) NOT NULL,
  `ts_name` varchar(64) NOT NULL,
  `ts_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `transaction_status` (`ts_id`, `ts_name`, `ts_description`) VALUES
(1, 'wait Payment', 'wait Customer Payment'),
(2, 'wait Tracking Number', 'wait trackingnumber from Vendor'),
(3, 'wait customer accept item', 'wait customer accept item'),
(4, 'Complete', 'Complete');
CREATE TABLE `user` (
  `u_id` int(11) NOT NULL,
  `u_tel` varchar(11) NOT NULL,
  `u_password` varchar(256) NOT NULL,
  `u_email` varchar(64) NOT NULL,
  `u_firstname` varchar(128) NOT NULL,
  `u_lastname` varchar(128) NOT NULL,
  `u_reputation` int(11) DEFAULT NULL,
  `u_role_urid` int(11) NOT NULL,
  `u_vendor_command_uvcid` int(11) NOT NULL,
  `u_vendor_status_uvsid` int(11) NOT NULL,
  `u_id_img` varchar(256) DEFAULT NULL,
  `u_command_img` varchar(256) DEFAULT NULL,
  `u_profile` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `user` (`u_id`, `u_tel`, `u_password`, `u_email`, `u_firstname`, `u_lastname`, `u_reputation`, `u_role_urid`, `u_vendor_command_uvcid`, `u_vendor_status_uvsid`, `u_id_img`, `u_command_img`, `u_profile`) VALUES
(1, '0000000000', '64d09d9930c8ecf79e513167a588cb75439b762ce8f9b22ea59765f32aa74ca19d2f1e97dc922a3d4954594a05062917fb24d1f8e72f2ed02a58ed7534f94d27', 'admin@preshoppy.com', 'admin', 'test', NULL, 1, 1, 1, NULL, NULL, NULL),
(3, '1234567890', '64d09d9930c8ecf79e513167a588cb75439b762ce8f9b22ea59765f32aa74ca19d2f1e97dc922a3d4954594a05062917fb24d1f8e72f2ed02a58ed7534f94d27', 'test@mail.net', 'FirstName', 'LastName', NULL, 4, 1, 3, '09da8d3d-4995-4d51-8d65-05056de8f5cd.jpg', '09da8d3d-4995-4d51-8d65-05056de8f5cd.jpg', '16073536-66b1-4743-8b8c-bf9b22487aa1.jpg'),
(4, '1234567890', '64d09d9930c8ecf79e513167a588cb75439b762ce8f9b22ea59765f32aa74ca19d2f1e97dc922a3d4954594a05062917fb24d1f8e72f2ed02a58ed7534f94d27', 'test2@mail.net', 'FirstName', 'LastName', NULL, 4, 1, 4, '724859b4-4fa2-4d54-b11d-5305556c4ef1.jpg', '724859b4-4fa2-4d54-b11d-5305556c4ef1.jpg', '7256bba7-79df-4610-854f-6a2ece83764e.jpg');
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
CREATE TABLE `user_roles` (
  `ur_id` int(11) NOT NULL,
  `u_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `user_roles` (`ur_id`, `u_name`) VALUES
(1, 'admin'),
(2, 'supporter'),
(3, 'vendor'),
(4, 'customer');
CREATE TABLE `user_vendor_command` (
  `uvc_id` int(11) NOT NULL,
  `uvc_name` varchar(64) NOT NULL,
  `uvc_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `user_vendor_command` (`uvc_id`, `uvc_name`, `uvc_description`) VALUES
(1, 'NO COMMANDS', '-');
CREATE TABLE `user_vendor_status` (
  `uvs_status` int(11) NOT NULL,
  `uvs_name` varchar(64) NOT NULL,
  `uvs_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `user_vendor_status` (`uvs_status`, `uvs_name`, `uvs_description`) VALUES
(1, 'NO REQUIRE', ''),
(2, 'approve', 'approve from customer to vendor'),
(3, 'disapproval', 'disapproval from require to upgrade account'),
(4, 'queue', 'in queue to recheck');
ALTER TABLE `events`
  ADD PRIMARY KEY (`e_id`);
ALTER TABLE `messages`
  ADD PRIMARY KEY (`m_id`),
  ADD KEY `FK_63` (`m_sender_uid`),
  ADD KEY `FK_66` (`m_receiver_uid`);
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`t_id`),
  ADD KEY `FK_85` (`t_event_eid`),
  ADD KEY `FK_88` (`t_vendor_uid`),
  ADD KEY `FK_91` (`t_customer_uid`),
  ADD KEY `FK_99` (`t_status_tsid`);
ALTER TABLE `transaction_item`
  ADD PRIMARY KEY (`ti_id`),
  ADD KEY `FK_110` (`ti_tid`);
ALTER TABLE `transaction_status`
  ADD PRIMARY KEY (`ts_id`);
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`),
  ADD KEY `FK_36` (`u_role_urid`),
  ADD KEY `FK_47` (`u_vendor_command_uvcid`),
  ADD KEY `FK_55` (`u_vendor_status_uvsid`);
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`us_id`),
  ADD KEY `FK_129` (`us_uid`);
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`ur_id`);
ALTER TABLE `user_vendor_command`
  ADD PRIMARY KEY (`uvc_id`);
ALTER TABLE `user_vendor_status`
  ADD PRIMARY KEY (`uvs_status`);
ALTER TABLE `events`
  MODIFY `e_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `transactions`
  MODIFY `t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
ALTER TABLE `transaction_item`
  MODIFY `ti_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
ALTER TABLE `user`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
ALTER TABLE `user_address`
  MODIFY `us_id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `user_vendor_command`
  MODIFY `uvc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `user_vendor_status`
  MODIFY `uvs_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
ALTER TABLE `messages`
  ADD CONSTRAINT `FK_63` FOREIGN KEY (`m_sender_uid`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `FK_66` FOREIGN KEY (`m_receiver_uid`) REFERENCES `user` (`u_id`);
ALTER TABLE `transactions`
  ADD CONSTRAINT `FK_85` FOREIGN KEY (`t_event_eid`) REFERENCES `events` (`e_id`),
  ADD CONSTRAINT `FK_88` FOREIGN KEY (`t_vendor_uid`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `FK_91` FOREIGN KEY (`t_customer_uid`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `FK_99` FOREIGN KEY (`t_status_tsid`) REFERENCES `transaction_status` (`ts_id`);
ALTER TABLE `transaction_item`
  ADD CONSTRAINT `FK_110` FOREIGN KEY (`ti_tid`) REFERENCES `transactions` (`t_id`);
ALTER TABLE `user`
  ADD CONSTRAINT `FK_36` FOREIGN KEY (`u_role_urid`) REFERENCES `user_roles` (`ur_id`),
  ADD CONSTRAINT `FK_47` FOREIGN KEY (`u_vendor_command_uvcid`) REFERENCES `user_vendor_command` (`uvc_id`),
  ADD CONSTRAINT `FK_55` FOREIGN KEY (`u_vendor_status_uvsid`) REFERENCES `user_vendor_status` (`uvs_status`);
ALTER TABLE `user_address`
  ADD CONSTRAINT `FK_129` FOREIGN KEY (`us_uid`) REFERENCES `user` (`u_id`);
CREATE TABLE `matching` (
  `m_vendor_uid` int(11) DEFAULT NULL,
  `m_customer_uid` int(11) DEFAULT NULL,
  `m_eid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `matching` (`m_vendor_uid`, `m_customer_uid`, `m_eid`) VALUES
(1, NULL, 3),
(3, 3, 2),
(4, 1, 3);
ALTER TABLE `matching`
  ADD KEY `m_customer_uid` (`m_customer_uid`),
  ADD KEY `m_vendor_uid` (`m_vendor_uid`),
  ADD KEY `m_eid` (`m_eid`);
ALTER TABLE `matching`
  ADD CONSTRAINT `FK_1` FOREIGN KEY (`m_customer_uid`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `FK_2` FOREIGN KEY (`m_vendor_uid`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `FK_3` FOREIGN KEY (`m_eid`) REFERENCES `events` (`e_id`)
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
