# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: rhino.testdc.com (MySQL 5.5.37-0ubuntu0.12.04.1)
# Database: test_santander_123_mini
# Generation Time: 2014-06-16 08:56:17 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table accessories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `accessories`;

CREATE TABLE `accessories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `price` int(5) DEFAULT NULL,
  `keyrequired` int(1) DEFAULT NULL,
  `type` enum('key','accessory') DEFAULT 'accessory',
  `accessoryType` enum('hat','glasses','mouth','key') DEFAULT 'hat',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `accessories` WRITE;
/*!40000 ALTER TABLE `accessories` DISABLE KEYS */;

INSERT INTO `accessories` (`id`, `name`, `path`, `filename`, `price`, `keyrequired`, `type`, `accessoryType`)
VALUES
	(1,'Sun Glasses','/img/character/accessories/acc1.png','acc1',0,0,'accessory','glasses'),
	(2,'Moustache','/img/character/accessories/acc2.png','acc2',0,0,'accessory','mouth'),
	(3,'Bar Glasses','/img/character/accessories/acc3.png','acc3',0,0,'accessory','glasses'),
	(4,'Bunny Ears','/img/character/accessories/acc4.png','acc4',0,0,'accessory','hat'),
	(5,'Top Hat','/img/character/accessories/acc5.png','acc5',0,0,'accessory','hat'),
	(6,'Star Glasses','/img/character/accessories/acc6.png','acc6',4500,2,'accessory','glasses'),
	(7,'Crown','/img/character/accessories/acc7.png','acc7',20000,3,'accessory','hat'),
	(8,'Cowboy Hat','/img/character/accessories/acc8.png','acc8',3000,1,'accessory','hat'),
	(9,'Cat Ears','/img/character/accessories/acc9.png','acc9',3000,1,'accessory','hat'),
	(10,'Bow','/img/character/accessories/acc10.png','acc10',1500,1,'accessory','hat'),
	(11,'Panda','/img/character/accessories/acc11.png','acc11',10000,3,'accessory','hat'),
	(12,'Wizard','/img/character/accessories/acc12.png','acc12',4500,2,'accessory','hat'),
	(13,'Frog','/img/character/accessories/acc13.png','acc13',10000,3,'accessory','hat'),
	(14,'Pilot Hat','/img/character/accessories/acc14.png','acc14',6500,2,'accessory','hat'),
	(15,'Jester Hat','/img/character/accessories/acc15.png','acc15',6500,2,'accessory','hat'),
	(16,'Pirate Hat','/img/character/accessories/acc16.png','acc16',1500,1,'accessory','hat'),
	(17,'Key','/img/character/accessories/key_2.png','key_2',3500,1,'key','key'),
	(18,'Key','/img/character/accessories/key_3.png','key_3',7000,2,'key','key');

/*!40000 ALTER TABLE `accessories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table game_plays
# ------------------------------------------------------------

DROP TABLE IF EXISTS `game_plays`;

CREATE TABLE `game_plays` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `coinsearned` int(5) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `level` int(1) DEFAULT NULL,
  `finished` enum('0','1') CHARACTER SET latin1 DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table game_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `game_user`;

CREATE TABLE `game_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `coins` int(7) DEFAULT NULL,
  `totalearned` int(11) DEFAULT NULL,
  `totalspent` int(11) DEFAULT NULL,
  `level` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table user_accessories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_accessories`;

CREATE TABLE `user_accessories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `accessoryid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
