// Helper function to wrap the table cell's contents in a new div for styling purposes
const wrapTableCell = (cell) => {
  if (!cell.classList.contains('processed')) {
    const wrapper = document.createElement('div')
    wrapper.className = 'better-harvest__week-view-cell'
    while (cell.firstChild) {
      wrapper.appendChild(cell.firstChild)
    }
    cell.appendChild(wrapper)
    cell.classList.add('processed')
  }
}

// Observe changes in the DOM
const observeTableCells = () => {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const cells = node.querySelectorAll('tr.week-view-entry > td:first-child div.entry-project')
          cells.forEach((div) => {
            const cell = div.closest('td')
            if (cell) {
              wrapTableCell(cell)
            }
          })
        }
      })
    })
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

// Start observing when the content script loads
observeTableCells()