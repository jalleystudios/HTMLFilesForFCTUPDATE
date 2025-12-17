import { Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ViewMode, SortField, SortOrder } from '@/types/event';

interface EventFiltersProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortField: SortField;
  onSortFieldChange: (field: SortField) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  totalEvents: number;
}

export function EventFilters({
  viewMode,
  onViewModeChange,
  sortField,
  onSortFieldChange,
  categoryFilter,
  onCategoryFilterChange,
  totalEvents,
}: EventFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <h2 className="font-display font-semibold text-xl">Events</h2>
        <span className="text-sm text-muted-foreground">({totalEvents})</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
          <SelectTrigger className="w-[140px] bg-secondary border-0">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="concert">Concerts</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="theater">Theater</SelectItem>
            <SelectItem value="comedy">Comedy</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortField} onValueChange={(v) => onSortFieldChange(v as SortField)}>
          <SelectTrigger className="w-[130px] bg-secondary border-0">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="venue">Venue</SelectItem>
            <SelectItem value="city">City</SelectItem>
          </SelectContent>
        </Select>

        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(v) => v && onViewModeChange(v as ViewMode)}
          className="bg-secondary rounded-lg p-1"
        >
          <ToggleGroupItem value="grid" aria-label="Grid view" className="data-[state=on]:bg-gold data-[state=on]:text-primary-foreground">
            <Grid3X3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view" className="data-[state=on]:bg-gold data-[state=on]:text-primary-foreground">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
