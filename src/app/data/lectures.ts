import { Course, Badge, BossFight } from '../types';
import { arduinoCourse } from './arduino-course';
import { obstacleCourse } from './obstacle-course';
import { smartStreetLightCourse } from './smart-street-light';
import { soilMoistureBossFight } from './soil-moisture-boss-fight';
import { smartStreetLightBossFight } from './smart-street-light-boss-fight';

export interface Lecture {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  badge: {
    name: string;
    description: string;
    icon: string;
  };
  course: Course;
  bossFight: BossFight;
  color: string;
  bgColor: string;
  textColor: string;
  icon: string;
  topics: string[];
}

export const lectures: Lecture[] = [
  {
    id: 'soil-moisture',
    title: 'Soil Moisture Detection Using Arduino',
    shortTitle: 'Soil Moisture Detection',
    description: 'Build a smart irrigation system that measures soil moisture and automatically waters plants at the perfect time!',
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours',
    badge: {
      name: 'Water Guardian Badge',
      description: 'Awarded for mastering soil moisture detection and smart irrigation systems.',
      icon: '💧'
    },
    course: arduinoCourse,
    bossFight: soilMoistureBossFight,
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    icon: '🌱',
    topics: [
      'Introduction to Arduino',
      'Soil Moisture Sensors',
      'Smart Irrigation',
      'Automation & Control'
    ]
  },
  {
    id: 'smart-street-light',
    title: 'Smart Street Light Using Arduino',
    shortTitle: 'Smart Street Light',
    description: 'Create an automatic street lighting system that responds to ambient light levels, saving energy and enabling smart city infrastructure!',
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours',
    badge: {
      name: 'Smart City Innovator Badge',
      description: 'Awarded for mastering smart street lighting and city automation systems.',
      icon: '💡'
    },
    course: smartStreetLightCourse,
    bossFight: smartStreetLightBossFight,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    icon: '🌃',
    topics: [
      'Smart City Concepts',
      'LDR Light Sensors',
      'Automatic Lighting',
      'Energy Efficiency'
    ]
  }
];

// Helper function to get lecture by ID
export function getLectureById(id: string): Lecture | undefined {
  return lectures.find(lecture => lecture.id === id);
}

// Helper function to get course by lecture ID
export function getCourseByLectureId(id: string): Course | undefined {
  const lecture = getLectureById(id);
  return lecture?.course;
}

// Helper function to get boss fight by lecture ID
export function getBossFightByLectureId(id: string): BossFight | undefined {
  const lecture = getLectureById(id);
  return lecture?.bossFight;
}

// Helper function to get badge info by lecture ID
export function getBadgeByLectureId(id: string): Badge | undefined {
  const lecture = getLectureById(id);
  if (!lecture) return undefined;
  
  return {
    id: `badge-${lecture.id}`,
    name: lecture.badge.name,
    description: lecture.badge.description,
    icon: lecture.badge.icon,
    courseId: lecture.course.id
  };
}

// Map course IDs to lecture IDs for backward compatibility
export const courseIdToLectureId: Record<string, string> = {
  'arduino-soil-moisture': 'soil-moisture',
  'smart-street-light': 'smart-street-light'
};

// Map lecture IDs to course IDs
export const lectureIdToCourseId: Record<string, string> = {
  'soil-moisture': 'arduino-soil-moisture',
  'smart-street-light': 'smart-street-light'
};