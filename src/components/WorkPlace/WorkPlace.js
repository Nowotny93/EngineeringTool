import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as POsService from '../services/Services'
import { BiMessageSquareAdd } from "react-icons/bi"
import { FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';
import './WorkPlace.css'



const WorkPlace = () => {

    const params = useParams()
    const [PO, setPO] = useState([])

    useEffect(() => {
        POsService.getPObyPONumber(params.PONumber)
            .then(res => setPO(res))
    }, [])

    const [filteredPOs, setFilteredPOs] = useState([])

    useEffect(() => {
        POsService.getFilteredPOs(params.PN)
            .then(res => setFilteredPOs(res))
    }, [])


    const handleChange = (e) => {
        setPO({...PO, [e.target.name]: e.target.value})
    }

    const onPOEditSubmit = (e) => {
        e.preventDefault()
        POsService.updatePO(params.id, PO)
            .then(() => {
                console.log('UPDATED!')
                alert('PO updated!')
            })
    }

    const [historyPO, setHistoryPO] = useState([])

    const callPO = (e) => {
        let historyID = e.target.parentNode.getAttribute("value")
        if (historyID) {
            POsService.getPObyID(historyID)
                .then(res => setHistoryPO(res))
        }
    }

    const addRow = (e) => {
        e.preventDefault()
        let newTR = document.createElement('tr')
        newTR.className = 'modificationsTable-row'

        let newTDdocNum = document.createElement('td')
        newTDdocNum.className = 'docNum-trow'

        let newTDPrice = document.createElement('td')
        newTDPrice.className = 'price-trow'

        let newTDEvent = document.createElement('td')
        newTDEvent.className = 'event-trow'

        let newTDRR = document.createElement('td')
        newTDRR.className = 'RR-trow'

        let newTDAdd = document.createElement('td')
        newTDAdd.className = 'add-trow'

        let docNumINPUT = document.createElement('input')
        docNumINPUT.className = 'cellInput'

        let priceINPUT = document.createElement('input')
        priceINPUT.className = 'cellInput'

        let eventINPUT = document.createElement('input')
        eventINPUT.className = 'cellInput'

        let rrINPUT = document.createElement('input')
        rrINPUT.className = 'cellInput'

        let addINPUT = document.createElement('input')
        addINPUT.className = 'cellInput'
        addINPUT.type = 'checkbox'

        newTDdocNum.appendChild(docNumINPUT)
        newTDPrice.appendChild(priceINPUT)
        newTDEvent.appendChild(eventINPUT)
        newTDRR.appendChild(rrINPUT)
        newTDAdd.appendChild(addINPUT)

        newTR.appendChild(newTDdocNum)
        newTR.appendChild(newTDPrice)
        newTR.appendChild(newTDEvent)
        newTR.appendChild(newTDRR)
        newTR.appendChild(newTDAdd)

        let modsTable = document.getElementById('modificationsTable-body')
        modsTable.appendChild(newTR)
    }

    
    // const sortByNameAscending = (e) => {

    //     const allPOsCopy = [...allPOs]
    //     allPOsCopy.sort((a, b) => a.supplierName.localeCompare(b.supplierName))
    //     setAllPOs(allPOsCopy)

    // }

    // const sortByNameDescending = (e) => {

    //     const allPOsCopy = [...allPOs]
    //     allPOsCopy.sort((a, b) => b.supplierName.localeCompare(a.supplierName))
    //     setAllPOs(allPOsCopy)

    // }

    const [sorting, setSorting] = useState({ key: "", ascending: true, type: "" });

    useEffect(() => {
        const filteredPOsCopy = [...filteredPOs];

        const sortedPOs = filteredPOsCopy.sort((a, b) => {
            if (!a[sorting.key]) {
                alert('Column is empty. No sorting possible!')
            } else {
                if (sorting.type === "text"){
                    return a[sorting.key].localeCompare(b[sorting.key]);
                } else {
                    return (a[sorting.key] > b[sorting.key]) ? 1 : -1;
                }
            }

        });
    
        setFilteredPOs(
          sorting.ascending ? sortedPOs : sortedPOs.reverse()
        );

      }, [sorting]);


    function applySorting(key, ascending, type) {
        setSorting({ key: key, ascending: ascending, type: type });
      }



    return (
        <div className="fullScreen">
            <div className="splitLeft">
                
                <form onSubmit={onPOEditSubmit}>
                    <div className="informationSection">
                        <div className="informationSectionLeft">
                            <div className="hr-sect">General Info</div>

                            <div className="row1">
                                <label className='quoteResponsibility_text4'>Quote Resp.</label>
                                <input name="quoteResponsibility" size="4" defaultValue={PO.quoteResponsibility || ''} onChange={handleChange} />
                                <input name="text4" size="23" defaultValue={PO.text4 || ''} onChange={handleChange} />

                            </div>

                            <div className="row2">
                                <label className='POMainInfo'>Purch. Doc.</label>
                                <input name="PONumber" size="8" defaultValue={PO.PONumber || ''} onChange={handleChange}/>
                                <input name="orderType" size="1" defaultValue={PO.orderType || ''} onChange={handleChange}/>
                                <input name="priority" size="3" defaultValue={PO.priority || ''} onChange={handleChange}/>

                            </div>

                            <div className="row3">
                                <label className='vendorMainInfo'>Vendor</label>
                                <input name="vendorCode" size="5" defaultValue={PO.vendorCode || ''} onChange={handleChange}></input>
                                <input name="supplierName" size="22" defaultValue={PO.supplierName || ''} onChange={handleChange}></input>

                            </div>

                            <div className="row4">
                                <label className='PN'>Material</label>
                                <input name="PN" defaultValue={PO.PN || ''} onChange={handleChange}></input>

                            </div>

                            <div className="row5">
                                <label className='SN_Description'>SN</label>
                                <input name="SN" size="5" defaultValue={PO.SN || ''} onChange={handleChange}></input>
                                <input name="PNDescription" size="22" defaultValue={PO.PNDescription || ''} onChange={handleChange}></input>

                            </div>

                            <div className="row6">
                                <label className='quoteReason'>Quote Reas.</label>
                                <input name="quoteReason" size="10" defaultValue={PO.quoteReason || ''} onChange={handleChange}></input>
                                <select name="stockType" defaultValue="I" onChange={handleChange} value={PO.stockType || ''}>
                                    <option value="I">I</option>
                                    <option value="I(0BI)">I(0BI)</option>
                                    <option value="KN">KN</option>
                                    <option value="KN(0BI)">KN(0BI)</option>
                                </select>
                                <input name="cust3LC" size="4" value={PO.cust3LC || ''} onChange={handleChange}></input>
                            </div>



                            <div className="hr-sect">Prices</div>

                            <div className="row7">
                                <label className='VK13'>VK13 Price</label>
                                <input name="VK13" size="6" defaultValue={PO.VK13 || ''} onChange={handleChange}></input>
                                <select name="VK13Currency" defaultValue="EUR" onChange={handleChange} value={PO.VK13Currency || ''}>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>

                            </div>

                            <div className="row8">
                                <label className='FMV'>FMV</label>
                                <input name="FMV" size="6" defaultValue={PO.FMV || ''} onChange={handleChange}></input>
                                <select name="FMVCurrency" defaultValue="EUR" onChange={handleChange} value={PO.FMVCurrency || ''}>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>

                            </div>

                            <div className="row9">
                                <label className='quotePrice'>Quote Price</label>
                                <input type="text" name="quotePrice" size="6" defaultValue={PO.quotePrice || ''} onChange={handleChange}></input>
                                <select name="quotePriceCurrency" defaultValue="EUR" onChange={handleChange} value={PO.quotePriceCurrency || ''}>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>
                                <select name="workscope" defaultValue="Test" onChange={handleChange} value={PO.workscope || ''}>
                                    <option value="Test">Test</option>
                                    <option value="Repair">Repair</option>
                                    <option value="Overhaul">Overhaul</option>
                                    <option value="Modification">Modification</option>
                                    <option value="Exchange">Exchange</option>
                                    <option value="BER">BER</option>
                                </select>
                            </div>

                            <div className="row10">
                                <label className='scrapFee'>Scrap Price</label>
                                <input name="scrapFee" size="6" defaultValue={PO.scrapFee || ''} onChange={handleChange}></input>
                                <select name="scrapFeeCurrency" defaultValue="EUR" onChange={handleChange} value={PO.scrapFeeCurrency || ''}>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>

                            <div className="row11">
                                <label className='CIDCosts'>CID Costs</label>
                                <input name="CIDCosts" size="6" defaultValue={PO.CIDCosts || ''} onChange={handleChange}></input>
                                <select name="CIDCostsCurrency" defaultValue="EUR" onChange={handleChange} value={PO.CIDCostsCurrency || ''}>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>

                        <div className="informationSectionRight">

                            <div className="hr-sect">Contacts</div>

                            <div className="row1">
                                <label>Uploaded on</label>
                                <input name="uploadedOn" id='uploadedOn' size="8" defaultValue={PO.uploadedOn || ''}></input>
                                <span>by</span>
                                <input name="uploadedBy" size="16" defaultValue={PO.uploadedBy || ''}></input>

                            </div>

                            <div className="row2">
                                <label>Revised on</label>
                                <input name="revisedOn" id="revisedOn" size="8" defaultValue={PO.revisedOn || ''}></input>
                                <span>by</span>
                                <input name="revisedBy" size="16" defaultValue={PO.revisedBy || ''}></input>

                            </div>

                            <div className="row3">
                                <label className="forwardedOn">Forwarded on</label>
                                <input type="date" id="forwardedOn" name="forwardedOn" onChange={handleChange}></input>

                            </div>

                            <div className="row4">
                                <label className="consultedOn">Consulted on</label>
                                <input type="date" id="consultedOn" name="consultedOn" onChange={handleChange}></input>

                            </div>

                            <div className="row5">
                                <label className='engineerMainInfo'>Engineer</label>
                                <input name="engineer" id="engineer" size="11" defaultValue={PO.engineer || ''} onChange={handleChange}/>
                                <input name="CPE" id="CPE" size="2" defaultValue={PO.CPE || ''} onChange={handleChange}/>

                            </div>

                            <div className="row6">
                                <label className='valueEngineerMainInfo'>Val. Engineer</label>
                                <input name="valueEngineer" id="valueEngineer" size="11" defaultValue={PO.valueEngineer || ''} onChange={handleChange}/>
                                <input name="CPG" size="2" id="CPG" defaultValue={PO.CPG || ''} onChange={handleChange}></input>
                                <input name="ACQE" id="ACQE" size="11" defaultValue={PO.ACQE || ''} onChange={handleChange}/>
                            </div>

                            <div className="hr-sect">Modifications</div>

                            <div className='modificationsSection'>
                                {/* <label>Modifications</label> */}
                                <table className="modificationsTable">
                                    <thead className="modificationsTable-header">
                                        <tr>
                                            <th className="docNum-header">
                                                Doc Number
                                                <BiMessageSquareAdd className='addSB-btn' onClick={addRow} />
                                            </th>
                                            <th className="price-header">Price</th>
                                            <th className="event-header">Event</th>
                                            <th className="RR-header">RR</th>
                                            <th className="add-header">Add.</th>
                                        </tr>
                                    </thead>
                                    <tbody className="modificationsTable-body" id='modificationsTable-body'>
                                        {(PO.SBs || []).map((SB) => (
                                            <tr key={SB.id} className="modificationsTable-row">
                                                <td className='docNum-trow'><input defaultValue={SB.docNum || ''} className="cellInput" ></input></td>
                                                <td className='price-trow'><input defaultValue={SB.price || ''} className="cellInput" ></input></td>
                                                <td className='event-trow'><input defaultValue={SB.event || ''} className="cellInput" ></input></td>
                                                <td className='RR-trow'><input className="cellInput" name="RR" defaultValue={SB.RR || ''} ></input></td>
                                                <td className='add-trow'><input type="checkbox" className="cellInput" defaultValue={SB.add || ''} ></input></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>
                            <div className="clarificationSection">
                                <div className="hr-sect">Clarification</div>
                                <div className='row12'>
                                    <label className='removalReason'>Removal Reason
                                        <input name="removalReason" size="30" onChange={handleChange} defaultValue={PO.removalReason || ''}></input>
                                    </label>

                                    <label className='savingComment'>Saving Comment
                                        <input name="savingComment" size="30" onChange={handleChange} defaultValue={PO.savingComment || ''}></input>
                                    </label>

                                    <label className='savingsEUR'>Savings EUR
                                        <input name="savingsEUR" size="11" onChange={handleChange} defaultValue={PO.savingsEUR || ''}></input>
                                    </label>

                                    <div className="save-btn">
                                        <button>Submit</button>
                                    </div>
                                </div>

                                <div className='row13'>
                                    <div className="clarification">
                                        <label>Quote Description
                                            <textarea name="clarification" className="inline-txtarea1" defaultValue={PO.clarification || ''} onChange={handleChange}></textarea>
                                        </label>
                                    </div>

                                    <div className="pepInfo">
                                        <label>PEP Info
                                            <textarea name="pepInfo" className="inline-txtarea2" defaultValue={PO.pepInfo || ''} onChange={handleChange}></textarea>
                                        </label>
                                    </div>
                            </div>
                        </div>
                </form>
            </div>

            <div className="splitRight">
                <section>
                    
                    <div className="informationSection">
                        <div className="informationSectionLeft">

                            <div className="hr-sect">General Info</div>

                            <div className="row1">
                                    <label className='quoteResponsibility_text4'>Quote Resp.</label>
                                    <input name="quoteResponsibility" size="2" value={historyPO.quoteResponsibility ? historyPO.quoteResponsibility : ''} disabled/>
                                    <input name="text4" size="25" value={historyPO.text4 ? historyPO.text4 : ''} disabled/>                                
                            </div>

                            <div className="row2">
                                    <label className='POMainInfo'>Purch. Doc.</label>
                                    <input name="PONumber" size="8" value={historyPO.PONumber ? historyPO.PONumber : ''} disabled/>
                                    <input name="orderType" size="1" value={historyPO.orderType ? historyPO.orderType : ''} disabled/>
                                    <input name="priority" size="3" value={historyPO.priority ? historyPO.priority : ''} disabled/>                                
                            </div>

                            <div className="row3">
                                    <label className='vendorMainInfo'>Vendor</label>
                                    <input name="vendorCode" size="5" value={historyPO.vendorCode ? historyPO.vendorCode : ''} disabled></input>
                                    <input name="supplierName" size="22" value={historyPO.supplierName ? historyPO.supplierName : ''} disabled></input>
                            </div>

                            <div className="row4">
                                    <label className='PN'>Material</label>
                                    <input name="PN" value={historyPO.PN ? historyPO.PN : ''} disabled></input>
                            </div>

                            <div className="row5">
                                <label className='SN_Description'>SN</label>
                                    <input name="SN" size="5" value={historyPO.SN ? historyPO.SN : ''} disabled></input>
                                    <input name="PNDescription" size="22" value={historyPO.PNDescription ? historyPO.PNDescription : ''} disabled></input>
                            </div>

                            <div className="row6">
                                    <label className='quoteReason'>Quote Reas.</label>
                                    <input name="quoteReason" size="10" value={historyPO.quoteReason ? historyPO.quoteReason : ''} disabled/>
                                    <select name="stockType" value={historyPO.stockType ? historyPO.stockType : ''} disabled>
                                        <option value="I">I</option>
                                        <option value="I(0BI)">I(0BI)</option>
                                        <option value="KN">KN</option>
                                        <option value="KN(0BI)">KN(0BI)</option>
                                    </select>
                                    <input name="cust3LC" size="4" value={historyPO.cust3LC ? historyPO.cust3LC : ''} disabled></input>
                            </div>
                        

                            <div className="hr-sect">Prices</div>

                            <div className="row7">
                                <label className='VK13'>VK13 Price</label>
                                <input name="VK13" size="6" value={historyPO.VK13 ? historyPO.VK13 : ''} disabled></input>
                                <select name="VK13Currency" value={historyPO.VK13Currency ? historyPO.VK13Currency : ''} disabled>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>

                            <div className="row8">
                                <label className='FMV'>FMV</label>
                                <input name="FMV" size="6" value={historyPO.FMV ? historyPO.FMV : ''} disabled></input>
                                <select name="FMVCurrency" value={historyPO.FMVCurrency ? historyPO.FMVCurrency : ''} disabled>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>

                            <div className="row9">
                                <label className='quotePrice'>Quote Price</label>
                                <input type="text" name="quotePrice" size="6" value={historyPO.quotePrice ? historyPO.quotePrice : ''} disabled></input>
                                <select name="workscope" value={historyPO.workscope ? historyPO.workscope : ''} disabled>
                                    <option value="Test">Test</option>
                                    <option value="Repair">Repair</option>
                                    <option value="Overhaul">Overhaul</option>
                                    <option value="Modification">Modification</option>
                                    <option value="Exchange">Exchange</option>
                                    <option value="BER">BER</option>
                                </select>
                            </div>

                            <div className="row10">
                                <label className='scrapFee'>Scrap Price</label>
                                <input name="scrapFee" size="6" value={historyPO.scrapFee ? historyPO.scrapFee : ''} disabled></input>
                                <select name="scrapFeeCurrency" value={historyPO.scrapFeeCurrency ? historyPO.scrapFeeCurrency : ''} disabled>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>


                            <div className="row11">
                                <label className='CIDCosts'>CID Costs</label>
                                <input name="CIDCosts" size="6" value={historyPO.CIDCosts ? historyPO.CIDCosts : ''} disabled></input>
                                <select name="CIDCostsCurrency" value={historyPO.CIDCostsCurrency ? historyPO.CIDCostsCurrency : ''} disabled>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>

                        <div className="informationSectionRight">

                            <div className="hr-sect">Contacts</div>

                            <div className="row1">
                                    <label className='uploadedOn'>Uploaded on</label>
                                    <input name="uploadedOn" size="7" value={historyPO.uploadedOn ? historyPO.uploadedOn : ''} disabled></input>
                                    <span>by</span>
                                    <input name="uploadedBy" size="15" value={historyPO.uploadedBy ? historyPO.uploadedBy : ''} disabled></input>
                                
                            </div>

                            <div className="row2">
                                    <label>Revised on</label>
                                    <input id="revisedOn" name="revisedOn" size="7" value={historyPO.revisedOn ? historyPO.revisedOn : ''} disabled></input>
                                    <span>by</span>
                                    <input name="revisedBy" size="15" value={historyPO.revisedBy ? historyPO.revisedBy : ''} disabled></input>
                                
                            </div>

                            <div className="row3">
                                    <label className="forwardedOn">Forwarded on</label>
                                    <input type="date" id="forwardedOn" name="forwardedOn" value={historyPO.forwardedOn ? historyPO.forwardedOn : ''} disabled></input>
                                
                            </div>

                            <div className="row4">
                                    <label className="consultedOn">Consulted on</label>
                                    <input type="date" id="consultedOn" name="consultedOn" value={historyPO.consultedOn ? historyPO.consultedOn : ''} disabled></input>
                                
                            </div>
                            
                            <div className="row5">
                                    <label className='engineerMainInfo'>Engineer</label>
                                    <input id="engineer" name="engineer" size="10" value={historyPO.engineer ? historyPO.engineer : ''} disabled/>
                                    <input name="CPE" size="2" value={historyPO.CPE ? historyPO.CPE : ''} disabled/>
                                
                            </div>

                            <div className="row6">
                                    <label className='valueEngineerMainInfo'>Val. Engineer</label>
                                    <input id="valueEngineer" name="valueEngineer" size="10" value={historyPO.valueEngineer ? historyPO.valueEngineer : ''} disabled/>
                                    <input name="CPG" size="2" value={historyPO.CPG ? historyPO.CPG : ''} disabled></input>
                                    <input name="ACQE" size="10" value={historyPO.ACQE ? historyPO.ACQE : ''} disabled />
                            </div>


                            <div className="hr-sect">Modifications</div>

                            <div className='modificationsSection'>
                                {/* <label>Modifications</label> */}
                                <table className="modificationsTable">
                                    <thead className="modificationsTable-header">
                                        <tr>
                                            <th className="docNum-header">
                                                Doc Number
                                            </th>
                                            <th className="price-header">Price</th>
                                            <th className="event-header">Event</th>
                                            <th className="RR-header">RR</th>
                                            <th className="add-header">Add.</th>
                                        </tr>
                                    </thead>
                                    <tbody className="modificationsTable-body" id='modificationsTable-body'>
                                        {(historyPO.SBs || []).map((SB) => (
                                            <tr key={SB.id} className="modificationsTable-row">
                                                <td className='docNum-trow'><input value={SB.event ? SB.event : ''}  className="cellInput" disabled></input></td>
                                                <td className='price-trow'><input value={SB.price ? SB.price : ''}   className="cellInput" disabled></input></td>
                                                <td className='event-trow'><input value={SB.event ? SB.event : ''}   className="cellInput" disabled></input></td>
                                                <td className='RR-trow'><input  className="cellInput" name="RR" disabled></input></td>
                                                <td className='add-trow'><input type="checkbox"  className="cellInput" disabled></input></td>
                                            </tr> 
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div className="clarificationSection">
                        <div className="hr-sect">Clarification</div>
                        <div className='row12'>
                            <label className='removalReason'>Removal Reason
                                <input name="removalReason" size="30" value={historyPO.removalReason ? historyPO.removalReason : ''} disabled></input>
                            </label>

                            <label className='savingComment'>Saving Comment
                                <input name="savingComment" size="30" value={historyPO.savingComment ? historyPO.savingComment : ''} disabled></input>
                            </label>

                            <label className='savingsEUR'>Savings EUR
                                <input name="savingsEUR" size="11" value={historyPO.savingsEUR ? historyPO.savingsEUR : ''} disabled></input>
                            </label>

                            {/* <label className='confSaving'>Confirm
                                <input name="confSaving" type='checkbox' value={historyPO.confirmed}></input>
                            </label> */}
                        </div>

                        <div className='row13'>
                            <div className="clarification">
                                <label>Quote Description
                                    <textarea name="clarification" className="inline-txtarea1-history" value={historyPO.clarification ? historyPO.clarification : ''} disabled></textarea>
                                </label>
                            </div>

                            <div className="pepInfo">
                                <label>PEP Info
                                    <textarea name="pepInfo" className="inline-txtarea2-history" value={historyPO.pepInfo ? historyPO.pepInfo : ''} disabled></textarea>
                                </label>
                            </div>
                        </div>

                        <div className="filtersContainer">
                            <table className="filtersTable">
                                <thead className="filtersTable-header">
                                    <tr>
                                        <th>PO</th>
                                        <th>QR</th>
                                        <th>PN</th>
                                        <th>S. Type</th>
                                        <th onClick={() => applySorting("revisedOn", !sorting.ascending, "text")}>Date Rev.
                                            {/* <FaSortAlphaDown className='addSB-btn' onClick={sortByNameAscending} />
                                            <FaSortAlphaUpAlt className='addSB-btn' onClick={sortByNameDescending} /> */}
                                        </th>
                                        <th onClick={() => applySorting("supplierName", !sorting.ascending, "text")}>Supplier
                                            {/* <FaSortAlphaDown className='addSB-btn' onClick={sortByNameAscending} />
                                            <FaSortAlphaUpAlt className='addSB-btn' onClick={sortByNameDescending} /> */}
                                        </th>
                                        <th>Workscope</th>
                                        <th>SB</th>
                                        <th onClick={() => applySorting("quotePrice", !sorting.ascending, "number")}>Q. Total</th>
                                        <th>O. Type</th>
                                    </tr>
                                </thead>
                                <tbody className="filtersTable-body">
                                    {(filteredPOs).map((PO) => (
                                        <tr key={PO._id}  className="filtersTable-row" value={PO._id} onClick={callPO}>
                                            <td>{PO.PONumber}</td>
                                            <td>{PO.quoteResponsibility}</td>
                                            <td>{PO.PN}</td>
                                            <td>{PO.stockType}</td>
                                            <td>{PO.revisedOn}</td>
                                            <td>{PO.supplierName}</td>
                                            <td>{PO.workscope}</td>
                                            {PO.hasOwnProperty('SBs')?
                                            <td>Yes</td> :
                                            <td>No</td>
                                            }
                                            <td>{PO.quotePrice}</td>
                                            <td>{PO.orderType}</td>
                                        </tr> 
                                    ))} 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default WorkPlace