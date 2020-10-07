import React from 'react';
import DatePicker from 'react-datepicker';
import '../styles.css';

export class AddEventForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            title: '',
            description: '',
            fromDate: null,
            toDate: null
        };

        //this.showForm = this.showForm.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    showForm(id = -1,
             title = '',
             description = '',
             fromValue = null,
             toValue = null) {
        this.setState({
            id: id,
            title: title,
            description: description,
            fromDate: fromValue,
            toDate: toValue
        });
    }

    submitForm() {
        console.log("Submit Form")
        this.props.onFormSubmit(
            this.state.id,
            this.state.title,
            this.state.description,
            this.state.fromDate,
            this.state.toDate);
    }

    cancelForm() {
        this.props.onFormCancel()
    }

    render() {
        return (
            <form hidden={this.state.hidden}>
                <div>
                    <h2>Add new Event</h2>
                    <label className={'displayBlock'}>Title:
                        <input className={'displayBlock'} type="text" value={this.state.title}
                               onChange={element => this.setState({title: element.target.value})}/>
                    </label>
                    <label className={'displayBlock'}>Description:
                        <input className={'displayBlock'} type="text" value={this.state.description}
                               onChange={element => this.setState({description: element.target.value})}/>
                    </label>
                    <div className={'displayBlock'}>From:</div>
                    <DatePicker className={'displayBlock'}
                                selected={this.state.fromDate}
                                onChange={date => this.setState({fromDate: date})}
                                showTimeSelect
                                excludeTimes={[]}
                                dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <div className={'displayBlock'}>To:</div>
                    <DatePicker className={'displayBlock'}
                                selected={this.state.toDate}
                                onChange={date => this.setState({toDate: date})}
                                showTimeSelect
                                excludeTimes={[]}
                                dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <br/><br/>
                    <div className={'bottom'}>
                        <button type="button" onClick={this.submitForm} disabled={!this.state.fromDate || !this.state.toDate}>Submit</button>
                        <button type="button" className={'marginLeft60px'} onClick={this.cancelForm}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}