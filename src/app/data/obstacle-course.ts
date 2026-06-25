import { Course } from '../types';

export const obstacleCourse: Course = {
  id: 'arduino-obstacle-alarm',
  title: 'Obstacle Detection Alarm using Arduino',
  description: 'Build a smart obstacle detection system using ultrasonic sensors and Arduino. Learn how to create alarms, measure distances, and build safety systems used in robotics and automotive applications.',
  totalXP: 275,
  badge: 'Arduino Safety Sentinel',
  chapters: [
    {
      id: 'obs-ch1',
      number: 1,
      title: 'Introduction to Ultrasonic Sensors',
      learningObjective: 'Understand how ultrasonic sensors work and their real-world applications!',
      explanation: 'Ultrasonic sensors work like bat sonar! They send out high-frequency sound waves (inaudible to humans) and measure how long it takes for the echo to return. This "time of flight" tells us the distance to an object. The HC-SR04 sensor can detect objects from 2cm to 400cm away with impressive accuracy!',
      stemConcept: 'Sound travels at approximately 343 meters per second in air. By measuring the time it takes for sound to travel to an object and back, we can calculate distance using: Distance = (Speed × Time) / 2',
      funFact: 'Bats use the same principle called echolocation to navigate in complete darkness and catch insects mid-flight!',
      miniActivity: 'Clap your hands near a large empty wall and listen for the echo. The delay you hear is similar to what the sensor measures electronically!',
      realWorldExample: 'Self-driving cars use arrays of ultrasonic sensors for parking assistance, detecting obstacles, and blind-spot monitoring. Tesla, Waymo, and other autonomous vehicle companies rely on this technology!',
      quiz: {
        id: 'obs-quiz1',
        chapterId: 'obs-ch1',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q1-1',
            question: 'How do ultrasonic sensors measure distance?',
            options: [
              'By measuring light reflection',
              'By measuring time for sound echo to return',
              'By measuring temperature changes',
              'By measuring magnetic fields'
            ],
            correctAnswer: 1,
            explanation: 'Ultrasonic sensors send sound waves and measure the time for the echo to return to calculate distance!'
          },
          {
            id: 'obs-q1-2',
            question: 'What is the typical range of the HC-SR04 sensor?',
            options: [
              '1mm to 10cm',
              '2cm to 400cm',
              '1m to 1km',
              '10cm to 50cm'
            ],
            correctAnswer: 1,
            explanation: 'The HC-SR04 can detect objects from 2cm to 400cm (4 meters) away!'
          },
          {
            id: 'obs-q1-3',
            question: 'Which animal uses the same principle as ultrasonic sensors?',
            options: [
              'Eagle',
              'Bat',
              'Shark',
              'Owl'
            ],
            correctAnswer: 1,
            explanation: 'Bats use echolocation, the same principle of sending sound waves and listening for echoes!'
          }
        ]
      }
    },
    {
      id: 'obs-ch2',
      number: 2,
      title: 'Understanding Sound Waves',
      learningObjective: 'Learn the physics behind sound waves and frequency!',
      explanation: 'Sound is a mechanical wave that travels through air by compressing and expanding air molecules. Ultrasonic means "above sound" - frequencies higher than humans can hear (above 20,000 Hz). The HC-SR04 operates at 40,000 Hz (40 kHz)! Higher frequencies provide better accuracy but shorter range, while lower frequencies travel farther but with less precision.',
      stemConcept: 'Wave frequency (Hz) = number of cycles per second. Wavelength = Speed of sound / Frequency. Higher frequency = shorter wavelength = better resolution for detecting small objects!',
      funFact: 'Dolphins use ultrasonic clicks up to 150 kHz for echolocation - that\'s nearly 4 times higher than our sensor!',
      miniActivity: 'Use a phone app to visualize sound frequencies. Try clapping, whistling, and speaking - see how different sounds create different wave patterns!',
      realWorldExample: 'Medical ultrasound machines use frequencies of 2-18 MHz to create images of babies in the womb - the same echo principle but at much higher frequencies!',
      quiz: {
        id: 'obs-quiz2',
        chapterId: 'obs-ch2',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q2-1',
            question: 'What does "ultrasonic" mean?',
            options: [
              'Below human hearing range',
              'Above human hearing range',
              'Exactly at human hearing range',
              'Very loud sounds'
            ],
            correctAnswer: 1,
            explanation: 'Ultrasonic refers to frequencies above 20,000 Hz, which humans cannot hear!'
          },
          {
            id: 'obs-q2-2',
            question: 'What frequency does the HC-SR04 operate at?',
            options: [
              '40 Hz',
              '400 Hz',
              '40 kHz',
              '4 MHz'
            ],
            correctAnswer: 2,
            explanation: 'The HC-SR04 operates at 40,000 Hz (40 kHz), well above human hearing!'
          },
          {
            id: 'obs-q2-3',
            question: 'Why do higher frequencies provide better accuracy?',
            options: [
              'They travel faster',
              'They have shorter wavelengths',
              'They are louder',
              'They use less power'
            ],
            correctAnswer: 1,
            explanation: 'Shorter wavelengths can detect smaller objects and provide more precise measurements!'
          }
        ]
      }
    },
    {
      id: 'obs-ch3',
      number: 3,
      title: 'HC-SR04 Sensor Pinout',
      learningObjective: 'Identify and understand each pin on the ultrasonic sensor!',
      explanation: 'The HC-SR04 has 4 pins: VCC (power - connect to 5V), Trig (trigger - sends the ultrasonic pulse when given a 10µs HIGH signal), Echo (outputs a pulse whose width equals the time of flight), and GND (ground). The sensor has two cylindrical "eyes" - one is the transmitter (sends sound) and one is the receiver (listens for echo).',
      stemConcept: 'Digital signals use precise timing. A 10 microsecond (0.00001 second) HIGH pulse on the Trig pin triggers the sensor to send exactly 8 cycles of 40 kHz sound waves!',
      funFact: 'The HC-SR04 sensor is so popular that over 10 million units are used in student projects worldwide every year!',
      miniActivity: 'Draw the sensor and label all 4 pins with their functions. Then trace the signal path from Arduino to sensor and back!',
      realWorldExample: 'Industrial automation uses similar sensors for conveyor belt monitoring, counting objects, and detecting jams in manufacturing lines!',
      quiz: {
        id: 'obs-quiz3',
        chapterId: 'obs-ch3',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q3-1',
            question: 'How many pins does the HC-SR04 have?',
            options: [
              '2',
              '3',
              '4',
              '5'
            ],
            correctAnswer: 2,
            explanation: 'The HC-SR04 has 4 pins: VCC, Trig, Echo, and GND!'
          },
          {
            id: 'obs-q3-2',
            question: 'What triggers the sensor to send an ultrasonic pulse?',
            options: [
              'Connecting power',
              'A 10µs HIGH signal on Trig pin',
              'Pressing a button',
              'Serial command'
            ],
            correctAnswer: 1,
            explanation: 'A 10 microsecond HIGH pulse on the Trig pin triggers the sensor to send 8 cycles of ultrasonic waves!'
          },
          {
            id: 'obs-q3-3',
            question: 'What does the Echo pin output?',
            options: [
              'A continuous signal',
              'A pulse whose width equals time of flight',
              'The distance in centimeters',
              'A digital 1 or 0'
            ],
            correctAnswer: 1,
            explanation: 'The Echo pin outputs a HIGH pulse whose duration equals the time it took for the sound to travel and return!'
          }
        ]
      }
    },
    {
      id: 'obs-ch4',
      number: 4,
      title: 'Wiring the Ultrasonic Sensor',
      learningObjective: 'Connect the HC-SR04 sensor to Arduino correctly!',
      explanation: 'Connect VCC to Arduino 5V, GND to Arduino GND, Trig to digital pin 9, and Echo to digital pin 10. The Trig pin is an INPUT to the sensor (Arduino sends signals to it), and Echo is an OUTPUT from the sensor (Arduino reads signals from it). Always double-check connections - reversing VCC and GND can damage the sensor!',
      stemConcept: 'GPIO (General Purpose Input/Output) pins can be configured as either input or output. We set Trig pin as OUTPUT (sending signals) and Echo pin as INPUT (receiving signals)!',
      funFact: 'The Arduino Uno has 14 digital I/O pins, and any of them can be used for Trig or Echo - we use pins 9 and 10 by convention!',
      miniActivity: 'Create a wiring diagram on paper showing all connections with color-coded wires. Use red for power, black for ground, and other colors for signals!',
      realWorldExample: 'Automotive parking sensors use the same wiring principles - multiple sensors connected to a central control unit that processes all the distance data!',
      quiz: {
        id: 'obs-quiz4',
        chapterId: 'obs-ch4',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q4-1',
            question: 'What voltage should VCC be connected to?',
            options: [
              '3.3V',
              '5V',
              '9V',
              '12V'
            ],
            correctAnswer: 1,
            explanation: 'The HC-SR04 operates at 5V, which is the standard Arduino logic level!'
          },
          {
            id: 'obs-q4-2',
            question: 'Which Arduino pin mode should Trig be set to?',
            options: [
              'INPUT',
              'OUTPUT',
              'INPUT_PULLUP',
              'ANALOG'
            ],
            correctAnswer: 1,
            explanation: 'Trig is an INPUT to the sensor, so Arduino must set it as OUTPUT to send the trigger signal!'
          },
          {
            id: 'obs-q4-3',
            question: 'What happens if you reverse VCC and GND?',
            options: [
              'Nothing, it works either way',
              'The sensor may be damaged',
              'It works better',
              'The readings are inverted'
            ],
            correctAnswer: 1,
            explanation: 'Reversing power and ground can damage electronic components - always connect VCC to power and GND to ground!'
          }
        ]
      }
    },
    {
      id: 'obs-ch5',
      number: 5,
      title: 'Writing Distance Measurement Code',
      learningObjective: 'Program Arduino to measure distance using the ultrasonic sensor!',
      explanation: 'The code sequence is: 1) Set Trig LOW for 2µs, 2) Set Trig HIGH for 10µs, 3) Set Trig LOW again, 4) Use pulseIn() to measure Echo pulse duration, 5) Calculate distance: distance = (duration × 0.0343) / 2. The 0.0343 is the speed of sound in cm/µs, and we divide by 2 because the sound travels to the object AND back!',
      stemConcept: 'The pulseIn() function measures the duration of a pulse in microseconds. It waits for a pin to go HIGH, starts timing, then stops when the pin goes LOW again. This precise timing is crucial for accurate distance measurement!',
      funFact: 'The speed of sound changes with temperature! At 20°C it\'s 343 m/s, but at 0°C it\'s only 331 m/s. Advanced sensors compensate for this!',
      miniActivity: 'Write pseudocode for the distance measurement process. Break it down step-by-step like a recipe!',
      realWorldExample: 'Robot vacuum cleaners like Roomba use multiple ultrasonic sensors to map rooms and avoid obstacles - they\'re constantly measuring distances in all directions!',
      quiz: {
        id: 'obs-quiz5',
        chapterId: 'obs-ch5',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q5-1',
            question: 'How long should the Trig pin be set HIGH?',
            options: [
              '1 microsecond',
              '10 microseconds',
              '100 microseconds',
              '1 millisecond'
            ],
            correctAnswer: 1,
            explanation: 'The HC-SR04 requires exactly a 10µs HIGH pulse to trigger an ultrasonic burst!'
          },
          {
            id: 'obs-q5-2',
            question: 'Why do we divide the duration by 2 in the distance calculation?',
            options: [
              'To convert to centimeters',
              'Because sound travels to the object AND back',
              'To account for temperature',
              'To improve accuracy'
            ],
            correctAnswer: 1,
            explanation: 'The sound wave travels to the object and back, so the total distance is twice the actual distance to the object!'
          },
          {
            id: 'obs-q5-3',
            question: 'What does pulseIn() measure?',
            options: [
              'Voltage level',
              'Duration of a pulse in microseconds',
              'Frequency of a signal',
              'Number of pulses'
            ],
            correctAnswer: 1,
            explanation: 'pulseIn() measures how long (in microseconds) a pin stays in a specified state (HIGH or LOW)!'
          }
        ]
      }
    },
    {
      id: 'obs-ch6',
      number: 6,
      title: 'Adding a Buzzer Alarm',
      learningObjective: 'Create an audible alarm that sounds when an obstacle is detected!',
      explanation: 'Connect a passive buzzer to pin 8 (through a 220Ω resistor) and ground. When the measured distance is below a threshold (e.g., 20cm), activate the buzzer using tone(). You can vary the alarm pattern - continuous beep for very close objects, intermittent beeps for medium distance. This creates a proximity warning system!',
      stemConcept: 'Sound frequency (pitch) is measured in Hertz (Hz). The tone(pin, frequency) function generates square waves at the specified frequency. Higher frequency = higher pitch! A 1000 Hz tone is a medium-pitched beep.',
      funFact: 'The backup beep on trucks and construction vehicles uses the same principle - a sensor detects when something is too close and triggers an audible warning!',
      miniActivity: 'Experiment with different buzzer frequencies (500Hz, 1000Hz, 2000Hz). Which sounds most urgent? Why do emergency vehicles use specific siren patterns?',
      realWorldExample: 'Modern cars have parking sensors that beep faster as you get closer to an obstacle - the beep frequency increases as distance decreases, giving drivers intuitive feedback!',
      quiz: {
        id: 'obs-quiz6',
        chapterId: 'obs-ch6',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q6-1',
            question: 'Why use a resistor with a buzzer?',
            options: [
              'To make it quieter',
              'To limit current and protect components',
              'To change the frequency',
              'It\'s not needed'
            ],
            correctAnswer: 1,
            explanation: 'A resistor limits current flow, protecting both the buzzer and Arduino pin from excessive current!'
          },
          {
            id: 'obs-q6-2',
            question: 'What does tone(pin, frequency) do?',
            options: [
              'Reads a frequency from a pin',
              'Generates a square wave at the specified frequency',
              'Measures sound level',
              'Turns the pin off'
            ],
            correctAnswer: 1,
            explanation: 'tone() generates a square wave at the specified frequency, creating sound from a piezo buzzer!'
          },
          {
            id: 'obs-q6-3',
            question: 'How can you make the alarm more urgent as objects get closer?',
            options: [
              'Increase volume',
              'Increase beep frequency or use continuous tone',
              'Change buzzer color',
              'Move the sensor'
            ],
            correctAnswer: 1,
            explanation: 'You can increase beep frequency (more beeps per second) or switch to continuous tone as distance decreases!'
          }
        ]
      }
    },
    {
      id: 'obs-ch7',
      number: 7,
      title: 'Adding Visual LED Indicators',
      learningObjective: 'Create a visual warning system using multiple LEDs!',
      explanation: 'Add three LEDs (green, yellow, red) with current-limiting resistors to pins 5, 6, and 7. Green LED = safe distance (>30cm), Yellow LED = caution (20-30cm), Red LED = danger (<20cm) + buzzer alarm. This creates an intuitive traffic-light system that works even in noisy environments where you might not hear the buzzer!',
      stemConcept: 'Binary states (ON/OFF) are the foundation of digital logic. By combining multiple binary outputs (LEDs), we create a multi-level warning system. This is how computers process complex information using simple 1s and 0s!',
      funFact: 'Traffic lights were invented in 1868 - they use the same green-yellow-red color scheme we use today because these colors are most distinguishable to the human eye!',
      miniActivity: 'Design your own color-coded warning system for a different application (like a battery level indicator or temperature monitor)!',
      realWorldExample: 'Aircraft use similar visual warning systems - green for normal operation, amber for caution, and red for critical warnings. Pilots train extensively to respond to these visual cues!',
      quiz: {
        id: 'obs-quiz7',
        chapterId: 'obs-ch7',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q7-1',
            question: 'Why do LEDs need current-limiting resistors?',
            options: [
              'To make them dimmer',
              'To prevent excessive current that would burn them out',
              'To change their color',
              'To make them blink'
            ],
            correctAnswer: 1,
            explanation: 'LEDs have very low resistance, so without a resistor, too much current flows and destroys them!'
          },
          {
            id: 'obs-q7-2',
            question: 'What is a good threshold for the "danger" zone?',
            options: [
              '50cm',
              '30cm',
              'Less than 20cm',
              '100cm'
            ],
            correctAnswer: 2,
            explanation: 'Less than 20cm is typically considered dangerous close range for most obstacle detection applications!'
          },
          {
            id: 'obs-q7-3',
            question: 'Why use multiple LEDs instead of just one?',
            options: [
              'It looks cooler',
              'To provide multiple levels of warning',
              'To use more pins',
              'Single LEDs are too expensive'
            ],
            correctAnswer: 1,
            explanation: 'Multiple LEDs create a graduated warning system - safe, caution, and danger levels!'
          }
        ]
      }
    },
    {
      id: 'obs-ch8',
      number: 8,
      title: 'Calibrating and Testing',
      learningObjective: 'Calibrate your sensor for accurate readings and test thoroughly!',
      explanation: 'Testing is critical! Place objects at known distances (10cm, 20cm, 30cm) and compare sensor readings. Adjust thresholds if needed. Factors affecting accuracy: temperature, object material (soft materials absorb sound), object angle (angled surfaces reflect sound away), and multiple reflections. Add a small delay (50-100ms) between readings for stability!',
      stemConcept: 'Calibration is comparing measurements to known standards and adjusting accordingly. All scientific instruments require calibration - from kitchen scales to spacecraft navigation systems!',
      funFact: 'NASA calibrates Mars rover sensors for months before launch because they can\'t recalibrate once on Mars!',
      miniActivity: 'Create a calibration table: measure actual distances with a ruler, record sensor readings, and calculate the error percentage at each distance!',
      realWorldExample: 'Quality control in manufacturing uses calibrated sensors to ensure every product meets specifications. A car manufacturer might check 100+ measurements per vehicle!',
      quiz: {
        id: 'obs-quiz8',
        chapterId: 'obs-ch8',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q8-1',
            question: 'What can cause inaccurate ultrasonic sensor readings?',
            options: [
              'Temperature changes',
              'Soft/angled surfaces',
              'Multiple reflections',
              'All of the above'
            ],
            correctAnswer: 3,
            explanation: 'All these factors affect accuracy - temperature changes sound speed, soft surfaces absorb sound, and multiple surfaces cause confusing echoes!'
          },
          {
            id: 'obs-q8-2',
            question: 'Why add a delay between sensor readings?',
            options: [
              'To save power',
              'To allow previous sound waves to dissipate',
              'To make the code simpler',
              'It\'s not necessary'
            ],
            correctAnswer: 1,
            explanation: 'A delay prevents the sensor from detecting echoes from previous pulses, ensuring each reading is independent!'
          },
          {
            id: 'obs-q8-3',
            question: 'How do you calibrate a sensor?',
            options: [
              'Guess the correct values',
              'Compare readings to known standards and adjust',
              'Use default values only',
              'Calibration is not needed'
            ],
            correctAnswer: 1,
            explanation: 'Calibration involves comparing sensor readings to known reference values and adjusting thresholds or formulas accordingly!'
          }
        ]
      }
    },
    {
      id: 'obs-ch9',
      number: 9,
      title: 'Advanced Features - Servo Scanning',
      learningObjective: 'Add a servo motor to scan for obstacles in multiple directions!',
      explanation: 'Mount the ultrasonic sensor on a servo motor! Program the servo to sweep from 0° to 180°, taking distance readings at each position. This creates a "radar" effect - you can detect obstacles in a wide arc, not just straight ahead. Store readings in an array and find the direction with the most clearance for robot navigation!',
      stemConcept: 'Polar coordinates use angle and distance instead of X,Y coordinates. Servo scanning creates a polar map of the environment - exactly how radar and sonar systems work!',
      funFact: 'The first radar system was invented in 1904 and used the same echo principle. Modern weather radar can detect rain, hail, and even tornadoes!',
      miniActivity: 'Draw a semicircle representing the servo\'s range. Mark positions every 30° and imagine what distance readings you\'d get with obstacles placed around your sensor!',
      realWorldExample: 'Self-driving cars use rotating LIDAR sensors (laser version of ultrasonic) that spin 360°, creating a detailed 3D map of the environment in real-time!',
      quiz: {
        id: 'obs-quiz9',
        chapterId: 'obs-ch9',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q9-1',
            question: 'What is the typical rotation range of a standard servo motor?',
            options: [
              '90 degrees',
              '180 degrees',
              '270 degrees',
              '360 degrees'
            ],
            correctAnswer: 1,
            explanation: 'Standard servo motors typically rotate 180 degrees (0° to 180°), perfect for scanning!'
          },
          {
            id: 'obs-q9-2',
            question: 'What coordinate system does servo scanning use?',
            options: [
              'Cartesian (X, Y)',
              'Polar (angle, distance)',
              'Spherical',
              'Hexadecimal'
            ],
            correctAnswer: 1,
            explanation: 'Servo scanning uses polar coordinates - each reading has an angle and a distance from the center!'
          },
          {
            id: 'obs-q9-3',
            question: 'How can servo scanning help a robot navigate?',
            options: [
              'It makes the robot faster',
              'It can find the direction with most clearance',
              'It reduces power consumption',
              'It makes the robot smaller'
            ],
            correctAnswer: 1,
            explanation: 'By scanning multiple directions, the robot can compare distances and choose the path with the most space!'
          }
        ]
      }
    },
    {
      id: 'obs-ch10',
      number: 10,
      title: 'Real-World Applications & Projects',
      learningObjective: 'Explore advanced applications and plan your own projects!',
      explanation: 'Congratulations! You\'ve built a complete obstacle detection system! This technology powers: parking assist systems, robot vacuum navigation, warehouse automation, security systems, assistive devices for the visually impaired, and industrial safety systems. You could expand this project with: Bluetooth connectivity for phone alerts, data logging to track patterns, multiple sensors for 360° coverage, or integration with home automation!',
      stemConcept: 'Systems thinking means understanding how components work together. Your obstacle detector combines physics (sound waves), electronics (circuits), programming (logic), and engineering (design) - that\'s true STEM integration!',
      funFact: 'The global ultrasonic sensor market is worth over $2 billion annually - the skills you\'re learning are in high demand across industries!',
      miniActivity: 'Brainstorm 3 new applications for obstacle detection technology. What problems in your community could this solve?',
      realWorldExample: 'White canes for the visually impaired now incorporate ultrasonic sensors that vibrate to warn of overhead obstacles - your project uses the same technology to help people!',
      quiz: {
        id: 'obs-quiz10',
        chapterId: 'obs-ch10',
        xpReward: 10,
        questions: [
          {
            id: 'obs-q10-1',
            question: 'Which is NOT a real application of ultrasonic sensors?',
            options: [
              'Parking assist systems',
              'Robot vacuum navigation',
              'Cooking food',
              'Industrial safety systems'
            ],
            correctAnswer: 2,
            explanation: 'Ultrasonic sensors detect distance, not heat - they\'re not used for cooking! (Though ultrasonic waves are used in some industrial processes)'
          },
          {
            id: 'obs-q10-2',
            question: 'How could you extend this project for smart home use?',
            options: [
              'Add WiFi/Bluetooth for phone notifications',
              'Make it bigger',
              'Use more LEDs',
              'Add more buzzers'
            ],
            correctAnswer: 0,
            explanation: 'Adding WiFi or Bluetooth connectivity allows remote monitoring and integration with smart home systems!'
          },
          {
            id: 'obs-q10-3',
            question: 'What STEM fields does this project integrate?',
            options: [
              'Only programming',
              'Physics, electronics, programming, and engineering',
              'Only electronics',
              'Only physics'
            ],
            correctAnswer: 1,
            explanation: 'This project combines multiple STEM disciplines - physics (sound), electronics (circuits), programming (code), and engineering (design)!'
          }
        ]
      }
    }
  ]
};