import React from 'react';
import { Divider } from '@material-ui/core';

import Songlist from './Songlist';
import Menu from './Menu';

const Sider = () => (
    <div>
        <Menu />
        <Divider />
        <Songlist />
    </div>
);

export default Sider;
