export interface AccountKeyValue {
    from_field: string;
    to: string;
    type: number;
    shard_id?: number;
    key: string;
    value: string;
}
