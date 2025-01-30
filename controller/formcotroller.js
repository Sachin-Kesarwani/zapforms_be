let { formModel, formResponseModel } = require("../models/formModel");

async function createform(req, res) {
  let { title = "", description = "", fields = [], _id } = req.body;
  try {
    let payload = {
      title,
      description,
      fields,
      createdby: _id,
    };
    let savingdata = new formModel(payload);
    let savedData = await savingdata.save();
    res
      .status(200)
      .send({ Message: "Successfully created form", data: savedData });
  } catch (error) {
    res.status(500).send({ message: error._message });
  }
}

async function submitform(req, res) {
  const {
    formId = "",
    fieldResponse = {},
    isAnonymous = false,
    _id,
  } = req.body;

  try {
    const payload = {
      formId,
      submittedBy:_id,
      fieldResponse,
      isAnonymous,
      
    };
    const formResponse= new formResponseModel(payload)
   let d= await formResponse.save()
    res.status(200).send({message:"Form Submitted Successfully" , data:d})
  } catch (error) {
    res.status(500).send({ message: error._message });
  }
}
module.exports = { createform  , submitform};
