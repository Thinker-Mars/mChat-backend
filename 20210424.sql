/*
 Navicat Premium Data Transfer

 Source Server         : mChat
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : 47.92.70.250:3306
 Source Schema         : mchat

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 24/04/2021 15:20:07
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
-- Table structure for relation
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation`  (
  `UserId` int(10) NOT NULL COMMENT '好友ID',
  `FriendId` int(10) NOT NULL COMMENT '朋友ID',
  PRIMARY KEY (`UserId`, `FriendId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
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

SET FOREIGN_KEY_CHECKS = 1;
