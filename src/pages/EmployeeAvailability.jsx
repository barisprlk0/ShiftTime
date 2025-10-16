import React, { useState } from "react";
import '../css/EmployeeAvailability.css';

const daysOfWeek={
    Monday: "Pazartesi",
    Tuesday: "Salı",
    Wednesday: "Çarşamba",
    Thursday: "Perşembe",
    Friday: "Cuma",
    Saturday: "Cumartesi",
    Sunday: "Pazar",
}
const initialAvailability = {
    Monday: {day: true, evening:false},
    Tuesday: {day: true, evening:false},
    Wednesday: {day: true, evening:false},
    Thursday: {day: true, evening:false},
    Friday: {day: true, evening:false},
    Saturday: {day: false, evening:false},
    Sunday: {day: false, evening:false},
}

function EmployeeAvailability() {
    const [availability, setAvailability] = useState(initialAvailability);

    return (
       <div>
        <div className="card customCard">

        <h3 className="myHeader">Müsaitlik Tablosu</h3>

        <table class="table table-hover table-borderless customTable ">
  <thead>
    <tr> 
      <th scope="col"></th>

      <th scope="col">Sabah <br></br><small className="text-muted customSmall">(08:30 - 17:00)</small></th>
      <th scope="col">Akşam <br></br><small className="text-muted customSmall">(17:00 - 23:00)</small></th>

    </tr>
  </thead>
<tbody>
  {Object.entries(daysOfWeek).map(([key, value], index) => (
    <tr key={index}>
      <th scope="row">{value}</th>
      <td>
         <div className="form-switch big-switch">
            
            <input 
            type="checkbox" 
            className="form-check-input"  
            name="" 
            id="flexSwitchCheckDefault" 
            checked={availability[key].day}
            onChange={e => {
                const newAvailability = {...availability};
                newAvailability[key].day = e.target.checked;
                setAvailability(newAvailability);
            }}
            />
        </div>   
      </td>
            <td>
         <div className="form-switch big-switch">
            <input 
            type="checkbox" 
            className="form-check-input"  
            name="" 
            id="flexSwitchCheckDefault"  
            checked={availability[key].evening}
            onChange={e => {
                const newAvailability = {...availability};
                newAvailability[key].evening=e.target.checked; 
                setAvailability(newAvailability);}}
            />
        </div>   
      </td>
    </tr>
  ))}
</tbody>


</table>
<div className="buttonContainer">

<button className="btn btn-primary w-25 customButton">
    <span className="btnText">Kaydet</span>
</button>

</div>
        </div>

       </div>
    );
}

export default EmployeeAvailability;