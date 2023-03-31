import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanal from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../emplyees-list/employees-list';
import EmmployeesAddForm from '../employees-add-form/employees-add-form';

const data = [
    { name: 'John S.', salary: 1000, increase: true, id: 1 },
    { name: 'Stive R.', salary: 1100, increase: false, id: 2 },
    { name: 'Anna S.', salary: 1300, increase: false, id: 3 },
]

function App() {
    return (
        <div className="app">
            <AppInfo />

            <div className="search__panel">
                <SearchPanal />
                <AppFilter />
            </div>

            <EmployeesList data={data} />
            <EmmployeesAddForm />
        </div>
    );
}

export default App;