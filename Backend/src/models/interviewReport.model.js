const mongoose = require('mongoose')

/**
 * 
 * user provides:- 
 *      job description schema : String
 *      resume text : String
 *      self description : String
 *      matchScore: Number
 * 
 * 
 * 
 * 
 * AI generates:-
 *   1. Technical questions : [{
 *          question: "" (String),
 *          intention: "" (String),
 *          answer: "" (String)
 *      }] // store in the form of array
 * 
 * 
 *   2. Behavioral questions : [{
 *          question: "" (String),
 *          intention: "" (String),
 *          answer: "" (String)
 *      }] // store in the form of array
 * 
 * 
 * 
 *   3. skill gaps : [{
 * 
 *         skill: "" (String),  
 *         severity: {
 *             type : "" (String)
 *             enum: ["low", "medium", "high"]
 *         }
 *      }] // store in the form of array
 * 
 * 
 *   4. preparation plan : [{
 *        day: Number,
 *        focus: String,
 *        tasks: [String]
 * 
 *      }] // store in the form of array of objects with two keys:- skill and resources
 * 

 */


const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },

    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
},{
    _id: false // here we set ( _id -> false ) because we don't want to generate an _id for each technical question.
})


const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral question is required"]
    },

    intention: {
        type: String,
        required: [true, "Intention is required"]
    },

    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
},{
    _id : false 
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },

    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
},{
    _id : false 
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },

    focus: {
        type: String,
        required: [true, "Focus is required"]
    },

    tasks: [{
        type: String,
        required: [true, "Tasks are required"]
    }]
},{
    _id : false 
})  





const interviewReportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },

    resume:{
        type: String,
    },

    selfDescription: {
        type: String,
    },

    matchScore: {
        type: Number,
        min : 0,
        max : 100,

    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema], 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title: {
        type: String,
            required: [true, "Job title is required"]
    }  
},{
    timestamps: true   

})


const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)


module.exports = interviewReportModel

