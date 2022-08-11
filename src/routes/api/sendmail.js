import sgMail from "@sendgrid/mail";
sgMail.setApiKey(import.meta.env.VITE_SENDGRID);

export async function post(event) {
      const data = await event.request.json();
      console.log(data);
      console.log(data.challengerName);
      let fromName = data.challengerName;
      let toName = data.challengedName;
      let toEmail = data.challengedEmail;
      const msg = {
        to: toEmail,
        from: "retofuga@gmail.com",
        subject: `${fromName} te ha invitado a participar en el Reto Fuga 2022`,
        text: `Saludos ${toName}`,
        html: `
        <table witdh="600px" style="text-align: center">
        <tr>
          <td style="font-size: 24px; font-family:Helvetica, background-color: #bbbbbb; paddding: 20px" >Hola <strong>${toName}</strong>, <strong>${fromName}<strong> te ha retado a competir en el Reto Fuga<br> a continuación encontrarás el poster con los detalles.</td>
        </tr>
        <tr>
        <td>
          <img src="http://mdsmx.xyz/fuga/wp-content/uploads/2022/07/poster.jpeg" style="max-width: 600px; width: 100%">
        </td>
        </tr>
        <tr>
        <td style="font-size: 24px; font-family:Helvetica">
        Visita <a style="color: #333" href='https://retofuga.com'>Reto Fuga</a> y descubre más
        </td>
        </tr>
        </table>`
      };
      console.log("Form submitted");
      const output = await sgMail.send(msg);
  return {
    body: output,
  };
}