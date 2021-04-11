// the page we want to load while sign up/ in

import React, { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { Redirect } from 'react-router-dom';
import classes from './Auth.css' ;
import Input from '../../components/UI/Input/Input' ;
import Button from '../../components/UI/Button/Button' ;
import Spinner from '../../components/UI/Spinner/Spinner' ;
import * as actions from '../../store/actions/index' ;
import { updateObj, checkValidity } from "../../shared/utility";


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                  type: "email",
                  placeholder: "Email Address",
                },
                value: "",
                validation: {
                  required: true,
                  isEmail: true 
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                  type: "password",
                  placeholder: "Type Password",
                },
                value: "",
                validation: {
                  required: true,
                  minLength: 6
                },
                valid: false,
                touched: false,
            }
        },
        isSignUp: true 
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath() ; // default is '/'
        }
    }


    inputChangedHandler = (e, controlName) => {
        const updatedControls = updateObj(this.state.controls, {
            [controlName]: updateObj(this.state.controls[controlName], {
                value: e.target.value,
                valid: checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true,
            })
        })
            
        this.setState({controls: updatedControls}) 
    }

    submitHandler = e => {
        e.preventDefault() ;
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render() {

        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form = formElementArray.map( el => 
            <Input 
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(e) => this.inputChangedHandler(e, el.id)}
            />
        )

        // Spinner 
        if(this.props.loading) form = <Spinner /> ;

        // Error Message
        let errorMessage = null ;
        if(this.props.error) errorMessage = (
            <p>
                {this.props.error.message}
            </p>
        );

        // Redirect on login
        let authRedirect = null ;
        if(this.props.isAuthenticated) authRedirect = <Redirect to={this.props.authRedirectPath} />

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form} 
                    <Button btnType='Success'>
                        {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
                    </Button>
                </form>

                {errorMessage}

                <Button 
                    clicked={this.switchAuthModeHandler} btnType='Danger'
                >
                    SWITCH TO 
                    {this.state.isSignUp ? ' SIGN IN' : ' SIGN UP'}
                </Button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)) ,
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth) ;