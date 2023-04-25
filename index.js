"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreSqlClient = void 0;
const mysql = require("mysql2");
const utils_1 = __importDefault(require("./src/utils"));
class PreSqlClient {
    constructor(con) {
        this.connectionOptions = {
            pre_user: "",
            pre_password: "",
            pre_database: "",
            pre_host: "",
            pre_port: 3306,
            pre_timezone: "",
            pre_stringifyObjects: false,
        };
        this.connection = mysql.createConnection({
            // uncomment below for local deployement
            port: 3306,
            database: `${this.connectionOptions.pre_database}`,
            host: this.connectionOptions.pre_host,
            user: `${this.connectionOptions.pre_user}`,
            password: this.connectionOptions.pre_password,
            rowsAsArray: false,
        });
        this.connectionOptions.pre_user = con.pre_user;
        this.connectionOptions.pre_password = con.pre_password;
        this.connectionOptions.pre_host = con.pre_host;
        this.connectionOptions.pre_port = con.pre_port;
        this.connectionOptions.pre_database = con.pre_database;
        this.connectionOptions.pre_timezone = con.pre_timezone;
        this.connectionOptions.pre_stringifyObjects = con.pre_stringifyObjects;
        this.showConnErrors = con.showConnErrors;
        this.invokeConnection();
    }
    invokeConnection() {
        try {
            const errorShow = this.showConnErrors;
            this.connection.connect(function (err) {
                if (err)
                    return console.log(err);
            });
            if (errorShow) {
                console.log("Database Connected Successfully");
            }
        }
        catch (error) {
            if (error) {
                console.log(error);
            }
        }
    }
    SortBy(statement) {
        if (Object.keys(statement).length > 0) {
            const sortBy = Object.keys(statement);
            const Check = sortBy.map((v) => {
                if (statement[v]) {
                    return v;
                }
            });
            return ` ORDER BY ${Check.join(",")}`;
        }
        else {
            return "";
        }
    }
    // test method to invoke every type of method :, inser,update,delele
    InsertStatement(method, tableName) {
        return `${method} ${tableName}`;
    }
    //select statement of fields
    SelectStatement(select, tableName) {
        let SelectColumns;
        let columnfields = [];
        if (typeof select !== "string" && select.length > 0) {
            select.forEach((element) => {
                columnfields.push(element);
            });
            return `SELECT ${this.FixTableColumns(columnfields.toString())} FROM ${tableName}`;
        }
        else {
            SelectColumns = "*";
        }
        return `SELECT ${SelectColumns} FROM ${tableName}`;
    }
    //insert statement
    AddQueryStatement(values) {
        let insertingValues = [];
        try {
            if (values.length > 1) {
                const columnNames = Object.keys(values[0]);
                const columnValues = Object.values(values);
                columnValues.forEach((element) => {
                    const rt = Object.values(element);
                    const r = "('" + rt.join("','") + "')";
                    insertingValues.push(`${r}`);
                    return insertingValues;
                });
                const ValueString = " VALUES " + insertingValues.join(",") + "";
                const WholeString = " (" +
                    this.FixTableColumns(columnNames.toString()) +
                    ")" +
                    ValueString;
                return WholeString;
            }
            else {
                const DataValues = this.BindValues(values);
                const columnNames = Object.keys(values);
                const Marks = DataValues.map((clmName) => {
                    return clmName;
                });
                const ValueString = " VALUES ('" + Marks.join("','") + "')";
                const WholeString = " (" +
                    this.FixTableColumns(columnNames.toString()) +
                    ")" +
                    ValueString;
                return WholeString;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    // get values form object
    BindValues(values) {
        try {
            const columnValues = Object.values(values);
            return columnValues;
        }
        catch (error) {
            console.log(error);
        }
    }
    // adjust database column table name
    FixTableColumns(str) {
        return str.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());
    }
    // where or logical operator statment builds
    WhereQuery(where) {
        let whereArray = [];
        //AND Logical where
        if (where.hasOwnProperty("AND")) {
            const [tableColumnValue] = Object.values(where);
            const tableColumns = Object.entries(tableColumnValue);
            tableColumns.forEach((keys, i) => {
                const [columnName, value] = keys;
                return whereArray.push(`'${this.FixTableColumns(columnName)}' = '${value}'`);
            });
            return ` WHERE ${whereArray.join(" AND ")}`;
        } //OR Logical where
        else if (where.hasOwnProperty("OR")) {
            const [tableColumnValue] = Object.values(where);
            const tableColumns = Object.entries(tableColumnValue);
            tableColumns.forEach((keys, i) => {
                const [columnName, value] = keys;
                return whereArray.push(`'${this.FixTableColumns(columnName)}' = '${value}'`);
            });
            return ` WHERE ${whereArray.join(" OR ")}`;
        }
        else {
            // simple id or single column passed
            if (typeof where === "string" || typeof where === "number") {
                return ` WHERE 'id' = '${where}'`;
            }
            else {
                // object passed here
                // if empty object passed
                if (typeof where === "object" && Object.keys(where).length === 0) {
                    return "";
                }
                const tableColumn = this.FixTableColumns(Object.keys(where).toString());
                const tableColumnValue = Object.values(where).toString();
                return ` WHERE '${tableColumn}' = '${tableColumnValue}'`;
            }
        }
    }
    // update query parameters
    UpdateQueryParameters(data) {
        let UpdateColumns = [];
        const ExtratedData = Object.entries(data);
        ExtratedData.map((data) => {
            const [field, value] = data;
            return UpdateColumns.push(`${this.FixTableColumns(field)} = '${value}'`);
        });
        return ` SET ${UpdateColumns}`;
    }
    // math functions
    PrepareMathFuncStatement(data, table) {
        let { column, type } = data;
        if (!column) {
            column = "*";
        }
        const statment = this.InsertStatement(`SELECT ${type.toUpperCase()}(${this.FixTableColumns(column)}) FROM`, table);
        return statment;
    }
    // insert One Query
    create(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, data } = values;
            const PrepareStmt = this.InsertStatement("INSERT INTO", this.FixTableColumns(table)) +
                this.AddQueryStatement(data);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // insert more than one  Queries
    createMany(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, data } = values;
            const PrepareStmt = this.InsertStatement("INSERT INTO", table) + this.AddQueryStatement(data);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // update one record
    updateOne(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, data, where } = values;
            if (!data) {
                return new Error("Data Field  must be specifiedm what data to be updated");
            }
            if (!where) {
                return new Error("Where Field must be specified");
            }
            const PrepareStmt = utils_1.default.joinString([
                this.InsertStatement("UPDATE", this.FixTableColumns(table)),
                this.UpdateQueryParameters(data),
                this.WhereQuery(where),
            ]);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // updates multiple records in a single query
    updateMany(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, data } = values;
            if (!data) {
                return new Error("Data Field  must be specifiedm what data to be updated");
            }
            const PrepareStmt = this.InsertStatement("UPDATE", table) + this.UpdateQueryParameters(data);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // deletes specific records
    destroy(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, where } = values;
            const PrepareStmt = utils_1.default.joinString([
                this.InsertStatement("DELETE FROM", this.FixTableColumns(table)),
                this.WhereQuery(where),
            ]);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // deletes multiple records in a single query
    destroyAll(values = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table } = values;
            const PrepareStmt = utils_1.default.joinString([
                this.InsertStatement("DELETE FROM ", this.FixTableColumns(table)),
            ]);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // select by id
    findById(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectOnlyFields = [];
            const { table: tableName, id, select, sortBy, } = values;
            if (!id) {
                return "Required Parameter id is missing.This can be only Number or String";
            }
            console.log(select);
            //check selecct values are passed or not
            if (select) {
                selectOnlyFields = Object.keys(select);
            }
            if (sortBy) {
                console.log(sortBy);
            }
            const PrepareStmt = utils_1.default.joinString([
                this.SelectStatement(selectOnlyFields, this.FixTableColumns(tableName)),
                this.WhereQuery(id),
            ]);
            // console.log(PrepareStmt);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // select any column that user passes
    findOne(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectOnlyFields = [];
            const { table: tableName, where, select } = values;
            if (!where) {
                return new Error("Please pass where/filter condition");
            }
            //check selecct values are passed or not
            if (select) {
                selectOnlyFields = Object.keys(select);
            }
            const PrepareStmt = utils_1.default.joinString([
                this.SelectStatement(selectOnlyFields, this.FixTableColumns(tableName)),
                this.WhereQuery(where),
            ]);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // get all columns
    findMany(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectOnlyFields = [];
            let WhereField = {};
            const { table: tableName, where, select } = values;
            //check selecct values are passed or not
            if (select) {
                selectOnlyFields = Object.keys(select);
            }
            if (where) {
                WhereField = where;
            }
            const PrepareStmt = utils_1.default.joinString([
                this.SelectStatement(selectOnlyFields, this.FixTableColumns(tableName)),
                this.WhereQuery(WhereField),
            ]);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    //  select any column that encountered first
    findFirst(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectOnlyFields = [];
            const { table: tableName, where, select } = values;
            if (!where) {
                return new Error("Please pass where/filter condition");
            }
            //check selecct values are passed or not
            if (select) {
                selectOnlyFields = Object.keys(select);
            }
            const PrepareStmt = utils_1.default.joinString([
                this.SelectStatement(selectOnlyFields, this.FixTableColumns(tableName)),
                this.WhereQuery(where) + " LIMIT 1",
            ]);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // get all tables with sorted data
    Byfilter() {
        return __awaiter(this, void 0, void 0, function* () {
            // return await Utils.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    // all math function goes here sum,max,min,avg,count
    Math(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectOnlyFields = [];
            let WhereField = {};
            let Sorting = {};
            const { table, set, where, select, sortBy } = values;
            if (!set) {
                return new Error("To use Math/Logical Operations , Please specify set property first,");
            }
            if (where) {
                WhereField = where;
                if (typeof where === "object" && Object.keys(where).length === 0) {
                    return new Error("Where field must be pass some value to statisfy condition");
                }
            }
            if (set) {
                if (typeof set === "object" && Object.keys(set).length === 0) {
                    return new Error("Set field must be have Math functions Like min,max,in,between,avg,count etc");
                }
            }
            if (select) {
                selectOnlyFields = Object.keys(select);
                if (selectOnlyFields.length === 0) {
                    return new Error("Select Field is passed,table columns must be specified");
                }
            }
            if (sortBy) {
                Sorting = sortBy;
                if (typeof Sorting === "object" && Object.keys(Sorting).length === 0) {
                    return new Error("if Sort field is passed, some value to be give, orderby id ,orderby name");
                }
            }
            if (set) {
                if (Object.keys(set).length > 2) {
                    return new Error("More than one MAth field cannot be passed ");
                }
            }
            const PrepareStmt = utils_1.default.joinString([
                this.PrepareMathFuncStatement(set, table),
                this.WhereQuery(WhereField),
            ]);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
    join(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectOnlyFields = [];
            let CustomeSortBy = {};
            let WhereField = {};
            let fromColumn = "id";
            let joinColumn = "id";
            const { from, joinWith, relation } = values;
            if (!from || !joinWith || !relation) {
                return new Error("One or more Defined properties is missing");
            }
            const { joinType, joinOn, select, where, sortBy } = relation;
            if (!joinType || !select) {
                return new Error("One or more Defined properties is missing");
            }
            if (select) {
                selectOnlyFields = Object.keys(select);
            }
            if (joinOn && Object.keys(joinOn).length === 0) {
                return new Error("within jointype an object must be specified with keys fromColumn and joinColumn");
            }
            else {
            }
            if (joinOn) {
                fromColumn = joinOn.fromColumn;
                joinColumn = joinOn.joinColumn;
            }
            if (sortBy) {
                CustomeSortBy = sortBy;
            }
            if (where) {
                WhereField = where;
            }
            const PrepareStmt = utils_1.default.joinString([
                this.SelectStatement(selectOnlyFields, from),
                " ",
                joinType.toUpperCase(),
                " JOIN ",
                joinWith,
                " ON ",
                `${from}.${fromColumn} = `,
                `${joinWith}.${joinColumn} `,
                this.WhereQuery(WhereField),
                this.SortBy(CustomeSortBy),
            ]);
            return yield utils_1.default.DatabaseEntity(this.connection, PrepareStmt);
        });
    }
}
exports.PreSqlClient = PreSqlClient;
//# sourceMappingURL=index.js.map