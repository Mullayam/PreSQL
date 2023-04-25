import { ConnectionOptions, DatabaseEntityValues, MathFunctions, Relationship } from "./src/interface/config";
export declare class PreSqlClient {
    private connectionOptions;
    private showConnErrors;
    constructor(con: ConnectionOptions);
    private connection;
    private invokeConnection;
    private SortBy;
    private InsertStatement;
    private SelectStatement;
    private AddQueryStatement;
    private BindValues;
    private FixTableColumns;
    private WhereQuery;
    private UpdateQueryParameters;
    private PrepareMathFuncStatement;
    create(values: DatabaseEntityValues): Promise<any>;
    createMany(values: DatabaseEntityValues): Promise<any>;
    updateOne(values: Omit<DatabaseEntityValues, "sortBy" | "select">): Promise<any>;
    updateMany(values: Omit<DatabaseEntityValues, "sortBy" | "select">): Promise<any>;
    destroy(values: DatabaseEntityValues): Promise<any>;
    destroyAll(values?: object): Promise<any>;
    findById(values: Omit<DatabaseEntityValues, "data">): Promise<any>;
    findOne(values: Omit<DatabaseEntityValues, "data">): Promise<any>;
    findMany(values: Omit<DatabaseEntityValues, "data">): Promise<any>;
    findFirst(values: Omit<DatabaseEntityValues, "data">): Promise<any>;
    Byfilter(): Promise<void>;
    Math(values: MathFunctions): Promise<any>;
    join(values: Relationship): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map