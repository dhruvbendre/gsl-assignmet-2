import { BossFight } from '../types';

export const arduinoBossFight: BossFight = {
  id: 'boss-arduino-soil',
  courseId: 'arduino-soil-moisture',
  title: 'Mission Control: Final Examination',
  description: 'You\'ve completed your training. Now face the ultimate challenge - a comprehensive test of all your Arduino soil moisture knowledge. No notes. No guides. Just you and your skills. Are you ready?',
  totalQuestions: 20,
  passingScore: 70,
  xpReward: 100,
  bonusXP: 50,
  questions: [
    // Easy Questions (8)
    {
      id: 'boss-q1',
      question: 'What is the primary purpose of a soil moisture sensor?',
      options: [
        'To measure temperature',
        'To detect water levels in soil',
        'To count plants',
        'To measure sunlight'
      ],
      correctAnswer: 1,
      explanation: 'Soil moisture sensors detect how much water is present in the soil.',
      difficulty: 'easy',
      topic: 'sensors'
    },
    {
      id: 'boss-q2',
      question: 'In an Arduino sketch, which function runs repeatedly?',
      options: [
        'setup()',
        'loop()',
        'start()',
        'repeat()'
      ],
      correctAnswer: 1,
      explanation: 'The loop() function runs continuously after setup() completes.',
      difficulty: 'easy',
      topic: 'programming'
    },
    {
      id: 'boss-q3',
      question: 'What color wire is typically used for power (VCC)?',
      options: [
        'Black',
        'Red',
        'Green',
        'Blue'
      ],
      correctAnswer: 1,
      explanation: 'Red is the universal color for power connections in electronics.',
      difficulty: 'easy',
      topic: 'wiring'
    },
    {
      id: 'boss-q4',
      question: 'What does GND stand for?',
      options: [
        'Good Night Dad',
        'Ground',
        'General Network Device',
        'Green Node Detector'
      ],
      correctAnswer: 1,
      explanation: 'GND stands for Ground - the common return path for electricity.',
      difficulty: 'easy',
      topic: 'circuits'
    },
    {
      id: 'boss-q5',
      question: 'What range of values does analogRead() return?',
      options: [
        '0-100',
        '0-255',
        '0-1023',
        '0-10000'
      ],
      correctAnswer: 2,
      explanation: 'analogRead() returns values from 0 to 1023, representing voltage levels.',
      difficulty: 'easy',
      topic: 'programming'
    },
    {
      id: 'boss-q6',
      question: 'What does IoT stand for?',
      options: [
        'Internet of Technology',
        'Internet of Things',
        'Intelligent Operating Tools',
        'International Online Trading'
      ],
      correctAnswer: 1,
      explanation: 'IoT stands for Internet of Things - connected devices that communicate via the internet.',
      difficulty: 'easy',
      topic: 'concepts'
    },
    {
      id: 'boss-q7',
      question: 'A breadboard is used for:',
      options: [
        'Cutting bread',
        'Temporary circuit connections without soldering',
        'Storing components',
        'Measuring voltage'
      ],
      correctAnswer: 1,
      explanation: 'Breadboards allow temporary connections perfect for prototyping and learning.',
      difficulty: 'easy',
      topic: 'components'
    },
    {
      id: 'boss-q8',
      question: 'What happens to soil moisture sensor readings when water is added?',
      options: [
        'Readings stay the same',
        'Readings increase',
        'Readings decrease',
        'Sensor stops working'
      ],
      correctAnswer: 2,
      explanation: 'Water increases conductivity, which causes sensor readings to decrease.',
      difficulty: 'easy',
      topic: 'sensors'
    },
    
    // Medium Questions (8)
    {
      id: 'boss-q9',
      question: 'If your moisture sensor reads 250, what does this indicate?',
      options: [
        'Very dry soil',
        'Very wet soil',
        'Sensor is broken',
        'Perfect moisture level'
      ],
      correctAnswer: 1,
      explanation: 'Low readings (like 250) indicate high conductivity from wet soil.',
      difficulty: 'medium',
      topic: 'sensors'
    },
    {
      id: 'boss-q10',
      question: 'What is the purpose of pinMode() in Arduino code?',
      options: [
        'To read sensor values',
        'To configure pins as INPUT or OUTPUT',
        'To set the processing speed',
        'To turn the Arduino on/off'
      ],
      correctAnswer: 1,
      explanation: 'pinMode() configures whether a pin receives data (INPUT) or sends data (OUTPUT).',
      difficulty: 'medium',
      topic: 'programming'
    },
    {
      id: 'boss-q11',
      question: 'Why is testing important in engineering projects?',
      options: [
        'It\'s not important',
        'To identify problems and verify functionality before deployment',
        'To waste time',
        'Only for professional engineers'
      ],
      correctAnswer: 1,
      explanation: 'Testing catches errors early, prevents failures, and ensures projects work correctly.',
      difficulty: 'medium',
      topic: 'concepts'
    },
    {
      id: 'boss-q12',
      question: 'What is a threshold value in automated systems?',
      options: [
        'The maximum price',
        'A decision point that triggers specific actions',
        'The sensor\'s temperature limit',
        'The Arduino\'s memory size'
      ],
      correctAnswer: 1,
      explanation: 'Thresholds are set values that trigger actions when crossed - like watering when too dry.',
      difficulty: 'medium',
      topic: 'automation'
    },
    {
      id: 'boss-q13',
      question: 'What would happen if you connected power directly to ground?',
      options: [
        'Nothing',
        'The circuit works better',
        'A short circuit occurs (dangerous!)',
        'It charges the Arduino'
      ],
      correctAnswer: 2,
      explanation: 'Connecting power to ground creates a short circuit - dangerous and potentially damaging!',
      difficulty: 'medium',
      topic: 'circuits'
    },
    {
      id: 'boss-q14',
      question: 'Serial.println() is used to:',
      options: [
        'Print on paper',
        'Display data on the Serial Monitor for debugging',
        'Save files to disk',
        'Control motors'
      ],
      correctAnswer: 1,
      explanation: 'Serial.println() sends data to your computer\'s Serial Monitor for monitoring and debugging.',
      difficulty: 'medium',
      topic: 'programming'
    },
    {
      id: 'boss-q15',
      question: 'How can smart irrigation systems reduce water usage?',
      options: [
        'By using dirty water',
        'By only watering when soil moisture is actually low',
        'By watering less frequently randomly',
        'They don\'t reduce water usage'
      ],
      correctAnswer: 1,
      explanation: 'Smart systems monitor actual soil conditions and only water when needed, preventing waste.',
      difficulty: 'medium',
      topic: 'automation'
    },
    {
      id: 'boss-q16',
      question: 'What component would you need to control a high-power water pump with Arduino?',
      options: [
        'Only wires',
        'A relay module',
        'A bigger breadboard',
        'Nothing extra needed'
      ],
      correctAnswer: 1,
      explanation: 'Relays act as electronic switches that let low-power Arduino control high-power devices safely.',
      difficulty: 'medium',
      topic: 'components'
    },
    
    // Hard Questions (4)
    {
      id: 'boss-q17',
      question: 'You notice your sensor readings are erratic and jumping randomly. What is the MOST likely cause?',
      options: [
        'The Arduino is broken',
        'Loose wire connections or electrical noise',
        'The soil is possessed',
        'You need a new computer'
      ],
      correctAnswer: 1,
      explanation: 'Erratic readings usually indicate loose connections or electrical interference. Check all wiring first!',
      difficulty: 'hard',
      topic: 'troubleshooting'
    },
    {
      id: 'boss-q18',
      question: 'If you wanted to water different plants with different moisture needs, what programming concept would you use?',
      options: [
        'Only one loop()',
        'Multiple conditional statements with different thresholds',
        'Delete the code and start over',
        'Just use one threshold for all plants'
      ],
      correctAnswer: 1,
      explanation: 'Different plants need different thresholds - use multiple if-else statements to handle each zone independently.',
      difficulty: 'hard',
      topic: 'programming'
    },
    {
      id: 'boss-q19',
      question: 'What is the main advantage of using analog sensors over digital sensors for soil moisture?',
      options: [
        'They\'re cheaper',
        'They provide continuous readings showing moisture levels, not just wet/dry',
        'They use less power',
        'They\'re easier to wire'
      ],
      correctAnswer: 1,
      explanation: 'Analog sensors give you precise moisture levels (0-1023), while digital only tells you wet or dry.',
      difficulty: 'hard',
      topic: 'sensors'
    },
    {
      id: 'boss-q20',
      question: 'Your moisture detector works perfectly indoors but fails outdoors. What is the BEST solution?',
      options: [
        'Give up on outdoor use',
        'Protect electronics from weather, possibly add solar power, and use waterproof sensors',
        'Just put everything in a plastic bag',
        'Only check moisture when sunny'
      ],
      correctAnswer: 1,
      explanation: 'Outdoor projects need weatherproofing, reliable power (solar), and components rated for outdoor use.',
      difficulty: 'hard',
      topic: 'real-world'
    }
  ]
};
