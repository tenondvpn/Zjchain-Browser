import { Token, BP, Producer } from 'src/types';

export interface ChainStateInterface {
    token: Token;
    bpList: BP[];
    producers: Producer[];
    head_block_num: number;
    last_irreversible_block_num: number;
    head_block_producer: string;
    producerSchedule: string[];
    ram_price: string;

    // chainInfo
    time: number;
    all_zjc: number;
    all_address: number;
    all_contracts: number;
    all_transactions: number;
    qps: number;
    all_nodes: number;
    block_num:number;

}

export function state(): ChainStateInterface {
    return {
        head_block_num: 0,
        token: {
            symbol: '',
            precision: 0,
            amount: 0,
            contract: '',
        },
        bpList: [],
        producers: [],
        block_num: 0,
        last_irreversible_block_num: 0,
        head_block_producer: '',
        producerSchedule: [],
        ram_price: '0',

        all_address: 0,
        all_contracts: 0,
        all_nodes: 0,
        all_transactions: 0,
        all_zjc: 0,
        qps: 0,
        time: 0,
    };
}
