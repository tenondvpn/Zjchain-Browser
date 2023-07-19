import Telos from 'src/config/chains/telos';

import { ChainsConfig } from 'src/types/ChainsConfig';
import ChainBass from 'src/config/chains/chain-bass';

const chains: ChainsConfig = {
    mainnets: [new Telos('telos'), new ChainBass('chain-bass')],
    testnets: [],
};

export default chains;
