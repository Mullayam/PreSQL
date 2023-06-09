#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");

const fs = require("fs");
const {
  PushSchemaToDatabase,
  CreateSchema,
  PullSchemaFromDatabase,
} = require("./migrate");
const currentPath = path.resolve(__dirname);
const GenerateDecelartions = require("./generate");
const config = process.argv[2];
const filename = process.argv[3] || "connection";
const installPresql = "npm i presql";
const ConnectionFileData = `const { PreSqlClient } = require("presql");
const presql = new PreSqlClient({
  pre_user: "root", //db username
  pre_password: "", // dbpassword
  pre_host: "localhost", //db host
  pre_database: "db_name", //database name
  pre_port: 3306,
  showConnErrors: true, //optional field show connection log ,default false
  resultLogs: true, //optional field ,show results in console,default false
  tableJoiner: "_", // optional field, change only table joiner are different from _
  multipleStatements:false,
});

module.exports = { presql };
`;

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute  ${command}`, error);
    return false;
  }
  return true;
};
const checkedOut = runCommand(installPresql);
if (!checkedOut) process.exit(-1);
async function init() {
  if (config === "--auto-config") {
    console.log("Creating connection.js file...");
    fs.writeFile(`${filename}.js`, ConnectionFileData, function (err) {
      if (err) throw err;
      console.log(`Writing ${filename}.js File...`);
      setTimeout(async () => {
        console.log(
          `${filename}.js File is created successfully. Use this file to connect Database move it your desired directory`
        );
        if (!fs.existsSync("presql")) {
          await runCommand("mkdir presql");
        }
        CreateSchema();
      }, 3000);
    });
  } else if (config === "--write") {
    let connectionData = {};
    const readline = require("node:readline");
    const { stdin: input, stdout: output } = require("node:process");
    const rl = readline.createInterface({ input, output });
    rl.question("Database Name ? ", (answer) => {
      connectionData.pre_database = answer;
      rl.pause();
    });
  } else if (config === "-db-push") {
    console.log("Migrating Tables to Database...");
    await PushSchemaToDatabase();
  } else if (config === "-db-pull") {
    await PullSchemaFromDatabase();
  } else if (config.startsWith("generate")) {
    console.log("generating tables...");
    const filePath = process.argv[3] || "./config/connection.js";
    if (!fs.existsSync(filePath)) {
      console.warn(
        filePath +
          " db configuration files not found, please specify the path `npx presql generate path/to/your/file` within root directory"
      );
      process.exit(-1);
    }
    await GenerateDecelartions.createTablesName(filePath);
    const tscFilePath = `${currentPath}/../interface/tables.ts`;
    runCommand(`tsc  ${tscFilePath}`);
    console.log("Job Finished");
    process.exit(-1);
  } else {
    console.log("Invalid Command Please specify any  flag");
  }
}
init();
