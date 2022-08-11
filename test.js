import sgMail from '@sendgrid/mail'

sgMail.setApiKey('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')
const msg = {
  to: 'agustindavid@gmail.com', // Change to your recipient
  from: 'retofuga@gmail.com', // Change to your verified sender
  subject: 'Hola, gracias por participar en Reto Fuga',
  text: 'Reto fuga es en Rioverde',
  html: 'Reto fuga es en bicicleta',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })