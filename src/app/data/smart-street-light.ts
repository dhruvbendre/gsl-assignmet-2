import { Course } from '../types';

export const smartStreetLightCourse: Course = {
  id: 'smart-street-light',
  title: 'Smart Street Light Using Arduino',
  description: 'A Smart Street Light system uses Arduino with LDR sensors to automatically control street lights based on ambient light levels, saving energy and enabling smart city infrastructure.',
  totalXP: 275,
  badge: 'Smart City Innovator',
  chapters: [
    {
      id: 'ch1',
      number: 1,
      title: 'Introduction to Smart Cities',
      learningObjective: 'Understand what smart cities are and how Arduino contributes to smart infrastructure!',
      explanation: 'Smart cities use technology to improve urban services and quality of life. Arduino plays a crucial role in creating intelligent systems like automatic street lights, smart traffic management, and environmental monitoring. These systems save energy, reduce costs, and make cities more sustainable!',
      stemConcept: 'Smart city technology combines sensors, microcontrollers, and data analysis to optimize resource usage. It\'s like giving the city a brain that can make decisions!',
      funFact: 'Singapore is one of the world\'s smartest cities, using over 100,000 sensors to monitor everything from traffic to air quality!',
      miniActivity: 'Look around your neighborhood and identify 3 things that could be made "smarter" with sensors and automation.',
      realWorldExample: 'Barcelona saved €30 million annually by implementing smart street lighting that adjusts brightness based on pedestrian presence and natural light!',
      quiz: {
        id: 'quiz1',
        chapterId: 'ch1',
        xpReward: 10,
        questions: [
          {
            id: 'q1-1',
            question: 'What is a smart city?',
            options: [
              'A city with tall buildings',
              'A city that uses technology to improve services and sustainability',
              'A city with lots of computers',
              'A city with fast internet'
            ],
            correctAnswer: 1,
            explanation: 'A smart city uses IoT sensors, data analytics, and automation to improve urban infrastructure and quality of life!'
          },
          {
            id: 'q1-2',
            question: 'How do smart street lights help cities?',
            options: [
              'They look prettier',
              'They save energy and reduce costs',
              'They are more expensive',
              'They only work at night'
            ],
            correctAnswer: 1,
            explanation: 'Smart street lights automatically adjust brightness, saving up to 70% on energy costs!'
          },
          {
            id: 'q1-3',
            question: 'What component helps Arduino sense the environment?',
            options: [
              'LEDs',
              'Sensors',
              'Wires',
              'Buttons'
            ],
            correctAnswer: 1,
            explanation: 'Sensors allow Arduino to detect changes in the environment like light, temperature, or motion!'
          }
        ]
      }
    },
    {
      id: 'ch2',
      number: 2,
      title: 'Understanding LDR Sensors',
      learningObjective: 'Learn how Light Dependent Resistors (LDR) detect light levels.',
      explanation: 'An LDR (Light Dependent Resistor) is a special component that changes its resistance based on light intensity. In bright light, it has low resistance (electricity flows easily). In darkness, it has high resistance (electricity struggles to flow). Arduino can measure this resistance change to determine if it\'s day or night!',
      stemConcept: 'Photoconductivity is the principle where certain materials conduct electricity better when exposed to light. This is the same principle used in solar panels and camera light meters!',
      funFact: 'LDRs are made from cadmium sulfide, the same material that gives some paints their bright yellow color!',
      miniActivity: 'Cover your phone\'s light sensor (usually near the front camera) and watch how your screen brightness changes. That\'s an LDR at work!',
      realWorldExample: 'Your smartphone uses an LDR to automatically adjust screen brightness - bright in sunlight, dim in dark rooms to save battery!',
      quiz: {
        id: 'quiz2',
        chapterId: 'ch2',
        xpReward: 10,
        questions: [
          {
            id: 'q2-1',
            question: 'What happens to an LDR\'s resistance in bright light?',
            options: [
              'It increases',
              'It decreases',
              'It stays the same',
              'It becomes infinite'
            ],
            correctAnswer: 1,
            explanation: 'In bright light, an LDR\'s resistance decreases, allowing more current to flow through it!'
          },
          {
            id: 'q2-2',
            question: 'What does LDR stand for?',
            options: [
              'Long Distance Resistor',
              'Light Dependent Resistor',
              'Low Density Resistor',
              'Linear Digital Resistor'
            ],
            correctAnswer: 1,
            explanation: 'LDR stands for Light Dependent Resistor - its resistance depends on the amount of light falling on it!'
          },
          {
            id: 'q2-3',
            question: 'Where might you find an LDR in everyday life?',
            options: [
              'In your shoes',
              'In automatic street lights and phone screens',
              'In your water bottle',
              'In your backpack'
            ],
            correctAnswer: 1,
            explanation: 'LDRs are commonly used in automatic street lights and smartphone screen brightness controls!'
          }
        ]
      }
    },
    {
      id: 'ch3',
      number: 3,
      title: 'Components for Smart Street Light',
      learningObjective: 'Identify all components needed to build a smart street light system.',
      explanation: 'Our smart street light project needs: Arduino board (the brain), LDR sensor (detects light levels), LED (simulates the street light), resistor (protects the LED), breadboard (for connections), and jumper wires. The LDR tells Arduino when it\'s dark, and Arduino turns on the LED street light automatically!',
      stemConcept: 'Systems engineering involves selecting the right components that work together. Each part has a specific function, and they must be compatible - like pieces of a puzzle!',
      funFact: 'The first electric street light was installed in 1879 in Cleveland, Ohio. Today, smart street lights can communicate with each other wirelessly!',
      miniActivity: 'Draw a diagram showing how you think the LDR, Arduino, and LED should connect to make an automatic light system.',
      realWorldExample: 'Los Angeles replaced 140,000 street lights with smart LEDs, saving $8 million per year in energy costs!',
      quiz: {
        id: 'quiz3',
        chapterId: 'ch3',
        xpReward: 10,
        questions: [
          {
            id: 'q3-1',
            question: 'What is the role of the LDR in this project?',
            options: [
              'To provide power',
              'To detect light levels',
              'To light up',
              'To store data'
            ],
            correctAnswer: 1,
            explanation: 'The LDR detects ambient light levels and tells the Arduino when it\'s dark enough to turn on the street light!'
          },
          {
            id: 'q3-2',
            question: 'Why do we need a resistor with the LED?',
            options: [
              'To make it brighter',
              'To protect the LED from too much current',
              'To change its color',
              'To make it blink'
            ],
            correctAnswer: 1,
            explanation: 'The resistor limits current flowing through the LED, preventing it from burning out!'
          },
          {
            id: 'q3-3',
            question: 'What does the LED represent in this project?',
            options: [
              'A car',
              'The street light',
              'The sun',
              'A sensor'
            ],
            correctAnswer: 1,
            explanation: 'The LED simulates the street light that turns on automatically when it gets dark!'
          }
        ]
      }
    },
    {
      id: 'ch4',
      number: 4,
      title: 'Analog vs Digital Signals',
      learningObjective: 'Understand the difference between analog and digital signals in Arduino.',
      explanation: 'Arduino can read two types of signals: digital (only 0 or 1, like a light switch) and analog (any value in a range, like a dimmer switch). The LDR gives an analog signal because light levels vary gradually. Arduino\'s analog pins (A0-A5) can read values from 0 to 1023, giving us precise light measurements!',
      stemConcept: 'Analog signals represent continuous data (like temperature or light), while digital signals are discrete (on/off). Converting between them is called ADC (Analog-to-Digital Conversion)!',
      funFact: 'Your voice is an analog signal, but when you make a phone call, it\'s converted to digital. Your phone does thousands of analog-to-digital conversions every second!',
      miniActivity: 'Think of 3 analog things (like temperature, volume, brightness) and 3 digital things (like a switch, a yes/no question, a light being on or off) in your daily life.',
      realWorldExample: 'Digital cameras convert analog light into digital pixels. A 12-megapixel camera performs over 12 million analog-to-digital conversions for each photo!',
      quiz: {
        id: 'quiz4',
        chapterId: 'ch4',
        xpReward: 10,
        questions: [
          {
            id: 'q4-1',
            question: 'What range of values does Arduino analogRead() return?',
            options: [
              '0 to 1',
              '0 to 100',
              '0 to 1023',
              '0 to 255'
            ],
            correctAnswer: 2,
            explanation: 'Arduino\'s 10-bit ADC returns values from 0 (0V) to 1023 (5V), giving 1024 possible values!'
          },
          {
            id: 'q4-2',
            question: 'Which Arduino pins are used for analog input?',
            options: [
              'Digital pins 0-13',
              'Analog pins A0-A5',
              'Power pins 5V and 3.3V',
              'Reset pin'
            ],
            correctAnswer: 1,
            explanation: 'Analog pins A0 through A5 are specifically designed to read analog signals from sensors!'
          },
          {
            id: 'q4-3',
            question: 'Why is an LDR read using an analog pin?',
            options: [
              'Because it only has two states',
              'Because light levels vary gradually',
              'Because it\'s easier',
              'Because digital pins are broken'
            ],
            correctAnswer: 1,
            explanation: 'Light levels change gradually, not just on/off, so we need analog reading to get precise measurements!'
          }
        ]
      }
    },
    {
      id: 'ch5',
      number: 5,
      title: 'Circuit Design for Street Light',
      learningObjective: 'Design a circuit that connects the LDR and LED to Arduino.',
      explanation: 'Our circuit has two parts: 1) The LDR circuit - connect one LDR leg to 5V, the other to both an analog pin (A0) and a resistor to ground (this is called a voltage divider). 2) The LED circuit - connect the LED\'s long leg (anode) through a 220Ω resistor to a digital pin, and the short leg (cathode) to ground. When Arduino reads low light from the LDR, it turns on the LED!',
      stemConcept: 'A voltage divider is a simple circuit that converts a changing resistance (from the LDR) into a changing voltage that Arduino can measure. It\'s one of the most fundamental circuits in electronics!',
      funFact: 'The voltage divider principle was discovered in the 1800s and is still used in virtually every electronic device today!',
      miniActivity: 'Build a simple voltage divider on your breadboard using any two resistors. Measure the output with a multimeter if you have one!',
      realWorldExample: 'Volume knobs on old radios were essentially variable resistors in a voltage divider circuit - turning the knob changed the voltage going to the speaker!',
      quiz: {
        id: 'quiz5',
        chapterId: 'ch5',
        xpReward: 10,
        questions: [
          {
            id: 'q5-1',
            question: 'What is a voltage divider?',
            options: [
              'A tool to cut wires',
              'A circuit that converts resistance changes to voltage changes',
              'A type of battery',
              'A programming function'
            ],
            correctAnswer: 1,
            explanation: 'A voltage divider uses two resistors to create a voltage that varies based on resistance - perfect for sensors!'
          },
          {
            id: 'q5-2',
            question: 'Why does the LED need a resistor?',
            options: [
              'To make it look better',
              'To limit current and prevent damage',
              'To change its color',
              'To make it flash'
            ],
            correctAnswer: 1,
            explanation: 'LEDs can only handle a small amount of current. The resistor limits the current to a safe level!'
          },
          {
            id: 'q5-3',
            question: 'How is the LDR connected to Arduino?',
            options: [
              'Directly to a digital pin',
              'In a voltage divider configuration to an analog pin',
              'To the power supply only',
              'To the LED directly'
            ],
            correctAnswer: 1,
            explanation: 'The LDR is connected in a voltage divider with a fixed resistor, and the middle point goes to an analog pin!'
          }
        ]
      }
    },
    {
      id: 'ch6',
      number: 6,
      title: 'Wiring the Components',
      learningObjective: 'Learn the correct wiring connections for the smart street light.',
      explanation: 'Follow these steps: 1) LDR: One leg to 5V, other leg to A0 AND through a 10kΩ resistor to GND. 2) LED: Long leg through 220Ω resistor to pin 9, short leg to GND. Double-check all connections! The LDR should be exposed to light (don\'t cover it), and the LED should face up like a real street light.',
      stemConcept: 'Proper wiring is critical in electronics. A single wrong connection can damage components or give incorrect readings. Professional engineers always double-check their schematics before powering up!',
      funFact: 'The first computers had to be manually rewired by hand to change programs. Today\'s Arduino can be reprogrammed thousands of times without changing a single wire!',
      miniActivity: 'Create a wiring checklist and verify each connection before uploading code. This habit prevents many common mistakes!',
      realWorldExample: 'Aerospace engineers use the same careful wiring techniques. One loose wire on a spacecraft could mean mission failure!',
      quiz: {
        id: 'quiz6',
        chapterId: 'ch6',
        xpReward: 10,
        questions: [
          {
            id: 'q6-1',
            question: 'What resistor value is typically used with the LDR?',
            options: [
              '220Ω',
              '10kΩ',
              '1Ω',
              '1MΩ'
            ],
            correctAnswer: 1,
            explanation: 'A 10kΩ resistor works well with most LDRs to create an effective voltage divider!'
          },
          {
            id: 'q6-2',
            question: 'Which Arduino pin is commonly used for the LED?',
            options: [
              'A0',
              'Digital pin 9 (or any PWM pin)',
              'Reset',
              'TX'
            ],
            correctAnswer: 1,
            explanation: 'Digital pin 9 is a PWM pin, which allows us to dim the LED by changing brightness gradually!'
          },
          {
            id: 'q6-3',
            question: 'What should you do before powering up your circuit?',
            options: [
              'Nothing, just turn it on',
              'Double-check all connections',
              'Cover the LDR',
              'Remove the LED'
            ],
            correctAnswer: 1,
            explanation: 'Always verify your wiring before applying power to prevent damage to components!'
          }
        ]
      }
    },
    {
      id: 'ch7',
      number: 7,
      title: 'Programming the Smart Light',
      learningObjective: 'Write Arduino code to automatically control the street light based on light levels.',
      explanation: 'Our code reads the LDR value using analogRead(A0). We set a threshold (like 500): if the reading is below 500 (dark), we turn the LED on with digitalWrite(9, HIGH). If above 500 (bright), we turn it off with digitalWrite(9, LOW). We can also use analogWrite() with PWM to gradually fade the LED, making it more realistic!',
      stemConcept: 'Threshold-based decision making is fundamental to automation. From thermostats to self-driving cars, systems constantly compare sensor readings to thresholds to make decisions!',
      funFact: 'The same logic used in your smart street light controls billions of dollars worth of industrial automation equipment worldwide!',
      miniActivity: 'Experiment with different threshold values. What happens if you set it too high? Too low? Find the sweet spot for your environment!',
      realWorldExample: 'Automatic headlights in cars use the exact same principle - a light sensor triggers the headlights when it gets dark enough!',
      quiz: {
        id: 'quiz7',
        chapterId: 'ch7',
        xpReward: 10,
        questions: [
          {
            id: 'q7-1',
            question: 'What does a LOW LDR reading indicate?',
            options: [
              'Bright light',
              'Darkness',
              'Broken sensor',
              'Too much power'
            ],
            correctAnswer: 1,
            explanation: 'In darkness, the LDR has high resistance, resulting in a lower voltage reading at the analog pin!'
          },
          {
            id: 'q7-2',
            question: 'What function turns the LED fully on or off?',
            options: [
              'analogRead()',
              'digitalWrite()',
              'pinMode()',
              'Serial.println()'
            ],
            correctAnswer: 1,
            explanation: 'digitalWrite(pin, HIGH) turns the LED on, and digitalWrite(pin, LOW) turns it off!'
          },
          {
            id: 'q7-3',
            question: 'What is PWM used for?',
            options: [
              'Reading sensors',
              'Dimming LEDs by rapidly turning them on and off',
              'Storing data',
              'Connecting to WiFi'
            ],
            correctAnswer: 1,
            explanation: 'PWM (Pulse Width Modulation) rapidly switches the LED on and off to create the illusion of dimming!'
          }
        ]
      }
    },
    {
      id: 'ch8',
      number: 8,
      title: 'Testing and Calibration',
      learningObjective: 'Test the smart street light and calibrate the threshold for optimal performance.',
      explanation: 'Testing is crucial! Upload your code and use the Serial Monitor to see LDR readings in different lighting conditions. Note the values in bright light and darkness. Adjust your threshold to be between these values. Test by covering the LDR with your hand - the LED should turn on. Remove your hand - it should turn off. Fine-tune until it responds perfectly!',
      stemConcept: 'Calibration is the process of adjusting a system to match real-world conditions. Every sensor-based system needs calibration because no two environments are exactly alike!',
      funFact: 'NASA calibrates Mars rover instruments for months before launch. The Mars environment is so different from Earth that every sensor must be precisely calibrated!',
      miniActivity: 'Create a calibration table: record LDR values in different conditions (bright room, dim room, covered, outside). Use this data to set the perfect threshold!',
      realWorldExample: 'Professional weather stations are calibrated regularly. A small calibration error could lead to incorrect forecasts affecting millions of people!',
      quiz: {
        id: 'quiz8',
        chapterId: 'ch8',
        xpReward: 10,
        questions: [
          {
            id: 'q8-1',
            question: 'Why is calibration important?',
            options: [
              'It\'s not important',
              'To ensure accurate readings in your specific environment',
              'To make the code longer',
              'To use more memory'
            ],
            correctAnswer: 1,
            explanation: 'Calibration adjusts the system to work correctly in your specific environment with your specific components!'
          },
          {
            id: 'q8-2',
            question: 'How can you test if the street light works correctly?',
            options: [
              'Just look at it',
              'Cover and uncover the LDR while observing the LED',
              'Shake the breadboard',
              'Disconnect all wires'
            ],
            correctAnswer: 1,
            explanation: 'Covering the LDR simulates darkness (LED should turn on), and uncovering simulates daylight (LED should turn off)!'
          },
          {
            id: 'q8-3',
            question: 'What tool helps you see sensor values in real-time?',
            options: [
              'A hammer',
              'Serial Monitor',
              'A flashlight',
              'A ruler'
            ],
            correctAnswer: 1,
            explanation: 'The Arduino Serial Monitor displays real-time sensor readings, making calibration much easier!'
          }
        ]
      }
    },
    {
      id: 'ch9',
      number: 9,
      title: 'Advanced Features',
      learningObjective: 'Add advanced features like gradual fading and motion detection.',
      explanation: 'Let\'s level up! Add motion detection with a PIR sensor - lights only turn on when someone is near, saving even more energy. Use analogWrite() with PWM to fade the LED gradually instead of abrupt on/off. You could also add multiple LEDs for a row of street lights, or use a relay to control real 12V LED strips!',
      stemConcept: 'Layered automation combines multiple sensors and decision rules. Real-world smart city systems use dozens of inputs to make optimal decisions about energy usage!',
      funFact: 'Some smart cities use AI to predict when street lights will need maintenance before they break, saving millions in repair costs!',
      miniActivity: 'Modify your code to make the LED fade in over 2 seconds when it gets dark, and fade out when it gets bright. This is more realistic and pleasant!',
      realWorldExample: 'Tokyo\'s smart street lights detect earthquakes and automatically brighten to help people evacuate safely. Your project uses the same principles!',
      quiz: {
        id: 'quiz9',
        chapterId: 'ch9',
        xpReward: 10,
        questions: [
          {
            id: 'q9-1',
            question: 'What does a PIR sensor detect?',
            options: [
              'Light levels',
              'Motion and body heat',
              'Sound',
              'Humidity'
            ],
            correctAnswer: 1,
            explanation: 'PIR (Passive Infrared) sensors detect motion and body heat, perfect for knowing when someone is nearby!'
          },
          {
            id: 'q9-2',
            question: 'How does PWM create dimming?',
            options: [
              'By reducing voltage',
              'By rapidly switching on and off at different rates',
              'By changing the LED color',
              'By using a dimmer switch'
            ],
            correctAnswer: 1,
            explanation: 'PWM switches the LED on and off so fast that our eyes see it as a steady dimmed light!'
          },
          {
            id: 'q9-3',
            question: 'What is the benefit of adding motion detection to street lights?',
            options: [
              'No benefit',
              'Lights only use energy when someone is present',
              'It makes lights brighter',
              'It changes the color'
            ],
            correctAnswer: 1,
            explanation: 'Motion-activated lights save even more energy by only operating when needed!'
          }
        ]
      }
    },
    {
      id: 'ch10',
      number: 10,
      title: 'Smart City Applications',
      learningObjective: 'Explore how smart street lights fit into the bigger picture of smart city infrastructure.',
      explanation: 'Congratulations! You\'ve built a miniature smart city system! Real smart street lights do much more: they communicate with each other, report outages automatically, adjust for weather, and even provide WiFi hotspots. The skills you learned - sensors, automation, programming - are used in smart traffic lights, air quality monitors, smart parking, and countless other applications!',
      stemConcept: 'Systems thinking means understanding how individual components work together in a larger system. Your street light is one node in a city-wide network of intelligent devices!',
      funFact: 'By 2030, it\'s estimated that over 500 million smart street lights will be installed worldwide, saving enough energy to power entire countries!',
      miniActivity: 'Design your own smart city! What other systems could benefit from Arduino automation? Think about traffic, waste management, or public safety.',
      realWorldExample: 'Amsterdam\'s smart city project connects street lights, traffic systems, and building management into one intelligent network that saves €20 million annually!',
      quiz: {
        id: 'quiz10',
        chapterId: 'ch10',
        xpReward: 10,
        questions: [
          {
            id: 'q10-1',
            question: 'What percentage of energy can smart street lights save?',
            options: [
              '5-10%',
              '50-70%',
              '1-2%',
              '100%'
            ],
            correctAnswer: 1,
            explanation: 'Smart street lights can reduce energy consumption by 50-70% compared to traditional street lights!'
          },
          {
            id: 'q10-2',
            question: 'What other smart city applications could use similar technology?',
            options: [
              'None',
              'Smart traffic lights, parking sensors, air quality monitors',
              'Only street lights',
              'Video games'
            ],
            correctAnswer: 1,
            explanation: 'The same sensor and automation principles apply to many smart city systems!'
          },
          {
            id: 'q10-3',
            question: 'What skill from this project is most valuable for future projects?',
            options: [
              'Only Arduino coding',
              'Systems thinking, sensor integration, and automation logic',
              'How to solder',
              'How to draw circuits'
            ],
            correctAnswer: 1,
            explanation: 'The problem-solving skills and systems thinking you developed apply to thousands of IoT and automation projects!'
          }
        ]
      }
    }
  ]
};