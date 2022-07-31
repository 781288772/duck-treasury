/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : nestjs2

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 27/07/2022 20:50:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户ID',
  `account_name` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户账号',
  `real_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '真实姓名',
  `passwd` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `passwd_salt` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码盐',
  `mobile` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '手机号码',
  `role` tinyint(4) NOT NULL DEFAULT 3 COMMENT '用户角色：0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户（只能查看）',
  `user_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '状态：0-失效|1-有效|2-删除',
  `create_by` smallint(6) NOT NULL COMMENT '创建人ID',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` smallint(6) NOT NULL DEFAULT 0 COMMENT '修改人ID',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `idx_m`(`mobile`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('af90b441-50fa-41bd-a8d6-b495466bed42', 'admin', 'admin', 'oS5Z2JbN2MbeUd1IksPKNA==', '5+cs', '18105492458', 2, 1, 0, '2022-07-05 14:29:27', 0, '2022-07-05 14:31:44');

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章标题',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章内容',
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '作者',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '状态 1 已发布 0 未发布',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (3, '者约学被步', 'elit ad', 'af90b441-50fa-41bd-a8d6-b495466bed42', '0', '2022-07-11 10:49:08', '2022-07-11 10:49:08');
INSERT INTO `article` VALUES (2, '证情展感写所', 'ut deserunt', 'af90b441-50fa-41bd-a8d6-b495466bed42', '0', '2022-07-08 16:24:28', '2022-07-08 16:24:28');
INSERT INTO `article` VALUES (4, '因土关王', 'quis mollit velit reprehenderit amet', 'af90b441-50fa-41bd-a8d6-b495466bed42', '0', '2022-07-11 10:49:14', '2022-07-11 10:49:14');
INSERT INTO `article` VALUES (5, '取专林', 'magna quis do ex', 'af90b441-50fa-41bd-a8d6-b495466bed42', '0', '2022-07-11 10:49:17', '2022-07-11 10:49:17');
INSERT INTO `article` VALUES (6, '角政京', 'laborum veniam quis', 'af90b441-50fa-41bd-a8d6-b495466bed42', '0', '2022-07-11 10:49:19', '2022-07-11 10:49:19');
INSERT INTO `article` VALUES (7, '查你制律', 'dolor Duis', 'af90b441-50fa-41bd-a8d6-b495466bed42', '0', '2022-07-11 10:49:22', '2022-07-11 10:49:22');

-- ----------------------------
-- Table structure for commodity
-- ----------------------------
DROP TABLE IF EXISTS `commodity`;
CREATE TABLE `commodity`  (
  `ccolumn_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品id',
  `commodity_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `commodity_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品描述',
  `market_price` bigint(255) NULL DEFAULT NULL COMMENT '现价',
  `sale_money` bigint(255) NULL DEFAULT NULL COMMENT '折扣价',
  `c_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片',
  PRIMARY KEY (`ccolumn_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commodity
-- ----------------------------
INSERT INTO `commodity` VALUES ('ef547e89-bc51-4ad9-ab0d-edf6063626a0', '商品1', '这是一个商品', 100, 10, 'admin', '2022-07-05 14:55:52', '2022-07-05 14:55:52', NULL);

-- ----------------------------
-- Table structure for gold
-- ----------------------------
DROP TABLE IF EXISTS `gold`;
CREATE TABLE `gold`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `weight` double NULL DEFAULT NULL COMMENT '重量',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '类型',
  `unit_price` bigint(10) NULL DEFAULT NULL COMMENT '单价',
  `price` bigint(10) NULL DEFAULT NULL COMMENT '总价',
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gold
-- ----------------------------
INSERT INTO `gold` VALUES (1, '有关革', 95, ' culpa dolor labore magna', 30, 2850, '/static/1658916401798-wallhaven-lmkgry.jpg', '2022-07-12 10:09:47', '2022-07-27 18:06:47', 'af90b441-50fa-41bd-a8d6-b495466bed42', '年如保火包写取展动而数大为这过合。老照品可需花时民积向教清。重除个可式江走许选说张只他集离查第发。例不更根派给之求音再前律派的。难市王引置容六儿林记式三制原。力着只是素天其清支别说出率解。');
INSERT INTO `gold` VALUES (2, '济军号品着', 18, ' nostrud fugiat', 100, 1800, '/static/1658905300731-car.png', '2022-07-12 14:50:57', '2022-07-27 15:01:45', 'af90b441-50fa-41bd-a8d6-b495466bed42', '出此节年流积书难类边公取明设点。正部把大满确张实出华动军。千才名头业位或文分天八权装。转务打确技温写查可约与物斗已应团石。');
INSERT INTO `gold` VALUES (5, '123123', 12312312, ' 耳环', 123123, 1515928790376, '/static/1658905272973-icon.png', '2022-07-25 23:02:33', '2022-07-27 15:01:22', 'af90b441-50fa-41bd-a8d6-b495466bed42', '');
INSERT INTO `gold` VALUES (6, '去它义准被期', 21, ' in ea reprehenderit commodo Ut', 88, 1848, '/static/1658907277592-wallhaven-2kvjdy.jpg', '2022-07-25 23:03:51', '2022-07-27 15:34:56', 'af90b441-50fa-41bd-a8d6-b495466bed42', '知月满叫图织金三党步白律适光表题。清江值中化装位流联约般带回气山决层。于全领合次一基给花效点更只八今眼影。油身五今领并与千种火定多成状。从空准市例究化大持活具便算。上积定义北型道部确得北南。数完强书石加但半局人行想。');
INSERT INTO `gold` VALUES (12, '去它义准被期', 11, ' in ea reprehenderit commodo Ut', 11, 121, '', '2022-07-26 09:40:41', '2022-07-27 17:14:49', 'af90b441-50fa-41bd-a8d6-b495466bed42', '知月满叫图织金三党步白律适光表题。清江值中化装位流联约般带回气山决层。于全领合次一基给花效点更只八今眼影。油身五今领并与千种火定多成状。从空准市例究化大持活具便算。上积定义北型道部确得北南。数完强书石加但半局人行想。');

SET FOREIGN_KEY_CHECKS = 1;
