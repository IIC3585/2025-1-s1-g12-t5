"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Movie {
  id: string;
  title: string;
  year?: number;
  director?: string;
}

interface ComboboxDemoProps {
  movies: Movie[];
  onMovieSelect?: (movieId: string) => void;
}

export function ComboboxDemo({ movies, onMovieSelect }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isNavigating, setIsNavigating] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full text-lg h-14 justify-between",
            "hover:bg-transparent hover:text-current hover:shadow-none cursor-pointer",
            isNavigating && "opacity-75"
          )}
          disabled={isNavigating}
        >
          {isNavigating
            ? "Searching..."
            : value
            ? movies.find((movie) => movie.id === value)?.title
            : "Search movies..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search Movies..." className="h-9" />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup>
              {movies.map((movie) => (
                <CommandItem
                  key={movie.id}
                  value={movie.title}
                  onSelect={(currentValue) => {
                    const selectedMovie = movies.find(
                      (m) =>
                        m.title.toLowerCase() === currentValue.toLowerCase()
                    );
                    const movieId = selectedMovie?.id || "";
                    setValue(movieId === value ? "" : movieId);
                    setOpen(false);
                    if (movieId) {
                      setIsNavigating(true);
                      // Navigate to the movie page
                      if (onMovieSelect) {
                        onMovieSelect(movieId);
                      } else {
                        // Fallback navigation
                        window.location.href = `/movies/${movieId}/`;
                      }
                    }
                  }}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{movie.title}</span>
                    <span className="text-sm text-gray-500">
                      {movie.year && movie.director
                        ? `${movie.year} • ${movie.director}`
                        : movie.year || movie.director}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === movie.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
