"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 8080;
app_1.default.listen(port, function () {
    console.log('server listening on port ' + port);
});
//# sourceMappingURL=server.js.map