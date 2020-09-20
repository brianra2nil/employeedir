import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'




const App = () => {

  const [employeeState, setEmployeeState] = useState({
    employees: [],
    columns: [
      {
        Header: 'Employee First Name, Last Name',
        accessor: 'name'
      },
      {
        Header: 'Gender',
        accessor: 'gender'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
    ]
  })



  useEffect(() => {
    axios.get('https://randomuser.me/api?results=50')
    .then(({data}) => {
      console.log(data.results)

      let employees = data.results.map(employee => ({
        name: employee.name.first + ' ' + employee.name.last,
        email: employee.email,
        gender: employee.gender
      }))

      setEmployeeState({ ...employeeState, employees})

    })
    .catch(err => console.error(err))
  }, [])

  return(
    <ReactTable
      data={employeeState.employees}
      columns={employeeState.columns}
    />
  )
}

export default App