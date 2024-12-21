import { useState } from "react";
import React from "react";
import axios from "axios";

function SemesterInfo({ accessToken }) {
    const [semesters, setSemesters] = useState([]);

    React.useEffect(() => {
        const fetchSemesterInfo = async () => {
            try {
                const response = await axios.get('https://sinhvien1.tlu.edu.vn/education/api/semester/semester_info', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const semesterData = response.data.semesterRegisterPeriods.map(period => ({
                    id: period.id,
                    name: period.name,
                    semesterCode: period.semester.semesterCode
                }));
                setSemesters(semesterData);
            } catch (error) {
                console.error("Failed to fetch semester info:", error);
            }
        };

        fetchSemesterInfo();
    }, [accessToken]);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h2>Semester Information</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>ID</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Name</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Semester Code</th>
                    </tr>
                </thead>
                <tbody>
                    {semesters.map((semester, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{semester.id}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{semester.name}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{semester.semesterCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SemesterInfo ;

/*
now when user click on any record, we will handle that action like this:
https://sinhvien1.tlu.edu.vn/education/api/cs_reg_mongo/findByPeriod/{person.id}/{semesterRegisterPeriods[index...]['id']} 
use the access_token for authorize, fill the url params by the given data and display the json that we will get into a table
*/