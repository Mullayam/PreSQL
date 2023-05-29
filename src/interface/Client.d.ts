import { DatabaseEntityValues, MathFunctions, Relationship } from "./config";
export interface ClientServiceType {
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
    filter(): any;
    exist(values: Omit<DatabaseEntityValues, "data">, results?: Boolean): Promise<any>;
    Math(values: MathFunctions): Promise<any>;
    join(values: Relationship): Promise<any>;
}
//# sourceMappingURL=Client.d.ts.map