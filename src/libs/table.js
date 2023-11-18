function astToDataTable(tableNode) {
    const data = [];
    for (const row of tableNode.children) {
        if (row.type === 'tableRow') {
        const rowData = [];
        for (const cell of row.children) {
            if (cell.type === 'tableCell') {
            const textNode = cell.children.find(child => child.type === 'text');
            if (textNode) {
                rowData.push(textNode.value);
            }
            }
        }

        data.push(rowData);
        }
    }

    return data;
}

export{
    astToDataTable
}
