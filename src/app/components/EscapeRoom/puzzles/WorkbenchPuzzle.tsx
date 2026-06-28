import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../ui/button';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface WorkbenchPuzzleProps {
  onComplete: () => void;
}

interface CircuitComponent {
  id: string;
  name: string;
  icon: string;
  correctSlot: string;
}

interface Slot {
  id: string;
  label: string;
  acceptComponent: string;
}

const COMPONENTS: CircuitComponent[] = [
  { id: 'arduino', name: 'Arduino', icon: '🔲', correctSlot: 'slot-arduino' },
  { id: 'sensor', name: 'Sensor', icon: '💧', correctSlot: 'slot-sensor' },
  { id: 'breadboard', name: 'Breadboard', icon: '⬜', correctSlot: 'slot-breadboard' },
  { id: 'led', name: 'LED', icon: '💡', correctSlot: 'slot-led' },
];

const SLOTS: Slot[] = [
  { id: 'slot-arduino', label: 'Microcontroller', acceptComponent: 'arduino' },
  { id: 'slot-sensor', label: 'Input Sensor', acceptComponent: 'sensor' },
  { id: 'slot-breadboard', label: 'Circuit Board', acceptComponent: 'breadboard' },
  { id: 'slot-led', label: 'Output LED', acceptComponent: 'led' },
];

export function WorkbenchPuzzle({ onComplete }: WorkbenchPuzzleProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [placedComponents, setPlacedComponents] = useState<Record<string, string>>({});
  const [shakeSlot, setShakeSlot] = useState<string | null>(null);
  const [ledGlowing, setLedGlowing] = useState(false);

  const handleComponentClick = (componentId: string) => {
    if (placedComponents[componentId]) return;
    setSelectedComponent(componentId);
  };

  const handleSlotClick = (slotId: string) => {
    if (!selectedComponent) {
      toast.info('Select a component first');
      return;
    }

    const component = COMPONENTS.find(c => c.id === selectedComponent);
    const slot = SLOTS.find(s => s.id === slotId);

    if (!component || !slot) return;

    // Check if slot already has a component
    if (Object.values(placedComponents).includes(slotId)) {
      toast.error('Slot already occupied');
      return;
    }

    // Check if correct placement
    if (component.correctSlot === slotId) {
      setPlacedComponents(prev => ({
        ...prev,
        [component.id]: slotId
      }));
      setSelectedComponent(null);
      toast.success(`✅ ${component.name} placed correctly!`);

      // Check if LED was just placed
      if (component.id === 'led') {
        setLedGlowing(true);
      }

      // Check if all placed
      if (Object.keys(placedComponents).length + 1 === COMPONENTS.length) {
        setTimeout(onComplete, 1500);
      }
    } else {
      // Wrong placement
      setShakeSlot(slotId);
      toast.error('❌ Wrong slot! Try again.');
      setTimeout(() => setShakeSlot(null), 500);
    }
  };

  const handleReset = () => {
    setPlacedComponents({});
    setSelectedComponent(null);
    setLedGlowing(false);
    toast.info('Circuit reset');
  };

  const isComponentPlaced = (componentId: string) => {
    return placedComponents[componentId] !== undefined;
  };

  const getSlotContent = (slotId: string) => {
    const entry = Object.entries(placedComponents).find(([, slot]) => slot === slotId);
    if (entry) {
      return COMPONENTS.find(c => c.id === entry[0]);
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-slate-600">
          Build the irrigation circuit by placing each component in its correct position.
        </p>
        <p className="text-sm text-teal-600 font-medium mt-2">
          Click a component, then click its correct slot on the workbench.
        </p>
      </div>

      {/* Components Tray */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Components Tray</h3>
        <div className="flex flex-wrap gap-3 justify-center p-4 bg-slate-100 rounded-xl">
          {COMPONENTS.map((component) => {
            const isPlaced = isComponentPlaced(component.id);
            const isSelected = selectedComponent === component.id;
            
            return (
              <motion.button
                key={component.id}
                whileHover={!isPlaced ? { scale: 1.05 } : {}}
                whileTap={!isPlaced ? { scale: 0.95 } : {}}
                onClick={() => handleComponentClick(component.id)}
                disabled={isPlaced}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 min-w-[100px] ${
                  isPlaced
                    ? 'bg-slate-200 border-slate-300 opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'bg-teal-100 border-teal-400 ring-2 ring-teal-300'
                    : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-md'
                }`}
              >
                <span className="text-3xl">{component.icon}</span>
                <span className="text-sm font-medium text-slate-700">{component.name}</span>
                {isPlaced && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Workbench Slots */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Workbench</h3>
        <div className="grid grid-cols-2 gap-4 p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
          {SLOTS.map((slot) => {
            const content = getSlotContent(slot.id);
            const isShaking = shakeSlot === slot.id;
            
            return (
              <motion.button
                key={slot.id}
                animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
                onClick={() => handleSlotClick(slot.id)}
                className={`p-4 rounded-xl border-2 min-h-[100px] flex flex-col items-center justify-center gap-2 transition-all ${
                  content
                    ? 'bg-green-100 border-green-400'
                    : selectedComponent
                    ? 'bg-white border-dashed border-teal-400 hover:bg-teal-50'
                    : 'bg-white border-slate-300'
                }`}
              >
                {content ? (
                  <>
                    <span className="text-3xl">{content.icon}</span>
                    <span className="text-sm font-medium text-green-700">{content.name}</span>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </>
                ) : (
                  <>
                    <span className="text-2xl text-slate-400">📦</span>
                    <span className="text-sm text-slate-500">{slot.label}</span>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* LED Glow Effect */}
      {ledGlowing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
            <span className="text-xl">💡</span>
            <span className="text-yellow-700 font-medium">LED is glowing! Circuit complete!</span>
          </div>
        </motion.div>
      )}

      {/* Progress & Actions */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600">
          Placed: {Object.keys(placedComponents).length} / {COMPONENTS.length}
        </span>
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          className="text-slate-600"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}