import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CameraIcon, Loader2 } from "lucide-react";

interface CameraScreenProps {
  onAnalyze: (result: any) => void;
}

export const CameraScreen = ({ onAnalyze }: CameraScreenProps) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      
      setPhoto(image.dataUrl || null);
      toast({
        title: "📸 Photo captured!",
        description: "Ready to analyze your banana's pori potential",
      });
    } catch (error) {
      toast({
        title: "Camera error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const analyzePhoto = async () => {
    if (!photo) return;
    
    setAnalyzing(true);
    
    try {
      // Simulate AI analysis with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result - in real app this would call FastAPI backend
      const mockResults = [
        {
          ripeness_category: "perfect_for_pori",
          confidence_score: 0.94,
          verdict: "🎉 JACKPOT! This is THE banana for your pori dreams!",
          pori_score: 9,
          details: "Golden yellow with perfect spots - your grandmother would approve!"
        },
        {
          ripeness_category: "getting_yellow_be_patient",
          confidence_score: 0.87,
          verdict: "Almost there! Maybe wait one more day for perfection.",
          pori_score: 6,
          details: "Still a bit firm. Patience, young grasshopper!"
        },
        {
          ripeness_category: "raw_and_inedible",
          confidence_score: 0.91,
          verdict: "Patience, young grasshopper! This banana needs more time.",
          pori_score: 2,
          details: "Too green and hard. Give it 2-3 more days."
        },
        {
          ripeness_category: "too_sweet_mushy_mess",
          confidence_score: 0.88,
          verdict: "Oops! This banana missed its pori calling. Time for banana bread?",
          pori_score: 4,
          details: "Past its prime for pori, but perfect for other treats!"
        }
      ];
      
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      onAnalyze(result);
      
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Could not analyze your banana. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            🍌 Pori-fect Pazham Analyzer
          </CardTitle>
          <p className="text-muted-foreground">
            Advanced AI-powered banana ripeness detection
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {photo ? (
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-yellow-200">
                <img 
                  src={photo} 
                  alt="Captured banana" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={takePhoto}
                  variant="outline"
                  className="flex-1"
                >
                  📷 Retake Photo
                </Button>
                <Button 
                  onClick={analyzePhoto}
                  disabled={analyzing}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "🔬 Analyze Banana"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-dashed border-yellow-300">
                <CameraIcon className="w-12 h-12 text-yellow-600" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Capture Your Banana</h3>
                <p className="text-sm text-muted-foreground">
                  Position your Nendran Pazham in good lighting and tap the button below
                </p>
              </div>
              
              <Button 
                onClick={takePhoto}
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                <CameraIcon className="w-5 h-5 mr-2" />
                📸 Capture Banana Essence
              </Button>
            </div>
          )}
          
          <div className="text-xs text-center text-muted-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            💡 <strong>Pro Tip:</strong> Ensure good lighting and capture the entire banana for best results
          </div>
        </CardContent>
      </Card>
    </div>
  );
};