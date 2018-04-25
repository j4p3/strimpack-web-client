import React from 'react';

import localConfig from './config.local.json'

const configState = localConfig;

const ConfigContext = React.createContext({ config: configState });

export { ConfigContext, configState };
