"use strict";
exports.__esModule = true;
require("@nivinjoseph/n-ext");
var n_web_1 = require("@nivinjoseph/n-web");
var n_config_1 = require("@nivinjoseph/n-config");
var n_log_1 = require("@nivinjoseph/n-log");
var n_defensive_1 = require("@nivinjoseph/n-defensive");
var index_controller_1 = require("./controllers/index-controller");
var logger = new n_log_1.ConsoleLogger(n_log_1.LogDateTimeZone.est);
var Installer = /** @class */ (function () {
    function Installer() {
    }
    Installer.prototype.install = function (registry) {
        (0, n_defensive_1.given)(registry, "registry").ensureHasValue().ensureIsObject();
        registry
            .registerInstance("Logger", logger);
    };
    return Installer;
}());
var server = new n_web_1.WebApp(Number.parseInt(n_config_1.ConfigurationManager.getConfig("PORT")), null, null, logger);
server
    .enableWebPackDevMiddleware()
    .useInstaller(new Installer())
    .registerStaticFilePath("src/client/dist", true)
    .registerControllers(index_controller_1.IndexController);
server.bootstrap();
