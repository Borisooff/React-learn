import './app-info.css';

const AppInfo = (props) => {
    const {employees, increased} = props;
    return (
    <div className="app__info">
        <h1>Учет сотрудников</h1>
        <h2>Общее число сотрудников: {employees}</h2>
        <h2>Премию полчат: {increased}</h2>
    </div>
    )
}

export default AppInfo;