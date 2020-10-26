import React from 'react';
import '../App.css';
import app from '../firebase';
import { ExportReactCSV } from '../ExportReactCSV'
export default class Home extends React.Component{

    constructor(props) {
        super(props);  
        this.state = {userslist : []}
        this.deleteProducts = this.deleteProducts.bind(this);
        this.state = { checkedBoxes: []	};
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        }
	
	deleteProducts = () => {
		if(window.confirm('Are you sure, want to delete the selected user?')) {
			app.database().ref("data").on("value", snapshot => {
            let method = 'POST';
			let body = JSON.stringify({'ids' : this.state.checkedBoxes});
			let headers = {'Content-Type' : 'application/json; charset=UTF-8'};
			}).then(response => {
					if(response.status === 200) {
                        document.getElementById('msg').innerHTML = '<span style="color:green;">User deleted successfully</span>';
					}
				})
		}
	}
	
	toggleCheckbox = (e) => {		
		if(e.target.checked) {
			let arr = this.state.checkedBoxes;
			
			this.setState = { checkedBoxes: arr};
		} else {			
			let users = this.state.checkedBoxes.splice(this.state.checkedBoxes, 1);
			
			this.setState = {
				checkedBoxes: users
			}
		}		
	}
	
	componentDidMount() {
        app.database().ref("data").on("value", snapshot => {
          let userlist = [];
          snapshot.forEach(snap => {
              userlist.push(snap.val());
          });
          this.setState({ userslist: userlist });
        });
    }
        

    logout(){
        app.auth().signOut();
    }
		
	render() {
        return(
		<div className = "Main">
            <button className="FormField__Button mr-20" type="submit" onClick = {this.logout}>Logout</button><br/><br/>
            <button className="FormField__Button mr-20" type="submit" onClick={this.deleteProducts}>Delete</button><br/><br/>
            <ExportReactCSV csvData={this.state.userslist} fileName={this.state.fileName} />
         <div className="container">
          <table class="tables">
            <thead class="thead-dark">
                <tr>
                    <th>FirstName</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {this.state.userslist.map(data => {
                
                return (
                    <tr>     
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.email}</td>
                    <td><input type="checkbox" checked={this.state.checkedBoxes} onChange={(e) => this.toggleCheckbox(e)}/></td>
                    </tr>
                    
                );
               
                })}
        
               
            </tbody>
            
         </table>
          
     </div>
    </div>
  );

}
}