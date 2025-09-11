export default {
    label: { 
        control: 'text',
        description: 'Enter button label.',
        table: { type: { summary: 'string' } },
    },
    onclick: {
        control: 'function',
        description: 'Function input for form handling. (optional)',
        table: { type: { summary: 'function' } },
    }
}