import React, {Component, PropTypes} from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux';
import {
    Checkbox,
    RadioButtonGroup,
    SelectField,
    TextField,
    Toggle,
    DatePicker,
} from 'redux-form-material-ui'



class CreateBillForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false
        }
    }

    handleClose = () => {
        alert('1 note de frais ajoutée')
        this.setState({
            open: false
        })
    }


    render() {


        const { handleSubmit, submitting} = this.props

        return(
            <form onSubmit={handleSubmit}>
                <div>
                    <Field
                        name="type"
                        component={SelectField}
                        hintText="type"
                        floatingLabelText="Type"
                        >
                        <MenuItem value="internet" primaryText="Internet" />
                        <MenuItem value="mobile" primaryText="Mobile" />
                        <MenuItem value="indemnités km" primaryText="Indemnités Km" />
                    </Field>
                </div>
                <div>
                    <Field
                        name="montant"
                        component={TextField}
                        hintText="montant"
                        floatingLabelText="Montant"
                        ref="montant"
                        withRef
                    />
                </div>
                <div>
                    <Field
                        name="date"
                        component={DatePicker}
                        format={null}
                        hintText="Quand?"
                    />
                </div>
                <div>
                    <Field
                        name="commentaires"
                        component={TextField}
                        hintText="commentaires"
                        floatingLabelText="Commentaires"
                        ref="commentaires"
                        withRef
                    />
                </div>
                <div>
                    <Field
                        name="file"
                        component="input"
                        type="file"
                        accept="pdf"
                        multiple={false}
                    />
                </div>
                <RaisedButton
                    type="submit"
                    label="Valider"
                    primary={true}
                    onTouchTap={this.handleClose}
                    style={{marginTop: 20}}
                    disabled={submitting}
                />
            </form>


        
        )
    }   
}


CreateBillForm.propTypes = {
    bill: PropTypes.object.isRequired
}

const selector = formValueSelector('createBill')

CreateBillForm = connect(state => ({
    bill: selector(state, 'type', 'montant', 'date', 'commentaires')
}))(CreateBillForm)

CreateBillForm = reduxForm({
    form: 'createBill'
})(CreateBillForm)

export default CreateBillForm