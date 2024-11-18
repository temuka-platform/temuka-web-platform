import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed';
import Leftbar from '../components/Leftbar';
import Navbar from '../components/Navbar';
import Rightbar from '../components/Rightbar';
import UniversityCard from '../components/UniversityCard';
import { UniversityData } from "../types";
import { universityData } from '../templates/university';

const Universities: React.FC = () => {

  const [universities, setUniversities] = useState<UniversityData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUniversities(universityData);
      } catch(err) {

      }
    } 
    fetchData();
  })

  return (
    <>
        <Navbar />
        <div className="flex">
            <Leftbar />
            <div className="flex flex-col w-[100%]">
              {universities.map((u) => (
                <UniversityCard 
                  ID={u.ID}
                  Name={u.Name}
                  Summary={u.Summary}
                  Website={u.Website}
                  Photo={u.Photo}
                  TotalReviews={u.TotalReviews}
                  TotalMajors={u.TotalMajors}
                  Location={u.Location}
                  Stars={u.Stars}
                  Type={u.Type}
                  Accreditation={u.Accreditation}
                  Tuition={u.Tuition}
                  AcceptanceRate={u.AcceptanceRate}
                />
              ))}
            </div>
        </div>
    </>
  );
}

export default Universities;