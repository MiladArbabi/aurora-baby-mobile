import * as React from 'react';
global.React = React;

global.setImmediate = (cb) => setTimeout(cb, 0);
global.clearImmediate = (id) => clearTimeout(id);