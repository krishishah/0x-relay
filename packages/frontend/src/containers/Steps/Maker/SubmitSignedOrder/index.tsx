import * as React from 'react';
import { SignedOrder, ZeroEx } from '0x.js';
import { Button, Form, ButtonProps, Segment } from 'semantic-ui-react';
import { UserActionMessageStatus } from '../../../../components/UserActionMessage';

interface Props {
    signedOrder: SignedOrder | undefined;
    setTransactionMessageState: (status: UserActionMessageStatus, message?: string) => void;
}

interface State {

}

export default class SubmitSignedOrder extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    
    onClickSubmit = async (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => { }

    render() {
        if (this.props.signedOrder !== undefined) {
            const orderHash = ZeroEx.getOrderHashHex(this.props.signedOrder);

            return(
                <Form style={{ height: '100%' }}>
                    <Form.Field>
                        <label>Signed Order:</label>
                        <Form.TextArea 
                            autoHeight 
                            style={{ fontFamily: 'monospace', whiteSpace: 'pre'}}
                        >
                            {JSON.stringify(this.props.signedOrder, null, 2)}
                        </Form.TextArea>
                    </Form.Field>
                    <Form.Field>
                        <label>Order Hash:</label>
                        <Form.TextArea autoHeight style={{ fontFamily: 'monospace', monospace: 'true'}}>
                            {orderHash}
                        </Form.TextArea>
                    </Form.Field>
                    <div style={{margin: '1em', display: 'flex', justifyContent: 'center'}}>
                        <Form.Button onClick={this.onClickSubmit}>
                            Submit Order
                        </Form.Button>
                    </div>
                </Form>
            );
        } else {
            return null;
        }
    }
}