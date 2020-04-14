import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from "../helpers/auth";
import { signin, signInWithGoogle } from "../helpers/auth";

export default class Signup extends Component {

    constructor(props){
        super(props);
        this.state ={
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    async handleSubmit(event){
        event.preventDefault();
        this.setState({ error: '' });
        try{
            await signup(this.state.email,this.state.password);
        }
        catch(error){
            this.setState({error: error.message});
        }
    }

    async googleSignIn() {
        try {
            await signInWithGoogle();
        }
        catch(error){
            this.setState({ error: error.message });
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up Now To 
                        <Link to="/">Simple-Chat</Link>
                    </h1>
                    <p> You have to fill in the following form.</p>
                    <div>
                        <input placeholder="Email" name="email" type="email" onChange={ this.handleChange } value = { this.state.email }></input>
                    </div>
                    <div>
                        <input placeholder="Password" name="password" type="password" onChange={ this.handleChange } value = { this.state.password }></input>
                    </div>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p>: null}
                        <button type="submit">Sign Up!</button>
                        <p>Or choose from this other options:</p>
                        <button onClick={ this.googleSignIn } type="button">
                            Sign up with Google
                        </button>
                    </div>
                    <hr></hr>
                    <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                </form>
            </div>
        )
    }
}
