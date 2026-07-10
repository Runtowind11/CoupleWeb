import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 bg-linear-to-b from-rose-50 to-white">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-rose-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
              关于我们
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              这是属于我们的故事。从相识到相知，每一个瞬间都值得被铭记。
            </p>
            <p>
              我们喜欢一起旅行、品尝美食、看日落。这个网站记录了我们一起走过的点点滴滴。
            </p>
            <p>
              愿未来的每一天，都能携手同行。
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
