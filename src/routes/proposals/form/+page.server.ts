import { newSubmissionHandler } from '$lib/server/newSubmissionHandler.js';
export async function load() {
	return {};
}

export const actions = {
	'new-proposal': async ({ request }) => {
		const formData: FormData = await request.formData();
		const requestData = Object.fromEntries(formData);
		const result = await newSubmissionHandler(requestData);

		console.log('Result from handler: ', result);
		return result;
	}
};
