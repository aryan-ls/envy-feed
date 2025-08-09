import { useState } from "react";
import { CameraScreen } from "@/components/CameraScreen";
import { ResultScreen } from "@/components/ResultScreen";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'camera' | 'result'>('camera');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = (result: any) => {
    setAnalysisResult(result);
    setCurrentScreen('result');
  };

  const handleBack = () => {
    setCurrentScreen('camera');
    setAnalysisResult(null);
  };

  if (currentScreen === 'result' && analysisResult) {
    return <ResultScreen result={analysisResult} onBack={handleBack} />;
  }

  return <CameraScreen onAnalyze={handleAnalyze} />;
};

export default Index;
