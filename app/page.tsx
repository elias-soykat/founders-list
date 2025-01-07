"use client";

import { useEffect, useState } from "react";
import foundersData from "../founders.json";

interface Founder {
  Name: string;
  "LinkedIn URL": string;
  [key: string]: any;
}

export default function Home() {
  const [checkedFounders, setCheckedFounders] = useState<{
    [key: string]: boolean;
  }>({});

  // Load checked state from localStorage on component mount
  useEffect(() => {
    const savedChecked = localStorage.getItem("checkedFounders");
    if (savedChecked) {
      setCheckedFounders(JSON.parse(savedChecked));
    }
  }, []);

  // Save to localStorage whenever checked state changes
  useEffect(() => {
    localStorage.setItem("checkedFounders", JSON.stringify(checkedFounders));
  }, [checkedFounders]);

  const handleCheckboxChange = (founderName: string) => {
    setCheckedFounders((prev) => ({
      ...prev,
      [founderName]: !prev[founderName],
    }));
  };

  const handleLinkedInClick = (founderName: string) => {
    setCheckedFounders((prev) => ({
      ...prev,
      [founderName]: true,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Founders List</h1>
      <div className="space-y-4">
        {foundersData.map((founder: Founder, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-2">
              <input
                type="checkbox"
                checked={checkedFounders[founder.Name] || false}
                onChange={() => handleCheckboxChange(founder.Name)}
                className="h-5 w-5"
              />
              <span className="font-semibold text-lg">{index + 1}.</span>
              <h2 className="text-lg font-semibold">{founder.Name}</h2>
              <a
                href={founder["LinkedIn URL"]}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkedInClick(founder.Name)}
                className="text-blue-600 hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ml-12">
              {Object.entries(founder).map(([key, value]) => {
                if (key !== "Name" && key !== "LinkedIn URL") {
                  return (
                    <div key={key} className="text-sm">
                      <span className="font-medium">{key}:</span>{" "}
                      <span className="text-gray-700">{value}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
