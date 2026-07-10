import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const posts = [
  { id: 1, title: "我们的第一次旅行", date: "2024-06-15" },
  { id: 2, title: "周年纪念日", date: "2024-01-15" },
  { id: 3, title: "日常小确幸", date: "2023-10-20" },
];

export default function BlogManagePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-32">Date</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="text-muted-foreground">{post.id}</TableCell>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell className="text-muted-foreground">{post.date}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon-sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
