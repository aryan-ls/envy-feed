import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Share2, Timer, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultScreenProps {
  result: {
    ripeness_category: string;
    confidence_score: number;
    verdict: string;
    pori_score: number;
    details: string;
  };
  onBack: () => void;
}

export const ResultScreen = ({ result, onBack }: ResultScreenProps) => {
  const { toast } = useToast();

  const getEmoji = (category: string) => {
    const emojis = {
      'raw_and_inedible': '😔',
      'getting_yellow_be_patient': '⏰',
      'perfect_for_pori': '🎉',
      'too_sweet_mushy_mess': '😅'
    };
    return emojis[category as keyof typeof emojis] || '🤔';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'raw_and_inedible': 'bg-red-100 text-red-800',
      'getting_yellow_be_patient': 'bg-yellow-100 text-yellow-800',
      'perfect_for_pori': 'bg-green-100 text-green-800',
      'too_sweet_mushy_mess': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatCategory = (category: string) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const shareResult = () => {
    const shareText = `I just achieved a Pori-Score™ of ${result.pori_score}/10! ${result.verdict} #PoriPerfect #BananaScience`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Pori-fect Pazham Analysis',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share your pori achievement with the world",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Analyze Another Banana
        </Button>

        <Card className="text-center">
          <CardHeader>
            <div className="text-6xl mb-4">
              {getEmoji(result.ripeness_category)}
            </div>
            <CardTitle className="text-2xl">
              Analysis Complete!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Pori Score */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-lg">Pori-Score™</span>
              </div>
              <div className={`text-4xl font-bold ${getScoreColor(result.pori_score)}`}>
                {result.pori_score}/10
              </div>
            </div>

            {/* Category Badge */}
            <Badge className={`${getCategoryColor(result.ripeness_category)} text-sm px-4 py-2`}>
              {formatCategory(result.ripeness_category)}
            </Badge>

            {/* Verdict */}
            <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
              <p className="font-medium text-gray-800">
                {result.verdict}
              </p>
            </div>

            {/* Details */}
            <div className="text-left space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Confidence Level</span>
                <span className="text-sm font-bold">
                  {(result.confidence_score * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={result.confidence_score * 100} 
                className="h-2"
              />
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>AI Analysis:</strong> {result.details}
                </p>
              </div>
            </div>

            {/* Timing Advice */}
            {result.ripeness_category === 'getting_yellow_be_patient' && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex items-start gap-3">
                <Timer className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-left">
                  <p className="font-medium text-yellow-800">Timing Prediction</p>
                  <p className="text-sm text-yellow-700">
                    Optimal frying window opens in approximately 8-12 hours
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={shareResult}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Result
              </Button>
              <Button
                onClick={onBack}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                📸 Analyze Another
              </Button>
            </div>

            {/* Fun Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {Math.floor(Math.random() * 50) + 10}
                </div>
                <div className="text-xs text-gray-600">Bananas Analyzed Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {Math.floor(Math.random() * 20) + 5}
                </div>
                <div className="text-xs text-gray-600">Perfect Poris Made</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-center text-muted-foreground bg-white/50 p-3 rounded-lg">
          🧑‍🍳 <strong>Disclaimer:</strong> This app may be more accurate than your grandmother's intuition, but probably not. Use with a grain of salt (and coconut oil for frying).
        </div>
      </div>
    </div>
  );
};