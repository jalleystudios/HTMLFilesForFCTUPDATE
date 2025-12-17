import { Calendar, MapPin, Star, Zap } from 'lucide-react';
import { Event } from '@/types/event';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

const categoryColors: Record<string, string> = {
  concert: 'bg-purple-500/20 text-purple-400',
  sports: 'bg-green-500/20 text-green-400',
  theater: 'bg-rose-500/20 text-rose-400',
  comedy: 'bg-amber-500/20 text-amber-400',
  other: 'bg-slate-500/20 text-slate-400',
};

export function EventCard({ event, onClick }: EventCardProps) {
  const formattedDate = format(new Date(event.date), 'MMM d, yyyy');

  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1 border-border bg-card"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={categoryColors[event.category]}>
            {event.category}
          </Badge>
          {event.isFeatured && (
            <Badge className="bg-gold/20 text-gold">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          {event.isCurated && (
            <Badge className="bg-blue-500/20 text-blue-400">
              <Zap className="h-3 w-3 mr-1" />
              Curated
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display font-semibold text-lg text-white line-clamp-1">
            {event.name}
          </h3>
          <p className="text-sm text-white/80">{event.performer}</p>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-gold" />
          <span>{formattedDate} • {event.time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-gold" />
          <span className="line-clamp-1">{event.venue}, {event.city}</span>
        </div>

        {event.minPrice && event.maxPrice && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm">
              <span className="text-muted-foreground">Price: </span>
              <span className="font-semibold text-gold">
                ${event.minPrice} - ${event.maxPrice}
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
