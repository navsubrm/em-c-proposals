import controlMeta from '../../label/utils/controlMeta'

export default {
    placeholder: { 
        control: 'text',
        description: 'Enter input place holder.',
        table: { type: { summary: 'string' } },
    },
    value: {
        control: 'text',
        description: 'Value is a bindable variable that attaches to the input value.',
        table: { type: { summary: 'string' } },
    },
    multiple: { 
        control: 'boolean',
        description: 'Select whether the input accepts one or multiple options from the list.',
        table: { 
            type: { summary: 'string' },
            defaultValue: { summary: 'False' },
         },
    },
    items: { 
        control: 'object',
        description: 'An array of options as either strings, or objects with a label and value property.',
        table: { 
            type: { summary: 'object array' },
            defaultValue: { summary: '[]' },
         },
    },
    ...controlMeta
}