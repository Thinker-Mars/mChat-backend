/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : 127.0.0.1:3306
 Source Schema         : mchat

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 16/05/2021 23:44:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for constant
-- ----------------------------
DROP TABLE IF EXISTS `constant`;
CREATE TABLE `constant`  (
  `Id` int(4) NOT NULL AUTO_INCREMENT COMMENT '配置ID',
  `CName` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配置类型中文名',
  `Value` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配置的值',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of constant
-- ----------------------------
INSERT INTO `constant` VALUES (1, '性别男', '1');
INSERT INTO `constant` VALUES (2, '性别女', '2');

-- ----------------------------
-- Table structure for friendnote
-- ----------------------------
DROP TABLE IF EXISTS `friendnote`;
CREATE TABLE `friendnote`  (
  `UserId` int(10) NOT NULL COMMENT '用户ID',
  `FriendId` int(10) NOT NULL COMMENT '朋友ID',
  `NoteName` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '给朋友的备注',
  PRIMARY KEY (`UserId`, `FriendId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of friendnote
-- ----------------------------
INSERT INTO `friendnote` VALUES (10000, 10003, '测试备注');

-- ----------------------------
-- Table structure for relation
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation`  (
  `UserId` int(10) NOT NULL COMMENT '好友ID',
  `FriendId` int(10) NOT NULL COMMENT '朋友ID',
  PRIMARY KEY (`UserId`, `FriendId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of relation
-- ----------------------------
INSERT INTO `relation` VALUES (10000, 10001);
INSERT INTO `relation` VALUES (10000, 10002);
INSERT INTO `relation` VALUES (10000, 10003);
INSERT INTO `relation` VALUES (10000, 10004);
INSERT INTO `relation` VALUES (10000, 10005);
INSERT INTO `relation` VALUES (10000, 10006);
INSERT INTO `relation` VALUES (10000, 10007);
INSERT INTO `relation` VALUES (10001, 10002);
INSERT INTO `relation` VALUES (10003, 10002);
INSERT INTO `relation` VALUES (10007, 10006);
INSERT INTO `relation` VALUES (10008, 10000);

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `Uid` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户唯一ID',
  `Password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `GenderConstant` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '对应constant常量表的ID',
  `BirthDay` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '生日，如：02.14',
  `Avatar` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像，对应COS中的ID',
  `NickName` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户昵称',
  `Home` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户地区',
  `Motto` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户座右铭',
  `Salt` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '加密的盐',
  PRIMARY KEY (`Uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10019 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (10000, 'KATRgcZrrRJsVDya8DAM5Q==', '1', '02.14', 'avatar-10000.jpg', 'Cone', '爱尔兰', '未知全貌，不予置评', '1a5aeb0c-e5c0-d477-1210-63305c67b20e');
INSERT INTO `userinfo` VALUES (10001, 'BxoCJLLpcXlWzDjcuIOqkA==', '2', '03.12', 'avatar-10001.jpg', '草莓', '四川成都', '吃好睡好身体好', '2926d5b7-a968-2d94-367c-3f996c2a3027');
INSERT INTO `userinfo` VALUES (10002, 'WGKaqB+dNnY22iaGGJw3Cg==', '1', '06.12', 'avatar-10002.jpg', '长江', '中国', '略略略', '54574b4c-1755-b9f3-6fb5-877538dcd4ce');
INSERT INTO `userinfo` VALUES (10003, 'dIJ4qsYeHPpWnWh7MuMZRQ==', '2', '09.15', 'avatar-10003.jpg', '皮皮虾', '北京', '你要请我吃饭？', '5fa13bc7-34dd-faff-b6ef-30bb0638bec0');
INSERT INTO `userinfo` VALUES (10004, 'C0HbFdtC8AE6PaTYgc7sdg==', '1', '08.12', 'avatar-10004.jpg', '你的猫', '陕西西安', '最近忙', '378808ff-e1c9-eb50-761f-d0f1a23ad4d7');
INSERT INTO `userinfo` VALUES (10005, '2k5MfuOv9gUwE2Zx0dg8PA==', '2', '01.19', 'avatar-10005.jpg', '天降猛男', '香港', '没什么好说的', 'b32accf4-f350-6d8c-fa08-320891beb7d6');
INSERT INTO `userinfo` VALUES (10006, 'gA5otfp1D1sj0hGSmUK4ZQ==', '1', '10.15', 'avatar-10006.jpg', 'Lucky', '福建厦门', '来杯咖啡？', '6cca6b8d-35b5-1c4d-94e1-f2499cab9e27');
INSERT INTO `userinfo` VALUES (10007, 'dc4qA0Ptt+zvUFr0d17hOg==', '2', '12.21', 'avatar-10007.jpg', 'play', '海南三亚', '好晒', 'b37f70e5-003e-c0cb-e94e-36e3936b1b7a');

SET FOREIGN_KEY_CHECKS = 1;
