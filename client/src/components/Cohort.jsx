import React, { useState, useEffect } from 'react';

function Cohorts() {
    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/cohorts')
            .then(response => response.json())
            .then(data => setCohorts(data))
            .catch(error => console.error('Error fetching cohort data:', error));
    }, []);

    return (
        <div>
            <h1>Cohort Data</h1>
            <div>
                {cohorts.map(cohort => (
                    <div key={cohort.cohort_id}>
                        <h2>{cohort.cohort_name}</h2>
                        <p>Type: {cohort.cohort_type}</p>
                        <p>Members: {cohort.members}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cohorts;
