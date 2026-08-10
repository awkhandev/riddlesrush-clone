import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, riddle, answer } = body;

    if (!riddle || !answer) {
      return NextResponse.json(
        { error: "Riddle and answer are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "riddlesrush1@gmail.com",
      subject: `New Riddle Submission${name ? ` from ${name}` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7736FE;">New Riddle Submission</h2>
          ${name ? `<p><strong>From:</strong> ${name}</p>` : ""}
          <hr style="border: 1px solid #eee;" />
          <p><strong>Riddle:</strong></p>
          <p style="background: #f9f9f9; padding: 12px; border-radius: 8px;">${riddle}</p>
          <p><strong>Answer:</strong></p>
          <p style="background: #f0fff0; padding: 12px; border-radius: 8px;">${answer}</p>
          <hr style="border: 1px solid #eee;" />
          <p style="color: #888; font-size: 12px;">Submitted via Riddles Rush website</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
