import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { EventFilters } from '@/components/events/EventFilters';
import { EventCard } from '@/components/events/EventCard';
import { EventList } from '@/components/events/EventList';
import { mockEvents } from '@/data/mockEvents';
import { ViewMode, SortField, SortOrder, Event } from '@/types/event';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredEvents = useMemo(() => {
    let events = [...mockEvents];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      events = events.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.performer.toLowerCase().includes(query) ||
          e.venue.toLowerCase().includes(query) ||
          e.city.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      events = events.filter((e) => e.category === categoryFilter);
    }

    // Sort
    events.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'venue':
          comparison = a.venue.localeCompare(b.venue);
          break;
        case 'city':
          comparison = a.city.localeCompare(b.city);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return events;
  }, [searchQuery, categoryFilter, sortField, sortOrder]);

  const handleEventClick = (event: Event) => {
    console.log('Event clicked:', event);
    // TODO: Open event detail modal
  };

  return (
    <DashboardLayout>
      <DashboardHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <EventFilters
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortField={sortField}
          onSortFieldChange={setSortField}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          totalEvents={filteredEvents.length}
        />

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <EventCard event={event} onClick={() => handleEventClick(event)} />
              </div>
            ))}
          </div>
        ) : (
          <EventList events={filteredEvents} onEventClick={handleEventClick} />
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Index;
