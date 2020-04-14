import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class Chat extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: auth().currentUser,
            chat: [],
            content: '',
            readError: null,
            writeError: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({ content: event.target.value });
    }

    async handleSubmit(event){
        event.preventDefault();
        this.setState({ writeError: null});

        try{
            await db.ref("chat").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid:this.state.user.uid
            });
            this.setState({ content: '' });
        }
        catch(error){
            this.setState({ writeError: error.message});
        }
    }

    async componentDidMount(){
        this.setState({ readError: null});
        try {
            db.ref("chat").on("value", snapshot => {
                let chat = [];
                snapshot.forEach((snap) => {
                    chat.push(snap.val());
                });
                this.setState({ chat });
            });
        }
        catch(error){
            this.setState({ readError: error.message});
        }
    }
    

    render(){
        return (
            <div>
                <div className="chat">
                    {this.state.chat.map(chat => {
                        return <p key={chat.timestamp}>{chat.content}</p>
                    })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.content}></input>
                    {this.state.error ? <p>{this.state.writeError}</p> : null}
                    <button type="submit">Send</button>
                </form>
                <div>
                    Logged in as: <strong>{this.state.user.email}</strong>
                </div>
            </div>
        );
    }
}