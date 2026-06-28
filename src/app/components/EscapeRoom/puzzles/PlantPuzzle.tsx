import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../../ui/button';
import { Slider } from '../../ui/slider';
import { CheckCircle2, Droplets, Sun, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface PlantPuzzleProps {
  onComplete: () => void;
}

const CORRECT_THRESHOLD = 45; // Target threshold value
const THRESHOLD_RANGE = { min: 35, max: 55 }; // Acceptable range

export function PlantPuzzle({ onComplete }: PlantPuzzleProps) {
  const [threshold, setThreshold] = useState(30);
  const [isWatering, setIsWatering] = useState(false);
  const [plantStage, setPlantStage] = useState(0); // 0: dry, 1: watered, 2: growing, 3: blooming
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const waterDropsRef = useRef<HTMLDivElement>(null);

  const isWithinRange = threshold >= THRESHOLD_RANGE.min && threshold <= THRESHOLD_RANGE.max;

  const handleSubmit = () => {
    setSubmitted(true);
    
    if (isWithinRange) {
      setIsCorrect(true);
      startWateringSequence();
    } else {
      toast.error('❌ Incorrect threshold! The plant needs more precise calibration.');
      setTimeout(() => {
        setSubmitted(false);
        setIsCorrect(false);
      }, 2000);
    }
  };

  const startWateringSequence = () => {
    setIsWatering(true);
    toast.success('✅ Perfect threshold! Activating irrigation...');

    // Stage 1: Water drops appear
    setTimeout(() => {
      setPlantStage(1);
    }, 500);

    // Stage 2: Plant starts growing
    setTimeout(() => {
      setPlantStage(2);
      toast.success('🌱 Plant is growing!');
    }, 2000);

    // Stage 3: Flowers bloom
    setTimeout(() => {
      setPlantStage(3);
      setIsWatering(false);
      toast.success('🌸 Flowers bloomed! System operational!');
      setTimeout(onComplete, 1500);
    }, 4000);
  };

  const handleReset = () => {
    setThreshold(30);
    setPlantStage(0);
    setIsCorrect(false);
    setSubmitted(false);
    setIsWatering(false);
    toast.info('System reset');
  };

  const getPlantEmoji = () => {
    switch (plantStage) {
      case 0: return '🌱';
      case 1: return '🌿';
      case 2: return '🌳';
      case 3: return '🌸';
      default: return '🌱';
    }
  };

  const getPlantColor = () => {
    switch (plantStage) {
      case 0: return 'text-amber-700';
      case 1: return 'text-green-600';
      case 2: return 'text-green-700';
      case 3: return 'text-pink-600';
      default: return 'text-amber-700';
    }
  };

  const getStatusText = () => {
    if (!submitted) return 'Adjust the slider and click "Calibrate" to test.';
    if (isCorrect) {
      switch (plantStage) {
        case 1: return '💧 Watering in progress...';
        case 2: return '🌱 Plant absorbing water...';
        case 3: return '🌸 Irrigation system operational!';
        default: return 'Calibrating...';
      }
    }
    return `Threshold ${threshold}% is ${threshold < THRESHOLD_RANGE.min ? 'too low' : 'too high'}. Target: ${CORRECT_THRESHOLD}% ±10%`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-slate-600">
          Calibrate the soil moisture threshold to activate the irrigation system.
        </p>
        <p className="text-sm text-teal-600 font-medium mt-2">
          Set the threshold between 35% - 55% for optimal plant growth.
        </p>
      </div>

      {/* Plant Display */}
      <div className="relative flex items-center justify-center py-8">
        {/* Water drops animation */}
        {isWatering && plantStage === 1 && (
          <div ref={waterDropsRef} className="absolute inset-0 flex items-center justify-center">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-20, 80],
                  x: Math.sin(i * 0.8) * 40
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeOut"
                }}
                className="absolute text-blue-400 text-xl"
              >
                💧
              </motion.div>
            ))}
          </div>
        )}

        {/* Plant */}
        <motion.div
          animate={{ 
            scale: plantStage === 0 ? 0.8 : plantStage === 2 ? [0.8, 1.2, 1] : 1,
            rotate: plantStage === 3 ? [0, 5, -5, 0] : 0
          }}
          transition={{ 
            duration: plantStage === 2 ? 1 : 2,
            repeat: plantStage === 3 ? Infinity : 0
          }}
          className={`text-8xl ${getPlantColor()} relative z-10`}
        >
          {getPlantEmoji()}
        </motion.div>

        {/* Sun indicator */}
        <div className="absolute top-4 right-8">
          <Sun className={`w-8 h-8 ${plantStage === 3 ? 'text-yellow-400 animate-pulse' : 'text-slate-300'}`} />
        </div>
      </div>

      {/* Status message */}
      <div className={`text-center p-3 rounded-lg ${
        isCorrect ? 'bg-green-50 text-green-700' : 
        submitted && !isCorrect ? 'bg-red-50 text-red-700' : 
        'bg-slate-50 text-slate-600'
      }`}>
        <p className="font-medium">{getStatusText()}</p>
      </div>

      {/* Slider Control */}
      <div className="bg-slate-100 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            Moisture Threshold
          </label>
          <span className={`text-2xl font-bold ${
            isWithinRange && submitted ? 'text-green-600' : 'text-slate-700'
          }`}>
            {threshold}%
          </span>
        </div>

        {/* Custom Slider */}
        <div className="relative px-2">
          <input
            type="range"
            min="0"
            max="100"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            disabled={submitted && isCorrect}
            className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-teal-500
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110
              disabled:[&::-webkit-slider-thumb]:opacity-50"
          />
          
          {/* Target zone indicator */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-4 bg-green-300/50 rounded-full border-2 border-green-400 border-dashed"
            style={{
              left: `${THRESHOLD_RANGE.min}%`,
              width: `${THRESHOLD_RANGE.max - THRESHOLD_RANGE.min}%`
            }}
          />
        </div>

        {/* Slider labels */}
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>0%</span>
          <span className="text-green-600 font-medium">Target: 35-55%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={submitted && isCorrect}
          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-6 text-lg"
        >
          {submitted && isCorrect ? (
            <><CheckCircle2 className="w-5 h-5 mr-2" /> Calibrated!</>
          ) : (
            'Calibrate Threshold'
          )}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          disabled={submitted && isCorrect}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress indicator */}
      {plantStage > 0 && (
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3].map((stage) => (
            <div
              key={stage}
              className={`w-3 h-3 rounded-full transition-all ${
                stage <= plantStage 
                  ? 'bg-green-500 scale-125' 
                  : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}