<script>
	import { setTheme } from '$lib/config/setTheme';

	let theme = $state(setTheme('Two', 'theme'));
	let formTheme = $state(setTheme('Two', 'form'));
</script>

<section
	style="
	--_background: var({theme.one}); 
	--_text: var({theme.two}); 
	--_anchor: var({theme.three}); 
	--_bold: var({theme.four}); 
	--_success: var({formTheme.four}); 
	--_warn: var({formTheme.five}); 
	--_danger: var({formTheme.six})"
>
	<h3>ESC M&C Product Improvement Portal (Action Item List)</h3>
	<h4>What are all of the items you want for a proposal?</h4>

	<p>
		First item: I need to add a form for controlling my own proposals for the app so that I can
		segment items and manage my own development. That will be a good way to start since it will be
		long-term and I don't want to rush to finish. I may just have to use a paper system for awhile
		while I build the system.
	</p>

	<ul>
		<li class="strong">Title</li>
		<li class="remove">Mission Impact Executive Summary</li>
		<li class="strong">Detailed Problem Description</li>
		<li class="strong">
			Type: New / Iteration (if iteration extend original id. provide searchable drop down of new
			items to get ID.)
		</li>
		<li class="strong">Category: UX/Performance/Security/Automation/Bug/Feature</li>
		<li class="strong">Proposed Solution</li>
		<li class="auto-handled">Date Filed</li>
		<li class="auto-handled">Updated Date</li>
		<li class="auto-handled">Submitted By (Handle by user when access is controlled.)</li>
		<li class="approval-item">
			Approval Chain (Add in an array of approval objects with name, position, etc.) Create a method
			of electronic approval with password or some other check.
		</li>
		<li class="auto-handled">Approved Planning Increment (Handle by date with approval)</li>
		<li class="auto-handled">Completed Planning Increment (Handle by date when completed)</li>
		<li class="auto-handled">Closed Date (date will correlate to OA period.)</li>
		<li>After action analysis</li>
		<li class="approval-item">
			Notes for conversation on the item. (Probably an array on the existing object, or separate
			table associated by item ID and unique id.)
		</li>
	</ul>

	<h4>How to handle account creation:</h4>

	<ul>
		<li>Allow general account creation that requires verification to see anything in the app.</li>
		<li>Verifier will manage user details, (e.g. org, position, etc.)</li>
		<li>Some accounts can have full control to provide account assistance.</li>
		<li>Will need permission levels for CCB/Approver accounts.</li>
	</ul>

	<h4>Method to control access to item:</h4>
	<ul>
		<li>Set creator as owner with update/delete permissions. Others read-only.</li>
		<li>Approvers can approve/disapprove with comments, but cannot delete.</li>
		<li>Item is shareable with others to provide full control.</li>
		<li>May want to look at some level of item auth.</li>
	</ul>

	<h4>How do I want to manage rich text?</h4>

	<p>
		I need to find a package that allows for use of rich text in form entries. Some of these fields
		will need that kind of detail with a pre type display. Consider using Quill
		(https://quilljs.com/playground/form). It's an open source project for rich text.
	</p>

	<p>I will also want a PDF output for sharing.</p>

	<p>I will need a file upload for any supporting images etc.</p>
</section>

<style>
	section {
		background: var(--_background);
		padding: 2em;
		color: var(--_text);
	}

	.strong {
		font-weight: bold;
		color: var(--_bold);
	}

	.auto-handled {
		color: var(--_success);
	}

	.approval-item {
		color: var(--_warn);
	}

	.remove {
		color: var(--_danger);
	}
</style>
