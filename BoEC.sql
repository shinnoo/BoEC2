/*
 Navicat Premium Data Transfer

 Source Server         : mysql_localhost
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : BoEC

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 05/05/2021 14:11:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `prior_customer` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of customer
-- ----------------------------
BEGIN;
INSERT INTO `customer` VALUES (1, 'Davis', 'Wilson', b'1');
INSERT INTO `customer` VALUES (2, 'Marquardt', 'Aubrey', b'1');
INSERT INTO `customer` VALUES (3, 'Greenfelder', 'Jacey', b'1');
INSERT INTO `customer` VALUES (4, 'Rau', 'Dalton', b'0');
INSERT INTO `customer` VALUES (5, 'Nader', 'Lexus', b'0');
INSERT INTO `customer` VALUES (6, 'Fadel', 'Vaughn', b'0');
INSERT INTO `customer` VALUES (7, 'Christiansen', 'Dee', b'1');
INSERT INTO `customer` VALUES (8, 'Haag', 'Emma', b'1');
INSERT INTO `customer` VALUES (9, 'Jacobi', 'Einar', b'1');
INSERT INTO `customer` VALUES (10, 'Schroeder', 'Afton', b'0');
COMMIT;

-- ----------------------------
-- Table structure for jhi_authority
-- ----------------------------
DROP TABLE IF EXISTS `jhi_authority`;
CREATE TABLE `jhi_authority` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of jhi_authority
-- ----------------------------
BEGIN;
INSERT INTO `jhi_authority` VALUES ('ROLE_ADMIN');
INSERT INTO `jhi_authority` VALUES ('ROLE_USER');
COMMIT;

-- ----------------------------
-- Table structure for jhi_user
-- ----------------------------
DROP TABLE IF EXISTS `jhi_user`;
CREATE TABLE `jhi_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `activated` bit(1) NOT NULL,
  `lang_key` varchar(10) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NULL,
  `reset_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_user_login` (`login`),
  UNIQUE KEY `ux_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of jhi_user
-- ----------------------------
BEGIN;
INSERT INTO `jhi_user` VALUES (1, 'admin', '$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC', 'Administrator', 'Administrator', 'admin@localhost', '', b'1', 'en', NULL, NULL, 'system', NULL, NULL, 'system', NULL);
INSERT INTO `jhi_user` VALUES (2, 'user', '$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K', 'User', 'User', 'user@localhost', '', b'1', 'en', NULL, NULL, 'system', NULL, NULL, 'system', NULL);
COMMIT;

-- ----------------------------
-- Table structure for jhi_user_authority
-- ----------------------------
DROP TABLE IF EXISTS `jhi_user_authority`;
CREATE TABLE `jhi_user_authority` (
  `user_id` bigint NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `fk_authority_name` (`authority_name`),
  CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of jhi_user_authority
-- ----------------------------
BEGIN;
INSERT INTO `jhi_user_authority` VALUES (1, 'ROLE_ADMIN');
INSERT INTO `jhi_user_authority` VALUES (1, 'ROLE_USER');
INSERT INTO `jhi_user_authority` VALUES (2, 'ROLE_USER');
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` datetime(6),
  `payment_id` bigint DEFAULT NULL,
  `state_id` bigint DEFAULT NULL,
  `shipment_id` bigint DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_orders__payment_id` (`payment_id`),
  UNIQUE KEY `ux_orders__state_id` (`state_id`),
  UNIQUE KEY `ux_orders__shipment_id` (`shipment_id`),
  KEY `fk_orders__customer_id` (`customer_id`),
  CONSTRAINT `fk_orders__customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `fk_orders__payment_id` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`),
  CONSTRAINT `fk_orders__shipment_id` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`),
  CONSTRAINT `fk_orders__state_id` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
INSERT INTO `orders` VALUES (1, '2021-05-04 15:18:02.000000', 1, 2, 3, 2);
INSERT INTO `orders` VALUES (2, '2021-05-04 01:51:33.000000', NULL, NULL, NULL, NULL);
INSERT INTO `orders` VALUES (3, '2021-05-04 16:47:41.000000', NULL, NULL, NULL, NULL);
INSERT INTO `orders` VALUES (4, '2021-05-04 00:24:37.000000', NULL, NULL, NULL, NULL);
INSERT INTO `orders` VALUES (5, '2021-05-04 19:15:16.000000', NULL, NULL, NULL, NULL);
INSERT INTO `orders` VALUES (6, '2021-05-04 20:48:06.000000', NULL, NULL, NULL, NULL);
INSERT INTO `orders` VALUES (7, '2021-05-04 01:07:03.000000', NULL, NULL, NULL, NULL);
INSERT INTO `orders` VALUES (8, '2021-05-04 12:50:46.000000', NULL, NULL, NULL, NULL);
INSERT INTO `orders` VALUES (9, '2021-05-04 08:05:21.000000', NULL, NULL, NULL, NULL);
INSERT INTO `orders` VALUES (10, '2021-05-04 03:58:47.000000', NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The Employee entity.';

-- ----------------------------
-- Records of payment
-- ----------------------------
BEGIN;
INSERT INTO `payment` VALUES (1, 'COD');
INSERT INTO `payment` VALUES (2, 'BANK');
INSERT INTO `payment` VALUES (3, 'VISA');
INSERT INTO `payment` VALUES (4, 'Wooden');
INSERT INTO `payment` VALUES (5, 'wireless Buckinghamshire');
INSERT INTO `payment` VALUES (6, 'Tools implementation product');
INSERT INTO `payment` VALUES (7, 'matrix');
INSERT INTO `payment` VALUES (8, 'Automotive digital');
INSERT INTO `payment` VALUES (9, 'moratorium');
INSERT INTO `payment` VALUES (10, 'Keyboard');
COMMIT;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `cart_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (1, 'Steel', 31485, 98311);
INSERT INTO `product` VALUES (2, 'quantify monetize Consultant', 34790, 81149);
INSERT INTO `product` VALUES (3, 'Computer Legacy deposit', 46955, 86953);
INSERT INTO `product` VALUES (4, 'actuating deposit', 44573, 6255);
INSERT INTO `product` VALUES (5, 'Metal', 83023, 40879);
INSERT INTO `product` VALUES (6, 'Michigan throughput Union', 82822, 27988);
INSERT INTO `product` VALUES (7, 'withdrawal green', 70316, 51217);
INSERT INTO `product` VALUES (8, 'intranet', 16516, 29161);
INSERT INTO `product` VALUES (9, 'Small digital Oklahoma', 37638, 20520);
INSERT INTO `product` VALUES (10, 'Security', 94963, 80588);
COMMIT;

-- ----------------------------
-- Table structure for product_order
-- ----------------------------
DROP TABLE IF EXISTS `product_order`;
CREATE TABLE `product_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` bigint DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_order__order_id` (`order_id`),
  KEY `fk_product_order__product_id` (`product_id`),
  CONSTRAINT `fk_product_order__order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `fk_product_order__product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of product_order
-- ----------------------------
BEGIN;
INSERT INTO `product_order` VALUES (1, 34384, 1, 1);
INSERT INTO `product_order` VALUES (2, 7124, NULL, NULL);
INSERT INTO `product_order` VALUES (3, 11446, NULL, NULL);
INSERT INTO `product_order` VALUES (4, 1494, NULL, NULL);
INSERT INTO `product_order` VALUES (5, 18716, NULL, NULL);
INSERT INTO `product_order` VALUES (6, 94428, NULL, NULL);
INSERT INTO `product_order` VALUES (7, 57858, NULL, NULL);
INSERT INTO `product_order` VALUES (8, 19246, NULL, NULL);
INSERT INTO `product_order` VALUES (9, 75399, NULL, NULL);
INSERT INTO `product_order` VALUES (10, 64871, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for shipment
-- ----------------------------
DROP TABLE IF EXISTS `shipment`;
CREATE TABLE `shipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_shipment__customer_id` (`customer_id`),
  CONSTRAINT `fk_shipment__customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='not an ignored comment';

-- ----------------------------
-- Records of shipment
-- ----------------------------
BEGIN;
INSERT INTO `shipment` VALUES (1, 'Mouse Villages', 'Granville Points', 'Pfannerstillbury', '46134', 2);
INSERT INTO `shipment` VALUES (2, 'Representative Plastic', 'Lemuel Pines', 'Jacquesfort', '40275-1614', NULL);
INSERT INTO `shipment` VALUES (3, 'Terrace orange Programmable', 'Cleveland View', 'Rustyview', '54103-1800', NULL);
INSERT INTO `shipment` VALUES (4, 'experiences multi-tasking Tasty', 'Kling Village', 'Eagan', '13507', NULL);
INSERT INTO `shipment` VALUES (5, 'Avon', 'Powlowski Crossing', 'Okunevaborough', '17072', NULL);
INSERT INTO `shipment` VALUES (6, 'withdrawal coherent Frozen', 'Kobe Spurs', 'El Paso', '31747-0709', NULL);
INSERT INTO `shipment` VALUES (7, 'content-based', 'Lottie Junctions', 'Priceberg', '77149-3387', NULL);
INSERT INTO `shipment` VALUES (8, 'Account program', 'Shaniya Locks', 'Roobport', '23901', NULL);
INSERT INTO `shipment` VALUES (9, 'Optimization synthesizing Orchestrator', 'Diego Valley', 'Baileybury', '64055', NULL);
INSERT INTO `shipment` VALUES (10, 'Rustic override', 'Kyleigh Squares', 'New Leomouth', '79011', NULL);
COMMIT;

-- ----------------------------
-- Table structure for state
-- ----------------------------
DROP TABLE IF EXISTS `state`;
CREATE TABLE `state` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `tax_rate` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of state
-- ----------------------------
BEGIN;
INSERT INTO `state` VALUES (1, 'salmon', 86960);
INSERT INTO `state` VALUES (2, 'Bedfordshire Salad', 22038);
INSERT INTO `state` VALUES (3, 'withdrawal', 62021);
INSERT INTO `state` VALUES (4, 'Buckinghamshire', 14674);
INSERT INTO `state` VALUES (5, 'Awesome multi-byte Account', 82400);
INSERT INTO `state` VALUES (6, 'payment', 93614);
INSERT INTO `state` VALUES (7, 'copying salmon', 63246);
INSERT INTO `state` VALUES (8, 'Infrastructure Awesome compressing', 80355);
INSERT INTO `state` VALUES (9, 'withdrawal', 24601);
INSERT INTO `state` VALUES (10, 'Chicken', 30734);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
