const router = require('express').Router()
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
const multer = require('multer');
const { uploadFile, getPoData, getFilteredPos, getFilteredById, updatePO } = require('../services/poService')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/Nowotny/Downloads/acqeTool/files');
  },
  filename: (req, file, cb) => {
    // console.log(file)
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage })

router.post("/uploadFile", upload.single('uploadFile'), async(req, res) => {
    const data = excelToJson({
      sourceFile: `C:/Users/Nowotny/Downloads/acqeTool/files/${req.file.filename}`,
      header:{
        rows: 1
      },
      columnToKey: {
        A: 'quoteResponsibility',
        B: 'PONumber',
        C: 'orderType',
        D: 'priority',
        E: 'text4',
        F: 'engineer',
        G: 'valueEngineer',
        H: 'ACQE',
        I: 'CPE',
        J: 'PE',
        K: 'CPG',
        L: 'PN',
        M: 'PNDescription',
        N: 'SN',
        O: 'supplierName',
        P: 'vendorCode',
        Q: 'VK13',
        R: 'VK13Currency',
        S: 'quotePrice',
        T: 'scrapFee',
        U: 'cust3LC'
      }
    });
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
        }
    const result = await uploadFile(data['Sheet1'])
    fs.unlinkSync(`C:/Users/Nowotny/Downloads/acqeTool/files/${req.file.filename}`)
    res.status(201).json(result);
})

router.get('/POs/:poNumber', async (req, res) => {
  const poData = await getPoData(req.params.poNumber)
  res.json(poData[0])
})

router.get('/POs/filteredByPN/:partNumber', async (req, res) => {
  const filteredPOs = await getFilteredPos(req.params.partNumber)
  res.json(filteredPOs)
})

router.get('/POs/filteredById/:id', async (req, res) => {
  const filteredById = await getFilteredById(req.params.id)
  res.json(filteredById)
})

router.put('/POs/update/:id', async (req, res) => {
  const original = await getFilteredById(req.params.id)

  const updated = {
    quoteResponsibility: req.body.quoteResponsibility,
    text4: req.body.text4,
    PONumber: req.body.PONumber,  
    orderType: req.body.orderType,
    priority: req.body.priority,
    vendorCode: req.body.vendorCode,
    supplierName: req.body.supplierName, 
    PN: req.body.PN,
    SN: req.body.SN,
    PNDescription: req.body.PNDescription,
    quoteReason: req.body.quoteReason,
    stockType: req.body.stockType,
    cust3LC: req.body.cust3LC,
    VK13: req.body.VK13,
    VK13Currency: req.body.VK13Currency,
    FMV: req.body.FMV,
    FMVCurrency: req.body.FMVCurrency,
    quotePrice: req.body.quotePrice,
    quotePriceCurrency: req.body.quotePriceCurrency,
    workscope: req.body.workscope,
    scrapFee: req.body.scrapFee,
    scrapFeeCurrency: req.body.scrapFeeCurrency,
    CIDCosts: req.body.CIDCosts,
    CIDCostsCurrency: req.body.CIDCostsCurrency,
    forwardedOn: req.body.forwardedOn,
    consultedOn: req.body.consultedOn,
    engineer: req.body.engineer,
    CPE: req.body.CPE,
    valueEngineer: req.body.valueEngineer,
    CPG: req.body.CPG,
    ACQE: req.body.ACQE,
    removalReason: req.body.removalReason,
    savingComment: req.body.savingComment,
    savingsEUR: req.body.savingsEUR,
    clarification: req.body.clarification,
    pepInfo: req.body.pepInfo
  }

  try {
    const result = await updatePO(original, updated)
    res.json(result);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;