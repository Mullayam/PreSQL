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
// import { ConnectionOptions } from "./src/interface/config";
const ClientService_1 = require("./src/ClientService");
const utils_1 = __importDefault(require("./src/utils"));
class PreSqlClient extends ClientService_1.ClientService {
    constructor(con) {
        super(con);
    }
    buildQuery(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query, role } = values;
            return yield utils_1.default.DatabaseEntity(this.connection, query);
        });
    }
    // push a backup of the database
    pushSchema(SchemaSQLFile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!SchemaSQLFile) {
                throw new Error("SQL File is not available");
            }
            return yield utils_1.default.DatabaseEntity(this.connection, SchemaSQLFile);
        });
    }
    // create a backup of the database
    pullSchema() {
        let password = "";
        const path = require("path");
        const FullPath = path.resolve("presql/temporary.sql");
        const mysqldump = require("mysqldump");
        if (this.connectionOptions.pre_password === "") {
        }
        else {
            password = `${this.connectionOptions.pre_database}`;
        }
        mysqldump({
            connection: {
                host: "localhost",
                user: `${this.connectionOptions.pre_user}`,
                password: `${password}`,
                database: `${this.connectionOptions.pre_database}`,
            },
            dumpToFile: `${FullPath}`,
        });
    }
    playWithSchema(schema, SchemaSQLFile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (schema.type === "push") {
                if (!SchemaSQLFile) {
                    throw new Error("Please specify a schema file in (*.sql) format");
                }
                const result = yield this.pushSchema(SchemaSQLFile);
                if (result.length > 0) {
                    return result.length + " Records were inserted";
                }
                return "Already pushed";
            }
            if (schema.type === "pull") {
                console.log(" 'pull' right now this feature is not supported, comming in future versions");
                // await this.pullSchema();
            }
        });
    }
}
exports.PreSqlClient = PreSqlClient;
//# sourceMappingURL=index.js.map