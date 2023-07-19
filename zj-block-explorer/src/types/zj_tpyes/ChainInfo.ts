

export interface ChainInfo {
    time: number;
    all_zjc: number;
    all_address: number;
    all_contracts: number;
    all_transactions: number;
    qps: number;
    all_nodes: number;
    block_num:number;
}

export interface ChainInfoResponse {
    status: number;
    cmd: string;
    value: ChainInfo; // 当前的链信息
    cmp: ChainInfo; // 上次的链信息
}
