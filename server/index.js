const Express = require('express');
const app = Express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is online at port ${port}.`);
});