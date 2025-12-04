import { LaundryStatus, STATUS_LABELS, STATUS_COLORS } from "@/types/customer";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: LaundryStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge 
      className={`bg-${STATUS_COLORS[status]} text-white border-0 font-medium px-3 py-1`}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
};
