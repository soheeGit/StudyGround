const React = require('react');

function Error(props) {
    return (
        <html>
            <head>
                <title>Error</title>
            </head>
            <body>
                <h1>{props.message}</h1>
                <pre>{props.error.stack}</pre>
            </body>
        </html>
    );
}

module.exports = Error;
