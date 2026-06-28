import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../../ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BookshelfPuzzleProps {
  onComplete: () => void;
}

interface Component {
  id: string;
  name: string;
  icon: string;
  isCorrect: boolean;
}

const COMPONENTS: Component[] = [
  { id: 'arduino', name: 'Arduino Uno', icon: '🔲', isCorrect: true },
  { id: 'breadboard', name: 'Breadboard', icon: '⬜', isCorrect: true },
  { id: 'led', name: 'LED', icon: '💡', isCorrect: true },
  { id: 'moisture-sensor', name: 'Moisture Sensor', icon: '💧', isCorrect: true },
  { id: 'jumper-wire', name: 'Jumper Wire', icon: '🔌', isCorrect: true },
  { id: 'resistor', name: 'Resistor', icon: '🟤', isCorrect: false },
  { id: 'capacitor', name: 'Capacitor', icon: '🔵', isCorrect: false },
  { id: 'transistor', name: 'Transistor', icon: '⚡', isCorrect: false },
];

const REQUIRED_COMPONENTS = ['arduino', 'breadboard', 'led', 'moisture-sensor', 'jumper-wire'];

export function BookshelfPuzzle({ onComplete }: BookshelfPuzzleProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleComponentClick = (componentId: string) => {
    if (submitted) return;
    
    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(componentId)) {
        newSet.delete(componentId);
      } else {
        newSet.add(componentId);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) {
      toast.error('Select at least one component');
      return;
    }

    setSubmitted(true);

    // Check if all required components are selected and no incorrect ones
    const allRequiredSelected = REQUIRED_COMPONENTS.every(id => selected.has(id));
    const noIncorrectSelected = Array.from(selected).every(id => 
      REQUIRED_COMPONENTS.includes(id)
    );

    if (allRequiredSelected && noIncorrectSelected) {
      setFeedback('correct');
      toast.success('✅ All components identified correctly!');
      setTimeout(onComplete, 1500);
    } else {
      setFeedback('incorrect');
      toast.error('Some components are incorrect. Try again!');
      setTimeout(() => {
        setSubmitted(false);
        setFeedback(null);
        setSelected(new Set());
      }, 2000);
    }
  };

  const getComponentStyle = (component: Component) => {
    if (!submitted) {
      if (selected.has(component.id)) {
        return 'bg-teal-100 border-teal-400 ring-2 ring-teal-300';
      }
      return 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-teal-300';
    }

    if (component.isCorrect && selected.has(component.id)) {
      return 'bg-green-100 border-green-400 ring-2 ring-green-300';
    }
    if (!component.isCorrect && selected.has(component.id)) {
      return 'bg-red-100 border-red-400 ring-2 ring-red-300';
    }
    if (component.isCorrect && !selected.has(component.id)) {
      return 'bg-yellow-50 border-yellow-300';
    }
    return 'bg-slate-50 border-slate-200 opacity-50';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-slate-600">
          Professor Arduino needs you to identify the components required for the irrigation system.
        </p>
        <p className="text-sm text-teal-600 font-medium mt-2">
          Select all 5 required components: Arduino Uno, Breadboard, LED, Moisture Sensor, Jumper Wire
        </p>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {COMPONENTS.map((component) => (
          <motion.button
            key={component.id}
            whileHover={{ scale: submitted ? 1 : 1.05 }}
            whileTap={{ scale: submitted ? 1 : 0.95 }}
            onClick={() => handleComponentClick(component.id)}
            disabled={submitted}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2 ${getComponentStyle(component)}`}
          >
            <span className="text-4xl">{component.icon}</span>
            <span className="text-sm font-medium text-slate-700">{component.name}</span>
            {submitted && selected.has(component.id) && (
              component.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )
            )}
          </motion.button>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600">
          Selected: {selected.size} / 5 required
        </span>
        {feedback === 'correct' && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-bold flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4" />
            All correct!
          </motion.span>
        )}
        {feedback === 'incorrect' && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 font-medium flex items-center gap-1"
          >
            <XCircle className="w-4 h-4" />
            Some incorrect
          </motion.span>
        )}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={submitted || selected.size === 0}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 py-6 text-lg"
      >
        {submitted ? (
          feedback === 'correct' ? '✅ Components Verified!' : '🔄 Resetting...'
        ) : (
          'Verify Components'
        )}
      </Button>
    </div>
  );
}