import { Transaction } from 'src/types/zj_tpyes/Transaction';
import { AxiosRequestConfig } from 'axios';

export interface Block {
    shard_id: number;
    pool_index: number;
    height: number;
    prehash: string;
    hash: string;
    version: number;
    vss: number;
    elect_height: number;
    bitmap: string;
    timestamp: string;
    timeblock_height: number;
    bls_agg_sign_x: string;
    bls_agg_sign_y: string;
    commit_bitmap: string;
    tx_size: number;
    date: number;
    gas_used_sum: number;
    transactions: Transaction[];
}

export interface CommonFilter {
    page?: number; // the page variable sustitutes the skip
    skip?: number;
    limit?: number;
    account?: string;
    notified?: string;
    sort?: 'desc' | 'asc';
    after?: string;
    before?: string;
    extras?: { [key: string]: string };
    query?:string;
    isContracts?:boolean;
    to?:string;
}

export function applyDefaultFilter(filter: CommonFilter): AxiosRequestConfig {
    const {
        account = '',
        page = 1,
        limit = 10,
        notified = '',
        sort = 'desc',
        after = '',
        before = '',
        query = '',
        isContracts = false,
        to = '',
    } = filter;

    const aux = {
        page,
        ...query && { query },
        ...account && { from_field: account },
        ...limit && { limit },
        ...Math.max(0, page - 1) * limit && { skip: Math.max(0, page - 1) * limit },
        ...notified && { notified },
        ...sort && { sort },
        ...after && { after },
        ...before && { before },
        ...isContracts && { isContracts },
        ...filter.extras && {  ...filter.extras },
        ...to && { to },
    };

    return aux as AxiosRequestConfig;
}
