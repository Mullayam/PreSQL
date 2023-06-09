#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;
const dirPath = path.join(__dirname, "../presql");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

function WriteFile(overRide, content) {
  const writeStream = fs.createWriteStream("presql/schema.sql", {
    flags: overRide,
  });
  writeStream.write("\n" + content);
  writeStream.end("\n");
  setTimeout(() => {
    console.log(`presql/schema.sql File is created successfully.`);
  }, 3000);
}
async function CreateSchemaSQLFromDatabase() {
  const {presql} = require("../connection");
  await presql.playWithSchema({ type: "pull" });
  const TemporaryFilePath = readFileSync(path.resolve("/temporary.sql"));
  await WriteFile("w", TemporaryFilePath);
}
function CreateSchema() {
  if (fs.existsSync(dirPath + "/schema.sql")) {
    console.error(
      `Error: ENOENT: such file or directory already exist, open ${dirPath}/schema.sql`
    );
    rl.question("File Already exist,Do you  wanna Overide? (Y/N)", (answer) => {
      if (answer.match(/^y(es)?$/i)) {
        console.log("OverWriting Files");
        WriteFile("w+", "OverWriting File");
      } else {
        console.log("Merging Files.....");
        console.log("Merging Files can cause format problem.");
        WriteFile("a+", "Merging");
      }

      rl.close();
    });
  } else {
    rl.question("Do you want to install SQL schema? (Y/N)", (answer) => {
      if (answer.match(/^y(es)?$/i)) {
        if (!fs.existsSync("presql/schema.sql")) {
          console.log(`Writing presql/schema.sql File...`);
          WriteFile("w", "writing fresh content");
        }
      }
      rl.close();
    });
  }
}
async function PushSchemaToDatabase() {
  if (fs.existsSync(dirPath + "/schema.sql")) {
    console.log("Starting migration");
    const SchemaSQLFile = fs.readFileSync(path.join("schema.sql")).toString();
    try {
      const presql = require("../connection");
      await presql.playWithSchema({ type: "push" }, SchemaSQLFile);

      await presql.pushSchema(SchemaSQLFile);
    } catch (error) {
      console.error(error);
      process.exit(-1);
    }
  } else {
    console.log("presql/schema.sql Files not Found");
    process.exit(-1);
  }
}
async function PullSchemaFromDatabase() {
  console.log("Fetching Tables From Database...");
  if (fs.existsSync(dirPath + "/schema.sql")) {
    rl.question(
      "schema.sql file exists,Overriding this file can delete all current data from this file, still want to continue? (Y/N)",
      async (answer) => {
        if (answer.match(/^y(es)?$/i)) {
          console.log("OverWriting Files");
          await CreateSchemaSQLFromDatabase(0);
          fs.rm(path.resolve("/temporary.sql"), { recursive: false }, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("OverWriting Files Completed");
            }
          });
        } else {
          console.log("Merging Files.....");
          console.log("Merging Files can cause format problem.");
          const {presql} = require("../connection");
          await presql.playWithSchema({ type: "pull" });
          let TemporaryFilePath = readFileSync(path.resolve("/temporary.sql"));
          await WriteFile("a+", TemporaryFilePath);
          fs.rm(TemporaryFilePath, { recursive: false }, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Merging Files Completed");
            }
          });
        }
        rl.close();
      }
    );
  } else {
    await CreateSchemaSQLFromDatabase();
    fs.rm(path.resolve("/temporary.sql"), { recursive: false }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("schema.sql is created");
      }
    });
  }
}
module.exports = { CreateSchema, PushSchemaToDatabase, PullSchemaFromDatabase };
