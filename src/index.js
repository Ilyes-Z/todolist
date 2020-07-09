import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    state = {
      tasks: ['create todolist', 'learn react', 'sleep']
    };
  
    handleSubmit = task => {
      this.setState({tasks: [...this.state.tasks, task]});
    }
    
    handleDelete = (index) => {
      const newArr = [...this.state.tasks];
      newArr.splice(index, 1);
      this.setState({tasks: newArr});
    }
  
    render() {
      return(
        <div>
        <div className='wrapper'>
          {/* <div className='card frame'> */}
            <SubmitForm onFormSubmit={this.handleSubmit} />
          {/* </div> */}
        </div>
        <div className='todolist'>
            <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
        </div>
        <div className='header'>
          <Header numTodos={this.state.tasks.length} />
        </div>
        </div>
      );
    } 
  }
  
class SubmitForm extends React.Component {
    state = { term: '' };
  
    handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.term === '') return;
      this.props.onFormSubmit(this.state.term);
      this.setState({ term: '' });
    }
  
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            className='input'
            placeholder='Enter task'
            value={this.state.term}
            onChange={(e) => this.setState({term: e.target.value})}
          />
          <button className='button'>add</button>
        </form>
      );
    }
  }
  
  
  const Header = (props) => {
    return(
      <div className='card-header'>
        <h4 className='card-header-title header'>
          You have {props.numTodos} Todos left
        </h4>
      </div>
    )
  }
  
  
  const TodoList = (props) => {
    const todos = props.tasks.map((todo, index) => {
      return <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    })
    return( 
      <div className='list-wrapper'>
        {todos}
      </div>
    );
  }
  
  const Todo = (props) => {
    return(
      <div className='list-item'>
        {props.content}
        <button class="delButton" onClick={() => {props.onDelete(props.id)}}>X</button>
      </div>
    );
  }
  
  ReactDOM.render(
    <App />,
    document.querySelector('#root')
  );
