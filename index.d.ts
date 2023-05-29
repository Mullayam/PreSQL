import { ConnectionOptions, QueryBuilder, Schema } from "./src/interface/config";
import { ClientService } from "./src/ClientService";
interface Connection {
}
export declare class PreSqlClient extends ClientService implements Connection {
    constructor(con: ConnectionOptions);
    buildQuery(values: QueryBuilder): Promise<any>;
    private pushSchema;
    private pullSchema;
    playWithSchema(schema: Schema, SchemaSQLFile?: any): Promise<string | undefined>;
}
export {};
//# sourceMappingURL=index.d.ts.map