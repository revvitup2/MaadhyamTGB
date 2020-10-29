import React from 'react';
import '../App.css';
import app from '../firebase';
import { ExportReactCSV } from '../ExportReactCSV';



export default class Home extends React.Component{

    constructor(props) {
        super(props);  
        this.state = {userslist : [] ,checkedBoxes: []}
        this.deleteProducts = this.deleteProducts.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        }

    //****to delete data from table****
    deleteProducts = () => {
        if(window.confirm('Are you sure, want to delete the selected user?')) {
            var body = JSON.stringify({'firstNames' : this.state.checkedBoxes});
            for(var i = 0;i< body.length; i++){
                var temp = body[i];
                let uid = app.database().ref('temp').push().getKey();
                //console.log(body);
                //console.log(uid);
                app.database().ref('data/' + uid).remove();
                this.state.userslist.splice(uid, 1);
                this.setState({userslist: this.state.userslist});
            }
            /*let body = JSON.stringify({'firstName' : this.state.checkedBoxes});
            let uid = app.child('firstName').push().getKey();
            app.database().ref('data/' + uid.firstName).remove();
            */
            }
        }
    

    
    toggleCheckbox = (e, data) => {       
        if(e.target.checked) {
            let arr = this.state.checkedBoxes;
            this.setState = { checkedBoxes: arr};
            arr.push(data.firstName);
            //console.log(this.state.checkedBoxes);
        } else {            
            let users = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(data.firstName),1);
            this.setState = {
                checkedBoxes: users
            }
            //console.log(this.state.checkedBoxes);
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

    /*$( document ).ready(function() {

        $('#viewfile').onClick(function () {

            var rdr = new FileReader();
            rdr.onload = function (e) {
              //get the rows into an array

              var therows = e.target.result.split("\n");
              //loop through the rows
              for (var row = 0; row < therows.length; row++ ) {
                //build a new table row
                var newrow = "";
                //get the columns into an array
                var columns = therows[row].split(",");
                //get number of columns
                var colcount=columns.length;


                if(colcount!=3 && colcount!=1) {
                    //incorrect number of columns
                    newrow="<tr class='badrowcount'><td>incorrect number of columns</td><td></td><td></td><td></td></tr>"
                } else if(colcount!=1) {
                  newrow="<tr><td>"+ columns[0] +"</td><td>"+ columns[1] +"</td><td>" +columns[2]+ "</td>";

                    var fname=columns[0];
                    var lname=columns[1];
                    var email=columns[2];
                    var data={
                      firstname: fname,
                      lastname: lname,
                      emailid: email
                    }

                  console.log(data);
//                        app.database().ref('users/').update(data);

      }
    $('#tableMain').append(newrow);
      }
            }
            rdr.readAsText($("#inputfile")[0].files[0]);
        });
    });

    });*/

    render() {
        return(
        <div className = "Main">
            <button className="FormField__Button mr-20" type="submit" onClick = {this.logout}>Logout</button><br/><br/>
            <button className="FormField__Button mr-20" type="submit" onClick= {this.deleteProducts.bind()}>Delete</button><br/><br/>
            <ExportReactCSV csvData={this.state.userslist} fileName={this.state.fileName} />
            <div id='buttondiv'>
                <input type='file' id='inputfile' accept=".csv,.xlsx,.xls" />
                <input type='button' id='viewfile' value='import file'/>
                    <br/><br/>
            </div>
            
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
                    <td><input type="checkbox" checked={this.state.checkedBoxes.find((p) => p.firstName === data.firstName)} onChange={(e) => this.toggleCheckbox(e, data)}/></td>
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
