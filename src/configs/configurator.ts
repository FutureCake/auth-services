import convict from "convict";
import { configDotenv } from "dotenv";
import default_config from "./defaults.config.json";

configDotenv();
const config = convict(default_config);
const env = config.get('env');

config.loadFile('./configs/' + env + '.config.json');
config.validate({allowed: 'strict'});

export default config;