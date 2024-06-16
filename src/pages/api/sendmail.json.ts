import type { APIRoute } from 'astro';
import { Resend } from 'resend';
const resend = new Resend('re_Eu6GsHQU_P6if7tWpqGpd5DzKWtQ51P34');

export const POST: APIRoute = async ({ request }) => {
  // console.log(request.formData());
  const data = await request.json();
  console.log(data);

  console.log('hhhhhhhhhhhhhhhhhhhhhhhhhh data: ' + data.data.name);
  const name = data.data.name;
  const email = data.data.email;
  const phone = data.data.phone;
  const message = data.data.message;

  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  // Do something with the data, then return a success response
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['galdaninfotech@gmail.com'],
      subject: 'Online Enquiry from Website',
      text: `
      An online enquiry form has been sent from website with the following details: 

      Name:  ${name}, 
      Email:  ${email}, 
      Phone:  ${phone}, 

      Message: 
      ${message},
      `,
    
      headers: {
        'X-Entity-Ref-ID': '123456789',
      },
      tags: [
        {
          name: 'category',
          value: 'confirm_email',
        },
      ],
    });
    return new Response(
      JSON.stringify({
        message: "Success!"
      }),
      { status: 200 }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed!"
      }),
      { status: 500 }
    );
  }
  
};