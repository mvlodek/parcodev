// src/utils/firebaseUtils.js

import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const initialTSPFunds = [
  {
    name: "C Fund",
    value: 70000,
    color: "#0671AD",
    textColor: "text-white",
    riskLevel: 10,
    examples: ["Apple", "Google", "Microsoft", "Meta", "Tesla"],
    description: "Very volatile, will reap the most rewards from good years and the worst losses of bad years"
  },
  {
    name: "G Fund",
    value: 85000,
    color: "#495057",
    textColor: "text-white",
    riskLevel: 3,
    examples: ["Government Securities", "Treasury Bonds", "Federal Notes"],
    description: "Low risk government securities, provides stable but modest returns"
  },
  {
    name: "I Fund",
    value: 54000,
    color: "#ADC5E3",
    textColor: "text-white",
    riskLevel: 8,
    examples: ["International Stocks", "Global Markets", "Foreign Companies"],
    description: "International exposure, affected by global market conditions and currency exchange rates"
  },
  {
    name: "F Fund",
    value: 48000,
    color: "#21B8FD",
    textColor: "text-white",
    riskLevel: 5,
    examples: ["Corporate Bonds", "Municipal Bonds", "Fixed Income"],
    description: "Fixed income investments, moderate risk with steady returns"
  }
];

const initialLookThroughFunds = [
  {
    name: "C Fund",
    value: 70000,
    color: "#0671AD",
    textColor: "text-white",
    riskLevel: 10,
    examples: ["Apple", "Google", "Microsoft", "Meta", "Tesla"],
    description: "Very volatile, will reap the most rewards from good years and the worst losses of bad years"
  },
  {
    name: "G Fund",
    value: 85000,
    color: "#495057",
    textColor: "text-white",
    riskLevel: 10,
    examples: ["Apple", "Google", "Microsoft", "Meta", "Tesla"],
    description: "Very volatile, will reap the most rewards from good years and the worst losses of bad years"
  }
];

// Function to check if collection is empty
export const isCollectionEmpty = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.empty;
};

// Function to populate initial data
export const populateInitialData = async () => {
  try {
    // Check if collections are empty before populating
    const isTSPEmpty = await isCollectionEmpty('tspFunds');
    const isLookThroughEmpty = await isCollectionEmpty('lookThroughFunds');

    if (isTSPEmpty) {
      const tspCollectionRef = collection(db, 'tspFunds');
      for (const fund of initialTSPFunds) {
        await addDoc(tspCollectionRef, fund);
      }
      console.log('TSP Funds populated successfully');
    }

    if (isLookThroughEmpty) {
      const lookThroughCollectionRef = collection(db, 'lookThroughFunds');
      for (const fund of initialLookThroughFunds) {
        await addDoc(lookThroughCollectionRef, fund);
      }
      console.log('Look Through Funds populated successfully');
    }

    return true;
  } catch (error) {
    console.error('Error populating data:', error);
    return false;
  }
};

// Function to get all funds from a collection
export const getFunds = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting funds:', error);
    throw error;
  }
};

// Function to search funds by name
export const searchFundsByName = async (collectionName, searchTerm) => {
  try {
    const q = query(
      collection(db, collectionName),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error searching funds:', error);
    throw error;
  }
};