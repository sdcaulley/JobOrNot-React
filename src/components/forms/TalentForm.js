import React, { Component, PropTypes } from 'react';
import SingleInput from './SingleInput';
import Nav from '../navbar/Nav';
import { connect } from 'react-redux';
import { sendSignUp } from '../../actions/auth-actions';
import UploadFiles from './UploadFiles';

class TalentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            skills: '',
            locations: ''
        };

        this.handleFormSignUp = this.handleFormSignUp.bind(this);
        // this.handleFormUpdate = this.handleFormUpdate.bind(this);
        this.handleFormClear = this.handleFormClear.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleFormSignUp(e) {
        e.preventDefault();
        console.log('props: ', this.props);
        const formPayload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            myResume: this.props.resume._id,
            skills: this.state.skills,
            locations: this.state.locations,
            role: 'talent'
        };

        this.props.signUp({ method: 'POST', path: '/signup', body: formPayload });
        this.handleFormClear(e);
    }

    // handleFormUpdate() {
    //     // update form logic goes here
    // }

    handleFormClear(e) {
        e.preventDefault();
        this.setState({
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            skills: '',
            locations: '',
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
 
    render() {
        return (
            <div>
                <Nav />
                <form onSubmit={this.handleFormSignUp}>
                    <h1>THIS FORM SIGNS UP TALENT</h1>
                    <SingleInput 
                        title={'First Name'}
                        name={'firstName'}
                        inputType={'text'}
                        content={this.state.firstName}
                        controlFunc={this.handleChange}
                        placeholder={'First Name'} />
                    <SingleInput 
                        title={'Last Name'}
                        name={'lastName'}
                        inputType={'text'}
                        content={this.state.lastName}
                        controlFunc={this.handleChange}
                        placeholder={'Last Name'} />
                    <SingleInput 
                        title={'User Name'}
                        name={'userName'}
                        inputType={'text'}
                        content={this.state.userName}
                        controlFunc={this.handleChange}
                        placeholder={'Select a User Name'} />
                    <SingleInput 
                        title={'Email Address'}
                        name={'email'}
                        inputType={'text'}
                        content={this.state.email}
                        controlFunc={this.handleChange}
                        placeholder={'Email Address'} />
                    <SingleInput 
                        title={'Password'}
                        name={'password'}
                        inputType={'password'}
                        content={this.state.password}
                        controlFunc={this.handleChange}
                        placeholder={'Select a Password'} />
                    <UploadFiles />
                    <SingleInput 
                        title={'Skills'}
                        name={'skills'}
                        inputType={'text'}
                        content={this.state.skills}
                        controlFunc={this.handleChange}
                        placeholder={'Top Skills'} />
                    <SingleInput 
                        title={'Locations'}
                        name={'locations'}
                        inputType={'text'}
                        content={this.state.locations}
                        controlFunc={this.handleChange}
                        placeholder={'Locations'} />
                    <button onClick={this.handleFormClear}>
                        Clear Form
                    </button>
                    <input 
                        type='submit'
                        value='submit'/>
                </form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    console.log('state: ', state);
    return {
        resume: state.uploads
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signUp: (options) => dispatch(sendSignUp(options))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentForm);

TalentForm.propTypes = {
    signUp: React.PropTypes.func,
    resume: React.PropTypes.object
};