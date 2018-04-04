import * as React from 'react';
import { Container } from 'semantic-ui-react';

interface Props {}

export default ({  }: Props) => (
    <Container textAlign="center" style={{ padding: '2em' }}>
        <h1>
            <img src="https://github.com/0xProject/branding/raw/master/0x_Black_CMYK.png" width="200px" />
            <br />
            <br /> Welcome to the 0xygen!
        </h1>
    </Container>
);
