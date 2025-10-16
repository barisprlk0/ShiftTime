import React, { useState } from "react";
import { MdCoffee, MdOutlineRestaurant  , MdOutlinePersonOutline  } from "react-icons/md";
import { IoMdAddCircleOutline,IoIosRemoveCircleOutline  } from "react-icons/io";
import calendarImage  from '../assets/calendar.png';
import "../css/ManageShifts.css";
import { Modal, Button } from "react-bootstrap";

import * as Icons from "react-icons/io";



function ManageShifts(){
    const [showModal, setShowModal] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [count,setCount]= useState(12);
  const availableIcons = [
    "IoMdAdd",
    "IoMdAlarm",
    "IoMdBasket",
    "IoMdBeer",
    "IoMdBook",
    "IoMdBrush",
    "IoMdBuild",
    "IoMdCamera",
    "IoMdCloud",
    "IoMdFitness",
    "IoMdHammer",
    "IoMdHeart",
    "IoMdLaptop",
    "IoMdPeople",
    "IoMdSchool",
    "IoMdCar",
    "IoMdCut",
    "IoMdMusicalNotes",
    "IoMdPlanet",
    "IoMdStar"
  ];

    return(

    <div>
        <div className="card d-flex flex-row MScardContainer">

            <div className="card MScustomCard   ">

               
            <h1 className='MSmyHeader'>Vardiya Yönetimi</h1>
                <table className="table table-borderless table-hover customTable ">
            <thead>
              <tr>  
                <th scope="col"> 
                    
            <button  onClick={() => setShowModal(true)} className="btn btn-primary w-50 MScustomButton">
                <span className="MSbtnText">Rol Ekle</span>
            </button>  </th>
                <th scope="col MStableTitle "> <span className="MStableTitleText">Sabah</span> </th>
                <th scope="col MStableTitle "><span className="MStableTitleText">Akşam</span> </th>     
                </tr>
            </thead>
            <tbody >
                <tr>
                    <th scope="row"> 
                     <MdCoffee size={30}  /> Barista
                    </th>
                    <td>
                        <div className="d-flex  align-items-center">
                        <div className="decrase">   
                        <IoIosRemoveCircleOutline size={30} />
                        </div>
                        <div className="jobRoleShiftContainer">
                        <span className="jobRoleShiftNumber">1</span>
                        </div>
                        <div className="increase"><IoMdAddCircleOutline size={30} /></div>
                        </div>
                        
                    </td>
                    <td>
                        <div className="d-flex  align-items-center">
                        <div className="decrase">   
                        <IoIosRemoveCircleOutline size={30} />
                        </div>
                        <div className="jobRoleShiftContainer">
                        <span className="jobRoleShiftNumber">1</span>
                        </div>
                        <div className="increase"><IoMdAddCircleOutline size={30} /></div>
                        </div>
                        
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                     <MdOutlineRestaurant size={30}  /> Mutfakçı
                    </th>
                   <td>
                        <div className="d-flex  align-items-center">
                        <div className="decrase" style={{cursor:'pointer'}} onClick={()=>setCount(count-1)}>   
                        <IoIosRemoveCircleOutline size={30} />
                        </div>
                        <div className="jobRoleShiftContainer">
                        <span className="jobRoleShiftNumber" > {count} </span>
                        </div>
                        <div className="increase" style={{cursor:'pointer'}} onClick={()=>setCount(count+1)}><IoMdAddCircleOutline size={30} /></div>
                        </div>
                        
                    </td>
                    <td>
                        <div className="d-flex  align-items-center">
                        <div className="decrase">   
                        <IoIosRemoveCircleOutline size={30} />
                        </div>
                        <div className="jobRoleShiftContainer">
                        <span className="jobRoleShiftNumber">1</span>
                        </div>
                        <div className="increase"><IoMdAddCircleOutline size={30} /></div>
                        </div>
                        
                    </td>
                </tr>


                <tr>
                    <th scope="row">
                     <MdOutlinePersonOutline size={30} /> Garson


                    </th>
<td>
                        <div className="d-flex  align-items-center">
                        <div className="decrase">   
                        <IoIosRemoveCircleOutline size={30} />
                        </div>
                        <div className="jobRoleShiftContainer">
                        <span className="jobRoleShiftNumber">1</span>
                        </div>
                        <div className="increase"><IoMdAddCircleOutline size={30} /></div>
                        </div>
                        
                    </td>
                        <td>
                        <div className="d-flex  align-items-center">
                        <div className="decrase">   
                        <IoIosRemoveCircleOutline size={30} />
                        </div>
                        <div className="jobRoleShiftContainer">
                        <span className="jobRoleShiftNumber">1</span>
                        </div>
                        <div className="increase"><IoMdAddCircleOutline size={30} /></div>
                        </div>
                        
                    </td>
                </tr>       
            </tbody>
           
            </table>
                        <div className="MSbuttonContainer">

            <button className="btn btn-primary w-25 MScustomButton">
                <span className="MSbtnText">Shift Dağıt</span>
            </button>

            </div>
            
            </div>
    <div className="svgFile align-self-center">
    <img src={calendarImage} alt="Calendar" width={150} height={140} />
</div>
</div>
     

{showModal && (
    <div className="customModal">

<Modal show={showModal} onHide={() => setShowModal(false)} >
  <Modal.Header closeButton>
    <Modal.Title>Rol Ekle</Modal.Title>
  </Modal.Header>
    <Modal.Body className="align-items-center justify-content-center d-flex flex-column">
        <form>
            <div className="mb-3 ">
                <label htmlFor="roleName" className="form-label">Rol Adı</label>
                <input type="text" className="form-control" id="roleName" />
            </div>

        </form>

        <h5 className="" >İkon Seç</h5>
        <div className="d-flex flex-wrap iconGridContainer">
{availableIcons.map((iconName, index) => {
    const IconComponent = Icons[iconName];
    const isSelected = selectedIcon === iconName; 

    return (
        <div key={index} className="icon-container   ">
            <div className="iconBox" 
            onClick={() => setSelectedIcon(iconName)}
            style={{ 
                backgroundColor: isSelected ? "#496EEB" : "#e8e6e6ff", 
                color: isSelected ? "#fff" : "#000",
                //diğer stiller cssde
            }}
            >
            <IconComponent size={28}  />

            </div>
        </div>
    );
})}
        </div>

    </Modal.Body>
    <Modal.Footer className="d-flex justify-content-center">

            <button  onClick={() => setShowModal(false)} className="btn btn-primary w-50 MScustomButton">
                <span className="MSbtnText">Kaydet</span>
            </button> 

    </Modal.Footer>
</Modal>
    </div>

)}












    </div>
    
  );
}

export default ManageShifts;