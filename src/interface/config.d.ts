import { DatabaseTables } from "./tables";
type QueryBuilderRole = "0x00042" | "0x00043" | "0x00044";
export type QueryBuilder = {
    query: string;
    role: QueryBuilderRole;
};
export type OrderByType = "ASC" | "DESC";
export type SortType = "BY ORDER" | "BY GROUP";
export type DataSortBy = {
    type?: SortType | "BY ORDER";
    field?: string[] | ["id"];
    orderType?: OrderByType;
    limit?: number;
};
export interface ConnectionOptions {
    pre_user: string;
    pre_password: string;
    pre_database: string;
    pre_host: string;
    pre_port?: number;
    pre_timezone?: string | "local";
    pre_stringifyObjects?: boolean;
    rowsAsArray?: boolean;
    showConnErrors?: boolean | undefined;
    resultLogs?: boolean | null;
    tableJoiner?: string | "_";
}
export interface DatabaseEntityValues {
    table: DatabaseTables;
    data: object;
    id?: string | number;
    where?: object | string | number;
    select?: object;
    sortBy?: DataSortBy;
}
export interface NewDatabaseEntityValues {
    where?: object | string | number;
    data: object;
    select?: object;
    sortBy?: DataSortBy;
}
export type Declaration = "sum" | "count" | "min" | "max" | "avg" | "like" | "in" | "between" | "alias";
export type Math = {
    column: string;
    type: Declaration;
    fixed?: number;
};
export interface MathFunctions {
    table: string;
    set: Math;
    where?: object;
    select?: object;
    sortBy?: DataSortBy;
}
type JoinType = "inner" | "left" | "right" | "self" | "full";
type JoinById = "id";
export type JoinOn = {
    fromColumn: string | JoinById;
    joinColumn: string | JoinById;
};
export type RelationshipFields = {
    joinType: JoinType;
    joinOn?: JoinOn;
    select?: object;
    where?: object;
    sortBy?: DataSortBy;
};
export type Relationship = {
    from: string;
    joinWith: string;
    relation: RelationshipFields;
};
export type Schema = {
    type: "push" | "pull";
};
export {};
//# sourceMappingURL=config.d.ts.map