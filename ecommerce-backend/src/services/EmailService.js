// TODO: install nodemailer & nodemailer-plugin-inline-base64 to enable email
const nodemailer = require('nodemailer')
const inlineBase64 = require('nodemailer-plugin-inline-base64')

const sendEmailCreateOrder = async (email, orderItems) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  })
  transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }))

  let listItem = ''
  const attachImage = []
  orderItems.forEach((order) => {
    listItem += `<div>
    <div>
      You have ordered <b>${order.name}</b> with quantity: <b>${order.amount}</b> and price: <b>$${order.price}</b></div>
      <div>Below is the product image</div>
    </div>`
    attachImage.push({ path: order.image })
  })

  await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT,
    to: email,
    subject: "Your order has been placed successfully",
    text: "Hello!",
    html: `<div><b>Your order has been placed successfully at our shop</b></div> ${listItem}`,
    attachments: attachImage,
  })
}

module.exports = {
  sendEmailCreateOrder
}