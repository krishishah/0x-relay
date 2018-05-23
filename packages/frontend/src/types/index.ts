import { Token, ECSignature, SignedOrder } from '0x.js';
import { BigNumber } from 'bignumber.js';

type Address = string;

export interface SignedOrderSchema {
    ecSignature: ECSignature;
    maker: string;
    taker: string;
    makerFee: string;
    takerFee: string;
    makerTokenAmount: string;
    takerTokenAmount: string;
    makerTokenAddress: string;
    takerTokenAddress: string;
    salt: string;
    exchangeContractAddress: string;
    feeRecipient: string;
    expirationUnixTimestampSec: string;
}

export interface TokenPairOrderbookSchema {
    bids: SignedOrderSchema[];
    asks: SignedOrderSchema[];
}

export interface OrderRelevantStateSchema {
    makerBalance: string;
    makerProxyAllowance: string;
    makerFeeBalance: string;
    makerFeeProxyAllowance: string;
    filledTakerTokenAmount: string;
    cancelledTakerTokenAmount: string;
    remainingFillableMakerTokenAmount: string;
    remainingFillableTakerTokenAmount: string;
}

export interface TokenPair {
    base: Token;
    quote: Token;
}

export interface EnrichedSignedOrder {
    signedOrder: SignedOrder;
    remainingMakerTokenAmount: BigNumber;
    remainingTakerTokenAmount: BigNumber;
}

export interface TokenPairOrderbook {
    bids: SignedOrder[];
    asks: SignedOrder[];
}

export interface EnrichedTokenPairOrderbook {
    bids: EnrichedSignedOrder[];
    asks: EnrichedSignedOrder[];
}

export interface WebSocketMessage<T extends OrderbookUpdate | Subscribe | OrderbookSnapshot> {
    type: string;
    channel: string;
    requestId: number;
    payload: T;
}

export type OrderbookUpdate = SignedOrderSchema;

export interface Subscribe {
    baseTokenAddress: string;
    quoteTokenAddress: string;
    snapshot: boolean;
    limit: number;
}

export type OrderbookSnapshot = TokenPairOrderbookSchema;

///////////////////////////////////////////// OFF CHAIN SCHEMA ///////////////////////////////////////////////////

export interface OffChainTokenSchema {
    address: string;
    balance: string;
}

export interface OffChainTokenBalancesSchema {
    userAddress: string;
    tokenBalances: OffChainTokenSchema[];
}

export interface OffChainTokenBalances {
    userAddress: string;
    tokenBalances: TokenBalances;
}

export type TokenBalances = Map<string, BigNumber>;