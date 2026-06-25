const schedule = {
  name: "schedule",
  title: "Schedule",
  type: "document",
  fields: [
    { name: "date", title: "Date", type: "date" },
    { name: "title", title: "Class Title", type: "string" },
    { name: "time", title: "Time", type: "string" },
    {
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "Beginner" },
          { title: "Intermediate", value: "Intermediate" },
          { title: "Advanced", value: "Advanced" },
          { title: "All Levels", value: "All Levels" },
        ],
        layout: "dropdown",
      },
    },
    { name: "notes", title: "Notes", type: "text" },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 60 min",
    },
    {
      name: "instructor",
      title: "Instructor",
      type: "string",
    },
    {
      name: "capacity",
      title: "Capacity",
      type: "number",
    },
    {
      name: "locationType",
      title: "Location Type",
      type: "string",
      options: {
        list: [
          { title: "Studio", value: "Studio" },
          { title: "Online", value: "Online" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
};

export default schedule;
