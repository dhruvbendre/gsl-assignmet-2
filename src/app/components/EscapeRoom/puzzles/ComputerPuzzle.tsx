import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../../ui/button';
import { CheckCircle2, XCircle, Terminal, Play, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface ComputerPuzzleProps {
  onComplete: () => void;
}

interface CodeLine {
  id: number;
  original: string;
  corrected: string;
  hasError: boolean;
  errorType: string;
  fixed: boolean;
}

const INITIAL_CODE: CodeLine[] = [
  { id: 1, original: 'void setup() {', corrected: 'void setup() {', hasError: false, errorType: '', fixed: false },
  { id: 2, original: '  pinMode(13, INPUT);', corrected: '  pinMode(13, OUTPUT);', hasError: true, errorType: 'Wrong pin mode', fixed: false },
  { id: 3, original: '  Serial.begin(9600)', corrected: '  Serial.begin(9600);', hasError: true, errorType: 'Missing semicolon', fixed: false },
  { id: 4, original: '}', corrected: '}', hasError: false, errorType: '', fixed: false },
  { id: 5, original: '', corrected: '', hasError: false, errorType: '', fixed: false },
  { id: 6, original: 'void loop() {', corrected: 'void loop() {', hasError: false, errorType: '', fixed: false },
  { id: 7, original: '  int sensorValue = analogRead(A0)', corrected: '  int sensorValue = analogRead(A0);', hasError: true, errorType: 'Missing semicolon', fixed: false },
  { id: 8, original: '  if (sensorValue > 500) {', corrected: '  if (sensorValue > 500) {', hasError: false, errorType: '', fixed: false },
  { id: 9, original: '    digitalWrite(13, HIGH)', corrected: '    digitalWrite(13, HIGH);', hasError: true, errorType: 'Missing semicolon', fixed: false },
  { id: 10, original: '  }', corrected: '  }', hasError: false, errorType: '', fixed: false },
  { id: 11, original: '  delay(1000)', corrected: '  delay(1000);', hasError: true, errorType: 'Missing semicolon', fixed: false },
  { id: 12, original: '}', corrected: '}', hasError: false, errorType: '', fixed: false },
];

type CompileState = 'idle' | 'compiling' | 'success' | 'error';

export function ComputerPuzzle({ onComplete }: ComputerPuzzleProps) {
  const [codeLines, setCodeLines] = useState<CodeLine[]>(INITIAL_CODE);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [compileState, setCompileState] = useState<CompileState>('idle');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const errorLines = codeLines.filter(line => line.hasError && !line.fixed);
  const fixedCount = codeLines.filter(line => line.fixed).length;
  const totalErrors = codeLines.filter(line => line.hasError).length;

  const handleLineClick = (lineId: number) => {
    const line = codeLines.find(l => l.id === lineId);
    if (line?.hasError && !line?.fixed) {
      setSelectedLine(lineId);
    }
  };

  const handleFix = () => {
    if (selectedLine === null) return;

    setCodeLines(prev => prev.map(line => {
      if (line.id === selectedLine && line.hasError && !line.fixed) {
        return { ...line, fixed: true };
      }
      return line;
    }));

    const fixedLine = codeLines.find(l => l.id === selectedLine);
    toast.success(`✅ Fixed: ${fixedLine?.errorType}`);
    setSelectedLine(null);

    // Check if all errors are fixed
    const remainingErrors = codeLines.filter(l => l.hasError && !l.fixed && l.id !== selectedLine).length;
    if (remainingErrors === 0) {
      handleCompile();
    }
  };

  const handleCompile = () => {
    const remainingErrors = codeLines.filter(l => l.hasError && !l.fixed).length;
    
    if (remainingErrors > 0) {
      setCompileState('error');
      setTerminalOutput([
        '> Compiling...',
        `> ERROR: ${remainingErrors} error(s) found`,
        '> Fix all errors before uploading.',
        '> Compilation FAILED.'
      ]);
      toast.error('Compilation failed! Fix all errors.');
      return;
    }

    setCompileState('compiling');
    setTerminalOutput(['> Compiling...']);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> Compiling libraries...']);
    }, 500);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> Linking...']);
    }, 1000);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> Upload Complete!', '> SUCCESS']);
      setCompileState('success');
      toast.success('✅ Code compiled and uploaded successfully!');
      setTimeout(onComplete, 1500);
    }, 1500);
  };

  const handleReset = () => {
    setCodeLines(INITIAL_CODE);
    setSelectedLine(null);
    setCompileState('idle');
    setTerminalOutput([]);
    toast.info('Code reset');
  };

  const getLineClass = (line: CodeLine) => {
    if (line.fixed) return 'bg-green-50 border-l-4 border-l-green-500';
    if (line.hasError && !line.fixed && line.id === selectedLine) {
      return 'bg-yellow-50 border-l-4 border-l-yellow-500';
    }
    if (line.hasError && !line.fixed) return 'bg-red-50 border-l-4 border-l-red-400';
    return 'bg-slate-50 border-l-4 border-l-transparent';
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-slate-600">
          The Arduino sketch has bugs! Fix all errors to upload the code.
        </p>
        <p className="text-sm text-teal-600 font-medium mt-2">
          Click on lines with errors, then click "Fix Error" to correct them.
        </p>
      </div>

      {/* Code Editor */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-slate-400 font-mono">irrigation_system.ino</span>
        </div>

        {/* Code Lines */}
        <div className="p-4 font-mono text-sm overflow-x-auto">
          {codeLines.map((line) => (
            <motion.div
              key={line.id}
              initial={line.hasError && !line.fixed ? { opacity: 0.7 } : {}}
              animate={{ 
                opacity: line.fixed ? 1 : (line.hasError ? 0.8 : 1),
                backgroundColor: line.fixed ? 'rgba(34, 197, 94, 0.1)' : 'transparent'
              }}
              onClick={() => handleLineClick(line.id)}
              className={`flex gap-4 px-2 py-1 rounded cursor-pointer transition-all ${
                line.id === selectedLine ? 'ring-1 ring-yellow-400' : ''
              } ${getLineClass(line)}`}
            >
              <span className="text-slate-500 select-none w-6 text-right">
                {line.id}
              </span>
              <span className={`${
                line.fixed 
                  ? 'text-green-400 line-through' 
                  : line.hasError && !line.fixed
                  ? 'text-red-400'
                  : 'text-slate-300'
              }`}>
                {line.fixed ? line.corrected : line.original}
              </span>
              {line.hasError && !line.fixed && line.id === selectedLine && (
                <span className="text-yellow-400 text-xs self-center">
                  ({line.errorType})
                </span>
              )}
              {line.fixed && (
                <CheckCircle2 className="w-4 h-4 text-green-500 self-center ml-auto" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Terminal Output */}
      {terminalOutput.length > 0 && (
        <div className="bg-black rounded-xl p-4 font-mono text-sm">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-xs">Terminal</span>
          </div>
          <div className="space-y-1">
            {terminalOutput.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-xs ${
                  line.includes('ERROR') ? 'text-red-400' :
                  line.includes('SUCCESS') ? 'text-green-400' :
                  line.includes('FAILED') ? 'text-red-400' :
                  'text-slate-400'
                }`}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {selectedLine !== null && (
          <Button
            onClick={handleFix}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600"
          >
            Fix Error
          </Button>
        )}
        <Button
          onClick={handleCompile}
          disabled={compileState === 'compiling' || compileState === 'success'}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          {compileState === 'compiling' ? (
            <><RotateCcw className="w-4 h-4 mr-2 animate-spin" /> Compiling...</>
          ) : compileState === 'success' ? (
            <><CheckCircle2 className="w-4 h-4 mr-2" /> Uploaded!</>
          ) : (
            <><Play className="w-4 h-4 mr-2" /> Compile & Upload</>
          )}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600">
          Fixed: {fixedCount} / {totalErrors} errors
        </span>
        {compileState === 'success' && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-bold"
          >
            ✅ Upload successful!
          </motion.span>
        )}
      </div>
    </div>
  );
}