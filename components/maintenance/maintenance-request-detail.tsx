"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getMaintenanceRequestById, getMaintenanceWorkers, updateMaintenanceRequest } from "@/lib/db/maintenance";
import { maintenancePriorities, maintenanceStatuses, maintenanceTypes } from "@/types/maintenance";
import { formatDistanceToNow, format } from "date-fns";
import { Clock, User, MapPin, Wrench, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface MaintenanceRequestDetailProps {
  requestId: string;
}

export function MaintenanceRequestDetail({ requestId }: MaintenanceRequestDetailProps) {
  const [request, setRequest] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    loadRequestDetails();
    loadWorkers();
  }, [requestId]);

  const loadRequestDetails = async () => {
    try {
      const data = await getMaintenanceRequestById(requestId);
      setRequest(data);
      setSelectedStatus(data.status);
      setSelectedWorker(data.assignedTo || "unassigned");
      setComments(data.comments || "");
    } catch (error) {
      console.error("Error loading request details:", error);
      toast.error("Failed to load request details");
    } finally {
      setLoading(false);
    }
  };

  const loadWorkers = async () => {
    try {
      const workersData = await getMaintenanceWorkers();
      setWorkers(workersData);
    } catch (error) {
      console.error("Error loading workers:", error);
    }
  };

  const handleUpdate = async () => {
    if (!request) return;
    
    setUpdating(true);
    try {
      await updateMaintenanceRequest({
        id: request.id,
        status: selectedStatus as any,
        assignedTo: selectedWorker === "unassigned" ? null : selectedWorker,
        comments: comments,
      });
      
      toast.success("Request updated successfully");
      loadRequestDetails(); // Reload to get fresh data
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Failed to update request");
    } finally {
      setUpdating(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    const priorityObj = maintenancePriorities.find(p => p.value === priority);
    return priorityObj?.color || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const statusObj = maintenanceStatuses.find(s => s.value === status);
    return statusObj?.color || "bg-gray-100 text-gray-800";
  };

  const getTypeLabel = (type: string) => {
    const typeObj = maintenanceTypes.find(t => t.value === type);
    return typeObj?.label || type;
  };

  if (loading) {
    return <div className="p-4">Loading request details...</div>;
  }

  if (!request) {
    return <div className="p-4">Request not found.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Request Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{request.title}</CardTitle>
            <div className="flex gap-2">
              <Badge className={getPriorityColor(request.priority)}>
                {maintenancePriorities.find(p => p.value === request.priority)?.label}
              </Badge>
              <Badge className={getStatusColor(request.status)}>
                {maintenanceStatuses.find(s => s.value === request.status)?.label}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{request.propertyName} - {request.unitName}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>Tenant: {request.tenantName || "Unknown"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-muted-foreground" />
              <span>Type: {getTypeLabel(request.type)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>Created: {format(request.createdAt, "PPp")}</span>
            </div>
          </div>

          {request.assignedUserName && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span><strong>Assigned to:</strong> {request.assignedUserName}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Description */}
      {request.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{request.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {request.comments ? (
            <div className="p-3 bg-muted rounded-lg mb-4">
              <p className="text-sm">{request.comments}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {format(request.updatedAt, "PPp")}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground mb-4">No comments yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Update Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Update Request</CardTitle>
          <CardDescription>
            Update the status, assignment, or add comments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {maintenanceStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Assign to Worker</label>
              <Select value={selectedWorker} onValueChange={setSelectedWorker}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a worker..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {workers.map((worker) => (
                    <SelectItem key={worker.id} value={worker.id}>
                      {worker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Comments</label>
            <Textarea
              placeholder="Add comments or updates..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              onClick={handleUpdate} 
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Request"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}