<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TemplateSeeder extends Seeder
{
    public function run(): void
    {
        $admissionHTML = $this->getAdmissionHTML();
        $resultHTML = $this->getResultHTML();

        DB::table('templates')->updateOrInsert(
            ['name' => 'Admission Offer Letter'],
            [
                'description' => 'Official offer of admission to AACOHS with course details and next steps.',
                'html_content' => $admissionHTML,
                'category' => 'Admission',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('templates')->updateOrInsert(
            ['name' => 'Examination Result Notification'],
            [
                'description' => 'Notification of examination results for students with course grades.',
                'html_content' => $resultHTML,
                'category' => 'Academic',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }

    private function getAdmissionHTML(): string
    {
        return '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Admission Offer - AACOHS</title>
    <style>
        body { font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f5f7; margin: 0; padding: 0; color: #1e293b; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); position: relative; }

        .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center; color: #ffffff; }
        .header img { max-height: 50px; margin-bottom: 10px; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em; }
        .content { padding: 40px; }
        .content h2 { color: #4f46e5; font-size: 20px; font-weight: 600; margin-top: 0; }
        .content p { line-height: 1.6; font-size: 15px; margin-bottom: 20px; }
        .details-box { background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 25px; }
        .details-row { border-bottom: 1px solid #e2e8f0; padding: 10px 0; display: flex; justify-content: space-between; font-size: 14px; }
        .details-row:last-child { border-bottom: none; }
        .details-label { font-weight: 600; color: #64748b; }
        .details-value { font-weight: 600; color: #0f172a; }
        .cta-container { text-align: center; margin-top: 30px; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2); }
        .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Watermark Background -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: url(/images/logo-1.png); background-repeat: no-repeat; background-position: center; background-size: 300px; opacity: 0.04; z-index: 0; pointer-events: none;"></div>


        <div class="header">
            <h1>AACOHS</h1>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Alao Akala College of Health and Science</p>
        </div>
        <div class="content">
            <h2>OFFER OF ADMISSION</h2>
            <p>Dear <strong>[Student Name]</strong>,</p>
            <p>We are pleased to inform you that you have been offered provisional admission into <strong>Alao Akala College of Health and Science (AACOHS)</strong> for the 2026/2027 academic session.</p>
            
            <div class="details-box">
                <div class="details-row">
                    <span class="details-label">Course of Study:</span>
                    <span class="details-value">[Course Name]</span>
                </div>
                <div class="details-row">
                    <span class="details-label">Faculty:</span>
                    <span class="details-value">[Faculty Name]</span>
                </div>
                <div class="details-row">
                    <span class="details-label">Duration:</span>
                    <span class="details-value">[2 Years / 3 Years]</span>
                </div>
                <div class="details-row">
                    <span class="details-label">Resumption Date:</span>
                    <span class="details-value">[Date]</span>
                </div>
            </div>

            <p>Please note that this offer is subject to the verification of your qualifications and payment of the acceptance fee on or before <strong>[Acceptance Deadline]</strong>.</p>

            <div class="cta-container">
                <a href="[AcceptanceLink]" class="cta-button">Accept Offer & Pay Fees</a>
            </div>

            <p style="margin-top: 30px;">Congratulations once again on your admission. We look forward to welcoming you to our campus.</p>
            <p>Sincerely,</p>
            <p><strong>Registry Office</strong><br>AACOHS</p>
        </div>
        <div class="footer">
            © 2026 AACOHS. All rights reserved.<br>
            For inquiries, contact: info@aacohs.edu.ng | +234-XXX-XXXX
        </div>
    </div>
</body>
</html>';
    }

    private function getResultHTML(): string
    {
        return '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Examination Result - AACOHS</title>
    <style>
        body { font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f5f7; margin: 0; padding: 0; color: #1e293b; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); position: relative; }

        .header { background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em; }
        .content { padding: 40px; }
        .content h2 { color: #0284c7; font-size: 20px; font-weight: 600; margin-top: 0; }
        .student-info { font-size: 14px; color: #64748b; margin-bottom: 20px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 15px; }
        .result-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .result-table th { background-color: #f1f5f9; color: #0f172a; text-align: left; padding: 12px; font-size: 13px; font-weight: 600; }
        .result-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .result-table tr:last-child td { border-bottom: none; }
        .grade-badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-weight: 600; font-size: 12px; text-align: center; min-width: 25px; }
        .grade-a { background-color: #dcfce7; color: #166534; }
        .grade-b { background-color: #dbeafe; color: #1e3a8a; }
        .grade-c { background-color: #fef08a; color: #854d0e; }
        .footer-note { background-color: #f8fafc; border-radius: 8px; padding: 15px; font-size: 13px; color: #64748b; border: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Watermark Background -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: url(/images/logo-2.png); background-repeat: no-repeat; background-position: center; background-size: 300px; opacity: 0.04; z-index: 0; pointer-events: none;"></div>


        <div class="header">
            <h1>AACOHS</h1>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Examination Notification</p>
        </div>
        <div class="content">
            <h2>SEMESTER EXAMINATION RESULTS</h2>
            <div class="student-info">
                Name: <strong>[Student Name]</strong><br>
                Matric No: <strong>[MatricNumber]</strong><br>
                Semester: <strong>[Semester]</strong>
            </div>
            
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Title</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>[Code1]</td>
                        <td>[Title1]</td>
                        <td><span class="grade-badge grade-a">[A]</span></td>
                    </tr>
                    <tr>
                        <td>[Code2]</td>
                        <td>[Title2]</td>
                        <td><span class="grade-badge grade-b">[B]</span></td>
                    </tr>
                    <tr>
                        <td>[Code3]</td>
                        <td>[Title3]</td>
                        <td><span class="grade-badge grade-c">[C]</span></td>
                    </tr>
                </tbody>
            </table>

            <div class="footer-note">
                <strong>Note:</strong> This is an automatic notification. For official transcripts or inquiries regarding grades, please contact the Academic Office.
            </div>

            <p style="margin-top: 30px; line-height: 1.6;">If you have any questions, reply to this email or visit your portal.</p>
        </div>
    </div>
</body>
</html>';
    }
}
