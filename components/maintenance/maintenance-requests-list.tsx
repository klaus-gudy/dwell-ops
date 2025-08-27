"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MaintenanceRequestDetail } from "./maintenance-request-detail";
import type { MaintenanceRequestSummary } from "@/types/maintenance";
import { maintenancePriorities, maintenanceStatuses, maintenanceTypes } from "@/types/maintenance";
import { Clock, User, MapPin, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface MaintenanceRequestsListProps {
  requests: MaintenanceRequestSummary[];
}

export function MaintenanceRequestsList({ requests }: MaintenanceRequestsListProps) {
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Apply filters
  const applyFilters = () => {
    let filtered = requests;

    if (filterType !== "all") {
      filtered = filtered.filter(req => req.type === filterType);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(req => req.status === filterStatus);
    }

    if (filterPriority !== "all") {
      filtered = filtered.filter(req => req.priority === filterPriority);
    }

    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.tenantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.unitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  };

  // Apply filters when any dependency changes
  React.useEffect(() => {
    applyFilters();
  }, [requests, filterType, filterStatus, filterPriority, searchTerm]);

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

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {maintenanceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {maintenanceStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {maintenancePriorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{requests.filter(r => r.status === 'OPEN').length}</div>
            <p className="text-muted-foreground text-sm">Open Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{requests.filter(r => r.status === 'IN_PROGRESS').length}</div>
            <p className="text-muted-foreground text-sm">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{requests.filter(r => r.priority === 'URGENT').length}</div>
            <p className="text-muted-foreground text-sm">Urgent Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{requests.filter(r => r.assignedTo === null).length}</div>
            <p className="text-muted-foreground text-sm">Unassigned</p>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No maintenance requests found.</p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{request.title}</h3>
                      <Badge className={getPriorityColor(request.priority)}>
                        {maintenancePriorities.find(p => p.value === request.priority)?.label}
                      </Badge>
                      <Badge className={getStatusColor(request.status)}>
                        {maintenanceStatuses.find(s => s.value === request.status)?.label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{request.propertyName} - {request.unitName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{request.tenantName || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatDistanceToNow(request.createdAt, { addSuffix: true })}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-sm">
                        <strong>Type:</strong> {getTypeLabel(request.type)}
                      </span>
                      {request.assignedUserName && (
                        <span className="text-sm ml-4">
                          <strong>Assigned to:</strong> {request.assignedUserName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Maintenance Request Details</DialogTitle>
                          <DialogDescription>
                            View and manage maintenance request
                          </DialogDescription>
                        </DialogHeader>
                        <MaintenanceRequestDetail requestId={request.id} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}