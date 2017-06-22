import React, {Component, PropTypes } from 'react';
const ReactDataGrid = require('react-data-grid');
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
import { connect } from 'react-redux'
import { addBillAction } from './../CreateBill/BillActions'

class DataTableDashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            columns : [
                {key: 'type', name:'Type', filterable: true, resizable: true},
                {key: 'commentaires', name:'Commentaires', resizable: true},
                {key: 'date', name:'Date', filterable: true, resizable: true},
                {key: 'montant', name:'Montant', resizable: true}
            ],
            rows: this.createRows(this.props.bills),
            filters: {}
        }
        this.createRows = this.createRows.bind(this)
        this.rowGetter = this.rowGetter.bind(this)
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this)

    }


    componentWillReceiveProps(nextprops){
        this.createRows(nextprops.bills)
    }

    // UPDATE ROWS

    createRows() {
        let rows = [];

        const bills = this.props.bills

        for(let i = 0; i <bills.length; i++) {
            rows.push({
                type: bills[i].type,
                montant: bills[i].montant,
                commentaires: bills[i].commentaires,
                date: bills[i].date.toLocaleDateString()
            })
        }
        this.rows = rows
    }


    rowGetter(i) {
        return this.rows[i];
    }


    handleGridRowsUpdated({fromRow, toRow, updated}) {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updateRow = React.addons.update(rowToUpdate, {$merge: updated});
            rows[i] = updateRow;
        }
        this.setState({
            rows : rows
        })

    }


    render() {

        return  (
            <div>
                <ReactDataGrid
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.rows.length}
                    minHeight={400}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated}
                />
            </div>
        );
    }
}


DataTableDashboard.propTypes = {
    bills: PropTypes.array.isRequired,
    addBillAction: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
    return{
        bills: state.bills
    }
}

const actions = {
    addBillAction
}

export default connect(mapStateToProps, actions)(DataTableDashboard)