import logo from './Adobe Express - file.png';
import logo2 from './Adobe Express - file.png';
import userImage from './Alex_student.jpg';

export const profile = { userImage };

export const assets = {
  logo,
  logo2

}
export const user =[
  {
    label: 'Name',
    value: 'John Doe',
  },
  {
    label: 'Student Id',
    value: 'S1234567',
  },
  {
    label: 'E-mail',
    value: 'johndoe@gmail.com',
  },
  {
    label: 'Level',
    value: 'Year 1',
  },
];
export const notes = [
  [
  {
    "id": 1,
    "title": "quis",
    "subtitle": "eu massa donec dapibus duis at velit eu est congue",
    "Image": logo,
    "instructor": "Dietrich Yashaev",
    "credits": 4
  }, 
  {
    "id": 2,
    "title": "vestibulum sed magna",
    "subtitle": "risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede",
    "Image": logo,
    "instructor": "Erwin Coney",
    "credits": 3
  }
  ],
  [
    {
      "id": 3,
      "title": "pede lobortis",
      "subtitle": "accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus",
      "Image": logo,
      "instructor": "Estel Clara",
      "credits": 2
    }, 
    {
      "id": 4,
      "title": "leo odio condimentum id luctus",
      "subtitle": "sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at",
      "Image": logo,
      "instructor": "Tedi Tuckey",
      "credits": 1
    }, 
    {
      "id": 5,
      "title": "ridiculus",
      "subtitle": "in felis donec semper sapien a libero nam dui proin leo odio porttitor id",
      "Image": logo,
      "instructor": "Ardelis Miroy",
      "credits": 2
  }
  ], 
  [
    {
    "id": 6,
    "title": "natoque penatibus",
    "subtitle": "vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
    "Image": logo,
    "instructor": "Nyssa Woodroofe",
    "credits": 5
    }, 
  {
    "id": 7,
    "title": "convallis morbi odio odio elementum",
    "subtitle": "integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo",
    "Image": logo,
    "instructor": "Corabel Pulbrook",
    "credits": 6
  }, {
    "id": 8,
    "title": "nunc viverra dapibus",
    "subtitle": "pede lobortis ligula sit amet eleifend pede libero quis orci nullam",
    "Image": logo,
    "instructor": "Helaina Mangeot",
    "credits": 3
  }
  ], 
  [
    {
      "id": 9,
      "title": "amet",
      "subtitle": "rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor",
      "Image": logo,
      "instructor": "Norby Grinaugh",
      "credits": 5
    }, 
    {
      "id": 10,
      "title": "nunc",
      "subtitle": "nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna",
      "Image": logo,
      "instructor": "Lusa Mimmack",
      "credits": 3
    }, 
  ],
  [
     {
      "id": 11,
      "title": "lectus in est risus",
      "subtitle": "tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa",
      "Image": logo,
      "instructor": "Berty Angless",
      "credits": 1
    }, {
      "id": 12,
      "title": "pede ac diam cras",
      "subtitle": "aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac",
      "Image": logo,
      "instructor": "Sully Grainge",
      "credits": 5
    }, {
      "id": 13,
      "title": "justo lacinia eget tincidunt",
      "subtitle": "proin at turpis a pede posuere nonummy integer non velit donec diam neque",
      "Image": logo,
      "instructor": "Elianora Yellop",
      "credits": 6
    }, {
      "id": 14,
      "title": "quisque id justo",
      "subtitle": "mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non",
      "Image": logo,
      "instructor": "Hillie Bibey",
      "credits": 1
    }
  ],
  [
    {
      "id": 15,
      "title": "eleifend donec ut dolor morbi",
      "subtitle": "vel est donec odio justo sollicitudin ut suscipit a feugiat",
      "Image": logo,
      "instructor": "Walsh Hodcroft",
      "credits": 1
    }, {
      "id": 16,
      "title": "in tempor",
      "subtitle": "eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem",
      "Image": logo,
      "instructor": "Sly Popley",
      "credits": 1
    }, {
      "id": 17,
      "title": "posuere felis sed lacus",
      "subtitle": "consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in",
      "Image": logo,
      "instructor": "Wileen Bestman",
      "credits": 1
    },
  ],  
  [
    {
      "id": 18,
      "title": "hac habitasse platea dictumst",
      "subtitle": "tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat",
      "Image": logo,
      "instructor": "Tracey Gudeman",
      "credits": 1
    }, {
      "id": 19,
      "title": "in ante vestibulum",
      "subtitle": "dapibus dolor vel est donec odio justo sollicitudin ut suscipit a",
      "Image": logo,
      "instructor": "Matthaeus Sneath",
      "credits": 4
    },
  ],
  [
    {
      "id": 20,
      "title": "vitae ipsum",
      "subtitle": "consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius",
      "Image": logo,
      "instructor": "Normie Robshaw",
      "credits": 6
    }
  ]
];

export const courses=[
  {
    id: 0,
    additional: [
      {
  "id": "CSC201",
  "title": "Introduction to Programming",
  "subtitle": "Learn the basics of programming using Python.",
  "notes": notes[0],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
  instructor: 'Dr. Sarah Johnson',
  color: 'from-blue-500 to-cyan-500',
  progress: 85,
  enrolled: true,
  credits: 3,
  semester: 'Fall 2024',
  score:85,
  schedule: 'Mon/Wed 10:00 AM - 11:30 AM',

  },
  {
  "id": "MAT101",
  "title": "Calculus I",
  "subtitle": "An introduction to differential and integral calculus.",
  "notes": notes[1],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Prof. Michael Chen',
    color: 'from-purple-500 to-pink-500',
    progress: 42,
    enrolled: true,
    credits: 4,
    semester: 'Fall 2024',
    score:88,
    schedule: 'Tue/Thu 2:00 PM - 3:30 PM'

},
  {
  "id": "PHY101",
  "title": "General Physics",
  "subtitle": "Fundamental concepts of mechanics, thermodynamics, and waves.",
  "notes": notes[2],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Dr. Emma Williams',
    color: 'from-green-500 to-emerald-500',
    progress: 0,
    enrolled: false,
    credits: 3,
    semester: 'Spring 2025',
    score:92,
    schedule: 'Mon/Fri 9:00 AM - 10:30 AM'

},
  {
  "id": "ENG201",
  "title": "English Literature",
  "subtitle": "Study of classic and modern English literature.",
  "notes": notes[3],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:90,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM'

},  
  {
  "id": "HIS101",
  "title": "World History",
  "subtitle": "Overview of major events in world history from ancient to modern times.",
  "notes": notes[4],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:82,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM'

},
  {
  "id": "BIO101",
  "title": "Introduction to Biology",
  "subtitle": "Basic principles of biology including cell structure, genetics, and evolution.",
  "notes": notes[5],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:79,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM'

},
  {
  "id": "CHE101",
  "title": "General Chemistry",
  "subtitle": "Fundamental concepts of chemistry including atomic structure and chemical reactions.",
  "notes": notes[6],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:80,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM'

},
  {
  "id": "ECO201",
  "title": "Microeconomics",
  "subtitle": "Study of individual economic agents and markets.",
  "notes": notes[7],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:86,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM',

}
    ]
  },
  {
    id: 1,
    additional: [
      {
  "id": "CSC201",
  "title": "Introduction to Programming",
  "subtitle": "Learn the basics of programming using Python.",    
  "notes": notes[0],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
  instructor: 'Dr. Sarah Johnson',
  color: 'from-blue-500 to-cyan-500',
  progress: 85,
  enrolled: true,
  credits: 3,
  semester: 'Fall 2024',
  score:35,
  schedule: 'Mon/Wed 10:00 AM - 11:30 AM',
  },
],
  },
  {
  id:2,
  additional: [    
     {
  "id": "MAT101",
  "title": "Calculus I",  
  "subtitle": "An introduction to differential and integral calculus.",
  "notes": notes[1],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Prof. Michael Chen',
    color: 'from-purple-500 to-pink-500',
    progress: 42,
    enrolled: true,
    credits: 4,
    semester: 'Fall 2024',
    score:88,
    schedule: 'Tue/Thu 2:00 PM - 3:30 PM'
},
{
  "id": "PHY101",
  "title": "General Physics",  
  "subtitle": "Fundamental concepts of mechanics, thermodynamics, and waves.",
  "notes": notes[2],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Dr. Emma Williams',
    color: 'from-green-500 to-emerald-500',
    progress: 0,
    enrolled: false,
    credits: 3,
    semester: 'Spring 2025',
    score:92,
    schedule: 'Mon/Fri 9:00 AM - 10:30 AM'
},
{
  "id": "ENG201",
  "title": "English Literature",
  "subtitle": "Study of classic and modern English literature.",

  "notes": notes[3],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:90,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM'
},
],
},
{
    id: 2,
    additional: [
      {
  "id": "HIS101",
  "title": "World History",
  "subtitle": "Overview of major events in world history from ancient to modern times.",
  "notes": notes[4],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:82,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM'
},
{
  "id": "BIO101",
  "title": "Introduction to Biology",
  "subtitle": "Basic principles of biology including cell structure, genetics, and evolution.",
  "notes": notes[5],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',  
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:79,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM'
},
{
  "id": "CHE101",
  "title": "General Chemistry",
  "subtitle": "Fundamental concepts of chemistry including atomic structure and chemical reactions.",
  "notes": notes[6],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:80,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM'
},
{
  "id": "ECO201",
  "title": "Microeconomics",
  "subtitle": "Study of individual economic agents and markets.",
  "notes": notes[7],
  link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
    instructor: 'Prof. Robert Davis',
    color: 'from-amber-500 to-orange-500',
    progress: 0,
    enrolled: false,
    credits: 4,
    semester: 'Spring 2025',
    score:86,
    schedule: 'Wed/Fri 1:00 PM - 2:30 PM',

},


  ],

  },

];

export const semesterSchedule = { 
  Week1: [ 
    { day: "Monday", time: "08:00 - 10:00", course: "Software Engineering", room: "Room 204", lecturer: "Dr. Li" }, 
    { day: "Tuesday", time: "10:00 - 12:00", course: "Data Structures", room: "Room 101", lecturer: "Prof. Wang" }, ],
  Week2: [ 
    { day: "Monday", time: "08:00 - 10:00", course: "Software Engineering", room: "Room 204", lecturer: "Dr. Li" }, 
    { day: "Wednesday", time: "14:00 - 16:00", course: "Operating Systems", room: "Room 305", lecturer: "Dr. Chen" }, ], 
  Week3: [ 
    { day: "Tuesday", time: "09:00 - 11:00", course: "Database Systems", room: "Lab 2", lecturer: "Dr. Zhang" }, 
    { day: "Friday", time: "08:00 - 10:00", course: "Software Testing", room: "Room 210", lecturer: "Prof. Liu" }, ], 
  Week4: [ 
    { day: "Thursday", time: "13:00 - 15:00", course: "Computer Networks", room: "Room 303", lecturer: "Dr. Huang" }, 
    { day: "Friday", time: "10:00 - 12:00", course: "Web Development", room: "Lab 1", lecturer: "Prof. Sun" }, ], 
  week5: [ 
    { day: "Monday", time: "11:00 - 13:00", course: "Mobile App Development", room: "Room 208", lecturer: "Dr. Gao" }, 
    { day: "Wednesday", time: "09:00 - 11:00", course: "Cloud Computing", room: "Room 402", lecturer: "Prof. Xu" }, ],  
};

export const semesters = [
    { id: 0, value: 'semester1', label: 'Semester 1' },
    { id: 1, value: 'semester2', label: 'Semester 2' },
    { id: 2, value: 'semester3', label: 'Semester 3' },
    { id: 3, value: 'semester4', label: 'Semester 4' },
  ];  

export const results = [
  {
    id: 0,
    data: courses[0].additional
  },
  {
    id: 1,
    data: courses[1].additional
  },
  {
    id:2,
    data: courses[2].additional
  },
  {
    id: 3,
    data: courses[3].additional
  },
]
// In your assets.js file
export const pdfDocuments = [
  {
    id: 1,
    title: 'Academic Transcript',
    fileName: 'transcript.pdf',
    description: 'Official academic transcript for all semesters',
    date: '2024-01-15'
  },
  // ... other documents
]