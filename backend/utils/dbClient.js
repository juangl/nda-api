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

  return {
    user:{
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
    }
  }


}



module.exports = dbClient();


