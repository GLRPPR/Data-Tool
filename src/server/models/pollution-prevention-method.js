import mongoose, {Schema} from 'mongoose'

// Comes from table TRI_SOURCE_REDUCT_METHOD
const pollutionPreventionMethodSchema = new Schema({
  DOC_CTRL_NUM: Schema.Types.Mixed,
  //REDUCTION_SEQUENCE_NUM: Schema.Types.Mixed,
  SOURCE_REDUCT_ACTIVITY: Schema.Types.Mixed,
  SOURCE_REDUCT_METHOD_1: Schema.Types.Mixed,
  SOURCE_REDUCT_METHOD_2: Schema.Types.Mixed,
  SOURCE_REDUCT_METHOD_3: Schema.Types.Mixed,
  TRI_FACILITY_ID: String,
})

module.exports = mongoose.model(
  'POLLUTION_PREVENTION_METHOD',
   pollutionPreventionMethodSchema
 );
