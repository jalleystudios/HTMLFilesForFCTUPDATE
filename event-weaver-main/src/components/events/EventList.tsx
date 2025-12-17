import { Calendar, MapPin, Star, Zap, MoreHorizontal } from 'lucide-react';
import { Event } from '@/types/event';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface EventListProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

const categoryColors: Record<string, string> = {
  concert: 'bg-purple-500/20 text-purple-400',
  sports: 'bg-green-500/20 text-green-400',
  theater: 'bg-rose-500/20 text-rose-400',
  comedy: 'bg-amber-500/20 text-amber-400',
  other: 'bg-slate-500/20 text-slate-400',
};

export function EventList({ events, onEventClick }: EventListProps) {
  return (
    <div className="space-y-2">
      {events.map((event, index) => (
        <div
          key={event.id}
          className="group flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-gold/30 hover:bg-card/80 transition-all cursor-pointer animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={() => onEventClick?.(event)}
        >
          <div className="relative h-16 w-24 rounded-md overflow-hidden flex-shrink-0">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-secondary" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground line-clamp-1">{event.name}</h3>
              {event.isFeatured && <Star className="h-4 w-4 text-gold flex-shrink-0" />}
              {event.isCurated && <Zap className="h-4 w-4 text-blue-400 flex-shrink-0" />}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{event.performer}</p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Badge className={categoryColors[event.category]}>
              {event.category}
            </Badge>
          </div>

          <div className="hidden lg:flex flex-col items-end text-sm text-right min-w-[140px]">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
            </div>
            <span className="text-muted-foreground">{event.time}</span>
          </div>

          <div className="hidden xl:flex flex-col items-end text-sm text-right min-w-[180px]">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
            <span className="text-muted-foreground line-clamp-1">{event.city}</span>
          </div>

          {event.minPrice && event.maxPrice && (
            <div className="hidden sm:block text-right min-w-[100px]">
              <span className="font-semibold text-gold">
                ${event.minPrice}
              </span>
              <span className="text-muted-foreground text-sm"> - ${event.maxPrice}</span>
            </div>
          )}

          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
