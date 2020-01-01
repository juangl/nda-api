CREATE DATABASE IF NOT EXISTS domi_app;

USE domi_app;

BEGIN;

/*Roles and permissions*/
CREATE TABLE roles(
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE permissions(
  id INTEGER NOT NULL AUTO_INCREMENT,
  permission VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE rolesPermissions(
  id INTEGER NOT NULL AUTO_INCREMENT,
  roleId INTEGER NOT NULL,
  permissionId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (roleId) REFERENCES roles(id),
  FOREIGN KEY (permissionId) REFERENCES permissions(id)
) ENGINE=INNODB;

  /*DEFAULT DUMPS*/
INSERT INTO roles
  (id, name)
VALUES
  (1, 'client'),
  (2, 'admin'),
  (3, 'partner');

INSERT INTO permissions
  (id, permission)
VALUES
/*orders*/
  (1, 'create_orders'),
  (2, 'read_orders'),
  (3, 'update_orders'),
  (4, 'delete_orders'),
/*stores*/
  (5, 'create_stores'),
  (6, 'read_stores'),
  (7, 'update_stores'),
  (8, 'delete_stores'),
/*product images*/
  (9, 'create_product_images'),
  (10, 'read_product_images'),
  (11, 'update_product_images'),
  (12, 'delete_product_images'),
/*product ratings*/
  (13, 'create_product_ratings'),
  (14, 'read_product_ratings'),
  (15, 'update_product_ratings'),
  (16, 'delete_product_ratings'),
/*store images*/
  (17, 'create_store_images'),
  (18, 'read_store_images'),
  (19, 'update_store_images'),
  (20, 'delete_store_images'),
/*store ratings*/
  (21, 'create_store_ratings'),
  (22, 'read_store_ratings'),
  (23, 'update_store_ratings'),
  (24, 'delete_store_ratings');

INSERT INTO rolesPermissions
  (id, roleId, permissionId)
VALUES
/*
  client permissions
    +create_orders
    +read_orders
    +read_stores
    +read_product_images
    +create_product_ratings
    +read_product_ratings
    +update_product_ratings
    +read_store_images
    +create_store_ratings
    +read_store_ratings
    +update_store_ratings
*/
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 6),
  (4, 1, 10),
  (5, 1, 13),
  (6, 1, 14),
  (7, 1, 15),
  (8, 1, 18),
  (9, 1, 21),
  (10, 1, 22),
  (11, 1, 23),
/*
  admin permissions
    +create_stores
    +read_stores
*/
  (12, 2, 5),
  (13, 2, 6),
/*
  partner permissions
    +read_orders
    +update_orders
    +delete_orders
    +create_product_images
    +read_product_images
    +update_product_images
    +delete_product_images
    +read_product_ratings
    +create_store_images
    +read_store_images
    +update_store_images
    +delete_store_images
    +read_store_ratings
*/
  (14, 3, 2),
  (15, 3, 3),
  (16, 3, 4),
  (17, 3, 9),
  (18, 3, 10),
  (19, 3, 11),
  (20, 3, 12),
  (21, 3, 14),
  (22, 3, 17),
  (23, 3, 18),
  (24, 3, 19),
  (25, 3, 20),
  (26, 3, 22);

/*Users*/
CREATE TABLE users(
  id INTEGER NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(25) NOT NULL,
  roleId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (roleId) REFERENCES roles(id)
) ENGINE=INNODB;

/*Stores*/
CREATE TABLE stores(
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(25) NOT NULL,
  saying VARCHAR(255) NOT NULL UNIQUE,
  address VARCHAR(255) NOT NULL UNIQUE,
  ownerId INTEGER NOT NULL,
  serviceStatus BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (id),
  FOREIGN KEY (ownerId) REFERENCES users(id)
) ENGINE=INNODB;

/*Ratings*/
CREATE TABLE ratings(
  id INTEGER NOT NULL AUTO_INCREMENT,
  entityType ENUM('store', 'product') NOT NULL,
  entityId  INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  stars INTEGER NOT NULL,
  CHECK (stars >= 1 AND stars <= 5),
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=INNODB;

/*Orders*/
CREATE TABLE orders(
  id INTEGER NOT NULL AUTO_INCREMENT,
  userId INTEGER NOT NULL,
  address VARCHAR(255) NOT NULL,
  coords VARCHAR(255) NOT NULL,
  status INTEGER NOT NULL DEFAULT 1,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  finishedAt TIMESTAMP,
  deliveredAt TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=INNODB;

/*Products*/
CREATE TABLE products(
  id INTEGER NOT NULL AUTO_INCREMENT,
  storeId INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  availability BOOLEAN NOT NULL DEFAULT true,
  maxQuantity INTEGER NOT NULL DEFAULT 5,
  PRIMARY KEY (id),
  FOREIGN KEY (storeId) REFERENCES stores(id)
) ENGINE=INNODB;

/*Orders Products*/
CREATE TABLE ordersProducts(
  id INTEGER NOT NULL AUTO_INCREMENT,
  orderId INTEGER NOT NULL,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  comment text,
  PRIMARY KEY (id),
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (productId) REFERENCES products(id)
) ENGINE=INNODB;

/*Images*/
CREATE TABLE images(
  id INTEGER NOT NULL AUTO_INCREMENT,
  entityType VARCHAR(7) NOT NULL,
  entityId  INTEGER NOT NULL,
  url TEXT NOT NULL,
  CHECK (entityType IN ('store', 'product')),
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE settings(
  id INTEGER NOT NULL AUTO_INCREMENT,
  configuration VARCHAR(50) NOT NULL,
  value VARCHAR(50),
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE allowedLocations(
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  areaCoordinates TEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

COMMIT;
