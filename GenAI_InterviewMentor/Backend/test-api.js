const fs = require("fs")
const path = require("path")

async function runTest() {
    const email = "testuser_test_api@example.com"
    const username = "testuser_test_api"
    const password = "Password123"

    console.log("1. Registering/checking test user...")
    let regRes = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    })
    let regData = await regRes.json()
    console.log("Registration response status:", regRes.status, regData.message)

    console.log("\n2. Logging in...")
    let loginRes = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    let loginData = await loginRes.json()
    console.log("Login response status:", loginRes.status, loginData.message)

    // Extract cookie
    const setCookie = loginRes.headers.get("set-cookie")
    if (!setCookie) {
        console.error("Failed to retrieve authentication cookie from login response.")
        return
    }
    const tokenCookie = setCookie.split(";")[0]
    console.log("Authentication cookie successfully retrieved.")

    // Define standard dummy PDF
    const pdfContent = Buffer.from(
`%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << >> >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
72 712 Td
(Hello World Resume Content. Expert in React.js and Node.js.) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000111 00000 n 
0000000212 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
307
%%EOF
`, "binary")

    console.log("\n--- TEST CASE 1: With Resume and Self-Description ---")
    const formData1 = new FormData()
    formData1.append("jobDescription", "Senior Developer with React and Node.js expertise.")
    formData1.append("selfDescription", "I have 3 years of experience in full-stack web development with React and Express.")
    const resumeBlob = new Blob([pdfContent], { type: "application/pdf" })
    formData1.append("resume", resumeBlob, "sample_resume.pdf")

    let reportRes1 = await fetch("http://localhost:3000/api/interview/", {
        method: "POST",
        headers: { "Cookie": tokenCookie },
        body: formData1
    })
    let reportData1 = await reportRes1.json()
    console.log("TEST CASE 1 status:", reportRes1.status)
    if (reportRes1.status === 201) {
        console.log("SUCCESS: Report created with ID:", reportData1.interviewReport?._id)
    } else {
        console.error("FAILED:", reportData1)
    }

    console.log("\n--- TEST CASE 2: Without Resume (Self-Description Only) ---")
    const formData2 = new FormData()
    formData2.append("jobDescription", "Backend Engineer with Node.js and Express experience.")
    formData2.append("selfDescription", "Experienced backend engineer. Strong in MongoDB and Express.")
    // Note: No resume file is appended to formData2

    let reportRes2 = await fetch("http://localhost:3000/api/interview/", {
        method: "POST",
        headers: { "Cookie": tokenCookie },
        body: formData2
    })
    let reportData2 = await reportRes2.json()
    console.log("TEST CASE 2 status:", reportRes2.status)
    if (reportRes2.status === 201) {
        console.log("SUCCESS: Report created with ID:", reportData2.interviewReport?._id)
    } else {
        console.error("FAILED:", reportData2)
    }
}

runTest().catch(console.error)
