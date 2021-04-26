/*
 Navicat Premium Data Transfer

 Source Server         : mChat从1
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : 47.92.70.250:3306
 Source Schema         : mchat

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 26/04/2021 22:48:00
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
INSERT INTO `relation` VALUES (10000, 10008);

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `Uid` int(10) NOT NULL COMMENT '用户唯一ID',
  `Password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `GenderConstant` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '对应constant常量表的ID',
  `BirthDay` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '生日，如：02.14',
  `Avatar` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像，对应COS中的ID',
  `NickName` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户昵称',
  `Home` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户地区',
  `Motto` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户座右铭',
  PRIMARY KEY (`Uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (10000, '123456', '1', '02.14', '', 'Cone', '爱尔兰', '未知全貌，不予置评');
INSERT INTO `userinfo` VALUES (10001, 'qqwwee', '2', '03.12', NULL, '草莓', '四川成都', '吃好睡好身体好');
INSERT INTO `userinfo` VALUES (10002, 'asdewq', '1', '06.12', NULL, '长江', '中国', '略略略');
INSERT INTO `userinfo` VALUES (10003, 'tyhgfds', '2', '09.15', NULL, '皮皮虾', '北京', '你要请我吃饭？');
INSERT INTO `userinfo` VALUES (10004, 'poijuhy', '1', '08.12', NULL, '你的猫', '陕西西安', '最近忙');
INSERT INTO `userinfo` VALUES (10005, 'uhsiahi', '2', '01.19', NULL, '天降猛男', '香港', '没什么好说的');
INSERT INTO `userinfo` VALUES (10006, 'oifoisdoif', '1', '10.15', NULL, 'Lucky', '福建厦门', '来杯咖啡？');
INSERT INTO `userinfo` VALUES (10007, 'zxcdfs', '2', '12.21', NULL, 'play', '海南三亚', '好晒');
INSERT INTO `userinfo` VALUES (10008, 'ytasfsadhgbg', '1', '03.03', NULL, '小米', '北京', '永远相信，美好的事情即将发生');

SET FOREIGN_KEY_CHECKS = 1;
