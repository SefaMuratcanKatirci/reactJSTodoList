import React, { Component } from 'react';
import primereactLogo from './primereact-logo.png';
import {Button} from 'react-bootstrap';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Calendar} from 'primereact/components/calendar/Calendar';
import ReactDOM from 'react-dom';
import {DataList} from 'primereact/components/datalist/DataList';
import {Growl} from 'primereact/components/growl/Growl';

import './App.css';
import './'
import 'font-awesome/css/font-awesome.css';
import 'primereact/resources/primeng.min.css';
import 'primereact/resources/themes/omega/theme.css';
 
class App extends Component {
  constructor() {
    super();
        this.todoArray = [];
        this.todoObject = {};
        this.id = 0;
        this.state = { id: 0, visible: false, isVisible: false, selectedTodo : null, visibleSelected : false, messages:null };
        this.onChangeBasic = this.onChangeBasic.bind(this);
        this.showAdded = this.showAdded.bind(this);
        this.showEdited = this.showEdited.bind(this);
        this.showDeleted = this.showDeleted.bind(this);
  }
  parseLocalDateString(date) {
       var options = { year: 'numeric', month: 'long', day: 'numeric'};
       return date ? new Date(date).toLocaleDateString("en-US", options) : "";
   }
   
  todoTemplate(todoObject) {
    if(!todoObject)
      return;

    return (
            <div className="ui-grid ui-grid-responsive ui-fluid" style={{ fontSize: '16px', padding: '20px', borderBottom: '1px solid #D5D5D5' }}>
                <div className="ui-grid-row">
                    <div className="ui-grid-col-3" style={{ textAlign: 'center' }}>
                    <i className="fa fa-search" onClick={(e) =>  this.setState({ selectedTodo: todoObject, visibleSelected: true })}
                     style={{ cursor: 'pointer', float: 'left', marginTop: '40px' }}></i>
                   </div>
                    <div className="ui-grid-col-9">
                        <div className="ui-grid ui-grid-responsive ui-fluid">
                            <div className="ui-grid-row">
                                <div className="ui-grid-col-2">Id: </div>
                                <div className="ui-grid-col-10">{todoObject.id}</div>
                            </div>
                            <div className="ui-grid-row">
                                <div className="ui-grid-col-2">Summary: </div>
                                <div className="ui-grid-col-10">{todoObject.summary}</div>
                            </div>
                            <div className="ui-grid-row">
                                <div className="ui-grid-col-2">Detail: </div>
                                <div className="ui-grid-col-10">{todoObject.detail}</div>
                            </div>
                            <div className="ui-grid-row">
                                <div className="ui-grid-col-2">Date: </div>
                                <div className="ui-grid-col-10">{this.parseLocalDateString(todoObject.date)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={primereactLogo} className="App-logo" alt="logo" />
          <h2>Welcome to PrimeReact</h2>
        </div>
        <p className="App-intro">
          TODO List
        </p>  
        <div>
          <Button className ="button" bsStyle="success"  onClick = {this.open} >New</Button>
          <Button bsStyle="success" onClick = {this.isVisible}>  Show Todos</Button>
  
        </div> 
        <Dialog header="Add Todo" visible={this.state.visible} width="350px" modal={true}>

        <div className="content-section implementation">
          <h3>Summary</h3>
          <InputText ref ={(el)=> this.myTextArea = ReactDOM.findDOMNode(el)} onBlur = {this.onChangeSummary}/>
          <h3>Detail</h3>
          <InputText ref ={(el)=> this.myTextArea1 = ReactDOM.findDOMNode(el)}  onBlur = {this.onChangeDetail} style={{marginRight:'.25em'}}/>
            <h3>Due Date</h3>
            <Calendar tabindex="0" appendTo = "body" onChange ={this.onChangeBasic}></Calendar>

        </div>
            <Button  bsStyle="success" onClick = {this.add} >  Add </Button>
            <Button bsStyle="success" onClick = {this.close} >  Cancel</Button>

        </Dialog> 
        <Growl value={this.state.messages}></Growl>
        <Dialog header = "Todo List" visible ={this.state.isVisible} width="500px" height = "500px"  modal = {true}>

                          {this.state.selectedTodo && this.state.selectedTodo.summary}
                  <DataList value={this.todoArray} itemTemplate={this.todoTemplate.bind(this)} paginator={true} rows={5}></DataList> 
                      
        </Dialog>
      

        
          <div className="content-section implementation">
              <Dialog header = "Selected Todo" visible ={this.state.visibleSelected} width="300px" height = "300px"  modal = {true}>
                {
                           this.state.selectedTodo && (<div>
                             <div className="content-section implementation">
                               <h3>ID: </h3>
                               <InputText disabled = 'true' placeholder = {this.state.selectedTodo.id}/>
                              </div>
                              
                             <h3>Summary</h3>
                             <InputText ref ={(el)=> this.myTextArea = ReactDOM.findDOMNode(el)} onBlur = {this.onChangeSummary} placeholder = {this.state.selectedTodo.summary}/>
                               
                             <h3>Detail</h3>
                             <InputText ref ={(el)=> this.myTextArea1 = ReactDOM.findDOMNode(el)} onBlur = {this.onChangeDetail} placeholder = {this.state.selectedTodo.detail}/>
                                 
                             <h3>Due Date</h3>
                            <Calendar tabindex="0" appendTo = "body" onChange ={this.onChangeBasic}></Calendar>

                            <div>
                              <div className="ui-grid-row">
                                <Button  bsStyle="success" onClick = {this.edit} >  Edit </Button>
                              </div>
                              <div className="ui-grid-row"></div>
                              <div className="ui-grid-row">
                                <Button bsStyle="success" onClick = {this.delete} >  Delete</Button>                          
                              </div>
                            </div>
                          
                          </div>)
                       }
              </Dialog>
          </div>
      </div>
    
    );
  }
  open = (e) => {
    this.setState({visibleSelected : false});
    this.setState({messages: null});
    this.setState({isVisible : false});
    this.setState({visible : true});
  }
  
  close = (e) => {
    this.setState({visibleSelected : false});
    this.setState({isVisible : false});
    this.setState({messages: null});
    this.setState({visible : false});
  }
  
  isVisible = (e) => {
    this.setState({visibleSelected : false});
    this.setState({messages: null});
    this.setState({visible : false});
    this.setState({isVisible : true});
  
  }
  
  add = (e) => {
    this.setState({isVisible : false});
    if(this.id){
    this.todoObject.id = this.id + 1;
    this.id = this.id + 1 ;
  }
    
    else {
      this.todoObject.id = 1;
      this.id = this.id + 1;
    }
    
    this.todoArray.push(this.todoObject); 
    var todoArray = [...this.todoArray];
    this.todoArray = todoArray;
    
    this.todoObject = {};
    this.myTextArea.value ="  ";
    this.myTextArea1.value ="  ";

    this.setState({visible : false});
    this.showAdded();


  }
  
  edit = (e) => {  
    if(!this.todoObject.summary)
      this.todoObject.summary = this.state.selectedTodo.summary;
    
    if(!this.todoObject.detail)
        this.todoObject.detail = this.state.selectedTodo.detail;
    
    if(!this.todoObject.date)
          this.todoObject.date = this.state.selectedTodo.date;
          
    this.todoObject.id = this.state.selectedTodo.id;
    this.todoArray.splice(this.state.selectedTodo.id-1,1,this.todoObject);
  
    var todoArray = [...this.todoArray];
    this.todoArray = todoArray;
  
    this.setState({visibleSelected : false});
    this.showEdited();
  
    this.todoObject = {};
    this.myTextArea.value = '';
    this.myTextArea1.value = '';
  }
  
  delete = (e) => {
    var index = this.state.selectedTodo.id-1;
    var index2 = this.state.selectedTodo.id;
    this.todoArray.splice(this.state.selectedTodo.id-1,1)

    if(this.todoArray && index <= this.todoArray.length){
      for( var i = index; i < this.todoArray.length; i++){
       this.todoArray[i].id = index2 ;
       index2++;
      }
    }
    var todoArray = [...this.todoArray];
    this.todoArray = todoArray;
    this.setState({visibleSelected : false});
    this.showDeleted();
    
  }    

  onChangeDetail = (e) => {
    this.todoObject.detail = e.target.value;
  }

  onChangeSummary = (e) => {
    this.todoObject.summary = e.target.value;
  }
  onChangeBasic = (e) => {
    this.todoObject.date = e.value;
  }

  showAdded() {
        this.setState({messages:[{severity:'success', summary:'Success Message', detail:'Added!'}]});
  }

  showEdited() {
        this.setState({messages:[{severity:'info', summary:'Info Message', detail:'Edited!'}]});
  }

  showDeleted() {
        this.setState({messages:[{severity:'warn', summary:'Warn Message', detail:'Deleted!'}]});
  }

}


export default App;
