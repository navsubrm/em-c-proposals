import { NODE_MAILER_USERNAME } from '$env/static/private';

export function contactMailObject(
	firstName: string | FormDataEntryValue | null,
	lastName: string | FormDataEntryValue | null,
	email: string | FormDataEntryValue | null,
	message: string | FormDataEntryValue | null,
	phone: string | FormDataEntryValue | null
) {
	return {
		from: `${email || NODE_MAILER_USERNAME}`,
		to: NODE_MAILER_USERNAME,
		subject: 'New request from CyberSMRT Contact Form',
		text: `
				Name: ${firstName} ${lastName}\n\n
				Email: ${email}\n\n
				Phone Number: ${phone}\n\n
				Message: ${message}`,
		html: `
				<p><strong style="font-size: 1.2em">Name: </strong> ${firstName} ${lastName}</p>
				<p><strong style="font-size: 1.2em">Email: </strong> ${email}</p>
				<p><strong style="font-size: 1.2em">Phone Number: </strong> ${phone}</p>
				<p><strong style="font-size: 1.2em">Message: </strong> ${message}</p>`
	};
}

export function consultationMailObject(
	firstName: string | FormDataEntryValue | null,
	lastName: string | FormDataEntryValue | null,
	email: string | FormDataEntryValue | null,
	message: string | FormDataEntryValue | null,
	phone: string | FormDataEntryValue | null,
	orgTypeValue: string | null,
	typeOther: string | FormDataEntryValue | null,
	employeeCount: string | FormDataEntryValue | null,
	interestArray: Array<string> | null
) {
	return {
		from: `${email || NODE_MAILER_USERNAME}`,
		to: NODE_MAILER_USERNAME,
		subject: 'New request from CyberSMRT Consultation Form',
		text: `
				Name: ${firstName} ${lastName}\n\n
				Email: ${email}\n\n
				Phone Number: ${phone}\n\n
				Facility Information: ${orgTypeValue}\n\n
				${typeOther !== undefined ? `Facility Type Details: ${typeOther}\n\n` : ''}
				Employee Count: ${employeeCount}\n\n
				Interests: ${interestArray?.join(', ')}\n\n
				Message: ${message}`,
		html: `
				<p><strong style="font-size: 1.2em">Name: </strong> ${firstName} ${lastName}</p>
				<p><strong style="font-size: 1.2em">Email: </strong> ${email}</p>
				<p><strong style="font-size: 1.2em">Phone Number: </strong> ${phone}</p>
				<p><strong style="font-size: 1.2em">Facility Information: </strong> ${orgTypeValue}</p>
				${
					typeOther !== undefined
						? `<p><strong style="font-size: 1.2em">Facility Details: </strong> ${typeOther}</p>`
						: ''
				}
				
				<p><strong style="font-size: 1.2em">Employee Count: </strong> ${employeeCount}</p>
				<p><strong style="font-size: 1.2em">Interests: </strong> ${interestArray?.join(', ')}</p>
				<p><strong style="font-size: 1.2em">Message: </strong> ${message}</p>`
	};
}

export async function applicationMailObject(
	firstName: string | FormDataEntryValue | null,
	lastName: string | FormDataEntryValue | null,
	email: string | FormDataEntryValue | null,
	message: string | FormDataEntryValue | null,
	phone: string | FormDataEntryValue | null,
	validation: string | FormDataEntryValue | null,
	resume: string | FormDataEntryValue | null
) {
	return {
		from: `${email || NODE_MAILER_USERNAME}`,
		to: NODE_MAILER_USERNAME,
		subject: 'New request from CyberSMRT Application Form',
		text: `
						Name: ${firstName} ${lastName}\n\n
						Email: ${email}\n\n
						Phone: ${phone}\n\n
						Validation Response: ${!validation ? 'Invalid' : 'Valid'}
						Message: ${message}`,
		html: `
						<p><strong style="font-size: 1.2em">Name: </strong> ${firstName} ${lastName}</p>
						<p><strong style="font-size: 1.2em">Email: </strong> ${email}</p>
						<p><strong style="font-size: 1.2em">Phone: </strong> ${phone}</p>
						<p><strong style="font-size: 1.2em">Validation Response: </strong> ${
							!validation ? 'Invalid' : 'Valid'
						}</p>
						<p><strong style="font-size: 1.2em">Message: </strong> ${message}</p>`,
		attachments: !resume
			? undefined
			: [
					{
						filename: resume?.name,
						contentType: resume.type,
						content: Buffer.from(await resume.arrayBuffer())
					}
				]
	};
}
