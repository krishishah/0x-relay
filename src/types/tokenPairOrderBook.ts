import { SignedOrder } from '0x.js';

export interface TokenPairOrderBook {
    bids: SignedOrder[];
    asks: SignedOrder[];
}