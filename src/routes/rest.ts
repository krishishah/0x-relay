import { Router, Request, Response, NextFunction } from 'express';
import { BigNumber } from '@0xproject/utils/lib/configured_bignumber';
import { Service, Container } from 'typedi';
import { RestService } from '../services/restService';
import { SignedOrder } from '0x.js';
import { SerializerUtils } from '../utils/deserializer';

class V0RestApiRouter {
  router: Router;

  /**
   * Initialize the RestApiRouter
   */
  constructor(private restService: RestService) {
    this.router = Router();
    this.init();
  }

  /**
   * GET token pairs.
   */
  public getTokenPairs(req: Request, res: Response, next: NextFunction) {
    res.statusMessage = 'Success';
    res.statusCode = 201;
    res.send();
  }

  /**
   * GET orderbook.
   */
  public getOrderBook(req: Request, res: Response, next: NextFunction) {
    res.statusMessage = 'Success';
    res.statusCode = 201;
    res.send();
  }

  /**
   * GET orders.
   */
  public getOrders(req: Request, res: Response, next: NextFunction) {
    res.statusMessage = 'Success';
    res.statusCode = 201;
    res.send();
  }

  /**
   * GET order.
   */
  public getOrder(req: Request, res: Response, next: NextFunction) {
    const salt: BigNumber = new BigNumber(req.params.orderHash);
    const orderPromise: Promise<SignedOrder>  = this.restService.getOrder(salt);

    orderPromise.then(order => {
      res.setHeader('Content-Type', 'application/json');
      res.send(SerializerUtils.SignedOrdertoJSON(order));
    })
    .catch(error => {
      res.statusMessage = error.statusMessage;
      res.statusCode = 404;
      res.send();
    });
  }

  /**
   * GET fees.
   */
  public getFees(req: Request, res: Response, next: NextFunction) {
    res.statusMessage = 'Success';
    res.statusCode = 201;
    res.send();
  }

  /**
   * POST order.
   */
  public postOrder(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const possibleOrder = body as SignedOrder;

    res.statusMessage = 'Success';
    res.statusCode = 201;
    res.send();
  }

  /**
   * GET tokens.
   */
  public getTokens(req: Request, res: Response, next: NextFunction) {
    res.statusMessage = 'Success';
    res.statusCode = 201;
    res.send();
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  private init() {
    this.router.get('/token_pairs', this.getTokenPairs);
    this.router.get('/orderbook', this.getOrderBook);
    this.router.get('/orders', this.getOrder);
    this.router.get('/order/:orderHash', this.getOrder);
    this.router.get('/fees', this.getFees);
    this.router.post('/order', this.postOrder);
    this.router.get('/tokens', this.getTokens);
  }

}

// Create the v0RestApiRoutes, and export its configured Express.Router
export const v0RestApiRoutes = Container.get(V0RestApiRouter).router;
