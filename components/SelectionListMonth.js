import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


export default class SelectionListMonth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 5};
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange}>

                <MenuItem value={1} key={1} primaryText={'Janvier'} />
                <MenuItem value={2} key={2} primaryText={'Février'} />
                <MenuItem value={3} key={3} primaryText={'Mars'} />
                <MenuItem value={4} key={4} primaryText={'Avril'} />
                <MenuItem value={5} key={5} primaryText={'Mai'} />
                <MenuItem value={6} key={6} primaryText={'Juin'} />
                <MenuItem value={7} key={7} primaryText={'Juillet'} />
                <MenuItem value={8} key={8} primaryText={'Août'} />
                <MenuItem value={9} key={9} primaryText={'Septembre'} />
                <MenuItem value={10} key={10} primaryText={'Octobre'} />
                <MenuItem value={11} key={11} primaryText={'Novembre'} />
                <MenuItem value={12} key={12} primaryText={'Décembre'} />
            </DropDownMenu>
        );
    }
}

