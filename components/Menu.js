import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router'

const style = {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
};

const MenuBill = () => (
    <Paper style={style}>
        <Menu>
            <MenuItem primaryText="Note de Frais" containerElement={<Link to='/notedefrais' />} />
            <MenuItem primaryText="Validation" containerElement={<Link to='/validation'/>} />
        </Menu>
    </Paper>
)


export default MenuBill