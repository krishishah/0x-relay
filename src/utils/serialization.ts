import { SignedOrder } from '0x.js/lib/src/types';
import { BigNumber } from 'bignumber.js';
import { ECSignature } from '0x.js';

export class SerializerUtils {

    public static SignedOrdertoJSON(signedOrder: SignedOrder): string {
        const signedOrderDict = {
            ecSignature: {
                r: signedOrder.ecSignature.r,
                s: signedOrder.ecSignature.s,
                v: signedOrder.ecSignature.v.toString()
            },
            maker: signedOrder.maker,
            taker: signedOrder.taker,
            makerFee: signedOrder.makerFee.toString(),
            takerFee: signedOrder.takerFee.toString(),
            makerTokenAmount: signedOrder.makerTokenAmount.toString(),
            takerTokenAmount: signedOrder.takerTokenAmount.toString(),
            makerTokenAddress: signedOrder.makerTokenAddress,
            takerTokenAddress: signedOrder.takerTokenAddress,
            salt: signedOrder.salt.toString(),
            exchangeContractAddress: signedOrder.exchangeContractAddress,
            feeRecipient: signedOrder.feeRecipient,
            expirationUnixTimestampSec: signedOrder.expirationUnixTimestampSec.toString()
        };

        return JSON.stringify(signedOrderDict);
    }

    private SignedOrderfromJSON(signedOrderString: string): SignedOrder {
        
        // tslint:disable-next-line:no-any
        let signedOrderObj: any = JSON.parse(signedOrderString);

        try {
            const ecSignature: ECSignature = {
                r: signedOrderObj.ECSignatureR,
                s: signedOrderObj.ECSignatureS,
                v: Number(signedOrderObj.ECSignatureV)
            };

            const signedOrder: SignedOrder = {
                ecSignature: ecSignature,
                maker: signedOrderObj.maker,
                taker: signedOrderObj.taker,
                makerFee: new BigNumber(signedOrderObj.makerFee),
                takerFee: new BigNumber(signedOrderObj.takerFee),
                makerTokenAmount: new BigNumber(signedOrderObj.makerTokenAmount),
                takerTokenAmount: new BigNumber(signedOrderObj.takerTokenAmount),
                makerTokenAddress: signedOrderObj.makerTokenAddress,
                takerTokenAddress: signedOrderObj.takerTokenAddress,
                salt: new BigNumber(signedOrderObj.salt),
                exchangeContractAddress: signedOrderObj.exchangeContractAddress,
                feeRecipient: signedOrderObj.feeRecipient,
                expirationUnixTimestampSec: new BigNumber(signedOrderObj.expirationUnixTimestampSec)
            };

            return signedOrder;

        } catch (e) {
            console.log(e);
        }
    }

}