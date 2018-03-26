import * as http from 'http';
import { Service, Container } from 'typedi';
import {
    connection as WebSocketConnection,
    server as WebSocketServer,
    request as WebSocketRequest
} from 'websocket';
import { RestService } from '../services/restService';

@Service()
export class WebSocketHandler {

    /**
     * Initialize the Web Socket Handler
     */
    constructor(private wsServer: WebSocketServer, private restService: RestService) {
        this.init();
     }

    private handleRequest(request: WebSocketRequest) {
        let socketConnection: WebSocketConnection | undefined;

        socketConnection = request.accept();
        console.log('WS: Connection accepted');
        socketConnection.on('message', message => {
            if (message.type === 'utf8' && message.utf8Data !== undefined) {
                const parsedMessage = JSON.parse(message.utf8Data);
                console.log('WS: Received Message: ' + parsedMessage.type);
                const snapshotNeeded = parsedMessage.payload.snapshot;
                const baseTokenAddress = parsedMessage.payload.baseTokenAddress;
                const quoteTokenAddress = parsedMessage.payload.quoteTokenAddress;
                const requestId = parsedMessage.requestId;
                if (snapshotNeeded && socketConnection !== undefined) {
                    this.restService.getOrderBook(
                        baseTokenAddress, 
                        quoteTokenAddress
                    ).then(
                        orderbook => {
                            const returnMessage = {
                                type: 'snapshot',
                                channel: 'orderbook',
                                requestId,
                                payload: orderbook,
                            };
                            socketConnection.sendUTF(JSON.stringify(returnMessage));
                        }
                    );
                }
            }
        });

        socketConnection.on('close', (reasonCode, description) => {
            console.log('WS: Peer disconnected');
        });
    }

    /**
     * Take each handler, and attach to one of the Web Socket's
     * listeners.
     */
    private init() {
        this.wsServer.on('request', this.handleRequest.bind(this));
    }
}