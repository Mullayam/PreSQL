# PreSQL
## _No More Query Statement_

PreSQL is a SQL-language based library contains pre-written code with shorten methods.Say Bye to write to more query statement.
## Tech
PreSQL uses a mysql2 of open source projects to work properly:
- [mysql2] -To Connect MySQL Database!
## Installation
PreSQL requires [Node.js](https://nodejs.org/) v16+ to run.
Install the dependencies and devDependencies and start the server.
```sh
npm i presql
```
 ## METHODS
### Crud Operations
- create() , createMany() 
- updateOne() , updateMany()
- destroy() , destroyAll()
### Logical (Math) Operations
-Math()
### Table Join / Relationship
-join()
 ### Depricated/Not Featured 
- In,Between,Alias,Distinct,OrderByGroup -- Adding in Future Versions
# Use By

`const { PreSqlClient } = require("./");\
const presql = new PreSqlClient({})`
## License

MIT
