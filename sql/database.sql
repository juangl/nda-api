DROP DATABASE IF EXISTS domi_app;

CREATE DATABASE domi_app;

USE domi_app;

BEGIN;

/*Roles and permissions*/
CREATE TABLE roles(
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
) ENGINE = INNODB;

CREATE TABLE permissions(
  id INTEGER NOT NULL AUTO_INCREMENT,
  permission VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
) ENGINE = INNODB;

CREATE TABLE rolesPermissions(
  id INTEGER NOT NULL AUTO_INCREMENT,
  roleId INTEGER NOT NULL,
  permissionId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (roleId) REFERENCES roles(id),
  FOREIGN KEY (permissionId) REFERENCES permissions(id)
) ENGINE = INNODB;

/*DEFAULT DUMPS*/
INSERT INTO
  roles (id, name)
VALUES
  (1, 'client'),
  (2, 'admin'),
  (3, 'partner');

INSERT INTO
  permissions (id, permission)
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
  (24, 'delete_store_ratings'),
  /*liked products*/
  (25, 'create_liked_products'),
  (26, 'read_liked_products'),
  (27, 'update_liked_products'),
  (28, 'delete_liked_products'),
  /*liked stores*/
  (29, 'create_liked_stores'),
  (30, 'read_liked_stores'),
  (31, 'update_liked_stores'),
  (32, 'delete_liked_stores'),
  /*products*/
  (33, 'create_products'),
  (34, 'read_products'),
  (35, 'update_products'),
  (36, 'delete_products');

INSERT INTO
  rolesPermissions (roleId, permissionId)
VALUES
  /*
   client permissions
   +create_orders
   +read_orders
   +update_orders
   +read_stores
   +read_product_images
   +create_product_ratings
   +read_product_ratings
   +update_product_ratings
   +read_store_images
   +create_store_ratings
   +read_store_ratings
   +update_store_ratings
   +create_liked_products
   +read_liked_products
   +update_liked_products
   +delete_liked_products
   +create_liked_stores
   +read_liked_stores
   +update_liked_stores
   +delete_liked_stores
   */
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 6),
  (1, 10),
  (1, 13),
  (1, 14),
  (1, 15),
  (1, 18),
  (1, 21),
  (1, 22),
  (1, 23),
  (1, 25),
  (1, 26),
  (1, 27),
  (1, 28),
  (1, 29),
  (1, 30),
  (1, 31),
  (1, 32),
  (1, 34),
  /*
   admin permissions
   +update_orders
   +create_stores
   +read_stores
   */
  (2, 3),
  (2, 5),
  (2, 6),
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
   +create_products
   +read_products
   +update_products
   +delete_products
   */
  (3, 2),
  (3, 3),
  (3, 4),
  (3, 9),
  (3, 10),
  (3, 11),
  (3, 12),
  (3, 14),
  (3, 17),
  (3, 18),
  (3, 19),
  (3, 20),
  (3, 22),
  (3, 33),
  (3, 34),
  (3, 35),
  (3, 36);

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
  FOREIGN KEY (roleId) REFERENCES roles(id),
  UNIQUE (email)
) ENGINE = INNODB;

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
) ENGINE = INNODB;

/*Ratings*/
CREATE TABLE ratings(
  id INTEGER NOT NULL AUTO_INCREMENT,
  entityType ENUM('store', 'product') NOT NULL,
  entityId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  stars INTEGER NOT NULL,
  CHECK (
    stars >= 1
    AND stars <= 5
  ),
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE = INNODB;

/*Invoices*/
CREATE TABLE invoices(
  id INTEGER NOT NULL AUTO_INCREMENT,
  charge FLOAT(2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'MXN',
  isCharged BOOLEAN NOT NULL DEFAULT false,
  paymentMethod ENUM('cash', 'cc') NOT NULL DEFAULT 'cash',
  PRIMARY KEY (id)
) ENGINE = INNODB;

/**
 * Orders
 *
 * status 0 = disabled order, just to show the user
 * status 1 = accepted order
 * status 2 = prepared/finished order
 * status 3 = picked order
 * status 4 = delivered order
 */
CREATE TABLE orders(
  id INTEGER NOT NULL AUTO_INCREMENT,
  userId INTEGER NOT NULL,
  address VARCHAR(255) NOT NULL,
  coords VARCHAR(255) NOT NULL,
  status INTEGER NOT NULL DEFAULT 0,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  finishedAt TIMESTAMP,
  deliveredAt TIMESTAMP,
  invoiceId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (invoiceId) REFERENCES invoices(id)
) ENGINE = INNODB;

/*Products*/
CREATE TABLE products(
  id INTEGER NOT NULL AUTO_INCREMENT,
  storeId INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  availability BOOLEAN NOT NULL DEFAULT true,
  maxQuantity INTEGER NOT NULL DEFAULT 5,
  price DECIMAL(6, 2) NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (storeId) REFERENCES stores(id)
) ENGINE = INNODB;

/*Categories*/
CREATE TABLE categories(
  id INTEGER NOT NULL AUTO_INCREMENT,
  category VARCHAR(32),
  PRIMARY KEY (id)
) ENGINE = INNODB;

/*Categories products*/
CREATE TABLE categoriesProducts(
  id INTEGER NOT NULL AUTO_INCREMENT,
  productId INTEGER NOT NULL,
  categoryId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES products(id),
  FOREIGN KEY (categoryId) REFERENCES categories(id)
) ENGINE = INNODB;

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
) ENGINE = INNODB;

/*Images*/
CREATE TABLE images(
  id INTEGER NOT NULL AUTO_INCREMENT,
  entityType VARCHAR(7) NOT NULL,
  entityId INTEGER NOT NULL,
  url TEXT NOT NULL,
  CHECK (entityType IN ('store', 'product')),
  PRIMARY KEY (id)
) ENGINE = INNODB;

CREATE TABLE settings(
  id INTEGER NOT NULL AUTO_INCREMENT,
  configuration VARCHAR(50) NOT NULL,
  value VARCHAR(50),
  PRIMARY KEY (id)
) ENGINE = INNODB;

CREATE TABLE allowedLocations(
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  areaCoordinates TEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE = INNODB;

CREATE TABLE likedItems(
  id INTEGER NOT NULL AUTO_INCREMENT,
  userId INTEGER NOT NULL,
  entityType ENUM('store', 'product') NOT NULl,
  entityId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE = INNODB;

COMMIT;