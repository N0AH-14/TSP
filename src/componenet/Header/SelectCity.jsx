import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { fetchEvents } from '../../redux/actions/eventActions';

// Import your images
import jaipurImage from '../../assets/photos/jai.jpg';
import delhiImage from '../../assets/photos/dlh.jpg';
import ahmimage from '../../assets/photos/ahm.jpg';
import bnglore from '../../assets/photos/bng.jpg';
import chn from '../../assets/photos/chn.jpg';
import hyd from '../../assets/photos/hyd.png';
import kol from '../../assets/photos/kol.jpg';
import lckn from '../../assets/photos/lucknow.jpg';
import mumbai from '../../assets/photos/mum.jpg';
import pune from '../../assets/photos/pune.png';

function SelectCity() {
  const dispatch = useDispatch();
  const [city, setCity] = useState({ label: 'Jaipur', value: 'Jaipur', image: jaipurImage });

  const citiesWithImages = [
    { value: 'Jaipur', label: 'Jaipur', image: jaipurImage },
    { value: 'Delhi', label: 'Delhi', image: delhiImage },
    { value: 'Ahmedabad', label: 'Ahmedabad', image: ahmimage },
    { value: 'Bangalore', label: 'Bangalore', image: bnglore },
    { value: 'Chennai', label: 'Chennai', image: chn },
    { value: 'Hyderabad', label: 'Hyderabad', image: hyd },
    { value: 'Kolkata', label: 'Kolkata', image: kol },
    { value: 'Lucknow', label: 'Lucknow', image: lckn },
    { value: 'Mumbai', label: 'Mumbai', image: mumbai },
    { value: 'Pune', label: 'Pune', image: pune },
  ];

  const allCities = [...citiesWithImages];

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#d6c9e5',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#7b2b41',
        color: '#fff',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#7b2b41',
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
    }),
  };

  const formatOptionLabel = ({ label, image }) => (
    <div className="flex items-center">
      {image && (
        <img
          src={image}
          alt={label}
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            marginRight: 10,
            border: '2px solid black',
          }}
        />
      )}
      <span>{label}</span>
    </div>
  );

  const formatSingleValue = ({ label }) => (
    <div className="flex items-center">
      <span>{label}</span>
    </div>
  );

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
    dispatch(fetchEvents(selectedCity.value));
  };

  return (
    <Select
      value={city}
      onChange={handleCityChange}
      options={allCities}
      styles={customStyles}
      formatOptionLabel={formatOptionLabel}
      formatSingleValue={formatSingleValue}
      placeholder="Select City"
      isSearchable
      className="w-64"
    />
  );
}

export default SelectCity;
