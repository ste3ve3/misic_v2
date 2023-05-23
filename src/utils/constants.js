export function compareObj(obj1, obj2) {
    return Object.entries(obj2).reduce((acc, [key, value]) => {
        if (obj1[key] !== value) {
            acc[key] = value;
        }
        return acc;
    }, {});
}

export const COMMISSIONS = [
    {
        value: 'executive_committee',
        label: 'Executive Committee'
    },
    {
        value: 'administration_public_relations',
        label: 'Administration and Public Relations'
    },
    {
        value: 'secretarial_relations',
        label: 'Secretarial Relations'
    },
    { value: 'library_relations', label: 'Library Relations' }
];
