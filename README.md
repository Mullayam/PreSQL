# PreSQL
> Developer : `Mullayam`<br>
> Version : `1.0.0`

## _No More Query Statements_

PreSQL is an SQL-language based library containing pre-written code with shortend methods. Say "bye" to writing long query statements.

## Dependencies

PreSQL requires the following dependencies to be installed:

-   [Node.js](https://nodejs.org/) v16+
-   mysql2 - _to connect to MySQL database_

## Installation

Install the dependencies and devDependencies and start the server.
```sh
npm i presql
```
## Methods

### Crud Operations

- create() , createMany() 
- updateOne() , updateMany()
- destroy() , destroyAll()

### Logical (Math) Operations
- Math()
### Table Join / Relationship
- join()
 ### Depricated/Not Featured 
- In,Between,Alias,Distinct,OrderByGroup -- Adding in Future Versions
# Examples

 create a file `index.js`  use that code give below, to initiate DB Connection
``` js
const { PreSqlClient } = require("presql");
const presql = new PreSqlClient({
  pre_user: "root",
  pre_password: "",
  pre_host: "localhost",
  pre_database: "db_name",
  pre_port: 3306,
  showConnErrors: true, // this will show info that DB is connected or not , by default is false
  resultLogs: true, // this will enable to preview result in console log , by default is false
});

```
###  Test Method 
``` javascript
async function test() {
  const getData = await presql.findMany({ table: "products"
  });
   console.log(getData)
}
test();
```
 ###  Crud Operations - create()
 ``` javascript
async function test() {
  const getData = await presql.create({
    table: "users", // required parameter
    data: {
      firstName: "John",
      lastName: "Doe",
    },  //data is required parameter only single object
  });
  // if table and column uses any special character, please pass name in cammelCase e.g first_name to firstName
   console.log(getData)
}
test();
```
###  Crud Operations - createMany()
 ``` javascript
async function test() {
  const getData = await presql.createMany({
    table: "users", // required parameter
    data: [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "David",
      lastName: "Olis",
    },
    {
      firstName: "Rachna",
      lastName: "Singh",
    },
    ]  //data is required parameter, only single object
  });
  // if table and column uses any special character, please pass name in cammelCase e.g first_name to firstName
   console.log(getData)
}
test();
```
 ###  Crud Operations - updateOne()
 ``` javascript
async function test() {
  const getData = await presql.updateOne({
    table: "users", // required parameter
    data: {
      firstName: "John",
      lastName: "Doe",
    },  //data is required parameter only single object
    where:{
        id:1
    },// where field is optional, to update special row please pass this field
  });
  // if table and column uses any special character, please pass name in cammelCase e.g first_name to firstName
   console.log(getData)
}
test();
```
###  Crud Operations - updateMany()
 ``` javascript
async function test() {
  const getData = await presql.updateMany({
    table: "users", // required parameter
    data:  [
   {
     firstName: "John",
     lastName: "Doe",
   },
   {
     firstName: "David",
     lastName: "Olis",
   },
   {
     firstName: "Rachna",
     lastName: "Singh",
   },
   ] ,  //data is required parameter only single object
    where:{
        id:1
    },// where field is optional, to update special row please pass this field
  });
  // if table and column uses any special character, please pass name in cammelCase e.g first_name to firstName
   console.log(getData)
}
test();
```
 ###  Crud Operations - destroy()
 ``` javascript
async function test() {
  const getData = await presql.destroy({
    table: "users", // required parameter
    where:{
        id:1
    },// where field is must, 
  });
  // if table and column uses any special character, please pass name in cammelCase e.g first_name to firstName
   console.log(getData)
}
test();
```
 ###  Crud Operations - destroyAll()
 ``` javascript
async function test() {
  const getData = await presql.destroy({
    table: "users", // required parameter
    where:{
        id:1
    },// where field is optional, 
  });
  // if table and column uses any special character, please pass name in cammelCase e.g first_name to firstName
   console.log(getData)
   // this will delete all data form entire table and make it empty
}
test();
```
 ###  Crud Operations - findById()
 ``` javascript
async function test() {
  const getData = await presql.findById({
    table: "users", // required parameter
    table: "users",
    select: {
        firstName:true // use this syntax
    },
    id:1 // must be string | number | object id:productIid
    // no need to pass where filed, or where is optional
    // where :{ id : 1}
    sortBy: {
        id:true,// use this syntax
        asc:true
    },
  // if table and column uses any special character, please pass name in cammelCase e.g first_name to firstName
   console.log(getData)
   // this will delete all data form entire table and make it empty
}
test();
```

## License
This project is licensed under `MIT` License, please check the LICENSE file for more details.
