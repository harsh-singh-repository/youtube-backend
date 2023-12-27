import mongoose,{Schema} from "mongoose";
import mongooseAggrigatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
       videoFile:{
        type:String, //Cloudnary URL
        required:true
       },
       thumbanail:{
          type:String,  //Cloudnary URL
          required:true
       },
       title:{
        type:String,
        required:true,
       },
       description:{
        type:String,
        required:true,
       },
       duration:{
        type:Number,  //Cloudnary URL
        required:true,
       },
       views:{
        type:Number,
         default:0
       },
       isPublished:{
        type:Boolean,
        required:true
       },
       owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
       }
    },{
        timestamps:true,
    }
)

videoSchema.plugin(mongooseAggrigatePaginate);
export const Video = mongoose.model("Video",videoSchema);