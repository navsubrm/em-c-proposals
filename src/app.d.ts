// See https://svelte.dev/docs/kit/types#app.d.ts
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

	interface RequestData {
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
	}

	type FormError = { name: string; value: boolean };

	namespace App {
		// interface Platform {
		//     env: Env
		//     cf: CfProperties
		//     ctx: ExecutionContext
		// }
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
