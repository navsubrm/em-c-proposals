import { fail, type ActionFailure } from '@sveltejs/kit';

const dev = false;

export async function newSubmissionHandler(
	requestData: App.NewProposalRequestData,
	platform: App.Platform
): Promise<
	{ success: true; proposal: App.NewProposalRequestData } | ActionFailure<App.NewProposalResponse>
> {}
