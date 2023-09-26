import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { validate } from './validations';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './form.module.css';
const notFoundImage = "https://i.imgur.com/Ks7SbZt.png"
import { NavBar } from "../../components/components"

export function Form() {
  const teams = useSelector((state) => state.teams); // Todos los teams del estado global 
  const drivers = useSelector((state) => state.allDrivers); // Todos los drivers del estado global
  
  const [selectedTeam, setSelectedTeam] = useState([]); //Teams seleccionados
  const [customTeam, setCustomTeam] = useState(""); //Team personalizado
  
  const teamInputRef = useRef(null);
  
  const history = useNavigate(); 
  
  /*****   ESTADO NEW DRIVER   *****/
  const [newDriver, setNewDriver] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: ""
  })

  /*****   ESTADO DE ERRORES   *****/
  const [errors, setErrors] = useState({
    forename: "Forename is required",
    surname: "Surname is required",
    description: "Description is required",
    image: "No Image default",
    nationality: "Nationality is required",
    dob: "Dob is required",
    teams: "Teams is required",
  })

  /*****   AGREGAR UN TEAM AL TEXTAREA TEAMS   *****/
  const handlerAddTeam = (event) => {
    event.preventDefault();
    const team = teamInputRef.current.value || customTeam;
    
    if (team && !newDriver.teams.includes(team)) {
      setSelectedTeam([...selectedTeam, team]);
      setCustomTeam("");
      teamInputRef.current.value = "";
    }
  };

  /*****   VALIDACION TEXTAREA DE TEAMS   *****/
  const handleTeamChange = (event) => {
    const selectedDriver = event.target.value;
    const isDuplicate = newDriver.teams.includes(selectedDriver);

    if (!isDuplicate) {
      setNewDriver((prevState) => ({
        ...prevState,
        teams: [...prevState.teams, selectedDriver]
      }));

      setSelectedTeam((prevState) => [...prevState, selectedDriver]);
      
      
    }
    
  };

useEffect(() => {
  if (selectedTeam) {
    setNewDriver((prevState) => ({
      ...prevState,
      [teams]: selectedTeam
    }))
    validate(newDriver)
  }

},[selectedTeam])

  /*****   INPUT TEAM PERSONALIZADO (estado)   *****/
  const handleCustomTeamChange = (event) => {
    setCustomTeam(event.target.value);
  };

  /*****   HANDLE BOTON UNDO DE TEAMS   *****/
  const handleUndo = (event) => {
    event.preventDefault();
    
    if (selectedTeam.length > 0) {
      const updatedTeam = selectedTeam.slice(0, -1);
      setSelectedTeam(updatedTeam);
    }
  };

  /*****   VALIDACION DE LOS INPUTS   *****/
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setNewDriver((prevState) => ({
      ...prevState,
      [name]: value
    }))
   
    const updatedErrors = validate({
      ...newDriver,
      [name]: value
    });
    
    setErrors(updatedErrors);

   
  }
 
  /*****   VALIDO LA CARGA DE IMAGEN   *****/
  const imageUrlChange = () => {
    const url = document.getElementById("imageUrlInput").value
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    
    if (url && regex.test(url)) {
      setNewDriver({ ...newDriver, image: url });
      setErrors(prevErrors => ({
        ...prevErrors,
        image: ""
      }));
    } else {
      setNewDriver({ ...newDriver, image: "" });
      setErrors(prevErrors => ({
        ...prevErrors,
        image: "Invalid URL, please correct"
      }));
    }
  }

  /*****   HANDLE BOTON CANCEL  *****/
  const handleCancel = (event) => {
    event.preventDefault()
    history.push("/home");
    return 
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(newDriver); //Valido antes de grabar

    if (drivers.some(driver => driver.forename.toLowerCase() === newDriver.forename.toLowerCase() && driver.surname.toLowerCase() === newDriver.surname.toLowerCase())){
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "Error: Driver exists!",
      }));
      return; // Evitar la ejecución del resto del código
    }
   
    if (errors.forename==""&&errors.surname==""&&errors.description==""&&errors.image==""&&errors.nationality==""&&errors.dob==""&&errors.teams=="" ) {
      //Aseguro el formato JSON para que se guarde en la BD
      const formattedDriver = {
        forename: newDriver.forename,
        surname: newDriver.surname,
        description: newDriver.description,
        image: newDriver.image,
        nationality: newDriver.nationality,
        dob: newDriver.dob,
        teams: selectedTeam.join(", ")
      };
      
      axios.post('http://localhost:3001/drivers', formattedDriver)
        .then((response) => {
          setErrors(prevErrors => ({
            ...prevErrors,
            ok: false,
            message: "The driver was saved correctly"
          }));
          setTimeout(() => {
            history.push("/home");
          }, 1500);


        })
        .catch((error) => {

          setErrors(prevErrors => ({
            ...prevErrors,
            message: "Error: NOT saved correctly"
          }));

        });
    }
  };
 
  return (


    <div className={styles.container}>

      <div className={styles.sidebar}>
        <h2 style={{ marginTop: "-5px", color: "white" }}>Create New Driver {errors.ok}</h2>
        
        <div className={styles.campoImagen}>
          {!newDriver.image && <img src={notFoundImage} alt="No image" />}
          {newDriver.image && <img src={newDriver.image}  alt="Pic Driver" />}
        </div>
        
        <div className={styles.formField}>
            <label styles={{color:"white"}}>Image URL:</label>
            <input type="text" title="URL" onChange={imageUrlChange} id="imageUrlInput"/>
            {errors.image ? (
              <span className={styles.errorIcon} title={errors.image}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>
      </div>

      <div className={styles.main}>
        <form className={styles.form}>
        <h2 style={{ marginTop: "-5px", marginBottom: "35px", color: "white" }}>{errors.ok}</h2>
          
          <div className={styles.formField}>
            <label style={{marginLeft:"0px"}}>Forename: </label>
            <input style={{width:"150px"}} name="forename" type="text" onChange={handleChangeInput}/>
            {errors.forename ? (
              <span className={styles.errorIcon} title={errors.forename}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
            <label style={{marginLeft:"5px"}}>Surname: </label>
            <input style={{width:"120px"}} name="surname" type="text" onChange={handleChangeInput}/>
            {errors.surname ? (
              <span className={styles.errorIcon} title={errors.surname}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          
            <label >Dob: </label>
            <input style={{width:"75px"}} name="dob" type="text" onChange={handleChangeInput}/>
            {errors.dob ? (
              <span className={styles.errorIcon} title={errors.dob}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>
          
          <div className={styles.formField}>
            <label >Nationality: </label>
            <input style={{ width: "75px" }} name="nationality" type="text" onChange={handleChangeInput} />
            {errors.nationality ? (
              <span className={styles.errorIcon} title={errors.nationality}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.formField}>Description: </label>
            <textarea style={{width:"75%", height:"90px"}} name="description" cols="100" onChange={handleChangeInput}/>
            {errors.description ? (
              <span className={styles.errorIcon} title={errors.description}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.formField} style={{marginLeft:"-46px", marginTop:"23px"}}>Teams:</label>
            <select
              name="teams"
              value={newDriver.teams}
              onChange={handleTeamChange}
              className={styles.formField}
            >
              <option value="">Select teams</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            
            <label className={styles.formField} style={{marginLeft:"10px", marginTop:"23px"}}>Custom Team:</label>
            <input type="text" ref={teamInputRef} value={customTeam} onChange={handleCustomTeamChange} />
            <button onClick={handlerAddTeam} className={styles.btnIcono} style={{marginLeft:"40px", marginTop:"8px"}}>+</button>
            </div>
            <div>
              <textarea
                style={{marginLeft:"100px", width:"69%", height:"40px"}}
                value={selectedTeam.join(", ")}
           
                readOnly
              />
              <button className={styles.btnIcono} onClick={handleUndo}>{'\u21A9'}</button>

              {!selectedTeam.length ? (
                <span className={styles.errorIcon} title="No teams selected, one required">
                  {'\u274C'}
                </span>
              ) : (
                <span className={styles.validIcon}>✅</span>
                
              )}
          </div>

          <div className={styles.formField}>
              <div style={{ display: 'inline-block' }}>
                  <button
                      type="submit"
                      style={{ marginTop: '10px', marginLeft: '10px' }}
                      onClick={handleSubmit}
                      disabled={errors.forename==""&&errors.surname==""&&errors.description==""&&errors.image==""&&errors.nationality==""&&errors.dob==""&&errors.teams==""}
                      className={styles.submitButton}
                  >
                      Save
                  </button>
              </div>

              <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  <button
                      onClick={handleCancel}
                      style={{ marginTop: '10px' }}
                      className={styles.cancelButton}
                  >
                      Cancel
                  </button>
              </div>
          </div>
          <div className={styles.messageContainer}>
                    {errors.message !== "" && errors.message ? (
                        <span className={styles.message}>
                            {errors.message}
                        </span>
                    ) : (
                        <span style={{color:"red"}}>{errors.message}</span>
                    )}
                </div>
        </form>
      </div>
    </div>

  );
}









// import { createDriver, getTeams } from "../../redux/actions"
// import { useSelector, useDispatch } from 'react-redux';
// import { useState, useEffect } from 'react';
// import { validate } from "./validations"
// import { Link } from 'react-router-dom'
// import React from 'react'

// export const Form = () => {
//     const teams = useSelector((state) => state.teams)
//     const dispatch = useDispatch()

//     const [errors, setErrors] = useState({})
//     const [formTouched, setFormTouched] = useState(false)
//     const [formData, setFormData] = useState({
//         forename: "",
//         surname: "",
//         nationality: "",
//         image: "",
//         dob: "",
//         description: "",
//         teams: [],
//     })

//      useEffect(() => {
//         dispatch(getTeams())
//      }, [dispatch]);

//     useEffect(() => {
//         if (formTouched) {
//             setErrors(validate(formData))
//         }
//     }, [formData, formTouched])

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         const validationErrors = validate({ ...formData, [name]: value });
//         setErrors(validationErrors);
//         setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//         setFormTouched(true);
//     };

//     const handleTeamChange = (event) => {
//         const selectedId = event.target.value
//         if (!formData.teams.includes(selectedId)) {
//             setFormData((prevFormData) => ({...prevFormData, teams: [...prevFormData.teams, selectedId]}))
//         }
//     }

//     const handleDropdownToggle = () => {
//         const dropdown = document.getElementById("teamsDropdown")
//     }

//     const handleTeamRemove = (id) => {
//         setFormData((prevFormData) => ({...prevFormData, teams: prevFormData.teams.filter((teamId) => teamId !== id)}))
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         let aux = Object.keys(errors)
//         if (aux.length === 0) {
//             setFormData({
//                 forename: "",
//                 surname: "",
//                 nationality: "",
//                 image: "",
//                 dob: "",
//                 description: "",
//                 teams: [],
//             })
//             const validationErrors = validate(formData)
//             setErrors(validationErrors)

//             const payload = {
//                 forename: formData.forename,
//                 surname: formData.surname,
//                 nationality: formData.nationality,
//                 image: formData.image,
//                 dob: formData.dob,
//                 description: formData.description,
//                 teams: formData.teams
//             }
//             dispatch(createDriver(payload))
//             setFormTouched(false)
//         } else {
//             return alert(errors)
//         }
//     }

//     const isSubmitDisabled = Object.keys(errors).length > 0 || !formTouched;

//     return (
//         <div>
//             <div>
//                 <h1>Create a new driver...</h1>
//                 <Link to={`/home`}>
//                     <button>✖</button>
//                 </Link>
//             </div>
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <label>Image (url): 
//                         <input type='text' key="image" name='image' value={formData.image} onChange={handleChange} onBlur={handleChange}/>
//                     </label>
//                     <span>{errors?.image && errors.image}</span>
//                     <br/>
//                     <label>Forename: 
//                         <input type='text' key="forename" name='forename' value={formData.forename} onChange={handleChange}/>
//                     </label>
//                     <span>{errors?.forename && errors.forename}</span>
//                     <br/>
//                     <label>Surname: 
//                         <input type='text' key="surname" name='surname' value={formData.surname} onChange={handleChange}/>
//                     </label>
//                     <span>{errors?.surname && errors.surname}</span>
//                     <br/>
//                     <label>Nationality: 
//                         <input type='text' key="nationality" name='nationality' value={formData.nationality} onChange={handleChange}/>
//                     </label>
//                     <span>{errors?.nationality && errors.nationality}</span>
//                     <br/>
//                     <label>Description: 
//                         <input type='text' key="description" name='description' value={formData.description} onChange={handleChange}/>
//                     </label>
//                     <span>{errors?.description && errors.description}</span>
//                     <br/>
//                     <label>Date of Birth: 
//                         <input type='text' key="dob" name='dob' value={formData.dob} onChange={handleChange}/>
//                     </label>
//                     <span>{errors?.dob && errors.dob}</span>
//                     <br/>
//                     <label>
//                         Teams:
//                         <div onClick={handleDropdownToggle}>
//                             <select id='teamsDropdown' multple value={formData.teams} onChange={handleTeamChange}>
//                                 {teams.map((team) => (
//                                     <option key={team.id} value={team.id}>
//                                         {team.name}
//                                     </option>
//                                 ))}
//                             </select>
//                             <div>
//                                 {formData.teams.map((selectedId) => {
//                                     const selectedTeam = teams.find((team) => team.id === selectedId);
//                                     return(
//                                         <div key={selectedId}>
//                                             {selectedTeam.name}{' '}
//                                             <button type="button" onClick={() => handleTeamRemove(selectedId)}>
//                                                 ✖
//                                             </button>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                         <span>{errors?.teams && errors.teams}</span>
//                     </label>
//                     <br />
//                     {!isSubmitDisabled ? (
//                         <button type='submit'>Send</button>
//                     ) : (
//                         <span>Form is empty or contains errors</span>
//                     )}
//                 </form>
//             </div>
//         </div>
//     )
// }

// import { getTeams } from "../../redux/actions";
// import { useState, useEffect } from "react"
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios"

// export const Form = () => {
//     const dispatch = useDispatch();
//     const teams = useSelector(state => state.teams);
//     const [selectedTeam, setSelectedTeam] = useState([]);

    // useEffect(() => {
    //     dispatch(getTeams())
    // }, [dispatch]);

//     const [form, setForm] = useState({
//         forename: "",
//         surname: "",
//         description: "",
//         image: "",
//         nationality: "",
//         dob: "",
//         teams: []
//     })

//     const [errors, setErrors] = useState({
//         forename: "",
//         surname: "",
//         description: "",
//         image: "",
//         nationality: "",
//         dob: "",
//         teams: "",
//       })

//     const changeHr = (event) => {
//         const prop = event.target.name
//         const value = event.target.value
//         setForm({...form, [prop]:value})
//         validate({...form, [prop]:value})//le doy lo mismo que le paso al estado al validate para que no haya delay al validar
//     }

//     const submitHr = (event) => {
//         event.preventDefault()
//         axios.post("http://localhost:3001/drivers", form)
//         .then(res=>alert(res))
//         .catch(err=>alert(err))
//     }

//     const multiSelectHr = (event) => {
//         const selectedDriver = event.target.value;
//         const isDuplicate = form.teams.includes(selectedDriver);
//         if (!isDuplicate) {
//           setForm((form) => ({
//             ...form,
//             teams: [...form.teams, selectedDriver]
//           }));
    
//           setSelectedTeam((form) => [...form, selectedDriver]);
//         }
//       };

//     return (
//         <>
//         <h1>Esta es la vista de Form...</h1>
//         <form onSubmit={submitHr}>
//             <div>
//                 <label>Nombre: </label>
//                 <input placeholder='Nombre del corredor...' type="text" value={form.forename} onChange={changeHr} name="forename"/>
//             </div>
//             <div>
//                 <label>Apellido: </label>
//                 <input placeholder='Apellido del corredor...' type="text" value={form.surname} onChange={changeHr} name="surname"/>
//             </div>
//             <div>
//                 <label>Nacionalidad: </label>
//                 <input type="text" value={form.nationality} onChange={changeHr} name="nationality"/>
//             </div>
//             <div>
//                 <label>Fecha de Nacimiento: </label>
//                 <input type="text" value={form.dob} onChange={changeHr} name="dob"/>
//             </div>
//             <div>
//                 <label>Descripción: </label>
//                 <input type="text" value={form.description} onChange={changeHr} name="description"/>
//             </div>
//             <div>
//                 <label>Imagen: </label>
//                 <input placeholder='Inserte un link a una imagen...' type="text" value={form.image} onChange={changeHr} name="image"/>
//             </div>
//             <div>
//                 <label>Escuderías: </label>
//                 <select multiple name="teams" defaultValue={form.teams} onChange={multiSelectHr}>
//                     <option value="">Select Teams</option>
//                     {
//                         teams.map((teams) => {
//                             return <option key={teams} value={teams}>{teams}</option>
//                         })
//                     }
//                 </select>
                    
//             </div>
//             <button type="submit">SUBMIT</button>
//         </form>
//         </>
//     )
// }

// // Nombre.
// // Apellido.
// // Nacionalidad.
// // Imagen.
// // Fecha de Nacimiento.
// // Descripción.
// // Escuderías.
// // Posibilidad de seleccionar/agregar varias escuderías en simultáneo.
// // Botón para dar de alta (crear) el nuevo driver.