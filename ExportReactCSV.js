import React from 'react'
import { CSVLink } from 'react-csv'
import './App.css';
import Button from 'react-bootstrap/Button';

export const ExportReactCSV = ({csvData, fileName}) => {
    return (
        <Button variant="warning" className="FormField__Button mr-20">
            <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
        </Button>
    )
}