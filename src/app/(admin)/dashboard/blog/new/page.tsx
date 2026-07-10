import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AutoSlugForm from "./AutoSlugForm";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">写新文章</h1>
      <Card>
        <CardHeader>
          <CardTitle>文章详情</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoSlugForm />
        </CardContent>
      </Card>
    </div>
  );
}
