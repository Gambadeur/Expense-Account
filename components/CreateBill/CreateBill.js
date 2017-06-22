import React, {Component, PropTypes} from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import CreateBillForm from './CreateBillForm'


export class CreateBill extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            bill : {
                type: "",
                montant: 0,
                date: "",
                commentaires: "",
                validation: false
            }
        }
    }


    handleOpen = () => {
        this.setState({
            open : true
        })
}

    handleClose = () => {
        this.setState({
            open : false
        })
    }



    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return(

                <div className={ 'row center-xs middle-xs col-xs-12' } style={{ height: 80 }}>
                    <div className="col-xs-2">
                        <div className="box">
                        <FloatingActionButton

                            onTouchTap={this.handleOpen}
                        >
                            <ContentAdd />
                        </FloatingActionButton
                           >
                        <Dialog
                            title="Ajouter une note de frais"
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                            actions={actions}
                        >
                            <CreateBillForm onSubmit={this.props.submit}/>
                        </Dialog>
                        </div>
                    </div>
                </div>

        )
    }
}

CreateBill.propTypes = {

}

export default CreateBill