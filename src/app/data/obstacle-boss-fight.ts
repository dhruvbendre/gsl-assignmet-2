import { BossFight } from '../types';

export const obstacleBossFight: BossFight = {
  id: 'boss-arduino-obstacle',
  courseId: 'arduino-obstacle-alarm',
  title: 'Security System: Final Challenge',
  description: 'You\'ve mastered ultrasonic sensors and obstacle detection. Now prove your skills in this comprehensive challenge! Design a complete security system that detects intruders, triggers alarms, and logs events. No notes. No guides. Just your expertise. Are you ready to become a Safety Sentinel?',
  totalQuestions: 20,
  passingScore: 70,
  xpReward: 100,
  bonusXP: 50,
  questions: [
    // Easy Questions (8)
    {
      id: 'obs-boss-q1',
      question: 'What is the operating frequency of the HC-SR04 ultrasonic sensor?',
      options: [
        '20 kHz',
        '40 kHz',
        '100 kHz',
        '1 MHz'
      ],
      correctAnswer: 1,
      explanation: 'The HC-SR04 operates at 40 kHz, which is well above human hearing range (20 kHz).',
      difficulty: 'easy',
      topic: 'sensors'
    },
    {
      id: 'obs-boss-q2',
      question: 'How long should the Trig pin be set HIGH to trigger a measurement?',
      options: [
        '1 microsecond',
        '10 microseconds',
        '100 microseconds',
        '1 millisecond'
      ],
      correctAnswer: 1,
      explanation: 'A 10 microsecond HIGH pulse on the Trig pin triggers the sensor to send 8 cycles of ultrasonic waves.',
      difficulty: 'easy',
      topic: 'programming'
    },
    {
      id: 'obs-boss-q3',
      question: 'What is the formula to calculate distance from the Echo pulse duration?',
      options: [
        'distance = duration × 0.0343',
        'distance = (duration × 0.0343) / 2',
        'distance = duration / 0.0343',
        'distance = duration × 2'
      ],
      correctAnswer: 1,
      explanation: 'We divide by 2 because sound travels to the object AND back, so the total distance is twice the actual distance.',
      difficulty: 'easy',
      topic: 'sensors'
    },
    {
      id: 'obs-boss-q4',
      question: 'What does the Echo pin output?',
      options: [
        'A continuous analog voltage',
        'A pulse whose width equals time of flight',
        'The distance in centimeters directly',
        'A digital 1 if object detected, 0 otherwise'
      ],
      correctAnswer: 1,
      explanation: 'The Echo pin outputs a HIGH pulse whose duration (in microseconds) equals the time for sound to travel to the object and back.',
      difficulty: 'easy',
      topic: 'sensors'
    },
    {
      id: 'obs-boss-q5',
      question: 'Why do we use a current-limiting resistor with an LED?',
      options: [
        'To make it dimmer',
        'To prevent excessive current that would destroy the LED',
        'To change its color',
        'To make it blink faster'
      ],
      correctAnswer: 1,
      explanation: 'LEDs have very low internal resistance, so without a current-limiting resistor, too much current flows and burns them out.',
      difficulty: 'easy',
      topic: 'circuits'
    },
    {
      id: 'obs-boss-q6',
      question: 'What Arduino function generates a tone at a specific frequency?',
      options: [
        'analogWrite()',
        'digitalWrite()',
        'tone()',
        'sound()'
      ],
      correctAnswer: 2,
      explanation: 'tone(pin, frequency) generates a square wave at the specified frequency, which creates sound from a piezo buzzer.',
      difficulty: 'easy',
      topic: 'programming'
    },
    {
      id: 'obs-boss-q7',
      question: 'What is the typical detection range of the HC-SR04?',
      options: [
        '1cm to 50cm',
        '2cm to 400cm',
        '10cm to 10m',
        '1m to 100m'
      ],
      correctAnswer: 1,
      explanation: 'The HC-SR04 can detect objects from 2cm to 400cm (4 meters) away.',
      difficulty: 'easy',
      topic: 'sensors'
    },
    {
      id: 'obs-boss-q8',
      question: 'Which animal uses echolocation similar to ultrasonic sensors?',
      options: [
        'Eagle',
        'Shark',
        'Bat',
        'Snake'
      ],
      correctAnswer: 2,
      explanation: 'Bats use echolocation - sending sound waves and listening for echoes - the same principle as ultrasonic sensors.',
      difficulty: 'easy',
      topic: 'concepts'
    },

    // Medium Questions (8)
    {
      id: 'obs-boss-q9',
      question: 'If an object is 10cm away, approximately how long will the Echo pulse be?',
      options: [
        '~29 microseconds',
        '~58 microseconds',
        '~290 microseconds',
        '~580 microseconds'
      ],
      correctAnswer: 3,
      explanation: 'Duration = (2 × distance) / speed of sound = (2 × 10cm) / 0.0343 cm/µs ≈ 583 µs. The sound travels 20cm total (to object and back).',
      difficulty: 'medium',
      topic: 'sensors'
    },
    {
      id: 'obs-boss-q10',
      question: 'What is the purpose of adding a delay between ultrasonic sensor readings?',
      options: [
        'To save battery power',
        'To allow previous sound waves to dissipate and avoid echo interference',
        'To make the Arduino run faster',
        'To reduce memory usage'
      ],
      correctAnswer: 1,
      explanation: 'A delay (typically 50-100ms) prevents the sensor from detecting echoes from previous pulses, ensuring each reading is independent.',
      difficulty: 'medium',
      topic: 'programming'
    },
    {
      id: 'obs-boss-q11',
      question: 'What happens when an ultrasonic wave hits a soft, angled surface?',
      options: [
        'It reflects perfectly back to the sensor',
        'It gets absorbed or reflected away from the sensor, causing inaccurate readings',
        'It bounces back stronger',
        'Nothing - the sensor can\'t detect any surfaces'
      ],
      correctAnswer: 1,
      explanation: 'Soft materials absorb sound waves, and angled surfaces reflect them away from the sensor, both causing inaccurate or missing readings.',
      difficulty: 'medium',
      topic: 'sensors'
    },
    {
      id: 'obs-boss-q12',
      question: 'How can you create a graduated warning system with LEDs?',
      options: [
        'Use only one LED that changes brightness',
        'Use multiple LEDs (green, yellow, red) with different distance thresholds',
        'Flash all LEDs simultaneously',
        'Use LEDs of different sizes'
      ],
      correctAnswer: 1,
      explanation: 'Multiple LEDs with different distance thresholds create a traffic-light system: green for safe, yellow for caution, red for danger.',
      difficulty: 'medium',
      topic: 'automation'
    },
    {
      id: 'obs-boss-q13',
      question: 'What is the speed of sound in air at room temperature?',
      options: [
        '3 m/s',
        '30 m/s',
        '343 m/s',
        '3000 m/s'
      ],
      correctAnswer: 2,
      explanation: 'Sound travels at approximately 343 meters per second (0.0343 cm/µs) in air at 20°C.',
      difficulty: 'medium',
      topic: 'concepts'
    },
    {
      id: 'obs-boss-q14',
      question: 'What does the pulseIn() function do?',
      options: [
        'Generates a pulse on a pin',
        'Measures the duration of a pulse in microseconds',
        'Counts the number of pulses',
        'Converts analog signals to digital'
      ],
      correctAnswer: 1,
      explanation: 'pulseIn() waits for a pin to change state, then measures how long (in microseconds) it stays in that state.',
      difficulty: 'medium',
      topic: 'programming'
    },
    {
      id: 'obs-boss-q15',
      question: 'How does a servo motor help in obstacle detection?',
      options: [
        'It makes the sensor more accurate',
        'It allows scanning in multiple directions to create a wider detection field',
        'It increases the sensor range',
        'It reduces power consumption'
      ],
      correctAnswer: 1,
      explanation: 'Mounting the sensor on a servo allows it to sweep across an arc, detecting obstacles in multiple directions like a radar.',
      difficulty: 'medium',
      topic: 'automation'
    },
    {
      id: 'obs-boss-q16',
      question: 'What coordinate system is created when scanning with a servo?',
      options: [
        'Cartesian (X, Y)',
        'Polar (angle, distance)',
        'Spherical',
        'Binary'
      ],
      correctAnswer: 1,
      explanation: 'Servo scanning creates polar coordinates - each reading has an angle (servo position) and a distance (sensor reading).',
      difficulty: 'medium',
      topic: 'concepts'
    },

    // Hard Questions (4)
    {
      id: 'obs-boss-q17',
      question: 'Your obstacle detection system works indoors but gives erratic readings outdoors. What is the MOST likely cause?',
      options: [
        'The Arduino is overheating',
        'Wind, temperature changes, and multiple reflections from outdoor surfaces',
        'The sensor needs more power outdoors',
        'Outdoor light interferes with ultrasonic sensors'
      ],
      correctAnswer: 1,
      explanation: 'Outdoor environments introduce wind (affects sound waves), temperature variations (changes sound speed), and complex surfaces causing multiple reflections.',
      difficulty: 'hard',
      topic: 'troubleshooting'
    },
    {
      id: 'obs-boss-q18',
      question: 'You want to detect obstacles in a 360° circle around a robot. What is the BEST approach?',
      options: [
        'Use one sensor and rotate the entire robot',
        'Use multiple ultrasonic sensors positioned around the robot, or a 360° rotating servo',
        'Use a bigger sensor',
        'It\'s impossible with ultrasonic sensors'
      ],
      correctAnswer: 1,
      explanation: 'Multiple sensors or a continuously rotating servo platform can provide 360° coverage for complete obstacle detection.',
      difficulty: 'hard',
      topic: 'automation'
    },
    {
      id: 'obs-boss-q19',
      question: 'Why might two ultrasonic sensors placed close together interfere with each other?',
      options: [
        'They share the same power supply',
        'One sensor might detect the echo from the other sensor\'s transmission',
        'They generate too much heat together',
        'Their magnetic fields interfere'
      ],
      correctAnswer: 1,
      explanation: 'When multiple ultrasonic sensors operate simultaneously, one sensor\'s receiver can pick up another sensor\'s transmitted pulse, causing false readings. Solution: trigger them sequentially.',
      difficulty: 'hard',
      topic: 'troubleshooting'
    },
    {
      id: 'obs-boss-q20',
      question: 'For a security system, you need to detect a person approaching from up to 5 meters away. The HC-SR04\'s maximum range is 4 meters. What is the BEST solution?',
      options: [
        'Accept the 4 meter limit and adjust your security perimeter',
        'Use a sensor with longer range (like MaxBotix MB1010), or use multiple HC-SR04 sensors in a chain',
        'Amplify the HC-SR04 signal with an op-amp',
        'Point the sensor upward to detect from farther away'
      ],
      correctAnswer: 1,
      explanation: 'When a sensor\'s range is insufficient, either upgrade to a longer-range sensor or use multiple sensors strategically placed to cover the required distance.',
      difficulty: 'hard',
      topic: 'real-world'
    }
  ]
};