import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CalendarDays, 
  Users, 
  Film, 
  Star, 
  Building2, 
  BookOpen,
  Link as LinkIcon
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AnimeDetailModalProps {
  anime: Element | null;
  isOpen: boolean;
  onClose: () => void;
}

const AnimeDetailModal = ({ anime, isOpen, onClose }: AnimeDetailModalProps) => {
  if (!anime) return null;

  const getInfo = (type: string) => {
    const elements = anime.getElementsByTagName("info");
    const results: string[] = [];
    
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.getAttribute("type") === type) {
        results.push(element.textContent || "");
      }
    }
    
    return results;
  };

  const mainTitle = getInfo("Main title")[0];
  const altTitles = getInfo("Alternative title");
  const image = anime.querySelector("info[type='Picture'] img")?.getAttribute("src");
  const plot = getInfo("Plot Summary")[0];
  const genres = getInfo("Genres");
  const themes = getInfo("Themes");
  const vintage = getInfo("Vintage")[0];
  const episodes = getInfo("Number of episodes")[0];
  const type = anime.getAttribute("type");
  const relatedWorks = Array.from(anime.getElementsByTagName("related-prev")).map((related) => ({
    id: related.getAttribute("id") || "",
    type: related.getAttribute("rel") || "",
    title: related.textContent || "",
  }));
  const staff = Array.from(anime.getElementsByTagName("staff")).map((staff) => ({
    task: staff.getElementsByTagName("task")[0]?.textContent || "",
    person: staff.getElementsByTagName("person")[0]?.textContent || "",
  }));
  const cast = Array.from(anime.getElementsByTagName("cast")).map((cast) => ({
    role: cast.getElementsByTagName("role")[0]?.textContent || "",
    person: cast.getElementsByTagName("person")[0]?.textContent || "",
  }));
  const credits = Array.from(anime.getElementsByTagName("credit")).map((credit) => ({
    task: credit.getElementsByTagName("task")[0]?.textContent || "",
    company: credit.getElementsByTagName("company")[0]?.textContent || "",
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{mainTitle}</DialogTitle>
          {altTitles.length > 0 && (
            <DialogDescription className="text-sm text-muted-foreground">
              Also known as: {altTitles.join(", ")}
            </DialogDescription>
          )}
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
          <div className="space-y-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="relative">
                {image ? (
                  <img
                    src={image}
                    alt={mainTitle}
                    className="h-64 w-64 rounded-lg object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-64 w-64 items-center justify-center rounded-lg bg-muted">
                    <Film className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                  {themes.map((theme) => (
                    <Badge key={theme} variant="outline">
                      {theme}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {vintage && (
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{vintage}</span>
                    </div>
                  )}
                  {episodes && (
                    <div className="flex items-center gap-1">
                      <Film className="h-4 w-4" />
                      <span>{episodes} episodes</span>
                    </div>
                  )}
                  {type && (
                    <Badge variant="secondary" className="bg-primary/10">
                      {type}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {plot && (
              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold">
                  <BookOpen className="h-5 w-5" />
                  Plot Summary
                </h3>
                <p className="text-sm text-muted-foreground">{plot}</p>
              </div>
            )}

            <Separator />
            
            {relatedWorks.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold">
                  <LinkIcon className="h-5 w-5" />
                  Related Works
                </h3>
                <div className="grid gap-2 text-sm">
                  {relatedWorks.map(({ id, type, title }, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="outline">{type}</Badge>
                      <span className="text-muted-foreground">{title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {staff.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold">
                  <Users className="h-5 w-5" />
                  Staff
                </h3>
                <div className="grid gap-2 text-sm md:grid-cols-2">
                  {staff.map(({ task, person }, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-medium">{task}:</span>
                      <span className="text-muted-foreground">{person}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {cast.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold">
                  <Star className="h-5 w-5" />
                  Cast
                </h3>
                <div className="grid gap-2 text-sm md:grid-cols-2">
                  {cast.map(({ role, person }, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-medium">{role}:</span>
                      <span className="text-muted-foreground">{person}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {credits.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold">
                  <Building2 className="h-5 w-5" />
                  Production
                </h3>
                <div className="grid gap-2 text-sm md:grid-cols-2">
                  {credits.map(({ task, company }, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-medium">{task}:</span>
                      <span className="text-muted-foreground">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AnimeDetailModal;