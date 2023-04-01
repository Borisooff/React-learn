import { Component } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanal from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../emplyees-list/employees-list';
import EmmployeesAddForm from '../employees-add-form/employees-add-form';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'John S.', salary: 1000, increase: true, rise: false, id: 1 },
                { name: 'Stive R.', salary: 1100, increase: false, rise: true, id: 2 },
                { name: 'Anna S.', salary: 1300, increase: false, rise: false, id: 3 },
            ],
        }
        this.maxId = 3;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {

            return {
                data: data.filter(item => item.id != id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId + 1,
        }

        this.maxId = this.maxId + 1;
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return{
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(empl => {
                if(empl.id == id){
                    return{ ...empl, [prop]: !empl[prop]}
                }
                return empl;
            })
        }))
    }

    // onToggleRise = (id) => {
    //     this.setState(({data}) =>({
    //         data: data.map(empl => {
    //             if(empl.id == id){
    //                 return {...empl, rise: !empl.rise};
    //             }
    //             return empl;
    //         })
    //     }))
    // }


    increaseCount = (data)=> {
        let count = 0;
        data.forEach(empl => {
            if(empl.increase){
                count = count + 1; 
            }
        })
        return count;
    }

    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;

        return (
            <div className="app">
                <AppInfo 
                employees={employees}
                increased={increased} />

                <div className="search__panel">
                    <SearchPanal />
                    <AppFilter />
                </div>

                <EmployeesList
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />

                <EmmployeesAddForm
                    onAdd={this.addItem} />
            </div>
        )
    }
}

export default App;