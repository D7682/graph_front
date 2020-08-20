import React from 'react';
import {Bar} from 'react-chartjs-2';

class LogicFile extends React.Component{

    state = {
        state: undefined,
        population: undefined,
        data: {
          labels: [this.state],
          datasets: [{
            label: "States",
            data: [this.population],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
          }]
        }
      }
    
      fetchData = async() => {
        let data = await fetch("http://localhost:5000/api")
        data.json()
        .then(response => 
          this.setState({
            state: response.map(x => x.state).join(', '),
            population: response.map(x => x.population).join(', '),
            data: {
              labels: response.map(x => x.state),
              datasets: [{
                label: "States",
                data: response.map(x => x.population),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
              }],
            },
          }))
        .catch(err => console.log(err))
      }



    render(){
        return(
            <div>
      <div className="data">
        <p>State: {this.state.state}</p>
        <br />
        <p>Population: {this.state.population}</p>
      </div>
      <br />
      <button onClick={this.fetchData}>Fetch Data</button>
      <br />
      <Bar data={this.state.data} options={{maintainAspectRatio: false}}/>
     
      </div>
        )
    }
}


export default LogicFile;