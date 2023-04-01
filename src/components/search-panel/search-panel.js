import { Component } from 'react';
import './search-panel.css';


class SearchPanal extends Component  {
    constructor(props){
        super(props);
        this.state = {
            term: '',
        }
    }

    onInput = (e)=> {
        const term = e.target.value;
        this.setState({
            term: term,
        })
        this.props.onUpdateSearch(term)
    }

    render(){
        return (
            <input 
            type="text" 
            className="form-control search-input"
            placeholder="Найти сотрудника"
            value={this.state.term}
            onChange={this.onInput} />
        );
    }
}

export default SearchPanal;