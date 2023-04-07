import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppConfig } from '../context/AppConfig'
import daologo from "../Logo.png";
import daologo1 from "../logo_type_white.png";
import GroupIcon from '@mui/icons-material/Group';
import { Box, Modal } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CircularProgress from '@mui/material/CircularProgress';

export const Home = () => {
  const { providerConnected, isadmin, connectWallet, tasks, getVolunteerList, registerForTask, taskLoader, currentUser } = useContext(AppConfig)
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState("")
  const [tokens, setTokens] = useState("")
  const [fulldesc, setFullDesc] = useState("")
  const [handleVolList, setHandleVolList] = useState(false)
  const [volList, setVolList] = useState([])
  const [taskId, setTaskId] = useState("")
  const [limit, setLimit] = useState({ id: "", lim: 32 })
  const [comment, setComment] = useState("")
  const [loader1, setLoader1] = useState(false)
  console.log(taskId)
  const handleOpen = (description, members, tokens, taskId) => {
    setTaskId(taskId)
    setMembers(members)
    setTokens(tokens)
    setFullDesc(description)
    setOpen(true);
  }

  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'rgba(52, 154, 186, 0.87)',
    border: '2px solid rgba(54, 156, 153, 0.87)',
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
  };

  const openCloseVolList = async (taskId) => {
    setHandleVolList(!handleVolList)
    if (volList != []) {
      setLoader1(true)
      setVolList(await getVolunteerList(taskId))
      setLoader1(false)
      console.log(volList)
    }
  }


  const navigate = useNavigate();

  const adminRedirect = async () => {
    navigate('/admin')
  }

  const handleHover = (id) => {
    document.getElementById(id).className = "bg-slate-300 p-1 rounded-xl cursor-pointer hover:scale-105 transition-all ease-in-out hover:cursor-text hover:z-10"
    setLimit({ id: id, lim: 64 })

  }

  const mouseLeaveHandler = (id) => {
    document.getElementById(id).addEventListener('mouseleave', () => setLimit({ id: id, lim: 32 }))

  }


  console.log(currentUser)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex flex-col  justify-center gap-4'>
            <div className='font-bold'>{fulldesc}</div>
            <div className='flex flex-row justify-between'>
              <div className="font-semibold">Active Volunteers: {members}</div>
              <div className='font-semibold'>Tokens Completion  :🪙{tokens}</div>
            </div>
            <input onChange={e => setComment(e.target.value)} value={comment} placeholder='Enter Comment' className='rounded-lg p-2' type="text" />
            <div className="flex justify-between">
              <button onClick={() => registerForTask(taskId, comment)} className='w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105 hover:bg-blue-300 cursor-pointer'>Register as Volunteer</button>
              <button onClick={() => openCloseVolList(taskId)} className='flex justify-center items-center cursor-pointer'> <p className='text-xs font-semibold'>View Volunteers</p> {handleVolList === true ? <ArrowDownwardIcon /> : <DoubleArrowIcon />}</button>
            </div>
            {handleVolList === true && <div className="vollist mt-4 overflow-y-scroll overflow-x-hidden max-h-44 bg-blue-400 p-5 rounded-lg flex flex-col ">

              {loader1 === false ? volList.map((dat) => (
                <div className='flex justify-between items-center mt-4 '>
                  <p>{dat[0]}</p>
                  {currentUser.toLowerCase() === dat[1].toLowerCase() ? <img onClick={() => navigate('/taskstatus/' + dat[1] + '/' + taskId)} className='w-8 animate-spin cursor-pointer transition-all ease-in-out hover:scale-125' src={daologo} /> : ""}
                  <p id={dat[0] + "xyz"} onMouseLeave={() => mouseLeaveHandler(dat[0] + "xyz")} onMouseEnter={() => handleHover(dat[0] + "xyz")} className='bg-slate-300 p-1 rounded-xl cursor-pointer transition-all ease-in-out'>{dat[1].slice(0, limit.id === dat[0] + "xyz" ? limit.lim : 32)}</p>
                </div>
              )) : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress color='inherit' />
              </Box>}
            </div>}

          </div>
        </Box>
      </Modal>
      {/* navbar */}
      <div className='navbar bg-sky-800 flex gap-4 items-center p-4 justify-between'>
        <div className='flex gap-4'>
          <div className='connectwallet'>
            <button disabled={providerConnected} onClick={connectWallet} className={providerConnected ? "w-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200" : "active:bg-slate-400 w-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 transition-all ease-in-out hover:scale-105"}>{providerConnected ? "Connected" : "Connect Wallet"}</button>

          </div>

          <div className='admin self-end'>
            {isadmin ? <button onClick={adminRedirect} className="w-fit p-2 bg-slate-500 rounded-xl active:bg-slate-400 border-2 border-blue-200 transition-all ease-in-out hover:scale-105">Admin Console</button> : ""}
          </div>
        </div>

        <div className='flex self-end'>
          <img className='w-10 animate-spin' src={daologo} alt="" />
        </div>
      </div>

      {/* <button onClick={e => addMember("Gautham", "21BRS1032")}>Add</button> */}
      {/* hero */}
      <div className='hero h-screen flex flex-col items-center'>
        <div className="logo mt-6 m-auto flex items-center gap-4 border-2 border-white p-4 rounded-lg flex-wrap mx-2" >
          <img className='w-96' src={daologo1} alt="" />
          <div className='font-bold text-blue-50 text-2xl'>LEADERBOARD</div>
        </div>

        <div className="button m-auto flex gap-10 -mt-10 flex-wrap">
          <div className="viewldboard">
            <Link to="/leaderboard">
              <button className="w-fit px-6 py-4 bg-slate-500 rounded-xl active:bg-slate-400  hover:bg-sky-100 transition-all ease-in-out hover:scale-105">View Leaderboard</button>
            </Link>

          </div>
          <div className='registerldboard'>
            <Link to="/register">
              <button className="w-fit px-6 py-4 bg-slate-500 rounded-xl active:bg-slate-400  hover:bg-sky-100 transition-all ease-in-out hover:scale-105">Register for Leaderboard</button>
            </Link>
          </div>
        </div>
      </div>

      <section className='tasksMain -mt-28 flex flex-col justify-center items-center px-6'>
        <p className='font-bold text-blue-100 text-2xl animate-pulse shadow-lg p-4 mb-10'>COMMUNITY TASKS</p>
        <div className='grid grid-cols-2 min-h-[300px] mx-4 mb-12 w-full'>
          <div className='flex flex-col bg-sky-800 items-center mx-10 shadow-2xl border-t-2 rounded-xl'>
            <p className='font-bold text-blue-100 text-xl mt-2'>Ongoing Tasks</p>
            <div className="taskList w-full mx-12 flex flex-col items-center justify-center">
              {taskLoader === false ? tasks.map((dat) => (
                <div className="taskItem flex bg-sky-700 flex-col w-4/5 justify-center my-4 shadow-lg border-b-4 border-l-2 border-blue-300 rounded-3xl px-4 py-2 transition-all ease-in-out hover:bg-blue-50 hover:opacity-75">
                  <div className='flex my-2 items-center justify-between'>
                    <p className='taskTitle font-extrabold  bg-sky-100 w-fit rounded-xl p-2'>{dat[1]}</p>
                    <p className='font-semibold mx-2'>🪙: {parseInt(dat[3]._hex)}</p>
                  </div>
                  <p className='taskDesc font-semibold mx-2'>{dat[2].slice(0, 100) + "...."}</p>
                  <div className="flex justify-between mx-4 items-center">
                    <button onClick={() => handleOpen(dat[2], parseInt(dat[5]._hex), parseInt(dat[3]._hex), parseInt(dat[0]._hex))} className='w-fit px-2 m-4 bg-blue-200 rounded-xl active:bg-slate-400 border-2 border-blue-200 transition-all ease-in-out hover:scale-105 font-semibold'>Register</button>
                    <div>
                      <GroupIcon /> : {parseInt(dat[5]._hex)}
                    </div>
                  </div>
                </div>
              )) : <Box sx={{ marginTop: '33px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress color='inherit' />
              </Box>}
            </div>
          </div>
          <div className='flex flex-col bg-sky-800 items-center mx-10 shadow-2xl border-t-2 rounded-xl'>
            <p className='font-bold text-blue-100 text-xl mt-2'>Completed Tasks</p>
          </div>
        </div>
      </section>

    </div>
  )
}
