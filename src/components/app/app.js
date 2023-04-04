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
                { name: 'John S.', salary: 1000, increase: false, rise: false, id: 1 },
                { name: 'Stive R.', salary: 1100, increase: false, rise: false, id: 2 },
                { name: 'Anna S.', salary: 1300, increase: false, rise: false, id: 3 },
            ],
            term: '',
            filter: 'all',
        }
        this.maxId = 3;
    }

    // удаление сотрудника. принемает id, изменяет состояние, куда в массив data вносит новый сассив, отфильтрованный от сотрудника по id
    deleteItem = (id) => {
        this.setState(({ data }) => {

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    // добавление сотрудника. создает новый элемент с параметрами переданными в функцию. В изменении сосотояния создает новый массив, в который включает нового сотрудника и меняет его со старым массивом данных
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId + 1,
        }

        this.maxId = this.maxId + 1;
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    // универсальная функция для изменения свойств в данных. Используется для increase и rise. Принимает id сотрудника и какое свойство надо изменить. Создает новый массив данных в котором меняет свойство на противоположное у элемента с нужным id и меняет состояние
    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(empl => {
                if (empl.id === id) {
                    return { ...empl, [prop]: !empl[prop] }
                }
                return empl;
            })
        }))
    }

    // подсчет сотрудников на премию. Возвращает число сотрудников у которых increase: true
    increaseCount = (data) => {
        let count = 0;
        data.forEach(empl => {
            if (empl.increase) {
                count = count + 1;
            }
        })
        return count;
    }

    // поиск сотрудников. Принимает список данных( в данном случае массив data) и возвращает отфильрованный массив с элементами в которых есть совпадения
    searchEmpl = (items, search) => {
        if (search.length === 0) {
            return items
        }
        return items.filter(empl => {
            return empl.name.indexOf(search) > -1
        })
    }

    // при изменении значения поиска в состоянии это значение тоже меняется 
    onUpdateSearch = (term) => {
        this.setState({ term: term })
    }

    // фильтер поиска. Принемает массив для поиска и по какому пораметру фильруется. возвращает отфильтрованный массив
    filterSearch = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    // когда параметры поиска меняются в состояние поиска заносятся изменения 
    onUpdateFilter = (filter) => {
        this.setState({ filter })
    }

    // изменение зп
    onChangeSalary = (id, salary) => {
        this.setState(({ data }) => ({
            data: data.map(empl => {
                if (empl.id === id) {
                    return { ...empl, salary: salary }
                }
                return empl;
            })
        }))
    }


    render() {
        const { data, term, filter } = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterSearch(this.searchEmpl(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased} />

                <div className="search__panel">
                    <SearchPanal onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onUpdateFilter={this.onUpdateFilter} />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary} />

                <EmmployeesAddForm
                    onAdd={this.addItem} />
            </div>
        )
    }
}

export default App;