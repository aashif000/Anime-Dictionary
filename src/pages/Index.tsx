import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchResults from "@/components/SearchResults";
import LoadingState from "@/components/LoadingState";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "letter">("name");
  const { toast } = useToast();

  const { data: animeData, isLoading, error, refetch } = useQuery({
    queryKey: ["anime", searchTerm, searchType],
    queryFn: async () => {
      if (!searchTerm) return null;
      
      let url = "";
      if (searchType === "name") {
        url = `https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=~${searchTerm}`;
      } else {
        url = `https://cdn.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=anime&name=${searchTerm.charAt(0)}`;
      }
      
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      return xmlDoc;
    },
    enabled: false,
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.length < 2) {
      toast({
        title: "Search term too short",
        description: "Please enter at least 2 characters",
        variant: "destructive",
      });
      return;
    }
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Anime Hunt-o-matic
          </h1>
          <p className="text-muted-foreground">
            Search through thousands of anime titles and discover your next favorite series
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Select
              value={searchType}
              onValueChange={(value: "name" | "letter") => setSearchType(value)}
            >
              <SelectTrigger className="h-12 md:w-[180px]">
                <SelectValue placeholder="Search type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Search by name</SelectItem>
                <SelectItem value="letter">Search by letter</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder={searchType === "name" ? "Search for an anime..." : "Enter a letter..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pr-12"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </form>

        {error && (
          <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
            An error occurred while fetching the data. Please try again.
          </div>
        )}

        {isLoading ? (
          <LoadingState />
        ) : (
          animeData && <SearchResults xmlDoc={animeData} />
        )}
      </div>
    </div>
  );
};

export default Index;