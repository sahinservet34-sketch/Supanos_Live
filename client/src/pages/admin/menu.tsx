import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  imageUrl: z.string().optional(),
  tags: z.string().optional(),
  spicyLevel: z.number().min(0).max(5).optional(),
  isAvailable: z.boolean().default(true),
});

type MenuItemForm = z.infer<typeof menuItemSchema>;

export default function AdminMenu() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["/api/menu/categories"],
  });

  const { data: menuItems } = useQuery({
    queryKey: ["/api/menu/items"],
  });

  const form = useForm<MenuItemForm>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      price: "",
      imageUrl: "",
      tags: "",
      spicyLevel: 0,
      isAvailable: true,
    },
  });

  const createItem = useMutation({
    mutationFn: async (data: MenuItemForm) => {
      const formattedData = {
        ...data,
        price: parseFloat(data.price),
        tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
      };
      return apiRequest("POST", "/api/menu/items", formattedData);
    },
    onSuccess: () => {
      toast({
        title: "Menu Item Created",
        description: "Menu item has been successfully created.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/menu/items"] });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/menu/items/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Menu Item Deleted",
        description: "Menu item has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/menu/items"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: MenuItemForm) => {
    createItem.mutate(data);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground uppercase">Menu Management</h1>
            <p className="text-muted-foreground">Manage your menu items</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-gold-600" data-testid="button-add-menu-item">
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Buffalo Wings" {...field} data-testid="input-item-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input placeholder="14.99" type="number" step="0.01" {...field} data-testid="input-item-price" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="spicyLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Spicy Level (0-5)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="0" 
                              type="number" 
                              min="0" 
                              max="5" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              data-testid="input-spicy-level"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Delicious buffalo wings served with celery and blue cheese dip" {...field} data-testid="textarea-description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="Spicy, Popular, House Special" {...field} data-testid="input-tags" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} data-testid="input-image-url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-accent text-accent-foreground hover:bg-gold-600"
                    disabled={createItem.isPending}
                    data-testid="button-save-item"
                  >
                    {createItem.isPending ? "Creating..." : "Create Menu Item"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems?.map((item) => (
            <Card key={item.id} className="card-shadow" data-testid={`card-menu-item-${item.id}`}>
              <CardContent className="p-6">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                )}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-card-foreground">{item.name}</h3>
                  <span className="text-xl font-numeric font-bold text-accent">${item.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.category && (
                    <Badge variant="outline">{item.category.name}</Badge>
                  )}
                  {item.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                  {item.spicyLevel && item.spicyLevel > 0 && (
                    <Badge variant="destructive">Spicy Level {item.spicyLevel}</Badge>
                  )}
                  {!item.isAvailable && (
                    <Badge variant="destructive">Unavailable</Badge>
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteItem.mutate(item.id)}
                  disabled={deleteItem.isPending}
                  data-testid={`button-delete-item-${item.id}`}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {!menuItems?.length && (
          <div className="text-center py-12" data-testid="text-no-menu-items">
            <p className="text-xl text-muted-foreground">No menu items found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
