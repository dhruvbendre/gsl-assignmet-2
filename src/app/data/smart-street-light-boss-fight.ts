import { BossFight } from '../types';

export const smartStreetLightBossFight: BossFight = {
  id: 'boss-smart-street-light',
  courseId: 'smart-street-light',
  title: 'Smart City Boss Challenge',
  description: 'Prove your mastery of smart street light systems! This boss fight tests your knowledge of LDR sensors, automation logic, and smart city infrastructure.',
  passingScore: 70,
  totalQuestions: 15,
  xpReward: 50,
  bonusXP: 25,
  timeLimit: 600, // 10 minutes
  questions: [
    {
      id: 'boss-ssl-q1',
      question: 'In a smart street light system, what happens to the LDR resistance when it gets dark?',
      options: [
        'Resistance decreases',
        'Resistance increases',
        'Resistance stays the same',
        'Resistance becomes zero'
      ],
      correctAnswer: 1,
      explanation: 'In darkness, the LDR\'s resistance increases significantly because fewer electrons are freed by light energy!',
      difficulty: 'easy',
      topic: 'LDR Sensors'
    },
    {
      id: 'boss-ssl-q2',
      question: 'What is the main advantage of smart street lights over traditional street lights?',
      options: [
        'They are cheaper to buy',
        'They save 50-70% energy through automation',
        'They are brighter',
        'They never need maintenance'
      ],
      correctAnswer: 1,
      explanation: 'Smart street lights automatically adjust based on ambient light and motion, dramatically reducing energy waste!',
      difficulty: 'easy',
      topic: 'Smart Cities'
    },
    {
      id: 'boss-ssl-q3',
      question: 'Which Arduino function is used to read the LDR sensor value?',
      options: [
        'digitalRead()',
        'analogRead()',
        'pinMode()',
        'Serial.read()'
      ],
      correctAnswer: 1,
      explanation: 'analogRead() reads values from 0-1023, perfect for measuring the varying resistance of an LDR!',
      difficulty: 'easy',
      topic: 'Arduino Programming'
    },
    {
      id: 'boss-ssl-q4',
      question: 'What is a voltage divider circuit used for in the LDR setup?',
      options: [
        'To increase voltage',
        'To convert resistance changes into measurable voltage changes',
        'To power the Arduino',
        'To protect the LED'
      ],
      correctAnswer: 1,
      explanation: 'A voltage divider converts the LDR\'s changing resistance into a changing voltage that Arduino can measure!',
      difficulty: 'medium',
      topic: 'Circuit Design'
    },
    {
      id: 'boss-ssl-q5',
      question: 'If your LDR reads 800 in bright light and 200 in darkness, what threshold would be most appropriate?',
      options: [
        '100',
        '500',
        '900',
        '50'
      ],
      correctAnswer: 1,
      explanation: 'A threshold of 500 is in the middle of the range, providing reliable detection of light vs. dark conditions!',
      difficulty: 'medium',
      topic: 'Calibration'
    },
    {
      id: 'boss-ssl-q6',
      question: 'What does PWM stand for and what is it used for?',
      options: [
        'Power Width Modulation - to increase power',
        'Pulse Width Modulation - to dim LEDs gradually',
        'Pulse Wave Mode - to create sound',
        'Power Wave Modulation - to save energy'
      ],
      correctAnswer: 1,
      explanation: 'PWM rapidly switches power on and off at different rates, creating the illusion of dimming!',
      difficulty: 'medium',
      topic: 'Advanced Features'
    },
    {
      id: 'boss-ssl-q7',
      question: 'What additional sensor could be added to make street lights even more energy efficient?',
      options: [
        'Temperature sensor',
        'PIR motion sensor',
        'Sound sensor',
        'Humidity sensor'
      ],
      correctAnswer: 1,
      explanation: 'A PIR motion sensor allows lights to only turn on when someone is nearby, saving even more energy!',
      difficulty: 'medium',
      topic: 'Advanced Features'
    },
    {
      id: 'boss-ssl-q8',
      question: 'Why is calibration important for a smart street light system?',
      options: [
        'It\'s not important',
        'To ensure the system works correctly in your specific environment',
        'To make the code more complex',
        'To use more memory'
      ],
      correctAnswer: 1,
      explanation: 'Every environment has different light conditions, so calibration ensures the threshold is set correctly!',
      difficulty: 'easy',
      topic: 'Testing and Calibration'
    },
    {
      id: 'boss-ssl-q9',
      question: 'What is the typical resistor value used with an LDR in a voltage divider?',
      options: [
        '10Ω',
        '220Ω',
        '10kΩ',
        '1MΩ'
      ],
      correctAnswer: 2,
      explanation: 'A 10kΩ resistor works well with most LDRs, providing a good range of voltage change!',
      difficulty: 'medium',
      topic: 'Circuit Design'
    },
    {
      id: 'boss-ssl-q10',
      question: 'How do smart cities benefit from interconnected street light systems?',
      options: [
        'No benefit',
        'They can share data, coordinate responses, and optimize city-wide energy usage',
        'They look cooler',
        'They are easier to install'
      ],
      correctAnswer: 1,
      explanation: 'Interconnected systems enable city-wide optimization, predictive maintenance, and coordinated responses to events!',
      difficulty: 'hard',
      topic: 'Smart Cities'
    },
    {
      id: 'boss-ssl-q11',
      question: 'What would happen if you set your threshold too high (e.g., 900)?',
      options: [
        'Lights would never turn on',
        'Lights would turn on even in daylight',
        'Lights would be brighter',
        'Nothing would change'
      ],
      correctAnswer: 1,
      explanation: 'A threshold of 900 is too high - the LDR would rarely read above this, causing lights to stay on even in daylight!',
      difficulty: 'hard',
      topic: 'Calibration'
    },
    {
      id: 'boss-ssl-q12',
      question: 'Which component protects the LED from damage?',
      options: [
        'The LDR',
        'The breadboard',
        'A current-limiting resistor (220Ω)',
        'The Arduino board'
      ],
      correctAnswer: 2,
      explanation: 'The 220Ω resistor limits current to a safe level, preventing the LED from burning out!',
      difficulty: 'easy',
      topic: 'Components'
    },
    {
      id: 'boss-ssl-q13',
      question: 'What is the relationship between light intensity and LDR resistance?',
      options: [
        'Direct - more light = more resistance',
        'Inverse - more light = less resistance',
        'No relationship',
        'Exponential - light has no effect'
      ],
      correctAnswer: 1,
      explanation: 'LDRs have inverse relationship - bright light frees more electrons, reducing resistance!',
      difficulty: 'medium',
      topic: 'LDR Sensors'
    },
    {
      id: 'boss-ssl-q14',
      question: 'In a real smart city, how might street lights communicate with each other?',
      options: [
        'Using wires between each light',
        'Wireless protocols like Zigbee, LoRa, or cellular networks',
        'They don\'t communicate',
        'Using sound waves'
      ],
      correctAnswer: 1,
      explanation: 'Modern smart cities use wireless IoT protocols like Zigbee, LoRaWAN, or cellular to create mesh networks!',
      difficulty: 'hard',
      topic: 'Smart Cities'
    },
    {
      id: 'boss-ssl-q15',
      question: 'What STEM fields are combined in a smart street light project?',
      options: [
        'Only Technology',
        'Science, Technology, Engineering, and Mathematics',
        'Only Engineering',
        'Only Science and Math'
      ],
      correctAnswer: 1,
      explanation: 'Smart street lights combine all STEM fields: Science (physics of light), Technology (sensors), Engineering (circuits), and Math (thresholds and calibration)!',
      difficulty: 'easy',
      topic: 'STEM Concepts'
    }
  ]
};