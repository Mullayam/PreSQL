import { ConnectionOptions } from "../interface/config";
declare class Utils {
    joinString(strings: any[]): string;
    CreateDatabaseConfigurationJsonFile(connectionOptions: ConnectionOptions): void;
    DatabaseEntity(connection: any, PrepareStmt: string): Promise<any>;
    WriteTables(tables: string): Promise<void>;
}
declare const _default: Utils;
export default _default;
//# sourceMappingURL=index.d.ts.map