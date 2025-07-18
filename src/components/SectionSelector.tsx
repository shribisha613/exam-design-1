
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';

interface SectionSelectorProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const SectionSelector: React.FC<SectionSelectorProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const [selectedSections, setSelectedSections] = useState(data.sections || []);

  // Mock room capacity - in real app this would come from backend
  const maxRoomCapacity = 500; // Total capacity of all available rooms

  const sections = [
    { id: 'C1', name: 'C1', students: 45 },
    { id: 'C2', name: 'C2', students: 42 },
    { id: 'C3', name: 'C3', students: 38 },
    { id: 'C4', name: 'C4', students: 40 },
    { id: 'C5', name: 'C5', students: 35 },
    { id: 'C6', name: 'C6', students: 33 },
    { id: 'C7', name: 'C7', students: 41 },
    { id: 'C8', name: 'C8', students: 39 },
    { id: 'C9', name: 'C9', students: 37 },
    { id: 'C10', name: 'C10', students: 44 },
    { id: 'C11', name: 'C11', students: 36 },
    { id: 'C12', name: 'C12', students: 43 }
  ];

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSections(sections.map(s => s.id));
  };

  const handleDeselectAll = () => {
    setSelectedSections([]);
  };

  const handleContinue = () => {
    if (selectedSections.length > 0) {
      onUpdate({ 
        ...data, 
        sections: selectedSections 
      });
      onNext();
    }
  };

  const totalStudents = sections
    .filter(s => selectedSections.includes(s.id))
    .reduce((sum, s) => sum + s.students, 0);

  const exceedsCapacity = totalStudents > maxRoomCapacity;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-800" />
              Select Sections
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                Deselect All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => (
              <Card
                key={section.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSections.includes(section.id)
                    ? 'ring-2 ring-red-800 bg-red-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSectionToggle(section.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedSections.includes(section.id)}
                      onChange={() => handleSectionToggle(section.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{section.name}</h4>
                        <Badge variant="outline">{section.students} students</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Room Capacity Information */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Room Capacity</h4>
                  <p className="text-sm text-gray-700">
                    Maximum student capacity across all available rooms
                  </p>
                </div>
                <Badge variant="outline" className="text-gray-700">
                  {maxRoomCapacity} Students
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Capacity Exceeded Error */}
          {exceedsCapacity && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Capacity Exceeded:</strong> The selected sections have {totalStudents} students, 
                which exceeds the maximum room capacity of {maxRoomCapacity} students. 
                Please deselect some sections to proceed.
              </AlertDescription>
            </Alert>
          )}

          {selectedSections.length > 0 && !exceedsCapacity && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900">Selection Summary</h4>
                    <p className="text-sm text-blue-700">
                      {selectedSections.length} sections selected with {totalStudents} total students
                    </p>
                  </div>
                  <Badge className="bg-blue-600">
                    {totalStudents} Students
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={selectedSections.length === 0 || exceedsCapacity}
              className="bg-red-800 hover:bg-red-900"
            >
              Continue to Student Management
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionSelector;
