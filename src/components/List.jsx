import React from "react";

export class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            list: []
        }
        this.renderList = this.renderList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    setList(date, list) {
        console.log("set list" + list)
        this.setState({date: date, list: list})
    }

    handleDelete(id) {
        this.props.onDeleteEvent(id);
    }

    handleEdit(id) {
        this.props.onEditEvent(id);
    }

    renderList() {
        if (this.state.list.length !== 0) {
            return this.state.list
                .map(item => (
                    <li key={item.id}>
                        {item.from.toLocaleString() + " - " + item.to.toLocaleString()}
                        <div>
                            <button type={"button"} onClick={() => this.handleEdit(item.id)}>Edit</button>
                            <button type={"button"} className={'marginLeft10px'}
                                    onClick={() => this.handleDelete(item.id)}>Delete
                            </button>
                        </div>
                    </li>
                ))
        } else {
            return <h2>No Events</h2>
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.date}</h2>
                <ul>
                    {this.renderList()}
                </ul>
            </div>
        )
    }
}