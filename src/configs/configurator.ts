import convict from "convict";
import default_config from "./defaults.config.json";

const config = convict(default_config);
const env = config.get('env');

config.loadFile('./' + env + '.config.json');
config.validate({allowed: 'strict'});

export default config;