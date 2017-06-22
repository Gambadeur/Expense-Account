import React, {Component, PropTypes } from 'react'
const ReactDataGrid = require('react-data-grid')
import { connect } from 'react-redux'
import { addBillAction } from './../CreateBill/BillActions'

class DataTableNdf extends Component {

    constructor(props){
        super(props)
        this.state = {
            columns : [
                {key: 'mois', name:'Mois', resizable: true},
                {key: 'type', name:'Type', resizable: true},
                {key: 'montant', name:'Montant', resizable: true},
                {key: 'validée', name:'Validée', resizable: true},
                {key: 'datepaiement', name:'Date de paiement', resizable: true},
            ],
            rows: this.createRows()
        }
        this.createRows = this.createRows.bind(this)
        this.rowGetter = this.rowGetter.bind(this)
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this)

    }


    createRows() {
        let rows = []
        const bills = this.props.bills

        for (let i = 0; i < bills.length; i++){
            const options = {month: 'long'}
            rows.push({
                mois: bills[i].date.toLocaleDateString('fr-FR', options),
                type: bills[i].type,
                montant: bills[i].montant,
                validée: 'oui',
                datepaiement: 0
            })

        }

        this.rows = rows
    }

    rowGetter(i) {
        return this.rows[i]
    }

    handleGridRowsUpdated({fromRow, toRow, updated}) {
        let rows = this.state.rows.slice()

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i]
            let updateRow = React.addons.update(rowToUpdate, {$merge: updated})
            rows[i] = updateRow
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

DataTableNdf.propTypes = {
    bills: PropTypes.array.isRequired,
    addBillAction: PropTypes.func.isRequired
}

const actions = {
    addBillAction
}

const mapStateToProps = (state) => {
    return {
        bills : state.bills
    }
}


export default connect(mapStateToProps, actions)(DataTableNdf)