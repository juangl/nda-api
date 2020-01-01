const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const debug = require('debug')('db');

function dbClient(){

    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    }).promise();

    async function query(query){
      try{
        return (await connection.query(query))[0];
      } catch (e){
        return new Error(e instanceof Error ? e.message : JSON.stringify(e));
      }
    }

  return {
    user: {
      async getRoleId(type){
        return (await connection.query(`SELECT id as roleId FROM roles WHERE name="${type}"`))[0][0].roleId;
      },
      async register({email, password, firstName, lastName, phoneNumber, roleId}){
        return await connection.query(`
        INSERT INTO users
        (email, password, firstName, lastName, phoneNumber, roleId)
        VALUES
        ("${email}", "${password}", "${firstName}", "${lastName}", "${phoneNumber}", ${roleId});`);
      },
      async login(email, password){
        try{
          const user = (await connection.query(`SELECT id as userId, password FROM users WHERE email="${email}"`))[0][0];
          if (await bcrypt.compare(password, user.password)){
            return {
              success: true,
              payload: {
                token: jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7})
              }
            }
          } else {
            return {
              success: false,
              payload: {
                message: 'Wrong password'
              }
            }
          }
        } catch(e){
          return {
            success: false,
            payload: {
              message: (e instanceof Error) ? e.message : e
            }
          }
        }
      },
      async getUser(userId){
        const mainUser = (await connection.query(`
        SELECT a.id, a.email, a.firstName, a.lastName, a.phoneNumber, b.name as role FROM
          (SELECT * FROM users
          WHERE id=${userId}) a
        LEFT JOIN roles b ON
        a.roleId=b.id
      `))[0][0];
        return mainUser;
      },
      async getPermissions(userId){
        const roleId = (await connection.query(`
          SELECT roleId FROM users WHERE id=${userId}
        `))[0][0].roleId;
        return (await connection.query(`
          SELECT * FROM
            (SELECT * FROM rolespermissions WHERE roleId=${roleId}) a
          LEFT JOIN permissions b ON a.permissionId=b.id;
        `))[0].map(each => each.permission);
      }
    },
    store: {
      async getStores(category){
        let categoryId;
        let baseQuery = `SELECT * FROM stores`;
        if (category){
          const result = (await connection.query(`SELECT id FROM categories WHERE category = "${category}"`))[0];
          if (result.length) categoryId = result[0].id;
        }

        if (categoryId){
          baseQuery += ` WHERE categoryId = ${categoryId}`;
        }

        const finalQuery = `
        SELECT *, a.id as id FROM
          (${baseQuery}) a

        LEFT JOIN

          (SELECT
            entityId,
            AVG(stars) as rating,
            COUNT(stars) as whoRated,
            id
          FROM ratings
          WHERE
            entityType = "store") b
          ON a.id = b.entityId
        `

        const stores = (await connection.query(finalQuery))[0];

        for(each in stores){
          stores[each].images = (await connection.query(`
            SELECT
              url
            FROM images
            WHERE
              entityType = "store" AND
              entityId = ${stores[each].id}
          `))[0];
        }

        return stores;
      },
      async getStore(storeId, userId){
        let result = (await connection.query(`

        SELECT * FROM 
        (SELECT * FROM stores WHERE id = ${storeId}) a

        JOIN

        (SELECT a.avg as rating, a.count as whoRated, b.userRatings FROM
          (SELECT
            AVG(stars) as avg,
            COUNT(stars) as count
          FROM ratings
          WHERE
            entityType = "store" AND
            entityId = "${storeId}") a

        JOIN

        (SELECT
          COUNT(*) as userRatings
        FROM ratings
        WHERE
          entityType = "store" AND
          entityId = ${storeId} AND
          userId = ${userId}) b) b
        `))[0];
        if(!result.length){
          // Send an error
          return result;
        }
        result = result[0];

        const images = (await connection.query(`
        SELECT
          url
        FROM images
        WHERE
          entityType = "store" AND
          entityId = ${storeId}
        `))[0].map(({ url }) => url);

        let products = (await connection.query(`
        SELECT
          id,
          name,
          availability,
          maxQuantity
        FROM products
        WHERE
          storeId = ${storeId}
        `))[0];

        for(each in products){
          products[each].images = (await connection.query(`
            SELECT
              url
            FROM images
            WHERE
              entityType = "product" AND
              entityId = ${products[each].id}
          `))[0];

          Object.assign(products[each], (await connection.query(`
          SELECT * FROM
            (SELECT
              AVG(stars) as rating,
              COUNT(stars) as whoRated
            FROM ratings
            WHERE
              entityType = "product" AND
              entityId = ${products[each].id}) a
            
            JOIN

            (SELECT
              COUNT(*) as userRatings
            FROM ratings
            WHERE
              entityType = "product" AND
              entityId = ${userId}) b
          `))[0][0])

          products[each].ratedByUser = !!products[each].userRatings;
          delete products[each].userRatings;
        }

        result.images = images;
        result.products = products;
        result.ratedByUser = !!result.userRatings;
        delete result.userRatings;
        return result;
      },
      async verifyProperty(storeId, userId){
        return !!(await connection.query(`SELECT COUNT(*) as count FROM stores WHERE id = ${storeId} AND ownerId = ${userId}`))[0][0].count;
      },
      async createStore({name, category, saying, address, ownerId}){
        return await query(`
          INSERT INTO stores(
            name,
            category,
            saying,
            address,
            ownerId
          )
          VALUES(
            "${name}",
            "${category}",
            "${saying}",
            "${address}",
            ${ownerId}
          );
        `);
      }
    },
    async patch(tableName, resourceId, sanitized){
      let queriedFields = '';
      for(each in sanitized){
        const isString = typeof each === 'string';
        queriedFields += ` ${each} = ${isString ? '"' : ''}${sanitized[each]}${isString ? '"' : ''},`
      }
      queriedFields = queriedFields.substring(0, queriedFields.length - 1);
      debug(`Patching ${tableName} with`, queriedFields);
      return !!(await connection.query(`UPDATE ${tableName} SET${queriedFields} WHERE id = ${resourceId}`))[0].affectedRows;
    }
  }


}

module.exports = dbClient();