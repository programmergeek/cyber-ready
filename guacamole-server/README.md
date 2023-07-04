# Guacamole Server

This is a simple web socket server that replaces the server side java servelet using the `guacamole-lite` library.

## Setup

1. Run the following command, which will run a docker container called guac-api that will expose the port 4822 of the container and forward it to local host:

```bash
docker run --name gauc-api -p 127.0.0.1:4822:4822 -d guacamole/guacd
```

2. Create the guacamole-lite library:

    a. Create the project folder:

    ```bash
    npm init
    ```

    b. install the guacamole-lite library:

    ```bash
    npm install guacamole-lite
    ```

    c. Create a file called `index.js` and define the port of the websocket server, specify the port of the guacd container as well the cypher and encryption/descryption key and create the server.

    ```javascript

    const GuacamoleLite = require('guacamole-lite');

    const websocketOptions = {
        port: 8080 // we will accept connections to this port
    };

    const guacdOptions = {
        port: 4822 // port of guacd
    };

    const clientOptions = {
        crypt: {
            cypher: 'AES-256-CBC',
            key: 'MySuperSecretKeyForParamsToken12'
        }
    };

    const guacServer = new GuacamoleLite(websocketOptions, guacdOptions, clientOptions);

    // if there is an error, print the error instead of shutting down the server
    guacServer.on('error', (clientConnection, error) => {
        console.error(clientConnection, error);
    });
    ```

3. Start the server using the following command: `node index.js`

This server is expecting a token, which will be an encrypted version of guacamole settings. Make sure that you use the same key and cipher client-side to ensure that the server will correctly decrypt the token.
