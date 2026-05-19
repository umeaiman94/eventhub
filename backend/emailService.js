const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendRegistrationConfirmation = async ({ to, name, eventTitle, eventDate, eventLocation, eventTime }) => {
  const mailOptions = {
    from: `"EventHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ Registration Confirmed — ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080d14; color: #fff; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0099ff, #00e5ff); padding: 32px; text-align: center;">
          <h1 style="margin: 0; font-size: 2rem; font-weight: 900; color: #fff;">EventHub</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85);">Your registration is confirmed!</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #fff; margin: 0 0 8px;">Hi ${name}! 👋</h2>
          <p style="color: #aaa; line-height: 1.6; margin: 0 0 24px;">You have successfully registered for the following event!</p>
          <div style="background: #0d1a28; border: 1px solid #0f2e4e; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h3 style="color: #0099ff; margin: 0 0 16px;">${eventTitle}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 40%;">📅 Date</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${eventDate}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">🕐 Time</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${eventTime}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">📍 Location</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${eventLocation}</td></tr>
            </table>
          </div>
          <p style="color: #aaa; font-size: 0.85rem;">Please arrive on time. Contact us at support@eventhub.com</p>
        </div>
        <div style="background: #050a10; padding: 20px 32px; text-align: center; border-top: 1px solid #0f1e2e;">
          <p style="color: #555; font-size: 0.8rem; margin: 0;">© 2026 EventHub. Built with ❤️ in Pakistan</p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

const sendAttendeeWelcome = async ({ to, name }) => {
  const mailOptions = {
    from: `"EventHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎉 Welcome to EventHub, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080d14; color: #fff; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0099ff, #00e5ff); padding: 32px; text-align: center;">
          <h1 style="margin: 0; font-size: 2rem; font-weight: 900; color: #fff;">EventHub</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85);">Welcome to the community!</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #fff; margin: 0 0 8px;">Hi ${name}! 🎉</h2>
          <p style="color: #aaa; line-height: 1.6; margin: 0 0 24px;">Welcome to EventHub — your go-to platform for discovering and attending amazing events!</p>
          <div style="background: #0d1a28; border: 1px solid #0f2e4e; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h3 style="color: #0099ff; margin: 0 0 12px;">What you can do:</h3>
            <p style="color: #aaa; margin: 6px 0;">🔍 Browse and discover events near you</p>
            <p style="color: #aaa; margin: 6px 0;">🎟️ Register for events with one click</p>
            <p style="color: #aaa; margin: 6px 0;">📋 Track all your registrations</p>
            <p style="color: #aaa; margin: 6px 0;">🖼️ View post-event photo galleries</p>
          </div>
          <p style="color: #aaa; font-size: 0.85rem;">Questions? Contact us at support@eventhub.com</p>
        </div>
        <div style="background: #050a10; padding: 20px 32px; text-align: center; border-top: 1px solid #0f1e2e;">
          <p style="color: #555; font-size: 0.8rem; margin: 0;">© 2026 EventHub. Built with ❤️ in Pakistan</p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

const sendOrganizerWelcome = async ({ to, name, organization }) => {
  const mailOptions = {
    from: `"EventHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎉 Organizer Subscription Confirmed — EventHub`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080d14; color: #fff; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0099ff, #00e5ff); padding: 32px; text-align: center;">
          <h1 style="margin: 0; font-size: 2rem; font-weight: 900; color: #fff;">EventHub</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85);">Organizer Subscription Confirmed!</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #fff; margin: 0 0 8px;">Hi ${name}! 🏢</h2>
          <p style="color: #aaa; line-height: 1.6; margin: 0 0 24px;">
            Congratulations! Your organizer subscription for <strong style="color:#0099ff">${organization}</strong> has been confirmed.
          </p>
          <div style="background: #0d1a28; border: 1px solid #0f2e4e; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h3 style="color: #0099ff; margin: 0 0 12px;">Your subscription includes:</h3>
            <p style="color: #aaa; margin: 6px 0;">🎉 First event hosting is FREE</p>
            <p style="color: #aaa; margin: 6px 0;">📸 Post-event photo gallery uploads</p>
            <p style="color: #aaa; margin: 6px 0;">👥 Attendee registration management</p>
            <p style="color: #aaa; margin: 6px 0;">📊 Event analytics dashboard</p>
            <p style="color: #aaa; margin: 6px 0;">📧 Automated confirmation emails</p>
          </div>
          <p style="color: #aaa; font-size: 0.85rem;">Questions? Contact us at support@eventhub.com</p>
        </div>
        <div style="background: #050a10; padding: 20px 32px; text-align: center; border-top: 1px solid #0f1e2e;">
          <p style="color: #555; font-size: 0.8rem; margin: 0;">© 2026 EventHub. Built with ❤️ in Pakistan</p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

const sendNewEventNotification = async ({ to, name, eventTitle, eventCategory, eventDate, eventLocation, eventId }) => {
  const mailOptions = {
    from: `"EventHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎯 New Event Matching Your Interests — ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080d14; color: #fff; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0099ff, #00e5ff); padding: 32px; text-align: center;">
          <h1 style="margin: 0; font-size: 2rem; font-weight: 900; color: #fff;">EventHub</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85);">A new event matches your interests!</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #fff; margin: 0 0 8px;">Hi ${name}! 🎯</h2>
          <p style="color: #aaa; line-height: 1.6; margin: 0 0 24px;">A new event in your interest category <strong style="color:#0099ff">${eventCategory}</strong> has been posted!</p>
          <div style="background: #0d1a28; border: 1px solid #0f2e4e; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h3 style="color: #0099ff; margin: 0 0 16px;">${eventTitle}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 40%;">📅 Date</td><td style="padding: 8px 0; color: #fff;">${eventDate}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">📍 Location</td><td style="padding: 8px 0; color: #fff;">${eventLocation}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">🗂️ Category</td><td style="padding: 8px 0; color: #fff;">${eventCategory}</td></tr>
            </table>
          </div>
          <p style="color: #aaa; font-size: 0.85rem;">Login to EventHub to register for this event!</p>
        </div>
        <div style="background: #050a10; padding: 20px 32px; text-align: center; border-top: 1px solid #0f1e2e;">
          <p style="color: #555; font-size: 0.8rem; margin: 0;">© 2026 EventHub. Built with ❤️ in Pakistan</p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendRegistrationConfirmation,
  sendAttendeeWelcome,
  sendOrganizerWelcome,
  sendNewEventNotification,
};