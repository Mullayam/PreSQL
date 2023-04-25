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
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
class Utils {
    joinString(strings) {
        return strings.join("");
    }
    DatabaseEntity(connection, PrepareStmt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = util.promisify(connection.query).bind(connection);
                let result = yield query(PrepareStmt);
                console.log();
                if (typeof result === "object") {
                    return result;
                }
                if (!result.length) {
                    result = [];
                }
                return result;
            }
            catch (error) {
                if (error.errno === 1064) {
                    error.info = "Please Check Your Method ";
                }
                return error;
            }
        });
    }
}
exports.default = new Utils();
//# sourceMappingURL=index.js.map