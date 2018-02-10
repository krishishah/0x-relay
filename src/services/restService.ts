import { ZeroEx,  } from '0x.js';
import { SignedOrderRepository } from '../repositories/signedOrderRepository';
import { BigNumber } from '@0xproject/utils/lib/configured_bignumber';
import { SignedOrder } from '0x.js/lib/src/types';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { SchemaValidator } from '@0xproject/json-schemas';
import { SignedOrderEntity } from '../entities/signedOrderEntity';

@Service()
export class RestService {
  
    /**
     * Initialize the RestApiRouter
     */
    constructor(
        @OrmRepository(SignedOrderEntity)
        private orderRepository: SignedOrderRepository
    ) {}   

    public getTokenPairs() {
        return null;
    }
  
    public getOrderBook() {
        return null;
    }
  
    public getOrders() {
        return null;
    }
  
    public getOrder(orderHashHex: string): Promise<SignedOrder> {
        return this.orderRepository
                   .getSignedOrder(orderHashHex)
                   .catch(error => { throw error; });
    }

    public getFees() {
        return null;
    }
  
    public postOrder(order: SignedOrder) {
        return null;
    }

    public getTokens() {
        return null;
    }

  }