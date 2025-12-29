// config/emailTemplates.js

// ========================================
// 1. WELCOME EMAIL TEMPLATE - Blue & White Theme
// ========================================
export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to QuizCraft</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4ff;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #f0f4ff; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(37, 99, 235, 0.15);">
                    
                    <!-- Animated Header with Quiz Illustration -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 60px 40px; text-align: center; position: relative;">
                            <!-- Quiz Illustration SVG -->
                            <div style="margin-bottom: 20px;">
                                <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="60" cy="60" r="55" fill="rgba(255,255,255,0.2)" stroke="white" stroke-width="2"/>
                                    <path d="M60 25 L45 45 L35 40 L25 55 L35 70 L50 65 L60 80 L70 65 L85 70 L95 55 L85 40 L75 45 Z" fill="white" opacity="0.9"/>
                                    <circle cx="60" cy="60" r="15" fill="#60a5fa" stroke="white" stroke-width="3"/>
                                    <text x="60" y="70" text-anchor="middle" fill="white" font-size="24" font-weight="bold">?</text>
                                </svg>
                            </div>
                            
                            <h1 style="margin: 0; color: white; font-size: 48px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.1); letter-spacing: -1px;">
                                Welcome to QuizCraft! 🎉
                            </h1>
                            <p style="margin: 20px 0 0 0; color: rgba(255,255,255,0.95); font-size: 20px; font-weight: 400;">
                                Your Ultimate Learning Adventure Starts Now
                            </p>
                        </td>
                    </tr>

                    <!-- Content Section -->
                    <tr>
                        <td style="padding: 50px 40px; background: white;">
                            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                                <h2 style="margin: 0 0 15px 0; color: #2563eb; font-size: 28px; font-weight: 700;">
                                    Hey {{name}}! 👋
                                </h2>
                                <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.8;">
                                    We're absolutely thrilled to have you join the <strong style="color: #2563eb;">QuizCraft</strong> family! Get ready for an epic learning journey filled with exciting quizzes and challenges.
                                </p>
                            </div>

                            <p style="margin: 0 0 25px 0; color: #475569; font-size: 16px; line-height: 1.8;">
                                Your <strong style="color: #2563eb;">{{role}}</strong> account has been successfully created with:
                            </p>

                            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 16px; padding: 25px; margin: 30px 0; text-align: center; box-shadow: 0 4px 20px rgba(37, 99, 235, 0.2);">
                                <p style="margin: 0 0 8px 0; color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">
                                    📧 Your Email
                                </p>
                                <p style="margin: 0; color: white; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">
                                    {{email}}
                                </p>
                            </div>

                            <h3 style="margin: 40px 0 20px 0; color: #2563eb; font-size: 24px; font-weight: 700; display: flex; align-items: center;">
                                <span style="font-size: 32px; margin-right: 10px;">✨</span> What Awaits You
                            </h3>

                            <!-- Feature Cards -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px; background: #eff6ff; border-radius: 12px; margin-bottom: 15px;">
                                        <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                                            <strong style="color: #2563eb; font-size: 20px;">🎯</strong> Create unlimited custom quizzes
                                        </p>
                                    </td>
                                </tr>
                                <tr><td style="height: 15px;"></td></tr>
                                <tr>
                                    <td style="padding: 20px; background: #dbeafe; border-radius: 12px;">
                                        <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                                            <strong style="color: #1d4ed8; font-size: 20px;">📊</strong> Track your progress with analytics
                                        </p>
                                    </td>
                                </tr>
                                <tr><td style="height: 15px;"></td></tr>
                              
                                <tr><td style="height: 15px;"></td></tr>
                                <tr>
                                    <td style="padding: 20px; background: #dbeafe; border-radius: 12px;">
                                        <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                                            <strong style="color: #1d4ed8; font-size: 20px;">🎓</strong> Learn while having fun!
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <div style="text-align: center; margin: 50px 0 30px 0;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 18px 50px; border-radius: 50px; font-size: 18px; font-weight: 700; box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3); text-transform: uppercase; letter-spacing: 1px;">
                                    🚀 Start Your Journey
                                </div>
                            </div>

                            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-top: 30px;">
                                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.8; text-align: center;">
                                    💡 <em>We hope you absolutely love QuizCraft! If you need any help, our support team is always here for you.</em>
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 35px 40px; text-align: center;">
                            <p style="margin: 0 0 12px 0; color: #64748b; font-size: 14px; font-weight: 500;">
                                Crafted with ❤️ by the QuizCraft Team
                            </p>
                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                © 2024 QuizCraft. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;


// ========================================
// 2. EMAIL VERIFICATION TEMPLATE - Blue & White
// ========================================
export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4ff;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #f0f4ff; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(37, 99, 235, 0.15);">
                    
                    <!-- Header with Lock Animation -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 60px 40px; text-align: center; position: relative;">
                            <!-- Lock SVG Icon -->
                            <div style="margin-bottom: 20px;">
                                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="25" y="45" width="50" height="40" rx="5" fill="white" opacity="0.3" stroke="white" stroke-width="2"/>
                                    <rect x="30" y="50" width="40" height="30" rx="3" fill="white" opacity="0.9"/>
                                    <path d="M35 50 V35 Q35 25 50 25 Q65 25 65 35 V50" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
                                    <circle cx="50" cy="65" r="5" fill="#60a5fa"/>
                                    <rect x="48" y="65" width="4" height="10" rx="2" fill="#60a5fa"/>
                                </svg>
                            </div>
                            
                            <h1 style="margin: 0; color: white; font-size: 42px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.1); letter-spacing: -1px;">
                                Verify Your Email 🔐
                            </h1>
                            <p style="margin: 15px 0 0 0; color: rgba(255,255,255,0.95); font-size: 18px; font-weight: 600;">
                                One Last Step to Unlock QuizCraft
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 50px 40px; background: white;">
                            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                                <h2 style="margin: 0 0 15px 0; color: #2563eb; font-size: 26px; font-weight: 700;">
                                    Hi {{name}}! 👋
                                </h2>
                                <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.8;">
                                    To complete your QuizCraft registration and unlock all features, please verify your email address using the secure OTP code below.
                                </p>
                            </div>

                            <!-- Glowing OTP Box -->
                            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 20px; padding: 40px; margin: 40px 0; text-align: center; box-shadow: 0 8px 30px rgba(37, 99, 235, 0.3);">
                                <p style="margin: 0 0 15px 0; color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px;">
                                    🔐 VERIFICATION CODE
                                </p>
                                <p style="margin: 0; color: white; font-size: 56px; font-weight: 900; letter-spacing: 12px; text-shadow: 0 2px 10px rgba(0,0,0,0.2); font-family: 'Courier New', monospace;">
                                    {{otp}}
                                </p>
                                <p style="margin: 15px 0 0 0; color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 600;">
                                    Valid for 24 hours
                                </p>
                            </div>

                            <div style="background: #fef3c7; border-radius: 12px; padding: 20px 25px; margin: 30px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 15px; line-height: 1.7;">
                                    <strong style="color: #b45309;">⚠️ Security Notice:</strong> This OTP expires in 24 hours. Never share this code with anyone, including QuizCraft support staff.
                                </p>
                            </div>

                            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-top: 30px;">
                                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.7; text-align: center;">
                                    Didn't request this? You can safely ignore this email. Your account remains secure.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 35px 40px; text-align: center;">
                            <p style="margin: 0 0 12px 0; color: #64748b; font-size: 14px; font-weight: 500;">
                                🛡️ QuizCraft Security Team
                            </p>
                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                © 2024 QuizCraft. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;


// ========================================
// 3. PASSWORD RESET TEMPLATE - Blue & White
// ========================================
export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=content-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4ff;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #f0f4ff; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(37, 99, 235, 0.15);">
                    
                    <!-- Header with Key Icon -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 60px 40px; text-align: center; position: relative;">
                            <!-- Key SVG Icon -->
                            <div style="margin-bottom: 20px;">
                                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="70" cy="30" r="20" fill="white" opacity="0.3" stroke="white" stroke-width="3"/>
                                    <circle cx="70" cy="30" r="12" fill="white"/>
                                    <circle cx="70" cy="30" r="6" fill="#60a5fa"/>
                                    <rect x="20" y="28" width="45" height="4" rx="2" fill="white" opacity="0.9"/>
                                    <rect x="20" y="24" width="8" height="12" rx="2" fill="white" opacity="0.9"/>
                                    <rect x="32" y="26" width="6" height="8" rx="1" fill="white" opacity="0.9"/>
                                </svg>
                            </div>
                            
                            <h1 style="margin: 0; color: white; font-size: 42px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.1); letter-spacing: -1px;">
                                Password Reset 🔑
                            </h1>
                            <p style="margin: 15px 0 0 0; color: rgba(255,255,255,0.95); font-size: 18px; font-weight: 600;">
                                Secure Your QuizCraft Account
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 50px 40px; background: white;">
                            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                                <h2 style="margin: 0 0 15px 0; color: #2563eb; font-size: 26px; font-weight: 700;">
                                    Hi {{name}}! 👋
                                </h2>
                                <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.8;">
                                    We received a request to reset your QuizCraft password. Use the secure OTP code below to create a new password.
                                </p>
                            </div>

                            <!-- Urgent OTP Box -->
                            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 20px; padding: 40px; margin: 40px 0; text-align: center; box-shadow: 0 8px 30px rgba(37, 99, 235, 0.3);">
                                <p style="margin: 0 0 15px 0; color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px;">
                                    🔐 RESET CODE
                                </p>
                                <p style="margin: 0; color: white; font-size: 56px; font-weight: 900; letter-spacing: 12px; text-shadow: 0 2px 10px rgba(0,0,0,0.2); font-family: 'Courier New', monospace;">
                                    {{otp}}
                                </p>
                                <p style="margin: 15px 0 0 0; color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 600;">
                                    ⏰ Expires in 10 minutes
                                </p>
                            </div>

                            <div style="background: #fef3c7; border-radius: 12px; padding: 20px 25px; margin: 30px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 15px; line-height: 1.7;">
                                    <strong style="color: #b45309;">🚨 Critical Security Alert:</strong> This OTP expires in just 10 minutes. Never share this code with anyone - not even QuizCraft support!
                                </p>
                            </div>

                            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-top: 30px;">
                                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.7; text-align: center;">
                                    🛡️ Didn't request a password reset? Ignore this email. Your password will remain unchanged. Consider securing your account if this happens frequently.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 35px 40px; text-align: center;">
                            <p style="margin: 0 0 12px 0; color: #64748b; font-size: 14px; font-weight: 500;">
                                🛡️ QuizCraft Security Team
                            </p>
                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                © 2024 QuizCraft. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;