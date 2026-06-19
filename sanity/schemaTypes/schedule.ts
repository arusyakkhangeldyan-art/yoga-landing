const schedule = {
    name: 'schedule',
    title: 'Schedule',
    type: 'document',
    fields: [
      { name: 'date', title: 'Date', type: 'date' },
      { name: 'title', title: 'Class Title', type: 'string' },
      { name: 'time', title: 'Time', type: 'string' },
      { name: 'level', title: 'Level', type: 'string' },
      { name: 'notes', title: 'Notes', type: 'text' }
    ]
  }
  
  export default schedule