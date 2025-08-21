import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { HardDrive, TrendingUp, Zap } from "lucide-react";

export function StorageUsage() {
  const usedStorage = 45.2; // GB
  const totalStorage = 100; // GB
  const usagePercentage = (usedStorage / totalStorage) * 100;

  const getUsageColor = (percentage) => {
    if (percentage < 70) return "text-success";
    if (percentage < 90) return "text-warning";
    return "text-destructive";
  };

  const formatStorage = (gb) => {
    if (gb < 1) return `${(gb * 1024).toFixed(0)} MB`;
    return `${gb.toFixed(1)} GB`;
  };

  return (
    <Card className="bg-gradient-to-br from-card/50 to-accent/10 border-accent/20 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center space-x-2">
          <HardDrive className="h-4 w-4 text-primary" />
          <span>Storage Usage</span>
        </CardTitle>
        <div className="h-8 w-8 gradient-ai rounded-full flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Used</span>
              <span className={`font-medium ${getUsageColor(usagePercentage)}`}>
                {formatStorage(usedStorage)} of {formatStorage(totalStorage)}
              </span>
            </div>
            <Progress 
              value={usagePercentage} 
              className="h-2"
            />
            <div className="text-xs text-muted-foreground">
              {usagePercentage.toFixed(1)}% used
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-lg font-bold text-primary">{formatStorage(totalStorage - usedStorage)}</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-accent-foreground">2.3 GB</div>
              <div className="text-xs text-muted-foreground">This month</div>
            </div>
          </div>

          {usagePercentage > 80 && (
            <div className="pt-2">
              <Button 
                size="sm" 
                className="w-full gradient-primary text-white shadow-lg hover:shadow-glow transition-all duration-300"
              >
                <Zap className="mr-2 h-3 w-3" />
                Upgrade Storage
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
