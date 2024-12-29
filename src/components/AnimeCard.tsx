import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, Film } from "lucide-react";
import AnimeDetailModal from "./AnimeDetailModal";

interface AnimeCardProps {
  anime: Element;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  return (
    <>
      <Card 
        className="anime-card overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="relative">
            {image ? (
              <img
                src={image}
                alt={mainTitle}
                className="h-48 w-48 rounded-lg object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-muted">
                <Film className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="mb-2 text-2xl font-bold">{mainTitle}</h2>
              {altTitles.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Also known as: {altTitles.join(", ")}
                </p>
              )}
            </div>
            
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
            
            {plot && (
              <p className="text-sm text-muted-foreground">
                {plot.length > 300 ? `${plot.slice(0, 300)}...` : plot}
              </p>
            )}
          </div>
        </div>
      </Card>
      
      <AnimeDetailModal
        anime={anime}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AnimeCard;