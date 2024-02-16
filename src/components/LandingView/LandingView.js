import './LandingView.css'
import { useNavigate } from "react-router";
import { TbCloudUpload } from 'react-icons/tb'
import { MdManageHistory } from 'react-icons/md'
import { AiOutlineAreaChart } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi'
import { HiOutlineDocumentSearch } from 'react-icons/hi'
import { BsPersonCheck } from 'react-icons/bs'
import * as POsService from '../services/Services'
import { useState, useRef } from "react"


const LandingView = () => {

    const navigate = useNavigate()

    const onSearchPOSubmitHandler = (e) => {
        e.preventDefault();
        let poNumber = e.target.PO.value


        if ((e.target.PO.value).match(/[^0-9]/)) {
            alert('PO must contain digits only!')
        } else if (e.target.PO.value.length < 9 || e.target.value === ''){
            alert('PO number too short. PO must contain 9 digits!');
        } else if (e.target.PO.value.length > 9) {
            alert('PO number too long. PO must contain 9 digits only!');
        } else {
            POsService.getPObyPONumber(poNumber)
            .then(res => {
                if (res.length === 0) {
                    alert('PO not found!')
                } else {
                    navigate(`/WorkPlace/${res._id}/${res.PONumber}/${res.PN}`)
                }
            })
        }
    }

    const onUploadHandler = (files) => {
        const file = files[0];
        const formData = new FormData();
        formData.append('uploadFile', file)
        POsService.uploadFile(formData)
            .then(() => {
                alert('POs uploaded!')
            })
    }

    return (
        <div className="main-container">
            <div className='search-container'>
                <form onSubmit={onSearchPOSubmitHandler}>
                    <input type='text' name='PO' placeholder='Enter PO' className='search-field'/>
                    <input type='submit' className='search-btn' value='Search' />
                </form>
            </div>
            <hr></hr>
            <div className='main-buttons'>
                <div className='mainBtnsRow1'>

                    <label className='preview' htmlFor="upload-btn" >
                        <input id='upload-btn'  hidden type="file" name="file"  onChange={(e) => onUploadHandler(e.target.files)}></input>
                        <TbCloudUpload className='main-buttons-icon' />
                        <div className='main-button-label'>Upload</div>
                    </label>

                    <article className='preview'>
                        <MdManageHistory className='main-buttons-icon' />
                        <div className='main-button-label'>History</div>
                    </article>
                    <article className='preview'>
                        <AiOutlineAreaChart className='main-buttons-icon' />
                        <div className='main-button-label'>KPI</div>
                    </article>
                </div>
                <div className='mainBtnsRow2'>
                    <article className='preview'>
                        <GiReceiveMoney className='main-buttons-icon' />
                        <div className='main-button-label'>Savings</div>
                    </article>
                    <article className='preview'>
                        <HiOutlineDocumentSearch className='main-buttons-icon' />
                        <div className='main-button-label'>qScan</div>
                    </article>
                    <article className='preview'>
                        <BsPersonCheck className='main-buttons-icon' />
                        <div className='main-button-label'>Quality</div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default LandingView