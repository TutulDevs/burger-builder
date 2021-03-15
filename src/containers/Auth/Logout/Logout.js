import React, { Component } from 'react' ;
import { connect } from 'react-redux' ;
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom' ;

class Logout extends Component {

    // first thing to do after rendering this page
    componentDidMount () {
        this.props.onLogout() ;
    }

    // Just redirect to the main page. SIMPLE.
    render() {
        return <Redirect to='/' />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()) ,
    }
}

export default connect(null, mapDispatchToProps)(Logout) ;