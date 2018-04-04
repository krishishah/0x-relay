import * as React from 'react';
import Welcome from '../../components/Welcome';
import Account from '../Account';
import Web3Actions from '../../components/Web3Actions';
import Faucet from '../../components/Faucet';
import { Dashboard } from '../../components/Sidebar/dashboard';
import InstallMetamask from '../../components/InstallMetamask';
import * as Web3 from 'web3';
import * as RPCSubprovider from 'web3-provider-engine/subproviders/rpc';
import { Divider, Container, Segment, Card, Step, Icon } from 'semantic-ui-react';
import { InjectedWeb3Subprovider } from '@0xproject/subproviders';
import { ZeroEx } from '0x.js';

const Web3ProviderEngine = require('web3-provider-engine');

// Kovan is a test network
// Please ensure you have Metamask installed
// and it is connected to the Kovan test network
const KOVAN_NETWORK_ID = 42;
const KOVAN_RPC = 'https://kovan.infura.io';

const TEST_RPC_NETWORK_ID = 50;
const TEST_RPC = 'http://localhost:8545';

const styles = {};

interface Props { }

export default class App extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    render() {
    // Detect if Web3 is found, if not, ask the user to install Metamask
    // tslint:disable-next-line:no-any
        if ((window as any).web3) {
            // Set up Web3 Provider Engine with a few helper Subproviders from 0x
            const providerEngine = new Web3ProviderEngine();
            providerEngine.addProvider(new InjectedWeb3Subprovider((window as any).web3.currentProvider));
            providerEngine.addProvider(new RPCSubprovider({ rpcUrl: KOVAN_RPC }));
            providerEngine.start();

            const web3 = new Web3(providerEngine);
            // Initialize 0x.js with the web3 current provider and provide it the network
            const zeroEx = new ZeroEx(web3.currentProvider, { networkId: KOVAN_NETWORK_ID });
            // Browse the individual files for more handy examples
            return (

                <div style={{ padding: '3em'}}>
                    <Dashboard/>
                    <Welcome />
                    
                    <Card raised={true} centered={true} style={{ padding: '2em', width: '800px' }}>
                        <Card.Content>
                            <Card.Header>
                                <Step.Group attached="top" widths={3} style={{ padding: '0em' }}>
                                    <Step active>
                                        <Icon name="pencil" />
                                        <Step.Content>
                                        <Step.Title>Allowances</Step.Title>
                                        <Step.Description>Set Allowances for tokens you'd like to trade</Step.Description>
                                        </Step.Content>
                                    </Step>
                                    <Step disabled>
                                        <Icon name="exchange" />
                                        <Step.Content>
                                        <Step.Title>Trade</Step.Title>
                                        <Step.Description>Exchange Tokens at a given rate</Step.Description>
                                        </Step.Content>
                                    </Step>
                                    <Step disabled>
                                        <Icon name="check" />
                                        <Step.Content>
                                        <Step.Title>Confirm Transaction</Step.Title>
                                        <Step.Description>Transaction Receipt</Step.Description>
                                        </Step.Content>
                                    </Step>
                                </Step.Group>
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Account web3={web3} zeroEx={zeroEx} />
                        </Card.Content>
                        <Card.Content>
                            <Faucet zeroEx={zeroEx} />
                        </Card.Content>
                        <Card.Content>
                            <Web3Actions web3={web3} />
                        </Card.Content>
                    </Card>
                </div>
            );
        } else {
            return <InstallMetamask />;
        }
    }
}