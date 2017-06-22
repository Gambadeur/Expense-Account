import React, {Component, PropTypes} from 'react'
import AppBar from 'isotope-client/components/AppBar'
import DataTableDashboard from '../../components/DataTable/DataTableDashboard'
import Paper from 'material-ui/Paper'
import CreateBill from '../../components/CreateBill/CreateBill'
import Menu from '../../components/Menu'
import cyan500 from 'material-ui/styles/colors'
import { connect } from 'react-redux';
import { addBillAction } from '../../components/CreateBill/BillActions'
import MenuMonth from '../../components/SelectionListMonth'


export class DashboardPage extends Component {
    constructor(props){
        super(props)
    }

    submit = (bill) => {
        this.props.addBillAction(bill)
    }

    render() {

        return(
            <Paper style={{ backgroundColor: "#EBECEE", paddingTop: 70}} zDepth={2}>
                <div  className={ 'row' } >
                    <div className={ 'col-xs-12' } >
                    <AppBar
                        style={{color: cyan500}}
                        title="Gestion des notes de frais"
                    />
                    </div>
                </div>
                <div className={ 'row center-xs' } >
                    <div className={ 'col-xs-3' } style={{marginTop: 30}}>
                        <Menu />
                    </div>
                    <div className={ 'col-xs-8' } >
                        <MenuMonth />
                        <DataTableDashboard bills={this.props.bills}/>
                        <CreateBill submit={this.submit}/>
                    </div>
                    <div className={ 'col-xs-1' } >
                    </div>
                </div>
                <div className={ 'row' } >
                    <div className={ 'col-xs-12' } >

                    </div>
                </div>
            </Paper>
        )
    }
}

DashboardPage.propTypes = {
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

export default connect(mapStateToProps, actions)(DashboardPage);