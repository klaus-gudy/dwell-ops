"use client";

import { useState } from "react";
import { AddPropertySchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProperty } from "@/lib/db/property";
import { Plus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export function AddPropertyDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof AddPropertySchema>>({
    resolver: zodResolver(AddPropertySchema),
    defaultValues: {
      name: "",
      description: "",
      street: "",
      district: "",
      city: "",
      buildingType: "",
      yearBuilt: new Date().getFullYear(),
      areaInSquareFeet: undefined,
      numberOfFloors: undefined,
      parkingSpaces: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof AddPropertySchema>) {
    createProperty(values)
      .then(() => {
        form.reset();
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error creating property:", error);
      });
  }

  const buildingTypes = [
    "Apartment",
    "House",
    "Townhouse",
    "Commercial",
    "Industrial",
    "Land",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Plus className="w-4 h-4" /> Add property
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add new property</DialogTitle>
          <DialogDescription>
            Enter the details for the new property listing.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[28rem] pr-2">
            
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-4xl p-1 pr-2 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Placeholder"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street address</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" type="text" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" type="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" type="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="buildingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type of property" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {buildingTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="yearBuilt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year built</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" type="number" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="areaInSquareFeet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area (sq ft)</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" type="number" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="numberOfFloors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of floors</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" type="number" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="parkingSpaces"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parking spaces</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="text" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add property</Button>
          </div>
          </form>
        </Form>
        </ScrollArea>

      </DialogContent>
    </Dialog>
  );
}
