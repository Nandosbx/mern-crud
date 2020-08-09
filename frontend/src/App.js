import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: 0,
      name:"",
      email:"",
      password:""
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api')
      .then((res) => {
        this.setState({
          users: res.data,
          id:0,
          name:'',
          email:'',
          password:''
        })
        //console.log({data})
      })
  }

  nameChange = event => {
    this.setState({
      name:event.target.value
    })
  }

  emailChange = event => {
    this.setState({
      email:event.target.value
    })
  }

  passwordChange = event => {
    this.setState({
      password:event.target.value
    })
  }

  submit(event, id) {
    event.preventDefault()
    if(id === 0) {
    axios.post('http://localhost:5000/api', {name:this.state.name, email:this.state.email, password: this.state.password})
    } else {
      axios.put(`http://localhost:5000/${id}`,{name:this.state.name, email:this.state.email, password: this.state.password})
    }
  }



  render() {
    return (
      <div className="row">
        <div className="col s6"></div>

        <form onSubmit={e => this.submit(e, this.state.id)}>
          <div class="input-field col s12">
            <i class="material-icons prefix">person</i>
            <input onChange={e =>this.nameChange(e)} type="text" id="autocomplete-input" class="autocomplete" />
            <label for="autocomplete-input">Name</label>
          </div>

          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input onChange={e =>this.emailChange(e)}type="email" id="autocomplete-input" class="autocomplete" />
            <label for="autocomplete-input">Email</label>
          </div>

          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input onChange={e =>this.passwordChange(e)}
              type="password"
              id="autocomplete-input"
              class="autocomplete"
            />
            <label for="autocomplete-input">Password</label>
          </div>

          <button
            class="btn waves-effect waves-light right"
            type="submit"
            name="action"
          >
            Submit
            <i class="material-icons right">send</i>
          </button>
        </form>
        <div className="col s6">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {this.state.users.map(user => 
                <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>

                <td>
                  <button
                    onClick={e=>this.edit(e._id)}
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    <i class="material-icons">edit</i>
                  </button>
                </td>

                <td>
                  <button
                    onClick={e=>this.delete(e._id)}
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    <i class="material-icons">delete</i>
                  </button>
                </td>
                </tr>                
              )}              
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
