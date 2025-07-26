const mongoose = require("mongoose")
const DepartmentSchema = mongoose.Schema(
{
  name: {type: String , unique: true, required: true },
  description : {type:String },
  head_doctor_id: {type: mongoose.Schema.Types.ObjectId, ref: "Role" }
}
)
module.exports = mongoose.model('Department', DepartmentSchema);