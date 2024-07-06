const express = require('express');

const mainRoutes = require("./routes/main.routes");
const getLocalIPs = require('./util/getLocalIPs');

const app = express();
const PORT = 9000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(mainRoutes);

// Bind to 0.0.0.0 to make the server accessible on the local network
app.listen(PORT, '0.0.0.0', () => {
    const localIPs = getLocalIPs();
    console.log(`Server is running at the following addresses:`);
    localIPs.forEach(ip => {
        console.log(`http://${ip}:${PORT}`);
    });
    console.log(`You can also access the server locally at http://localhost:${PORT}`);
});
