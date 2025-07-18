
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, ArrowLeft, Upload, FileText, Users } from 'lucide-react';

interface ProgramYearSelectorProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: (data: any) => void;
  onPrevious: () => void;
}

const ProgramYearSelector: React.FC<ProgramYearSelectorProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const [examType, setExamType] = useState<'regular' | 'resit' | ''>(data.examType || '');
  const [selectedProgram, setSelectedProgram] = useState(data.program || '');
  const [selectedYear, setSelectedYear] = useState(data.year || '');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const programs = [
    { id: 'bit', name: 'BIT', description: 'Bachelor of Information Technology' },
    { id: 'bba', name: 'BBA', description: 'Bachelor of Business Administration' }
  ];

  const years = [
    { id: '1', name: 'Year 1', students: 250 },
    { id: '2', name: 'Year 2', students: 230 },
    { id: '3', name: 'Year 3', students: 210 }
  ];

  const handleContinue = () => {
    if (examType === 'regular' && selectedProgram && selectedYear) {
      const newData = {
        ...data,
        examType: examType,
        program: selectedProgram,
        year: selectedYear
      };
      onUpdate(newData);
      onNext(newData);
    } else if (examType === 'resit' && uploadedFile) {
      const newData = {
        ...data,
        examType: examType,
        uploadedFile: uploadedFile
      };
      onUpdate(newData);
      onNext(newData);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-800" />
            Select Program and Year
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Exam Type Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Exam Type</h3>
            <RadioGroup value={examType} onValueChange={(value: 'regular' | 'resit') => setExamType(value)}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="regular" id="regular" />
                <Label htmlFor="regular" className="text-base font-medium">Regular Students</Label>
                <Badge variant="outline" className="ml-2">Standard Examination</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="resit" id="resit" />
                <Label htmlFor="resit" className="text-base font-medium">Resit Students</Label>
                <Badge variant="outline" className="ml-2">Supplementary Examination</Badge>
              </div>
            </RadioGroup>
          </div>

          {/* Regular Exam Flow */}
          {examType === 'regular' && (
            <>
              {/* Program Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose Program</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {programs.map((program) => (
                <Card
                  key={program.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProgram === program.id
                      ? 'ring-2 ring-red-800 bg-red-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedProgram(program.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{program.name}</h4>
                        <p className="text-sm text-gray-600">{program.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

              {/* Year Selection */}
              {selectedProgram && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Choose Academic Year</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {years.map((year) => (
                      <Card
                        key={year.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedYear === year.id
                            ? 'ring-2 ring-red-800 bg-red-50'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedYear(year.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{year.name}</h4>
                              <p className="text-sm text-gray-600">{year.students} students enrolled</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Resit Exam Flow */}
          {examType === 'resit' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-800" />
                    Import Resit Students
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Student List</h3>
                    <p className="text-gray-600 mb-4">
                      Please upload a CSV or Excel file containing the list of resit students.
                    </p>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileUpload}
                        className="max-w-xs mx-auto"
                      />
                      {uploadedFile && (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{uploadedFile.name}</span>
                          <button
                            type="button"
                            aria-label="Remove file"
                            onClick={() => setUploadedFile(null)}
                            className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold focus:outline-none"
                          >
                            &times;
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={
                !examType || 
                (examType === 'regular' && (!selectedProgram || !selectedYear)) ||
                (examType === 'resit' && !uploadedFile)
              }
              className="bg-red-800 hover:bg-red-900"
            >
              {examType === 'regular' ? 'Continue to Sections' : 'Continue to Room Selection'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramYearSelector;
