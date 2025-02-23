const mongoose = require("mongoose");
const { currentTimeInSeconds, currentTimeInMiliSeconds } = require("../utils");

// Define the form schema
const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdby: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    unique:false
  },
  fields: [
    {
      label: { type: String, required: true },
      type: { type: String, required: true  , required:true},
      required: { type: Boolean, default:false },
      placeholder: { type: String, required: false },
      options: [
        {
          // label: { type: String, required: true },
          value: { type: String, required: true },
        },
      ], // Changed to an array of objects with 'label' and 'value' fields      
      validation: Object
    },
  ]
});

const formResponseSchema  = new mongoose.Schema({
    formId:{type:String , required:true},
    submittedBy:{type:String , required:true},
    submittedAt: {
        type: String,
        unique: true,
        default: currentTimeInSeconds, // Auto-generate a UUID
      },
    fieldResponse:Object,
    isAnonymous:{
        type:Boolean,
        required:true,
        default:false
    }
})

const formModel=mongoose.model("form", formSchema);
const formResponseModel =mongoose.model("formResponse" , formResponseSchema)
module.exports = {formModel , formResponseModel}
