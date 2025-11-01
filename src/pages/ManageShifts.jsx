import React, { useState,useEffect } from "react";
import { MdCoffee, MdOutlineRestaurant  , MdOutlinePersonOutline, MdSave  } from "react-icons/md";
import { IoMdAddCircleOutline,IoIosRemoveCircleOutline  } from "react-icons/io";
import calendarImage  from '../assets/calendar.png';
import "../css/ManageShifts.css";
import { Modal, Button } from "react-bootstrap";
import { db } from '../firebaseConfig'; 
import { doc, setDoc,getDoc } from 'firebase/firestore';
import * as Icons from "react-icons/io";

const initialRoles = [];
const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const shift = ['day', 'evening']; 

function createInitialRequirements(roles,days,shift,defaultValue=5){
    return days.reduce((requirementsMap,day)=>{
        roles.forEach(role=>{
            const roleName = typeof role === "string" ? role : role.name;
            shift.forEach(shiftType=>{
                const key=`${day}_${roleName}_${shiftType}`;
                requirementsMap[key]=defaultValue;
            });
        });
        return requirementsMap;
    },{});
}

function ManageShifts(){

const [roles,setRoles]=useState(initialRoles);
const initialRequirements = createInitialRequirements(initialRoles, days, shift);
const[requirements,setRequirements]=useState(initialRequirements);

const [showModal, setShowModal] = useState(false);
const [selectedIcon, setSelectedIcon] = useState(null);
const [newRoleName, setNewRoleName] = useState(''); 

const updateRequirement = (key, adjustment) => {
    setRequirements(prevRequirements => {
        const currentCount = prevRequirements[key];
        const newCount = Math.max(0, currentCount + adjustment);
        
        return {
            ...prevRequirements,
            [key]: newCount,
        };
    });
};

const handleSaveRole=()=>{
    if (newRoleName.trim()==""){
        return;
    }
    const newRole = { name: newRoleName.trim(), icon: selectedIcon };

    setRoles(prevRoles => [
        ...prevRoles,
        newRole
    ]);

    setRequirements(prevRequirements => {
        const newRequirements = { ...prevRequirements };

        days.forEach(day => {
            shift.forEach(shiftType => {
                const key = `${day}_${newRole.name}_${shiftType}`;
                newRequirements[key] = 1; 
            });
        });
        return newRequirements;
    });

    setNewRoleName('');
    setSelectedIcon(null);
    setShowModal(false);
};

const saveShiftSettings = async () => {
    const settingsData = {
        roles: roles,
        requirements: requirements,
        shiftTimes: {
            Sabah: { start: "09:00", end: "18:00" },
            Akşam: { start: "18:00", end: "23:00" }
        }
    };
    
    try {
        await setDoc(doc(db, "shift_settings", "current_settings"), settingsData);
        console.log("Vardiya Ayarları Başarıyla Kaydedildi!");
        alert('Vardiya ayarları kaydedildi. Artık dağıtıma geçebiliriz!');
    } catch (error) {
        console.error("Vardiya Ayarları Kaydedilemedi: ", error);
        alert('Hata: Ayarlar kaydedilirken bir sorun oluştu.');
    }
};

const loadShiftSettings = async () => {
    try {
        const docRef = doc(db, "shift_settings", "current_settings");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            setRoles(data.roles || initialRoles);
            setRequirements(data.requirements || createInitialRequirements(data.roles || initialRoles, days, shift));
            console.log("Kayıtlı ayarlar yüklendi.");
        } else {
            console.log("Kayıtlı ayar bulunamadı, varsayılan başlatılıyor.");
            const defaultReqs = createInitialRequirements(initialRoles, days, shift);
            setRequirements(defaultReqs);
        }
    } catch (error) {
        console.error("Ayarlar yüklenirken hata oluştu:", error);
    }
};

useEffect(() => {
    loadShiftSettings();
}, []); 

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
    "IoMdStar",
    "IoMdCafe"
];

return(
    <div>
        <div className="card d-flex flex-row MScardContainer">
            <div className="card MScustomCard">
                <h1 className='MSmyHeader'>Vardiya Yönetimi</h1>
                <table className="table table-borderless table-hover customTable ">
                <thead>
                <tr> 
                <th scope="col"> 
                <button onClick={() => setShowModal(true)} className="btn btn-primary w-50 MScustomButton">
                <span className="MSbtnText">Rol Ekle</span>
                </button> </th>
                <th scope="col MStableTitle "> <span className="MStableTitleText">Sabah</span> </th>
                <th scope="col MStableTitle "><span className="MStableTitleText">Akşam</span> </th>     
                </tr>
                </thead>
                <tbody>
                {roles.map((roleObj, index) => {
                    const roleName = typeof roleObj === "string" ? roleObj : roleObj.name;
                    const iconName = typeof roleObj === "object" ? roleObj.icon : null;
                    const IconComponent = iconName ? Icons[iconName] : null;

                    const dayKey = `Pazartesi_${roleName}_day`;
                    const eveningKey = `Pazartesi_${roleName}_evening`;

                    return (
                        <tr key={index}>
                            <th scope="row"> 
                                {IconComponent ? (
                                    <IconComponent size={32} style={{marginRight: '8px'}} />
                                    
                                ) : (
                                    <span style={{marginRight: '10px'}}>{roleName.charAt(0)}</span>
                                )}
                                {roleName}
                            </th>
                            
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="decrase" style={{cursor: 'pointer'}} onClick={() => updateRequirement(dayKey,-1)}> 
                                        <IoIosRemoveCircleOutline size={30} />
                                    </div>
                                    <div className="jobRoleShiftContainer">
                                        <span className="jobRoleShiftNumber">{requirements[dayKey]}</span>
                                    </div>
                                    <div className="increase" style={{cursor: 'pointer'}} onClick={() => updateRequirement(dayKey,+1)}> 
                                        <IoMdAddCircleOutline size={30} />
                                    </div>
                                </div>
                            </td>
                            
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="decrase" style={{cursor: 'pointer'}} onClick={() => updateRequirement(eveningKey,-1)}> 
                                        <IoIosRemoveCircleOutline size={30} />
                                    </div>
                                    <div className="jobRoleShiftContainer">
                                        <span className="jobRoleShiftNumber">{requirements[eveningKey]}</span>
                                    </div>
                                    <div className="increase" style={{cursor: 'pointer'}} onClick={() => updateRequirement(eveningKey,+1)}> 
                                        <IoMdAddCircleOutline size={30} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
                </table>
                <div className="MSbuttonContainer">
                    <button className="btn btn-primary w-50 MScustomButton" onClick={saveShiftSettings}>
                        <span className="MSbtnText ">Değişiklikleri Kaydet </span>
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
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="roleName" 
                                    value={newRoleName}
                                    onChange={(e)=>setNewRoleName(e.target.value)}
                                />
                            </div>
                        </form>

                        <h5 className="" >İkon Seç</h5>
                        <div className="d-flex flex-wrap iconGridContainer">
                            {availableIcons.map((iconName, index) => {
                                const IconComponent = Icons[iconName];
                                const isSelected = selectedIcon === iconName; 

                                return (
                                    <div key={index} className="icon-container">
                                        <div className="iconBox" 
                                            onClick={() => setSelectedIcon(iconName)}
                                            style={{ 
                                                backgroundColor: isSelected ? "#496EEB" : "#e8e6e6ff", 
                                                color: isSelected ? "#fff" : "#000",
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
                        <button onClick={ handleSaveRole } className="btn btn-primary w-50 MScustomButton">
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
