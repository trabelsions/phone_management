import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from "react-paginate";
import { getAllAgent, deleteAgent , findgroups , filterdAgent } from "features/user/api/index"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import PopupDelete from 'components/PopupDelete'
const Users = () => {
    const [rowsPerPage, setrowsPerPage] = useState([]);
    const [dateshow, setdateshow] = useState([]);
    const [filterval, setfilterval] = useState([]);
    const [allData, setallData] = useState([]);

    const [agent, setAgentList] = useState([]);

    const [pagelimit, setpagelimit] = useState(5);
    const [selected, setselected] = useState(0);
    const [offset, setoffset] = useState(0);
    const refmodal = useRef(null);
    const [rowsuprission, setrowsuprission] = useState("");
    const navigate = useNavigate();

    useEffect(() => {


        getuserdata();
        findAgent();

    }, [setrowsPerPage]);

    const deletecustomer = () => {
        refmodal.current.click();
        deleteAgent(rowsuprission.id)
            .then((res) => {
                getuserdata();
                toast.success("Agent deleted");
            })
            .catch((err) => console.log(err));
    };
    const findAgent= () => {
        findgroups()
        .then(res => {
            if(res && res.length >0)
                {
                    console.log(res)         
                               setAgentList(res)
                }
          })
    }
    const getuserdata = () => {
        getAllAgent()
            .then((res) => {
                if (res) {
                    setrowsPerPage(res);
                    const row = res;
                    setallData(row)
                    const dat = row.slice(offset, pagelimit + offset);
                    if (Boolean(dat.length)) setdateshow(dat);
                    else {
                        const dat = row.slice(0, pagelimit);
                        setselected(0);
                        setdateshow(dat);
                    }
                } else setdateshow([]);
            })
            .catch((err) => console.log(err));
    }

    const onPageChanged = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * pagelimit);
        if (Boolean(filterval.length)) {
            const currentdata = filterval.slice(offset, offset + pagelimit);
            setoffset(offset);
            setselected(selected);
            setdateshow(currentdata);
        } else {
            const currentdata = rowsPerPage.slice(offset, offset + pagelimit);
            setoffset(offset);
            setselected(selected);
            setdateshow(currentdata);
        }
    };
   const handelFilter = (event) => {
        event.preventDefault(); 
        const name  = event.target.name;
        const value = event.target.value;
        console.log(name , value)
        let data = allData;
        /*if(filterval.length>0)
            {
                data = filterval;
            }*/
        const filtered = data.filter(agent => {
            if (value === '') {
                return true; // Return all data if value is empty

            }
      
            if (name === 'dateDebur' || name === 'dateFin') {
                // Handle date inputs
                const inputValue = new Date(value);
                const agentDate = new Date(agent["registrationDate"]);
            
                if (name === 'dateDebur') {
                  return agentDate >= inputValue;
                } else { // name === 'dateFin'
                  return agentDate <= inputValue;
                }
              } else {
                // Handle select dropdown or other text inputs
                const agentValue = agent[name] ? agent[name].toString().toLowerCase() : '';
                const filterValue = value.toString().toLowerCase();
                return agentValue.includes(filterValue);
            }
          });
          console.log(filtered)
          if(filtered.length > 0){
            setfilterval(filtered);
            const currentdata = filtered.slice(offset, offset + pagelimit);
            setoffset(offset);
            setselected(selected);
            setdateshow(currentdata);
          }
          else{
            const dat = data.slice(0, pagelimit);
                        setdateshow(dat);  
          }

    }
    const showupdatedrower = (el) => {
navigate('/admin/updateUser/'+el.id);

    }
   const handleSelectClick = (event) => {
        event.stopPropagation(); // Prevent event from bubbling up
      };
    return (
        <div className='bg-dashbord  vh-100'>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />



            <div className='p-3'>
                <div className='p-3 card vh-80'>
                    <div className='d-flex justify-content-between'>
                    <h3>Tous Les Agents</h3>
                    <div class="dropdown mr-2rem">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Filtrer par date
  </button>
  <div className="dropdown-menu " aria-labelledby="dropdownMenuButton" style={{ minWidth: '250px' }}>
    <div className='p-3 w-100' >
    <select  onClick={handleSelectClick} className='rounded-select'  name="group" onChange={handelFilter}>
        {agent.map((el,key) => {
        return <option value={el} key={key}>{el}</option>

        })}
       

    </select>
    <div className='row mt-2'>
    <input type='date' name="dateDebur" className='col-md-6 rounded-select' onChange={handelFilter}></input>
    <input type='date' name="dateFin" className='col-md-6 rounded-select' onChange={handelFilter}></input>
    </div>
  </div>
  </div>
</div>
</div>
                    <div className="container p-5 client">

   
                        <div className="main-client">


                            <table className="table table-borderless ">
                                <thead>
                                    <tr className="th-table">
                                        <th className="col">Nom de L’agent</th>
                                        <th className="col">Numéro</th>
                                        <th className="col">Groupe de destination</th>
                                        <th className="col">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dateshow.length > 0 ? (
                                        dateshow.map((el, index) => {
                                            return (
                                                <tr key={index} className="">
                                                    <td className="col" label={"Nom de L’agent"}>
                                                        {el.name}
                                                    </td>
                                                    <td className="col" label={"Numéro"}>
                                                        {el.phone || "-"}
                                                    </td>

                                                    <td className="col" label={"Groupe de destination"}>
                                                        {el.group}
                                                    </td>

                                                    <td className="col" label={"Email"}>
                                                        {el.email}
                                                    </td>
                                                    <td className="col" label={"Action"}>

                                                        <button
                                                            className="mr-1rem btn btn-danger "
                                                            data-toggle="modal"
                                                            data-target="#exampleModal"
                                                            onClick={() => setrowsuprission(el)}
                                                        >
                                                            Supprimer
                                                        </button>
                                                        <button
                                                            className="btn  btn-success-roundesk "
                                                            onClick={() => showupdatedrower(el)}
                                                        >
                                                            Modifier
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr scope="row">
                                            <td colSpan="2" className="text-center">
                                                {" "}
                                                {"Aucun donner "}{" "}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className={!Boolean(dateshow.length) ? "d-none" : "pagination  justify-content-between"}
                        >
                        
                                <p>Affichage des données 1 à {pagelimit} sur {
                                     filterval.length > 0
                                     ? Math.ceil(filterval.length / pagelimit)
                                     : Math.ceil(rowsPerPage.length / pagelimit)} entrées</p>
                           <div>
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}

                                pageCount={
                                    filterval.length > 0
                                        ? Math.ceil(filterval.length / pagelimit)
                                        : Math.ceil(rowsPerPage.length / pagelimit)
                                }
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={onPageChanged}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                activeClassName={'active'}
                                initialPage={0}
                                forcePage={selected}
                            />
                             </div>
                      
                        </div>
                    </div>
                </div>
                <PopupDelete deletecustomer={deletecustomer} refmodal={refmodal}/>
            </div>
        </div>

    );
};

export default Users;