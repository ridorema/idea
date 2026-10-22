import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function redirectTo(path, request) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

function getFormValue(formData, fieldName) {
  return String(formData.get(fieldName) ?? "").trim();
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: String(process.env.SMTP_SECURE ?? "false").toLowerCase() === "true",
    auth: {
      user,
      pass
    }
  });
}

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  if (Number(request.headers.get("content-length")) > 20000) {
    return new NextResponse("Message too large", { status: 413 });
  }
  const formData = await request.formData();
  const name = getFormValue(formData, "Name");
  const email = getFormValue(formData, "Email");
  const subject = getFormValue(formData, "Subject");
  const comment = getFormValue(formData, "Comment");

  if (!name || !email || !comment || name.length > 120 || subject.length > 200 || comment.length > 10000 || email.length > 254 || !/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(email) || /[\r\n]/.test(subject + name)) {
    return redirectTo("/contact-failed.html", request);
  }

  const contactEmail = process.env.CONTACT_EMAIL;
  const transporter = getTransporter();

  if (!contactEmail || !transporter) {
    console.warn(
      "Contact form submitted without SMTP configuration. Set CONTACT_EMAIL and SMTP_* variables to enable delivery."
    );
    return redirectTo("/contact-failed.html", request);
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: contactEmail,
      replyTo: email,
      subject: subject || `Mesazh i ri nga ${name}`,
      text: [
        `Emri: ${name}`,
        `Email: ${email}`,
        `Subjekti: ${subject || "-"}`,
        "",
        "Mesazhi:",
        comment
      ].join("\n")
    });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return redirectTo("/contact-failed.html", request);
  }

  return redirectTo("/contact-success.html", request);
}

export function GET(request) {
  return redirectTo("/contact.html", request);
}
