const fs = require("fs");

class GenerateDecelartions {
  async createTablesName(connectionfilePath) {
    const presql = require(`${process.cwd()}/${connectionfilePath}`);
    const PrepareStmt = `SELECT TABLE_NAME FROM information_schema.tables
    WHERE table_schema = '${presql.connection.config.database}'`;
    const tables = await presql.buildQuery({ query: PrepareStmt });

    const TablesArray = tables.map((table) => table.TABLE_NAME);
    const TableDeclartionData = `"${TablesArray.join(`" | "`)}"`;
    const tablesDeclartionFile = `export type DatabaseTables = [${TableDeclartionData}]`;
    fs.writeFileSync(`${currentPath}/../tables.js`, tablesDeclartionFile);

    let i = 0;
    while (i < TablesArray.length) {
      const columns = await presql.buildQuery({
        query: `SELECT COLUMN_NAME,COLUMN_TYPE,COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${TablesArray[i]}'`,
      });
      const ColumnsArray = columns.map((column) => column.COLUMN_NAME);
      const ColumnDeclartionData = `"${ColumnsArray.join(`" | "`)}"`;
      let SelectData = `export type ${TablesArray[i]} = [${ColumnDeclartionData}] \n`;

      fs.writeFileSync(`${currentPath}/../select.js`, SelectData, {
        flag: "a",
      });
      i++;
    }
  }
}
module.exports = new GenerateDecelartions();
