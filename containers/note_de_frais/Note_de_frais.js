import React, {Component} from 'react';
import DataTableNdf from './../../components/DataTable/DataTableNdf'
import { Paper } from 'material-ui'
import AppBar from 'isotope-client/components/AppBar'

class NoteDeFrais extends Component {
    render(){



        return(
            <Paper style={{ backgroundColor: "#EBECEE", paddingTop: 100}} zDepth={2}>
                <div  className={ 'row' } >
                    <div className= { 'col-xs-12' }>
                        <AppBar style={{backgroundColor: "#468966"}}
                            title="Liste des notes de frais"
                        />
                    </div>
                </div>
                <div  className={ 'row' } >
                    <div className= { 'col-xs-offset-1 col-xs-10 col-xs-offset-1 center-xs' }>
                        <DataTableNdf />
                    </div>
                </div>
            </Paper>
        )
    }
}

export default NoteDeFrais