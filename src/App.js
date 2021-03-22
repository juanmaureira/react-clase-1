import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'; 
import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import HomePage from './homepage/homepage.component';



// ciclos de vida de un componente: montado, actualizado, desmontado
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsuscribeFromAuth = null;

  componentDidMount(){
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
      
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()  
              }
            });
            console.log(this.state);
        });
      
      }

      this.setState({ currentUser: userAuth });

    });
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  render(){
    return(
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
        </Switch> 
      </div>
    );
  }

}

export default App;
