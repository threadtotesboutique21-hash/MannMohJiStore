import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ProductFiltersProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
}

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const availableColors = ["Black", "White", "Navy", "Beige", "Maroon", "Green", "Gold"];

export default function ProductFilters({
  priceRange,
  setPriceRange,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
}: ProductFiltersProps) {
  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-foreground">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          data-testid="button-clear-all-filters"
        >
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={50000}
              min={0}
              step={500}
              className="w-full"
              data-testid="slider-price-range"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span data-testid="text-price-min">PKR {priceRange[0].toLocaleString()}</span>
              <span data-testid="text-price-max">PKR {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, !!checked)}
                  data-testid={`checkbox-size-${size}`}
                />
                <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableColors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={(checked) => handleColorChange(color, !!checked)}
                  data-testid={`checkbox-color-${color}`}
                />
                <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                  {color}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
