import TestConfig from "./config.test";
import DevConfig from "./config.dev";
import ProdConfig from "./config.prod";


// Switch configuration
let ACTIVE = 'dev';


let Config = {
  API: "http://localhost:8080/api",
};


switch (ACTIVE) {
  case 'dev':
    Object.assign(Config, DevConfig);
    DevConfig;
    break;

  case 'prod':
    Object.assign(Config, ProdConfig);
    break;

  case 'test':
    Object.assign(Config, TestConfig);
    break;

  default:
    break;
}

export default Config;