// See https://svelte.dev/docs/kit/types#app.d.ts

import type { UUID } from 'crypto';

// for information about these interfaces
declare global {
	type SelectInput = { value: string; label: string };

	type QuillInputValue = {
		text: string;
		styled: {
			ops: Delta[];
		};
		html: string;
	};

	type FormError = { name: string; value: boolean };

	namespace App {
		// interface Platform {
		//     env: Env
		//     cf: CfProperties
		//     ctx: ExecutionContext
		// }

		type NewProposalRequestData = {
			_id: UUID | FormDataEntryValue | string;
			last_name: FormDataEntryValue | string;
			first_name: FormDataEntryValue | string;
			email: FormDataEntryValue | string;
			position: FormDataEntryValue | string;
			organization: FormDataEntryValue | string;
			cost_savings: FormDataEntryValue | number;
			time_savings: FormDataEntryValue | number;
			title: FormDataEntryValue | string;
			system: FormDataEntryValue | SelectInput;
			type: FormDataEntryValue | SelectInput;
			category: FormDataEntryValue | SelectInput;
			priority: FormDataEntryValue | SelectInput;
			problem_statement: FormDataEntryValue | QuillInputValue;
			change_statement: FormDataEntryValue | QuillInputValue;
			mission_impact: FormDataEntryValue | QuillInputValue;
			other_considerations: FormDataEntryValue | QuillInputValue;
			date_filed: FormDataEntryValue | Date | null;
			date_approved: FormDataEntryValue | Date | null;
			status: FormDataEntryValue | SelectInput;
			projected_pi: FormDataEntryValue | number | null;
			completed_pi: FormDataEntryValue | number | null;
		};

		type NewProposalResponse = {
			proposal?: NewProposalRequestData;
			success?: boolean;
			fail?: boolean;
			first_name_missing?: boolean;
			last_name_missing?: boolean;
			email_missing?: boolean;
			position_missing?: boolean;
			organization_missing?: boolean;
			cost_savings_missing?: boolean;
			time_savings_missing?: boolean;
			title_missing?: boolean;
			system_missing?: boolean;
			type_missing?: boolean;
			category_missing?: boolean;
			priority_missing?: boolean;
			problem_statement_missing?: boolean;
			change_statement_missing?: boolean;
			mission_impact_missing?: boolean;
			other_considerations_missing?: boolean;
			unknown_error?: boolean;
			connection_error?: boolean;
		};
		interface Platform {
			env: {
				DB: D1Database;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
