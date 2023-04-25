export interface ConnectionOptions {
    pre_user: string;
    pre_password: string;
    pre_database: string;
    pre_host: string;
    pre_port?: number;
    pre_timezone?: string | "local";
    pre_stringifyObjects?: boolean;
    showConnErrors?: boolean | null;
    resultLogs?: boolean | null;
}
export interface DatabaseEntityValues {
    table: string;
    data: object;
    id?: string | number;
    where?: object | string | number;
    select?: object;
    sortBy?: object;
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
    sortBy?: object;
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
    sortBy?: object;
};
export type Relationship = {
    from: string;
    joinWith: string;
    relation: RelationshipFields;
};
export {};
//# sourceMappingURL=config.d.ts.map