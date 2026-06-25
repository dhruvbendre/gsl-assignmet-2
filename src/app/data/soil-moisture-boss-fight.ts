import { BossFight } from '../types';

export const soilMoistureBossFight: BossFight = {
  id: 'boss-soil-moisture',
  courseId: 'arduino-soil-moisture',
  title: 'The Drought King: Final Challenge',
  description: 'The Drought King threatens the land with water scarcity! Use your knowledge of soil moisture sensors, smart irrigation, and Arduino automation to defeat him and become the Water Guardian. No notes. No guides. Just your expertise in water conservation!',
  totalQuestions: 15,
  passingScore: 70,
  xpReward: 50,
  bonusXP: 25,
  questions: [
    // Easy Questions
    {
      id: 'sm-boss-q1',
      question: 'What does a soil moisture sensor measure?',
      options: [
        'Air temperature',
        'Water content in the soil',
        'Soil pH level',
        'Sunlight intensity'
      ],
      correctAnswer: 1,
      explanation: 'Soil moisture sensors measure the water content in soil, helping determine when plants need watering!',
      difficulty: 'easy',
      topic: 'Soil Moisture Sensors'
    },
    {
      id: 'sm-boss-q2',
      question: 'What type of reading does a typical soil moisture sensor provide?',
      options: [
        'Only digital (0 or 1)',
        'Only analog (0-1023)',
        'Both analog and digital outputs',
        'Neither - it uses wireless'
      ],
      correctAnswer: 2,
      explanation: 'Most soil moisture sensors provide both analog output (for precise readings) and digital output (for threshold-based detection)!',
      difficulty: 'easy',
      topic: 'Soil Moisture Sensors'
    },
    {
      id: 'sm-boss-q3',
      question: 'What Arduino function is used to read soil moisture sensor values?',
      options: [
        'digitalRead()',
        'analogRead()',
        'pinMode()',
        'Serial.print()'
      ],
      correctAnswer: 1,
      explanation: 'analogRead() reads values from 0-1023, allowing precise measurement of soil moisture levels!',
      difficulty: 'easy',
      topic: 'Arduino Programming'
    },
    {
      id: 'sm-boss-q4',
      question: 'What does a LOW analog reading (close to 0) typically indicate?',
      options: [
        'Very wet soil',
        'Very dry soil',
        'Perfect moisture level',
        'Sensor error'
      ],
      correctAnswer: 0,
      explanation: 'Lower analog values indicate wetter soil because water conducts electricity better, reducing resistance!',
      difficulty: 'easy',
      topic: 'Soil Moisture Sensors'
    },
    {
      id: 'sm-boss-q5',
      question: 'What is the main benefit of automated irrigation systems?',
      options: [
        'They make plants grow faster',
        'They save water by watering only when needed',
        'They eliminate the need for soil',
        'They make plants glow in the dark'
      ],
      correctAnswer: 1,
      explanation: 'Automated irrigation systems conserve water by activating only when soil moisture falls below the threshold!',
      difficulty: 'easy',
      topic: 'Smart Irrigation'
    },
    {
      id: 'sm-boss-q6',
      question: 'Which component is commonly used to control a water pump in an Arduino irrigation system?',
      options: [
        'LED',
        'Relay module',
        'Buzzer',
        'Button'
      ],
      correctAnswer: 1,
      explanation: 'A relay module acts as an electrically controlled switch, allowing the Arduino to safely control high-power devices like water pumps!',
      difficulty: 'easy',
      topic: 'Arduino Connections'
    },
    {
      id: 'sm-boss-q7',
      question: 'What is the typical voltage requirement for an Arduino soil moisture sensor?',
      options: [
        '1.5V',
        '3.3V or 5V',
        '12V',
        '24V'
      ],
      correctAnswer: 1,
      explanation: 'Most soil moisture sensors work with 3.3V or 5V, making them compatible with Arduino\'s power pins!',
      difficulty: 'easy',
      topic: 'Arduino Connections'
    },
    {
      id: 'sm-boss-q8',
      question: 'Why is it important to calibrate soil moisture sensors?',
      options: [
        'To make the code longer',
        'Different soil types have different moisture characteristics',
        'To use more memory',
        'It\'s not important'
      ],
      correctAnswer: 1,
      explanation: 'Different soils (clay, sand, loam) retain water differently, so calibration ensures accurate readings for your specific soil type!',
      difficulty: 'easy',
      topic: 'Calibration'
    },

    // Medium Questions
    {
      id: 'sm-boss-q9',
      question: 'If your soil moisture sensor reads 400 when dry and 800 when wet, what threshold would trigger watering?',
      options: [
        '300',
        '500',
        '900',
        '100'
      ],
      correctAnswer: 1,
      explanation: 'A threshold of 500 is appropriate - when the reading drops below this (soil gets drier), the system should water the plants!',
      difficulty: 'medium',
      topic: 'Calibration'
    },
    {
      id: 'sm-boss-q10',
      question: 'What is the purpose of adding hysteresis to an irrigation system?',
      options: [
        'To make the system more complex',
        'To prevent rapid on/off cycling of the pump',
        'To increase water usage',
        'To decrease sensor accuracy'
      ],
      correctAnswer: 1,
      explanation: 'Hysteresis adds a buffer zone - turn on at one threshold, turn off at another - preventing the pump from rapidly cycling on and off!',
      difficulty: 'medium',
      topic: 'Automation'
    },
    {
      id: 'sm-boss-q11',
      question: 'How can you extend the life of a capacitive soil moisture sensor?',
      options: [
        'Leave it in water all the time',
        'Coat it with waterproof conformal coating',
        'Use it only at night',
        'Store it in the freezer'
      ],
      correctAnswer: 1,
      explanation: 'Capacitive sensors resist corrosion better than resistive ones, but conformal coating adds extra protection against moisture damage!',
      difficulty: 'medium',
      topic: 'Hardware'
    },
    {
      id: 'sm-boss-q12',
      question: 'What is the advantage of using multiple soil moisture sensors in a garden?',
      options: [
        'It uses more Arduino pins',
        'Different areas may have different moisture levels',
        'It makes the code more complex',
        'There is no advantage'
      ],
      correctAnswer: 1,
      explanation: 'Sun exposure, soil type, and plant types vary across a garden, so multiple sensors ensure each zone gets the right amount of water!',
      difficulty: 'medium',
      topic: 'Smart Irrigation'
    },
    {
      id: 'sm-boss-q13',
      question: 'What is the relationship between soil moisture sensor reading and actual water content?',
      options: [
        'Higher reading = drier soil',
        'Higher reading = wetter soil',
        'No relationship',
        'Reading is always constant'
      ],
      correctAnswer: 1,
      explanation: 'Higher analog readings indicate wetter soil because water increases conductivity between the sensor probes!',
      difficulty: 'medium',
      topic: 'Soil Moisture Sensors'
    },
    {
      id: 'sm-boss-q14',
      question: 'How can you make an irrigation system \"smart\" beyond just soil moisture?',
      options: [
        'Add more sensors only',
        'Integrate weather forecasts to skip watering before rain',
        'Make it water at random times',
        'Use a bigger pump'
      ],
      correctAnswer: 1,
      explanation: 'Smart systems can check weather forecasts and skip watering if rain is expected, saving even more water!',
      difficulty: 'medium',
      topic: 'Smart Irrigation'
    },

    // Hard Questions
    {
      id: 'sm-boss-q15',
      question: 'Your irrigation system waters plants every day even though the soil is wet. What is the MOST likely issue?',
      options: [
        'The pump is too powerful',
        'The threshold is set too high or the sensor is faulty',
        'The Arduino is broken',
        'The plants are thirsty'
      ],
      correctAnswer: 1,
      explanation: 'If watering occurs when soil is wet, the threshold may be set incorrectly (too high), or the sensor may be giving false dry readings due to corrosion or damage!',
      difficulty: 'hard',
      topic: 'Troubleshooting'
    }
  ]
};