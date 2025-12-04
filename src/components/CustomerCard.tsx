import { Customer, LaundryStatus, STATUS_LABELS } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Phone, Package, Calendar } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerCardProps {
  customer: Customer;
  onStatusChange: (customerId: string, newStatus: LaundryStatus) => void;
}

export const CustomerCard = ({
  customer,
  onStatusChange,
}: CustomerCardProps) => {
  return (
    <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 border-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            {customer.name}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Phone className="w-4 h-4" />
            <span>{customer.phone}</span>
          </div>
        </div>
        <StatusBadge status={customer.status} />
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2 text-foreground">
          <Package className="w-4 h-4 mt-1 text-primary" />
          <div>
            <p className="text-sm font-medium">Items</p>
            <p className="text-sm text-muted-foreground">{customer.items}</p>
          </div>
        </div>

        {customer.notes && (
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            <p className="font-medium text-foreground mb-1">Catatan:</p>
            {customer.notes}
          </div>
        )}

        <div className="flex items-center gap-2 text-muted-foreground text-xs pt-2 border-t border-border">
          <Calendar className="w-3 h-3" />
          <span>
            {format(customer.createdAt, "dd MMMM yyyy, HH:mm", { locale: id })}
          </span>
        </div>

        <div className="pt-2">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Update Status
          </label>
          <Select
            value={customer.status}
            onValueChange={(value) =>
              onStatusChange(customer.id, value as LaundryStatus)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
