// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    return {
        firstName:firstName,
        familyName:familyName,
        title: title,
        payPerHour:payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(employeeDataArray){
    return employeeDataArray.map(employeeData=>createEmployeeRecord(employeeData))
}

function createTimeInEvent(employeeRecord, dateStamp){
    const [date, hour]= dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeRecord;

}

function createTimeOutEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(' ');
        employeeRecord.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(hour, 10),
            date: date
        })
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    const timeInEvent = employeeRecord.timeInEvents.find(events=>
        events.date===dateStamp
    )
    const timeOutEvent = employeeRecord.timeOutEvents.find(events=>
        events.date ===dateStamp
    )
    if(!timeInEvent||!timeOutEvent){
        throw new Error(`No time-in or time-out event found for date: ${dateStamp}`);;
    } 
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100

    return Math.floor(hoursWorked);
    
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp);
    const amountOwed = hoursWorked*employeeRecord.payPerHour
    return amountOwed;
}
function allWagesFor(employeeRecord){
    const datesWorked = employeeRecord.timeInEvents.map(events=>events.date)
    const totalWages = datesWorked.reduce((total, date)=>{
        return (total + wagesEarnedOnDate(employeeRecord, date))
    }, 0);
    return totalWages;
}

function calculatePayroll(employeeRecords){
    const totalPay = employeeRecords.reduce((total, employeeRecord)=>{
        return (total + allWagesFor(employeeRecord))
    }, 0);
    return totalPay;
}




