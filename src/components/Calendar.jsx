import React from "react";
import 'react-css-dropdown/dist/index.css'
import Select from "react-select";
import {range} from "../utils/utils";
import '../styles.css';

const months = [
    {label: 'January', value: 0, days: range(1, 31)},
    {label: 'February', value: 1, days: range(1, 28)},
    {label: 'March', value: 2, days: range(1, 31)},
    {label: 'April', value: 3, days: range(1, 30)},
    {label: 'May', value: 4, days: range(1, 31)},
    {label: 'June', value: 5, days: range(1, 30)},
    {label: 'July', value: 6, days: range(1, 31)},
    {label: 'August', value: 7, days: range(1, 31)},
    {label: 'September', value: 8, days: range(1, 30)},
    {label: 'October', value: 9, days: range(1, 31)},
    {label: 'November', value: 10, days: range(1, 30)},
    {label: 'December', value: 11, days: range(1, 31)}
]

export class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: {},
            selectedDay: 0,
            days: [],
            marked: [],
            handleSelect: (element) => {
                this.props.onMonthChange(element.label)
            },
            handleDayClick: (element) => {
                let selectedDay = parseInt(element.target.innerText)
                this.setState({selectedDay: selectedDay})
                this.props.onDayClick(selectedDay)
            }
        }
        this.renderTableData = this.renderTableData.bind(this);
        this.updateCalendar = this.updateCalendar.bind(this)
    }

    updateCalendar(selectedMonth = 'January', marked = []) {
        console.log("Update calendar called" + selectedMonth)
        let month = months.filter(option => option.label === selectedMonth)[0]
        let days = month.days
        this.setState({selectedMonth: month, days: days, marked: marked})
    }

    renderTableData() {
        return this.state.days.map((day, index) => {
            let monthIndex = months
                .filter(month => month.label === this.state.selectedMonth.label)[0].value
            let date = day + "-" + monthIndex
            if (this.state.marked.find(element => element === date) != null) {
                return (
                    <td className={'displayInlineBlock colorCell'} onClick={this.state.handleDayClick}>{day}</td>
                )
            } else {
                return (
                    <td className={'displayInlineBlock cell'} onClick={this.state.handleDayClick}>{day}</td>
                )
            }
        })
    }

    render() {
        return (
            <div>
                <Select
                    value={this.state.selectedMonth}
                    options={months}
                    onChange={this.state.handleSelect}/>
                <br/>
                <table>
                    <tbody>
                    <tr className={'displayBlock'}>
                        {this.renderTableData()}
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}