const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterViewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body

        let resumeText = ""
        if (req.file) {
            const resumeContent = await pdfParse(req.file.buffer)
            resumeText = resumeContent.text
        }

        if (!resumeText && !selfDescription?.trim()) {
            return res.status(400).json({ message: "Please provide a resume or self description." })
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        // console.log("AI RESULT:", JSON.stringify(interviewReportByAi, null, 2))

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interviewReportByAi,
            title: interviewReportByAi.title || interviewReportByAi.jobTitle || interviewReportByAi.position || "Untitled Position",
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })

    } catch (error) {
        console.error("generateInterViewReport error:", error)
        res.status(500).json({ message: error.message || "Internal server error" })
    }
}

async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found." })
        }

        res.status(200).json({ message: "Interview report fetched successfully.", interviewReport })
    } catch (error) {
        console.error("getInterviewReportById error:", error)
        res.status(500).json({ message: error.message || "Internal server error" })
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        res.status(200).json({ message: "Interview reports fetched successfully.", interviewReports })
    } catch (error) {
        console.error("getAllInterviewReports error:", error)
        res.status(500).json({ message: error.message || "Internal server error" })
    }
}

async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params
        const interviewReport = await interviewReportModel.findById(interviewReportId)

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found." })
        }

        const { resume, jobDescription, selfDescription } = interviewReport
        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)
    } catch (error) {
        console.error("generateResumePdf error:", error)
        res.status(500).json({ message: error.message || "Internal server error" })
    }
}

module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}







// async function generateInterViewReportController(req, res) {

//     try { /* const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()*/
//         const resumeContent = await pdfParse(req.file.buffer)
//         const { selfDescription, jobDescription } = req.body;



//         const interviewReportByAi = await generateInterviewReport({
//             resume: resumeContent.text,
//             selfDescription,
//             jobDescription
//         }) // Generate interview report using AI service

//         const interviewReport = await interviewReportModel.create({
//             user: req.user.id,
//             resume: resumeContent.text,
//             selfDescription,
//             jobDescription,
//             ...interviewReportByAi,

//             title: interviewReportByAi.title || interviewReportByAi.jobTitle || interviewReportByAi.position || "Untitled Position",

//         }) // Save the interview report to the database

//         res.status(201).json({
//             message: "Interview report generated successfully",
//             interviewReport
//         })
//     } catch (error) {
//         console.error("generateInterViewReport error:", error)
//         res.status(500).json({ message: error.message || "Internal server error" })

//     }
// }



//     /**
//      * @description Controller to get interview report by interviewId.
//      */
//     async function getInterviewReportByIdController(req, res) {

//         const { interviewId } = req.params

//         const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

//         if (!interviewReport) {
//             return res.status(404).json({
//                 message: "Interview report not found."
//             })
//         }

//         res.status(200).json({
//             message: "Interview report fetched successfully.",
//             interviewReport
//         })
//     }


//     /** 
//      * @description Controller to get all interview reports of logged in user.
//      */
//     async function getAllInterviewReportsController(req, res) {
//         const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

//         res.status(200).json({
//             message: "Interview reports fetched successfully.",
//             interviewReports
//         })
//     }


//     /**
//      * @description Controller to generate resume PDF based on user self description, resume and job description.
//      */
//     async function generateResumePdfController(req, res) {
//         const { interviewReportId } = req.params

//         const interviewReport = await interviewReportModel.findById(interviewReportId)

//         if (!interviewReport) {
//             return res.status(404).json({
//                 message: "Interview report not found."
//             })
//         }

//         const { resume, jobDescription, selfDescription } = interviewReport

//         const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

//         res.set({
//             "Content-Type": "application/pdf",
//             "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
//         })

//         res.send(pdfBuffer)
//     }

//     module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }




/*
install dependencies:

for handling file uploads and parsing PDF resumes, you can use the following npm packages:

        npm i multer // for handling file uploads (resumes)
        npm i pdf-parse // for parsing PDF resumes to extract relevant information from pdf files
            

*/