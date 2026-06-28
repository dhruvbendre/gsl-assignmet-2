import { Course } from '../types';

export const arduinoCourse: Course = {
  id: 'arduino-soil-moisture',
  title: 'Arduino Soil Moisture Detector',
  description: 'An Arduino Soil Moisture Detector measures soil moisture and is commonly used for Smart Irrigation, Plant Monitoring, and Automatic Watering Systems.',
  totalXP: 275,
  badge: 'Arduino Soil Guardian',
  chapters: [
    {
      id: 'ch1',
      number: 1,
      title: 'Introduction to Arduino',
      learningObjective: 'Understand what Arduino is and why it\'s awesome for building cool projects!',
      explanation: 'Arduino is like a mini-computer that you can program to do amazing things! It\'s a small board with a brain (microcontroller) that can control lights, motors, sensors, and so much more. Think of it as LEGO for electronics - you can build anything you imagine!',
      stemConcept: 'Microcontrollers are tiny computers that control electronic devices. They\'re in your phone, your smartwatch, and even your refrigerator!',
      funFact: 'The Arduino was invented in 2005 in Italy. The name comes from a bar where the founders used to meet!',
      miniActivity: 'Look around your house and count how many devices might have a microcontroller inside them. Hint: anything "smart" probably has one!',
      realWorldExample: 'Arduino is used in NASA space projects, art installations, robotics competitions, and even in monitoring endangered species in the wild!',
      quiz: {
        id: 'quiz1',
        chapterId: 'ch1',
        xpReward: 10,
        questions: [
          {
            id: 'q1-1',
            question: 'What is Arduino?',
            options: [
              'A type of candy',
              'A programmable microcontroller board',
              'A video game',
              'A programming language'
            ],
            correctAnswer: 1,
            explanation: 'Arduino is a programmable microcontroller board that can be used to build electronic projects!'
          },
          {
            id: 'q1-2',
            question: 'What makes Arduino special for beginners?',
            options: [
              'It\'s expensive',
              'It\'s complicated',
              'It\'s easy to learn and use',
              'It only works with robots'
            ],
            correctAnswer: 2,
            explanation: 'Arduino is designed to be beginner-friendly with an easy-to-use programming environment!'
          },
          {
            id: 'q1-3',
            question: 'Where was Arduino invented?',
            options: [
              'United States',
              'Japan',
              'China',
              'Italy'
            ],
            correctAnswer: 3,
            explanation: 'Arduino was invented in Italy in 2005!'
          }
        ]
      }
    },
    {
      id: 'ch2',
      number: 2,
      title: 'Understanding Soil Moisture',
      learningObjective: 'Learn why measuring soil moisture is important for plants and the environment.',
      explanation: 'Soil moisture is the amount of water held in the soil. Plants need just the right amount - not too much, not too little! Too much water can drown plant roots, while too little makes them thirsty and unable to grow. By measuring soil moisture, we can water plants at exactly the right time!',
      stemConcept: 'Moisture measurement uses electrical conductivity - wet soil conducts electricity better than dry soil because water helps electrons move through the soil.',
      funFact: 'Farmers use soil moisture sensors to save millions of gallons of water every year by only watering when plants actually need it!',
      miniActivity: 'Try this: Touch completely dry soil, then touch wet soil. Can you feel the difference? That\'s what our sensor will detect electronically!',
      realWorldExample: 'Golf courses use soil moisture sensors to keep grass perfect while using 30-50% less water. That\'s millions of gallons saved!',
      quiz: {
        id: 'quiz2',
        chapterId: 'ch2',
        xpReward: 10,
        questions: [
          {
            id: 'q2-1',
            question: 'Why is soil moisture important for plants?',
            options: [
              'Plants need the right amount of water to grow',
              'Plants don\'t need water',
              'Only decorative plants need water',
              'Soil moisture doesn\'t matter'
            ],
            correctAnswer: 0,
            explanation: 'Plants need the perfect balance of water - not too much, not too little!'
          },
          {
            id: 'q2-2',
            question: 'What happens if soil has too much water?',
            options: [
              'Plants grow faster',
              'Nothing happens',
              'Plant roots can drown',
              'The soil becomes healthier'
            ],
            correctAnswer: 2,
            explanation: 'Too much water can drown plant roots by preventing them from getting oxygen!'
          },
          {
            id: 'q2-3',
            question: 'How does a soil moisture sensor work?',
            options: [
              'It measures temperature',
              'It weighs the soil',
              'It counts water droplets',
              'It uses electrical conductivity'
            ],
            correctAnswer: 3,
            explanation: 'Soil moisture sensors use electrical conductivity - wet soil conducts electricity better than dry soil!'
          }
        ]
      }
    },
    {
      id: 'ch3',
      number: 3,
      title: 'Components Overview',
      learningObjective: 'Identify all the parts needed to build a soil moisture detector.',
      explanation: 'Building our project requires several components: Arduino board (the brain), soil moisture sensor (the detective that checks wetness), jumper wires (the messengers that carry signals), breadboard (a practice board for connecting things), and a LED (a light that shows the status). Each part has a special job!',
      stemConcept: 'Electronic circuits are like a team - each component has a role, and they all work together to accomplish a task. Just like a sports team needs different positions!',
      funFact: 'A breadboard is called that because people used to build circuits on actual wooden bread cutting boards in the early days of electronics!',
      miniActivity: 'Draw a simple diagram showing how you think the components might connect to each other.',
      realWorldExample: 'Your smartphone has hundreds of components working together - processor, screen, battery, sensors - just like our moisture detector, but more complex!',
      quiz: {
        id: 'quiz3',
        chapterId: 'ch3',
        xpReward: 10,
        questions: [
          {
            id: 'q3-1',
            question: 'What is the role of the Arduino board?',
            options: [
              'It measures moisture',
              'It is the brain that processes information',
              'It lights up',
              'It stores water'
            ],
            correctAnswer: 1,
            explanation: 'The Arduino board is the brain of the project - it processes information from the sensor!'
          },
          {
            id: 'q3-2',
            question: 'What does the soil moisture sensor do?',
            options: [
              'It waters the plants',
              'It measures temperature',
              'It provides power',
              'It detects how wet the soil is'
            ],
            correctAnswer: 3,
            explanation: 'The soil moisture sensor detects the wetness level of the soil!'
          },
          {
            id: 'q3-3',
            question: 'Why is a breadboard useful?',
            options: [
              'To practice connecting components without soldering',
              'To cut bread',
              'To store components',
              'To power the Arduino'
            ],
            correctAnswer: 0,
            explanation: 'A breadboard lets you connect components temporarily without soldering, making it perfect for learning!'
          }
        ]
      }
    },
    {
      id: 'ch4',
      number: 4,
      title: 'Arduino Basics',
      learningObjective: 'Master the fundamental concepts of Arduino programming.',
      explanation: 'Arduino programs (called "sketches") have two main parts: setup() runs once when the Arduino starts, and loop() runs over and over forever! Think of setup() as getting ready for a race, and loop() as running laps. We also use pinMode() to tell Arduino if a pin is an input (receiving info) or output (sending signals).',
      stemConcept: 'Programming is giving exact instructions to a computer. Computers are super fast but not smart - they only do exactly what you tell them!',
      funFact: 'The Arduino language is based on C++, one of the most powerful programming languages in the world. Learning Arduino is your first step into professional programming!',
      miniActivity: 'Write pseudocode (instructions in plain English) for your morning routine. This is how programmers plan before coding!',
      realWorldExample: 'Video games use loops just like Arduino - the game checks for button presses and updates the screen 60 times every second!',
      quiz: {
        id: 'quiz4',
        chapterId: 'ch4',
        xpReward: 10,
        questions: [
          {
            id: 'q4-1',
            question: 'What does the setup() function do?',
            options: [
              'Runs continuously',
              'Stores data',
              'Runs once at the start',
              'Turns off the Arduino'
            ],
            correctAnswer: 2,
            explanation: 'setup() runs once when the Arduino starts - perfect for initial configuration!'
          },
          {
            id: 'q4-2',
            question: 'What does the loop() function do?',
            options: [
              'Runs continuously forever',
              'Runs once',
              'Only runs when you press a button',
              'Saves your program'
            ],
            correctAnswer: 0,
            explanation: 'loop() runs over and over continuously - this is where your main program lives!'
          },
          {
            id: 'q4-3',
            question: 'What is pinMode() used for?',
            options: [
              'To name your Arduino',
              'To turn pins on and off',
              'To measure voltage',
              'To set whether a pin is input or output'
            ],
            correctAnswer: 3,
            explanation: 'pinMode() tells Arduino whether a pin should receive information (INPUT) or send signals (OUTPUT)!'
          }
        ]
      }
    },
    {
      id: 'ch5',
      number: 5,
      title: 'Circuit Design',
      learningObjective: 'Understand how to design a circuit that connects all components safely.',
      explanation: 'A circuit is a complete path for electricity to flow. It\'s like a race track - the electricity needs to go from the power source, through all the components, and back home! Our circuit connects the Arduino\'s power (5V) to the sensor, the sensor\'s signal to Arduino\'s analog pin, and everything shares a common ground (like a shared return path).',
      stemConcept: 'Electricity flows in circles (circuits). If the path is broken anywhere, nothing works - just like water in a pipe needs a complete path to flow!',
      funFact: 'The word "circuit" comes from Latin meaning "to go around." Electric circuits literally make electricity go around in a circle!',
      miniActivity: 'Draw a simple circuit diagram on paper. Use + for power, - for ground, and boxes for components. This skill helps you plan before building!',
      realWorldExample: 'Every electrical device in your house has carefully designed circuits - even a simple light switch creates a circuit when you flip it on!',
      quiz: {
        id: 'quiz5',
        chapterId: 'ch5',
        xpReward: 10,
        questions: [
          {
            id: 'q5-1',
            question: 'What is a circuit?',
            options: [
              'A broken wire',
              'A complete path for electricity to flow',
              'A type of battery',
              'A programming language'
            ],
            correctAnswer: 1,
            explanation: 'A circuit is a complete path that allows electricity to flow from the power source through components and back!'
          },
          {
            id: 'q5-2',
            question: 'What is ground (GND) in a circuit?',
            options: [
              'The dirt outside',
              'The top of the circuit',
              'The common return path for electricity',
              'A broken connection'
            ],
            correctAnswer: 2,
            explanation: 'Ground is the common return path that completes the circuit - like the finish line all electricity returns to!'
          },
          {
            id: 'q5-3',
            question: 'Why is it important to design circuits carefully?',
            options: [
              'To ensure components work safely and correctly',
              'It\'s not important',
              'To make it look pretty',
              'To use more wires'
            ],
            correctAnswer: 0,
            explanation: 'Careful circuit design ensures all components get the right voltage and current to work safely!'
          }
        ]
      }
    },
    {
      id: 'ch6',
      number: 6,
      title: 'Wiring Connections',
      learningObjective: 'Learn the correct way to wire the soil moisture sensor to Arduino.',
      explanation: 'Wiring is connecting components with jumper wires. Our sensor has three connections: VCC (power - connect to Arduino 5V), GND (ground - connect to Arduino GND), and SIG (signal - connect to Arduino A0). Colors help: red for power, black for ground, and other colors for signals. Always double-check connections before powering on!',
      stemConcept: 'Color coding in electronics is a universal language. Red almost always means power (+), black means ground (-), and other colors carry signals. This helps prevent mistakes!',
      funFact: 'Engineers use color codes to avoid mistakes. In big projects with thousands of wires, color coding can save hours of troubleshooting!',
      miniActivity: 'Practice identifying wires by color. Look at cables around your house - can you spot the color patterns?',
      realWorldExample: 'Airplanes use thousands of color-coded wires. Mechanics can quickly find the right wire even in tight spaces thanks to color coding!',
      quiz: {
        id: 'quiz6',
        chapterId: 'ch6',
        xpReward: 10,
        questions: [
          {
            id: 'q6-1',
            question: 'What does VCC on the sensor mean?',
            options: [
              'Very Cold Connection',
              'Video Cable Connection',
              'Voltage Control Center',
              'Power supply connection'
            ],
            correctAnswer: 3,
            explanation: 'VCC means power supply - this is where the sensor gets its energy!'
          },
          {
            id: 'q6-2',
            question: 'Which Arduino pin reads analog signals from the sensor?',
            options: [
              'Analog pin A0',
              'Digital pin 13',
              'Ground pin',
              'Reset pin'
            ],
            correctAnswer: 0,
            explanation: 'Analog pin A0 reads the sensor\'s signal, which varies based on soil moisture!'
          },
          {
            id: 'q6-3',
            question: 'Why do we use color coding for wires?',
            options: [
              'To make it pretty',
              'Colors conduct electricity better',
              'To prevent wiring mistakes',
              'It\'s required by law'
            ],
            correctAnswer: 2,
            explanation: 'Color coding helps us quickly identify wire functions and prevent dangerous mistakes!'
          }
        ]
      }
    },
    {
      id: 'ch7',
      number: 7,
      title: 'Writing the Code',
      learningObjective: 'Write Arduino code to read moisture sensor values and make decisions.',
      explanation: 'Our code reads the sensor using analogRead(A0), which gives us a number from 0-1023. Lower numbers mean wet soil, higher numbers mean dry soil! We use if-else statements to make decisions: if moisture is low (dry), turn on a warning LED. We also use Serial.println() to display readings on the computer, which helps us debug and understand what\'s happening.',
      stemConcept: 'Conditional statements (if-else) let computers make decisions. This is a fundamental concept in all programming - from apps to AI!',
      funFact: 'The analogRead() function samples the voltage 1000 times per second and converts it to a number. That\'s super fast - faster than you can blink!',
      miniActivity: 'Write pseudocode for a decision you make every day, like "if it\'s raining, bring umbrella, else bring sunglasses."',
      realWorldExample: 'Self-driving cars use thousands of if-else decisions every second - if obstacle detected, then brake; if lane drifting, then correct steering!',
      quiz: {
        id: 'quiz7',
        chapterId: 'ch7',
        xpReward: 10,
        questions: [
          {
            id: 'q7-1',
            question: 'What does analogRead(A0) do?',
            options: [
              'Writes data to the sensor',
              'Reads the sensor value (0-1023)',
              'Turns off the Arduino',
              'Deletes the program'
            ],
            correctAnswer: 1,
            explanation: 'analogRead(A0) reads the sensor and returns a value between 0 and 1023!'
          },
          {
            id: 'q7-2',
            question: 'What does a LOW sensor reading indicate?',
            options: [
              'Dry soil',
              'Broken sensor',
              'No power',
              'Wet soil'
            ],
            correctAnswer: 3,
            explanation: 'Low readings mean wet soil because water conducts electricity better!'
          },
          {
            id: 'q7-3',
            question: 'What is Serial.println() used for?',
            options: [
              'To display data on the computer screen',
              'To print on paper',
              'To save files',
              'To turn LEDs on'
            ],
            correctAnswer: 0,
            explanation: 'Serial.println() sends data to your computer screen, perfect for debugging and monitoring!'
          }
        ]
      }
    },
    {
      id: 'ch8',
      number: 8,
      title: 'Uploading and Testing',
      learningObjective: 'Upload code to Arduino and test the moisture detector in real conditions.',
      explanation: 'Testing is crucial! First, verify your code (check for errors), then upload it to Arduino. Open the Serial Monitor to see real-time readings. Test with dry soil (high numbers), then add water and watch the numbers drop! If something doesn\'t work, check: Are wires connected? Right port selected? Sensor in soil? Debugging is a normal part of engineering!',
      stemConcept: 'The scientific method applies to engineering: hypothesize (plan), experiment (test), observe (monitor readings), and iterate (improve). Every test teaches you something!',
      funFact: 'NASA tests Mars rovers thousands of times on Earth before launch. Testing prevents expensive failures - one small bug could ruin a multi-billion dollar mission!',
      miniActivity: 'Create a test plan: write down what you expect to see with dry soil, damp soil, and wet soil. Compare predictions with actual results!',
      realWorldExample: 'Software companies release "beta" versions to test with real users before official launch. Your testing is professional-level engineering!',
      quiz: {
        id: 'quiz8',
        chapterId: 'ch8',
        xpReward: 10,
        questions: [
          {
            id: 'q8-1',
            question: 'What should you do BEFORE uploading code to Arduino?',
            options: [
              'Nothing, just upload',
              'Disconnect all wires',
              'Verify the code for errors',
              'Turn off the computer'
            ],
            correctAnswer: 2,
            explanation: 'Always verify your code first to catch errors before uploading!'
          },
          {
            id: 'q8-2',
            question: 'What happens when you add water to the soil during testing?',
            options: [
              'Readings decrease',
              'Readings increase',
              'Nothing changes',
              'Arduino breaks'
            ],
            correctAnswer: 0,
            explanation: 'Adding water decreases the sensor readings because wet soil conducts better!'
          },
          {
            id: 'q8-3',
            question: 'If your project doesn\'t work, what should you do first?',
            options: [
              'Give up',
              'Buy new components',
              'Throw it away',
              'Check connections and debug systematically'
            ],
            correctAnswer: 3,
            explanation: 'Systematic debugging - checking connections, code, and power - solves most problems!'
          }
        ]
      }
    },
    {
      id: 'ch9',
      number: 9,
      title: 'Smart Irrigation Logic',
      learningObjective: 'Implement automated decision-making for smart watering systems.',
      explanation: 'Now we level up! Add logic to automatically water plants when soil is dry. Set threshold values: if moisture < 300 (very dry), turn on water pump; if moisture > 700 (wet enough), turn off pump. You can add a relay module to control a real pump! This is how smart gardens work - they water themselves at the perfect time, saving water and keeping plants healthy.',
      stemConcept: 'Automation means teaching machines to make decisions without human help. This is how smart homes, self-driving cars, and factory robots work!',
      funFact: 'Smart irrigation systems can reduce water usage by 50% while growing healthier plants. That\'s good for the planet AND your garden!',
      miniActivity: 'Design your own threshold values. What if you\'re growing cacti (need dry soil) vs. rice (needs wet soil)? How would you change the code?',
      realWorldExample: 'Commercial farms use this exact technology to water thousands of acres automatically, monitored from smartphones. You\'re learning real agricultural technology!',
      quiz: {
        id: 'quiz9',
        chapterId: 'ch9',
        xpReward: 10,
        questions: [
          {
            id: 'q9-1',
            question: 'What is a threshold value?',
            options: [
              'The maximum voltage',
              'A decision point that triggers an action',
              'The sensor\'s price',
              'A type of wire'
            ],
            correctAnswer: 1,
            explanation: 'A threshold is a decision point - when the value crosses it, we take action!'
          },
          {
            id: 'q9-2',
            question: 'How does automated watering save water?',
            options: [
              'It doesn\'t save water',
              'It uses dirty water',
              'It makes plants need less water',
              'It only waters when actually needed'
            ],
            correctAnswer: 3,
            explanation: 'Automated systems only water when soil is actually dry, preventing waste from over-watering!'
          },
          {
            id: 'q9-3',
            question: 'What component could control a real water pump?',
            options: [
              'LED',
              'Resistor',
              'Relay module',
              'Breadboard'
            ],
            correctAnswer: 2,
            explanation: 'A relay module acts like an electronic switch that can control high-power devices like pumps!'
          }
        ]
      }
    },
    {
      id: 'ch10',
      number: 10,
      title: 'Final Project Review',
      learningObjective: 'Review everything learned and explore ways to expand the project.',
      explanation: 'Congratulations! You\'ve built a real IoT (Internet of Things) device! Let\'s review: you learned microcontrollers, sensors, circuits, programming, testing, and automation. But this is just the beginning! You could add: WiFi to monitor from your phone, multiple sensors for a whole garden, a solar panel for outdoor use, or data logging to track moisture over time. The skills you learned apply to thousands of projects!',
      stemConcept: 'Interdisciplinary thinking combines multiple STEM fields - this project used electronics (E), programming (T), environmental science (S), and problem-solving (M). That\'s the power of STEM!',
      funFact: 'Your project uses the same principles as billion-dollar smart agriculture companies. You\'re now equipped with professional-level skills!',
      miniActivity: 'Brainstorm 3 new projects you could build with Arduino. What problems in your life could you solve with sensors and automation?',
      realWorldExample: 'From Mars rovers to medical devices to environmental monitoring, the skills you learned are used in cutting-edge technology worldwide!',
      quiz: {
        id: 'quiz10',
        chapterId: 'ch10',
        xpReward: 10,
        questions: [
          {
            id: 'q10-1',
            question: 'What does IoT stand for?',
            options: [
              'Internet of Things',
              'Internet of Technology',
              'Internal Operating Technology',
              'Intelligent Output Terminal'
            ],
            correctAnswer: 0,
            explanation: 'IoT means Internet of Things - devices connected to the internet that can share data and be controlled remotely!'
          },
          {
            id: 'q10-2',
            question: 'What would adding WiFi to your project allow you to do?',
            options: [
              'Nothing new',
              'Make it heavier',
              'Monitor and control from anywhere',
              'Use more power'
            ],
            correctAnswer: 2,
            explanation: 'WiFi connectivity lets you monitor soil moisture and control watering from anywhere using your phone!'
          },
          {
            id: 'q10-3',
            question: 'Which field is NOT part of STEM?',
            options: [
              'Science',
              'Technology',
              'Mathematics',
              'Fashion'
            ],
            correctAnswer: 3,
            explanation: 'STEM stands for Science, Technology, Engineering, and Mathematics!'
          }
        ]
      }
    }
  ]
};
